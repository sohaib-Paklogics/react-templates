// app/blogs/page.tsx
import BlogHeroSection from "@/components/BlogHeroSection";
import SiteFooter from "@/components/Footer";
import BlogSection from "@/components/BlogSession";

export const dynamic = "force-static"; // statically generated

export default function Blogs() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <BlogHeroSection title="Blogs" />
        <BlogSection showbtn={false} />
      </main>
      <SiteFooter />
    </div>
  );
}
