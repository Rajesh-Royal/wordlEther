import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

import { randomInt } from "crypto";
import data from "db/db.json";
import { withSession } from "lib/session";

export type SecretApiResponse = {
  secret: string;
};

export type Request = NextApiRequest & { session: Session };

export async function handler(
  req: Request,
  res: NextApiResponse<SecretApiResponse>
) {
  const { length, items } = data;

  const secret = items[randomInt(length)];
  console.log('secret', secret)

    req.session.set("secret: ", secret);
    req.session.save().then((data) => {
        // console.log("session data : ", data)
    }).catch((error) => {
        // console.log("Error: ", error)
    }) 

  res.status(200).json({ secret });
}

export default withSession(handler);
