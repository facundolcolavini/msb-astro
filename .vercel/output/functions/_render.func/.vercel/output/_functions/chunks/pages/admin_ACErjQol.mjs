/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_BcvtDIcF.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/signin");
  }
  return renderTemplate`${maybeRenderHead()}<h1>Admin</h1>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/admin.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/admin.astro";
const $$url = "/admin";

export { $$Admin as default, $$file as file, $$url as url };
