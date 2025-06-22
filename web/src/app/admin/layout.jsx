"use client";

import React from "react";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminGuard from "@/app/admin/components/AdminGuard/AdminGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./layout.module.scss";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className={s.adminLayout}>
        <AdminSidebar />
        <div className={s.mainContent}>
          <AdminHeader />
          <main className={s.content}>{children}</main>
        </div>
        <ToastContainer />
      </div>
    </AdminGuard>
  );
}
