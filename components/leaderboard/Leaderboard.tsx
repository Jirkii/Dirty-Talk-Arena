import axios from "axios";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data);

const Leaderboard = () => {
  const { data: users, error, mutate } = useSWR("/api/leaderboard", fetcher);

  if (error) console.error("Error fetching leaderboard:", error);

  function calculateRank(elo) {
    if (elo >= 300) return "Platinum";
    if (elo >= 200) return "Gold";
    if (elo >= 100) return "Silver";
    return "Bronze";
  }
  return (
    <div className="py-5">
      <div className="mb-6 flex items-center w-6 h-6 gap-2">
        <img src="/img/svg/graph.svg" />
        <span>Leaderboard</span>
      </div>
      {users?.map((user, idx) => {
        return (
          <div
            key={idx}
            className="flex justify-between items-center pb-4 border-b border-black-border border-opacity-60 mb-4 md:max-w-[300px]"
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full mr-6`}
                style={{ backgroundColor: user.bgColor }}
              >
                <img
                  src={`/img/user-monkeys/${user.icon}`}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                {user.name}
                <span className="font-medium text-xs text-black-textSecondary">
                  {calculateRank(user.elo)}
                </span>
              </div>
            </div>
            <div className="font-bold text-lg text-green">{user.elo}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
