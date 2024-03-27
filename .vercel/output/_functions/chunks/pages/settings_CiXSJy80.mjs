/* empty css                              */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_BcvtDIcF.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  return renderTemplate`${maybeRenderHead()}<h1>Settings</h1>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/admin/settings.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/admin/settings.astro";
const $$url = "/admin/settings";

export { $$Settings as default, $$file as file, $$url as url };
