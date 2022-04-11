import { getAllWorkspaceUsers, isRegularUser } from "lib/slack/user";

require("dotenv").config({ path: ".env.local" });

async function main() {
  const { SLACK_SYNC_TOKEN = "<none>" } = process.env;
  try {
    console.log(
      "Downloading all Slack users of the Česko.Digital workspace. This can take a while."
    );
    const users = await getAllWorkspaceUsers(SLACK_SYNC_TOKEN);
    console.log(
      `Loaded ${users.filter(isRegularUser).length} regular users, ${
        users.length
      } users total.`
    );
  } catch (error) {
    console.log(error);
  }
}

main().catch((error) => console.log(error));
