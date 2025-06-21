"use client";

import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import s from "./Header.module.scss";

export default function AdminHeader() {
  return (
    <header className={s.header}>
      <div className={s.breadcrumbs}>
        <h1 className={s.pageTitle}></h1>
      </div>

      <div className={s.actions}>
        <button className={s.iconButton}>
          <FiBell />
          <span className={s.badge}>2</span>
        </button>

        <div className={s.userMenu}>
          <button className={s.userButton}>
            <div className={s.userAvatar}>
              <FiUser />
            </div>
            <div className={s.userInfo}>
              <span className={s.userName}>Администратор</span>
              <span className={s.userRole}>Админ</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
