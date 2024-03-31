
import { prismaConnect } from "@/db/prismaGenerate";
import { NextRequest, NextResponse } from "next/server";
import bson from "bson";

async function handler(request: Request) {
  try {
    const prisma = prismaConnect;
    const body = await request.json();
    const { amount, category, description, userEmail } = body;

    if (!amount || !category || !userEmail) {
      return NextResponse.json({ error: "Please fill all the required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

   
    const newExpense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category: category,
        description: description,
        userEmail: userEmail, 
      },
    });

    return NextResponse.json({ message: "Expense created successfully", newExpense }, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Failed to create expense", details: error }, { status: 500 });
  }
}

export { handler as POST }; 