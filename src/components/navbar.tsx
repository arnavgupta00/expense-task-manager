"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Navbar() {
  return (
    <div className="w-full h-full flex flex-row items-center justify-end">
      <Dropdown>
        <DropdownTrigger>
          <div className="w-10 h-10 bg-gray-50 rounded-full"></div>
        </DropdownTrigger>
        <DropdownMenu
          className="w-fit h-fit p-2 bg-gray-50 rounded-3xl"
         
        >
          <DropdownItem
            className="w-full h-full p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-black rounded-t-3xl text-lg font-sans  font-semibold border-transparent border-0" key="profile"
          >
            Profile
          </DropdownItem>
          <DropdownItem className="w-full h-fit p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-black  text-lg font-sans  font-semibold border-transparent	border-0" key="taskify">Taskify</DropdownItem>
          <DropdownItem className="w-full h-fit p-2 pl-8 pr-8 bg-gray-50 hover:bg-gray-300 active:bg-black active:text-gray-50 text-red-500 rounded-b-3xl text-lg font-sans  font-semibold border-transparent	border-0" key="logout" >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
