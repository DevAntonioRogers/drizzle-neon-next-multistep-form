"use server";

import { RegisterSchema } from "@/types/register-schema";
import { actionClient } from "@/lib/safe-action";
import bcrypt from "bcrypt"
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../schema";




export const RegisterAccount = actionClient
  .schema(RegisterSchema)
  .action(
    async ({ parsedInput: { email, password, lastName, firstName, skillLevel, location } }) => {
      const hashedPassword = await bcrypt.hash(password, 10)

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      })

      if (existingUser) {
        return {error: "Looks like you already have an account. Please log in."};
      }

      await db.insert(users).values({
        firstName: firstName,
        lastName: lastName,
        location: location,
        email: email,
        password: hashedPassword,
        skillLevel: skillLevel,
      });

      return {success: "Account created successfully"}
    }
  )
