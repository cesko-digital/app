import { NextResponse } from "next/server";

export const GET = () =>
  NextResponse.redirect(
    "https://airtable.com/shrR9KTyhRIccB3Lp/iCal?timeZone=Europe%2FPrague&userLocale=en-gb",
    { status: 302 }
  );
