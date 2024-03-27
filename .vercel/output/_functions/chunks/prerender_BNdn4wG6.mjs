/* empty css                             */
import { c as createAstro, d as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from './astro_BcvtDIcF.mjs';
import 'kleur/colors';
import { b as $$Layout } from './pages/_id__4xNdbqBM.mjs';

const $$Astro = createAstro();
const prerender = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "description": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-gray-50 dark:bg-gray-900"> <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
Flowbite
</a> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> <div class="p-6 space-y-4 md:space-y-6 sm:p-8"> <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
Sign Up in to your account
</h1> <form class="space-y-4 md:space-y-6" method="POST" action="/api/signup"> <div> <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label> <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <div> <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <button type="submit" class="w-full text-white bg-pink-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button> <p class="text-sm font-light text-gray-500 dark:text-gray-400">
already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a> </p> </form> </div> </div> </div> </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/register/index.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/register/index.astro";
const $$url = "/register";

export { $$Index as default, $$file as file, prerender, $$url as url };
