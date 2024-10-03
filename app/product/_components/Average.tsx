import { StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
type CommentPropsType = {
    id: string;
    name: string;
    title: string;
    comment: string;
    rating: number | null;
    createdAt: Date;
};
export default function Average({
  comments,
  page,
}: {
  comments: CommentPropsType[];
  page?: string;
}) {
  const calculateAverageRating = (comments: CommentPropsType[]) => {
    const totalRatings = comments
      ?.filter((comment) => comment.rating !== null)
      .reduce((sum, comment) => sum + (comment.rating || 0), 0);
    const numberOfRatings = comments?.filter(
      (comment) => comment.rating !== null
    ).length;
    return numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
  };
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex">
        {/* Étoiles pleines */}
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon
              key={`full-${index}`}
              className="fill-primary"
              size={page === "home" || "product" ? 15 : 20}
            />
          ))}

        {/* Demi-étoile */}
        {halfStar === 1 && (
          <div className="relative">
            <StarIcon
              className="fill-none stroke-primary"
              size={page === "home" || "product" ? 15 : 20}
            />
            <StarIcon
              className="fill-primary absolute top-0 left-0"
              size={page === "home" || "product" ? 15 : 20}
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        )}

        {/* Étoiles vides */}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon
              key={`empty-${index}`}
              className="fill-none stroke-primary"
              size={page === "home" || "product" ? 15 : 20}
            />
          ))}
      </div>
    );
  };
  const averageRating = calculateAverageRating(comments);
  return (
    <div className="flex gap-x-2 items-center">
      {renderStars(averageRating)}
      <p className="text-sm font-semibold flex gap-x-2">
        {page === "home" || "product" ? null : averageRating?.toFixed(1)}
        {page === "home" || "products"  ? (
          <span className="text-muted-foreground">({comments?.length})</span>
        ) : page === "product" ? (
          <Link href={"#commentaries"} className="underline">
            {comments?.length} review{comments?.length > 1 ? "s" : null}
          </Link>
        ) : (
          <span className="text-muted-foreground">
            Based on {comments?.length} review{comments?.length > 1 ? "s" : null}
          </span>
        )}
      </p>
    </div>
  );
}
