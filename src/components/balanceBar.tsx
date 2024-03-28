"use client";

import { useState } from "react";

export default function BalanceBar() {
  const [budget, setBudget] = useState(5000);
  const [expenses, setExpenses] = useState(4000);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

      <div className="text-gray-50 font-light text-xl md:3xl" style={{alignSelf:"end"}}>Expenses: ₹{expenses}</div>  
      <div className="w-full h-8 bg-gray-400 rounded-3xl">
        <div
          className=" h-full bg-gray-50 rounded-3xl"
          style={{ width: `${(expenses / budget) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
