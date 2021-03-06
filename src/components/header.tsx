import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useMe from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

const Header = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 py-3 px-3 text-white text-center text-base">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-2.5">
        <div className="w-full px-3 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} alt="Nuber Eats" className=" w-32" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} />
              {data?.me?.email}
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
