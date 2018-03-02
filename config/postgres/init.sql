CREATE TABLE IF NOT EXISTS public."user" (
  "id" int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" CHARACTER varying(255) UNIQUE NOT NULL,
  "password" CHARACTER varying(255) NOT NULL,
  "activated" BOOLEAN NOT NULL DEFAULT false,
  "credit" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "deletedAt" TIMESTAMP WITH TIME ZONE
);
