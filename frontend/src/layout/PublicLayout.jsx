import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/shared/sidebar";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-sky-600">
          AanganSewa
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-sky-600"
                : "text-gray-700 hover:text-sky-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-sky-600"
                : "text-gray-700 hover:text-sky-600"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-sky-600"
                : "text-gray-700 hover:text-sky-600"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-sky-600"
                : "text-gray-700 hover:text-sky-600"
            }
          >
            Contact
          </NavLink>

          {/* CTA */}
          <Link
            to="/login"
            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-3 text-sm">
            <NavLink to="/" onClick={() => setOpen(false)} className="block">
              Home
            </NavLink>
            <NavLink to="/services" onClick={() => setOpen(false)} className="block">
              Services
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className="block">
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className="block">
              Contact
            </NavLink>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block bg-sky-600 text-white text-center py-2 rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 mt-16 ">
      <div className="max-w-7xl mx-auto px-3 py-1 grid gap-10 sm:grid-cols-2 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-sky-400 mb-3">
            AanganSewa
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            AanganSewa is committed to serving the community by connecting
            people with essential services, care, and support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-sky-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-sky-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-sky-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-sky-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>📍 Nepal</li>
            <li>📞 +977-XXXXXXXX</li>
            <li>✉️ info@angansewa.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © {new Date().getFullYear()} AanganSewa. All rights reserved.
      </div>
    </footer>
  );
}
const PublicLayout = () => {
  return (
  
    <div className="min-h-screen bg-green-100 flex flex-col">
      <nav >
        <Navbar />
      </nav>
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-auto">
       <Footer />
      </footer>
    </div>
    
  );
};
export default PublicLayout;
