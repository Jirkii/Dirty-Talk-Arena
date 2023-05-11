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
      <div className="max-w-7xl mx-auto shadow-topic my-20 rounded-lg overflow-x-auto">
        <div className="py-5 md:px-10 md:mx-10">
          <table className="min-w-full divide-y divide-primary rounded-lg border-separate border-spacing-x-2">
            <thead>
              <tr>
                <th className="font-semibold border-b border-primary text-left">
                  Pozice
                </th>
                <th className="font-semibold border-b border-primary text-left">
                  Nickname
                </th>
                <th className="font-semibold border-b border-primary text-left">
                  Elo
                </th>
                <th className="font-semibold border-b border-primary text-left">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id}>
                  <td className="text-left pb-2">{idx + 1}</td>
                  <td className="text-left pb-2">{user.name}</td>
                  <td className="text-left pb-2">{user.elo}</td>
                  <td className="text-left pb-2">{calculateRank(user.elo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Primary>
  );
}
