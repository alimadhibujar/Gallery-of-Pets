import React from "react";
import "./skeletonCard.css";

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-caption">
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
    </div>
  </div>
);

const SkeletonLoading = ({ count }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <SkeletonCard key={index} />
    ))}
  </>
);

export default SkeletonLoading;
