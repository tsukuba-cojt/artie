"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

const WorkPage = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // APIを使って作品データを取得
      const fetchWork = async () => {};
      fetchWork();
    }
  }, [id]);

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default WorkPage;
