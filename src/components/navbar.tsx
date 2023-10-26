import { Link } from "react-router-dom";
import { logout } from "../helpers/logout";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <nav className="p-5 flex bg-gray-900">
      <div className="flex items-center text-slate-100 border-r border-slate-100 pr-4 mr-4 min-w-fit">
        <Link to="/">
          <h2>Firebase Social Media</h2>
        </Link>
      </div>
      <ul className={"flex text-slate-900 " + (user === null ? "" : "w-full")}>
        <li className="w-full">
          {user === null ? (
            <Link
              to="/login"
              className="px-2 mx-2 font-medium text-slate-100 hover:underline underline-offset-8"
            >
              Login
            </Link>
          ) : (
            <div className="flex justify-between">
              <Link
                to="/create-post"
                className=" bg-blue-800 rounded-md px-4 py-1 mx-2 font-medium text-slate-100 hover:bg-blue-900 underline-offset-8"
              >
                Create Post
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-2 mx-2 font-medium text-slate-100 hover:underline underline-offset-8"
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};
