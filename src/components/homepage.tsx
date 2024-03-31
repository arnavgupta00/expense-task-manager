
import BalanceBar from "@/components/balanceBar";
import ExpenseCard from "@/components/expenseCard";
import AddExpense from "@/components/addExpense";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./authConfig";
import ListExpenses from "./listExpenses";

export default async function HomePage() {
  const listExpenses = [
    "asgaga",
    "Asgahah",
    "Hdsgbdsh",
    "gsabhe",
    "bhrsaw",
    "ASGag",
    125,
    1,
    6,
    167,
    2732,
  ];
  const session = await getServerSession(NEXT_AUTH_CONFIG); 
  const authenticated =session?.user?.name ? true : false;
  var user = session?.user?.name?.split(" ");

  
  user?.length >= 1 ? user = user[0]?.charAt(0).toUpperCase() + user[0]?.slice(1): user = "Guest";


  console.log("fasf",session);
  return (
    <div className="w-screen h-full pt-4 pl-4 pr-6 flex flex-col items-center justify-center gap-8">
      <Navbar authenticated={authenticated} session={session}/>
      <div
        className="w-full h-fit rounded-3xl bg-black p-8 pt-0  flex flex-col items-start justify-between gap-8"
        style={{
          borderRadius: "50px",
          position: "sticky",
          top: "0",
          zIndex: "1",
        }}
      >
        <div>
          <h1 className="text-gray-50 font-light text-7xl	">Hello, {user}</h1>

          <p className="text-gray-50 font-light text-3xl collapse h-8 md:h-fit md:visible ">
            Welcome to your personal finance tracker
          </p>
        </div>
        <AddExpense session={session} />
        
      </div>

      <ListExpenses session={session} />
    </div>
  );
}
