import useUser from "@/lib/useUser";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "../logoutButton/LogoutButton";

const Nav = () => {
  const { user } = useUser();

  const [visibleSettings, setVisibleSettings] = useState(false);

  const handleClick = () => {
    setVisibleSettings(!visibleSettings);
  };

  return (
    <nav className="flex justify-between items-center mx-5 py-2">
      <div className="flex items-center gap-5">
        <Link href="/">
          <img className="w-15 h-10" src="/logo.svg" alt="logo" />
        </Link>
        <div className="text-2xl font-medium">Dirty Talk Arena</div>
      </div>
      {user ? (
        <div className="relative">
          <div
            className="border-primary border rounded-full w-10 h-10 cursor-pointer"
            onClick={handleClick}
          >
            <img src="/avatar.svg" alt="avatar" className="p-2" />
          </div>
          {visibleSettings && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-10"
                onClick={handleClick}
              ></div>
              <div className="fixed inset-y-0 right-0 max-w-2/3 w-3/4 md:max-w-1/3 md:w-1/4 h-screen bg-white shadow-lg z-20">
                <div className="px-4 py-6 flex justify-center items-center">
                  <img
                    src="/avatar.svg"
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="px-4 text-center flex flex-col gap-y-5">
                  <Link
                    href="/"
                    className="font-medium hover:underline underline-offset-2"
                  >
                    <i className="fa-solid fa-house mr-2"></i>
                    Úvod
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="font-medium hover:underline underline-offset-2"
                  >
                    Žebříček
                  </Link>
                  <Link
                    href="/message"
                    className="font-medium hover:underline underline-offset-2"
                  >
                    Přídání hlášky
                  </Link>
                  <Link
                    href="/messages-list"
                    className="font-medium hover:underline underline-offset-2"
                  >
                    Přehled hlášek
                  </Link>
                </div>
                <hr className="my-4" />
                <div className="px-4 text-center">
                  <LogoutButton />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/signup"
            className=" border-primary border px-6 py-3 rounded-lg text-black font-medium hover:bg-black hover:text-white transition-colors"
          >
            Registrovat se
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
