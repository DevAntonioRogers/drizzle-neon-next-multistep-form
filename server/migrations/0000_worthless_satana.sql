DO $$ BEGIN
 CREATE TYPE "public"."skill_level" AS ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"location" text,
	"email" text NOT NULL,
	"image" text DEFAULT 'no-image',
	"password" text,
	"skill_level" "skill_level" DEFAULT 'Beginner' NOT NULL
);
