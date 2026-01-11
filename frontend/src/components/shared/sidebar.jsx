import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  Settings,
  FileText,
  Calendar,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Bookings", path: "/bookings", icon: Calendar },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sky-600 text-white rounded-lg shadow-lg hover:bg-sky-700 transition-colors"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-xl z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div
              className={`flex items-center space-x-3 ${
                !isOpen && "lg:justify-center"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-xl">आ</span>
              </div>
              {isOpen && (
                <div className="overflow-hidden">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent whitespace-nowrap">
                    AanganSewa
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1 whitespace-nowrap">
                    आङ्गन सेवा
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:block p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                      } ${!isOpen && "lg:justify-center lg:px-2"}`
                    }
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && (
                      <span className="font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile / Logout */}
          <div className="border-t border-gray-200 p-4">
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group ${
                !isOpen && "lg:justify-center lg:px-2"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium whitespace-nowrap">Logout</span>
              )}
            </button>

            {isOpen && (
              <div className="mt-4 p-3 bg-sky-50 rounded-lg border border-sky-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      admin@angansewa.com
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area Spacer */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      />
    </>
  );
};

export default Sidebar;
