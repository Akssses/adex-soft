"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiBriefcase,
} from "react-icons/fi";
import { useAdminAuth } from "@/services/useAdminAuth";
import s from "./AdminSidebar.module.scss";

const menuItems = [
  { icon: FiHome, label: "Главная", href: "/admin" },
  { icon: FiFileText, label: "Блог", href: "/admin/blog" },
  { icon: FiBriefcase, label: "Кейсы", href: "/admin/cases" },
  { icon: FiUsers, label: "Команда", href: "/admin/team" },
  { icon: FiSettings, label: "Настройки", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={s.sidebar}>
      <div className={s.logo}>
        <Link href="/">
          <img src="/assets/images/admin-logo.png" alt="ADEX SOFT LOGO" />
        </Link>
      </div>

      <nav className={s.navigation}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${s.navItem} ${isActive ? s.active : ""}`}
            >
              <Icon className={s.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button className={s.logoutButton} onClick={handleLogout}>
        <FiLogOut className={s.icon} />
        <span>Выйти</span>
      </button>
    </aside>
  );
}
