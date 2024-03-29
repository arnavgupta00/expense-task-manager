"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignUp from "@/components/signup";
import SignIn from "@/components/signin";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const LoggedIn = false;
  const router = useRouter();

  const [showmenuSignUp, setShowMenuSignUp] = useState(false);
  const [showmenuSignIn, setShowMenuSignIn] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-row items-center justify-end"
      style={{ userSelect: "none", overflow: "hidden" }}
    >
      <AnimatePresence>
        {showmenuSignIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex flex-row items-center justify-center "
          >
            <SignIn showMenu={showmenuSignIn} setShowMenu={setShowMenuSignIn} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showmenuSignUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex flex-row items-center justify-center "
          >
            <SignUp showMenu={showmenuSignUp} setShowMenu={setShowMenuSignUp} />
          </motion.div>
        )}
      </AnimatePresence>
      <Dropdown>
        <DropdownTrigger>
          <div className="w-10 h-10 bg-gray-50 rounded-full border-transparent border-0"></div>
        </DropdownTrigger>
        <div className="border-none">
          {LoggedIn ? (
            <DropdownMenu
              aria-label="Static Actions"
              className="w-fit h-fit p-2 bg-gray-50 rounded-3xl border-none "
            >
              <DropdownItem
                className="w-full h-full p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-black rounded-t-3xl text-lg font-sans font-semibold"
                key="profile"
                variant="solid"
              >
                Profile
              </DropdownItem>
              <DropdownItem
                className="w-full h-fit p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-black  text-lg font-sans  font-semibold "
                key="taskify"
                variant="solid"
              >
                Taskify
              </DropdownItem>
              <DropdownItem
                className="w-full h-fit p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-red-500 rounded-b-3xl text-lg font-sans  font-semibold "
                key="logout"
                variant="solid"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu
              aria-label="Static Actions"
              className="w-fit h-fit p-2 bg-gray-50 rounded-3xl border-none "
            >
              <DropdownItem
                className="w-full h-full p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-black rounded-t-3xl text-lg font-sans font-semibold"
                key="login"
                variant="solid"
                onClick={() => setShowMenuSignIn(!showmenuSignIn)}
              >
                Log In
              </DropdownItem>
              <DropdownItem
                className="w-full h-fit p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-black  text-lg font-sans  font-semibold "
                key="signuo"
                variant="solid"
                onClick={() => setShowMenuSignUp(!showmenuSignUp)}
              >
                Sign Up
              </DropdownItem>
              <DropdownItem
                className="w-full h-fit p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-red-500 rounded-b-3xl text-lg font-sans  font-semibold "
                key="taskify"
                variant="solid"
              >
                Taskify
              </DropdownItem>
            </DropdownMenu>
          )}
        </div>
      </Dropdown>
    </div>
  );
}
