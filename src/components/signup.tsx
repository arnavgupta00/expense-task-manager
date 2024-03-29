"use client";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Component(props: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
      <div
        
        className="z-40 w-full max-w-sm pl-8 pr-8 h-fit"
      >
        <Card className="bg-gray-50 text-black rounded-3xl">
          <CardHeader className="bg-gray-50 text-black rounded-t-3xl">
            <div className="h-2 w-full text-black flex flex-row justify-end items-center">
              <X onClick={() => props.setShowMenu(!props.showMenu)}></X>
            </div>
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <div className="">
            <hr className="text-black border-1 border-black" />
          </div>
          <CardContent className="space-y-4 bg-gray-50 text-black rounded-b-3xl pt-4">
            <div className="space-y-2 ">
              <Label className=" text-black" htmlFor="email">
                Email
              </Label>
              <Input
                className="text-gray-50"
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                className="text-gray-50"
                placeholder="••••••"
                required
                type="password"
              />
            </div>
            <button
              className="w-full bg-black text-gray-50 text-sm p-2 rounded-md hover:bg-gray-400 active:bg-gray-50 active:text-black"
              type="submit"
            >
                Sign Up
            </button>
          </CardContent>
        </Card>
      </div>
  );
}
