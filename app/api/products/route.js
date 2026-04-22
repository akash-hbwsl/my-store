import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function POST(req) {
  try {
    const body = await req.json();

    const fileData = await readFile(filePath, "utf-8");
    const products = JSON.parse(fileData);

    const newProduct = {
      id: Date.now().toString(),
      ...body,
    };

    products.push(newProduct);

    await writeFile(filePath, JSON.stringify(products, null, 2));
    return Response.json({ success: true, product: newProduct });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

export async function GET() {
  const fileData = await readFile(filePath, "utf-8");
  const products = JSON.parse(fileData);

  return Response.json(products);
}
