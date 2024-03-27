/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, i as renderComponent, o as renderTransition, m as maybeRenderHead, h as addAttribute, n as createTransitionScope, k as renderSlot, p as defineStyleVars, q as defineScriptVars } from '../astro_BcvtDIcF.mjs';
import 'kleur/colors';
import { $ as $$Layout, f as fetchData, a as getEntrepreneurshipById, c as capitalize, b as $$Icon, d as $$Link, e as formatOptions, H as HeartIcon } from './_propiedad__DvX6LKqf.mjs';
/* empty css                                */
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';
import he from 'he';
/* empty css                          */
import clsx, { clsx as clsx$1 } from 'clsx';
import { twMerge } from 'tailwind-merge';
/* empty css                          */
import 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { map, atom } from 'nanostores';
import { useState as useState$1 } from 'preact/compat';

const $$Astro$g = createAstro();
const $$Index$b = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Index$b;
  const title = "Contacto - Mat\xEDas Szpira Bienes Ra\xEDces";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/contacto/index.astro", void 0);

const $$file$b = "F:/Mis cosas/Programacion/msb-astro/src/pages/contacto/index.astro";
const $$url$b = "/contacto";

const index$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$b,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const BannerSlider = ({
  slides,
  sliderTime = 5e3,
  children
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, sliderTime);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, nextSlide, sliderTime]);
  const currentSlide = slides[currentIndex];
  return jsx("section", {
    class: "relative z-0 bg-no-repeat  bg-cover h-[100vh] md:h-[70vh] w-full max-w-[100vw] group",
    children: jsxs("div", {
      className: "w-full h-full bg-center bg-cover duration-500 animate-fade absolute top-0 left-0 ",
      style: {
        backgroundImage: `url(${currentSlide})`,
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        loading: "lazy"
      },
      children: [jsx("div", {
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // Adjust the opacity here (0.5 is 50%)
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }
      }), children]
    })
  });
};

const getAllSelects = async (queryParams) => {
  const endpoint = "datos.select.buscador";
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};
const getLocations = async (queryParams) => {
  const endpoint = "fichas.ubicaciones";
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};
const getAllSelectsEntrepreneurship = async (queryParams) => {
  const endpoint = "datos.select.buscador.emprendimientos";
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};

const $$Astro$f = createAstro();
const $$Index$a = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Index$a;
  const title = "Emprendimientos  | Mat\xEDas Szpira Bienes Ra\xEDces";
  const description = "Emprendimientos Invert\xED en bienes ra\xEDces, nosotros te asesoramos.";
  const { resultado: resEmprendimientos } = await fetchData(
    "resultados.emprendimientos",
    { amaira: "true" }
  );
  const { emprendimiento: entrepreneurship, img } = resEmprendimientos;
  const session = Astro2.locals.session;
  let selectsVal = await getAllSelects();
  let selectEntrepreneurship = await getAllSelectsEntrepreneurship();
  let selects = {
    ...selectsVal,
    ...selectEntrepreneurship,
    ambientes: [
      ...selectEntrepreneurship?.ambientes,
      ...selectEntrepreneurship?.ambientes2,
      ...selectEntrepreneurship?.ambientes3,
      ...selectEntrepreneurship?.ambientes4,
      ...selectEntrepreneurship?.ambientes5
    ]?.filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)
  };
  const locations = await getLocations({ ed_int: "True" });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BannerSlider", BannerSlider, { "slides": img[2], "sliderTime": 8e3, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/preact/BannerSlider", "client:component-export": "default", "data-astro-transition-scope": renderTransition($$result2, "klk6ybps", "fade", "") }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="drop-shadow-md container mx-auto w-full h-full grid grid-cols-1 lg:grid-cols gap-14 place-content-center place-items-center md:place-items-center lg:place-items-start text-white text-start md:text-center lg:text-start text-pretty self-center lg:self-start font-gotham"> <h1${addAttribute("text-center lg:text-start text-white font-normal h-fit  w-100 text-4xl md:text-7xl lg:text-9xl self-center font-cormorant  text-shadow-pretty text-wrap lg:w-40", "class")}>
Nuestros Emprendimientos
</h1> <p class="text-white text-center lg:text-start text-pretty self-center text-2xl md:text-3xl lg:text-4xl w-full font-gotham">
Invertí en bienes raíces, nosotros te asesoramos
</p> </div> ` })} <section class=" py-10 bg-[#FFFBF4]"> ${renderComponent($$result2, "EntrepreneurshipPage", null, { "session": session, "client:only": true, "selects": selects, "locations": locations, "client:component-hydration": "only", "client:component-path": "@/components/preact/Entrepreneurship/EntrepreneurshipPage", "client:component-export": "default" })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/index.astro", "self");

const $$file$a = "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/index.astro";
const $$url$a = "/emprendimientos";

const index$a = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$a,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

function IconDelete(props) {
  return jsx("svg", {
    viewBox: "0 0 1024 1024",
    fill: "currentColor",
    height: "1em",
    width: "1em",
    ...props,
    children: jsx("path", {
      d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
    })
  });
}

const $$Astro$e = createAstro();
const $$Index$9 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Index$9;
  const resFav = await fetch(`${Astro2.url.origin}/api/favorites/1.json`);
  const favoritesIds = await resFav.json();
  let favoritesUser = [];
  for (let i = 0; i < favoritesIds.data.length; i++) {
    if (favoritesIds.data[i].isEntrepreneurshipPublic) {
      const data = await getEntrepreneurshipById(
        favoritesIds.data[i].publicationId
      );
      favoritesUser.push({
        id: data.emprendimiento[0].ed_idl,
        title: capitalize(data.emprendimiento[0].titulo),
        image: data.emprendimiento[0].img_princ
      });
    } else {
      const data = await fetchData(
        "fichas.propiedades",
        {
          id: favoritesIds.data[i].publicationId,
          suc: favoritesIds.data[i].publicationSuc
        }
      );
      favoritesUser.push({
        id: data.resultado.ficha[0].in_fic,
        title: capitalize(
          he.decode(
            `${data.resultado.ficha[0].in_cal} ${data.resultado.ficha[0].in_nro} - ${data.resultado.ficha[0].in_tip} en ${data.resultado.ficha[0].in_loc} ${data.resultado.ficha[0].in_bar}`
          )
        ),
        image: data.resultado?.ficha[0].img_princ
      });
    }
  }
  const title = "Favoritos - Mat\xEDas Szpira Bienes Ra\xEDces ";
  const description = "Tus propiedades favoritas en un solo lugar. Mat\xEDas Szpira Bienes Ra\xEDces te ofrece la posibilidad de guardar tus propiedades favoritas para que puedas verlas cuando quieras. No te pierdas esta oportunidad de invertir en USA con Mat\xEDas Szpira Bienes Ra\xEDces";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "data-astro-cid-2y2whpcu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-secondary-bg-msb h-full font-gotham" data-astro-cid-2y2whpcu> <section class="container mx-auto" data-astro-cid-2y2whpcu> <div class="py-12" data-astro-cid-2y2whpcu> <h1 class="text-lg text-black font-bold text-center uppercase" data-astro-cid-2y2whpcu>
Favoritos
</h1> <p class="text-center" data-astro-cid-2y2whpcu>Administrá tus propiedades guardadas</p> </div> </section> <section class="container mx-auto flex justify-between" data-astro-cid-2y2whpcu> <!-- Checkbox Selecionar todos  --> <div class="flex items-center" data-astro-cid-2y2whpcu> <input type="checkbox" class="custom-checkbox form-checkbox h-5 w-5 text-primary-msb" id="select-all" data-astro-cid-2y2whpcu> <label for="select-all" class="ml-2 text-black" data-astro-cid-2y2whpcu>Seleccionar todos</label> </div> <!-- Botone Eliminar --> <button id="btn-delete"${addAttribute(favoritesUser.length === 0, "disabled")} class="bg-primary-msb text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold " data-astro-cid-2y2whpcu> ${renderComponent($$result2, "IconDelete", IconDelete, { "class": "size-6", "data-astro-cid-2y2whpcu": true })}
Eliminar
</button> </section> <section data-astro-cid-2y2whpcu> ${favoritesUser.length == 0 ? renderTemplate`<div class="container mx-auto flex justify-center items-center h-96" data-astro-cid-2y2whpcu> <p class="text-black text-center" data-astro-cid-2y2whpcu>No hay propiedades guardadas</p> </div>` : renderTemplate`<p class="text-black text-center font-bold py-3 font-gotham text-2xl" data-astro-cid-2y2whpcu> ${favoritesUser.length} propiedades agregadas
</p>`} </section> <section data-astro-cid-2y2whpcu> <!-- List of map User card of properti with check and delete btn --> <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-2y2whpcu> <!-- Card --> ${favoritesUser.map(
    (favProp) => renderTemplate`<div class="bg-white rounded-lg shadow-lg" data-astro-cid-2y2whpcu> <div class="relative justify-center" data-astro-cid-2y2whpcu> <input type="checkbox" data-check-prop="checked-prop" class="absolute top-2 left-2 form-checkbox h-5 w-5 text-primary-msb custom-checkbox"${addAttribute(favProp.id, "id")} data-astro-cid-2y2whpcu> <button${addAttribute(`btn-delete-prop`, "id")}${addAttribute(favProp.id, "data-idProp")} class=" absolute top-2 right-2  bg-white text-black px-2 py-1 rounded-lg" data-astro-cid-2y2whpcu> ${renderComponent($$result2, "IconDelete", IconDelete, { "class": "size-6", "data-astro-cid-2y2whpcu": true })} </button> <img${addAttribute(favProp.image, "src")}${addAttribute(favProp.title, "alt")} class="w-full h-48 object-cover rounded-t-lg" data-astro-cid-2y2whpcu> </div> <div class="p-4" data-astro-cid-2y2whpcu> <h2 class="text-lg text-black font-bold" data-astro-cid-2y2whpcu>${favProp.title}</h2> <div class="flex justify-end items-end mt-4" data-astro-cid-2y2whpcu></div> </div> </div>`
  )} </div> </section> </article> ` })}  `;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/favoritos/index.astro", void 0);

const $$file$9 = "F:/Mis cosas/Programacion/msb-astro/src/pages/favoritos/index.astro";
const $$url$9 = "/favoritos";

const index$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$9,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$d = createAstro();
const $$Index$8 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Index$8;
  const title = "Invertir en USA  |  Inversiones en Estados Unidos";
  const description = "Invertir en USA es una excelente opci\xF3n para diversificar tu portafolio de inversiones. Conoce las mejores opciones para invertir en Estados Unidos.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <h1> Invertir en USA</h1> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/invierta-en-usa/index.astro", void 0);

const $$file$8 = "F:/Mis cosas/Programacion/msb-astro/src/pages/invierta-en-usa/index.astro";
const $$url$8 = "/invierta-en-usa";

const index$8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$8,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$c = createAstro();
const $$Index$7 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Index$7;
  const session = Astro2.locals.session;
  const selects = await getAllSelects();
  const locations = await getLocations();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resultados de Busqueda", "description": "Busca tu propiedad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-secondary-bg-msb h-full"> <div class="container mx-auto font-gotham"> ${renderComponent($$result2, "ResultsPage", null, { "session": session || null, "selects": selects, "locations": locations, "client:only": true, "client:component-hydration": "only", "client:component-path": "@/components/preact/Results/ResultsPage", "client:component-export": "default", "data-astro-transition-persist": createTransitionScope($$result2, "whyxepak") })} </div> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/resultados-de-busqueda/index.astro", "self");

const $$file$7 = "F:/Mis cosas/Programacion/msb-astro/src/pages/resultados-de-busqueda/index.astro";
const $$url$7 = "/resultados-de-busqueda";

const index$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$7,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$b = createAstro();
const $$Index$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$6;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/servicios/administracion/index.astro", void 0);

const $$file$6 = "F:/Mis cosas/Programacion/msb-astro/src/pages/servicios/administracion/index.astro";
const $$url$6 = "/servicios/administracion";

const index$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$6,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro();
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index$5;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/servicios/tasaciones/index.astro", void 0);

const $$file$5 = "F:/Mis cosas/Programacion/msb-astro/src/pages/servicios/tasaciones/index.astro";
const $$url$5 = "/servicios/tasaciones";

const index$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$5,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$9 = createAstro();
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Index$4;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/servicios/index.astro", void 0);

const $$file$4 = "F:/Mis cosas/Programacion/msb-astro/src/pages/servicios/index.astro";
const $$url$4 = "/servicios";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$4,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro();
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index$3;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/sumate/index.astro", void 0);

const $$file$3 = "F:/Mis cosas/Programacion/msb-astro/src/pages/sumate/index.astro";
const $$url$3 = "/sumate";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro();
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Index$2;
  const title = "Tasaciones - Mat\xEDas Szpira Bienes Ra\xEDces ";
  const description = "Tasaciones de propiedades en Buenos Aires, Argentina. Mat\xEDas Szpira Bienes Ra\xEDces. ";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <h1> Invertir en USA</h1> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/tasaciones/index.astro", void 0);

const $$file$2 = "F:/Mis cosas/Programacion/msb-astro/src/pages/tasaciones/index.astro";
const $$url$2 = "/tasaciones";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index$1;
  const titlePage = "Usuarios";
  const description = "CRUD de usuarios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": titlePage, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-gray-450 text-2xl">${titlePage}</h1> <div class="grid lg:grid-cols-2 place-content-between"> <div class="overflow-x-auto"> <!-- Table  --> <table class="table-auto w-full"> <thead> <tr> <th class="px-4 py-2 text-gray-700 text-sm font-bold truncate">Id</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Nombre</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Apellido</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Email</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Telefono</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Alt Tel</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Creado</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Ult Actualización</th> <th class="px-4 py-2 text-gray-700 text-sm font-bold">Acciones</th> </tr> </thead> <tbody>  </tbody> </table> </div> <div class="flex justify-center"> <form id="add-form" class="grid grid-cols-2 gap-x-2 fixed justify-center"> <div class="mb-4"> <label for="firstName" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label> <input type="text" id="firstName" name="firstName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <label for="lastName" class="block text-gray-700 text-sm font-bold mb-2">Apellido</label> <input type="text" id="lastName" name="lastName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Usuario</label> <input type="text" id="username" name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label> <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label> <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Telefono</label> <input type="text" id="phone" name="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Tel Alternativo</label> <input type="text" id="alternativePhone" name="alternativePhone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> </div> <div class="mb-4"> <button id="addBtn" data-add="addBtn" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar</button> <button id="updateBtn" data-update="updateBtn" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hidden">Guardar</button> <button id="backBtn" data-update="backBtn" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hidden">Volver</button> </div> </form> <!-- Edit Form --> </div> </div> </div> ` })} `;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/usuarios/index.astro", void 0);

const $$file$1 = "F:/Mis cosas/Programacion/msb-astro/src/pages/usuarios/index.astro";
const $$url$1 = "/usuarios";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

let navigateOnServerWarned = false;
async function navigate(href, options) {
  {
    if (!navigateOnServerWarned) {
      const warning = new Error(
        "The view transitions client API was called during a server side render. This may be unintentional as the navigate() function is expected to be called in response to user interactions. Please make sure that your usage is correct."
      );
      warning.name = "Warning";
      console.warn(warning);
      navigateOnServerWarned = true;
    }
    return;
  }
}

const $$Astro$5 = createAstro();
const $$ButtonLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ButtonLink;
  const { href, class: className } = Astro2.props;
  const styles = twMerge(clsx("w-100 h-100", className));
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(styles, "class")}${addAttribute(href ?? "", "href")}> ${renderSlot($$result, $$slots["default"])}</a>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/ButtonLink.astro", void 0);

const $$Astro$4 = createAstro();
const $$Chat = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Chat;
  return renderTemplate`${renderComponent($$result, "Link", $$Link, { "class": "fixed right-0 bottom-0 m-2 md:m-5 lg:m-5 z-50", "target": "_blank", "href": `https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+https://msb-sh.vercel.app+para+consultarles&type=phone_number&app_absent=0` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-tertiary-bg-hover-msb flex items-center gap-4 p-4 mx-0 md:mx-5 lg:mx-3 md:p-5 lg:p-5 lg:px-4 rounded-full text-white hover:bg-bg-3-hover-msb transition ease-in-out duration-200 "> ${renderComponent($$result2, "Icon", $$Icon, { "class": "text-white", "size": 35, "name": "brand-wechat" })} <span class="font-bold text-sm md:text-md lg:text-lg">Envianos un Whatsapp</span> </div> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/Chat.astro", void 0);

const $$Astro$3 = createAstro();
const $$HeroContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$HeroContainer;
  const { img } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-no-repeat z-0 bg-cover  h-[100vh] md:h-[70vh]  w-full max-w-[100vw]"> <img class="absolute h-full w-full animate-fadeIn object-cover object-center animate-duration-1000 animate-ease-in-out z-0"${addAttribute(img, "src")} alt="Propiedades cover"> <div class="absolute inset-0 m-auto w-full h-full flex justify-center flex-col items-center bg-black bg-opacity-30"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/HeroContainer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$SliderA = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SliderA;
  const {
    colsNr,
    height = 90,
    width = 100,
    classSlide
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ colsNr }]);
  return renderTemplate(_a || (_a = __template(["", "<div", " data-astro-cid-l7g75nok", '> <div class="wrapper flex justify-center items-center" data-astro-cid-l7g75nok', '>  <button id="left" class="btn btn-left rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Previous slide" data-astro-cid-l7g75nok', ">\n&#10094;\n</button> <ul", " data-astro-cid-l7g75nok", "> ", ' </ul> <button id="right" class="btn btn-right rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Next slide" data-astro-cid-l7g75nok', ">\n&#10095;\n</button> </div> </div>  <script>(function(){", '\n  document.addEventListener("astro:page-load", (event) => {\n  const sliders = document.querySelectorAll(`.${classSlide}`);\n  sliders.forEach((slider) => {\n    const wrapper = slider;\n    const carousel = wrapper?.querySelector(".carousel");\n    const arrowBtns = wrapper?.querySelectorAll(".btn");\n    const card = carousel?.querySelector(".card");\n    const firstCardWidth = card ? card.offsetWidth : null;\n\n    if (carousel && arrowBtns && firstCardWidth) {\n        const carouselChildrens = [...carousel.children];\n    \n        let isDraggin = false,\n          startX,\n          startScrollLeft,\n          timeoutId;\n        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);\n    \n        carouselChildrens\n          .slice(-cardPerView)\n          .reverse()\n          .forEach((card) => {\n            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);\n          });\n    \n        carouselChildrens.slice(0, cardPerView).forEach((card) => {\n          carousel.insertAdjacentHTML("beforeend", card.outerHTML);\n        });\n    \n        arrowBtns.forEach((btn) => {\n          btn.addEventListener("click", () => {\n            carousel.scrollLeft +=\n              btn.id === "left" ? -firstCardWidth : firstCardWidth;\n          });\n        });\n    \n        const dragStart = (e) => {\n          isDraggin = true;\n          carousel.classList.add("dragging");\n          startX = e.pageX;\n          startScrollLeft = carousel.scrollLeft;\n        };\n    \n        const dragging = (e) => {\n          if (!isDraggin) return;\n          carousel.scrollLeft = startScrollLeft - (e.pageX - startX);\n        };\n    \n        const dragStop = () => {\n          isDraggin = false;\n          carousel.classList.remove("dragging");\n        };\n    \n        const autoPlay = () => {\n          if (window.innerWidth < 800) return;\n          timeoutId = setTimeout(\n            () => (carousel.scrollLeft += firstCardWidth),\n            2500,\n          );\n        };\n    \n        autoPlay();\n    \n        const infiniteScroll = () => {\n          if (carousel.scrollLeft === 0) {\n            carousel.classList.add("no-transition");\n            carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;\n            carousel.classList.remove("no-transition");\n          } else if (\n            Math.ceil(carousel.scrollLeft) ===\n            carousel.scrollWidth - carousel.offsetWidth\n          ) {\n            carousel.classList.add("no-transition");\n            carousel.scrollLeft = carousel.offsetWidth;\n            carousel.classList.remove("no-transition");\n          }\n          clearTimeout(timeoutId);\n          if (!wrapper.matches(":hover")) autoPlay();\n        };\n    \n        carousel.addEventListener("mousedown", dragStart);\n        carousel.addEventListener("mousemove", dragging);\n        document.addEventListener("mouseup", dragStop);\n        carousel.addEventListener("scroll", infiniteScroll);\n        carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));\n        carousel.addEventListener("mouseleave", autoPlay);\n      } else {\n        return;\n      }\n    \n    });\n\n  })\n\n})();<\/script>'], ["", "<div", " data-astro-cid-l7g75nok", '> <div class="wrapper flex justify-center items-center" data-astro-cid-l7g75nok', '>  <button id="left" class="btn btn-left rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Previous slide" data-astro-cid-l7g75nok', ">\n&#10094;\n</button> <ul", " data-astro-cid-l7g75nok", "> ", ' </ul> <button id="right" class="btn btn-right rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Next slide" data-astro-cid-l7g75nok', ">\n&#10095;\n</button> </div> </div>  <script>(function(){", '\n  document.addEventListener("astro:page-load", (event) => {\n  const sliders = document.querySelectorAll(\\`.\\${classSlide}\\`);\n  sliders.forEach((slider) => {\n    const wrapper = slider;\n    const carousel = wrapper?.querySelector(".carousel");\n    const arrowBtns = wrapper?.querySelectorAll(".btn");\n    const card = carousel?.querySelector(".card");\n    const firstCardWidth = card ? card.offsetWidth : null;\n\n    if (carousel && arrowBtns && firstCardWidth) {\n        const carouselChildrens = [...carousel.children];\n    \n        let isDraggin = false,\n          startX,\n          startScrollLeft,\n          timeoutId;\n        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);\n    \n        carouselChildrens\n          .slice(-cardPerView)\n          .reverse()\n          .forEach((card) => {\n            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);\n          });\n    \n        carouselChildrens.slice(0, cardPerView).forEach((card) => {\n          carousel.insertAdjacentHTML("beforeend", card.outerHTML);\n        });\n    \n        arrowBtns.forEach((btn) => {\n          btn.addEventListener("click", () => {\n            carousel.scrollLeft +=\n              btn.id === "left" ? -firstCardWidth : firstCardWidth;\n          });\n        });\n    \n        const dragStart = (e) => {\n          isDraggin = true;\n          carousel.classList.add("dragging");\n          startX = e.pageX;\n          startScrollLeft = carousel.scrollLeft;\n        };\n    \n        const dragging = (e) => {\n          if (!isDraggin) return;\n          carousel.scrollLeft = startScrollLeft - (e.pageX - startX);\n        };\n    \n        const dragStop = () => {\n          isDraggin = false;\n          carousel.classList.remove("dragging");\n        };\n    \n        const autoPlay = () => {\n          if (window.innerWidth < 800) return;\n          timeoutId = setTimeout(\n            () => (carousel.scrollLeft += firstCardWidth),\n            2500,\n          );\n        };\n    \n        autoPlay();\n    \n        const infiniteScroll = () => {\n          if (carousel.scrollLeft === 0) {\n            carousel.classList.add("no-transition");\n            carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;\n            carousel.classList.remove("no-transition");\n          } else if (\n            Math.ceil(carousel.scrollLeft) ===\n            carousel.scrollWidth - carousel.offsetWidth\n          ) {\n            carousel.classList.add("no-transition");\n            carousel.scrollLeft = carousel.offsetWidth;\n            carousel.classList.remove("no-transition");\n          }\n          clearTimeout(timeoutId);\n          if (!wrapper.matches(":hover")) autoPlay();\n        };\n    \n        carousel.addEventListener("mousedown", dragStart);\n        carousel.addEventListener("mousemove", dragging);\n        document.addEventListener("mouseup", dragStop);\n        carousel.addEventListener("scroll", infiniteScroll);\n        carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));\n        carousel.addEventListener("mouseleave", autoPlay);\n      } else {\n        return;\n      }\n    \n    });\n\n  })\n\n})();<\/script>'])), maybeRenderHead(), addAttribute(`w-full relative  h-[${height}vh] max-w-[${width}vw] flex justify-center items-center ${classSlide}`, "class"), addAttribute($$definedVars, "style"), addAttribute($$definedVars, "style"), addAttribute($$definedVars, "style"), addAttribute("carousel", "class"), addAttribute($$definedVars, "style"), renderSlot($$result, $$slots["default"]), addAttribute($$definedVars, "style"), defineScriptVars({ classSlide }));
}, "F:/Mis cosas/Programacion/msb-astro/src/components/SliderA.astro", void 0);

const $$Astro$1 = createAstro();
const $$TitleSections = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TitleSections;
  const { class: className } = Astro2.props;
  const styles = twMerge(clsx("text-white text-2xl md:text-4xl lg:text-5xl font-base font-semibold font-cormorant text-pretty text-center ", className));
  return renderTemplate`${maybeRenderHead()}<h1${addAttribute([styles], "class:list")}> ${renderSlot($$result, $$slots["default"])} </h1>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/TitleSections.astro", void 0);

const HomeLocation = ({
  addStyles,
  w = "16",
  h = "16"
}) => {
  const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return jsx(Fragment, {
    children: jsx("img", {
      id: "home-location",
      className: styles,
      alt: "home location icon",
      src: "/images/home-location.png",
      width: w,
      height: h
    })
  });
};

const HomeMortgageIcon = ({
  addStyles,
  w = "16",
  h = "16"
}) => {
  const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return jsx(Fragment, {
    children: jsx("img", {
      id: "home-mortgage",
      className: styles,
      alt: "home mortgage icon",
      src: "/images/home-mortgage.png",
      width: w,
      height: h
    })
  });
};

const UserIcon = ({
  addStyles,
  w = "16",
  h = "16"
}) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return jsx(Fragment, {
    children: jsx("img", {
      id: "user",
      className: styles,
      alt: "user icon",
      src: "/images/user.png",
      width: w,
      height: h
    })
  });
};

const filterItems = map();
const searchParamsStore = atom("");
const addFilterValue = (filter) => {
  filterItems.set({
    ...filterItems.get(),
    ...filter
  });
  const currentSearchParams = new URLSearchParams(searchParamsStore.get());
  Object.entries(filter).forEach(([key, value]) => {
    if (value && value.value !== null && value.value !== void 0 && value.value !== "") {
      currentSearchParams.set(key, value.value);
    } else {
      currentSearchParams.delete(key);
    }
  });
  searchParamsStore.set(currentSearchParams.toString().replace(/&?[^=&]+=All/g, ""));
};
const resetFilter = async (filter) => {
  filterItems.set(filter);
  const defaultSearchParams = new URLSearchParams();
  Object.keys(filter).forEach((key) => {
    const paramValue = filter[key];
    if (paramValue && paramValue.value !== null && paramValue.value !== void 0 && paramValue.value !== "") {
      defaultSearchParams.set(key, paramValue.value);
    }
  });
  await searchParamsStore.set(defaultSearchParams.toString().replace(/&?[^=&]+=All/g, ""));
};

const useSearch = (selects, defaultValues) => {
  const [filtersSelected, setFiltersSelected] = useState(defaultValues);
  const [filterParams, setFilterParams] = useState("");
  const fParams = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      const paramValue = filters[key];
      if (typeof paramValue === "object" && paramValue !== null) {
        params.set(key, paramValue.value);
      } else {
        params.delete(key);
      }
    });
    setFilterParams(params.toString().replace(/&?[^=&]+=All/g, ""));
  };
  useEffect(() => {
    fParams(filtersSelected);
  }, [filtersSelected]);
  useEffect(() => {
    addFilterValue(defaultValues);
  }, []);
  const handleSelect = (e) => {
    const {
      id,
      value
    } = e.target;
    if (id === "in_tpr") {
      const newFiltersSelected = {
        ...filtersSelected
      };
      if (filtersSelected["in_tpr"] && filtersSelected["in_tpr"].value === "COUNTRY") {
        delete newFiltersSelected["in_tpr"];
      } else {
        const newFilter = selects[id].find((item) => item.value === "COUNTRY");
        if (newFilter) {
          newFiltersSelected[id] = newFilter;
        }
      }
      setFiltersSelected(newFiltersSelected);
      addFilterValue({
        [id]: newFiltersSelected[id]
      });
    } else {
      const newFiltersSelected = {
        ...filtersSelected
      };
      const newFilter = selects[id].find((item) => item.value === value);
      if (newFilter) {
        newFiltersSelected[id] = newFilter;
      } else {
        delete newFiltersSelected[id];
      }
      setFiltersSelected(newFiltersSelected);
      addFilterValue({
        [id]: newFiltersSelected[id]
      });
    }
  };
  const handleCheckboxChange = (id, value) => {
    setFiltersSelected((prevFilters) => ({
      ...prevFilters,
      [id]: {
        value,
        label: id
      }
    }));
    addFilterValue({
      [id]: {
        value,
        label: id
      }
    });
  };
  const handleOnChange = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const {
        id,
        value
      } = e.target;
      setFiltersSelected((prevFilters) => ({
        ...prevFilters,
        [id]: {
          value,
          label: id
        }
      }));
      addFilterValue({
        [id]: {
          value,
          label: id
        }
      });
    }
  };
  const handleSubmit = (e) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const newParams = {
      ...filtersSelected
    };
    Object.keys(newParams).forEach((key) => {
      const paramValue = newParams[key];
      if (typeof paramValue === "string" && paramValue !== "") {
        params.set(key, paramValue);
      } else {
        params.delete(key);
      }
    });
  };
  const resetSelect = (defaultValues2) => {
    resetFilter(defaultValues2);
    setFiltersSelected(defaultValues2);
  };
  return {
    filtersSelected,
    searchParams: filterParams,
    handleSelect,
    handleSubmit,
    handleOnChange,
    fParams,
    resetSelect,
    handleCheckboxChange
  };
};

const defaultsFilters = {
  in_tpr: [{
    value: "COUNTRY",
    label: "Barrios Cerrados y Countries"
  }],
  ed_est: [{
    label: "En Construccion",
    value: "En Construccion"
  }, {
    label: "Terminado",
    value: "Terminado"
  }, {
    label: "En Pozo",
    value: "En Pozo"
  }, {
    label: "A Estrenar",
    value: "A Estrenar"
  }],
  moneda: [{
    value: "P",
    label: "Pesos"
  }, {
    value: "D",
    label: "U$D"
  }],
  ordenar: [{
    value: "preciomenor",
    label: "Menor precio"
  }, {
    value: "preciomayor",
    label: "Mayor precio"
  }],
  rppagina: [{
    value: "15",
    label: "15"
  }]
};
const filterResultToFill = [{
  label: "barrio",
  isLocation: false,
  isDefault: false
}, {
  label: "operacion",
  isLocation: false,
  isDefault: false
}, {
  label: "tipo",
  isLocation: false,
  isDefault: false
}, {
  label: "ambientes",
  isLocation: false,
  isDefault: false
}, {
  label: "calles",
  isLocation: false,
  isDefault: false
}, {
  label: "localidades",
  isLocation: false,
  isDefault: false
}, {
  label: "ubicaciones",
  isLocation: true,
  isDefault: false
}, {
  label: "in_iub",
  isLocation: true,
  isDefault: false
}, {
  label: "in_tpr",
  isLocation: false,
  isDefault: true
}, {
  label: "valor",
  isLocation: false,
  isDefault: false
}, {
  label: "moneda",
  isLocation: false,
  isDefault: true
}, {
  label: "rppagina",
  isLocation: false,
  isDefault: true
}, {
  label: "ordenar",
  isLocation: false,
  isDefault: true
}];
const labelMappingResultForQuerys = {
  "ambientes": "Ambientes",
  "localidades": "sellocalidades",
  "barrio": "barrios1",
  "operacion": "tipo_operacion",
  "tipo": "tipo_inmueble",
  "ubicaciones": "ubicaciones"
  // Este se actualizará más adelante
};
const filterEntrePreneurshipToFillDefault = [{
  label: "ed_est",
  isLocation: false,
  isDefault: true
}, {
  label: "tipo",
  isLocation: false,
  isDefault: false
}, {
  label: "localidad",
  isLocation: false,
  isDefault: false
}, {
  label: "barrio",
  isLocation: false,
  isDefault: false
}, {
  label: "calles",
  isLocation: false,
  isDefault: false
}, {
  label: "categoria",
  isLocation: false,
  isDefault: false
}, {
  label: "valor",
  isLocation: false,
  isDefault: false
}];
const labelMappingEntrePreneurshipForQuerys = {
  "tipo": "ed_tip",
  "localidad": "ed_loc",
  "barrio": "ed_bar",
  "calles": "ed_cal",
  "categoria": "ed_cat",
  "operacion": "tipo_operacion",
  "valor_maximo": "valor_hasta",
  "valor_minimo": "valor_desde"
};

const formatAndUseSearch = (filters, filterToFill, labelMapping) => {
  let filterValues = {};
  filterToFill?.map((filter) => {
    let label = labelMapping[filter?.label] || filter.label;
    if (filter.isLocation) {
      filterValues[label] = formatOptions(filters.locations.ubicaciones);
    } else if (filter.isDefault) {
      filterValues[filter.label] = filters.default[filter.label];
    } else {
      if (filter.label === "valor") {
        if (labelMapping["valor_minimo"] && labelMapping["valor_maximo"]) {
          filterValues[labelMapping["valor_minimo"]] = formatOptions(filters.selects[filter.label]?.desde);
          filterValues[labelMapping["valor_maximo"]] = formatOptions(filters.selects[filter.label]?.hasta);
        } else {
          filterValues["valor_minimo"] = formatOptions(filters.selects[filter.label]?.desde);
          filterValues["valor_maximo"] = formatOptions(filters.selects[filter.label]?.hasta);
        }
      } else {
        filterValues[label] = formatOptions(filters.selects[filter.label]);
      }
    }
  });
  if (filterToFill.some((f) => f.label === "in_iub") && filterValues.hasOwnProperty("ubicaciones")) {
    filterValues["in_iub"] = filterValues["ubicaciones"];
    delete filterValues["ubicaciones"];
  } else if (filterToFill.some((f) => f.label === "ed_iub") && filterValues.hasOwnProperty("ubicaciones")) {
    filterValues["ed_iub"] = filterValues["ubicaciones"];
    delete filterValues["ubicaciones"];
  }
  return filterValues;
};

const Button = ({
  variant = "primary",
  isFavorite,
  children,
  addStyles,
  icon,
  onClick,
  ...buttonProps
}) => {
  const baseStyles = "px-4 py-2 rounded font-semibold text-sm transition-all";
  const [favorited, setFavorited] = useState(isFavorite || false);
  const variantStyles = clsx({
    "bg-primary-msb text-white border-primary-msb hover:bg-primary-hover-msb": variant === "primary",
    "bg-secondary-msb text-primary-text-msb border-secondary-msb hover:bg-secondary-hover-msb": variant === "secondary",
    "bg-tertiary-msb text-white border-tertiary-msb hover:bg-tertiary-hover-msb": variant === "tertiary",
    "bg-secondary-msb border-2 border-primary-msb text-primary-msb hover:border-primary-hover-msb": variant === "outline",
    "bg-gray-400 text-gray-800 cursor-not-allowed": variant === "disabled"
    // Agrega más clases condicionales según necesites.
  });
  const styles = twMerge(clsx(baseStyles, variantStyles, addStyles));
  const handleButtonClick = (e) => {
    isFavorite && setFavorited(!favorited);
    if (onClick)
      onClick(e);
  };
  return jsxs("button", {
    ...buttonProps,
    className: styles,
    id: buttonProps.id,
    disabled: variant === "disabled",
    onClick,
    value: buttonProps.value,
    children: [icon && icon, children, isFavorite && jsx("span", {
      onClick: handleButtonClick,
      className: isFavorite && favorited ? " fill-black-400" : "fill-black-400",
      children: jsx(HeartIcon, {
        addStyles: isFavorite && favorited ? "fill-primary-white stroke-primary-text-msb  hover:fill-primary-text-msb " : "stroke-primary-text-msb transition-all hover:fill-primary-text-msb fill-primary-text-msb"
      })
    })]
  });
};

const SearchEntrepreneurship = ({
  selects,
  locations
}) => {
  searchParamsStore.get();
  const defaultOptions = {
    ed_est: {
      value: "",
      label: "Estado"
    }
    /*   ed_iub: { value: '', label: '' }, */
  };
  const filters = {
    selects,
    locations,
    default: defaultsFilters
  };
  const filterToFill = filterEntrePreneurshipToFillDefault;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingEntrePreneurshipForQuerys);
  const {
    handleSelect,
    resetSelect,
    handleOnChange,
    filtersSelected,
    searchParams
  } = useSearch(filtersformatted, defaultOptions);
  useEffect(() => {
    searchParamsStore.set("");
    resetFilter({});
    resetSelect(defaultOptions);
  }, []);
  const toPozo = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate();
  };
  const toConstruccion = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate();
  };
  const toTerminado = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate();
  };
  return jsx(Fragment, {
    children: jsxs("div", {
      class: "flex md:flex-row lg:flex-row flex-col justify-center w-100 gap-4 p-6 lg:px-2 md:px-6",
      children: [jsx(Button, {
        variant: "primary",
        onClick: toPozo,
        id: "ed_est",
        value: "En Pozo",
        addStyles: "rounded-md  shadow-lg w-full md:w-[192px] lg:w-[192px] h-full py-3 active:bg-primary-bg-msb text-pretty",
        children: "En Pozo"
      }), jsx(Button, {
        variant: "primary",
        id: "ed_est",
        onClick: toConstruccion,
        value: "En Construccion",
        addStyles: "rounded-md  shadow-lg w-full md:w-[192px] lg:w-[192px] h-full py-3 active:bg-primary-bg-msb text-pretty",
        children: "En Construcción"
      }), jsx(Button, {
        variant: "primary",
        id: "ed_est",
        onClick: toTerminado,
        value: "Terminado",
        addStyles: "rounded-md  shadow-lg w-full md:w-[192px] lg:w-[192px] h-full py-3 active:bg-primary-bg-msb text-pretty",
        children: "Terminado"
      })]
    })
  });
};

const SearchIcon = () => {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon icon-tabler icon-tabler-search",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    children: [jsx("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), jsx("path", {
      d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
    }), jsx("path", {
      d: "M21 21l-6 -6"
    })]
  });
};

const SelectField = ({
  opts,
  id,
  onChange,
  defaultOption,
  addStyles,
  variant = "primary",
  children
}) => {
  const variantStyles = clsx$1({
    "w-full px-4 py-2 border h-full bg-white text-gray-700 rounded-md border-primary-text-msb flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-primary-text-msb focus:border-primary-text-msb font-semibold truncate": variant === "primary",
    "flex gap-5 px-0 items-center  h-0 justify-between relative font-bold text-primary-text-msb text-sm md:text-md lg:text-lg w-100": variant === "secondary"
    /* 'bg-tertiary-msb text-white border-tertiary-msb hover:bg-tertiary-hover-msb': variant === 'tertiary',
    'bg-secondary-msb border-2 border-primary-msb text-primary-msb hover:border-primary-hover-msb': variant === 'outline',
    'bg-gray-400 text-gray-800 cursor-not-allowed': variant === 'disabled', */
    // Agrega más clases condicionales según necesites.
  });
  const baseStyles = twMerge(clsx$1("relative w-full h-[56px] transition-all", addStyles));
  const styles = twMerge(clsx$1(baseStyles, variantStyles, addStyles));
  const [selectedOption, setSelectedOption] = useState(defaultOption ? defaultOption.label : "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    toggleDropdown();
    onChange({
      target: {
        id,
        value: option.value
      }
    });
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (defaultOption && defaultOption.label !== selectedOption) {
      setSelectedOption(defaultOption.label);
    }
  }, [defaultOption, selectedOption]);
  return jsxs("div", {
    ref: dropdownRef,
    className: baseStyles,
    children: [jsxs("button", {
      id: String(id),
      onClick: toggleDropdown,
      className: styles,
      type: "button",
      children: [selectedOption, children ? children : jsx("svg", {
        className: `w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`,
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 20 20",
        children: jsx("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
          fill: "currentColor"
        })
      })]
    }), isOpen && jsx("div", {
      className: "absolute w-full z-10 mt-1 bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-2 overflow-auto font-semibold animate-fade-down animate-duration-300 scrollbar scrollbar-thumb-color scrollbar-track-color",
      children: opts?.map((option, index) => jsx("div", {
        className: "bg-fixed ",
        children: jsx("button", {
          onClick: () => handleOptionClick(option),
          className: "text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ",
          children: option.label
        }, index)
      }))
    })]
  });
};

const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  error = false,
  success = false,
  value = "",
  addStyles,
  icon,
  onChange,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const labelPositionY = isFocused || hasValue ? "-2" : "top-1";
  const labelClasses = clsx("absolute left-3 transition-all duration-200 pointer-events-none h-full transform origin-top", {
    "text-primary-text-msb text-xs": !isFocused && !hasValue,
    "text-primary-msb text-xs scale-75 -translate-y-2": isFocused || hasValue
  }, labelPositionY);
  const inputContainerClasses = twMerge("relative w-full h-full rounded-md transition-all duration-200", error ? "border-red-500" : "border-gray-300", isFocused && success ? "ring-2 ring-primary-msb" : "ring-0", isFocused && error ? "border-red-500" : "border-gray-300", isFocused ? "ring-2 ring-primary-msb" : "ring-0", addStyles);
  const inputClasses = clsx("w-full h-full rounded-md transition-all duration-200 focus:outline-none focus:ring-0", {
    "border-2 ": isFocused || hasValue,
    "border-gray-300": !error && !success && !isFocused,
    "border-red-500": error && !success,
    // Solo aplica el borde rojo cuando hay un error y no hay éxito
    "border-primary-border-msb": success && !error,
    // Solo aplica el borde verde cuando hay éxito y no hay error
    "ring-0": true,
    "px-3 py-2": type !== "textarea",
    // Adjust padding for non-textarea inputs
    "pt-2 pb-1 px-2": type === "textarea"
    // Adjust padding for textarea inputs
  });
  return jsxs("div", {
    className: inputContainerClasses,
    children: [label && jsx("label", {
      htmlFor: id,
      className: labelClasses,
      children: label
    }), type === "textarea" ? jsx("textarea", {
      id,
      placeholder,
      className: inputClasses,
      value,
      onInput: onChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      ...inputProps
    }) : jsx("input", {
      id,
      type,
      placeholder,
      className: inputClasses,
      value,
      onInput: onChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      ...inputProps
    }), jsx("div", {
      className: "absolute right-3 bottom-3 flex items-center  text-sm",
      children: icon && jsx("span", {
        className: "text-primary-border-msb flex justify-center transition-all  ease-in-out animate-duration-200",
        children: icon
      })
    })]
  });
};

const SearchDebounce = ({
  filterOptsLocations,
  propIdRef
}) => {
  const filters = filterItems.get();
  const params = searchParamsStore.get();
  const [searchTerm, setSearchTerm] = useState(filters[propIdRef]);
  const [listOpts, setOpts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const listContainerRef = useRef(null);
  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = window.setTimeout(() => func.apply(this, args), delay);
    };
  };
  const handleSearchWithDebounce = debounce((value) => {
    const filteredOpts = filterOptsLocations.filter((location) => location.label.toLowerCase().includes(value.toLowerCase()));
    setOpts(filteredOpts);
    setShowResults(true);
  }, 300);
  useEffect(() => {
    return () => setOpts([]);
  }, []);
  const handleInputChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setSearchTerm({
      label: value,
      value: id
    });
    handleSearchWithDebounce(value);
  };
  useEffect(() => {
    if (listContainerRef.current) {
      const maxHeight = window.innerHeight - listContainerRef.current.getBoundingClientRect().top - 160;
      listContainerRef.current.style.maxHeight = `${maxHeight}px`;
    }
  }, [listOpts]);
  useEffect(() => {
    if (filters[propIdRef]?.value === "" && filters[propIdRef]?.label === "") {
      setSearchTerm({
        label: filters[propIdRef]?.label,
        value: filters[propIdRef]?.value
      });
    }
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}${params.length > 0 ? `?${params}` : ""}`;
    window.history.pushState({}, "", newUrl);
  }, [params]);
  const handleOptionSelect = (option) => {
    addFilterValue({
      [propIdRef]: {
        value: option.value,
        label: option.label
      }
    });
    setSearchTerm(option);
    setShowResults(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listContainerRef.current && !listContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showResults && listOpts.length > 0) {
        const currentOptionIndex = listOpts.findIndex((option) => option.label === searchTerm.label);
        switch (event.key) {
          case "ArrowUp":
            if (currentOptionIndex > 0) {
              setSearchTerm(listOpts[currentOptionIndex - 1]);
            }
            break;
          case "ArrowDown":
            if (currentOptionIndex < listOpts.length - 1) {
              setSearchTerm(listOpts[currentOptionIndex + 1]);
            }
            break;
          case "Enter":
            addFilterValue({
              [propIdRef]: {
                value: searchTerm.value,
                label: searchTerm.label
              }
            });
            setShowResults(false);
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [showResults, listOpts, searchTerm]);
  return jsxs("div", {
    className: `relative top-0  w-full`,
    children: [jsx(InputField, {
      id: propIdRef,
      type: "search",
      value: searchTerm?.label,
      className: "border-2 border-primary-msb focus:border-b-1 rounded-md px-4 flex w-full h-full py-2 focus:outline-none focus:ring-0 sticky z-0",
      onChange: handleInputChange,
      autoComplete: "off",
      placeholder: "Buscar por barrio o localidad"
    }), showResults && jsx("ul", {
      ref: listContainerRef,
      className: `absolute z-20 inset-50 bg-white w-full border border-gray-300 rounded-md shadow-md overflow-auto scrollbar scrollbar-thumb-color scrollbar-track-color`,
      children: listOpts.length > 0 ? listOpts.map((location) => jsx("li", {
        className: `py-2 px-4 relative z-10 hover:bg-gray-200 cursor-pointer`,
        onClick: (e) => handleOptionSelect(location),
        children: location.label
      }, `${location.label}-${location.value}`)) : jsx("li", {
        className: "py-2 px-4 text-gray-500",
        children: "No hay resultados"
      })
    })]
  });
};

const SearchHome = ({
  selects,
  locations
}) => {
  const searchPStore = searchParamsStore.get();
  const filters = {
    selects,
    locations,
    default: defaultsFilters
  };
  const filterToFill = filterResultToFill;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingResultForQuerys);
  const {
    handleSelect,
    resetSelect,
    handleOnChange,
    filtersSelected,
    searchParams
  } = useSearch(filtersformatted, {
    tipo_inmueble: {
      value: "All",
      label: "Tipo de propiedad"
    },
    tipo_operacion: {
      value: "",
      label: ""
    },
    in_iub: {
      value: "",
      label: ""
    },
    in_tpr: {
      value: "",
      label: "Barrios Cerrados y Countries"
    }
  });
  useEffect(() => {
    searchParamsStore.set("");
    resetFilter({});
    resetSelect({
      tipo_inmueble: {
        value: "All",
        label: "Tipo de propiedad"
      },
      tipo_operacion: {
        value: "",
        label: ""
      },
      in_iub: {
        value: "",
        label: ""
      },
      in_tpr: {
        value: "",
        label: "Barrios Cerrados y Countries"
      }
    });
  }, []);
  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/resultados-de-busqueda${searchPStore.length > 0 ? `?${searchPStore}` : ""}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      send(e);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [searchParams]);
  return jsx(Fragment, {
    children: jsx("div", {
      className: "container z-1 ",
      children: jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-0 px-3 ",
        children: [jsx("div", {
          className: "lg:col-start-1 lg:col-end-3 md:grid-col-start-1 md:grid-col-end-2 flex gap-4",
          children: jsx(Button, {
            variant: "outline",
            onClick: handleSelect,
            value: "V",
            addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "V" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
            id: "tipo_operacion",
            children: "Venta"
          })
        }), jsx("div", {
          className: "lg:col-start-3 lg:col-end-5  md:grid-col-start-2 md:grid-col-end-4 flex gap-4",
          children: jsx(Button, {
            variant: "outline",
            onClick: handleSelect,
            value: "A",
            addStyles: ` sm:text-sm md:text-md lg:text-lg w-full ${filtersSelected?.tipo_operacion?.value === "A" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
            id: "tipo_operacion",
            children: "Alquiler"
          })
        }), jsx("div", {
          className: "lg:col-start-5 lg:col-end-9  md:grid-col-start-1 md:grid-col-end-2 flex gap-4",
          children: jsx(Button, {
            variant: "outline",
            onClick: handleSelect,
            value: "T",
            addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "T" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
            id: "tipo_operacion",
            children: "Alquiler Temporiario"
          })
        }), jsx("div", {
          className: "lg:col-start-9 lg:col-end-13 flex   md:grid-col-start-2 md:grid-col-end-4 gap-4",
          children: jsx(Button, {
            variant: "outline",
            onClick: handleSelect,
            value: filtersSelected?.in_tpr?.value,
            addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.in_tpr?.value === "COUNTRY" ? "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out" : ""}`,
            id: "in_tpr",
            children: "Barrios Cerrados y Countries"
          })
        }), jsx("div", {
          className: "lg:col-start-1  lg:col-end-3 flex  h-full  ",
          children: jsx(SelectField, {
            id: "tipo_inmueble",
            onChange: handleSelect,
            defaultOption: filtersSelected?.tipo_inmueble,
            opts: filtersformatted.tipo_inmueble
          })
        }), jsxs("div", {
          className: "md:col-1 lg:col-start-3  lg:col-end-11 md:col-start-2 md:col-end-5 flex gap-4  w-full flex-grow ",
          children: [jsx(SearchDebounce, {
            filterOptsLocations: filtersformatted.in_iub,
            propIdRef: "in_iub"
          }), jsx("div", {
            className: "hidden md:flex lg:hidden gap-4",
            children: jsx(Button, {
              variant: "primary",
              onClick: send,
              className: "lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white",
              addStyles: "sm:text-sm md:text-md lg:text-lg border-2 border-gray-300 rounded-md  flex w-full justify-center items-center",
              children: "BUSCAR"
            })
          })]
        }), jsx("div", {
          className: " md:hidden lg:flex lg:col-start-11  lg:col-end-13 flex  gap-4",
          children: jsxs(Button, {
            variant: "primary",
            onClick: send,
            className: "lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white",
            addStyles: "w-full sm:text-sm md:text-md lg:text-lg flex lg:flex-grow justify-center items-center gap-2",
            children: [jsx("div", {
              children: jsx(SearchIcon, {})
            }), "BUSCAR"]
          })
        })]
      })
    })
  });
};

const PaperLocationIcon = () => {
  return jsx(Fragment, {
    children: jsx("img", {
      id: "location",
      alt: "location icon",
      src: "/images/paper-location.png",
      width: "24",
      height: "24"
    })
  });
};

const WhatsAppIcon = ({
  addStyles,
  h = "24",
  w = "24"
}) => {
  const styles = twMerge(clsx$1("icon icon-tabler icon-tabler-brand-whatsapp flex justify-center items-center", addStyles));
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: styles,
    width: w,
    height: h,
    viewBox: "0 0 24 24",
    "stroke-width": "1.8",
    stroke: "#494949",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    children: [jsx("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), jsx("path", {
      d: "M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"
    }), jsx("path", {
      d: "M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"
    })]
  });
};

const CardBranch = ({
  href,
  suc_name,
  suc_loc,
  suc_img,
  suc_dir,
  suc_phone,
  whatsAppPhone,
  addStyles
}) => {
  const styles = twMerge(clsx(" rounded-lg  mx-auto w-full overflow-hidden shadow-lg", addStyles));
  return jsx("div", {
    className: styles,
    children: jsxs("div", {
      class: "bg-secondary-msb",
      children: [jsx("img", {
        className: "w-full object-cover",
        src: suc_img,
        alt: suc_name
      }), jsxs("div", {
        className: "p-5 ",
        children: [jsx("div", {
          className: "text-xl font-medium text-nowrap capitalize",
          children: jsx("span", {
            className: "font-extrabold capitalize",
            children: suc_name
          })
        }), jsx("p", {
          className: "text-bg-2-msb  text-md font-bold",
          children: suc_loc
        }), jsxs("div", {
          class: "flex justify-between",
          children: [jsxs("div", {
            children: [jsx("span", {
              className: "flex items-center text-sm font-semibold text-gray-700 mr-2 mb-1 ",
              children: suc_dir
            }), jsx("span", {
              className: "flex items-center text-xs font-semibold text-gray-700 mr-2 mb-2 gap-1",
              children: suc_phone
            })]
          }), jsxs("div", {
            class: "flex items-center justify-center gap-1 ",
            children: [jsx("a", {
              href,
              target: "_blank",
              children: jsx(PaperLocationIcon, {})
            }), jsx("a", {
              href: `https://api.whatsapp.com/send?phone=${whatsAppPhone}`,
              className: " ",
              target: "_blank",
              children: jsx("div", {
                style: {
                  minWidth: "24px",
                  minHeight: "24px",
                  overflow: "visible"
                },
                children: jsx(WhatsAppIcon, {})
              })
            })]
          })]
        })]
      })]
    })
  });
};

const colorEstLabel = (est) => {
  const estLabel = est.replace("&oacute;", "ó").toUpperCase();
  switch (estLabel) {
    case "EN CONSTRUCCIÓN":
      return "bg-tertiary-bg-hover-msb hover:bg-bg-3-hover-msb";
    case "EN POZO":
      return "bg-secondary-bg-hover-msb hover:bg-bg-1-hover-msb";
    case "TERMINADO":
      return "bg-tertiary-bg-msb  hover:bg-tertiary-hover-msb ";
    default:
      return "bg-secondary-bg-hover-msb";
  }
};
const CardEntrepreneurship = ({
  cardData,
  addStyles,
  href
}) => {
  const [colorEst, setColorEst] = useState$1(colorEstLabel(cardData.ed_est));
  const styles = twMerge(clsx("rounded relative overflow-hidden shadow-lg h-100", addStyles));
  colorEstLabel(cardData.ed_est);
  return jsxs("div", {
    className: "shadow-lg",
    children: [jsx("a", {
      href,
      className: styles,
      children: jsx("img", {
        className: "w-full h-[248px]  text-balance object-cover",
        width: 380,
        height: 248,
        src: cardData.img_princ,
        style: {
          aspectRatio: "380/192",
          objectFit: "cover"
        },
        alt: "Imagen del interior de la vivienda"
      })
    }), jsxs("div", {
      class: "bg-secondary-msb relative h-[150px] md:px-3 p-3 md:py-3 lg:px-3 lg:py-3",
      children: [jsxs("div", {
        className: "",
        children: [jsx("div", {
          className: "lg:text-xl md:text-lg text-lg font-medium",
          children: jsx("span", {
            className: "font-extrabold capitalize",
            children: cardData.ed_nom
          })
        }), jsxs("p", {
          className: "text-primary-text-msb font-thin flex gap-1",
          children: [jsx("span", {
            className: "text-primary-text-msb font-bold",
            children: "Posesión:"
          }), cardData.ed_pos || "No disponible"]
        })]
      }), jsxs("div", {
        className: "flex justify-between items-end absolute p-3 bottom-0 right-0 left-0 h-100 place-content-end self",
        children: [jsx("button", {
          className: `${colorEst} rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold  text-sm uppercase`,
          children: cardData?.ed_est.replace("&oacute;", "ó")
        }), jsx("div", {
          class: "flex items-center justify-center gap-1 ",
          children: jsx("a", {
            href: `https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+http%3A%2F%2Fmatiasszpira.com.ar%2F+para+consultarles&type=phone_number&app_absent=0`,
            target: "_blank",
            children: jsx(WhatsAppIcon, {})
          })
        })]
      })]
    })]
  });
};

const BathIcon = ({
  addStyles,
  w = "16",
  h = "16"
}) => {
  const styles = twMerge(clsx$1("h-100 w-100 icon icon-tabler icon-tabler-bath", addStyles));
  return jsx(Fragment, {
    children: jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: styles,
      width: w,
      height: h,
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      children: [jsx("path", {
        stroke: "none",
        d: "M0 0h24v24H0z",
        fill: "none"
      }), jsx("path", {
        d: "M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z"
      }), jsx("path", {
        d: "M6 12v-7a2 2 0 0 1 2 -2h3v2.25"
      }), jsx("path", {
        d: "M4 21l1 -1.5"
      }), jsx("path", {
        d: "M20 21l-1 -1.5"
      })]
    })
  });
};

const DoorOpen = ({
  addStyles,
  w = "16",
  h = "16",
  path = "/images/door-open.png"
}) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return jsx(Fragment, {
    children: jsx("img", {
      id: "door-open",
      className: styles,
      alt: "door open icon",
      src: path,
      width: w,
      height: h
    })
  });
};

const RuleIcon = ({
  addStyles,
  w = "16",
  h = "16"
}) => {
  const styles = twMerge(clsx$1("h-100 w-100 icon icon-tabler icon-tabler-ruler-2", addStyles));
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: styles,
    width: w,
    height: h,
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    children: [jsx("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), jsx("path", {
      d: "M17 3l4 4l-14 14l-4 -4z"
    }), jsx("path", {
      d: "M16 7l-1.5 -1.5"
    }), jsx("path", {
      d: "M13 10l-1.5 -1.5"
    }), jsx("path", {
      d: "M10 13l-1.5 -1.5"
    }), jsx("path", {
      d: "M7 16l-1.5 -1.5"
    })]
  });
};

const SquareMeterIcon = ({
  addStyles,
  w = "16",
  h = "16"
}) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return jsx(Fragment, {
    children: jsx("img", {
      id: "square-meter",
      className: styles,
      alt: "square meter icon",
      src: "/images/square-meter.png",
      width: w,
      height: h
    })
  });
};

const CardProperty = ({
  cardData,
  addStyles,
  href,
  key
}) => {
  const styles = twMerge(clsx("rounded relative overflow-hidden shadow-lg h-100 animate-fade", addStyles));
  return jsxs("div", {
    className: "shadow-lg",
    children: [jsx("a", {
      href,
      className: styles,
      children: jsx("img", {
        className: "w-full h-[248px]  text-balance object-cover",
        loading: "eager",
        width: 408,
        height: 248,
        src: cardData.img_princ,
        alt: "Imagen del interior de la vivienda"
      })
    }, key), jsxs("div", {
      class: "bg-secondary-msb relative h-[210px] md:px-3 p-3 md:py-3 lg:px-3 lg:py-3",
      children: [jsxs("div", {
        className: "",
        children: [jsxs("div", {
          className: "lg:text-xl md:text-lg text-lg font-medium",
          children: [jsx("span", {
            className: "font-extrabold ",
            children: cardData.precio
          }), " | ", he.decode(cardData.in_cal), " ", cardData.in_nro]
        }), jsxs("p", {
          className: "text-bg-2-msb font-bold",
          children: [he.decode(cardData.in_loc), " ", he.decode(cardData.in_bar) ? `- ${he.decode(cardData.in_bar)}` : ""]
        })]
      }), jsxs("div", {
        className: "flex justify-start  flex-wrap items-center mt-1 lg:gap-x-10 gap-x-5",
        children: [he.decode(cardData.in_cub) !== "0.00" && he.decode(cardData.in_cub) !== "" && jsxs("span", {
          className: "flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1",
          children: [jsx(RuleIcon, {}), " ", he.decode(cardData?.in_cub), "mt2"]
        }), he.decode(cardData.in_sto) !== "0.00" && he.decode(cardData.in_sto) !== "" && jsxs("span", {
          className: "flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1",
          children: [jsx(SquareMeterIcon, {}), " ", he.decode(cardData?.in_sto), "mt2"]
        }), he.decode(cardData.ti_dor) !== "" && he.decode(cardData.ti_dor) !== "0" && jsxs("span", {
          className: "flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1",
          children: [jsx(DoorOpen, {}), " ", he.decode(cardData.ti_dor), " dorm."]
        }), he.decode(cardData?.in_bao) !== "" && he.decode(cardData?.in_bao) !== "0" && jsxs("span", {
          className: "flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1",
          children: [jsx(BathIcon, {}), `${he.decode(cardData?.in_bao) === "1" ? `${he.decode(cardData?.in_bao)} baño` : `${he.decode(cardData?.in_bao)} baños`}`, " "]
        })]
      }), jsxs("div", {
        className: "flex justify-between items-end absolute p-3 bottom-0 right-0 left-0 h-100 place-content-end self",
        children: [jsx("button", {
          className: "text-base bg-bg-2-msb rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-medium   uppercase",
          children: he.decode(cardData.operacion)
        }), jsx("div", {
          class: "flex items-center justify-center gap-1 ",
          children: jsx("a", {
            href: `https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+http%3A%2F%2Fmatiasszpira.com.ar%2F+para+consultarles&type=phone_number&app_absent=0`,
            target: "_blank",
            children: jsx(WhatsAppIcon, {})
          })
        })]
      })]
    })]
  });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.locals.user;
  const { resultado } = await fetchData(
    "fichas.destacadas"
  );
  const { resultado: resEmprendimientos } = await fetchData(
    "resultados.emprendimientos"
  );
  const { emprendimiento: entrepreneurship, img } = resEmprendimientos;
  const { fichas } = resultado;
  const cardData = fichas;
  const titlePage = "Inicio - Mat\xEDas Szpira Bienes Ra\xEDces";
  const description = "Propiedades en alquiler y venta - Mat\xEDas Szpira Bienes Ra\xEDces";
  const bgUsaImage = "/images/panorama-noche-chicago.webp";
  const selects = await getAllSelects();
  let selectEntrepreneurship = await getAllSelectsEntrepreneurship();
  const locations = await getLocations();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": titlePage, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroContainer", $$HeroContainer, { "img": "/images/background-hero-2.webp" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 flex flex-col pb-20 justify-end items-center w-100  mx-auto container"> <div class="bg-[#D9D9D9] bg-opacity-40 p-6 min-w-full  "> ${renderComponent($$result3, "SearchHome", SearchHome, { "client:load": true, "selects": selects, "locations": locations, "client:component-hydration": "load", "client:component-path": "@/components/preact/Search/SearchHome", "client:component-export": "default" })} </div> </div> ` })}  ${renderComponent($$result2, "Chat", $$Chat, {})}  <section class="bg-secondary-bg-msb py-10"> <div class="container mx-auto px-3 md:px-0 lg:px-0"> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-primary-text-msb  font-medium font-cormorant  text-center" }, { "default": ($$result3) => renderTemplate`
Buena Gente. Buenas Raíces. Buenos Negocios
` })} <div class="grid md:grid-cols-2 lg:grid-cols-2 ms:px-3 gap-10 py-20 md:px-5"> ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/sumate", "class": "flex justify-center lg:justify-end w-100" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg shadow-lg  w-[300px] md:w-[450px] lg:w-[450px]" }, { "default": ($$result4) => renderTemplate` <div class="flex items-center gap-5 py-5"> <div class="rounded-full p-3 bg-[#D9D9D9]"> ${renderComponent($$result4, "HomeMortgageIcon", HomeMortgageIcon, { "addStyles": "object-contain bg-gradient-primary-msb ", "w": "43", "h": "43" })} </div> <div class="flex flex-col gap-2 w-100"> <h1 class="text-base md:text-md lg:text-xl font-semibold text-primary-text-msb text-left text-balance">
¿Qué necesito para vender?
</h1> <p class="lg:text-lg text-primary-text-msb text-left font-normal">
Conocé los requisitos para vender una propiedad
</p> </div> </div> ` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/sumate", "class": "flex justify-center lg:justify-start w-100" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg w-[300px] md:w-[450px] lg:w-[450px] shadow-lg " }, { "default": ($$result4) => renderTemplate` <div class="flex items-center gap-5 py-5"> <div class="rounded-full p-3 bg-[#D9D9D9]"> ${renderComponent($$result4, "HomeLocation", HomeLocation, { "addStyles": "object-contain bg-gradient-primary-msb ", "w": "43", "h": "43" })} </div> <div class="flex flex-col gap-0 w-100"> <h1 class="text-base md:text-md lg:text-xl font-semibold text-primary-text-msb text-left text-balance">
Guía de Barrios
</h1> <p class="lg:text-lg text-primary-text-msb text-left font-normal">
Conocé los barrios y elegí tu zona ideal
</p> </div> </div> ` })} ` })} </div> </div> </section> <section class="bg-primary-msb"> <div class="container mx-auto px-3 md:px-0 lg:px-0 py-20"> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "drop-shadow-2xl text-white font-base font-medium font-cormorant text-pretty text-center" }, { "default": ($$result3) => renderTemplate`
Propiedades Destacadas
` })} <p class="text-white text-center text-md md:text-lg lg:text-2xl font-extralight p-10 pt-4 pb-16">
La mejor selección de inmuebles en las zonas que estás buscando.
</p> ${renderComponent($$result2, "SliderA", $$SliderA, { "colsNr": 3, "height": 10, "width": 10, "classSlide": "slider1" }, { "default": ($$result3) => renderTemplate`${cardData.map((card) => renderTemplate`${renderComponent($$result3, "CardProperty", CardProperty, { "client:load": true, "key": "unique-key", "href": `/resultados-de-busqueda/${card.operacion}/${card.in_loc}/${card.direccion_completa}/${card.in_suc}-${card.in_num}`, "addStyles": "card my-3", "cardData": card, "client:component-hydration": "load", "client:component-path": "@/components/preact/ui/Cards/CardProperty", "client:component-export": "default" })}`)}` })} </div> </section> <section class="bg-secondary-bg-msb px-3 md:px-0 lg:px-0 py-20"> <div class="container mx-auto"> <div class="flex justify-end gap-10 gap-y-4 flex-col self-center lg:px-20 p-6"> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-secondary-text-msb drop-shadow-sm font-base font-medium font-cormorant text-pretty text-center" }, { "default": ($$result3) => renderTemplate`
Nuestros Emprendimientos
` })} <p class="font-extralight text-secondary-text-msb text-center text-md md:text-lg lg:text-2xl">
Invertí en bienes raíces, nosotros te asesoramos
</p> </div> <div class=""> ${renderComponent($$result2, "SearchEntrepreneurship", SearchEntrepreneurship, { "client:load": true, "selects": selectEntrepreneurship, "locations": locations, "client:component-hydration": "load", "client:component-path": "@/components/preact/Search/SearchEntrepreneurship", "client:component-export": "default" })} <!-- Slider de emprendimientos --> ${renderComponent($$result2, "SliderA", $$SliderA, { "colsNr": 3, "height": 10, "width": 0, "classSlide": "slider2" }, { "default": ($$result3) => renderTemplate`${entrepreneurship.map(
    ({
      ed_nom,
      ed_pos,
      ed_loc,
      img_princ,
      ed_est,
      ed_idl,
      codsuc,
      ed_dir
    }) => renderTemplate`${renderComponent($$result3, "CardEntrepreneurship", CardEntrepreneurship, { "client:load": true, "href": `emprendimientos/${ed_est}/${he.decode(ed_loc)}/${he.decode(ed_nom)}/${codsuc}-${ed_idl}`, "addStyles": "card my-20", "cardData": {
      ed_nom,
      ed_pos,
      img_princ,
      ed_est
    }, "client:component-hydration": "load", "client:component-path": "@/components/preact/ui/Cards/CardEntrepreneurship", "client:component-export": "default" })}`
  )}` })} </div> </div> </section> <section class=""${addAttribute(renderTransition($$result2, "5kuaja6r", "fade", ""), "data-astro-transition-scope")}> ${renderComponent($$result2, "BannerSlider", BannerSlider, { "slides": img[3], "sliderTime": 8e3, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/preact/BannerSlider", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="grid h-full items-center justify-center lg:justify-center self-end place-content-center text-center lg:text-center container mx-auto relative"> ${renderComponent($$result3, "TitleSections", $$TitleSections, { "class": "text-white font-base font-medium font-cormorant text-pretty md:text-center lg:text-center" }, { "default": ($$result4) => renderTemplate`
Tasaciones
` })} <p class="text-white text-lg md:text-xl lg:text-2xl font-normal font-gotham self-center">
Tasá con nosotros, no dudes en consultarnos.
</p> ${renderComponent($$result3, "ButtonLink", $$ButtonLink, { "href": "/tasaciones", "class": "mx-auto flex justify-center px-3 my-10 w-max" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", Button, { "variant": "outline", "addStyles": "bg-secondary-bg-msb px-20 py-4 text-base  md:text-xl w-max  rounded-lg shadow-lg text-nowrap  w-full h-full text-bold-green-text-msb hover:text-primary-msb border-bg-2-msb border-2 animate-fadeIn animate-duration-400 transition ease-in-out" }, { "default": ($$result5) => renderTemplate`
Tasar
` })} ` })} </div> ` })} </section> <section class=""${addAttribute(renderTransition($$result2, "5uagdiyi", "fade", ""), "data-astro-transition-scope")}> ${renderComponent($$result2, "BannerSlider", BannerSlider, { "slides": [bgUsaImage], "sliderTime": 8e3, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/preact/BannerSlider", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="grid h-full items-center justify-center lg:justify-center self-end place-content-center text-center lg:text-center container mx-auto relative"> ${renderComponent($$result3, "TitleSections", $$TitleSections, { "class": "text-white font-medium font-cormorant text-balance md:text-center lg:text-center " }, { "default": ($$result4) => renderTemplate`
Invierta en USA
` })} <p class="text-white text-lg md:text-xl lg:text-2xl font-normal font-gotham self-center">
Amplia gama de oportunidades de inversión del mercado inmobiliario en Estados Unidos
</p> ${renderComponent($$result3, "ButtonLink", $$ButtonLink, { "href": "/invierta-en-usa", "class": "mx-auto flex justify-center px-3 my-10 w-max" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", Button, { "variant": "outline", "addStyles": "bg-secondary-bg-msb px-10 py-4 text-base  md:text-xl w-max  rounded-lg shadow-lg text-nowrap  w-full h-full text-bold-green-text-msb hover:text-primary-msb border-bg-2-msb border-2 animate-fadeIn animate-duration-400 transition ease-in-out" }, { "default": ($$result5) => renderTemplate`
Visitar ahora
` })} ` })} </div> ` })} </section> <section class="bg-secondary-bg-msb py-20"${addAttribute(renderTransition($$result2, "mg44nkrv", "fade", ""), "data-astro-transition-scope")}> <div> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-primary-text-msb font-medium font-cormorant text-pretty text-center" }, { "default": ($$result3) => renderTemplate`
Nuestras Sucursales
` })} <p class="text-secondary-text-msb text-center text-md md:text-lg lg:text-2xl font-extralight p-10">
Elegí tu sucursal más cercana
</p> </div> <div class="grid grid-cols justify-center md:grid-cols-2 gap-5 lg:gap-2 lg:grid-cols-4 container mx-auto"> ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/PdCXedJ3XriKhkeD6", "whatsAppPhone": "5491144161700", "suc_name": "Castelar", "suc_loc": "Casa Central", "suc_img": "/images/sucursal-castelar.webp", "suc_dir": "Avellaneda 976, Castelar", "suc_phone": "4627-8034 / 7548-6846", "addStyles": "border-[#A4A4A4]  border-2 hover:border-primary-border-msb hover:border-2 h-100 transition duration-500 ease-in-out  transform hover:-translate-y-1" })} ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/tctkkMnT39ZuecvY6", "whatsAppPhone": "5491124610859", "suc_name": "Belgrano", "suc_loc": "Capital Federal", "suc_img": "/images/sucursal-belgrano.webp", "suc_dir": "Av. Juramento 1475, Piso 3 Of. 4", "suc_phone": "112461-0859", "addStyles": "border-[#A4A4A4]  border-2 hover:border-primary-border-msb hover:border-2 h-100 transition duration-500 ease-in-out  transform hover:-translate-y-1" })} ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/Fo5cNCeaXJSRbkEz7", "whatsAppPhone": "5491123644767", "suc_name": "Fco. \xC1lvarez", "suc_loc": "Colectora Sur Acceso Oeste", "suc_img": "/images/sucursal-fco-alvarez.webp", "suc_dir": "K41 Piso 3, Of. 327", "suc_phone": "2130-9600 / 112364-4767", "addStyles": "border-[#A4A4A4]  border-2 hover:border-primary-border-msb hover:border-2 h-100 transition duration-500 ease-in-out  transform hover:-translate-y-1" })} ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/GgiKgSmGr31CvVXw5", "whatsAppPhone": "5491169425849", "suc_name": "Parque Leloir", "suc_loc": "Complejo Acorus", "suc_img": "/images/sucursal-parque-leloir.webp", "suc_dir": "Mart\xEDn Fierro 2921, Piso 2 Of. 201", "suc_phone": "4627-8034 / 7548-6846", "addStyles": "border-[#A4A4A4]  border-2 hover:border-primary-border-msb hover:border-2 h-100 transition duration-500 ease-in-out  transform hover:-translate-y-1" })} </div> </section> <section class="bg-tertiary-bg-hover-msb px-3 md:px-0 lg:px-0 py-20"> <div class="container mx-auto space-y-10 md:space-y-10 lg:space-y-0"> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-white  font-base font-medium font-cormorant text-pretty text-center" }, { "default": ($$result3) => renderTemplate`
Experiencias de nuestros clientes
` })} <p class="text-white text-center text-md md:text-lg lg:text-2xl font-extralight lg:py-5 lg:pb-16">
Comentarios y opiniones de nuestros usuarios
</p> <div class="grid md:grid-cols lg:grid-cols-3 ms:px-3 gap-10 md:px-5"> ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "", "class": "flex justify-center lg:justify-start w-100" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg w-full md:w-[450px] lg:w-[450px] shadow-lg " }, { "default": ($$result4) => renderTemplate` <div class="flex items-center gap-5 py-5"> <div class="rounded-full p-3 bg-[#D9D9D9]"> ${renderComponent($$result4, "UserIcon", UserIcon, { "addStyles": "object-cover w-full aspect-square bg-gradient-primary-msb", "w": "40", "h": "40" })} </div> <div class="flex flex-col gap-0 w-100"> <h1 class="text-base md:text-md lg:text-xl font-semibold text-primary-text-msb text-left">
Nombre de usuario
</h1> <p class="lg:text-lg text-primary-text-msb text-left font-normal font-italic  text-ellipsis overflow-hidden">
“Muy buena atención y gran apoyo post venta.”
</p> </div> </div> ` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "", "class": "flex justify-center lg:justify-start w-100" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg w-full md:w-[450px] lg:w-[450px] shadow-lg " }, { "default": ($$result4) => renderTemplate` <div class="flex items-center gap-5 py-5"> <div class="rounded-full p-3 bg-[#D9D9D9]"> ${renderComponent($$result4, "UserIcon", UserIcon, { "addStyles": "object-cover  w-full aspect-square bg-gradient-primary-msb", "w": "40", "h": "40" })} </div> <div class="flex flex-col gap-0 w-100"> <h1 class="text-base md:text-md lg:text-xl font-semibold text-primary-text-msb text-left ">
Nombre de usuario
</h1> <p class="lg:text-lg text-primary-text-msb text-left font-normal font-italic  text-ellipsis overflow-hidden">
“Una inmobiliaria todo servicio, profesionales siempre dispuestos a hacer posible la operación.”
</p> </div> </div> ` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "", "class": "flex justify-center lg:justify-start w-100" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg w-full md:w-[450px] lg:w-[450px] shadow-lg " }, { "default": ($$result4) => renderTemplate` <div class="flex items-center gap-5 py-5"> <div class="rounded-full p-3 bg-[#D9D9D9]"> ${renderComponent($$result4, "UserIcon", UserIcon, { "addStyles": "object-cover w-full aspect-square bg-gradient-primary-msb ", "w": "40", "h": "40" })} </div> <div class="flex flex-col gap-0 w-100"> <h1 class="text-base md:text-md lg:text-xl font-semibold text-primary-text-msb text-left">
Nombre de usuario
</h1> <p class="lg:text-lg text-primary-text-msb text-left font-normal font-italic  text-ellipsis overflow-hidden">
“Un gran trabajo, muy contentos por toda la atención, gracias.”
</p> </div> </div> ` })} ` })} </div> <div class="flex justify-center p-0 flex-col gap-y-5 md:gap-y-5 lg:gap-5 lg:flex-row w-full  md:w-[450px] lg:w-fit  md:mx-auto"> ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/invierta-en-usa", "class": "  lg:py-16  lg:w-fit self-center  w-full " }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "primary", "addStyles": " px-4 py-4 text-base lg:px-10 md:text-xl  md:px-10 lg:py-3 rounded-lg shadow-lg text-nowrap w-full h-full" }, { "default": ($$result4) => renderTemplate`
Dejanos tu comentario
` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/invierta-en-usa", "class": " lg:py-16  lg:w-fit self-center  w-full" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": " px-10 py-4 text-base lg:px-10 md:text-xl  md:px-10  lg:py-3 rounded-lg shadow-lg text-nowrap  w-full h-full " }, { "default": ($$result4) => renderTemplate`
Ver más experiencias
` })} ` })} </div> </div> </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/index.astro", "self");

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$a as a, index$9 as b, index$8 as c, index$7 as d, index$6 as e, index$5 as f, index$4 as g, index$3 as h, index$b as i, index$2 as j, index$1 as k, index as l };
