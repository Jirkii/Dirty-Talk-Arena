const Footer = () => {
  return (
    <footer>
      <div className="mx-5 py-6">
        <span className="font-semibold text-sm">
          Copyright &copy; {new Date().getFullYear()} dirtytalkarena.com, Inc.
          All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
