const Header = ({ name }: { name: string }) => {
  return (
    <>
      <h1 className="header-text">{name}</h1>
    </>
  );
};

export default Header;
