"use client";

import { useEffect, useState } from "react";

export default function BalanceBar(props:{expenses:any}) {

  

  const [budget, setBudget] = useState(5000);
  const [expenses, setExpenses] = useState(props.expenses);

  
  useEffect(() => {
    setExpenses(props.expenses);
  }, [expenses]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

      <div className="text-black font-light text-xl md:3xl" style={{alignSelf:"start", marginLeft:`${(expenses / budget) * 100}%`}}>Expenses: ₹{expenses}</div>  
      <div className="w-full h-8 bg-gray-400 rounded-3xl">
        <div
          className=" h-full bg-black rounded-3xl"
          style={{ width: `${(expenses / budget) * 100}%` }}
        ></div>
      </div>
      <div className="text-black font-light text-xl md:3xl" style={{alignSelf:"end"}}>
        Budget: ₹{budget}
        
      </div>  
    </div>
  );
}
