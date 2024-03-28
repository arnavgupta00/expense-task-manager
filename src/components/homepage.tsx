import BalanceBar from "@/components/balanceBar";
import ExpenseCard from "@/components/expenseCard";
import AddExpense from "./addExpense";

export default function HomePage() {



  const listExpenses = ["asgaga","Asgahah","Hdsgbdsh","gsabhe","bhrsaw","ASGag",125,1,6,167,2732]


  return (
    <div className="w-screen h-full pt-4 pl-4 pr-6 flex flex-col items-center justify-center gap-8">
      <div
        className="w-full h-fit rounded-3xl bg-black p-12  flex flex-col items-start justify-between gap-8"
        style={{ borderRadius: "50px" , position:"sticky", top:"0", zIndex:"1" }}
      >
        <div>
        <h1 className="text-gray-50 font-light text-7xl	">Hello, Arnav</h1>

        <p className="text-gray-50 font-light text-3xl collapse h-8 md:h-fit md:visible ">
          Welcome to your personal finance tracker
        </p>
        </div>
        <AddExpense/>
        <BalanceBar />
        
      </div>
      <div
        className="w-full rounded-3xl bg-gray-50 p-12 pb-20 flex flex-col items-start justify-start gap-4"
        style={{ minHeight: "400px",height:"700px", borderRadius: "50px" ,position:"sticky", top:"0", zIndex:"5", overflowY:"scroll"  }}
      >
        <div className="w-full flex flex-row items-start justify-between gap-2">
          <button className="w-1/3 h-8 rounded text-black focus:text-gray-50 bg-gray-300 pl-4 pr-4 hover:bg-gray-500 focus:bg-black">
            Today
          </button>
          <button className="w-1/3 h-8 rounded text-black focus:text-gray-50 bg-gray-300 pl-4 pr-4 hover:bg-gray-500 focus:bg-black">
            Week
          </button>
          <button className="w-1/3 h-8 rounded text-black focus:text-gray-50 bg-gray-300 pl-4 pr-4 hover:bg-gray-500 focus:bg-black">
            Month
          </button>
        </div>
        <p className="text-black font-light text-2xl visible  pb-6">Expenses</p>
        <div className="w-full flex flex-col items-start justify-between gap-14 pt-4">
          {listExpenses.map((expense:any, index:number) => {
            return <div className="w-full h-20 mb-4" key={index}>
            <ExpenseCard index={index} />
          </div>
          })}
          
          
          
        </div>
      </div>
      
      
    </div>
  );
}
