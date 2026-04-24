import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("my-store");

    const discounts = await db.collection("discounts").find({}).toArray();

    return NextResponse.json({
      success: true,
      discounts,
    });
  } catch (error) {
    console.error("Discounts fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { discountType, discountValue, categories, applicableProducts } =
      await request.json();

    if (!discountType || !discountValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("my-store");

    // If applying discount to all products or categories, update products collection
    if (discountType === "all") {
      // Update all products
      await db
        .collection("products")
        .updateMany({}, { $set: { discount: discountValue } });
    } else if (
      discountType === "category" &&
      categories &&
      categories.length > 0
    ) {
      // Update products in specific categories
      await db
        .collection("products")
        .updateMany(
          { category: { $in: categories } },
          { $set: { discount: discountValue } },
        );
    } else if (
      discountType === "specific" &&
      applicableProducts &&
      applicableProducts.length > 0
    ) {
      // Update specific products
      const objectIds = applicableProducts.map((id) => new ObjectId(id));
      await db
        .collection("products")
        .updateMany(
          { _id: { $in: objectIds } },
          { $set: { discount: discountValue } },
        );
    }

    // Save discount configuration to discounts collection
    const discount = {
      type: discountType,
      value: discountValue,
      categories: categories || [],
      applicableProducts: applicableProducts || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    };

    const result = await db.collection("discounts").insertOne(discount);

    return NextResponse.json({
      success: true,
      discount: { _id: result.insertedId, ...discount },
      message: "Discount applied successfully",
    });
  } catch (error) {
    console.error("Discount creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
