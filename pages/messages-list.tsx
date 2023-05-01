import React, { useEffect, useState } from "react";
import axios from "axios";
import Primary from "@/components/primary/Primary";
import useUser from "@/lib/useUser";

function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [voteDropdown, setVoteDropdown] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [votedMessageId, setVotedMessageId] = useState(null);

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
      const message = messages.find((message) => message.id === messageId);
      console.log(message);
      const votedUserIds = message.votedUserIds || [];
      if (votedUserIds.includes(user.id)) {
        setErrorMessage(
          `Již jste hlasoval pro zprávu '${message.content}' od ${message.user?.name}`
        );
        setVotedMessageId(messageId);
        return;
      }

      const updatedMessages = messages.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            votes: message.votes + parseInt(vote, 10),
            votedUserIds: [...votedUserIds, user.id],
          };
        }
        return message;
      });
      setMessages(updatedMessages);
      setErrorMessage("");
      setVotedMessageId(messageId);
      await axios.post("/api/vote", { messageId, vote, userId: user.id });
    } catch (error) {
      console.error("Error voting:", error);
      setErrorMessage("An error occurred while processing your vote");
    }
  };

  const voteColors = [
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-purple-500",
  ];

  return (
    <Primary>
      <div className="max-w-5xl mx-auto my-20 rounded-lg shadow-messageList">
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-2xl font-semibold mb-6">Přehled zpráv</h1>
          {errorMessage && (
            <div className="bg-red-500 text-white px-3 py-2 rounded mb-4 font-medium">
              {errorMessage}
            </div>
          )}
          <ul>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`mb-4 shadow-messageItem rounded-lg px-3 py-6 flex justify-between ${
                  votedMessageId === message.id && errorMessage
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <div className="flex flex-col">
                  <p className="text-lg">
                    <span className="text-secondary font-medium">
                      {message.user?.name}
                    </span>
                    : {message.content}
                  </p>
                  <div className="flex items-center">
                    <span>
                      Počet hlasů: <b>{message.votes}</b>
                    </span>
                  </div>
                </div>
                <div className="mr-4 self-end flex flex-col-reverse">
                  <button
                    className={`text-gray-700 font-semibold border-2 border-primary rounded-lg px-3 py-1.5 max-w-max ${
                      voteDropdown === message.id ? "self-end" : ""
                    }`}
                    onClick={() =>
                      setVoteDropdown(
                        voteDropdown === message.id ? null : message.id
                      )
                    }
                  >
                    <i className="fas fa-thumbs-up"></i>
                  </button>
                  {voteDropdown === message.id && (
                    <ul className="mt-2 p-2 flex pr-0">
                      {voteColors.map((color, index) => (
                        <li
                          key={index + 1}
                          className={`cursor-pointer hover:bg-gray-100 hover:text-gray-900 p-2 last:pr-0.5 ${color}`}
                          onClick={() => {
                            handleVote(message.id, index + 1);
                            setVoteDropdown(null);
                          }}
                        >
                          <i className="fas fa-thumbs-up"></i> {index + 1}
                        </li>
                      ))}
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
