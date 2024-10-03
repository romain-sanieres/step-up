"use client";
import React from "react";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getComments } from "@/app/zsa/product.action";
import CreateComment from "./CreateComment";
import Average from "./Average";

type CommentType = {
  id: string;
  name: string;
  title: string;
  comment: string;
  rating: number | null;
  createdAt: Date;
};

export default function Commentaries() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const [comments] = await getComments({ id: String(id) });
      return comments as CommentType[];
    },
  });

  if (isError) return <></>;
  if (isLoading) return <main className="min-h-[100dvh]"></main>;
  return (
    <div className="flex flex-col mt-32" id="commentaries">
      <h2 className="text-6xl text-center">Ratings and Reviews</h2>
      <div className="mt-10 p-4 py-10 space-y-2 border-b flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          {data && data.length > 0 ? (
            <Average comments={data} />
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
        <CreateComment id={String(id)} />
      </div>
      {data && data.length > 0
        ? data.map((item, index) => (
            <Comment
              key={index}
              name={item.name}
              title={item.title}
              comment={item.comment}
              rating={item.rating}
              date={item.createdAt}
            />
          ))
        : null}
    </div>
  );
}
