import{b as c,l as _,y as f,g as m,$ as h,N as y}from"./preact.module.DPkTw89T.js";import"./hooks.module.DQKj1niD.js";import{t as E,c as M}from"./bundle-mjs.CpAuaXBl.js";import{u as s}from"./jsxRuntime.module.CZQ5QUxB.js";function R(e,t){for(var n in t)e[n]=t[n];return e}function b(e,t){for(var n in e)if(n!=="__source"&&!(n in t))return!0;for(var r in t)if(r!=="__source"&&e[r]!==t[r])return!0;return!1}function g(e,t){this.props=e,this.context=t}(g.prototype=new c).isPureReactComponent=!0,g.prototype.shouldComponentUpdate=function(e,t){return b(this.props,e)||b(this.state,t)};var k=_.__b;_.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),k&&k(e)};var A=_.__e;_.__e=function(e,t,n,r){if(e.then){for(var o,i=t;i=i.__;)if((o=i.__c)&&o.__c)return t.__e==null&&(t.__e=n.__e,t.__k=n.__k),o.__c(e,t)}A(e,t,n,r)};var w=_.unmount;function S(e,t,n){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(r){typeof r.__c=="function"&&r.__c()}),e.__c.__H=null),(e=R({},e)).__c!=null&&(e.__c.__P===n&&(e.__c.__P=t),e.__c=null),e.__k=e.__k&&e.__k.map(function(r){return S(r,t,n)})),e}function U(e,t,n){return e&&n&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(r){return U(r,t,n)}),e.__c&&e.__c.__P===t&&(e.__e&&n.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=n)),e}function d(){this.__u=0,this.t=null,this.__b=null}function W(e){var t=e.__.__c;return t&&t.__a&&t.__a(e)}function p(){this.u=null,this.o=null}_.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&32&e.__u&&(e.type=null),w&&w(e)},(d.prototype=new c).__c=function(e,t){var n=t.__c,r=this;r.t==null&&(r.t=[]),r.t.push(n);var o=W(r.__v),i=!1,l=function(){i||(i=!0,n.__R=null,o?o(u):u())};n.__R=l;var u=function(){if(!--r.__u){if(r.state.__a){var a=r.state.__a;r.__v.__k[0]=U(a,a.__c.__P,a.__c.__O)}var v;for(r.setState({__a:r.__b=null});v=r.t.pop();)v.forceUpdate()}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),e.then(l,l)},d.prototype.componentWillUnmount=function(){this.t=[]},d.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=S(this.__b,n,r.__O=r.__P)}this.__b=null}var o=t.__a&&f(m,null,e.fallback);return o&&(o.__u&=-33),[f(m,null,t.__a?null:e.children),o]};var x=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};function $(e){return this.getChildContext=function(){return e.context},e.children}function j(e){var t=this,n=e.i;t.componentWillUnmount=function(){y(null,t.l),t.l=null,t.i=null},t.i&&t.i!==n&&t.componentWillUnmount(),t.l||(t.i=n,t.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(r){this.childNodes.push(r),t.i.appendChild(r)},insertBefore:function(r,o){this.childNodes.push(r),t.i.appendChild(r)},removeChild:function(r){this.childNodes.splice(this.childNodes.indexOf(r)>>>1,1),t.i.removeChild(r)}}),y(f($,{context:t.context},e.__v),t.l)}function Y(e,t){var n=f(j,{__v:e,i:t});return n.containerInfo=t,n}(p.prototype=new c).__a=function(e){var t=this,n=W(t.__v),r=t.o.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),x(t,e,r)):o()};n?n(i):i()}},p.prototype.render=function(e){this.u=null,this.o=new Map;var t=h(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},p.prototype.componentDidUpdate=p.prototype.componentDidMount=function(){var e=this;this.o.forEach(function(t,n){x(e,n,t)})};var H=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,V=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,B=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,z=/[A-Z0-9]/g,D=typeof document<"u",I=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(e)};c.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(c.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var C=_.event;function L(){}function T(){return this.cancelBubble}function Z(){return this.defaultPrevented}_.event=function(e){return C&&(e=C(e)),e.persist=L,e.isPropagationStopped=T,e.isDefaultPrevented=Z,e.nativeEvent=e};var F={enumerable:!1,configurable:!0,get:function(){return this.class}},N=_.vnode;_.vnode=function(e){typeof e.type=="string"&&function(t){var n=t.props,r=t.type,o={};for(var i in n){var l=n[i];if(!(i==="value"&&"defaultValue"in n&&l==null||D&&i==="children"&&r==="noscript"||i==="class"||i==="className")){var u=i.toLowerCase();i==="defaultValue"&&"value"in n&&n.value==null?i="value":i==="download"&&l===!0?l="":u==="translate"&&l==="no"?l=!1:u==="ondoubleclick"?i="ondblclick":u!=="onchange"||r!=="input"&&r!=="textarea"||I(n.type)?u==="onfocus"?i="onfocusin":u==="onblur"?i="onfocusout":B.test(i)?i=u:r.indexOf("-")===-1&&V.test(i)?i=i.replace(z,"-$&").toLowerCase():l===null&&(l=void 0):u=i="oninput",u==="oninput"&&o[i=u]&&(i="oninputCapture"),o[i]=l}}r=="select"&&o.multiple&&Array.isArray(o.value)&&(o.value=h(n.children).forEach(function(a){a.props.selected=o.value.indexOf(a.props.value)!=-1})),r=="select"&&o.defaultValue!=null&&(o.value=h(n.children).forEach(function(a){a.props.selected=o.multiple?o.defaultValue.indexOf(a.props.value)!=-1:o.defaultValue==a.props.value})),n.class&&!n.className?(o.class=n.class,Object.defineProperty(o,"className",F)):(n.className&&!n.class||n.class&&n.className)&&(o.class=o.className=n.className),t.props=o}(e),e.$$typeof=H,N&&N(e)};var P=_.__r;_.__r=function(e){P&&P(e),e.__c};var O=_.diffed;_.diffed=function(e){O&&O(e);var t=e.props,n=e.__e;n!=null&&e.type==="textarea"&&"value"in t&&t.value!==n.value&&(n.value=t.value==null?"":t.value)};const q=({addStyles:e,h:t="24",w:n="24"})=>{const r=E(M("icon icon-tabler icon-tabler-brand-whatsapp flex justify-center items-center",e));return s("svg",{xmlns:"http://www.w3.org/2000/svg",className:r,width:n,height:t,viewBox:"0 0 24 24","stroke-width":"1.8",stroke:"#494949",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[s("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s("path",{d:"M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"}),s("path",{d:"M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"})]})};export{q as W,Y as j};
