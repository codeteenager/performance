import{_ as u,o as l,c as _,S as f,U as m,C as i,a5 as o,Q as r,a6 as h,a7 as A,a8 as g,a9 as v,aa as y,ab as w,ac as P,ad as C,ae as x,af as S,M as b,d as E,u as R,p as B,k as I,ag as D,ah as L,ai as T}from"./chunks/framework.eec8105e.js";import{t as c}from"./chunks/theme.3fe518a2.js";const j="/performance/weixin.jpg";const O={},p=e=>(f("data-v-0fdd4fd7"),e=e(),m(),e),V={class:"content"},k=p(()=>i("img",{class:"icon",src:j},null,-1)),F=p(()=>i("span",{class:"text"},"微信公众号",-1)),$=[k,F];function M(e,t){return l(),_("div",V,$)}const N=u(O,[["render",M],["__scopeId","data-v-0fdd4fd7"]]),U={...c,Layout(){return o(c.Layout,null,{"aside-bottom":()=>o(N)})}};function d(e){if(e.extends){const t=d(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const n=d(U),G=E({name:"VitePressApp",setup(){const{site:e}=R();return B(()=>{I(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),D(),L(),T(),n.setup&&n.setup(),()=>o(n.Layout)}});async function H(){const e=q(),t=Q();t.provide(A,e);const a=g(e.route);return t.provide(v,a),t.component("Content",y),t.component("ClientOnly",w),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:t,router:e,siteData:P}),{app:t,router:e,data:a}}function Q(){return C(G)}function q(){let e=r,t;return x(a=>{let s=S(a);return e&&(t=s),(e||t===s)&&(s=s.replace(/\.js$/,".lean.js")),r&&(e=!1),b(()=>import(s),[])},n.NotFound)}r&&H().then(({app:e,router:t,data:a})=>{t.go().then(()=>{h(t.route,a.site),e.mount("#app")})});export{H as createApp};