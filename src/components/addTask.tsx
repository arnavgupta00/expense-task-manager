"use client";

import { CirclePlus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Session } from "inspector";
import { Spinner } from "@nextui-org/react";
import ClipLoader from "react-spinners/ClipLoader";
import { set } from "date-fns";
import { createTask } from "@/utils/actions";

export default function AddTask(props: {
  session?: any;
  createTaskIdOptimistic?: any;
  setTaskID?: any;
}) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    setLoading(true);

    if (props.session == undefined) {
      setLoading(false);
      return;
    }
    event.preventDefault();

    try {
      await createTask({
        title: taskTitle,
        content: taskContent,
        userEmail: props?.session?.user?.email,
      });
      props.createTaskIdOptimistic({
        title: taskTitle,
        TaskCompletedQ: false,
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: taskContent,
              },
            ],
            markDefs: [],
          },
        ],
        userEmail: props?.session?.user?.email,
        _createdAt: new Date().toISOString(),
      });
      
      setLoading(false);
      setShowMenu(!showMenu);
      setTimeout(() => {
        props.setTaskID(new Date().toISOString());
      }, 1000);
    } catch (error) {
      console.error("Error Adding Task:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-fit  flex flex-col items-end justify-center "
      style={{ marginBottom: "20px", maxWidth: "800px" }}
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
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-7/12 text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0 border-b-2 border-black border-solid"
                placeholder="Task Title"
              />
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
            <div className="h-1/2 w-full flex flex-row items-start justify-between p-4 gap-0">
              <div className="flex w-full flex-row items-start justify-between gap-4">
                <input
                  type="text"
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  className="w-full text-black h-fit bg-transparent p-2 pl-0 pb-0 border-0 border-b-2 border-black border-solid"
                  placeholder="Task Detail"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
