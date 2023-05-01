import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FC } from "react";

interface PrimaryProps {
  login?: boolean;
  children: any;
}

const Primary: FC<PrimaryProps> = ({ children, login }) => {
  return (
    <>
      <Header login={login} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Primary;
