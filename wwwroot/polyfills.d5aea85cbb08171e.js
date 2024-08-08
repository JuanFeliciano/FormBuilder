"use strict";(self.webpackChunkFormBuilderAPI=self.webpackChunkFormBuilderAPI||[]).push([[429],{583:()=>{!function(t){const n=t.performance;function i(L){n&&n.mark&&n.mark(L)}function o(L,T){n&&n.measure&&n.measure(L,T)}i("Zone");const c=t.__Zone_symbol_prefix||"__zone_symbol__";function a(L){return c+L}const m=!0===t[a("forceDuplicateZoneCheck")];if(t.Zone){if(m||"function"!=typeof t.Zone.__symbol__)throw new Error("Zone already loaded.");return t.Zone}let d=(()=>{class L{constructor(e,r){this._parent=e,this._name=r?r.name||"unnamed":"<root>",this._properties=r&&r.properties||{},this._zoneDelegate=new v(this,this._parent&&this._parent._zoneDelegate,r)}static assertZonePatched(){if(t.Promise!==oe.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let e=L.current;for(;e.parent;)e=e.parent;return e}static get current(){return U.zone}static get currentTask(){return re}static __load_patch(e,r,k=!1){if(oe.hasOwnProperty(e)){if(!k&&m)throw Error("Already loaded patch: "+e)}else if(!t["__Zone_disable_"+e]){const C="Zone:"+e;i(C),oe[e]=r(t,L,z),o(C,C)}}get parent(){return this._parent}get name(){return this._name}get(e){const r=this.getZoneWith(e);if(r)return r._properties[e]}getZoneWith(e){let r=this;for(;r;){if(r._properties.hasOwnProperty(e))return r;r=r._parent}return null}fork(e){if(!e)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,e)}wrap(e,r){if("function"!=typeof e)throw new Error("Expecting function got: "+e);const k=this._zoneDelegate.intercept(this,e,r),C=this;return function(){return C.runGuarded(k,this,arguments,r)}}run(e,r,k,C){U={parent:U,zone:this};try{return this._zoneDelegate.invoke(this,e,r,k,C)}finally{U=U.parent}}runGuarded(e,r=null,k,C){U={parent:U,zone:this};try{try{return this._zoneDelegate.invoke(this,e,r,k,C)}catch($){if(this._zoneDelegate.handleError(this,$))throw $}}finally{U=U.parent}}runTask(e,r,k){if(e.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(e.zone||J).name+"; Execution: "+this.name+")");if(e.state===x&&(e.type===Q||e.type===w))return;const C=e.state!=E;C&&e._transitionTo(E,A),e.runCount++;const $=re;re=e,U={parent:U,zone:this};try{e.type==w&&e.data&&!e.data.isPeriodic&&(e.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,e,r,k)}catch(l){if(this._zoneDelegate.handleError(this,l))throw l}}finally{e.state!==x&&e.state!==h&&(e.type==Q||e.data&&e.data.isPeriodic?C&&e._transitionTo(A,E):(e.runCount=0,this._updateTaskCount(e,-1),C&&e._transitionTo(x,E,x))),U=U.parent,re=$}}scheduleTask(e){if(e.zone&&e.zone!==this){let k=this;for(;k;){if(k===e.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);k=k.parent}}e._transitionTo(X,x);const r=[];e._zoneDelegates=r,e._zone=this;try{e=this._zoneDelegate.scheduleTask(this,e)}catch(k){throw e._transitionTo(h,X,x),this._zoneDelegate.handleError(this,k),k}return e._zoneDelegates===r&&this._updateTaskCount(e,1),e.state==X&&e._transitionTo(A,X),e}scheduleMicroTask(e,r,k,C){return this.scheduleTask(new p(I,e,r,k,C,void 0))}scheduleMacroTask(e,r,k,C,$){return this.scheduleTask(new p(w,e,r,k,C,$))}scheduleEventTask(e,r,k,C,$){return this.scheduleTask(new p(Q,e,r,k,C,$))}cancelTask(e){if(e.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(e.zone||J).name+"; Execution: "+this.name+")");if(e.state===A||e.state===E){e._transitionTo(G,A,E);try{this._zoneDelegate.cancelTask(this,e)}catch(r){throw e._transitionTo(h,G),this._zoneDelegate.handleError(this,r),r}return this._updateTaskCount(e,-1),e._transitionTo(x,G),e.runCount=0,e}}_updateTaskCount(e,r){const k=e._zoneDelegates;-1==r&&(e._zoneDelegates=null);for(let C=0;C<k.length;C++)k[C]._updateTaskCount(e.type,r)}}return L.__symbol__=a,L})();const P={name:"",onHasTask:(L,T,e,r)=>L.hasTask(e,r),onScheduleTask:(L,T,e,r)=>L.scheduleTask(e,r),onInvokeTask:(L,T,e,r,k,C)=>L.invokeTask(e,r,k,C),onCancelTask:(L,T,e,r)=>L.cancelTask(e,r)};class v{constructor(T,e,r){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=T,this._parentDelegate=e,this._forkZS=r&&(r&&r.onFork?r:e._forkZS),this._forkDlgt=r&&(r.onFork?e:e._forkDlgt),this._forkCurrZone=r&&(r.onFork?this.zone:e._forkCurrZone),this._interceptZS=r&&(r.onIntercept?r:e._interceptZS),this._interceptDlgt=r&&(r.onIntercept?e:e._interceptDlgt),this._interceptCurrZone=r&&(r.onIntercept?this.zone:e._interceptCurrZone),this._invokeZS=r&&(r.onInvoke?r:e._invokeZS),this._invokeDlgt=r&&(r.onInvoke?e:e._invokeDlgt),this._invokeCurrZone=r&&(r.onInvoke?this.zone:e._invokeCurrZone),this._handleErrorZS=r&&(r.onHandleError?r:e._handleErrorZS),this._handleErrorDlgt=r&&(r.onHandleError?e:e._handleErrorDlgt),this._handleErrorCurrZone=r&&(r.onHandleError?this.zone:e._handleErrorCurrZone),this._scheduleTaskZS=r&&(r.onScheduleTask?r:e._scheduleTaskZS),this._scheduleTaskDlgt=r&&(r.onScheduleTask?e:e._scheduleTaskDlgt),this._scheduleTaskCurrZone=r&&(r.onScheduleTask?this.zone:e._scheduleTaskCurrZone),this._invokeTaskZS=r&&(r.onInvokeTask?r:e._invokeTaskZS),this._invokeTaskDlgt=r&&(r.onInvokeTask?e:e._invokeTaskDlgt),this._invokeTaskCurrZone=r&&(r.onInvokeTask?this.zone:e._invokeTaskCurrZone),this._cancelTaskZS=r&&(r.onCancelTask?r:e._cancelTaskZS),this._cancelTaskDlgt=r&&(r.onCancelTask?e:e._cancelTaskDlgt),this._cancelTaskCurrZone=r&&(r.onCancelTask?this.zone:e._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const k=r&&r.onHasTask;(k||e&&e._hasTaskZS)&&(this._hasTaskZS=k?r:P,this._hasTaskDlgt=e,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=T,r.onScheduleTask||(this._scheduleTaskZS=P,this._scheduleTaskDlgt=e,this._scheduleTaskCurrZone=this.zone),r.onInvokeTask||(this._invokeTaskZS=P,this._invokeTaskDlgt=e,this._invokeTaskCurrZone=this.zone),r.onCancelTask||(this._cancelTaskZS=P,this._cancelTaskDlgt=e,this._cancelTaskCurrZone=this.zone))}fork(T,e){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,T,e):new d(T,e)}intercept(T,e,r){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,T,e,r):e}invoke(T,e,r,k,C){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,T,e,r,k,C):e.apply(r,k)}handleError(T,e){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,T,e)}scheduleTask(T,e){let r=e;if(this._scheduleTaskZS)this._hasTaskZS&&r._zoneDelegates.push(this._hasTaskDlgtOwner),r=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,T,e),r||(r=e);else if(e.scheduleFn)e.scheduleFn(e);else{if(e.type!=I)throw new Error("Task is missing scheduleFn.");R(e)}return r}invokeTask(T,e,r,k){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,T,e,r,k):e.callback.apply(r,k)}cancelTask(T,e){let r;if(this._cancelTaskZS)r=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,T,e);else{if(!e.cancelFn)throw Error("Task is not cancelable");r=e.cancelFn(e)}return r}hasTask(T,e){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,T,e)}catch(r){this.handleError(T,r)}}_updateTaskCount(T,e){const r=this._taskCounts,k=r[T],C=r[T]=k+e;if(C<0)throw new Error("More tasks executed then were scheduled.");0!=k&&0!=C||this.hasTask(this.zone,{microTask:r.microTask>0,macroTask:r.macroTask>0,eventTask:r.eventTask>0,change:T})}}class p{constructor(T,e,r,k,C,$){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=T,this.source=e,this.data=k,this.scheduleFn=C,this.cancelFn=$,!r)throw new Error("callback is not defined");this.callback=r;const l=this;this.invoke=T===Q&&k&&k.useG?p.invokeTask:function(){return p.invokeTask.call(t,l,this,arguments)}}static invokeTask(T,e,r){T||(T=this),ee++;try{return T.runCount++,T.zone.runTask(T,e,r)}finally{1==ee&&_(),ee--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(x,X)}_transitionTo(T,e,r){if(this._state!==e&&this._state!==r)throw new Error(`${this.type} '${this.source}': can not transition to '${T}', expecting state '${e}'${r?" or '"+r+"'":""}, was '${this._state}'.`);this._state=T,T==x&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const M=a("setTimeout"),Z=a("Promise"),N=a("then");let K,B=[],H=!1;function q(L){if(K||t[Z]&&(K=t[Z].resolve(0)),K){let T=K[N];T||(T=K.then),T.call(K,L)}else t[M](L,0)}function R(L){0===ee&&0===B.length&&q(_),L&&B.push(L)}function _(){if(!H){for(H=!0;B.length;){const L=B;B=[];for(let T=0;T<L.length;T++){const e=L[T];try{e.zone.runTask(e,null,null)}catch(r){z.onUnhandledError(r)}}}z.microtaskDrainDone(),H=!1}}const J={name:"NO ZONE"},x="notScheduled",X="scheduling",A="scheduled",E="running",G="canceling",h="unknown",I="microTask",w="macroTask",Q="eventTask",oe={},z={symbol:a,currentZoneFrame:()=>U,onUnhandledError:W,microtaskDrainDone:W,scheduleMicroTask:R,showUncaughtError:()=>!d[a("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:W,patchMethod:()=>W,bindArguments:()=>[],patchThen:()=>W,patchMacroTask:()=>W,patchEventPrototype:()=>W,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>W,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>W,wrapWithCurrentZone:()=>W,filterProperties:()=>[],attachOriginToPatched:()=>W,_redefineProperty:()=>W,patchCallbacks:()=>W,nativeScheduleMicroTask:q};let U={parent:null,zone:new d(null,null)},re=null,ee=0;function W(){}o("Zone","Zone"),t.Zone=d}(typeof window<"u"&&window||typeof self<"u"&&self||global);const ue=Object.getOwnPropertyDescriptor,me=Object.defineProperty,ve=Object.getPrototypeOf,Se=Object.create,it=Array.prototype.slice,De="addEventListener",Oe="removeEventListener",Ze=Zone.__symbol__(De),Ne=Zone.__symbol__(Oe),ie="true",ce="false",pe=Zone.__symbol__("");function Ie(t,n){return Zone.current.wrap(t,n)}function Le(t,n,i,o,c){return Zone.current.scheduleMacroTask(t,n,i,o,c)}const j=Zone.__symbol__,be=typeof window<"u",_e=be?window:void 0,Y=be&&_e||"object"==typeof self&&self||global,ct="removeAttribute";function Me(t,n){for(let i=t.length-1;i>=0;i--)"function"==typeof t[i]&&(t[i]=Ie(t[i],n+"_"+i));return t}function Ve(t){return!t||!1!==t.writable&&!("function"==typeof t.get&&typeof t.set>"u")}const Fe=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Pe=!("nw"in Y)&&typeof Y.process<"u"&&"[object process]"==={}.toString.call(Y.process),Ae=!Pe&&!Fe&&!(!be||!_e.HTMLElement),Be=typeof Y.process<"u"&&"[object process]"==={}.toString.call(Y.process)&&!Fe&&!(!be||!_e.HTMLElement),we={},Ue=function(t){if(!(t=t||Y.event))return;let n=we[t.type];n||(n=we[t.type]=j("ON_PROPERTY"+t.type));const i=this||t.target||Y,o=i[n];let c;return Ae&&i===_e&&"error"===t.type?(c=o&&o.call(this,t.message,t.filename,t.lineno,t.colno,t.error),!0===c&&t.preventDefault()):(c=o&&o.apply(this,arguments),null!=c&&!c&&t.preventDefault()),c};function We(t,n,i){let o=ue(t,n);if(!o&&i&&ue(i,n)&&(o={enumerable:!0,configurable:!0}),!o||!o.configurable)return;const c=j("on"+n+"patched");if(t.hasOwnProperty(c)&&t[c])return;delete o.writable,delete o.value;const a=o.get,m=o.set,d=n.slice(2);let P=we[d];P||(P=we[d]=j("ON_PROPERTY"+d)),o.set=function(v){let p=this;!p&&t===Y&&(p=Y),p&&("function"==typeof p[P]&&p.removeEventListener(d,Ue),m&&m.call(p,null),p[P]=v,"function"==typeof v&&p.addEventListener(d,Ue,!1))},o.get=function(){let v=this;if(!v&&t===Y&&(v=Y),!v)return null;const p=v[P];if(p)return p;if(a){let M=a.call(this);if(M)return o.set.call(this,M),"function"==typeof v[ct]&&v.removeAttribute(n),M}return null},me(t,n,o),t[c]=!0}function qe(t,n,i){if(n)for(let o=0;o<n.length;o++)We(t,"on"+n[o],i);else{const o=[];for(const c in t)"on"==c.slice(0,2)&&o.push(c);for(let c=0;c<o.length;c++)We(t,o[c],i)}}const ne=j("originalInstance");function ge(t){const n=Y[t];if(!n)return;Y[j(t)]=n,Y[t]=function(){const c=Me(arguments,t);switch(c.length){case 0:this[ne]=new n;break;case 1:this[ne]=new n(c[0]);break;case 2:this[ne]=new n(c[0],c[1]);break;case 3:this[ne]=new n(c[0],c[1],c[2]);break;case 4:this[ne]=new n(c[0],c[1],c[2],c[3]);break;default:throw new Error("Arg list too long.")}},le(Y[t],n);const i=new n(function(){});let o;for(o in i)"XMLHttpRequest"===t&&"responseBlob"===o||function(c){"function"==typeof i[c]?Y[t].prototype[c]=function(){return this[ne][c].apply(this[ne],arguments)}:me(Y[t].prototype,c,{set:function(a){"function"==typeof a?(this[ne][c]=Ie(a,t+"."+c),le(this[ne][c],a)):this[ne][c]=a},get:function(){return this[ne][c]}})}(o);for(o in n)"prototype"!==o&&n.hasOwnProperty(o)&&(Y[t][o]=n[o])}function ae(t,n,i){let o=t;for(;o&&!o.hasOwnProperty(n);)o=ve(o);!o&&t[n]&&(o=t);const c=j(n);let a=null;if(o&&(!(a=o[c])||!o.hasOwnProperty(c))&&(a=o[c]=o[n],Ve(o&&ue(o,n)))){const d=i(a,c,n);o[n]=function(){return d(this,arguments)},le(o[n],a)}return a}function lt(t,n,i){let o=null;function c(a){const m=a.data;return m.args[m.cbIdx]=function(){a.invoke.apply(this,arguments)},o.apply(m.target,m.args),a}o=ae(t,n,a=>function(m,d){const P=i(m,d);return P.cbIdx>=0&&"function"==typeof d[P.cbIdx]?Le(P.name,d[P.cbIdx],P,c):a.apply(m,d)})}function le(t,n){t[j("OriginalDelegate")]=n}let Xe=!1,je=!1;function ft(){if(Xe)return je;Xe=!0;try{const t=_e.navigator.userAgent;(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/")||-1!==t.indexOf("Edge/"))&&(je=!0)}catch{}return je}Zone.__load_patch("ZoneAwarePromise",(t,n,i)=>{const o=Object.getOwnPropertyDescriptor,c=Object.defineProperty,m=i.symbol,d=[],P=!0===t[m("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],v=m("Promise"),p=m("then"),M="__creationTrace__";i.onUnhandledError=l=>{if(i.showUncaughtError()){const u=l&&l.rejection;u?console.error("Unhandled Promise rejection:",u instanceof Error?u.message:u,"; Zone:",l.zone.name,"; Task:",l.task&&l.task.source,"; Value:",u,u instanceof Error?u.stack:void 0):console.error(l)}},i.microtaskDrainDone=()=>{for(;d.length;){const l=d.shift();try{l.zone.runGuarded(()=>{throw l.throwOriginal?l.rejection:l})}catch(u){N(u)}}};const Z=m("unhandledPromiseRejectionHandler");function N(l){i.onUnhandledError(l);try{const u=n[Z];"function"==typeof u&&u.call(this,l)}catch{}}function B(l){return l&&l.then}function H(l){return l}function K(l){return e.reject(l)}const q=m("state"),R=m("value"),_=m("finally"),J=m("parentPromiseValue"),x=m("parentPromiseState"),X="Promise.then",A=null,E=!0,G=!1,h=0;function I(l,u){return s=>{try{z(l,u,s)}catch(f){z(l,!1,f)}}}const w=function(){let l=!1;return function(s){return function(){l||(l=!0,s.apply(null,arguments))}}},Q="Promise resolved with itself",oe=m("currentTaskTrace");function z(l,u,s){const f=w();if(l===s)throw new TypeError(Q);if(l[q]===A){let g=null;try{("object"==typeof s||"function"==typeof s)&&(g=s&&s.then)}catch(b){return f(()=>{z(l,!1,b)})(),l}if(u!==G&&s instanceof e&&s.hasOwnProperty(q)&&s.hasOwnProperty(R)&&s[q]!==A)re(s),z(l,s[q],s[R]);else if(u!==G&&"function"==typeof g)try{g.call(s,f(I(l,u)),f(I(l,!1)))}catch(b){f(()=>{z(l,!1,b)})()}else{l[q]=u;const b=l[R];if(l[R]=s,l[_]===_&&u===E&&(l[q]=l[x],l[R]=l[J]),u===G&&s instanceof Error){const y=n.currentTask&&n.currentTask.data&&n.currentTask.data[M];y&&c(s,oe,{configurable:!0,enumerable:!1,writable:!0,value:y})}for(let y=0;y<b.length;)ee(l,b[y++],b[y++],b[y++],b[y++]);if(0==b.length&&u==G){l[q]=h;let y=s;try{throw new Error("Uncaught (in promise): "+function a(l){return l&&l.toString===Object.prototype.toString?(l.constructor&&l.constructor.name||"")+": "+JSON.stringify(l):l?l.toString():Object.prototype.toString.call(l)}(s)+(s&&s.stack?"\n"+s.stack:""))}catch(S){y=S}P&&(y.throwOriginal=!0),y.rejection=s,y.promise=l,y.zone=n.current,y.task=n.currentTask,d.push(y),i.scheduleMicroTask()}}}return l}const U=m("rejectionHandledHandler");function re(l){if(l[q]===h){try{const u=n[U];u&&"function"==typeof u&&u.call(this,{rejection:l[R],promise:l})}catch{}l[q]=G;for(let u=0;u<d.length;u++)l===d[u].promise&&d.splice(u,1)}}function ee(l,u,s,f,g){re(l);const b=l[q],y=b?"function"==typeof f?f:H:"function"==typeof g?g:K;u.scheduleMicroTask(X,()=>{try{const S=l[R],D=!!s&&_===s[_];D&&(s[J]=S,s[x]=b);const O=u.run(y,void 0,D&&y!==K&&y!==H?[]:[S]);z(s,!0,O)}catch(S){z(s,!1,S)}},s)}const L=function(){},T=t.AggregateError;class e{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(u){return z(new this(null),E,u)}static reject(u){return z(new this(null),G,u)}static any(u){if(!u||"function"!=typeof u[Symbol.iterator])return Promise.reject(new T([],"All promises were rejected"));const s=[];let f=0;try{for(let y of u)f++,s.push(e.resolve(y))}catch{return Promise.reject(new T([],"All promises were rejected"))}if(0===f)return Promise.reject(new T([],"All promises were rejected"));let g=!1;const b=[];return new e((y,S)=>{for(let D=0;D<s.length;D++)s[D].then(O=>{g||(g=!0,y(O))},O=>{b.push(O),f--,0===f&&(g=!0,S(new T(b,"All promises were rejected")))})})}static race(u){let s,f,g=new this((S,D)=>{s=S,f=D});function b(S){s(S)}function y(S){f(S)}for(let S of u)B(S)||(S=this.resolve(S)),S.then(b,y);return g}static all(u){return e.allWithCallback(u)}static allSettled(u){return(this&&this.prototype instanceof e?this:e).allWithCallback(u,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(u,s){let f,g,b=new this((O,V)=>{f=O,g=V}),y=2,S=0;const D=[];for(let O of u){B(O)||(O=this.resolve(O));const V=S;try{O.then(F=>{D[V]=s?s.thenCallback(F):F,y--,0===y&&f(D)},F=>{s?(D[V]=s.errorCallback(F),y--,0===y&&f(D)):g(F)})}catch(F){g(F)}y++,S++}return y-=2,0===y&&f(D),b}constructor(u){const s=this;if(!(s instanceof e))throw new Error("Must be an instanceof Promise.");s[q]=A,s[R]=[];try{const f=w();u&&u(f(I(s,E)),f(I(s,G)))}catch(f){z(s,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return e}then(u,s){var f;let g=null===(f=this.constructor)||void 0===f?void 0:f[Symbol.species];(!g||"function"!=typeof g)&&(g=this.constructor||e);const b=new g(L),y=n.current;return this[q]==A?this[R].push(y,b,u,s):ee(this,y,b,u,s),b}catch(u){return this.then(null,u)}finally(u){var s;let f=null===(s=this.constructor)||void 0===s?void 0:s[Symbol.species];(!f||"function"!=typeof f)&&(f=e);const g=new f(L);g[_]=_;const b=n.current;return this[q]==A?this[R].push(b,g,u,u):ee(this,b,g,u,u),g}}e.resolve=e.resolve,e.reject=e.reject,e.race=e.race,e.all=e.all;const r=t[v]=t.Promise;t.Promise=e;const k=m("thenPatched");function C(l){const u=l.prototype,s=o(u,"then");if(s&&(!1===s.writable||!s.configurable))return;const f=u.then;u[p]=f,l.prototype.then=function(g,b){return new e((S,D)=>{f.call(this,S,D)}).then(g,b)},l[k]=!0}return i.patchThen=C,r&&(C(r),ae(t,"fetch",l=>function $(l){return function(u,s){let f=l.apply(u,s);if(f instanceof e)return f;let g=f.constructor;return g[k]||C(g),f}}(l))),Promise[n.__symbol__("uncaughtPromiseErrors")]=d,e}),Zone.__load_patch("toString",t=>{const n=Function.prototype.toString,i=j("OriginalDelegate"),o=j("Promise"),c=j("Error"),a=function(){if("function"==typeof this){const v=this[i];if(v)return"function"==typeof v?n.call(v):Object.prototype.toString.call(v);if(this===Promise){const p=t[o];if(p)return n.call(p)}if(this===Error){const p=t[c];if(p)return n.call(p)}}return n.call(this)};a[i]=n,Function.prototype.toString=a;const m=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":m.call(this)}});let Ee=!1;if(typeof window<"u")try{const t=Object.defineProperty({},"passive",{get:function(){Ee=!0}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{Ee=!1}const ht={useG:!0},te={},ze={},Ye=new RegExp("^"+pe+"(\\w+)(true|false)$"),$e=j("propagationStopped");function Je(t,n){const i=(n?n(t):t)+ce,o=(n?n(t):t)+ie,c=pe+i,a=pe+o;te[t]={},te[t][ce]=c,te[t][ie]=a}function dt(t,n,i,o){const c=o&&o.add||De,a=o&&o.rm||Oe,m=o&&o.listeners||"eventListeners",d=o&&o.rmAll||"removeAllListeners",P=j(c),v="."+c+":",p="prependListener",M="."+p+":",Z=function(R,_,J){if(R.isRemoved)return;const x=R.callback;let X;"object"==typeof x&&x.handleEvent&&(R.callback=E=>x.handleEvent(E),R.originalDelegate=x);try{R.invoke(R,_,[J])}catch(E){X=E}const A=R.options;return A&&"object"==typeof A&&A.once&&_[a].call(_,J.type,R.originalDelegate?R.originalDelegate:R.callback,A),X};function N(R,_,J){if(!(_=_||t.event))return;const x=R||_.target||t,X=x[te[_.type][J?ie:ce]];if(X){const A=[];if(1===X.length){const E=Z(X[0],x,_);E&&A.push(E)}else{const E=X.slice();for(let G=0;G<E.length&&(!_||!0!==_[$e]);G++){const h=Z(E[G],x,_);h&&A.push(h)}}if(1===A.length)throw A[0];for(let E=0;E<A.length;E++){const G=A[E];n.nativeScheduleMicroTask(()=>{throw G})}}}const B=function(R){return N(this,R,!1)},H=function(R){return N(this,R,!0)};function K(R,_){if(!R)return!1;let J=!0;_&&void 0!==_.useG&&(J=_.useG);const x=_&&_.vh;let X=!0;_&&void 0!==_.chkDup&&(X=_.chkDup);let A=!1;_&&void 0!==_.rt&&(A=_.rt);let E=R;for(;E&&!E.hasOwnProperty(c);)E=ve(E);if(!E&&R[c]&&(E=R),!E||E[P])return!1;const G=_&&_.eventNameToString,h={},I=E[P]=E[c],w=E[j(a)]=E[a],Q=E[j(m)]=E[m],oe=E[j(d)]=E[d];let z;_&&_.prepend&&(z=E[j(_.prepend)]=E[_.prepend]);const e=J?function(s){if(!h.isExisting)return I.call(h.target,h.eventName,h.capture?H:B,h.options)}:function(s){return I.call(h.target,h.eventName,s.invoke,h.options)},r=J?function(s){if(!s.isRemoved){const f=te[s.eventName];let g;f&&(g=f[s.capture?ie:ce]);const b=g&&s.target[g];if(b)for(let y=0;y<b.length;y++)if(b[y]===s){b.splice(y,1),s.isRemoved=!0,0===b.length&&(s.allRemoved=!0,s.target[g]=null);break}}if(s.allRemoved)return w.call(s.target,s.eventName,s.capture?H:B,s.options)}:function(s){return w.call(s.target,s.eventName,s.invoke,s.options)},C=_&&_.diff?_.diff:function(s,f){const g=typeof f;return"function"===g&&s.callback===f||"object"===g&&s.originalDelegate===f},$=Zone[j("UNPATCHED_EVENTS")],l=t[j("PASSIVE_EVENTS")],u=function(s,f,g,b,y=!1,S=!1){return function(){const D=this||t;let O=arguments[0];_&&_.transferEventName&&(O=_.transferEventName(O));let V=arguments[1];if(!V)return s.apply(this,arguments);if(Pe&&"uncaughtException"===O)return s.apply(this,arguments);let F=!1;if("function"!=typeof V){if(!V.handleEvent)return s.apply(this,arguments);F=!0}if(x&&!x(s,V,D,arguments))return;const fe=Ee&&!!l&&-1!==l.indexOf(O),se=function U(s,f){return!Ee&&"object"==typeof s&&s?!!s.capture:Ee&&f?"boolean"==typeof s?{capture:s,passive:!0}:s?"object"==typeof s&&!1!==s.passive?Object.assign(Object.assign({},s),{passive:!0}):s:{passive:!0}:s}(arguments[2],fe);if($)for(let de=0;de<$.length;de++)if(O===$[de])return fe?s.call(D,O,V,se):s.apply(this,arguments);const xe=!!se&&("boolean"==typeof se||se.capture),tt=!(!se||"object"!=typeof se)&&se.once,gt=Zone.current;let Ge=te[O];Ge||(Je(O,G),Ge=te[O]);const nt=Ge[xe?ie:ce];let Ce,ye=D[nt],rt=!1;if(ye){if(rt=!0,X)for(let de=0;de<ye.length;de++)if(C(ye[de],V))return}else ye=D[nt]=[];const ot=D.constructor.name,st=ze[ot];st&&(Ce=st[O]),Ce||(Ce=ot+f+(G?G(O):O)),h.options=se,tt&&(h.options.once=!1),h.target=D,h.capture=xe,h.eventName=O,h.isExisting=rt;const ke=J?ht:void 0;ke&&(ke.taskData=h);const he=gt.scheduleEventTask(Ce,V,ke,g,b);return h.target=null,ke&&(ke.taskData=null),tt&&(se.once=!0),!Ee&&"boolean"==typeof he.options||(he.options=se),he.target=D,he.capture=xe,he.eventName=O,F&&(he.originalDelegate=V),S?ye.unshift(he):ye.push(he),y?D:void 0}};return E[c]=u(I,v,e,r,A),z&&(E[p]=u(z,M,function(s){return z.call(h.target,h.eventName,s.invoke,h.options)},r,A,!0)),E[a]=function(){const s=this||t;let f=arguments[0];_&&_.transferEventName&&(f=_.transferEventName(f));const g=arguments[2],b=!!g&&("boolean"==typeof g||g.capture),y=arguments[1];if(!y)return w.apply(this,arguments);if(x&&!x(w,y,s,arguments))return;const S=te[f];let D;S&&(D=S[b?ie:ce]);const O=D&&s[D];if(O)for(let V=0;V<O.length;V++){const F=O[V];if(C(F,y))return O.splice(V,1),F.isRemoved=!0,0===O.length&&(F.allRemoved=!0,s[D]=null,"string"==typeof f)&&(s[pe+"ON_PROPERTY"+f]=null),F.zone.cancelTask(F),A?s:void 0}return w.apply(this,arguments)},E[m]=function(){const s=this||t;let f=arguments[0];_&&_.transferEventName&&(f=_.transferEventName(f));const g=[],b=Ke(s,G?G(f):f);for(let y=0;y<b.length;y++){const S=b[y];g.push(S.originalDelegate?S.originalDelegate:S.callback)}return g},E[d]=function(){const s=this||t;let f=arguments[0];if(f){_&&_.transferEventName&&(f=_.transferEventName(f));const g=te[f];if(g){const S=s[g[ce]],D=s[g[ie]];if(S){const O=S.slice();for(let V=0;V<O.length;V++){const F=O[V];this[a].call(this,f,F.originalDelegate?F.originalDelegate:F.callback,F.options)}}if(D){const O=D.slice();for(let V=0;V<O.length;V++){const F=O[V];this[a].call(this,f,F.originalDelegate?F.originalDelegate:F.callback,F.options)}}}}else{const g=Object.keys(s);for(let b=0;b<g.length;b++){const S=Ye.exec(g[b]);let D=S&&S[1];D&&"removeListener"!==D&&this[d].call(this,D)}this[d].call(this,"removeListener")}if(A)return this},le(E[c],I),le(E[a],w),oe&&le(E[d],oe),Q&&le(E[m],Q),!0}let q=[];for(let R=0;R<i.length;R++)q[R]=K(i[R],o);return q}function Ke(t,n){if(!n){const a=[];for(let m in t){const d=Ye.exec(m);let P=d&&d[1];if(P&&(!n||P===n)){const v=t[m];if(v)for(let p=0;p<v.length;p++)a.push(v[p])}}return a}let i=te[n];i||(Je(n),i=te[n]);const o=t[i[ce]],c=t[i[ie]];return o?c?o.concat(c):o.slice():c?c.slice():[]}function _t(t,n){const i=t.Event;i&&i.prototype&&n.patchMethod(i.prototype,"stopImmediatePropagation",o=>function(c,a){c[$e]=!0,o&&o.apply(c,a)})}function Et(t,n,i,o,c){const a=Zone.__symbol__(o);if(n[a])return;const m=n[a]=n[o];n[o]=function(d,P,v){return P&&P.prototype&&c.forEach(function(p){const M=`${i}.${o}::`+p,Z=P.prototype;try{if(Z.hasOwnProperty(p)){const N=t.ObjectGetOwnPropertyDescriptor(Z,p);N&&N.value?(N.value=t.wrapWithCurrentZone(N.value,M),t._redefineProperty(P.prototype,p,N)):Z[p]&&(Z[p]=t.wrapWithCurrentZone(Z[p],M))}else Z[p]&&(Z[p]=t.wrapWithCurrentZone(Z[p],M))}catch{}}),m.call(n,d,P,v)},t.attachOriginToPatched(n[o],m)}function Qe(t,n,i){if(!i||0===i.length)return n;const o=i.filter(a=>a.target===t);if(!o||0===o.length)return n;const c=o[0].ignoreProperties;return n.filter(a=>-1===c.indexOf(a))}function et(t,n,i,o){t&&qe(t,Qe(t,n,i),o)}function He(t){return Object.getOwnPropertyNames(t).filter(n=>n.startsWith("on")&&n.length>2).map(n=>n.substring(2))}Zone.__load_patch("util",(t,n,i)=>{const o=He(t);i.patchOnProperties=qe,i.patchMethod=ae,i.bindArguments=Me,i.patchMacroTask=lt;const c=n.__symbol__("BLACK_LISTED_EVENTS"),a=n.__symbol__("UNPATCHED_EVENTS");t[a]&&(t[c]=t[a]),t[c]&&(n[c]=n[a]=t[c]),i.patchEventPrototype=_t,i.patchEventTarget=dt,i.isIEOrEdge=ft,i.ObjectDefineProperty=me,i.ObjectGetOwnPropertyDescriptor=ue,i.ObjectCreate=Se,i.ArraySlice=it,i.patchClass=ge,i.wrapWithCurrentZone=Ie,i.filterProperties=Qe,i.attachOriginToPatched=le,i._redefineProperty=Object.defineProperty,i.patchCallbacks=Et,i.getGlobalObjects=()=>({globalSources:ze,zoneSymbolEventNames:te,eventNames:o,isBrowser:Ae,isMix:Be,isNode:Pe,TRUE_STR:ie,FALSE_STR:ce,ZONE_SYMBOL_PREFIX:pe,ADD_EVENT_LISTENER_STR:De,REMOVE_EVENT_LISTENER_STR:Oe})});const Re=j("zoneTask");function Te(t,n,i,o){let c=null,a=null;i+=o;const m={};function d(v){const p=v.data;return p.args[0]=function(){return v.invoke.apply(this,arguments)},p.handleId=c.apply(t,p.args),v}function P(v){return a.call(t,v.data.handleId)}c=ae(t,n+=o,v=>function(p,M){if("function"==typeof M[0]){const Z={isPeriodic:"Interval"===o,delay:"Timeout"===o||"Interval"===o?M[1]||0:void 0,args:M},N=M[0];M[0]=function(){try{return N.apply(this,arguments)}finally{Z.isPeriodic||("number"==typeof Z.handleId?delete m[Z.handleId]:Z.handleId&&(Z.handleId[Re]=null))}};const B=Le(n,M[0],Z,d,P);if(!B)return B;const H=B.data.handleId;return"number"==typeof H?m[H]=B:H&&(H[Re]=B),H&&H.ref&&H.unref&&"function"==typeof H.ref&&"function"==typeof H.unref&&(B.ref=H.ref.bind(H),B.unref=H.unref.bind(H)),"number"==typeof H||H?H:B}return v.apply(t,M)}),a=ae(t,i,v=>function(p,M){const Z=M[0];let N;"number"==typeof Z?N=m[Z]:(N=Z&&Z[Re],N||(N=Z)),N&&"string"==typeof N.type?"notScheduled"!==N.state&&(N.cancelFn&&N.data.isPeriodic||0===N.runCount)&&("number"==typeof Z?delete m[Z]:Z&&(Z[Re]=null),N.zone.cancelTask(N)):v.apply(t,M)})}Zone.__load_patch("legacy",t=>{const n=t[Zone.__symbol__("legacyPatch")];n&&n()}),Zone.__load_patch("queueMicrotask",(t,n,i)=>{i.patchMethod(t,"queueMicrotask",o=>function(c,a){n.current.scheduleMicroTask("queueMicrotask",a[0])})}),Zone.__load_patch("timers",t=>{const n="set",i="clear";Te(t,n,i,"Timeout"),Te(t,n,i,"Interval"),Te(t,n,i,"Immediate")}),Zone.__load_patch("requestAnimationFrame",t=>{Te(t,"request","cancel","AnimationFrame"),Te(t,"mozRequest","mozCancel","AnimationFrame"),Te(t,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",(t,n)=>{const i=["alert","prompt","confirm"];for(let o=0;o<i.length;o++)ae(t,i[o],(a,m,d)=>function(P,v){return n.current.run(a,t,v,d)})}),Zone.__load_patch("EventTarget",(t,n,i)=>{(function pt(t,n){n.patchEventPrototype(t,n)})(t,i),function mt(t,n){if(Zone[n.symbol("patchEventTarget")])return;const{eventNames:i,zoneSymbolEventNames:o,TRUE_STR:c,FALSE_STR:a,ZONE_SYMBOL_PREFIX:m}=n.getGlobalObjects();for(let P=0;P<i.length;P++){const v=i[P],Z=m+(v+a),N=m+(v+c);o[v]={},o[v][a]=Z,o[v][c]=N}const d=t.EventTarget;d&&d.prototype&&n.patchEventTarget(t,n,[d&&d.prototype])}(t,i);const o=t.XMLHttpRequestEventTarget;o&&o.prototype&&i.patchEventTarget(t,i,[o.prototype])}),Zone.__load_patch("MutationObserver",(t,n,i)=>{ge("MutationObserver"),ge("WebKitMutationObserver")}),Zone.__load_patch("IntersectionObserver",(t,n,i)=>{ge("IntersectionObserver")}),Zone.__load_patch("FileReader",(t,n,i)=>{ge("FileReader")}),Zone.__load_patch("on_property",(t,n,i)=>{!function Tt(t,n){if(Pe&&!Be||Zone[t.symbol("patchEvents")])return;const i=n.__Zone_ignore_on_properties;let o=[];if(Ae){const c=window;o=o.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);const a=function ut(){try{const t=_e.navigator.userAgent;if(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:c,ignoreProperties:["error"]}]:[];et(c,He(c),i&&i.concat(a),ve(c))}o=o.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let c=0;c<o.length;c++){const a=n[o[c]];a&&a.prototype&&et(a.prototype,He(a.prototype),i)}}(i,t)}),Zone.__load_patch("customElements",(t,n,i)=>{!function yt(t,n){const{isBrowser:i,isMix:o}=n.getGlobalObjects();(i||o)&&t.customElements&&"customElements"in t&&n.patchCallbacks(n,t.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"])}(t,i)}),Zone.__load_patch("XHR",(t,n)=>{!function P(v){const p=v.XMLHttpRequest;if(!p)return;const M=p.prototype;let N=M[Ze],B=M[Ne];if(!N){const h=v.XMLHttpRequestEventTarget;if(h){const I=h.prototype;N=I[Ze],B=I[Ne]}}const H="readystatechange",K="scheduled";function q(h){const I=h.data,w=I.target;w[a]=!1,w[d]=!1;const Q=w[c];N||(N=w[Ze],B=w[Ne]),Q&&B.call(w,H,Q);const oe=w[c]=()=>{if(w.readyState===w.DONE)if(!I.aborted&&w[a]&&h.state===K){const U=w[n.__symbol__("loadfalse")];if(0!==w.status&&U&&U.length>0){const re=h.invoke;h.invoke=function(){const ee=w[n.__symbol__("loadfalse")];for(let W=0;W<ee.length;W++)ee[W]===h&&ee.splice(W,1);!I.aborted&&h.state===K&&re.call(h)},U.push(h)}else h.invoke()}else!I.aborted&&!1===w[a]&&(w[d]=!0)};return N.call(w,H,oe),w[i]||(w[i]=h),E.apply(w,I.args),w[a]=!0,h}function R(){}function _(h){const I=h.data;return I.aborted=!0,G.apply(I.target,I.args)}const J=ae(M,"open",()=>function(h,I){return h[o]=0==I[2],h[m]=I[1],J.apply(h,I)}),X=j("fetchTaskAborting"),A=j("fetchTaskScheduling"),E=ae(M,"send",()=>function(h,I){if(!0===n.current[A]||h[o])return E.apply(h,I);{const w={target:h,url:h[m],isPeriodic:!1,args:I,aborted:!1},Q=Le("XMLHttpRequest.send",R,w,q,_);h&&!0===h[d]&&!w.aborted&&Q.state===K&&Q.invoke()}}),G=ae(M,"abort",()=>function(h,I){const w=function Z(h){return h[i]}(h);if(w&&"string"==typeof w.type){if(null==w.cancelFn||w.data&&w.data.aborted)return;w.zone.cancelTask(w)}else if(!0===n.current[X])return G.apply(h,I)})}(t);const i=j("xhrTask"),o=j("xhrSync"),c=j("xhrListener"),a=j("xhrScheduled"),m=j("xhrURL"),d=j("xhrErrorBeforeScheduled")}),Zone.__load_patch("geolocation",t=>{t.navigator&&t.navigator.geolocation&&function at(t,n){const i=t.constructor.name;for(let o=0;o<n.length;o++){const c=n[o],a=t[c];if(a){if(!Ve(ue(t,c)))continue;t[c]=(d=>{const P=function(){return d.apply(this,Me(arguments,i+"."+c))};return le(P,d),P})(a)}}}(t.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",(t,n)=>{function i(o){return function(c){Ke(t,o).forEach(m=>{const d=t.PromiseRejectionEvent;if(d){const P=new d(o,{promise:c.promise,reason:c.rejection});m.invoke(P)}})}}t.PromiseRejectionEvent&&(n[j("unhandledPromiseRejectionHandler")]=i("unhandledrejection"),n[j("rejectionHandledHandler")]=i("rejectionhandled"))})}},ue=>{ue(ue.s=583)}]);