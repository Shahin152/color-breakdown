let t,e;const o=new WeakMap,r=new WeakMap,a=new WeakMap,n=new WeakMap,i=new WeakMap;let s={get(t,e,o){if(t instanceof IDBTransaction){if("done"===e)return r.get(t);if("objectStoreNames"===e)return t.objectStoreNames||a.get(t);if("store"===e)return o.objectStoreNames[1]?void 0:o.objectStore(o.objectStoreNames[0])}return d(t[e])},has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function c(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(e||(e=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(u(this),e),d(o.get(this))}:function(...e){return d(t.apply(u(this),e))}:function(e,...o){const r=t.call(u(this),e,...o);return a.set(r,e.sort?e.sort():[e]),d(r)}}function l(e){return"function"==typeof e?c(e):(e instanceof IDBTransaction&&function(t){if(r.has(t))return;const e=new Promise((e,o)=>{const r=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",n),t.removeEventListener("abort",n)},a=()=>{e(),r()},n=()=>{o(t.error),r()};t.addEventListener("complete",a),t.addEventListener("error",n),t.addEventListener("abort",n)});r.set(t,e)}(e),o=e,(t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>o instanceof t)?new Proxy(e,s):e);var o}function d(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,o)=>{const r=()=>{t.removeEventListener("success",a),t.removeEventListener("error",n)},a=()=>{e(d(t.result)),r()},n=()=>{o(t.error),r()};t.addEventListener("success",a),t.addEventListener("error",n)});return e.then(e=>{e instanceof IDBCursor&&o.set(e,t)}).catch(()=>{}),i.set(e,t),e}(t);if(n.has(t))return n.get(t);const e=l(t);return e!==t&&(n.set(t,e),i.set(e,t)),e}const u=t=>i.get(t);const p=["get","getKey","getAll","getAllKeys","count"],m=["put","add","delete","clear"],y=new Map;function h(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(y.get(e))return y.get(e);const o=e.replace(/FromIndex$/,""),r=e!==o,a=m.includes(o);if(!(o in(r?IDBIndex:IDBObjectStore).prototype)||!a&&!p.includes(o))return;const n=async function(t,...e){const n=this.transaction(t,a?"readwrite":"readonly");let i=n.store;r&&(i=i.index(e.shift()));const s=i[o](...e);return a&&await n.done,s};return y.set(e,n),n}function f(t){if(null==t)return;const e=t.id,o=function(t){const[e,o]=t.split(",",2),r=e.split(":",2)[1].split(";",1)[0],a=atob(o),n=new ArrayBuffer(a.length),i=new Uint8Array(n);for(let t=0;t<a.length;t++)i[t]=a.charCodeAt(t);return new Blob([n],{type:r})}(t.imgSrc);return{timestamp:e,imgSrc:URL.createObjectURL(o),colors:t.colors,name:t.name||new Date(e).toLocaleString()}}s=(t=>({get:(e,o,r)=>h(e,o)||t.get(e,o,r),has:(e,o)=>!!h(e,o)||t.has(e,o)}))(s);const g="#FFFFFF",w="#000000",b=new Map([[1,{timestamp:1,imgSrc:"img/demo/andrew-hughes-261571-unsplash.jpg",name:"Photo by Andrew Hughes on Unsplash",colors:{vibrant:{color:"#AE340E",textColor:g},darkVibrant:{color:"#6C140C",textColor:g},lightVibrant:{color:"#DACC9B",textColor:w},muted:{color:"#9F805F",textColor:g},darkMuted:{color:"#3B3945",textColor:g},lightMuted:{color:"#DAD3B0",textColor:w}}}],[2,{timestamp:2,imgSrc:"img/demo/ever-wild-634729-unsplash.jpg",name:"Photo by ever wild on Unsplash",colors:{vibrant:{color:"#FBA409",textColor:w},darkVibrant:{color:"#7C0404",textColor:g},lightVibrant:{color:"#F9A250",textColor:w},muted:{color:"#AC784C",textColor:g},darkMuted:{color:"#8C6C44",textColor:g},lightMuted:{color:"#BC987A",textColor:w}}}],[3,{timestamp:3,imgSrc:"img/demo/will-turner-1244879-unsplash.jpg",name:"Photo by Will Turner on Unsplash",colors:{vibrant:{color:"#1E8EE0",textColor:g},darkVibrant:{color:"#061C2C",textColor:g},lightVibrant:{color:"#8AC4EF",textColor:w},muted:{color:"#777C80",textColor:g},darkMuted:{color:"#253D4C",textColor:g},lightMuted:{color:"#BBBCC4",textColor:w}}}]]),C=function(t,e,{blocked:o,upgrade:r,blocking:a}={}){const n=indexedDB.open(t,e),i=d(n);return r&&n.addEventListener("upgradeneeded",t=>{r(d(n.result),t.oldVersion,t.newVersion,d(n.transaction))}),o&&n.addEventListener("blocked",()=>o()),a&&i.then(t=>t.addEventListener("versionchange",a)).catch(()=>{}),i}("history-store",2,{upgrade(t,e){switch(e){case 0:t.createObjectStore("history",{keyPath:"id"});case 1:t.createObjectStore("example",{keyPath:"id"})}}});async function v(t){const e=await Promise.all(t.map(async t=>{const e=await fetch(t.imgSrc).then(t=>t.blob()),o=await function(t){return new Promise((e,o)=>{const r=new FileReader;r.onload=()=>e(r.result),r.onerror=()=>o(r.error),r.readAsDataURL(t)})}(e);var r;return r=t.imgSrc,"blob:"===new URL(r).protocol&&URL.revokeObjectURL(r),{id:t.timestamp,imgSrc:o,colors:t.colors,name:t.name}})),o=await C,{store:r,done:a}=await o.transaction("history","readwrite");return e.forEach(t=>r.put(t)),await a,e}async function D(t,e){console.log(t.type,t.payload);try{switch(t.type){case"SAVE":if(t.payload.length>0){const o=await v(t.payload);e({type:"DISPLAY",payload:{entry:f(o[0]),firstLoad:!1,updateHash:!0}}),e({type:"ADD",payload:o.map(f)})}return;case"LOAD":return void await async function(t,e){const o=await C,r=await o.transaction(["history","example"]);await Promise.all([r.objectStore("example").openCursor().then(async e=>{for(;e;)e.value.hidden&&t(e.key),e=await e.continue()}),r.objectStore("history").openCursor().then(async t=>{for(;t;)e(f(t.value)),t=await t.continue()})])}(t=>e({type:"REMOVE",payload:[t]}),t=>e({type:"ADD",payload:[t]}));case"OPEN":let o=void 0;return Number.isNaN(t.payload.timestamp)||(o=await async function(t){const e=await C;if(t<10){const o=await e.get("example",t);return(null==o?void 0:o.hidden)||!1?void 0:b.get(t)||void 0}return f(await e.get("history",t))}(t.payload.timestamp)),void e({type:"DISPLAY",payload:{entry:o,firstLoad:t.payload.firstLoad,updateHash:!1}});case"DELETE":if(!Number.isNaN(t.payload.timestamp)&&(await async function(t){const e=await C;t<10?await e.put("example",{id:t,hidden:!0}):await e.delete("history",t)}(t.payload.timestamp),e({type:"REMOVE",payload:[t.payload.timestamp]}),t.payload.current)){const t=await async function(){const t=await C,e=await t.transaction(["history","example"]),o=await e.objectStore("history").getAll(void 0,1);if(o.length>0)return f(o[0]);const r=await e.objectStore("example").getAll(),a=new Set(r.filter(t=>t.hidden).map(t=>t.id));return Array.from(b.values()).find(t=>!a.has(t.timestamp))||void 0}();e({type:"DISPLAY",payload:{entry:t,firstLoad:!1,updateHash:!0}})}return}}catch(t){e({type:"ERROR",payload:String(t)})}}self.addEventListener("message",t=>D(t.data,postMessage)),D({type:"LOAD",payload:void 0},postMessage);
//# sourceMappingURL=db-worker.js.map
