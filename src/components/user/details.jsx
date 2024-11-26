"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const  = {
//   id: 1,
//   name: "John Doe",
//   phoneNumber: "123-456-7890",
//   email: "john@example.com",
//   gender: "Male",
//   address: "123 Main St, Anytown, AT 12345",
//   dateOfBirth: "1990-01-01",
//   bankDetails: {
//     accountNumber: "1234567890",
//     bankName: "Example Bank",
//   },
//   mobilePayments: {
//     bKash: "01700000000",
//     rocket: "01800000000",
//   },
// };

export default function UserPreviewPage({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Details: {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user?.dateOfBirth}
            </p>
            <p>
              <strong>CreatedAt :</strong> {user?.created_at}
            </p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Account Number:</strong> {user.bankDetails.accountNumber}
            </p>
            <p>
              <strong>Bank Name:</strong> {user.bankDetails.bankName}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mobile Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>bKash Number:</strong> {user.mobilePayments.bKash}
            </p>
            <p>
              <strong>Rocket Number:</strong> {user.mobilePayments.rocket}
            </p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
