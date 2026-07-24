"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Avatar, Dropdown, Badge, Grid, Drawer, Tooltip } from "antd";
import {
  FiBell, FiLogOut, FiMenu, FiExternalLink, FiSearch, FiUser, FiChevronDown,
} from "react-icons/fi";
import { navForRole, NAV_GROUPS } from "./nav";
import type { SessionUser } from "@/lib/auth";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

function LogoMark({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/admin" className="flex h-16 items-center gap-2.5 px-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" /><path d="M9 13v8" /><path d="M17 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6Z" /><path d="M17 12v9" />
        </svg>
      </span>
      {!collapsed ? (
        <span className="text-lg font-extrabold tracking-tight text-white">
          Bite<span className="text-brand">Craft</span>
        </span>
      ) : null}
    </Link>
  );
}

export default function AdminShell({ user, children }: { user: SessionUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // antd's useBreakpoint returns {} on the server and first client paint, which
  // would briefly flag the layout as "mobile" and flash the sidebar closed on
  // every refresh. Gate on mount and assume the desktop sidebar until we truly
  // know the viewport — admin is desktop-first, so this matches SSR cleanly.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isMobile = mounted ? !screens.lg : false;

  // Only the menu items this user's role is allowed to see.
  const nav = navForRole(user.role);

  const activeKey =
    nav.filter((n) => (n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)))
      .sort((a, b) => b.href.length - a.href.length)[0]?.key ?? "dashboard";

  const menuItems = NAV_GROUPS.map((group) => {
    const children = nav.filter((n) => n.group === group);
    if (children.length === 0) return null;
    return {
      key: group,
      type: "group" as const,
      label: group,
      children: children.map((n) => ({
        key: n.key,
        icon: <n.icon className="size-4" />,
        label: <Link href={n.href}>{n.label}</Link>,
      })),
    };
  }).filter(Boolean);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const menuNode = (
    <div className="flex h-full flex-col">
      <LogoMark collapsed={collapsed && !isMobile} />
      <div className="min-h-0 flex-1 overflow-y-auto py-2">
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[activeKey]}
          items={menuItems}
          onClick={() => isMobile && setMobileOpen(false)}
          style={{ background: "transparent", borderInlineEnd: "none" }}
        />
      </div>
      <div className="border-t border-white/8 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-white/60 transition-colors hover:bg-white/8 hover:text-white"
        >
          <FiExternalLink className="size-4" /> {!collapsed || isMobile ? "View Website" : null}
        </Link>
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isMobile ? (
        <Drawer
          placement="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          width={260}
          closable={false}
          styles={{ body: { padding: 0, background: "#12160f" } }}
        >
          {menuNode}
        </Drawer>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          width={260}
          collapsedWidth={80}
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          {menuNode}
        </Sider>
      )}

      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px",
            borderBottom: "1px solid #eceee7",
          }}
        >
          <button
            type="button"
            onClick={() => (isMobile ? setMobileOpen(true) : setCollapsed((v) => !v))}
            aria-label="Toggle sidebar"
            className="grid size-10 place-items-center rounded-lg text-ink/60 transition-colors hover:bg-ink/5"
          >
            <FiMenu className="size-5" />
          </button>

          <div className="hidden items-center gap-2 rounded-xl bg-cream-2 px-3.5 py-2 text-sm text-muted sm:flex">
            <FiSearch className="size-4" />
            <input
              placeholder="Search dashboard..."
              className="w-40 bg-transparent outline-none placeholder:text-muted lg:w-64"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Tooltip title="Notifications">
              <Link
                href="/admin/messages"
                className="grid size-10 place-items-center rounded-lg text-ink/60 transition-colors hover:bg-ink/5"
              >
                <Badge dot color="#8cb33f">
                  <FiBell className="size-5" />
                </Badge>
              </Link>
            </Tooltip>

            <Dropdown
              menu={{
                items: [
                  { key: "role", disabled: true, label: <span className="text-xs capitalize text-muted">{user.role} account</span> },
                  { type: "divider" },
                  { key: "profile", icon: <FiUser />, label: <Link href="/admin/settings">Profile &amp; Settings</Link> },
                  { key: "site", icon: <FiExternalLink />, label: <Link href="/" target="_blank">View Website</Link> },
                  { type: "divider" },
                  { key: "logout", icon: <FiLogOut />, danger: true, label: "Sign Out", onClick: logout },
                ],
              }}
              trigger={["click"]}
            >
              <button type="button" className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-ink/5">
                <Avatar src={user.avatar} size={34}>{user.name[0]}</Avatar>
                <div className="hidden text-left leading-tight sm:block">
                  <p className="text-[13px] font-bold text-ink">{user.name}</p>
                  <p className="text-[11px] capitalize text-muted">{user.role}</p>
                </div>
                <FiChevronDown className="hidden size-4 text-muted sm:block" />
              </button>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ padding: isMobile ? 16 : 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
