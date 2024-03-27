/* empty css                              */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_BcvtDIcF.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  return renderTemplate`${maybeRenderHead()}<h1>Dashboard</h1>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/admin/dashboard.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

export { $$Dashboard as default, $$file as file, $$url as url };
