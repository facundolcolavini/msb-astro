import{h as o}from"./he.BU-6BCAe.js";import{t as f,c as u}from"./bundle-mjs.CpAuaXBl.js";import{u as m}from"./jsxRuntime.module.CZQ5QUxB.js";import{p as g}from"./hooks.module.DQKj1niD.js";const x=s=>s.toLowerCase().replace(/(?:^|\s)\S/g,function(e){return e.toUpperCase()});function T(s){return s?.filter(e=>{const r="description"in e?e.description:e?.descripcion;return"value"in e?e.value:"val"in e&&e.val,!(r==="INDISTINTO"||r==="INDISTINTO"&&"val"in e&&e.val===""||r==="TODAS")}).map(e=>{let r,t;return"description"in e?(r=o.decode(e.description),t=e.value||""):"val"in e?(r=e.descripcion,t=e.val):"id"in e?(r=o.decode(e.descripcion),t=e.id):(r=o.decode(e.descripcion),t=e.value||""),{label:x(o.decode(r)),value:t}})}let i=[],w=(s,e)=>{let r=[],t={get(){return t.lc||t.listen(()=>{})(),t.value},l:e||0,lc:0,listen(a,n){return t.lc=r.push(a,n||t.l)/2,()=>{let l=r.indexOf(a);~l&&(r.splice(l,2),--t.lc)}},notify(a){let n=!i.length;for(let l=0;l<r.length;l+=2)i.push(r[l],r[l+1],t.value,a);if(n){for(let l=0;l<i.length;l+=4){let d;for(let c=l+1;!d&&(c+=4)<i.length;)i[c]<i[l+1]&&(d=i.push(i[l],i[l+1],i[l+2],i[l+3]));d||i[l](i[l+2],i[l+3])}i.length=0}},off(){},set(a){t.value!==a&&(t.value=a,t.notify())},subscribe(a,n){let l=t.listen(a,n);return a(t.value),l},value:s};return t},B=(s={})=>{let e=w(s);return e.setKey=function(r,t){typeof t>"u"?r in e.value&&(e.value={...e.value},delete e.value[r],e.notify(r)):e.value[r]!==t&&(e.value={...e.value,[r]:t},e.notify(r))},e};const C=({addStyles:s})=>(f(u("h-100 w-100 object-contain",s)),m("svg",{className:s,width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:m("path",{d:"M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z",stroke:s??"currentColor",strokeWidth:"2"})})),L=({variant:s="primary",isFavorite:e,children:r,addStyles:t,icon:a,onClick:n,...l})=>{const d="px-4 py-2 rounded font-semibold text-sm transition-all",[c,b]=g(e||!1),h=u({"bg-primary-msb text-white border-primary-msb hover:bg-primary-hover-msb":s==="primary","bg-secondary-msb text-primary-text-msb border-secondary-msb hover:bg-secondary-hover-msb":s==="secondary","bg-tertiary-msb text-white border-tertiary-msb hover:bg-tertiary-hover-msb":s==="tertiary","bg-secondary-msb border-2 border-primary-msb text-primary-msb hover:border-primary-hover-msb":s==="outline","bg-gray-400 text-gray-800 cursor-not-allowed":s==="disabled"}),v=f(u(d,h,t)),p=y=>{e&&b(!c),n&&n(y)};return m("button",{...l,className:v,id:l.id,disabled:s==="disabled",onClick:n,value:l.value,children:[a&&a,r,e&&m("span",{onClick:p,className:e&&c?" fill-black-400":"fill-black-400",children:m(C,{addStyles:e&&c?"fill-primary-white stroke-primary-text-msb  hover:fill-primary-text-msb ":"stroke-primary-text-msb transition-all hover:fill-primary-text-msb fill-primary-text-msb"})})]})};export{L as B,C as H,w as a,x as c,T as f,B as m};
