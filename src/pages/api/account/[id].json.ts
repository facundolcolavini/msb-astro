import type { APIRoute } from "astro";
import { User, db, eq } from "astro:db";

export const PATCH: APIRoute = async ({ params, request }) => {
    const { firstName, lastName, /* password */ phone, phoneAlternative,street,addressNumber,location } = await request.json() ;
    const id = params.id
    /* let newPassword: string; */
    // Handler de los campos requeridos para el registro 
    if (!firstName || !lastName ) {
      return new Response(
        JSON.stringify({
          message: `${!firstName ? "Nombre, " : ""}${!lastName ? "Apellido, " : ""} son campos requeridos.`,
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
    console.log(id)
    if (!id) {
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields.",
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  
    try {
  
      // Desencriptar la contraseña del usuario que esta en la base de datos para compararla con la que se esta enviando en el formulario
      const user = await db.select().from(User).where(eq(User.id, id));
      console.log(user)
      if (!user) {
        throw new Error("El usuario no existe, por favor verifique la información.");
      }
     /*  const isMatch = await bcrypt.compare(password, user[0].password);
      // Si la contraseña no es igual a la que esta en la base de datos, encriptar la nueva contraseña y guardarla 
      if (!isMatch) {
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(sanitize(password), salt);
      } 
      // Si la contraseña es igual  entonces no cambiarla
      else {
        newPassword = user[0].password;
      }*/
  
      const res = await db.update(User).set({
        firstName,
        lastName,
        phone,
        street,
        addressNumber,
        phoneAlternative,
        location,
        lastUpdate: Date.now()
      }).where(eq(User.id, id));
  
      if (res) {
        return new Response(
          JSON.stringify({
            message: "Cuenta actualizada correctamente.",
            success: true,
          })
        );
      } else {
        throw new Error("prob, bob");
      }
    } catch (e) {
      console.error(e);
      return new Response(
        JSON.stringify({
          message: e,
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  };