/* empty css                              */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderComponent, n as createTransitionScope } from '../astro_BcvtDIcF.mjs';
import 'kleur/colors';
import { $ as $$Link, a as $$Icon, b as $$Layout, g as getEntrepreneurshipById } from './_id__4xNdbqBM.mjs';
/* empty css                          */
import he from 'he';

const capitalize = (str) => {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
function formatOptions(options) {
  return options?.filter((option) => {
    const description = "description" in option ? option.description : option?.descripcion;
    "value" in option ? option.value : "val" in option ? option.val : "";
    return !(description === "INDISTINTO" || description === "INDISTINTO" && "val" in option && option.val === "" || description === "TODAS");
  }).map((option) => {
    let description;
    let value;
    if ("description" in option) {
      description = he.decode(option.description);
      value = option.value || "";
    } else if ("val" in option) {
      description = option.descripcion;
      value = option.val;
    } else if ("id" in option) {
      description = he.decode(option.descripcion);
      value = option.id;
    } else {
      description = he.decode(option.descripcion);
      value = option.value || "";
    }
    return {
      label: capitalize(he.decode(description)),
      value
    };
  });
}
function formatearString(inputStr) {
  const decodedStr = decodeURIComponent(inputStr);
  const formattedStr = decodedStr.replace(/-/g, " ");
  return formattedStr;
}

const $$Astro$3 = createAstro();
const $$BreadCrumb = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BreadCrumb;
  const urlsObjtAstro = Astro2.url;
  const currentURL = urlsObjtAstro;
  const { pathname, origin, searchParams } = currentURL;
  const pathParts = pathname.split("/").filter((part) => part !== "");
  const breadcrumbItems = pathParts.map((part, index) => {
    const breadcrumbURL = `${origin}/${pathParts.slice(0, index + 1).join("/")}`;
    return {
      name: part,
      // Nombre del elemento del breadcrumb
      url: breadcrumbURL
      // URL del elemento del breadcrumb
    };
  });
  const breadcrumbWithHome = [
    {
      name: "Home",
      // Nombre del enlace "Home"
      url: `${origin}`
      // URL de la página principal
    },
    /* /pathname/id */
    ...breadcrumbItems?.map((item, index) => {
      const name = item.name.includes("?") ? formatearString(he.decode(item.name)) : formatearString(he.decode(item.name));
      return {
        ...item,
        name: he.decode(name)
      };
    })
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="flex p-5 px-0 lg:px-0 md:px-0" aria-label="Breadcrumb"> <ol class="flex flex-wrap items-center"> ${breadcrumbWithHome?.map((item, index) => {
    item.name.split("?")[item.name.split("?").length - 1];
    return renderTemplate`<li class="inline-flex items-center"> <div class="flex items-center"> ${index === 0 || item.name === "resultados de busqueda" || item.name === "emprendimientos" ? renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": item.url, "class": ` ${item.url === `${origin}${pathname}` ? "text-primary-msb font-semibold tracking-wide " : "ms-1 text-sm font-semibold text-primary-text-msb capitalize hover:text-tertiary-bg-msb tracking-wide underline"}` }, { "default": ($$result2) => renderTemplate`${item.name === "Home" ? renderTemplate`<p class="pr-1"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "home-2", "size": 20 })} </p>` : renderTemplate`<p class="px-1 capitalize">${he.decode(item.name)}</p>`}` })}` : (
      /* IF THE LAST ITEM OF BREADCRUMB CHANGE TE TEXT COLOR TO GREEN */
      renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": "", "class": ` ${item.url === `${origin}${pathname}` ? "text-primary-msb font-semibold tracking-wide pointer-events-none" : "ms-1 text-sm font-semibold text-primary-text-msb capitalize hover:text-tertiary-bg-msb tracking-wide  pointer-events-none"}` }, { "default": ($$result2) => renderTemplate`${item.name === "Home" ? renderTemplate`<p class="pr-1"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "home-2", "size": 20 })} </p>` : renderTemplate`<p class="px-1 capitalize">${capitalize(he.decode(item.name))}</p>`}` })}`
    )} ${index !== breadcrumbWithHome.length - 1 && renderTemplate`<span class="text-primary-text-msb font-light">/</span>`} </div> </li>`;
  })} </ol> </nav>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/BreadCrumb.astro", void 0);

const $$Astro$2 = createAstro();
const $$propiedad$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$propiedad$2;
  const session = Astro2.locals.session;
  const { propiedad } = Astro2.params;
  const url = Astro2.url;
  let prop = url.toString().split("/").pop();
  let suc = prop?.split("-")[0] ?? "";
  let id = prop?.split("-")[1] ?? "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Detalle de Propieda", "description": "Detalle de Propiedad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#FFFBF4] h-full py-2"> ${renderComponent($$result2, "PropertyPage", null, { "client:only": true, "session": session ?? null, "propertyCode": id, "branchCode": suc, "breadCrumbChild": "", "client:component-hydration": "only", "client:component-path": "@/components/preact/Property/PropertyPage", "client:component-export": "default" }, { "breadCrumbChild": ($$result3) => renderTemplate`${renderComponent($$result3, "BreadCrumb", $$BreadCrumb, { "slot": "breadCrumbChild", "url": propiedad, "data-astro-transition-persist": createTransitionScope($$result3, "dhz26qxv") })}` })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/[...emprendimiento]/unidad-disponible/[...operacion]/[propiedad].astro", "self");

const $$file$2 = "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/[...emprendimiento]/unidad-disponible/[...operacion]/[propiedad].astro";
const $$url$2 = "/emprendimientos/[...emprendimiento]/unidad-disponible/[...operacion]/[propiedad]";

const _propiedad_$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$propiedad$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$propiedad$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$propiedad$1;
  const { propiedad } = Astro2.params;
  const url = Astro2.url;
  const session = Astro2.locals.session;
  let prop = url.toString().split("/").pop();
  let suc = prop?.split("-")[0] ?? "";
  let id = prop?.split("-")[1] ?? "";
  const data = await getEntrepreneurshipById(id);
  const amig = capitalize(data.emprendimiento[0].amigable.replaceAll("-", " "));
  const image = data.emprendimiento[0].img_princ;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data?.emprendimiento[0]?.titulo, "description": amig, "img": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#FFFBF4] h-full py-2"> ${renderComponent($$result2, "EntrepreneurshipDetail", null, { "client:only": true, "session": session, "propertyCode": id, "branchCode": suc, "breadCrumbChild": "", "client:component-hydration": "only", "client:component-path": "@/components/preact/Entrepreneurship/EntrepreneurshipDetail", "client:component-export": "default" }, { "breadCrumbChild": ($$result3) => renderTemplate`${renderComponent($$result3, "BreadCrumb", $$BreadCrumb, { "slot": "breadCrumbChild", "url": propiedad, "data-astro-transition-persist": createTransitionScope($$result3, "5qztnjne") })}` })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/[...emprendimiento]/[propiedad].astro", "self");

const $$file$1 = "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/[...emprendimiento]/[propiedad].astro";
const $$url$1 = "/emprendimientos/[...emprendimiento]/[propiedad]";

const _propiedad_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$propiedad$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$propiedad = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$propiedad;
  const { propiedad } = Astro2.params;
  const url = Astro2.url;
  let prop = url.toString().split("/").pop();
  const session = Astro2.locals.session;
  let suc = prop?.split("-")[0] ?? "";
  let id = prop?.split("-")[1] ?? "";
  const response = await fetch(`${Astro2.url.origin}/api/property.json?suc=${suc}&id=${id}`);
  const data = await response.json();
  const { titulo, img_princ, in_tip, direccion, in_loc } = data.resultado.ficha[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${capitalize(in_tip)} - ${capitalize(direccion)} en ${capitalize(in_loc)}`, "description": titulo, "img": img_princ }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#FFFBF4] h-full py-2"> ${renderComponent($$result2, "PropertyPage", null, { "client:only": true, "session": session, "propertyCode": id, "branchCode": suc, "breadCrumbChild": "", "client:component-hydration": "only", "client:component-path": "@/components/preact/Property/PropertyPage", "client:component-export": "default" }, { "breadCrumbChild": ($$result3) => renderTemplate`${renderComponent($$result3, "BreadCrumb", $$BreadCrumb, { "slot": "breadCrumbChild", "url": propiedad, "data-astro-transition-persist": createTransitionScope($$result3, "nt5vcjzm") })}` })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/resultados-de-busqueda/[...operacion]/[propiedad].astro", "self");

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/resultados-de-busqueda/[...operacion]/[propiedad].astro";
const $$url = "/resultados-de-busqueda/[...operacion]/[propiedad]";

const _propiedad_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$propiedad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _propiedad_$2 as _, _propiedad_$1 as a, _propiedad_ as b, capitalize as c, formatOptions as f };
