import path from "path";
import { readFile } from "fs/promises";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function GET(req, { params }) {
  const { id } = await params;
  const fileData = await readFile(filePath, "utf-8");
  const products = JSON.parse(fileData);
  const res = products.find((p) => p.id === id);

  return Response.json(res || null);
}
