-- AlterTable: add the unsubscribe token in three steps so existing rows survive.
ALTER TABLE "Subscriber" ADD COLUMN "unsubscribeToken" TEXT;

-- Backfill anyone who subscribed before this column existed.
UPDATE "Subscriber" SET "unsubscribeToken" = gen_random_uuid()::text WHERE "unsubscribeToken" IS NULL;

ALTER TABLE "Subscriber" ALTER COLUMN "unsubscribeToken" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_unsubscribeToken_key" ON "Subscriber"("unsubscribeToken");
