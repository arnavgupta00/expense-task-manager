"use client";

import ExpenseCard from "@/components/expenseCard";
import axios from "axios";
import { use, useEffect, useState } from "react";
import ExpenseChart from "@/components/chart";
import BalanceBar from "@/components/balanceBar";

export default function ListExpenses(props: { session?: any }) {
  const [period, setPeriod] = useState("Today");
  const [listExpenses, setListExpenses] = useState([]);
  const [budget, setBudget] = useState(5000);

  const getTotalExpenses = (expenses: any) => {
    return expenses.reduce(
      (total: any, expense: { amount: any }) => total + expense.amount,
      0
    );
  };

  const getCategoryExpenses = (expenses: any[]) => {
    const categoryExpenses: { [key: string]: number } = {}; // Provide type annotation for categoryExpenses
    expenses.forEach((expense) => {
      if (!categoryExpenses[expense.category]) {
        categoryExpenses[expense.category] = 0;
      }
      categoryExpenses[expense.category] += expense.amount;
    });
    return categoryExpenses;
  };

  //  Expense Trends
  const getExpenseTrends = (expenses: any[]) => {
    const trends: { [key: string]: number } = {}; // Add type annotation for trends
    expenses.forEach((expense) => {
      const monthYear = expense.createdAt.substring(0, 7); // Extracting month and year
      if (!trends[monthYear]) {
        trends[monthYear] = 0;
      }
      trends[monthYear] += expense.amount;
    });
    return trends;
  };

  const handleDelete = async (event: any, id: any) => {
    event.preventDefault();
    if(props.session === undefined)return;


    try {
      const response = await axios.post("/api/expenseDelete", {
        expenseId: id,
        userEmail: props.session.user.email,
      });

      console.log("Deleted Expense successful:", response.data);

      handleSubmit();
    } catch (error) {
      console.error("Error Deleting Expense:", error);
    }
  };

  const handleSubmit = async () => {
    if(props.session === undefined)return;

    try {
      const response = await axios.post("/api/expenseFetch", {
        userEmail: props.session.user.email,
        period: period,
      });

      console.log("Fetched Expense successful:", response.data);
      setListExpenses(response.data.periodExpenses);
    } catch (error) {
      console.error("Error Fetching Expense:", error);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, [period]);
  return (
    <div
      className="w-full rounded-3xl bg-gray-50 p-12 pb-20 flex flex-col items-start justify-start gap-4"
      style={{
        minHeight: "400px",
        height: "700px",
        borderRadius: "50px",
        position: "sticky",
        top: "0",
        zIndex: "5",
        overflowY: "scroll",
      }}
    >
      <div className="w-full pb-20">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div
            className="text-black font-light text-xl md:3xl"
            style={{
              alignSelf: "start",
              marginLeft: `${(getTotalExpenses(listExpenses) / budget) * 100}%`,
            }}
          >
            Expenses: ₹{getTotalExpenses(listExpenses)}
          </div>
          <div className="w-full h-8 bg-gray-300 rounded-3xl">
            <div
              className=" h-full bg-black rounded-3xl"
              style={{ width: `${(getTotalExpenses(listExpenses) / budget) * 100}%` }}
            ></div>
          </div>
          <div
            className="text-black font-light text-xl md:3xl pt-2"
            style={{ alignSelf: "end" }}
          >
            <label>Budget:{" "}</label>
            <input type="number" className="w-24 border-gray-300 border-2" value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-start justify-between gap-2">
        <button
          onClick={() => setPeriod("Today")}
          className="w-1/3 h-8 rounded text-black  bg-gray-300 pl-4 pr-4 hover:bg-gray-500 "
          style={{
            backgroundColor: period === "Today" ? "black" : "",
            color: period === "Today" ? "white" : "",
          }}
        >
          Today
        </button>
        <button
          onClick={() => setPeriod("Week")}
          className="w-1/3 h-8 rounded text-black  bg-gray-300 pl-4 pr-4 hover:bg-gray-500 "
          style={{
            backgroundColor: period === "Week" ? "black" : "",
            color: period === "Week" ? "white" : "",
          }}
        >
          Week
        </button>
        <button
          onClick={() => setPeriod("Month")}
          className="w-1/3 h-8 rounded text-black  bg-gray-300 pl-4 pr-4 hover:bg-gray-500 "
          style={{
            backgroundColor: period === "Month" ? "black" : "",
            color: period === "Month" ? "white" : "",
          }}
        >
          Month
        </button>
      </div>
      <hr className="text-black border-1 w-full border-black" />
      <div className="w-full flex flex-row items-start justify-between gap-4 pt-4 text-black ">
        <div className="w-2/3">
          <p className="text-black font-light text-base md:text-xl visible  pb-6">
            Total Expenses: ₹ {getTotalExpenses(listExpenses)}
          </p>
          <div>
            <p className="text-black font-light text-sm md:text-xl visible">
              Category Expenses:
            </p>
            <ol className=" m-4">
              {Object.entries(getCategoryExpenses(listExpenses)).map(
                ([category, expenditure]) => (
                  <li key={category}>
                    <p className="text-black font-light text-sm md:text-lg visible  ">
                      {" "}
                      {category} : ₹ {expenditure}
                    </p>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
        <div className="w-1/3">
          <ExpenseChart expenses={listExpenses} />
        </div>
      </div>
      <hr className="text-black border-1 w-full border-black" />

      <hr className="text-black border-1 border-black" />
      <p className="text-black font-light text-2xl visible  pb-6">Expenses</p>

      <div className="w-full flex flex-col items-start justify-between gap-14 pt-4">
        {listExpenses.map((expense: any, index: number) => {
          return (
            <div className="w-full h-20 mb-4" key={index}>
              <ExpenseCard
                index={index}
                expense={expense}
                handleDelete={handleDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
