import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { logout } from "../helpers/logout";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="p-5 border-b-2 flex bg-gray-900 relative">
      <div className="flex items-center text-slate-100 border-r border-slate-100 pr-4 mr-4">
        <Link to="/">
          <h2>Firebase Social Media</h2>
        </Link>
      </div>
      <ul className="flex text-slate-900 absolute right-0 pr-4">
        <li>
          {user === null ? (
            <Link
              to="/login"
              className="px-2 mx-2 font-medium text-slate-100 hover:underline underline-offset-8"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/create-post"
                className="px-2 mx-2 font-medium text-slate-100 hover:underline underline-offset-8"
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
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};
