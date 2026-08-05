export const AUTH_COOKIE = "platecraft_session";

export type Role = "admin" | "manager" | "staff";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
};

/** Demo accounts — replace with a real user table + hashed passwords in production. */
export const USERS: Array<SessionUser & { password: string }> = [
  {
    id: "usr-1",
    name: "Marcus Hall",
    email: "admin@platecraft.com",
    password: "admin123",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "usr-2",
    name: "Sophia Brown",
    email: "manager@platecraft.com",
    password: "manager123",
    role: "manager",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: "usr-3",
    name: "Nina Patel",
    email: "staff@platecraft.com",
    password: "staff123",
    role: "staff",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

export function encodeSession(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
}

export function decodeSession(token?: string | null): SessionUser | null {
  if (!token) return null;
  try {
    const raw = typeof atob === "function"
      ? decodeURIComponent(escape(atob(token.replace(/-/g, "+").replace(/_/g, "/"))))
      : Buffer.from(token, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as SessionUser;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}
