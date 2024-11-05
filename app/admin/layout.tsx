import React from "react";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "./AuthGuard";

export const metadata = {
  title: "Admin Paneli",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div
        className="flex"
        style={{
          minHeight: "calc(100vh - 50vh)",
        }}
      >
        <Sidebar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
