// src/components/ui/map/SkeletonLoader.tsx
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-md">
      <div className="h-full bg-gray-300"></div>
    </div>
  );
};

export default SkeletonLoader;
