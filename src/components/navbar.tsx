import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="p-5 border-b-2 flex bg-gray-900">
      <ul className="flex p-2 justify-between text-slate-900">
        <li className="text-slate-100 border-r border-slate-100 pr-4 mr-4">
          <h2>Firebase Social Media</h2>
        </li>
        <li>
          <Link
            to="/"
            className="px-2 mx-2 font-medium text-slate-100 hover:underline underline-offset-8"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="px-2 mx-2 font-medium text-slate-100 hover:underline underline-offset-8"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};
