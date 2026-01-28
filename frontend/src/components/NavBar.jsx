import React from "react";
import { Link } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // import your context hook

const NavBar = () => {
  const { user, logout } = useAuth(); // use global auth

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NotesBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon /> <span>New Note</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-semibold">Hi, {user.username}</span>
                <button
                  onClick={logout} // directly call logout from context
                  className="btn btn-outline btn-error btn-sm flex items-center gap-1"
                >
                  <LogOutIcon size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
