"use client";
import {
  BarChart as BarChartIcon,
  ChevronLeft,
  ChevronRight,
  LineChart,
  PieChart as PieChartIcon,
  ShoppingCart,
  Users,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const barChartData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const pieChartData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Home", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const topSellingProducts = [
  { name: "Homepod", category: "Electronics", price: 299, sales: 1200 },
  { name: "Macbook Pro", category: "Electronics", price: 1999, sales: 800 },
  { name: "Apple Watch", category: "Electronics", price: 399, sales: 1500 },
  { name: "AirPods Pro", category: "Electronics", price: 249, sales: 2000 },
];

const recentOrders = [
  {
    id: "1234",
    customer: "John Doe",
    date: "2023-05-01",
    status: "Delivered",
    total: 299,
  },
  {
    id: "1235",
    customer: "Jane Smith",
    date: "2023-05-02",
    status: "Processing",
    total: 1999,
  },
  {
    id: "1236",
    customer: "Bob Johnson",
    date: "2023-05-03",
    status: "Shipped",
    total: 399,
  },
  {
    id: "1237",
    customer: "Alice Brown",
    date: "2023-05-04",
    status: "Pending",
    total: 249,
  },
];
function page() {
  return (
    <div>
      {" "}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Date Navigation */}
          <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded">Day</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Week</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded">
                Month
              </button>
              <button className="px-3 py-1 bg-gray-200 rounded">Annual</button>
            </div>
            <div className="flex items-center">
              <ChevronLeft className="text-gray-400" />
              <span className="mx-2">30 April 2019</span>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                title: "NEW ORDERS",
                value: "35673",
                change: "2.00% (30 days)",
                color: "bg-cyan-500",
                icon: ShoppingCart,
              },
              {
                title: "TOTAL INCOME",
                value: "$14,966",
                change: "Increased by 7.35%",
                color: "bg-green-500",
                icon: LineChart,
              },
              {
                title: "TOTAL EXPENSE",
                value: "26526",
                change: "Increased by 7.35%",
                color: "bg-blue-500",
                icon: BarChartIcon,
              },
              {
                title: "NEW USERS",
                value: "32566",
                change: "54.1% less earnings",
                color: "bg-yellow-500",
                icon: Users,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} rounded-lg shadow p-6 text-white`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{stat.title}</h2>
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Selling Products and Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Top Selling Products
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingProducts.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "success"
                              : order.status === "Processing"
                              ? "warning"
                              : order.status === "Shipped"
                              ? "info"
                              : "default"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
