import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db();
    console.log("Fetching product with ID:", id);

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    return Response.json(product || null);
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
