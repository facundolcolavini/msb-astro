import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
/*   console.log(context.locals.session) */
  //read the form data
  const formData = await context.request.json()
  const { password, username } = formData;

  //validate the data

  // Handler de los campos requeridos para el registro 
  if ( !password || !username) {
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
  //search the user
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);

  //if user not found
  if (!foundUser) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "El Usuario no existe",
      }),
      {
        status: 400,
      }
    );
  }
  // verify if user has password
  if (!foundUser.password) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "El Usuario no tiene contraseña",
      }),
      {
        status: 400,
      }
    );
  }

  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );

  //If password is not valid
  if (!validPassword) {
    return new Response( 
      JSON.stringify({
        success: false,
        message: "Contraseña incorrecta",
      }),
      {
        status: 400,
      }
    );
  }

  //Password is valid, user can log in

  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  console.log(sessionCookie)
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new Response(
    JSON.stringify({
      success: true,
      message: "Inicio de sesión exitoso",
    }),
    {
      status: 200,
    }
  );
}
