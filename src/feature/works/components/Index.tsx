// pages/index.tsx

import React from "react";
import Header from "../components/Header"; // Headerコンポーネントをインポート

const Home: React.FC = () => {
  return (
    <div>
      {/* Headerコンポーネントを使用 */}
      <Header />
    </div>
  );
};

export default Home;
