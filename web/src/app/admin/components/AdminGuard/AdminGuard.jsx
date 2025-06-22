"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/services/useAdminAuth";
import { notify } from "@/utils/toast";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { checkAuth } = useAdminAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthed = await checkAuth();

      if (!isAuthed) {
        notify.error("Для доступа к админ-панели необходимо авторизоваться");
        router.push("/");
        return;
      }

      setIsAuthenticated(true);
    };

    verifyAuth();
  }, [pathname, router, checkAuth]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
