import Primary from "@/components/primary/Primary";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/leaderboard");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchData();
  }, []);

  function calculateRank(elo) {
    if (elo >= 300) return "Platinum";
    if (elo >= 200) return "Gold";
    if (elo >= 100) return "Silver";
    return "Bronze";
  }

  return (
    <Primary>
      <div className="max-w-7xl mx-10 shadow-topic my-20 rounded-lg">
        <div className="py-5 px-10">
          <div className="grid grid-cols-4 gap-4 rounded-lg p-4">
            <div className="font-semibold border-b border-primary">Pozice</div>
            <div className="font-semibold border-b border-primary">
              Nickname
            </div>
            <div className="font-semibold border-b border-primary">Elo</div>
            <div className="font-semibold border-b border-primary">Rank</div>

            {users.map((user, idx) => (
              <Fragment key={user.id}>
                <div>{idx + 1}</div>
                <div>{user.name}</div>
                <div>{user.elo}</div>
                <div>{calculateRank(user.elo)}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Primary>
  );
}
