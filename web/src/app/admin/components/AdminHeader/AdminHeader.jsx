"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import s from "./AdminHeader.module.scss";

const getPageTitle = (pathname) => {
  const titles = {
    "/admin": "Панель управления",
    "/admin/blog": "Управление блогом",
    "/admin/cases": "Управление кейсами",
    "/admin/team": "Управление командой",
    "/admin/settings": "Настройки",
    "/admin/cases/create": "Создание кейса",
  };

  return titles[pathname] || "Админ-панель";
};

export default function AdminHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const isOnCasesPage = pathname === "/admin/cases";

  return (
    <header className={s.header}>
      <div className={s.titleWrapper}>
        <h1 className={s.pageTitle}>{pageTitle}</h1>
        <div className={s.breadcrumbs}>
          <span>Админ-панель</span>
          <span className={s.separator}>/</span>
          <span className={s.currentPage}>{pageTitle}</span>
        </div>
      </div>

      <div className={s.actions}>
        {isOnCasesPage && (
          <Link href="/admin/cases/create">
            <button className={s.createButton}>
              <FiPlus />
              <span>Новый кейс</span>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
