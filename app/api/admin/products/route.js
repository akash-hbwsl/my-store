import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const products = await db
      .collection("products")
      .find({ isCustom: true })
      .toArray();

    // optional: convert _id to string
    const formatted = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));

    return Response.json(formatted);
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
