"use client";
import { getComments } from "@/app/zsa/product.action";
import { useQuery } from "@tanstack/react-query";
import { StarHalfIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type CommentType = {
  id: string;
  name: string;
  title: string;
  comment: string;
  rating: number | null;
  createdAt: Date;
};

export default function Rating() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const [comments] = await getComments({ id: String(id)});
      return comments as CommentType[];
    },
  });

  if (isError) return <></>;
  if (isLoading) return <></>;
  if (data && data.length > 0)
    return (
      <div className="flex items-center">
        <StarIcon className="fill-primary" size={15} />
        <StarIcon className="fill-primary" size={15} />
        <StarIcon className="fill-primary" size={15} />
        <StarIcon className="fill-primary" size={15} />
        <StarHalfIcon className="fill-primary" size={15} />
        <Link href="#commentaries" className="text-sm ml-2 underline">
          {data.length} reviews
        </Link>
      </div>
    );
}
