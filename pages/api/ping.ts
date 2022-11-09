import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../util/database";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await conn.query("SELECT NOW()");

  return res.json({'message': 'pong', 'time': response});
};
