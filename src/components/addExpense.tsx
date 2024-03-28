"use client";

import { CirclePlus, Send } from "lucide-react";
import { useState } from "react";

export default function AddExpense() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const onSelect: boolean = true;

  return (
    <div className="w-full h-fit  flex flex-col items-end justify-center ">
      <div className="text-black bg-gray-50 rounded-full p-2 rounded-br-none rounded-bl-none">
        <CirclePlus size={52} />
      </div>
      <div className="w-full h-40 bg-gray-50 rounded-3xl rounded-tr-none flex flex-col items-center justify-center">
        <div className="h-1/2 w-full flex flex-row items-center justify-between p-4 gap-2">
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="w-7/12 text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0 border-b-2 border-black border-solid"
            placeholder="Expense Name"
          />
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="w-4/12 text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0 border-b-2 border-black border-solid "
            placeholder="Amount"
          />
        </div>
        <div className="h-1/2 w-full flex flex-row items-start justify-between p-4 gap-0">
          <div className="flex w-1/2 flex-row items-start justify-center gap-4">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-10/12 text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0 border-b-2 border-black border-solid"
              placeholder="Category"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-4 text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0  border-black border-solid"
            >
              <option className="text-black bg-gray-50 p-8 w-12 text-xs border-4  border-black border-solid active:bg-black focus:bg-black hover:bg-black" value="">Select Category</option>
              <br className="text-black"/>
              <option className="text-black bg-gray-50 p-8 text-xs border-2 border-b-2 border-black border-solid" value="option1">Option 1</option>
              <option className="text-black bg-gray-50 p-8 text-xs border-2 border-b-2 border-black border-solid" value="option2">Option 2</option>
              <option className="text-black bg-gray-50 p-8 text-xs border-2 border-b-2 border-black border-solid" value="option3">Option 3</option>
            </select>
          </div>
          <button className="w-fit h-fit p-2 pl-3 pr-3 text-bg-gray-50 bg-black active:bg-gray-50 active:text-black rounded flex flex-row items-center justify-between">
            <Send size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}