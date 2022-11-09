import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../util/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM task WHERE id = $1";
        const values = [query.id];
        const response = await conn.query(text, values);
        if (response.rows.length === 0) {
          return res.status(400).json({ message: "task not found" });
        }
        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
        try {
            const {title, description} = body
            const text = "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *";
            const values = [title, description, query.id];
            const response = await conn.query(text, values);
            if (response.rows.length === 0) {
              return res.status(400).json({ message: "task not found" });
            }
            return res.json(response.rows[0]);
          } catch (error: any) {
            return res.status(500).json({ error: error.message });
          }
    case "DELETE":
        try {
            const text = "DELETE FROM task WHERE id = $1 RETURNING *";
            const values = [query.id];
            const response = await conn.query(text, values);
            
            if (response.rowCount.length === 0) {
              return res.status(400).json({ message: "task not found" });
            }
            return res.json(response.rows[0]);
          } catch (error: any) {
            return res.status(500).json({ error: error.message });
          }
    default:
      return res.status(400).json("No existe el metodo o no tienes acceso");
  }
};
