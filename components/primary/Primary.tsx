import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FC } from "react";

interface PrimaryProps {
  children: any;
}

const Primary: FC<PrimaryProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen px-5">{children}</main>
      <Footer />
    </>
  );
};

export default Primary;
