import { FC } from "react";
import Nav from "../nav/Nav";
interface HeaderProps {
  login?: boolean;
}
const Header: FC<HeaderProps> = ({ login }) => {
  return (
    <header className="border-b border-gray-300 shadow-lg static">
      <Nav login={login} />
    </header>
  );
};

export default Header;
