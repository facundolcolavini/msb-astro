import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import { db, eq, User } from "astro:db";
import { lucia } from "../../auth";

export async function POST(context: APIContext): Promise<Response> {
  //Parse the form data
  const formData = await context.request.json()
  const { password, username } = formData;
  //Validate the form data
  //search the user
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);

  //if user not found
  if (foundUser) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "El nombre de usuario ya existe",
      }),
      {
        status: 400,
      }
    );
  }
  if (!password || !username) {
    return new Response(
      JSON.stringify({
        message: `${!username ? "username, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
        success: false,
      }),
      {
        status: 400,
      }
    );
  }

  if (typeof username !== "string" || username.length < 4) {
    return new Response(
      JSON.stringify(
        {
          message: "El nombre de usuario debe contener 4 caracteres de largo",
          success: false
        }), {
      status: 400,
    });
  }

  if (typeof password !== "string" || password.length < 4) {
    return new Response(
      JSON.stringify(
        {
          message: "La contraseña debe de contener 4 caracteres de largo",
          success: false
        }), {
      status: 400,
    });
  }

  // Insert user into db
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  await db.insert(User).values([
    {
      id: userId,
      username,
      password: hashedPassword,
    },
  ]);

  // Generate session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new Response(
    JSON.stringify({
      success: true,
      message: "Creación de cuenta exitosa",
    }),
    {
      status: 200,
    }
  );
}
