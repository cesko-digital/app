import Airtable from "airtable";

import { withAuthenticatedUser } from "~/src/auth";

/** The list of all synced User Profiles tables indexed by their containing DB ID */
const syncedUserTablesByDatabase: Record<string, string | undefined> = {
  // App -> User Profiles
  appkn1DkvgVI5jpME: "tbl3QK2aTskyu2rNQ",
  // Uživatelský výzkum DIA -> Users
  appKWumcDDL9KI00N: "tblTf8usuYWgIZD9x",
};

/** Translate signed-in user’s ID to a different database */
export async function GET(request: Request) {
  return withAuthenticatedUser(async (currentUser) => {
    const { searchParams } = new URL(request.url);
    const formUrl = searchParams.get("formUrl");
    if (!formUrl || typeof formUrl !== "string") {
      return new Response("The `formUrl` argument is missing or malformed.", {
        status: 400,
      });
    }

    // Parse URL, extract target database ID
    const matches = /https:\/\/airtable.com\/(app\w+)/.exec(formUrl);
    if (matches?.length !== 2) {
      return new Response(
        "The `formUrl` argument does not match the expected pattern.",
        {
          status: 400,
        },
      );
    }

    const [_, databaseId] = matches;

    // If the database is Users, no user ID translation is needed
    if (databaseId === "apppZX1QC3fl1RTBM") {
      return new Response(
        JSON.stringify({ targetUserId: currentUser.id }, null, 2),
        {
          status: 200,
        },
      );
    }

    // Otherwise, look up the ID of the synced User Profiles table in the target DB
    const userTableId = syncedUserTablesByDatabase[databaseId];
    if (!userTableId) {
      return new Response(`Unknown database ID: "${databaseId}".`, {
        status: 400,
      });
    }

    // And once we have that, look up the record ID of currently signed-in user
    const airtable = new Airtable();
    const table = airtable.base(databaseId)(userTableId);
    const targetUserId = await table
      .select({ filterByFormula: `{id} = "${currentUser.id}"`, maxRecords: 1 })
      .all()
      .then((records) => records[0].id);

    return new Response(JSON.stringify({ targetUserId }, null, 2), {
      status: 200,
    });
  });
}
