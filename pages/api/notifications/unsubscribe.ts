import { getUserProfile, updateUserProfile } from "lib/airtable/user-profile";
import { getUnsubscribeUrl } from "lib/notifications";
import { hashDigest } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

/**
 * Instantly unsubscribe user from e-mail notifications
 *
 * The idea is that we give the user a simple way to turn off notifications
 * by clicking a link. The trouble is that the link just needs a simple GET
 * request to trigger, so many antivirus apps will trigger the link by visiting
 * it. The problem is described here:
 *
 * https://gitlab.com/gitlab-org/gitlab-foss/-/issues/17198
 *
 * So we don’t turn the notifications off instantly and display a simple
 * confirmation dialogue.
 */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { slackId, token } = request.query;

  // If the user is logged in we know the visit is legit and we don’t need the confirmation.
  const sessionToken = await getToken({ req: request });
  const confirm = sessionToken ? "y" : request.query.confirm;

  if (typeof slackId !== "string" || typeof token !== "string") {
    response.status(401).send("Nesedí kontrolní součet.");
    return;
  }

  const expectedTokenValue = hashDigest(["unsubscribe", slackId]);
  if (expectedTokenValue !== token) {
    response.status(401).send("Nesedí kontrolní součet.");
    return;
  }

  const profile = await getUserProfile(slackId as any).catch((e) => null);

  if (!profile) {
    response.status(400).send("Uživatel nebyl nalezen.");
  } else if (!confirm) {
    response.status(200);
    response.setHeader("Content-Type", "text/html");
    const confirmedUrl = getUnsubscribeUrl(slackId, true);
    response.send(
      `Odhlášní potvrdíte <a href="${confirmedUrl}">kliknutím sem</a>.`
    );
  } else {
    await updateUserProfile(profile.id, {
      notificationFlags: profile.notificationFlags.filter(
        (f) => f !== "allowNotifications"
      ),
    });
    response.status(200).send(`Nastavení upraveno.`);
  }
}

export default handler;
