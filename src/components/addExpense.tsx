"use client";

import { CirclePlus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Session } from "inspector";
import { Spinner } from "@nextui-org/react";
import ClipLoader from "react-spinners/ClipLoader";



export default function AddExpense(props: { session?: any }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [category, setCategory] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const [period, setPeriod] = useState("Today");
  const [listExpenses, setListExpenses] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    setLoading(true);

    if (props.session == undefined) {
      setLoading(false);
      return;
    }
    event.preventDefault();

    try {
      const response = await axios.post("/api/expenseAdd", {
        amount: expenseAmount,
        category: category,
        description: expenseName,
        userEmail: props.session.user.email,
      });

      console.log("Add Expense successful:", response.data);

      setExpenseName("");
      setExpenseAmount("");
      setCategory("");
      setShowMenu(!showMenu);
      setLoading(false);

      window.location.reload();
    } catch (error) {
      console.error("Error Adding Expense:", error);
      setLoading(false);
    }
  };
  const handleFetch = async () => {
    if (props.session == undefined) return;

    try {
      const response = await axios.post("/api/expenseFetch", {
        userEmail: props.session.user.email,
        period: period,
      });

      console.log("Fetched Expense successful:", response.data);
      setListExpenses(response.data.periodExpenses);
      setUniqueCategories(
        Array.from(
          new Set(
            response.data.periodExpenses.map((expense: any) => expense.category)
          )
        )
      );
    } catch (error) {
      console.error("Error Fetching Expense:", error);
    }
  };
  useEffect(() => {
    handleFetch();
  }, [period]);

  return (
    <div
      className="w-full h-fit  flex flex-col items-end justify-center "
      style={{ marginBottom: "20px" }}
    >
      <div
        onClick={() => setShowMenu(!showMenu)}
        className={`text-${showMenu ? "black" : "gray-50"} bg-${
          showMenu ? "gray-50" : "transparent"
        } rounded-full p-2 rounded-br-none rounded-bl-none transition-colors duration-300 cursor-pointer`}
        style={{ marginBottom: "-20px" }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: showMenu ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <CirclePlus size={52} />
        </motion.div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-gray-50 rounded-3xl rounded-tr-none overflow-hidden"
          >
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
                className="w-4/12 text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0 border-b-2 border-black border-solid"
                placeholder="Amount"
              />
            </div>
            <div className="h-1/2 w-full flex flex-row items-start justify-between p-4 gap-0">
              <div className="flex w-1/2 flex-row items-start justify-between gap-4">
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
                  <option
                    className="text-black bg-gray-50 p-8 w-12 text-xs border-4  border-black border-solid active:bg-black focus:bg-black hover:bg-black"
                    value=""
                  >
                    Select Category
                  </option>
                  <br className="text-black" />
                  {uniqueCategories.map((category) => {
                    return (
                      <option
                        className="text-black bg-gray-50 p-8 text-xs border-2 border-b-2 border-black border-solid"
                        value="option1"
                      >
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                onClick={(e) => handleSubmit(e)}
                className="w-fit h-fit p-2 pl-3 pr-3 text-bg-gray-50 bg-black active:bg-gray-50 active:text-black rounded flex flex-row items-center justify-between"
              >
                {loading ? (
                  <ClipLoader
                    color="white"
                    loading={loading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <Send size={25} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
