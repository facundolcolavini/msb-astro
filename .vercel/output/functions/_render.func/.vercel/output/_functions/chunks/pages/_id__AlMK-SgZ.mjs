import { createLocalDatabaseClient, asDrizzleTable, seedLocal } from '@astrojs/db/runtime';
import { and, eq } from '@astrojs/db/dist/runtime/config.js';

const dbUrl$1 = "file:///F:/Mis%20cosas/Programacion/msb-astro/.astro/content.db";
createLocalDatabaseClient({ dbUrl: dbUrl$1 });

asDrizzleTable("User", {"columns":{"id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}},"username":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"username","collection":"User","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"User","primaryKey":false,"optional":true}},"github_id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"github_id","collection":"User","primaryKey":false,"optional":true}}},"deprecated":false}, false);
asDrizzleTable("Session", {"columns":{"id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Session","primaryKey":false,"optional":false}},"userId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"Session","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}}}},"expiresAt":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"expiresAt","collection":"Session","primaryKey":false,"optional":false}}},"deprecated":false}, false);
asDrizzleTable("Favorites", {"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Favorites","primaryKey":true,"optional":false}},"userId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"Favorites","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}}}},"publicationId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"publicationId","collection":"Favorites","primaryKey":false,"optional":false}},"publicationSuc":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"publicationSuc","collection":"Favorites","primaryKey":false,"optional":false}},"isEntrepreneurshipPublic":{"type":"boolean","schema":{"optional":false,"unique":false,"deprecated":false,"name":"isEntrepreneurshipPublic","collection":"Favorites"}}},"deprecated":false}, false);

async function seed() {
}

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: seed
}, Symbol.toStringTag, { value: 'Module' }));

const dbUrl = "file:///F:/Mis%20cosas/Programacion/msb-astro/.astro/content.db";
const db = createLocalDatabaseClient({ dbUrl });

await seedLocal({
	db,
	tables: {"User":{"columns":{"id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}},"username":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"username","collection":"User","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"User","primaryKey":false,"optional":true}},"github_id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"github_id","collection":"User","primaryKey":false,"optional":true}}},"deprecated":false},"Session":{"columns":{"id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Session","primaryKey":false,"optional":false}},"userId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"Session","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}}}},"expiresAt":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"expiresAt","collection":"Session","primaryKey":false,"optional":false}}},"deprecated":false},"Favorites":{"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Favorites","primaryKey":true,"optional":false}},"userId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"Favorites","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}}}},"publicationId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"publicationId","collection":"Favorites","primaryKey":false,"optional":false}},"publicationSuc":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"publicationSuc","collection":"Favorites","primaryKey":false,"optional":false}},"isEntrepreneurshipPublic":{"type":"boolean","schema":{"optional":false,"unique":false,"deprecated":false,"name":"isEntrepreneurshipPublic","collection":"Favorites"}}},"deprecated":false}},
	userSeedGlob: /* #__PURE__ */ Object.assign({"/db/seed.ts": __vite_glob_0_0}),
	integrationSeedFunctions: [],
});

const User = asDrizzleTable("User", {"columns":{"id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}},"username":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"username","collection":"User","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"User","primaryKey":false,"optional":true}},"github_id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"github_id","collection":"User","primaryKey":false,"optional":true}}},"deprecated":false}, false);
const Session = asDrizzleTable("Session", {"columns":{"id":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"Session","primaryKey":false,"optional":false}},"userId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"Session","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}}}},"expiresAt":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"expiresAt","collection":"Session","primaryKey":false,"optional":false}}},"deprecated":false}, false);
const Favorites = asDrizzleTable("Favorites", {"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Favorites","primaryKey":true,"optional":false}},"userId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"userId","collection":"Favorites","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":true,"deprecated":false,"name":"id","collection":"User","primaryKey":true,"optional":false}}}},"publicationId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"publicationId","collection":"Favorites","primaryKey":false,"optional":false}},"publicationSuc":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"publicationSuc","collection":"Favorites","primaryKey":false,"optional":false}},"isEntrepreneurshipPublic":{"type":"boolean","schema":{"optional":false,"unique":false,"deprecated":false,"name":"isEntrepreneurshipPublic","collection":"Favorites"}}},"deprecated":false}, false);

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

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

export { Favorites as F, Session as S, User as U, _id_ as _, db as d };
