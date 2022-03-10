import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const token = await getToken({ req });
    res.setHeader("Content-type", "application/json");
    res.status(200).send(JSON.stringify({ token, session }, null, 2));
  } else {
    res.status(401).send("Unauthorized, sorry.");
  }
}
