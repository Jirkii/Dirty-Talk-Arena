import React, { useEffect, useState } from "react";
import axios from "axios";

const BestPost = () => {
  const [bestMessage, setBestMessage] = useState(null);

  useEffect(() => {
    async function fetchBestMessage() {
      try {
        const response = await axios.get("/api/messages?best=true");
        setBestMessage(response.data);
      } catch (error) {
        console.error("Error fetching best message:", error);
      }
    }

    fetchBestMessage();
  }, []);

  if (!bestMessage) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[780px] flex flex-col items-center my-10 shadow-topic rounded-lg py-10">
      <div className="text-center px-5">
        <h2 className="text-2xl mb-5">Nejlepší hláška</h2>
        <p className="text-lg">
          <span className="text-secondary font-medium">
            {bestMessage?.user?.name}
          </span>
          : {bestMessage?.content}
        </p>
      </div>
    </div>
  );
};

export default BestPost;
