import { NEXT_AUTH_CONFIG } from "@/components/authConfig";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import Tasks from "@/components/tasks";

export default async function Page() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const authenticated = session?.user?.name ? true : false;

  var user = session?.user?.name?.split(" ");

  user?.length >= 1
    ? (user = user[0]?.charAt(0).toUpperCase() + user[0]?.slice(1))
    : (user = "Guest");

 
  return (
    <div className="w-screen h-full pt-4 pl-4 pr-6 pb-8 flex flex-col items-center justify-center gap-8">
      <Navbar authenticated={authenticated} session={session} />
      <div
        className="w-full h-fit rounded-3xl bg-black p-8 pt-0  flex flex-col items-start justify-between gap-8"
        style={{
          borderRadius: "50px",
          position: "sticky",
          top: "0",
          zIndex: "1",
          maxWidth: "800px",
        }}
      >
        <div>
          <h1 className="text-gray-50 font-light text-7xl	">Hello, {user}</h1>

          <p className="text-gray-50 font-light text-3xl collapse h-8 md:h-fit md:visible ">
            Here are your tasks
          </p>
        </div>

        <div className="flex w-full flex-col">
          <Tasks session={session} authenticated={authenticated} />
        </div>
      </div>
    </div>
  );
}
