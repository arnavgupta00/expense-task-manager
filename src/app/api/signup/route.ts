import { prismaConnect } from "@/db/prismaGenerate";
import { NextRequest, NextResponse } from "next/server";

async function handler(request: Request) {
  try {
    const prisma = prismaConnect;
    const body = await request.json();

    const {name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400});
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name:name,
        email: email,
        password: password,
        categories: [],
      },
    });

    return NextResponse.json({ message: "User created successfully", newUser },{status: 201});
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user", details: error },{status: 500});
  }
}

export { handler as GET, handler as POST }
