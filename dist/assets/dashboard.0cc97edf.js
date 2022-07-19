import{r as c,j as e,a as r,G as n,L as x,v,y as b,x as g,b as q}from"./index.a110b74a.js";import{u as I,l as A,W as p,m as f,c as M,S as $,H as D}from"./SearchBarModal.f793de82.js";import{S as h,H as B,I as H,B as E,C as O,a as _,p as k,X as P,b as T,c as G,P as W,T as Y}from"./TopScroll.40685bfb.js";import{u as z,b as X,c as J,g as w,e as V,f as K,h as Q,i as Z}from"./firebase.1e964ad2.js";function ee(s,t){return e("svg",{...Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},s),children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})})}const se=c.exports.forwardRef(ee),te=se;function re(){return e("div",{className:"mt-4 ml-5",children:r("div",{className:"flex flex-col justify-between mb-5",children:[e("h3",{className:"font-semibold text-gray-500",children:e(h,{width:150})}),Array.from({length:3}).map((s,t)=>r("div",{className:"flex items-center justify-between mt-3",children:[e(h,{width:46,height:46,circle:!0}),r("div",{className:"flex-1 ml-4",children:[e(h,{width:150}),e(h,{width:150})]})]},t))]})})}function ae(){return r("div",{className:"flex items-center justify-between ml-4 mt-2",children:[e(h,{width:56,height:56,circle:!0}),r("div",{className:"flex-1 mx-4 ",children:[e(h,{width:150}),e(h,{width:150})]})]})}function U({username:s,fullName:t,image:l}){return!s||!t?e(ae,{}):r(x,{to:`/profile/${s}`,className:"flex items-center justify-between ml-4 my-2",children:[e("img",{src:l,alt:`${s}`,className:"h-14 w-14 rounded-full border-2 p-[2px] border-gray-300 cursor-pointer object-cover text-center"}),r("div",{className:"flex-1 mx-4 text-sm",children:[e("h2",{className:"font-semibold text-gray-700 cursor-pointer",children:s}),e("h3",{className:" text-gray-400",children:t})]})]})}U.propTypes={username:n.exports.string,fullName:n.exports.string,image:n.exports.string};function j({profileDocId:s,loggedInUserDocId:t,username:l,userImage:a,profileId:i,loggedInUserId:d}){const[o,u]=c.exports.useState(!1);async function m(){u(!0),await z(t,i,!1),await X(s,d,!1),setTimeout(()=>{document.location.reload()},5e3)}return o?null:r("div",{className:"mt-3 flex items-center justify-between",children:[e("img",{src:a,alt:`${l}`,className:"h-12 w-12 cursor-pointer rounded-full border-2 border-gray-300 object-cover p-[2px]"}),r(x,{to:`/profile/${l}`,className:"ml-4 mr-2 flex-1",children:[e("h2",{className:"cursor-pointer text-sm font-semibold",children:l}),e("h3",{className:"truncate text-xs text-gray-400",children:"New To Instagram"})]}),e("button",{className:"mb-4 text-xs font-semibold text-blue-500",onClick:m,children:"Follow"})]})}j.propType={profileDocId:n.exports.string.isRequired,username:n.exports.string.isRequired,userImage:n.exports.string.isRequired,profileId:n.exports.string.isRequired,loggedInUserId:n.exports.string.isRequired,loggedInUserDocId:n.exports.string.isRequired};function N({userId:s,following:t,loggedInUserDocId:l}){const[a,i]=c.exports.useState(null);return c.exports.useEffect(()=>{async function d(){const o=await J(s,t);i(o)}s&&d()},[s]),a?a.length>0?e("div",{className:"mt-4 ml-5",children:r("div",{className:"flex flex-col justify-between text-sm mb-5",children:[e("h3",{className:"font-semibold text-gray-500",children:"Suggestions For You"}),a.map(d=>e(j,{profileDocId:d.id,username:d.username,userImage:d.image,profileId:d.userId,loggedInUserId:s,loggedInUserDocId:l},d.id))]})}):null:e(re,{})}N.propTypes={userId:n.exports.string,following:n.exports.array,loggedInUserDocId:n.exports.string};function le(){return r("div",{className:"ml-5 space-y-1 text-gray-400 text-xs font-normal border-t-2 py-2",children:[e("a",{href:"",children:"About \u2022 "}),e("a",{href:"",children:"Help \u2022 "}),e("a",{href:"",children:"Press \u2022 "}),e("a",{href:"",children:"API \u2022 "}),e("a",{href:"",children:"Jobs \u2022 "}),e("br",{}),e("a",{href:"",children:"Privacy \u2022 "}),e("a",{href:"",children:"Terms \u2022 "}),e("a",{href:"",children:"Locations \u2022 "}),e("br",{}),e("a",{href:"",children:"Top Accounts \u2022 "}),e("a",{href:"",children:"Hashtags \u2022 "}),e("a",{href:"",children:"Language"}),e("p",{className:"pt-4",children:"\xA9 2022 INSTAGRAM 2.0 BY DIVYAM"}),r("p",{className:"pt-4",children:["Note : This clone has been made only ",e("br",{})," for educational purposes. No"," ",e("br",{})," copyright intended."]})]})}function ie(){const{user:{id:s,username:t,image:l,fullName:a,userId:i,following:d}}=I();return r("div",{className:"fixed top-20 bottom-0 overflow-y-scroll scrollbar-hide",children:[e(U,{username:t,fullName:a,image:l}),e(N,{userId:i,following:d,loggedInUserDocId:s}),e(le,{})]})}function S({userId:s}){const[t,l]=c.exports.useState(null),{user:{uid:a=""}}=c.exports.useContext(v);return c.exports.useEffect(()=>{async function i(){const[{following:d}]=await w(a);let o=[];if(d.length>0&&(o=await V(a,d)),o.sort((u,m)=>m.timestamp-u.timestamp),l(o),s){const u=await K(a,s);l(m=>[u,...m])}}i()},[a,s]),{photos:t}}S.propTypes={activeUserId:n.exports.string};function F({content:s}){var a;const t=()=>l.current.focus(),l=c.exports.useRef(null);return r("div",{className:"container bg-white my-5 border rounded-md divide-y shadow-md",children:[e(B,{id:s.id,username:s.username,userImage:s.userImage}),e(H,{src:s.imageSrc,caption:s.caption}),r("div",{children:[e(E,{id:s.id,totalLikes:(a=s.likes)==null?void 0:a.length,likedPhoto:s.userLikedPhoto,handleFocus:t}),e(O,{caption:s.caption,username:s.username})]}),e("div",{children:e(_,{id:s.id,postedAt:s.timestamp,commentInput:l})})]})}F.propTypes={content:n.exports.shape({username:n.exports.string.isRequired,userImage:n.exports.string.isRequired,imageSrc:n.exports.string.isRequired,caption:n.exports.string.isRequired,id:n.exports.string.isRequired,userLikedPhoto:n.exports.bool.isRequired,likes:n.exports.array,timestamp:n.exports.object.isRequired})};function L({activeUserId:s,following:t}){const[l,a]=c.exports.useState([]);return t&&c.exports.useEffect(()=>{s&&(async()=>{t.map(async o=>{(await w(o)).map(m=>{a(y=>[...y,m])})});const d=await w(s);a(o=>[d[0],...o])})()},[s]),t&&e("div",{className:"container bg-white mt-5 border rounded-md  shadow-sm overflow-hidden",children:e("div",{className:"flex space-x-2 overflow-y-scroll scrollbar-hide p-2 w-full h-full",children:l.map(i=>r("div",{className:"flex  flex-col justify-center text-center items-center max-w-full relative h-full",children:[e("img",{src:i.image,alt:i.username,className:"rounded-full h-16 w-16 object-cover border-gradient-t-insta-gray-50 border-solid border-2 border-transparent p-[2px] cursor-pointer"}),(i==null?void 0:i.userId)===s&&e("span",{className:"absolute top-[50%] -right-1 border-white rounded-full border-2 bg-white",children:e(te,{className:"h-5 bg-blue-500 bg-opacity-80 rounded-full p-[2px] text-white shadow-md  "})}),e(x,{to:`/profile/${i.username}`,className:"text-xs text-center text-gray-500",children:e("p",{className:"truncate w-[70px]",children:i.username})})]},i.id))})})}L.propTypes={activeUserId:n.exports.string,following:n.exports.array};function oe(){return r("div",{children:[e("div",{className:" flex items-center justify-center ",children:e("div",{className:"mt-5 flex max-w-[360px] space-x-2 overflow-hidden rounded-md border bg-white p-2 shadow-sm scrollbar-hide",children:Array.from({length:10}).map((s,t)=>e(h,{width:60,height:60,circle:!0},t))})}),Array.from({length:4}).map((s,t)=>e("div",{className:" flex items-center justify-center ",children:r("div",{className:" my-5 max-w-[360px] rounded-md border bg-white shadow-md ",children:[r("div",{className:"flex items-center p-3",children:[e(h,{width:50,height:50,circle:!0}),e("p",{className:"flex-1 pl-4 ",children:e(h,{width:150})})]}),e("div",{className:"w-full",children:e(h,{width:360,height:400})}),e("p",{className:"truncate p-4",children:e(h,{width:320})})]},t)},t))]})}function ne(){const{user:{id:s,userId:t,following:l}}=I(),{photos:a}=S({userId:t});return a?(a==null?void 0:a.length)>0?r(b,{children:[e(L,{activeUserId:t,following:l}),a.map(i=>e("div",{className:"",children:e(F,{content:i},i.id)},i.id))]}):r(b,{children:[r("div",{className:"my-4 flex h-[25vh] flex-col items-center justify-center space-y-4 text-center ",children:[e("p",{className:"text-3xl font-bold",children:"Hey There !!!"}),e("p",{className:"text-lg font-semibold text-gray-600",children:"Please follow some accounts from the suggestions list to view their posts."})]}),e("div",{className:"mr-4 -mt-4 md:hidden",children:e(N,{userId:t,following:l,loggedInUserDocId:s})})]}):e(oe,{})}function ce(){const[s,t]=g(A),[l,a]=c.exports.useState([]),[i,d]=g(k);return c.exports.useEffect(()=>{s?i!==""&&(async()=>(await Q(i)).map(m=>{a(y=>[...y,m[0]])}))():(d(""),a([]))},[i,s]),e(p.Root,{show:s,as:c.exports.Fragment,children:e(f,{as:"div",className:"fixed inset-0 overflow-y-auto z-[60]",onClose:t,children:r("div",{className:"flex items-center justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:block m-2 sm:p-0",children:[e(p.Child,{as:c.exports.Fragment,enter:"ease-out duration-500",enterFrom:"opactiy-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e(f.Overlay,{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),e("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200B"}),e(p.Child,{as:c.exports.Fragment,enter:"ease-out duration-500",enterFrom:"opactiy-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:r("div",{className:"inline-block align-bottom bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full sm:p-6 space-y-4",children:[e("button",{className:"outline-none float-right",onClick:()=>t(!1),children:e(P,{className:" h-6  w-6 cursor-pointer text-gray-300"})}),r("div",{as:"h3",className:"flex items-center space-x-4  text-2xl ",children:[e("div",{className:" flex items-center justify-center h-14 w-14 rounded-full bg-red-100",children:e(T,{className:"h-8 w-8 text-red-600 mt-[2px]"})}),e("span",{children:"Likes"})]}),e("hr",{}),e("div",{className:"overflow-y-scroll scrollbar-hide space-y-3 max-h-96",children:l==null?void 0:l.map(o=>r("div",{className:"flex items-center",children:[e("img",{src:o.image,alt:`${o==null?void 0:o.username}`,className:"rounded-full w-14 h-14 object-cover border-2 border-gray-300 p-[2px] text-center mr-3"}),r(f.Title,{as:"h3",className:"font-bold text-gray-800",children:[e(x,{to:`/profile/${o.username}`,onClick:()=>t(!1),children:o.username}),e("p",{className:"text-gray-600 -mt-[2px] font-medium ",children:o.fullName})]})]},o.id))})]})})]})})})}function de(){const[s,t]=g(M),[l,a]=c.exports.useState([]),[i,d]=g(G),[o,u]=g(k);return c.exports.useEffect(()=>{s?i!==""&&o!==""&&(async()=>(await Z(o,i)).map(C=>{a(R=>[...R,C[0]])}))():(d(""),u(""),a([]))},[o,s]),e(p.Root,{show:s,as:c.exports.Fragment,children:e(f,{as:"div",className:"fixed inset-0 z-[60] overflow-y-auto",onClose:t,children:r("div",{className:"m-2 flex min-h-screen items-center  justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0",children:[e(p.Child,{as:c.exports.Fragment,enter:"ease-out duration-500",enterFrom:"opactiy-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e(f.Overlay,{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),e("span",{className:"hidden sm:inline-block sm:h-screen sm:align-middle","aria-hidden":"true",children:"\u200B"}),e(p.Child,{as:c.exports.Fragment,enter:"ease-out duration-500",enterFrom:"opactiy-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:r("div",{className:"inline-block w-full transform space-y-4 overflow-hidden rounded-lg bg-white p-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 sm:align-middle",children:[e("button",{className:"float-right outline-none",onClick:()=>t(!1),children:e(P,{className:" h-6  w-6 cursor-pointer text-gray-300"})}),r("div",{as:"h3",className:"flex items-center space-x-4  text-2xl ",children:[e("div",{className:" flex h-14 w-14 items-center justify-center rounded-full bg-red-100",children:e(T,{className:"mt-[2px] h-8 w-8 text-red-600"})}),e("span",{children:"Likes"})]}),e("hr",{}),e("div",{className:"max-h-96 space-y-3 overflow-y-scroll scrollbar-hide",children:l==null?void 0:l.map(m=>r("div",{className:"flex items-center",children:[e("img",{src:m.image,alt:`${m==null?void 0:m.username}`,className:"mr-3 h-14 w-14 rounded-full border-2 border-gray-300 object-cover p-[2px] text-center"}),r(f.Title,{as:"h3",className:"font-bold text-gray-800",children:[e(x,{to:`/profile/${m.username}`,onClick:()=>t(!1),children:m.username}),e("p",{className:"-mt-[2px] font-medium text-gray-600 ",children:m.fullName})]})]},m.id))})]})})]})})})}function fe(){c.exports.useEffect(()=>{document.title="Instagram 2.0 Clone"},[]);const{user:s}=c.exports.useContext(v);return r("div",{className:"overflow-hidden h-full min-h-screen",children:[e($,{}),e(W,{}),e(ce,{}),e(de,{}),e(Y,{}),e(D,{}),s?e("div",{className:"overflow-y-auto scrollbar-hide",children:r("div",{className:"mx-auto mt-16 grid h-full grid-cols-1 justify-between gap-4 xs:grid-cols-2 sm:max-w-xl md:max-w-2xl md:grid-cols-3 lg:max-w-[52rem] xl:max-w-4xl ",children:[e("section",{className:"container col-span-2 inline-grid ",children:e(ne,{})}),e("section",{className:"-ml-48 hidden md:col-span-1 md:inline-grid lg:-ml-32",children:e(ie,{})})]})}):r(b,{children:[e("p",{className:"m-10 mt-24 text-center text-5xl font-bold",children:"Error 404!!!"}),e("p",{className:"m-8 text-center text-3xl font-bold",children:"Sorry, this page isn't available."}),e("p",{className:"mx-3 text-center text-lg font-semibold md:text-xl",children:"It seems like you are trying to access the Dashboard. But unfortunately you don't seem to have logged in to an account."}),e("br",{}),e("p",{className:"mx-3 text-center text-lg font-semibold md:text-xl",children:"Please click the below button to head towards the Login page to access the Dashboard."}),e(x,{to:q,className:"flex items-center justify-center",children:e("button",{className:"my-3 w-44 rounded-md border bg-sky-500 py-2 text-center text-lg font-semibold text-white",children:"Go To Login"})})]})]})}export{fe as default};
