"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const users = [
  {
    id: 1,
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    gender: "Male",
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "098-765-4321",
    email: "jane@example.com",
    gender: "Female",
  },
  {
    id: 3,
    name: "Bob Johnson",
    phoneNumber: "111-222-3333",
    email: "bob@example.com",
    gender: "Male",
  },
  {
    id: 4,
    name: "Alice Brown",
    phoneNumber: "444-555-6666",
    email: "alice@example.com",
    gender: "Female",
  },
  {
    id: 5,
    name: "Charlie Davis",
    phoneNumber: "777-888-9999",
    email: "charlie@example.com",
    gender: "Male",
  },
];

const userGrowthData = [
  { month: "Jan", users: 100 },
  { month: "Feb", users: 120 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 180 },
  { month: "May", users: 220 },
  { month: "Jun", users: 270 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AllUsersPage() {
  const [userList, setUserList] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(userList.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (checked, userId) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleDelete = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
    setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
  };

  const genderData = userList.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(genderData).map((gender) => ({
    name: gender,
    value: genderData[gender],
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Distribution by Gender</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <Checkbox
          checked={selectedUsers.length === userList.length}
          onCheckedChange={handleSelectAll}
          id="select-all"
        />
        <label htmlFor="select-all" className="ml-2">
          Select All
        </label>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) =>
                    handleSelectUser(checked, user.id)
                  }
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin-dashboard/user-details/${user.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> Preview
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
