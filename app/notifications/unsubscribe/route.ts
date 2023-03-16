import { getUserProfile, updateUserProfile } from "lib/airtable/user-profile";
import { getUnsubscribeUrl } from "lib/notifications";
import { hashDigest } from "lib/utils";

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
 *
 * TBD: Confirm automatically for logged-in users
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slackId = searchParams.get("slackId");
  const token = searchParams.get("token");

  if (typeof slackId !== "string" || typeof token !== "string") {
    return new Response("Nesedí kontrolní součet.", { status: 401 });
  }

  const expectedTokenValue = hashDigest(["unsubscribe", slackId]);
  if (expectedTokenValue !== token) {
    return new Response("Nesedí kontrolní součet.", { status: 401 });
  }

  const profile = await getUserProfile(slackId as any).catch((e) => null);

  if (!profile) {
    return new Response("Uživatel nebyl nalezen.", { status: 400 });
  } else if (!confirm) {
    const confirmedUrl = getUnsubscribeUrl(slackId, true);
    const html = `Odhlášní potvrdíte <a href="${confirmedUrl}">kliknutím sem</a>.`;
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } else {
    await updateUserProfile(profile.id, {
      notificationFlags: profile.notificationFlags.filter(
        (f) => f !== "allowNotifications"
      ),
    });
    return new Response("Nastavení upraveno.", { status: 200 });
  }
}
