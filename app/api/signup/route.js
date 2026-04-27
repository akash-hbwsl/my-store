import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body || {};

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  const normalizedEmail = email.toString().trim().toLowerCase();
  const passwordValue = password.toString();

  const { db } = await connectToDatabase();
  const existingUser = await db
    .collection("users")
    .findOne({ email: normalizedEmail });

  if (existingUser) {
    return NextResponse.json(
      { error: "A user with that email already exists." },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(passwordValue, 10);
  await db.collection("users").insertOne({
    name: name.toString().trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
