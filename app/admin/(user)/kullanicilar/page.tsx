"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserType } from "@/types/globalTypes";
import { ApiDeleteUser, ApiGetAllUsers } from "@/services/adminService";

const UserList: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await ApiGetAllUsers();
      setUsers(response);
    } catch (err) {
      console.log(err);
      toast.error("Kullanıcılar alınırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/kullanicilar/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await ApiDeleteUser(id);
      toast.success("Kullanıcı başarıyla silindi");
      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
      {users.map((user) => (
        <Card
          key={user._id}
          className={`flex flex-col justify-start h-full ${
            user.isAdmin && "border-red-500"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {user.name}
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(user._id)}
                >
                  <FaRegEdit />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Rol:</strong> {user.role}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
