import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/dist/client/link";
export default async function Home() {
  const { userId } = await auth();
  // console.log(userId)
  const isAuth = !!userId; // !userId this will check that the value is there or not and then !!then converts the value into boolean

  return (
    <>
      <div className="w-screen min-h-screen flex flex-row bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        {!isAuth ? (
          <div className="flex flex-col m-10 justify-center align-center text-center">
            <div>
              <span className="text-4xl font-poppins">Introducing &nbsp; </span>
              <span className="text-6xl font-poppins text-blue-950 bg-white">
                TextWise
              </span>
            </div>
            <p className="w-3/4 p-5 text-3xl ml-auto mr-auto font-poppins">
            Answers of your doc at your fingertips. Upload, ask, and get
              instant answers. Simplify your document search now.
            </p>
            <Link href="/sign-in">
              <Button>Login & Get Stated!</Button>
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center align-center text-center bg-slate-50 pb-20">
            <div className=" ml-auto mr-auto pb-10 ">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="pb-10">
              <FileUpload />
            </div>
            <div className="pb-10">
              <Button>Go to Chat</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
