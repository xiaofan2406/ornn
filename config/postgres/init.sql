CREATE TABLE public."user" (
  "id" SERIAL,
  "email" CHARACTER varying(255) NOT NULL,
  "password" CHARACTER varying(255) NOT NULL,
  "activated" BOOLEAN NOT NULL DEFAULT false,
  "credit" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "deletedAt" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "users_email_key" UNIQUE ("email")
);
