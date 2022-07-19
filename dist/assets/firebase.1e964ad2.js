import{e as $,_ as De,h as Fe,i as $e,C as Me,k as ce,l as je,F as qe,B as He,g as ze,f as ge,V as p,U as b,K as T,w as k,W as We,T as me,m as _e,n as _,p as P,o as L,Q as te,d as Ne,q as W,t as N,I as Xe}from"./index.a110b74a.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="firebasestorage.googleapis.com",Re="storageBucket",Ke=2*60*1e3,Ge=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d extends qe{constructor(e,n){super(J(e),`Firebase Storage: ${n} (${J(e)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,d.prototype)}_codeEquals(e){return J(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function J(t){return"storage/"+t}function ne(){const t="An unknown error occurred, please check the error payload for server response.";return new d("unknown",t)}function Ve(t){return new d("object-not-found","Object '"+t+"' does not exist.")}function Ye(t){return new d("quota-exceeded","Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Qe(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new d("unauthenticated",t)}function Je(){return new d("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function Ze(t){return new d("unauthorized","User does not have permission to access '"+t+"'.")}function et(){return new d("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function tt(){return new d("canceled","User canceled the upload/download.")}function nt(t){return new d("invalid-url","Invalid URL '"+t+"'.")}function st(t){return new d("invalid-default-bucket","Invalid default bucket '"+t+"'.")}function ot(){return new d("no-default-bucket","No default bucket found. Did you set the '"+Re+"' property when initializing the app?")}function rt(){return new d("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function at(){return new d("no-download-url","The given file does not have any download URLs.")}function ee(t){return new d("invalid-argument",t)}function ye(){return new d("app-deleted","The Firebase app was deleted.")}function it(t){return new d("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function F(t,e){return new d("invalid-format","String does not match format '"+t+"': "+e)}function D(t){throw new d("internal-error","Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=y.makeFromUrl(e,n)}catch{return new y(e,"")}if(s.path==="")return s;throw st(e)}static makeFromUrl(e,n){let s=null;const o="([A-Za-z0-9.\\-_]+)";function r(R){R.path.charAt(R.path.length-1)==="/"&&(R.path_=R.path_.slice(0,-1))}const a="(/(.*))?$",i=new RegExp("^gs://"+o+a,"i"),c={bucket:1,path:3};function u(R){R.path_=decodeURIComponent(R.path)}const h="v[A-Za-z0-9_]+",g=n.replace(/[.]/g,"\\."),f="(/([^?#]*).*)?$",U=new RegExp(`^https?://${g}/${h}/b/${o}/o${f}`,"i"),S={bucket:1,path:3},O=n===we?"(?:storage.googleapis.com|storage.cloud.google.com)":n,w="([^?#]*)",B=new RegExp(`^https?://${O}/${o}/${w}`,"i"),x=[{regex:i,indices:c,postModify:r},{regex:U,indices:S,postModify:u},{regex:B,indices:{bucket:1,path:2},postModify:u}];for(let R=0;R<x.length;R++){const q=x[R],Y=q.regex.exec(e);if(Y){const Le=Y[q.indices.bucket];let Q=Y[q.indices.path];Q||(Q=""),s=new y(Le,Q),q.postModify(s);break}}if(s==null)throw nt(e);return s}}class ct{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(t,e,n){let s=1,o=null,r=null,a=!1,i=0;function c(){return i===2}let u=!1;function h(...w){u||(u=!0,e.apply(null,w))}function g(w){o=setTimeout(()=>{o=null,t(U,c())},w)}function f(){r&&clearTimeout(r)}function U(w,...B){if(u){f();return}if(w){f(),h.call(null,w,...B);return}if(c()||a){f(),h.call(null,w,...B);return}s<64&&(s*=2);let x;i===1?(i=2,x=0):x=(s+Math.random())*1e3,g(x)}let S=!1;function O(w){S||(S=!0,f(),!u&&(o!==null?(w||(i=2),clearTimeout(o),g(0)):w||(i=1)))}return g(0),r=setTimeout(()=>{a=!0,O(!0)},n),O}function lt(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t){return t!==void 0}function dt(t){return typeof t=="object"&&!Array.isArray(t)}function se(t){return typeof t=="string"||t instanceof String}function ue(t){return oe()&&t instanceof Blob}function oe(){return typeof Blob<"u"}function le(t,e,n,s){if(s<e)throw ee(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw ee(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(t,e,n){let s=e;return n==null&&(s=`https://${e}`),`${n}://${s}/v0${t}`}function be(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const o=e(s)+"="+e(t[s]);n=n+o+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var E;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(E||(E={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,n,s,o,r,a,i,c,u,h,g){this.url_=e,this.method_=n,this.headers_=s,this.body_=o,this.successCodes_=r,this.additionalRetryCodes_=a,this.callback_=i,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=h,this.connectionFactory_=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((f,U)=>{this.resolve_=f,this.reject_=U,this.start_()})}start_(){const e=(s,o)=>{if(o){s(!1,new H(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const a=i=>{const c=i.loaded,u=i.lengthComputable?i.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&r.addUploadProgressListener(a),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(a),this.pendingConnection_=null;const i=r.getErrorCode()===E.NO_ERROR,c=r.getStatus();if(!i||this.isRetryStatusCode_(c)){const h=r.getErrorCode()===E.ABORT;s(!1,new H(!1,null,h));return}const u=this.successCodes_.indexOf(c)!==-1;s(!0,new H(u,r))})},n=(s,o)=>{const r=this.resolve_,a=this.reject_,i=o.connection;if(o.wasSuccessCode)try{const c=this.callback_(i,i.getResponse());ht(c)?r(c):r()}catch(c){a(c)}else if(i!==null){const c=ne();c.serverResponse=i.getErrorText(),this.errorCallback_?a(this.errorCallback_(i,c)):a(c)}else if(o.canceled){const c=this.appDelete_?ye():tt();a(c)}else{const c=et();a(c)}};this.canceled_?n(!1,new H(!1,null,!0)):this.backoffId_=ut(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&lt(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}isRetryStatusCode_(e){const n=e>=500&&e<600,o=[408,429].indexOf(e)!==-1,r=this.additionalRetryCodes_.indexOf(e)!==-1;return n||o||r}}class H{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}}function pt(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function gt(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e!=null?e:"AppManager")}function mt(t,e){e&&(t["X-Firebase-GMPID"]=e)}function _t(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function wt(t,e,n,s,o,r){const a=be(t.urlParams),i=t.url+a,c=Object.assign({},t.headers);return mt(c,e),pt(c,n),gt(c,r),_t(c,s),new ft(i,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function yt(...t){const e=Rt();if(e!==void 0){const n=new e;for(let s=0;s<t.length;s++)n.append(t[s]);return n.getBlob()}else{if(oe())return new Blob(t);throw new d("unsupported-environment","This browser doesn't seem to support creating Blobs")}}function bt(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(t){return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Z{constructor(e,n){this.data=e,this.contentType=n||null}}function ke(t,e){switch(t){case C.RAW:return new Z(Te(e));case C.BASE64:case C.BASE64URL:return new Z(Ue(t,e));case C.DATA_URL:return new Z(Ut(e),Ct(e))}throw ne()}function Te(t){const e=[];for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);if(s<=127)e.push(s);else if(s<=2047)e.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const r=s,a=t.charCodeAt(++n);s=65536|(r&1023)<<10|a&1023,e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?e.push(239,191,189):e.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(e)}function Tt(t){let e;try{e=decodeURIComponent(t)}catch{throw F(C.DATA_URL,"Malformed data URL.")}return Te(e)}function Ue(t,e){switch(t){case C.BASE64:{const o=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(o||r)throw F(t,"Invalid character '"+(o?"-":"_")+"' found: is it base64url encoded?");break}case C.BASE64URL:{const o=e.indexOf("+")!==-1,r=e.indexOf("/")!==-1;if(o||r)throw F(t,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=kt(e)}catch{throw F(t,"Invalid character found")}const s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s}class Ce{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw F(C.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=Pt(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=e.substring(e.indexOf(",")+1)}}function Ut(t){const e=new Ce(t);return e.base64?Ue(C.BASE64,e.rest):Tt(e.rest)}function Ct(t){return new Ce(t).contentType}function Pt(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e,n){let s=0,o="";ue(e)?(this.data_=e,s=e.size,o=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),s=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),s=e.length),this.size_=s,this.type_=o}size(){return this.size_}type(){return this.type_}slice(e,n){if(ue(this.data_)){const s=this.data_,o=bt(s,e,n);return o===null?null:new A(o)}else{const s=new Uint8Array(this.data_.buffer,e,n-e);return new A(s,!0)}}static getBlob(...e){if(oe()){const n=e.map(s=>s instanceof A?s.data_:s);return new A(yt.apply(null,n))}else{const n=e.map(a=>se(a)?ke(C.RAW,a).data:a.data_);let s=0;n.forEach(a=>{s+=a.byteLength});const o=new Uint8Array(s);let r=0;return n.forEach(a=>{for(let i=0;i<a.length;i++)o[r++]=a[i]}),new A(o,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(t){let e;try{e=JSON.parse(t)}catch{return null}return dt(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function xt(t,e){const n=e.split("/").filter(s=>s.length>0).join("/");return t.length===0?n:t+"/"+n}function Se(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t,e){return e}class m{constructor(e,n,s,o){this.server=e,this.local=n||e,this.writable=!!s,this.xform=o||At}}let z=null;function It(t){return!se(t)||t.length<2?t:Se(t)}function xe(){if(z)return z;const t=[];t.push(new m("bucket")),t.push(new m("generation")),t.push(new m("metageneration")),t.push(new m("name","fullPath",!0));function e(r,a){return It(a)}const n=new m("name");n.xform=e,t.push(n);function s(r,a){return a!==void 0?Number(a):a}const o=new m("size");return o.xform=s,t.push(o),t.push(new m("timeCreated")),t.push(new m("updated")),t.push(new m("md5Hash",null,!0)),t.push(new m("cacheControl",null,!0)),t.push(new m("contentDisposition",null,!0)),t.push(new m("contentEncoding",null,!0)),t.push(new m("contentLanguage",null,!0)),t.push(new m("contentType",null,!0)),t.push(new m("metadata","customMetadata",!0)),z=t,z}function Et(t,e){function n(){const s=t.bucket,o=t.fullPath,r=new y(s,o);return e._makeStorageReference(r)}Object.defineProperty(t,"ref",{get:n})}function vt(t,e,n){const s={};s.type="file";const o=n.length;for(let r=0;r<o;r++){const a=n[r];s[a.local]=a.xform(s,e[a.server])}return Et(s,t),s}function Ae(t,e,n){const s=Pe(e);return s===null?null:vt(t,s,n)}function Ot(t,e,n,s){const o=Pe(e);if(o===null||!se(o.downloadTokens))return null;const r=o.downloadTokens;if(r.length===0)return null;const a=encodeURIComponent;return r.split(",").map(u=>{const h=t.bucket,g=t.fullPath,f="/b/"+a(h)+"/o/"+a(g),U=X(f,n,s),S=be({alt:"media",token:u});return U+S})[0]}function Bt(t,e){const n={},s=e.length;for(let o=0;o<s;o++){const r=e[o];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}class re{constructor(e,n,s,o){this.url=e,this.method=n,this.handler=s,this.timeout=o,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(t){if(!t)throw ne()}function Lt(t,e){function n(s,o){const r=Ae(t,o,e);return Ie(r!==null),r}return n}function Dt(t,e){function n(s,o){const r=Ae(t,o,e);return Ie(r!==null),Ot(r,o,t.host,t._protocol)}return n}function Ee(t){function e(n,s){let o;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?o=Je():o=Qe():n.getStatus()===402?o=Ye(t.bucket):n.getStatus()===403?o=Ze(t.path):o=s,o.serverResponse=s.serverResponse,o}return e}function ve(t){const e=Ee(t);function n(s,o){let r=e(s,o);return s.getStatus()===404&&(r=Ve(t.path)),r.serverResponse=o.serverResponse,r}return n}function Ft(t,e,n){const s=e.fullServerUrl(),o=X(s,t.host,t._protocol),r="GET",a=t.maxOperationRetryTime,i=new re(o,r,Dt(t,n),a);return i.errorHandler=ve(e),i}function $t(t,e){const n=e.fullServerUrl(),s=X(n,t.host,t._protocol),o="DELETE",r=t.maxOperationRetryTime;function a(c,u){}const i=new re(s,o,a,r);return i.successCodes=[200,204],i.errorHandler=ve(e),i}function Mt(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function jt(t,e,n){const s=Object.assign({},n);return s.fullPath=t.path,s.size=e.size(),s.contentType||(s.contentType=Mt(null,e)),s}function qt(t,e,n,s,o){const r=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function i(){let x="";for(let R=0;R<2;R++)x=x+Math.random().toString().slice(2);return x}const c=i();a["Content-Type"]="multipart/related; boundary="+c;const u=jt(e,s,o),h=Bt(u,n),g="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,f=`\r
--`+c+"--",U=A.getBlob(g,s,f);if(U===null)throw rt();const S={name:u.fullPath},O=X(r,t.host,t._protocol),w="POST",B=t.maxUploadRetryTime,I=new re(O,w,Lt(t,n),B);return I.urlParams=S,I.headers=a,I.body=U.uploadData(),I.errorHandler=Ee(e),I}class Ht{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=E.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=E.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=E.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,s,o){if(this.sent_)throw D("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),o!==void 0)for(const r in o)o.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,o[r].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw D("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw D("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw D("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw D("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class zt extends Ht{initXhr(){this.xhr_.responseType="text"}}function ae(){return new zt}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e,n){this._service=e,n instanceof y?this._location=n:this._location=y.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new v(e,n)}get root(){const e=new y(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Se(this._location.path)}get storage(){return this._service}get parent(){const e=St(this._location.path);if(e===null)return null;const n=new y(this._location.bucket,e);return new v(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw it(e)}}function Wt(t,e,n){t._throwIfRoot("uploadBytes");const s=qt(t.storage,t._location,xe(),new A(e,!0),n);return t.storage.makeRequestWithTokens(s,ae).then(o=>({metadata:o,ref:t}))}function Nt(t,e,n=C.RAW,s){t._throwIfRoot("uploadString");const o=ke(n,e),r=Object.assign({},s);return r.contentType==null&&o.contentType!=null&&(r.contentType=o.contentType),Wt(t,o.data,r)}function Xt(t){t._throwIfRoot("getDownloadURL");const e=Ft(t.storage,t._location,xe());return t.storage.makeRequestWithTokens(e,ae).then(n=>{if(n===null)throw at();return n})}function Kt(t){t._throwIfRoot("deleteObject");const e=$t(t.storage,t._location);return t.storage.makeRequestWithTokens(e,ae)}function Gt(t,e){const n=xt(t._location.path,e),s=new y(t._location.bucket,n);return new v(t.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t){return/^[A-Za-z]+:\/\//.test(t)}function Yt(t,e){return new v(t,e)}function Oe(t,e){if(t instanceof ie){const n=t;if(n._bucket==null)throw ot();const s=new v(n,n._bucket);return e!=null?Oe(s,e):s}else return e!==void 0?Gt(t,e):t}function Qt(t,e){if(e&&Vt(e)){if(t instanceof ie)return Yt(t,e);throw ee("To use ref(service, url), the first argument must be a Storage instance.")}else return Oe(t,e)}function he(t,e){const n=e==null?void 0:e[Re];return n==null?null:y.makeFromBucketSpec(n,t)}class ie{constructor(e,n,s,o,r){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=o,this._firebaseVersion=r,this._bucket=null,this._host=we,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ke,this._maxUploadRetryTime=Ge,this._requests=new Set,o!=null?this._bucket=y.makeFromBucketSpec(o,this._host):this._bucket=he(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=y.makeFromBucketSpec(this._url,e):this._bucket=he(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){le("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){le("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new v(this,e)}_makeRequest(e,n,s,o){if(this._deleted)return new ct(ye());{const r=wt(e,this._appId,s,o,n,this._firebaseVersion);return this._requests.add(r),r.getPromise().then(()=>this._requests.delete(r),()=>this._requests.delete(r)),r}}async makeRequestWithTokens(e,n){const[s,o]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,o).getPromise()}}const de="@firebase/storage",fe="0.9.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="storage";function K(t,e,n,s){return t=$(t),Nt(t,e,n,s)}function G(t){return t=$(t),Xt(t)}function Jt(t){return t=$(t),Kt(t)}function M(t,e){return t=$(t),Qt(t,e)}function Zt(t=Fe(),e){return t=$(t),De(t,Be).getImmediate({identifier:e})}function en(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new ie(n,s,o,e,je)}function tn(){$e(new Me(Be,en,"PUBLIC").setMultipleInstances(!0)),ce(de,fe,""),ce(de,fe,"esm2017")}tn();const l=He(ge),j=Zt(ge),pe=ze();async function an(t){const e=p(l,"users"),n=b(e,T("username","==",t));return(await k(n)).docs.map(r=>r.data().length>0)}async function nn(t){const e=p(l,"users"),n=b(e,T("username","==",t));return(await k(n)).docs.map(r=>({...r.data(),id:r.id}))}async function V(t){const e=p(l,"users"),n=b(e,T("userId","==",t));return(await k(n)).docs.map(r=>({...r.data(),id:r.id}))}async function cn(t,e){const n=p(l,"users"),s=b(n,We(10));return(await k(s)).docs.map(a=>({...a.data(),id:a.id})).filter(a=>a.userId!==t&&!e.includes(a.userId))}async function sn(t,e,n){const s=_(l,"users",t);await P(s,{following:n?W(e):N(e)})}async function on(t,e,n){const s=_(l,"users",t);await P(s,{followers:n?W(e):N(e)})}async function un(t,e){const n=p(l,"photos"),s=b(n,T("userId","in",e)),r=(await k(s)).docs.map(i=>({...i.data(),id:i.id}));return await Promise.all(r.map(async i=>{var u;let c=!1;return(u=i.likes)==null||u.map(h=>{h===t&&(c=!0)}),{...i,userLikedPhoto:c}}))}async function ln(t,e,n){const s=_(l,"photos",t);await P(s,{likes:n?W(e):N(e)})}async function hn(t,e,n,s,o){const r=await me(p(l,"photos"),{caption:s,likes:[],username:e,userId:t,userImage:n,timestamp:_e()}),a=M(j,`posts/${r.id}/image`);await K(a,o,"data_url").then(async i=>{const c=await G(a),u=_(l,"photos",r.id);await P(u,{imageSrc:c})})}async function dn(t,e,n,s){const o=p(l,"photos",t,"comments");await me(o,{comment:e,username:n,userImage:s,likes:[],timestamp:_e()})}function fn(t){const e=p(l,"photos",t,"comments");return b(e,te("timestamp","desc"))}async function pn(t){const e=_(l,"photos",t),o=(await L(e)).data().likes.map(async a=>await V(a));return await Promise.all(o)}async function gn(t){const[e]=await nn(t),n=p(l,"photos"),s=b(n,T("userId","==",e.userId),te("timestamp","desc"));return(await k(s)).docs.map(a=>({...a.data(),id:a.id}))}async function mn(t,e){const n=p(l,"users"),s=b(n,T("username","==",t),T("following","array-contains",e)),o=await k(s),[r={}]=o.docs.map(a=>({...a.data(),id:a.id}));return r.userId}async function _n(t,e,n,s,o){await sn(e,s,t),await on(n,o,t)}async function wn(t,e,n,s,o,r,a,i,c){const u=M(j,`users/${e}/image`),h=_(l,"users",t);c?await K(u,c,"data_url").then(async g=>{const f=await G(u);await P(h,{username:r||n,fullName:a||s,image:f,bio:i||o})}):await P(h,{username:r||n,fullName:a||s})}async function Rn(t,e){Ne(pe.currentUser,{displayName:e||t}).then(()=>{console.log(pe.currentUser)})}async function yn(t){const e=_(l,"users",t),o=(await L(e)).data().followers.map(async a=>await V(a));return await Promise.all(o)}async function bn(t){const e=_(l,"users",t),o=(await L(e)).data().following.map(async a=>await V(a));return await Promise.all(o)}async function kn(t){const e=p(l,"photos",t,"comments"),n=b(e,T("username","!=",""));return(await k(n)).size}async function Tn(t){await Xe(_(l,"photos",t));const e=M(j,`posts/${t}/image`);await Jt(e).then(()=>{console.log("Deleted")})}async function Un(t,e){var c;const n=p(l,"photos"),s=b(n,T("userId","==",e),te("timestamp","desc")),a=(await k(s)).docs.map(u=>({...u.data(),id:u.id}))[0];let i=!1;return(c=a.likes)==null||c.map(u=>{u===t&&(i=!0)}),{...a,userLikedPhoto:i}}async function Cn(t,e,n,s){const o=_(l,"photos",t,"comments",e);await P(o,{likes:s?W(n):N(n)})}async function Pn(t,e,n){const s=_(l,"photos",t,"comments",e);return!!(await L(s)).data().likes.includes(n)}async function Sn(t,e){const n=_(l,"photos",t,"comments",e),r=(await L(n)).data().likes.map(async i=>await V(i));return await Promise.all(r)}async function xn(t,e,n){const s=p(l,"photos"),o=b(s,T("username","==",t));(await k(o)).forEach(async a=>{const i=_(s,a.id),c=M(j,`posts/${a.id}/user/image`);n?await K(c,n,"data_url").then(async u=>{const h=await G(c);await P(i,{username:e||t,userImage:h})}):await P(i,{username:e||t})})}async function An(t,e,n){const s=p(l,"photos"),o=b(s,T("username","!=",""));(await k(o)).forEach(async a=>{const i=p(s,a.id,"comments"),c=b(i,T("username","==",t));(await k(c)).forEach(async h=>{console.log("changing");const g=_(i,h.id),f=M(j,`posts/${a.id}/comments/${h.id}/user/image`);n?await K(f,n,"data_url").then(async U=>{const S=await G(f);await P(g,{username:e||t,userImage:S})}):await P(g,{username:e||t}),console.log("changed")})})}async function In(){const t=p(l,"users");return(await k(t)).docs.map(s=>({...s.data(),id:s.id}))}async function En(t,e){var r;const n=_(l,"photos",t),s=await L(n);let o=!1;return(r=s.data().likes)==null||r.map(a=>{a===e&&(o=!0)}),{...s.data(),userLikedPhoto:o}}export{bn as A,En as B,nn as C,In as a,on as b,cn as c,an as d,un as e,Un as f,V as g,pn as h,Sn as i,Tn as j,ln as k,Pn as l,Cn as m,fn as n,dn as o,hn as p,mn as q,kn as r,gn as s,_n as t,sn as u,xn as v,An as w,wn as x,Rn as y,yn as z};
