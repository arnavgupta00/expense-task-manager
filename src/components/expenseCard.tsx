import { Trash2 } from 'lucide-react';



export default function ExpenseCard(props:{index:number,expense:any,handleDelete:any}) {
    const index :number= props.index;
    const isEven = index % 2 === 0;
    const cardColor = isEven ? "bg-gray-200" : "bg-gray-300";
    const date = new Date();
    date.getDate();
  return (
    <div className="w-full h-full bg-black rounded-3xl flex flex-col items-start justify-center P-4" style={{flexDirection:isEven?"column":"column-reverse" , alignItems:isEven?"start":"end" , paddingBottom:isEven?"0":"2rem"}}>
      <div className="w-full h-fit bg-black rounded-3xl p-4 pl-8 pr-8 flex flex-row items-center justify-center" style={{borderBottomLeftRadius:isEven?"0":"1.5rem", borderTopRightRadius:isEven?"1.5rem":"0" }}>
        <div className="flex flex-col items-start justify-center gap-4 w-2/3">
          <div className="h-1/2">
            <p className="text-gray-50 font-light text-base">{props.expense.description}</p>
          </div>
          <div className="h-1/2">
            <button className="w-fit h-6 rounded bg-gray-300 text-xs text-black active:text-gray-50 pl-4 pr-4  active:bg-black">
              {props.expense.category}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center w-1/3 gap-4">
          <div className="h-1/2">
            <p className="text-gray-50 font-light text-base">₹{props.expense.amount}</p>
          </div>
          <div className="h-1/2">
            <button onClick={(e)=>{props.handleDelete(e,props.expense.id)}} className="w-fit h-6 rounded bg-transparent text-xs   active:text-black ">
              <Trash2/>
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-fit bg-black rounded-3xl p-2  flex flex-row items-center justify-center" style={{borderTopLeftRadius:isEven?"0":"1.5rem",borderTopRightRadius:isEven?"0":"1.5rem" ,borderBottomLeftRadius:isEven?"1.5rem":"0", borderBottomRightRadius:isEven?"1.5rem":"0"}}>
        <p className="text-gray-50 font-light text-base">{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</p>
      </div>
    </div>
  );
}
