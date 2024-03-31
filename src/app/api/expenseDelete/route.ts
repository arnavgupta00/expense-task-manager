import { prismaConnect } from "@/db/prismaGenerate";
import { NextRequest, NextResponse } from "next/server";
import bson from "bson";
interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string | null;
  createdAt: Date;
  userEmail: string; // Add userEmail property
}
async function handler(request: Request) {
  try {
    const prisma = prismaConnect;
    const { expenseId, userEmail } = await request.json();

    if (!expenseId || !userEmail) {
      return NextResponse.json({ error: "Please provide the expense ID and user email" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingExpense:Expense|null = await prisma.expense.findUnique({
      where: {
        id: parseInt(expenseId),
      },
    });

    if (!existingExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    if (existingExpense?.userEmail !== userEmail) {
      return NextResponse.json({ error: "Unauthorized", message: "User is not authorized to delete this expense" }, { status: 403 });
    }

    await prisma.expense.delete({
      where: {
        id: parseInt(expenseId),
      },
    });

    return NextResponse.json({ message: "Expense deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json({ error: "Failed to delete expense", details: error }, { status: 500 });
  }
}

export { handler as POST };
