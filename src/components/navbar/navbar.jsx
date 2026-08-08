import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";

import logo from "../../assets/img/RENT_MUSICAL_BLUE-logo-4631FB248C-seeklogo.com.png";
import useApp from "../context/useApp";

const linkClass = ({ isActive }) =>
  [
    "rounded-lg px-3 py-2 text-sm font-semibold transition",
    isActive
      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
      : "text-slate-600 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-400",
  ].join(" ");

const Navbar = () => {
  const { isDarkMode, toggleMode, isLoggedIn, isAdmin, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
    closeMenu();
    navigate("/home");
  };

  const links = [
    { to: "/home", label: "Home" },
    { to: "/fleet", label: "Our Fleet" },
    ...(isAdmin
      ? [{ to: "/admin", label: "Dashboard" }]
      : isLoggedIn
        ? [{ to: "/my-rentals", label: "My Rentals" }]
        : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/home" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="" className="h-9 w-9" />
          <span className="text-lg font-bold text-brand-700 dark:text-brand-400">
            RentCars
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a href="#contact" className={linkClass({ isActive: false })}>
              Contact
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDarkMode ? (
              <MdOutlineLightMode size={20} />
            ) : (
              <MdOutlineDarkMode size={20} />
            )}
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              aria-label="Log out"
              className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:inline-flex dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <IoIosLogOut size={22} />
            </button>
          ) : (
            <Link to="/login" className="btn-primary hidden lg:inline-flex">
              <IoIosLogIn size={18} />
              Sign in
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-brand-700 transition hover:bg-slate-100 lg:hidden dark:text-brand-400 dark:hover:bg-slate-800"
          >
            <GiHamburgerMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden dark:bg-slate-950">
          <div className="container-page flex h-16 items-center justify-between">
            <span className="text-lg font-bold text-brand-700 dark:text-brand-400">
              RentCars
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
            >
              <IoClose size={26} />
            </button>
          </div>

          <ul className="container-page mt-8 flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Contact
              </a>
            </li>
            <li className="mt-4 px-4">
              {isLoggedIn ? (
                <button
                  type="button"
                  className="btn-danger w-full"
                  onClick={() => {
                    closeMenu();
                    setLogoutOpen(true);
                  }}
                >
                  <IoIosLogOut size={18} />
                  Log out
                </button>
              ) : (
                <Link to="/login" onClick={closeMenu} className="btn-primary w-full">
                  <IoIosLogIn size={18} />
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Log-out confirmation */}
      <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Confirmation</DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to log out?</DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleLogout}>
              Log out
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setLogoutOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </header>
  );
};

export default Navbar;
