"use client";

import { useId } from "react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  fillColor?: string;
}

const STAR_PATH = "M13.5 0.5L17.7791 8.61036L26.8148 10.1738L20.4237 16.7496L21.729 25.8262L13.5 21.78L5.27101 25.8262L6.57631 16.7496L0.185208 10.1738L9.22092 8.61036L13.5 0.5Z";

function Star({ fill, clipId, fillColor }: { fill: "full" | "half" | "empty"; clipId: string; fillColor: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 27 26"
      fill="none"
    >
      {fill === "half" && (
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="13.5" height="26" />
          </clipPath>
        </defs>
      )}

      {/* Empty background */}
      <path d={STAR_PATH} fill="#E8E8EC" />
      {/* Filled overlay */}
      {fill !== "empty" && (
        <path
          d={STAR_PATH}
          fill={fillColor}
          clipPath={fill === "half" ? `url(#${clipId})` : undefined}
        />
      )}
    </svg>
  );
}

export default function StarRating({ rating, size = "md", fillColor = "#F59E0B" }: StarRatingProps) {
  const baseId = useId();
  const sizes = { sm: 12, md: 16, lg: 20 };
  const px = sizes[size];

  return (
    <span
      className="inline-flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      style={{ fontSize: px }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = rating >= star ? "full" : rating >= star - 0.5 ? "half" : "empty";
        return (
          <span key={star} style={{ width: px, height: px, display: "inline-flex" }}>
            <Star fill={fill} clipId={`${baseId}-${star}`} fillColor={fillColor} />
          </span>
        );
      })}
    </span>
  );
}
