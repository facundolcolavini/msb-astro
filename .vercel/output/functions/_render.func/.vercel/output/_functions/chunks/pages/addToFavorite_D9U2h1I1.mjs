import { d as db, F as Favorites, U as User } from './_id__AlMK-SgZ.mjs';
import { eq } from '@astrojs/db/dist/runtime/config.js';

const POST = async ({
  request,
  cookies
}) => {
  const data = await request.json();
  const {
    userId,
    publicationId,
    publicationSuc,
    isEntrepreneurshipPublic
  } = data;
  if (!publicationId || !publicationSuc) {
    return new Response(JSON.stringify({
      message: "La propiedad que intenta agregar a su lista de favoritos no existe.",
      success: false
    }), {
      status: 404
    });
  }
  const favorite = (await db.select().from(Favorites).where(eq(Favorites.publicationId, publicationId))).at(0);
  if (favorite) {
    return new Response(JSON.stringify({
      message: "La propiedad ya esta en favoritos.",
      success: false
    }), {
      status: 404
    });
  }
  if (!userId) {
    return new Response(JSON.stringify({
      message: "Por favor registrese para poder agregar la propiedad a favoritos.",
      success: false
    }), {
      status: 404
    });
  }
  (await db.select().from(User).where(eq(User.id, userId))).at(0);
  try {
    const res = await db.insert(Favorites).values({
      userId,
      publicationId,
      publicationSuc,
      isEntrepreneurshipPublic
    });
    if (res) {
      return new Response(JSON.stringify({
        message: "Agregado a favoritos.",
        success: true
      }));
    } else {
      throw new Error("Ocurrio un problema al agregar la propiedad a favoritos.");
    }
  } catch (e) {
    return new Response(JSON.stringify({
      message: e.message,
      success: false
    }), {
      status: 404
    });
  }
};

export { POST };
