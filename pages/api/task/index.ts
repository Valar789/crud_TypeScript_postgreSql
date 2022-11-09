import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../util/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM task";
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error:any) {
        return res.status(400).json({error: error.message})
      }
    case "POST":
      try {
        const { title, description } = body;
        const query =
          "INSERT INTO task(title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description];
        const response = await conn.query(query, values);
        return res.json(response.rows[0]);
      } catch (error:any) {
        return res.status(400).json({error: error.message})
        
      }
    default:
      return res.status(400).json("No existe el metodo o no tienes acceso");
  }
}
