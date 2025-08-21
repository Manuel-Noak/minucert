// /app/api/users/route.js (Next.js 13 App Router)
import mysql from "mysql2/promise";

export async function GET() {
  const connection = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "world",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
  });

  const [rows] = await connection.query("SELECT * FROM city");
  await connection.end();

  return Response.json(rows);
}
