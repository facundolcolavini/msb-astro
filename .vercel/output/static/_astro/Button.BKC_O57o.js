import{c as a}from"./clsx.B-dksMZM.js";import{t as l}from"./bundle-mjs.CsYRq7or.js";import{u as t}from"./jsxRuntime.module.CZQ5QUxB.js";import{p as f}from"./hooks.module.DQKj1niD.js";const g=({addStyles:r})=>(l(a("h-100 w-100 object-contain",r)),t("svg",{className:r,width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t("path",{d:"M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z",stroke:r??"currentColor",strokeWidth:"2"})})),k=({variant:r="primary",isFavorite:e,children:b,addStyles:d,icon:i,onClick:s,...o})=>{const n="px-4 py-2 rounded font-semibold text-sm transition-all",[m,y]=f(e||!1),c=a({"bg-primary-msb text-white border-primary-msb hover:bg-primary-hover-msb":r==="primary","bg-secondary-msb text-primary-text-msb border-secondary-msb hover:bg-secondary-hover-msb":r==="secondary","bg-tertiary-msb text-white border-tertiary-msb hover:bg-tertiary-hover-msb":r==="tertiary","bg-secondary-msb border-2 border-primary-msb text-primary-msb hover:border-primary-hover-msb":r==="outline","bg-gray-400 text-gray-800 cursor-not-allowed":r==="disabled"}),h=l(a(n,c,d)),p=x=>{e&&y(!m),s&&s(x)};return t("button",{...o,className:h,id:o.id,disabled:r==="disabled",onClick:s,value:o.value,children:[i&&i,b,e&&t("span",{onClick:p,className:e&&m?" fill-black-400":"fill-black-400",children:t(g,{addStyles:e&&m?"fill-primary-white stroke-primary-text-msb  hover:fill-primary-text-msb ":"stroke-primary-text-msb transition-all hover:fill-primary-text-msb fill-primary-text-msb"})})]})};export{k as B,g as H};
