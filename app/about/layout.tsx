import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Yaswanth Gudivada — software engineer, lifelong learner, and tech enthusiast.",
};

import { BlogHeader } from "@/components/layout/blog-header";
import { BlogFooter } from "@/components/layout/blog-footer";
import { AboutNav } from "@/components/about/about-nav";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <BlogHeader />
      <main className="flex-1">
        {children}
        <AboutNav />
      </main>
      <BlogFooter />
    </div>
  );
}
