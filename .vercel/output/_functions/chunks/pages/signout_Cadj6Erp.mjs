import { l as lucia } from './_id__4xNdbqBM.mjs';

async function POST(context) {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401
    });
  }
  await lucia.invalidateSession(context.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return context.redirect("/");
}

export { POST };
