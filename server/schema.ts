import {
  pgTable,
  text,
  pgEnum,
} from "drizzle-orm/pg-core"

export const SkillLevelEnum = pgEnum("skill_level", [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
  "Master",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text("firstName"),
  lastName: text("lastName"),
  location: text("location"),
  email: text("email").notNull(),
  image: text("image").default("no-image"),
  password: text("password"),
  skillLevel: SkillLevelEnum("skill_level").notNull().default("Beginner"),
})