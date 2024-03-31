import { prismaConnect } from "@/db/prismaGenerate";
import { NextRequest, NextResponse } from "next/server";
import bson from "bson";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';

async function handler(request: Request) {
  try {
    const prisma = prismaConnect;
    const { userEmail, period } = await request.json();

    if (!userEmail) {
      return NextResponse.json({ error: "Please provide the user's email" }, { status: 400 });
    }

    if (!period || !['Week', 'Today', 'Month'].includes(period)) {
      return NextResponse.json({ error: "Please provide a valid period (Week, Today, or Month)" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        expenses: true, 
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let startDate:number | Date, endDate: number | Date;

    switch (period) {
      case 'Week':
        startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
        endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
        break;
      case 'Month':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case 'Today':
      default:
        startDate = startOfDay(new Date());
        endDate = endOfDay(new Date());
        break;
    }

    const expenses = existingUser.expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= startDate && expenseDate <= endDate;
    });

    return NextResponse.json({ 
      periodExpenses: expenses,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses", details: error }, { status: 500 });
  }
}

export { handler as POST }; 
