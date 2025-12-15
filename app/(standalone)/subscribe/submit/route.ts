import { NextRequest } from "next/server";

import { array, record, string } from "typescript-json-decoder";

import {
  espoAddContactsToTargetList,
  espoCreateLead,
  espoGetContactsByEmail,
} from "~/src/espocrm/espo";
import { normalizeEmailAddress, notEmpty } from "~/src/utils";

const targetListIds: Record<string, string> = {
  "cist.digital": "693c0cd42b2d08580",
  "nezisk.digital": "693c0cd42b2d08580",
  "sluzby.digital": "693c0cd42b2d08580",
};

// TBD: Decode errors vs. CRM errors
export async function POST(request: NextRequest): Promise<Response> {
  const crmApiKey = process.env.CRM_API_KEY ?? "<not set>";
  const decodeFormData = record({
    firstName: string,
    lastName: string,
    email: string,
    selectedTargetGroups: array(string),
  });
  try {
    const subscription = decodeFormData(await request.json());
    const selectedTargetListIds = subscription.selectedTargetGroups
      .flatMap((s) => targetListIds[s])
      .filter(notEmpty);
    const existingContacts = await espoGetContactsByEmail(
      crmApiKey,
      subscription.email,
    );

    if (existingContacts.length === 0) {
      // E-mail not found in existing contacts
      console.log(
        `Existing contact for e-mail ${subscription.email} not found, will create a new lead.`,
      );
      await espoCreateLead(crmApiKey, {
        firstName: subscription.firstName,
        lastName: subscription.lastName,
        emailAddress: normalizeEmailAddress(subscription.email),
        targetListsIds: selectedTargetListIds,
      });
    } else {
      // E-mail found in existing contacts
      console.log(
        `Found ${existingContacts.length} existing contact(s), will add to target lists.`,
      );
      for (const targetListId of selectedTargetListIds) {
        await espoAddContactsToTargetList(
          crmApiKey,
          targetListId,
          existingContacts.map((c) => c.id),
        );
      }
    }
    return new Response("Nice! Welcome aboard.", { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to decode request.", { status: 400 });
  }
}
