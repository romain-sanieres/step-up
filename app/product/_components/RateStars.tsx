"use client";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  MouseEvent,
} from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  onChange?: (rating: number) => void;
  name: string;
}

const StarRating = forwardRef<HTMLInputElement, StarRatingProps>(
  ({ onChange, name }, ref) => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleMouseMove = (
      e: MouseEvent<HTMLDivElement>,
      index: number
    ): void => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - left) / width;
      setHover(index + (percent > 0.5 ? 1 : 0.5));
    };

    const handleRatingChange = (newRating: number): void => {
      console.log(newRating);
      setRating(newRating);
      if (inputRef.current) {
        inputRef.current.value = newRating.toFixed(1);
        inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (onChange) {
        onChange(newRating);
      }
    };

    return (
      <div className="flex">
        <input
          type="number"
          name={name}
          ref={inputRef}
          value={rating}
          onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
          step="0.5"
          min="0"
          max="5"
          style={{ display: "none" }}
        />
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          const isHalfHovered = hover === index + 0.5;
          const isHovered = hover >= value;
          const isHalfRated = rating === index + 0.5;
          const isRated = rating >= value;

          return (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() =>
                handleRatingChange(
                  isHalfRated ? value : isRated ? index + 0.5 : value
                )
              }
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`transition-colors duration-200 ${
                  isRated
                    ? "text-yellow-400 fill-yellow-400 stroke-yellow-400"
                    : isHovered
                    ? "text-yellow-400 fill-white stroke-yellow-400"
                    : "text-gray-300 fill-white stroke-gray-300"
                }`}
                size={32}
              />
              <StarHalf
                className={`absolute top-0 left-0 transition-colors duration-200 ${
                  isHalfRated
                    ? "text-yellow-400 fill-yellow-400 stroke-yellow-400"
                    : isHalfHovered
                    ? "text-yellow-400  stroke-yellow-400"
                    : "text-transparent fill-transparent stroke-transparent"
                }`}
                size={32}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

StarRating.displayName = "StarRating";

export default StarRating;
