import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
    <h4 className="font-medium text-base mb-5">
      이 페이지는 존재하지 않는 페이지 입니다.
    </h4>
    <Link className="hover:underline text-lime-600" to="/">
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
