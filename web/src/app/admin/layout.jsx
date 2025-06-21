"use client";

import React from "react";
import AdminSidebar from "./components/Sidebar/Sidebar";
import AdminHeader from "./components/Header/Header";
import s from "./layout.module.scss";

export default function AdminLayout({ children }) {
  return (
    <div className={s.adminLayout}>
      <AdminSidebar />
      <div className={s.mainContent}>
        <AdminHeader />
        <main className={s.content}>{children}</main>
      </div>
    </div>
  );
}
