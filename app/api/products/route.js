import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const products = await db.collection("products").find({}).toArray();

    return Response.json(products);
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const newProduct = {
      ...body,
      discount: Number(body.discount) || 0,
      isCustom: true,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);

    return Response.json({
      success: true,
      product: { ...newProduct, _id: result.insertedId },
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
