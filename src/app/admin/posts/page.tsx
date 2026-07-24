import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import PostsManager from "@/components/admin/managers/PostsManager";
import { list } from "@/lib/db";

export const metadata: Metadata = { title: "Blog Posts" };

export default function PostsPage() {
  return (
    <>
      <PageHeader title="Blog Posts" subtitle="Write and publish news, stories and updates." crumbs={[{ label: "Blog Posts" }]} />
      <PostsManager initialData={list("posts")} />
    </>
  );
}
