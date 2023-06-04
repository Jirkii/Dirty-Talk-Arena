import React from "react";
import useUser from "../lib/useUser";
import Primary from "@/components/primary/Primary";
import BestPost from "@/components/bestPost/BestPost";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import CreateMessage from "@/components/createMessage/CreateMessage";
import OverViewMessages from "@/components/overviewMessages/OverviewMessages";
import { useRouter } from "next/router";

function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <Primary>
      <div className="flex align-baseline max-w-[1120px] mx-auto gap-0 sm:gap-10 lg:gap-20 flex-col md:flex-row">
        <div className="w-full flex-[1.5]">
          <CreateMessage />
          <BestPost />
          <OverViewMessages />
        </div>
        <div className="flex-1">
          <Leaderboard />
        </div>
      </div>
    </Primary>
  );
}

export default Dashboard;
