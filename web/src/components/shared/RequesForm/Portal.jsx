import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const elRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  if (!elRef.current && typeof window !== "undefined") {
    elRef.current = document.createElement("div");
    elRef.current.id = "portal-root";
  }

  useEffect(() => {
    const portalRoot = elRef.current;
    document.body.appendChild(portalRoot);
    setMounted(true);

    return () => {
      document.body.removeChild(portalRoot);
    };
  }, []);

  return mounted ? createPortal(children, elRef.current) : null;
}
