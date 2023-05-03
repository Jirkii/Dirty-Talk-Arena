import React, { useEffect, useState } from "react";
import axios from "axios";
import Primary from "@/components/primary/Primary";
import useUser from "@/lib/useUser";

function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [hover, setHover] = useState({});

  const { user } = useUser();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get("/api/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();
  }, []);

  const handleVote = async (messageId, vote) => {
    try {
      await axios.post("/api/vote", {
        messageId,
        vote,
        userId: user.id,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleMouseEnter = (messageId, ratingValue) => {
    setHover({ ...hover, [messageId]: ratingValue });
  };

  const handleMouseLeave = messageId => {
    setHover({ ...hover, [messageId]: null });
  };
  console.log(messages);
  return (
    <Primary>
      <div className="max-w-5xl mx-auto my-20 rounded-lg shadow-messageList">
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-2xl font-semibold mb-6">Přehled zpráv</h1>
          <ul>
            {messages.map(message => (
              <li
                key={message.id}
                className={`mb-4 shadow-messageItem rounded-lg px-3 py-6 flex items-center justify-between`}
              >
                <div className="flex flex-col">
                  <p className="text-lg">
                    <span className="text-secondary font-medium">
                      {message.user?.name}
                    </span>
                    : {message.content}
                  </p>
                </div>

                <div className="mr-4 flex">
                  {!message.Vote?.find(vote => vote.userId === user?.id) && (
                    <ul className="p-2 flex gap-2.5">
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;

                        return (
                          <>
                            <label
                              key={ratingValue}
                              className="cursor-pointer"
                              onMouseEnter={() =>
                                handleMouseEnter(message.id, ratingValue)
                              }
                              onMouseLeave={() => handleMouseLeave(message.id)}
                            >
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => {
                                  handleVote(message.id, index + 1);
                                }}
                                className="hidden"
                              />
                              <i
                                className={`fas fa-star text-gray-500 fa-lg ${
                                  ratingValue <= hover[message.id]
                                    ? "text-red-600"
                                    : ""
                                }`}
                              ></i>
                            </label>
                          </>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Primary>
  );
}

export default MessagesList;
