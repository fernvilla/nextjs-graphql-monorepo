-- CreateTable
CREATE TABLE "League" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "leagueId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterAccount" (
"id" SERIAL,
    "accountName" TEXT NOT NULL,
    "teamId" INTEGER,
    "leagueId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
"id" SERIAL,
    "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tweetText" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "profileBannerImageUrl" TEXT,
    "mediaUrl" TEXT,
    "twitterAccountId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League.slug_unique" ON "League"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Team.slug_unique" ON "Team"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccount.accountName_unique" ON "TwitterAccount"("accountName");

-- CreateIndex
CREATE UNIQUE INDEX "Tweet.tweetId_unique" ON "Tweet"("tweetId");

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY("leagueId")REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccount" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccount" ADD FOREIGN KEY("leagueId")REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD FOREIGN KEY("twitterAccountId")REFERENCES "TwitterAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
