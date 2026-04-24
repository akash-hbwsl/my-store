import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const {
      customerEmail,
      customerName,
      shippingAddress,
      phone,
      paymentMethod = "cod",
      items,
      subtotal,
      tax,
      total,
      status = "pending",
    } = await request.json();

    // Validate required fields
    if (
      !customerEmail ||
      !customerName ||
      !shippingAddress ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    // Create order object
    const order = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      customerEmail,
      customerName,
      shippingAddress,
      phone,
      paymentMethod,
      items,
      subtotal: parseFloat(subtotal),
      tax: parseFloat(tax),
      total: parseFloat(total),
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert order into database
    const result = await db.collection("orders").insertOne(order);

    if (!result.acknowledged) {
      throw new Error("Failed to create order");
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    const { db } = await connectToDatabase();

    // Build query
    const query = {};
    if (email) query.customerEmail = email;
    if (status) query.status = status;

    const orders = await db
      .collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
