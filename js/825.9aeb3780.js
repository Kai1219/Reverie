"use strict";(self["webpackChunkreverie"]=self["webpackChunkreverie"]||[]).push([[825],{8825:function(s,a,t){t.r(a),t.d(a,{default:function(){return H}});var i=t(6252);const l={class:"row g-0"},e={class:"col-md-2 d-none d-lg-inline-block me-auto"},n={class:"dashboard-nav navbar-dark bg-dark vh-100 position-relative"},c=(0,i._)("div",{class:"text-white p-3"},[(0,i._)("h1",null,"Reverie"),(0,i._)("h3",null,"後台管理介面")],-1),o={class:"navbar-nav flex-md-column fs-5"},u={class:"nav-item m-3"},r=(0,i._)("i",{class:"bi bi-shop-window"},null,-1),d=(0,i.Uk)("產品列表"),v={class:"nav-item m-3"},b=(0,i._)("i",{class:"bi bi-receipt-cutoff"},null,-1),m=(0,i.Uk)("訂單列表"),f={class:"nav-item m-3"},h=(0,i._)("i",{class:"bi bi-percent"},null,-1),_=(0,i.Uk)("優惠券"),p={class:"nav-item m-3"},k=(0,i._)("i",{class:"bi bi-box-arrow-up-left"},null,-1),w=(0,i.Uk)("回到前台"),x={class:"col d-md-block d-lg-none bg-primary"},g=(0,i._)("div",{class:"text-white d-flex align-items-center px-3"},[(0,i._)("p",{class:"fs-3 m-0 d-inline"},"Reverie後台管理"),(0,i._)("button",{class:"btn btn-primary ms-auto d-block",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasExample","aria-controls":"offcanvasExample"},[(0,i._)("i",{class:"bi bi-filter-right fs-1"})])],-1),$={class:"offcanvas offcanvas-start bg-primary text-white",tabindex:"-1",id:"offcanvasExample","aria-labelledby":"offcanvasExampleLabel"},y=(0,i._)("div",{class:"offcanvas-header"},[(0,i._)("div",{class:"offcanvas-title"},[(0,i._)("h1",null,"Reverie"),(0,i._)("h2",null,"後台管理介面")]),(0,i._)("button",{type:"button",class:"fs-3 text-white btn-info","data-bs-dismiss":"offcanvas","aria-label":"Close"},[(0,i._)("i",{class:"bi bi-x-lg"})])],-1),U={class:"offcanvas-body"},W={class:"dashboard-nav navbar-nav flex-md-column fs-5 text-white"},C={class:"nav-item m-3"},E=(0,i._)("i",{class:"bi bi-shop-window"},null,-1),R=(0,i.Uk)("產品列表"),A={class:"nav-item m-3"},S=(0,i._)("i",{class:"bi bi-receipt-cutoff"},null,-1),O=(0,i.Uk)("訂單列表"),T={class:"nav-item m-3"},j=(0,i._)("i",{class:"bi bi-percent"},null,-1),q=(0,i.Uk)("優惠券"),z={class:"nav-item m-3"},D=(0,i._)("i",{class:"bi bi-box-arrow-up-left"},null,-1),L=(0,i.Uk)("回到前台"),V={class:"col-lg-9 m-auto"};function Z(s,a,t,Z,B,F){const G=(0,i.up)("router-link"),H=(0,i.up)("RouterView");return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("div",e,[(0,i._)("nav",n,[(0,i._)("div",null,[c,(0,i._)("div",null,[(0,i._)("ul",o,[(0,i._)("li",u,[(0,i.Wm)(G,{to:"/adminproducts",class:"nav-link"},{default:(0,i.w5)((()=>[r,d])),_:1})]),(0,i._)("li",v,[(0,i.Wm)(G,{to:"/adminOrder",class:"nav-link"},{default:(0,i.w5)((()=>[b,m])),_:1})]),(0,i._)("li",f,[(0,i.Wm)(G,{to:"/adminCoupon",class:"nav-link"},{default:(0,i.w5)((()=>[h,_])),_:1})]),(0,i._)("li",p,[(0,i.Wm)(G,{to:"/",class:"nav-link"},{default:(0,i.w5)((()=>[k,w])),_:1})])])])]),(0,i._)("button",{class:"btn btn-info position-absolute bottom-0 w-100",onClick:a[0]||(a[0]=(...s)=>F.signout&&F.signout(...s))}," 登出 ")])]),(0,i._)("div",x,[g,(0,i._)("div",$,[y,(0,i._)("div",U,[(0,i._)("div",null,[(0,i._)("ul",W,[(0,i._)("li",C,[(0,i.Wm)(G,{to:"/adminproducts",class:"nav-link text-white"},{default:(0,i.w5)((()=>[E,R])),_:1})]),(0,i._)("li",A,[(0,i.Wm)(G,{to:"/adminOrder",class:"nav-link text-white"},{default:(0,i.w5)((()=>[S,O])),_:1})]),(0,i._)("li",T,[(0,i.Wm)(G,{to:"/adminCoupon",class:"nav-link text-white"},{default:(0,i.w5)((()=>[j,q])),_:1})]),(0,i._)("li",z,[(0,i.Wm)(G,{to:"/",class:"nav-link text-white"},{default:(0,i.w5)((()=>[D,L])),_:1})])])])]),(0,i._)("button",{class:"btn btn-info",onClick:a[1]||(a[1]=(...s)=>F.signout&&F.signout(...s))},"登出")])]),(0,i._)("div",V,[B.checkSuccess?((0,i.wg)(),(0,i.j4)(H,{key:0})):(0,i.kq)("",!0)])])}var B={data(){return{checkSuccess:!1}},methods:{checkAdmin(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");s?(this.$http.defaults.headers.common.Authorization=`${s}`,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/user/check").then((()=>{this.checkSuccess=!0})).catch((()=>{alert("發生錯誤，請重新登入"),this.$router.push("/login")}))):(alert("您尚未登入。"),this.$router.push("/login"))},signout(){document.cookie="hexToken=;expires=;",alert("已登出"),this.$router.push("/")}},mounted(){this.checkAdmin()}},F=t(3744);const G=(0,F.Z)(B,[["render",Z]]);var H=G}}]);
//# sourceMappingURL=825.9aeb3780.js.map