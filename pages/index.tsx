import React from "react";
import useUser from "../lib/useUser";
import Primary from "@/components/primary/Primary";
import BestPost from "@/components/bestPost/BestPost";
import Link from "next/link";

function Dashboard() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Primary>
        <div className="mx-auto max-w-[420px] flex flex-col items-center my-10 shadow-topic rounded-lg py-10">
          <h1 className="font-medium text-2xl">
            Prosím <span className="text-secondary">přihlaš se</span>!
          </h1>
          <Link
            href="/login"
            className="mt-10 border-primary border px-6 py-3 rounded-lg bg-secondary text-white font-medium hover:bg-black transition-colors"
          >
            Přihlásit se
          </Link>
        </div>
      </Primary>
    );
  }

  return (
    <Primary>
      <div className="mx-auto max-w-[420px] flex flex-col items-center my-10 shadow-topic rounded-lg py-10">
        <h1 className="font-medium text-2xl">
          Vítej, <span className="text-secondary">{user.name}</span>!
        </h1>
      </div>
      <BestPost />
    </Primary>
  );
}

export default Dashboard;
