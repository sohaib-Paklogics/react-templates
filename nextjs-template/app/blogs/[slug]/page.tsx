import { notFound } from "next/navigation";
import BlogDetail from "@/components/BlogDetail";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-static";

async function getBlogs() {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// FIX: Await `params` because it's a Promise!
export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blogs = await getBlogs();
  const blog = blogs.find((b: any) => b.id === slug);
  if (!blog) return notFound();

  return <BlogDetail blog={blog} />;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog: any) => ({ slug: blog.id }));
}
