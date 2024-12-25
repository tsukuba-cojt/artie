"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorkPage = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      // Fetch the work data using the API
      const fetchWork = async () => {
        try {
          const response = await fetch(`/api/works/basic?id=${id}`);
          const data = await response.json();

          if (!response.ok) {
            setError(data.error || "An error occurred.");
            return;
          }

          setDescription(data.description || "No description available.");
        } catch (err) {
          setError("An unexpected error occurred.");
        }
      };

      fetchWork();
    }
  }, [id]);

  return (
    <div>
      <h1>Work ID: {id}</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Description: {description}</p>
      )}
    </div>
  );
};

export default WorkPage;
