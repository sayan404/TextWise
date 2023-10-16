"use client";
import { uploadToS3 } from "@/lib/s3";
import { Inbox, Loader, Upload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat/", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 5 * 1024 * 1024) {
        // bigger than 5mb!
        toast.error("File is too large");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("something went wrog");
          return;
        }
        mutate(data, {
          onSuccess: ({ chatId }) => {
            toast.success("Chat created successfully!");
            router.push(`/chat/${chatId}`);
          },
          onError: (err) => {
            console.log(err);
            toast.error("Error on Creating Chat");
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="flex flex-row justify-center align-middle text-center ">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-slate-500  bg-slate-200 roundd-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col p-20 "
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <Loader className="h-10 w-10 text-blue-500 animate-spin" />
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400 ">Dropdown PDF</p>
          </>
        )}
      </div>
    </div>
  );
};
export default FileUpload;
