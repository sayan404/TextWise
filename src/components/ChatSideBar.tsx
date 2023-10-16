"use client";

import { DrizzleChat } from "@/lib/db/schema";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquare, PlusCircle, Menu , X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
type Props = {
  chats: DrizzleChat[];
  chatId: number;
}; 

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [stateColapse, setStateColapse] = useState(true);

  return (
    <>
      {stateColapse ? (
        <div className="w-full max-h-screen min-h-screen  overflow-y-scroll soff p-4 text-black bg-sky-300">
          <Menu className="mb-4" onClick={() => stateColapse ? setStateColapse(false) : setStateColapse(true)} />
          <Link href="/">
            <Button className="w-full">
              <PlusCircle className="mr-2 w-4 h-4" />
              New Chat
            </Button>
          </Link>

          <div className="flex max-h-screen overflow-hidden pb-20 flex-col gap-2 mt-4">
            {chats.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <div
                  className={cn("rounded-lg p-3 text-black flex items-center", {
                    "bg-blue-900 text-white": chat.id === chatId,
                    "hover:bg-blue-900 hover:text-white": chat.id !== chatId,
                  })}
                >
                  <MessageSquare className="mr-2" />
                  <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                    {chat.pdfName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
        <X className="m-3" onClick={() => stateColapse ? setStateColapse(false) : setStateColapse(true)} />
        </>
      )}
    </>
  );
};

export default ChatSideBar;
