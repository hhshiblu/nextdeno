"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Image from "next/image";
import {
  BarChart as BarChartIcon,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  Package,
  PieChart as PieChartIcon,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
export default function Dashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-[#1e2a4a] text-white w-64 min-h-screen ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="bg-white rounded-full p-2 mr-2">
              <Image
                src="/placeholder.svg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="font-bold">Parker Whitson</h2>
              <p className="text-xs text-gray-400">parker@gmail.com</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mb-6">
            Upgrade
          </button>
          <nav>
            {[
              { name: "Home", icon: Home, link: "/admin-dashboard" },
              {
                name: "All Users",
                icon: Users,
                badge: 45,
                link: "/admin-dashboard/all-users",
              },
              {
                name: "All Products",
                icon: Package,
                badge: 45,
                link: "/admin-dashboard/all-products",
              },
              {
                name: "All-orders",
                icon: Package,
                link: "/admin-dashboard/all-orders",
              },
              {
                name: "Members",
                icon: BarChartIcon,
                link: "/admin-dashboard/analysis",
              },
              {
                name: "Reports",
                icon: LineChart,
                link: "/admin-dashboard/report",
              },
              {
                name: "Sales",
                icon: LineChart,
                link: "/admin-dashboard/sales",
              },

              // { name: "Admin/HR", icon: Settings },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.link || "#"}
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden mr-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Ecommerce Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mr-4">
                <Link href="/admin-dashboard/create-product" className="flex">
                  <Package className="mr-2" size={20} />
                  Add Product
                </Link>
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <button className="ml-4 relative">
                <Bell />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="ml-4 flex items-center">
                <Image
                  src="/placeholder.svg"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2">Richard V.Welsh</span>
              </div>
            </div>
          </div>
        </header>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
