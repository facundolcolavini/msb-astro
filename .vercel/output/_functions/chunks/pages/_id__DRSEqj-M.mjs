import { d as db, U as User, F as Favorites } from './_id__4xNdbqBM.mjs';
import { and, eq } from '@astrojs/db/dist/runtime/config.js';

const DELETE = async ({
  params,
  request
}) => {
  const data = await request.json();
  const {
    ids
  } = data;
  const {
    id: userId
  } = params;
  if (!ids) {
    return new Response(JSON.stringify({
      message: "La propiedad que intenta agregar a su lista de favoritos no existe.",
      success: false
    }), {
      status: 404
    });
  }
  const user = (await db.select().from(User).where(and(eq(User.id, userId), eq(User.id, userId))))[0];
  if (!userId || !user) {
    return new Response(JSON.stringify({
      message: "Por favor registrese para poder eliminar la propiedad de favoritos.",
      success: false
    }), {
      status: 404
    });
  }
  try {
    if (Array.isArray(ids)) {
      if (ids[0] === "all") {
        const res = await db.delete(Favorites).where(eq(Favorites.userId, userId));
        if (res) {
          return new Response(JSON.stringify({
            message: "Eliminados todos de favoritos.",
            success: true
          }));
        } else {
          throw new Error("Ocurrio un problema al eliminar la propiedad de favoritos.");
        }
      }
      const queries = [];
      for (let i = 0; i < ids.length; i++) {
        queries.push(db.delete(Favorites).where(and(eq(Favorites.publicationId, ids[i]), eq(Favorites.userId, userId))));
      }
      await db.batch(queries);
      return new Response(JSON.stringify({
        message: "Eliminados de favoritos.",
        success: true
      }));
    } else {
      const res = await db.delete(Favorites).where(and(eq(Favorites.publicationId, ids), eq(Favorites.userId, userId)));
      if (res) {
        return new Response(JSON.stringify({
          message: "Eliminado de favoritos.",
          success: true
        }));
      } else {
        throw new Error("Ocurrio un problema al eliminar la propiedad de favoritos.");
      }
    }
  } catch (e) {
    return new Response(JSON.stringify({
      message: e,
      success: false
    }), {
      status: 404
    });
  }
};
const GET = async ({
  params
}) => {
  const {
    id: userId
  } = params;
  const favorites = await db.select().from(Favorites).where(
    eq(Favorites.userId, userId || "")
    // Ensure userId is not undefined
  );
  return new Response(JSON.stringify({
    message: "Favoritos",
    success: true,
    data: favorites
  }));
};

export { DELETE, GET };
