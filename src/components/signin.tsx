"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { X } from "lucide-react";

import { signIn, signOut } from "next-auth/react";

export default function SignIn(props: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn("credentials", {
        username: email,
        password: password,
        callbackUrl: "/",
      });

      setEmail("");
      setPassword("");
      props.setShowMenu(!props.showMenu);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <div className="z-40 w-full max-w-sm pl-8 pr-8 h-fit">
        <form onSubmit={handleSubmit}>
          <Card className="bg-gray-50 text-black rounded-3xl">
            <CardHeader className="bg-gray-50 text-black rounded-t-3xl">
              <div className="h-2 w-full text-black flex flex-row justify-end items-center">
                <X onClick={() => props.setShowMenu(!props.showMenu)}></X>
              </div>
              <CardTitle className="text-2xl font-bold">
                Log into your account
              </CardTitle>
              <CardDescription>
                Enter your information to log into your account
              </CardDescription>
            </CardHeader>
            <div className="">
              <hr className="text-black border-1 border-black" />
            </div>
            <CardContent className="space-y-4 bg-gray-50 text-black rounded-b-3xl pt-4">
              <div className="space-y-2">
                <Label className="text-black" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="text-gray-50"
                  id="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="text-gray-50"
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-black text-gray-50 text-sm p-2 rounded-md hover:bg-gray-400 active:bg-gray-50 active:text-black"
                type="submit"
              >
                Sign In
              </button>
              <hr className="border-1 border-gray-300" />
              <div className="p-4 pl-0 pr-0">
                <button
                  className="w-full bg-black text-gray-50 text-sm p-2 rounded-md hover:bg-gray-400 active:bg-gray-50 active:text-black"
                  type="submit"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Sign in with Google
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  );
}
