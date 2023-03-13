#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import sendgrid from "@sendgrid/mail";
import { getAllOpportunities } from "lib/airtable/opportunity";
import { getAllUserProfiles } from "lib/airtable/user-profile";
import {
  renderNotificationMailBody,
  renderNotificationMailSubject,
} from "lib/notifications";

/**
 * Send notifications about new roles to interested users
 *
 * The roles are read from the [Notifications for Today][1] Airtable view.
 * The basic idea is to take opportunities that are live and have been published
 * just two days ago.
 *
 * The recipients are read from the [New Role Notification Recipients][2] view.
 * The filter picks users that have notifications turned on and have subscribed
 * to new role notifications.
 *
 * **BEWARE**: Make sure to only run this once a day at most, otherwise recipients
 * will receive duplicate notifications.
 *
 * [1]: https://airtable.com/appkn1DkvgVI5jpME/tblRGYoOWBeh6B5h5/viwyYXHThc89fK7XR?blocks=hide
 * [2]: https://airtable.com/apppZX1QC3fl1RTBM/tblUmjkniqR4PUu5R/viwDGM9NtRcL3YgKz?blocks=hide
 */
async function main() {
  const opportunities = await getAllOpportunities("Notifications for Today");
  if (opportunities.length === 0) {
    console.log("No new roles to send notifications about, nothing to do.");
    process.exit();
  } else if (opportunities.length > 20) {
    console.error(
      `Got ${opportunities.length} opportunities, that doesn’t seem right, aborting.`
    );
    process.exit(1);
  }

  const recipients = (
    await getAllUserProfiles("New Role Notification Recipients")
  ).filter((user) => user.slackId && user.slackRegistrationMail);

  if (recipients.length > 1000) {
    console.error(
      `Got ${recipients.length} recipients, that doesn’t seem right, aborting.`
    );
    process.exit(1);
  }

  console.log(
    `Got ${opportunities.length} role(s), sending notification to ${recipients.length} users.`
  );

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");

  for (const recipient of recipients) {
    await sendgrid.send({
      to: recipient.slackRegistrationMail!,
      from: "ahoj@cesko.digital",
      subject: renderNotificationMailSubject(opportunities),
      text: renderNotificationMailBody(opportunities, recipient.slackId!),
      trackingSettings: {
        clickTracking: {
          enable: false,
        },
      },
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
