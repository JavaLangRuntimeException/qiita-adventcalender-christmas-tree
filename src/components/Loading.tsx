// components/Loading.tsx

import React from 'react';
import { FaSnowman } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex flex-col items-center">
      <FaSnowman className="text-6xl animate-bounce mb-4" />
      <p className="text-xl">読み込み中...</p>
    </div>
  );
};

export default Loading;
