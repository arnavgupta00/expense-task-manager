"use client";

import { useEffect, useState } from "react";
import TaskCard from "./taskCard";
import { createTask, getData } from "@/utils/actions";
import { title } from "process";
import { user } from "@nextui-org/react";
import AddTask from "./addTask";
import { Task } from "@prisma/client";
interface TaskPost {
  _type: "taskPost";
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  userEmail: string;
  TaskDate: string; // Date string
  TaskCompletedQ: boolean;
  content: {
    _key?: string;
    _type?: "block";
    children: Array<{
      _key?: string;
      _type?: "span";
      text: string;
      marks?: Array<string>;
    }>;
    markDefs?: Array<{
      _key: string;
      _type: "link";
      href: string;
      blank?: boolean;
      nofollow?: boolean;
    }>;
    style?: string;
  }[];
}
export default function Tasks(props: {
  authenticated: boolean;
  session?: any;
  listOfTasks?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("Oldest");
  const [listTasks, setListTasks] = useState<TaskPost[]>([]);
  const [taskID, setTaskID] = useState("");
  const [query, setQuery] = useState("");
  const deleteTaskIdOptimistic = (id: string) => {
    setListTasks(listTasks.filter((task: any) => task._id !== id));
  };
  const createTaskIdOptimistic = (task: TaskPost) => {
    setListTasks([...listTasks, task]);
  };
  const updateTaskIdOptimistic = (id: string) => {
    setListTasks(
      listTasks.map((task: TaskPost) => {
        if (task._id === id) {
          task.TaskCompletedQ = !task.TaskCompletedQ;
          return task;
        }
        return task;
      })
    );
  };
  async function fetchData(query?: string, dateQuery?: string) {
    console.log("fetching data server");

    const data = await getData(props.session?.user?.email, query, dateQuery);
    console.log(data);
    setListTasks(data);
  }
  useEffect(() => {
    fetchData();
  }, [taskID]);
  return (
    <div className=" w-full h-full flex flex-col gap-8 justify-center items-center ">
      <div className="min-w-full flex flex-row items-start justify-between gap-2 bg-gray-50 p-4 rounded-3xl">
        <button
          onClick={() => {
            setPeriod("Today");
            fetchData(
              " | order(_createdAt asc)",
              `&& _createdAt >= "${
                new Date().toISOString().split("T")[0]
              }T00:00:00Z" && _createdAt <= "${
                new Date().toISOString().split("T")[0]
              }T23:59:59Z"`
            );
          }}
          className="w-1/3 h-8 rounded text-black  bg-gray-300 pl-4 pr-4 hover:bg-gray-500 "
          style={{
            backgroundColor: period === "Today" ? "black" : "",
            color: period === "Today" ? "white" : "",
          }}
        >
          Today
        </button>
        <button
          onClick={() => {
            setPeriod("Latest");
            fetchData(" | order(_createdAt desc)");
          }}
          className="w-1/3 h-8 rounded text-black  bg-gray-300 pl-4 pr-4 hover:bg-gray-500 "
          style={{
            backgroundColor: period === "Latest" ? "black" : "",
            color: period === "Latest" ? "white" : "",
          }}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setPeriod("Oldest");
            fetchData(" | order(_createdAt asc)");
          }}
          className="w-1/3 h-8 rounded text-black  bg-gray-300 pl-4 pr-4 hover:bg-gray-500 "
          style={{
            backgroundColor: period === "Oldest" ? "black" : "",
            color: period === "Oldest" ? "white" : "",
          }}
        >
          Oldest
        </button>
      </div>

      <div className="w-full h-full">
        <AddTask
          session={props.session}
          createTaskIdOptimistic={createTaskIdOptimistic}
          setTaskID={setTaskID}
        />
      </div>
      <div className="w-full h-full  flex flex-col justify-center items-center ">
        {listTasks &&
          listTasks.map((task: TaskPost) => {
            if (task.TaskCompletedQ === true) return;
            return (
              <div className="min-w-full h-full p-4">
                <TaskCard
                  task={task}
                  deleteTaskIdOptimistic={deleteTaskIdOptimistic}
                  updateTaskIdOptimistic={updateTaskIdOptimistic}
                />
              </div>
            );
          })}
      </div>
      <div className="w-full h-full  flex flex-col justify-center items-start ">
        <h1 className="text-gray-50 font-light text-3xl collapse h-8 md:h-fit md:visible ">
          {" "}
          Completed Tasks
        </h1>

        {listTasks &&
          listTasks.map((task: TaskPost) => {
            if (task.TaskCompletedQ === false) return;

            return (
              <div className="min-w-full h-full p-4">
                <TaskCard
                  task={task}
                  deleteTaskIdOptimistic={deleteTaskIdOptimistic}
                  updateTaskIdOptimistic={updateTaskIdOptimistic}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
