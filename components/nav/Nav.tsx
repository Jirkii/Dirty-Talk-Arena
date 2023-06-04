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
    <nav className="flex justify-between items-center mx-8 py-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <img className="w-9 h-9" src="/img/svg/logo.svg" alt="logo" />
        </Link>
        <div className="text-base font-bold">Dirty Talk Arena</div>
      </div>
      {user ? (
        <div className="relative flex items-center gap-8">
          {/* <div>
            <Link href="/games" className="font-normal text-xs">
              Games
            </Link>
          </div> */}
          <div
            className="cursor-pointer flex items-center justify-center gap-3"
            onClick={handleClick}
          >
            <div
              className={`rounded-full w-9 h-9`}
              style={{ backgroundColor: user.bgColor }}
            >
              <img src={`/img/user-monkeys/${user.icon}`} alt="avatar" />
            </div>
            <span className="font-bold text-base">{user.name}</span>
          </div>
          {visibleSettings && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-10"
                onClick={handleClick}
              ></div>
              <div className="fixed inset-y-0 right-0 max-w-2/3 w-3/4 md:max-w-1/3 md:w-1/4 h-screen bg-[linear-gradient(356.75deg,_#202020_-2.25%,_#262626_97.39%)] rounded-[20px] z-20 mt-4">
                <div className="flex justify-center gap-5 border-b pb-4 mb-4 border-black-border border-opacity-60">
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: user?.bgColor }}
                  >
                    <img src={`/img/user-monkeys/${user?.icon}`} alt="avatar" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
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
            className="px-4 py-3 font-bold text-sm bg-blue-bg rounded hover:bg-black transition-colors mt-2 md:mt-0 flex gap-2 items-center"
          >
            Registrovat se
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
