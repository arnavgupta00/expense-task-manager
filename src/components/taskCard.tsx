"use client";

import { deleteTask, updateTask } from "@/utils/actions";
import { set } from "date-fns";

import { Trash2, Check, ArrowUp } from "lucide-react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
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
export default function TaskCard(props: {
  task: TaskPost;
  deleteTaskIdOptimistic?: any;
  updateTaskIdOptimistic?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);
  return (
    <div className="w-full h-fit p-2  flex flex-col justify-center gap-4 items-center">
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div>
          <h1 className="text-gray-50 font-light text-2xl">
            {props?.task?.title}
          </h1>
        </div>
        <div className="flex flex-row gap-4  justify-center items-center">
          <button
            onClick={async () => {
              setLoading(true);
              await updateTask(props?.task?._id, {
                TaskCompletedQ: !props.task.TaskCompletedQ,
              });
              props.updateTaskIdOptimistic(props?.task?._id);
              setLoading(false);
            }}
            className=""
          >
            {loading ? (
              <ClipLoader
                color="white"
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : props?.task?.TaskCompletedQ ? (
              <ArrowUp size={24} />
            ) : (
              <Check size={24} />
            )}
          </button>
          <button
            onClick={async () => {
              setTrashLoading(true);
              await deleteTask(props?.task?._id);
              props.deleteTaskIdOptimistic(props?.task?._id);
              setTrashLoading(false);
            }}
            className=""
          >
            {trashLoading ? (
              <ClipLoader
                color="white"
                loading={trashLoading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <Trash2 size={24} />
            )}
          </button>
        </div>
      </div>
      <div className="w-full h-fit flex flex-row justify-between items-center">
        {props?.task?.content[0]?.children[0]?.text}
      </div>
    </div>
  );
}
