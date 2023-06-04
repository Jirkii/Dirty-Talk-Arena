import React, { useState } from "react";
import axios from "axios";
import useUser from "@/lib/useUser";
import useSWR, { mutate } from "swr";

const fetcher = url => axios.get(url).then(res => res.data);

const OverViewMessages = () => {
  const [hover, setHover] = useState({});
  const { user } = useUser();
  const { data: messages, error } = useSWR("/api/messages", fetcher);

  if (error) console.error("Error fetching messages:", error);

  const handleVote = async (messageId, vote) => {
    const newVote = {
      messageId,
      vote,
      userId: user.id,
    };
    try {
      await axios.post("/api/vote", newVote);

      mutate(
        "/api/messages",
        messages.map(msg =>
          msg.id === messageId ? { ...msg, Vote: [...msg.Vote, newVote] } : msg,
        ),
        true,
      );
      mutate("/api/leaderboard");
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

  const convertDate = isoDate => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}. ${month}. ${year}`;
  };

  return (
    <ul>
      {messages?.map(message => {
        const userHasVoted = message.Vote?.some(
          vote => vote.userId === user?.id,
        );
        return (
          <div className="mb-12" key={message.id}>
            <div className="flex mx-7 justify-between -mb-7">
              <div className="text-secondary font-medium flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full`}
                  style={{ backgroundColor: message.user?.bgColor }}
                >
                  <img src={`/img/user-monkeys/${message.user?.icon}`} />
                </div>
                <span className="font-extrabold text-base">
                  {message.user?.name}
                </span>
              </div>
              <div className="h-9 w-9">
                <img src="/img/svg/logo.svg" alt="" />
              </div>
            </div>
            <li
              className={`mb-4 bg-[linear-gradient(356.75deg,_#202020_-2.25%,_#262626_97.39%)] rounded-[20px] px-7 py-6 flex flex-col md:flex-row md:items-center justify-between`}
            >
              <div className="flex flex-col pt-8">
                <p className="text-xl font-medium">”{message.content}”</p>
                <span className="mt-2.5 text-sm font-medium text-gray-400">
                  {convertDate(message.createdAt)}
                </span>
              </div>
              <div className="flex self-end flex-col">
                <ul className="flex gap-2.5 mt-8">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    const isAverageOrBetter =
                      ratingValue <= message.averageVote;
                    const isHovered = ratingValue <= hover[message.id];

                    return (
                      <label
                        key={ratingValue}
                        className="cursor-pointer"
                        onMouseEnter={() =>
                          !userHasVoted &&
                          handleMouseEnter(message.id, ratingValue)
                        }
                        onMouseLeave={() =>
                          !userHasVoted && handleMouseLeave(message.id)
                        }
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() =>
                            !userHasVoted && handleVote(message.id, ratingValue)
                          }
                          className="hidden"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            userHasVoted && isAverageOrBetter
                              ? "none"
                              : isHovered
                              ? "#FFEA2D"
                              : "none"
                          }
                          stroke={
                            isAverageOrBetter
                              ? "#FFEA2D"
                              : isHovered
                              ? "#FFEA2D"
                              : "#D6D6D6"
                          }
                          viewBox="0.26 0.07 13.05 12.54"
                          className="w-5 h-5"
                        >
                          <path
                            d="M6.17741 1.13388C6.39982 0.591611 7.16778 0.591612 7.39019 1.13388L8.52018 3.88902C8.61432 4.11857 8.83001 4.27527 9.07742 4.29388L12.0469 4.51718C12.6314 4.56113 12.8687 5.2915 12.4217 5.67059L10.1506 7.59666C9.96134 7.75714 9.87895 8.01069 9.93771 8.25174L10.643 11.1449C10.7818 11.7143 10.1605 12.1657 9.66181 11.8577L7.12819 10.293C6.9171 10.1626 6.6505 10.1626 6.43941 10.293L3.90579 11.8577C3.40713 12.1657 2.78583 11.7143 2.92464 11.1449L3.62989 8.25174C3.68865 8.01069 3.60626 7.75714 3.41704 7.59666L1.14594 5.67059C0.698935 5.2915 0.936247 4.56113 1.5207 4.51718L4.49018 4.29388C4.73759 4.27527 4.95328 4.11857 5.04742 3.88902L6.17741 1.13388Z"
                            strokeWidth="1.31081"
                          />
                        </svg>
                      </label>
                    );
                  })}
                  <div className="mt-5 md:mt-0 self-end">
                    <div className="flex items-center gap-2">
                      {userHasVoted && (
                        <img src="/img/svg/checkmark.svg" className="w-3 h-3" />
                      )}
                      <span
                        className={
                          userHasVoted
                            ? "font-bold text-xs text-green"
                            : "font-bold text-xs text-black-stars"
                        }
                      >
                        {message.Vote.length}
                      </span>
                    </div>
                  </div>
                </ul>
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default OverViewMessages;
