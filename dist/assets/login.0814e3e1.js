import{u as b,r,g as x,j as e,a as i,L as y,S as N,s as v,D as w}from"./index.a110b74a.js";function P(){const g=b(),[l,o]=r.exports.useState(""),[d,t]=r.exports.useState(""),[c,s]=r.exports.useState(""),u=d===""||l==="",h=x(),[p,m]=r.exports.useState(!1),f=async a=>{a.preventDefault(),c!=""&&m(!1);try{await v(h,l,d),g(w)}catch(n){n.code==="auth/user-not-found"?(s("User doesn't exist. Please Sign Up."),o(""),t("")):n.code==="auth/wrong-password"?(s("Invalid Password. Please Try Again."),t("")):n.code==="auth/too-many-requests"?(s("Access to this account has been temporarily disabled due to many failed login attempts. Please Reset your password or Try Again later."),o(""),t("")):(o(""),t(""),s(n.message))}};return r.exports.useEffect(()=>{document.title="Login - Instagram 2.0"},[]),e("div",{className:"grid",children:i("div",{children:[i("div",{className:"top-grid p-5 -mb-36 ",children:[e("h1",{className:"flex justify-center w-full -mx-16",children:e("img",{src:"/images/logo.png",alt:"Instagram Logo",className:"mt-4 w-48 mb-6 "})}),e("h1",{className:"flex text-center justify-center ",children:e("p",{className:"mb-8 text-[22px] font-semibold text-gray-400 ",children:"Login To Your Account."})}),c&&e("p",{className:"error-text",children:c}),i("form",{method:"POST",onSubmit:f,children:[e("input",{type:"email",required:!0,value:l,"aria-label":"Enter Your Email Address",placeholder:"Email Address",className:"input",onChange:({target:a})=>{o(a.value),s("")}}),e("input",{type:"password",required:!0,"aria-label":"Enter Your Password",placeholder:"Password",value:d,className:"input",onChange:({target:a})=>{t(a.value),s("")}}),e("button",{className:`submit ${u&&" bg-opacity-40"}`,disabled:u,type:"submit",onClick:()=>m(!0),children:p?"Logging In":"Log In"}),e("h1",{className:"flex text-center justify-center ",children:e("button",{className:"my-3 text-blue-900 decoration-inherit font-semibold",children:"Forgot Password?"})})]})]}),i("div",{className:" bottom-grid mt-40",children:[e("p",{className:"mr-2 font-semibold",children:"Don't Have An Account?"}),e(y,{to:N,className:"font-bold text-blue-500",children:"Sign Up"})]})]})})}export{P as default};
