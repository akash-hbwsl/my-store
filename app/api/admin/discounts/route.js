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

    const discountedProducts = await db
      .collection("products")
      .find({ discount: { $gt: 0 } })
      .project({ title: 1, category: 1, discount: 1, updatedAt: 1 })
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      discountedProducts,
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

    const parsedDiscount = Number(discountValue);
    if (
      !discountType ||
      !Number.isFinite(parsedDiscount) ||
      parsedDiscount < 0 ||
      parsedDiscount > 100
    ) {
      return NextResponse.json(
        { error: "Invalid discount payload" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("my-store");
    let filter = {};

    if (discountType === "all") {
      filter = {};
    } else if (discountType === "category") {
      if (!Array.isArray(categories) || categories.length === 0) {
        return NextResponse.json(
          { error: "Select at least one category" },
          { status: 400 },
        );
      }
      filter = { category: { $in: categories } };
    } else if (discountType === "specific") {
      if (!Array.isArray(applicableProducts) || applicableProducts.length === 0) {
        return NextResponse.json(
          { error: "Select at least one product" },
          { status: 400 },
        );
      }
      const objectIds = applicableProducts.map((id) => new ObjectId(id));
      filter = { _id: { $in: objectIds } };
    } else {
      return NextResponse.json({ error: "Invalid discount type" }, { status: 400 });
    }

    const result = await db.collection("products").updateMany(filter, {
      $set: { discount: parsedDiscount, updatedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      updatedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
      message: "Discount applied directly on product items",
    });
  } catch (error) {
    console.error("Discount creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
