-- CreateTable
CREATE TABLE "Reseaech" (
    "id" SERIAL NOT NULL,
    "jobLevel" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "additionalInfo" TEXT,

    CONSTRAINT "Reseaech_pkey" PRIMARY KEY ("id")
);
