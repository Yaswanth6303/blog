import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Merriweather } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CommandMenu } from "@/components/command-menu";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import "./globals.css";

// Inlined at build time, so it has to be set in the build environment
// (Vercel project settings), not only at runtime.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Yaswanth Gudivada",
    default: "Home | Yaswanth Gudivada",
  },
  description:
    "A personal blog about software engineering, system design, and technology.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const searchData = posts.map((p) => ({
    title: p.title,
    href: `/articles/${p.slug}`,
    category: p.category,
    readingTime: p.readingTime,
    excerpt: p.excerpt,
    tags: p.tags,
  }));

  const searchCategories = categories.map((c) => ({
    name: c.name,
    href: `/categories/${c.name.toLowerCase()}`,
    count: c.count,
  }));

  return (
    <html
      lang="en"
      className={`scroll-smooth bg-background ${hankenGrotesk.variable} ${merriweather.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CommandMenu data={searchData} categories={searchCategories} />
          <ScrollToTop />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
