import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

interface Expense {
  id: number;
  amount: number;
  createdAt: string;
}

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Extracting dates and expenses from the expenses list
  const data = expenses.map((expense) => ({
    x: new Date(expense.createdAt),
    y: expense.amount
  }));

  return (
    <div className="w-full h-full p-0">
      <p className="text-black font-light text-base md:text-xl visible  ">Expense Chart:</p>
      <VictoryChart  scale={{ x: "time" }}>
        <VictoryAxis
          tickFormat={(date) => new Date(date).toLocaleDateString()}
          label="Date"
          style={{
            axisLabel: { padding: 30 }
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Amount"
          style={{
            axisLabel: { padding: 40 }
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: "rgb(75, 192, 192)" }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default ExpenseChart;
