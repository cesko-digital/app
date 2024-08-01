import { getUserProfile, updateUserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";
import { unsubscribeRoute } from "~/src/notifications/mailing";
import { hashDigest } from "~/src/utils";

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
  const userId = searchParams.get("id");
  const token = searchParams.get("token");
  const confirm = searchParams.get("confirm");

  if (typeof userId !== "string" || typeof token !== "string") {
    return new Response("Nesedí kontrolní součet.", { status: 401 });
  }

  const expectedTokenValue = hashDigest(["unsubscribe", userId]);
  if (expectedTokenValue !== token) {
    return new Response("Nesedí kontrolní součet.", { status: 401 });
  }

  const profile = await getUserProfile(userId);

  if (!profile) {
    return new Response("Uživatel nebyl nalezen.", { status: 400 });
  } else if (!confirm) {
    const confirmedUrl = unsubscribeRoute(userId, true);
    const html = `Odhlášení potvrdíš <a href="${confirmedUrl}">kliknutím sem</a>.`;
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } else {
    const notificationFlags = setFlag(
      profile.notificationFlags,
      "receiveNewRoleNotifications",
      false,
    );
    await updateUserProfile(profile.id, { notificationFlags });
    return new Response("Nastavení upraveno.", { status: 200 });
  }
}
