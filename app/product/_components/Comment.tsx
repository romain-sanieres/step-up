import { CircleCheckBigIcon, StarIcon } from "lucide-react";
import React from "react";

type CommentPropsType = {
  name: string;
  title: string;
  comment: string;
  rating: number | null;
  date: Date;
};

export default function Comment({name , title, comment, rating, date} : CommentPropsType) {

  const timesAgo = (date: Date) => {
    return new Date(date).toLocaleDateString();
  }


  const renderStars = (rating: number | null) => {
    if (rating === null) return null;
    
    const fullStars = Math.floor(rating); // Nombre d'étoiles pleines
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Une demi-étoile si la décimale >= 0.5
    const emptyStars = 5 - fullStars - halfStar; // Étoiles vides restantes

    return (
      <div className="flex">
        {/* Étoiles pleines */}
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`full-${index}`} className="fill-primary" size={20} />
          ))}

        {/* Demi-étoile */}
        {halfStar === 1 && (
          <div className="relative">
            <StarIcon className="fill-none stroke-primary" size={20} />
            <StarIcon className="fill-primary absolute top-0 left-0" size={20} style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        )}

        {/* Étoiles vides */}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon key={`empty-${index}`} className="fill-none stroke-primary" size={20} />
          ))}
      </div>
    );
  };

  return (
    <div className="p-4 py-6 space-y-6 border-b">
      <div className="flex justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-sm">{name}</p>
            <p className="text-sm font-bold flex items-center gap-x-1">
              <span>Verified Buyer</span> <CircleCheckBigIcon size={15} />
            </p>
          </div>
          {renderStars(rating)}
        </div>
        <p className="text-muted-foreground text-xs">{timesAgo(date)}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xl font-bold">{title}</p>
        <p className="font-thin">{comment}</p>
      </div>
    </div>
  );
}
