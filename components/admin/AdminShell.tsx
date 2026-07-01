"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  ADMIN_SECTIONS,
  resolveAdminSection,
  type AdminSectionId,
} from "@/lib/admin-sections";

export default function AdminShell({
  email,
  activeSection,
  onNavigate,
  children,
}: {
  email: string;
  activeSection: AdminSectionId;
  onNavigate: (section: AdminSectionId) => void;
  children: React.ReactNode;
}) {
  const handleNav = useCallback(
    (section: AdminSectionId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onNavigate(section);
      window.history.replaceState(null, "", `#${section}`);
    },
    [onNavigate]
  );

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Link href="/">
            <Logo size="sm" blend />
          </Link>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin">
          {ADMIN_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleNav(item.id)}
              className={`admin-sidebar-link${
                activeSection === item.id ? " admin-sidebar-link-active" : ""
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <span className="admin-sidebar-email">{email}</span>
          <LogoutButton />
        </div>
      </aside>

      <div className="admin-main">{children}</div>
    </div>
  );
}

export function useAdminSection() {
  const [activeSection, setActiveSection] = useState<AdminSectionId>("overview");

  useEffect(() => {
    const sync = () => setActiveSection(resolveAdminSection(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const navigate = useCallback((section: AdminSectionId) => {
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);
  }, []);

  return { activeSection, navigate };
}
