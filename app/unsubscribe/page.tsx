import Link from "next/link";
import { prisma } from "@/lib/db";
import { BlogHeader } from "@/components/layout/blog-header";
import { BlogFooter } from "@/components/layout/blog-footer";
import { Icon } from "@/components/ui/icon";

export const metadata = {
  title: "Unsubscribe",
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  // Clicking the link in the email is the confirmation — deactivate right away.
  const subscriber = token
    ? await prisma.subscriber.findUnique({
        where: { unsubscribeToken: token },
        select: { email: true, active: true },
      })
    : null;

  if (subscriber?.active) {
    await prisma.subscriber.update({
      where: { unsubscribeToken: token },
      data: { active: false },
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <BlogHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="w-full max-w-md rounded-xl border border-border bg-secondary px-6 py-10 text-center md:px-10">
          {subscriber ? (
            <>
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                <Icon icon="lucide:check-circle-2" className="size-6" aria-hidden="true" />
              </span>
              <h1 className="font-serif text-2xl font-bold tracking-tight">
                You have been unsubscribed
              </h1>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {subscriber.email} will no longer receive new article emails.
                Sorry to see you go.
              </p>
              <Link
                href="/newsletter"
                className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4"
              >
                Changed your mind? Subscribe again
              </Link>
            </>
          ) : (
            <>
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon icon="lucide:alert-circle" className="size-6" aria-hidden="true" />
              </span>
              <h1 className="font-serif text-2xl font-bold tracking-tight">
                This link is not valid
              </h1>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                The unsubscribe link is incomplete or has already been replaced.
                Use the link in the most recent email you received.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4"
              >
                Back to the blog
              </Link>
            </>
          )}
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
