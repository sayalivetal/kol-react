"use strict";(self.webpackChunkkol_marketplace_new=self.webpackChunkkol_marketplace_new||[]).push([[853],{4853:function(e,a,l){l.r(a);var n=l(4165),s=l(5861),t=l(4942),i=l(1413),c=l(2982),r=l(885),o=l(2791),m=(l(4986),l(3901)),d=l(1389),u=l(9085),h=l(6871),p=(l(5462),l(3383)),x=l(184);a.default=function(){var e=(0,h.s0)(),a=(0,m.v9)(d.Nb),l=a.message;a.biodata;(0,o.useEffect)((function(){u.Am.success(l)}),[l]);var f=(0,m.I0)(),j=(0,o.useState)([{name:"",social_user_id:"",followers:"",social_icon:""}]),v=(0,r.Z)(j,2),b=v[0],N=v[1],g=function(e,a){var l=e.target,n=l.name,s=l.value,t=(0,c.Z)(b);t[a][n]=s,N(t)},_=function(){N([].concat((0,c.Z)(b),[{name:"",social_user_id:"",followers:"",social_icon:""}]))},Z=(0,o.useState)({userName:"",personal_email:"",kol_type:"",city:"",zip_code:"",state:"",userImage:"",bio:"",social_media:[],social_active:"",video_links:[],languages:[],tags:[],avatar:""}),k=(0,r.Z)(Z,2),y=k[0],w=k[1],C=(0,o.useState)([]),S=(0,r.Z)(C,2),E=S[0],I=S[1],P=(0,o.useState)(),D=(0,r.Z)(P,2),F=D[0],T=D[1],z=(0,o.useState)(),A=(0,r.Z)(z,2),B=A[0],U=A[1],H=(0,o.useState)([]),K=(0,r.Z)(H,2),M=K[0],V=K[1],L=(0,o.useState)(""),O=(0,r.Z)(L,2),W=O[0],G=O[1],J=(0,o.useState)(!1),q=(0,r.Z)(J,2),Q=(q[0],q[1]),R=(0,o.useState)(0),X=(0,r.Z)(R,2),Y=(X[0],X[1],(0,o.useState)(0)),$=(0,r.Z)(Y,2),ee=$[0],ae=$[1],le=(0,o.useState)([]),ne=(0,r.Z)(le,2),se=ne[0],te=ne[1];(0,o.useEffect)((function(){w((function(){return(0,i.Z)((0,i.Z)({},y),{},{social_media:(0,c.Z)(b)})}))}),[b]),(0,o.useEffect)((function(){w((function(){return(0,i.Z)((0,i.Z)({},y),{},{video_links:(0,c.Z)(se)})}))}),[se]),(0,o.useEffect)((function(){w((function(){return(0,i.Z)((0,i.Z)({},y),{},{tags:(0,c.Z)(M)})}))}),[M]);var ie=function(e){if(w((0,i.Z)((0,i.Z)({},y),{},(0,t.Z)({},e.target.name,e.target.value))),"userImage"==e.target.name){if(e.target.files[0].size>1e6)return void console.log("File is large");T(e.target.files[0])}if("userBanner"==e.target.name){if(e.target.files[0].size>1e6)return void console.log("File is large");U(e.target.files[0])}"tags"==e.target.name&&V(e.target.value)};console.log("kolProfile 1231",y);var ce=function(e){console.log("=========>",e.target.value),te((function(a){return(0,i.Z)((0,i.Z)({},y),{},(0,t.Z)({},e.target.name,[e.target.value]))}))};(0,o.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,n.Z)().mark((function e(){var a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(p.b,"/stream-list"),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()}));case 2:a=e.sent,I(a.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);(0,m.v9)(d.Nb).biodata.kolProfileData;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"row col-12",children:[(0,x.jsx)("div",{className:"col-6",children:(0,x.jsx)("h3",{className:"mt-4",children:"Kol Profile"})}),(0,x.jsx)("div",{className:"col-6",children:(0,x.jsx)("button",{className:"btn btn-outline-secondary",onClick:function(a){f((0,d.sp)()),e("../profile")},children:"View"})})]}),(0,x.jsx)("div",{className:"row",children:(0,x.jsxs)("form",{className:"dashboard-main-form",onSubmit:function(e){e.preventDefault();var a=new FormData;a.append("avatar",F),a.append("banner",B),a.append("personal_email",y.personal_email),a.append("kol_type",y.kol_type),a.append("city",y.city),a.append("zip_code",y.zip_code),a.append("bio",y.bio),a.append("social_media[]",JSON.stringify(y.social_media)),a.append("social_active",y.social_active),a.append("video_links[]",y.video_links),a.append("languages[]",y.languages),a.append("tags[]",y.tags),a.append("state",y.state),f((0,d.AW)(a))},children:[(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{htmlFor:"exampleInputEmail1",className:"form-label",children:(0,x.jsx)("b",{children:"Name"})}),(0,x.jsx)("input",{type:"text",className:"form-control",name:"userName",value:y.userName,onChange:ie,id:"exampleInputEmail1"})]}),(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{htmlFor:"exampleInputEmail1",className:"form-label",children:(0,x.jsx)("b",{children:"Email address"})}),(0,x.jsx)("input",{type:"email",name:"personal_email",className:"form-control",id:"exampleInputEmail1",defaultValue:y.personal_email,onChange:ie}),(0,x.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]})]}),(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Kol Type"})}),(0,x.jsxs)("select",{className:"form-select",name:"kol_type",onChange:ie,"aria-label":"Default select example",children:[(0,x.jsx)("option",{selected:!0,children:"Select Type"}),(0,x.jsx)("option",{value:"1",children:"One"}),(0,x.jsx)("option",{value:"2",children:"Two"}),(0,x.jsx)("option",{value:"3",children:"Three"})]})]}),(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{htmlFor:"exampleInputPassword1",className:"form-label",children:(0,x.jsx)("b",{children:"City"})}),(0,x.jsx)("input",{type:"text",name:"city",onChange:ie,className:"form-control",id:"exampleInputPassword1"})]})]}),(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"State"})}),(0,x.jsxs)("select",{className:"form-select form-text",onChange:ie,name:"state","aria-label":"Default select example",children:[(0,x.jsx)("option",{selected:!0,children:"Select state"}),(0,x.jsx)("option",{value:"Punjab",children:"Punjab"}),(0,x.jsx)("option",{value:"Haryana",children:"Haryana"}),(0,x.jsx)("option",{value:"Uttar Pradesh",children:"Uttar Pradesh"}),(0,x.jsx)("option",{value:"Maharastra",children:"Maharastra"})]})]}),(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{htmlFor:"exampleInputPassword1",className:" form-label",children:(0,x.jsx)("b",{children:"Zip code"})}),(0,x.jsx)("input",{type:"text",name:"zip_code",className:"form-control",id:"exampleInputPassword1",onChange:ie})]})]}),(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsxs)("div",{className:"col-6",children:[(0,x.jsx)("label",{htmlFor:"exampleInputPassword1",className:" form-label",children:(0,x.jsx)("b",{children:"Language"})}),(0,x.jsxs)("select",{className:"form-select form-text",onChange:function(e){w((0,i.Z)((0,i.Z)({},y),{},(0,t.Z)({},e.target.name,[e.target.value])))},name:"languages","aria-label":"Default select example",children:[(0,x.jsx)("option",{selected:!0,children:"Select Language"}),(0,x.jsx)("option",{value:"hindi",children:"Hindi"}),(0,x.jsx)("option",{value:"punjabi",children:"Punjabi"}),(0,x.jsx)("option",{value:"english",children:"English"})]})]}),(0,x.jsxs)("div",{className:" col-6",children:[(0,x.jsx)("label",{className:" form-label",children:(0,x.jsx)("b",{children:"Most Active Platform"})}),(0,x.jsxs)("select",{className:"form-select",name:"social_active",onChange:function(e){w((function(a){return(0,i.Z)((0,i.Z)({},a),{},(0,t.Z)({},e.target.name,[e.target.value]))}))},children:[(0,x.jsx)("option",{defaultValue:!0,children:"Select Event Type"}),Object.keys(E).map((function(e,a){return(0,x.jsx)("option",{value:e,children:e},a)}))]})]})]}),(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Social Media Info"})}),b.map((function(e,a){return(0,x.jsxs)("div",{className:"row topmrgn",children:[(0,x.jsx)("div",{className:"col-3",children:(0,x.jsx)("input",{name:"name",placeholder:"Platform Name",className:"form-control",value:e.name,onChange:function(e){return g(e,a)}})}),(0,x.jsx)("div",{className:"col-2",children:(0,x.jsx)("input",{className:"form-control ml10",name:"social_user_id",placeholder:"Enter User Id",value:e.social_user_id,onChange:function(e){return g(e,a)}})}),(0,x.jsx)("div",{className:"col-2",children:(0,x.jsx)("input",{className:"form-control ml10",name:"followers",placeholder:"30k",value:e.followers,onChange:function(e){return g(e,a)}})}),(0,x.jsx)("div",{className:"col-2",children:(0,x.jsx)("input",{className:"form-control ml10",name:"social_icon",placeholder:"fb-btn",value:e.social_icon,onChange:function(e){return g(e,a)}})}),(0,x.jsx)("div",{className:"col-2",children:(0,x.jsxs)("div",{className:"btn-box",children:[1!==b.length&&(0,x.jsxs)("button",{className:"btn sub-btn",onClick:function(){return function(e){var a=(0,c.Z)(b);a.splice(e,1),N(a)}(a)},children:[" ","-"," "]}),b.length-1===a&&(0,x.jsxs)("button",{className:"btn custome-btn left-mrgn",onClick:_,children:[" ","+"," "]})]})})]})}))]}),(0,x.jsxs)("div",{className:"col-12 mt-3",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Video Links"})}),(0,x.jsxs)("div",{className:"row",children:[(0,x.jsx)("div",{className:"col-8",children:(0,x.jsx)("input",{type:"text",className:"form-control",placeholder:"enter video link",onChange:function(e){ce(e)}})}),(0,x.jsx)("div",{className:"col-4",children:(0,x.jsx)("button",{type:"button",name:"video_links",className:"btn custome-btn",onClick:function(){return ae(ee+1)},children:"+"})})]}),(0,c.Z)(Array(ee)).map((function(e,a){return(0,x.jsx)("div",{className:"linkdiv",children:(0,x.jsxs)("div",{className:"row",children:[(0,x.jsx)("div",{className:"col-8",children:(0,x.jsx)("input",{type:"text",className:"form-control",onBlur:function(e){ce(e)},placeholder:"enter video link"})}),(0,x.jsx)("div",{className:"col-4",children:(0,x.jsx)("button",{type:"button",name:"video_links",className:"btn sub-btn",onClick:function(){ae(ee-1),y.video_links.pop()},children:"-"})})]})},a)}))]}),(0,x.jsxs)("div",{className:"col-12 mt-3",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Bio"})}),(0,x.jsx)("textarea",{className:"form-control form-text",id:"exampleFormControlTextarea1",name:"bio",onChange:ie,rows:"3"})]}),(0,x.jsxs)("div",{className:"col-12 mt-3",children:[M.length&&(0,x.jsx)("div",{className:"tagDiv",children:M.map((function(e,a){return(0,x.jsxs)("div",{className:"tag",children:[e,(0,x.jsx)("button",{onClick:function(){return function(e){V((function(a){return a.filter((function(a,l){return l!==e}))}))}(a)},children:"x"})]})}))}),(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Enter Tags"})}),(0,x.jsx)("input",{value:W,placeholder:"Enter a tag",onKeyDown:function(e){var a=e.key,l=W.trim();if("Enter"===a&&l.length&&!M.includes(l)&&(e.preventDefault(),V((function(e){return[].concat((0,c.Z)(e),[l])})),G("")),"Backspace"===a&&!W.length&&M.length){e.preventDefault();var n=(0,c.Z)(M),s=n.pop();V(n),G(s)}Q(!1)},onKeyUp:function(){Q(!0)},name:"tags",className:"form-control",onChange:function(e){var a=e.target.value;G(a)}})]}),(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Upload Avatar"})}),(0,x.jsx)("input",{type:"file",name:"userImage",onChange:ie})]}),(0,x.jsxs)("div",{className:"row mt-3",children:[(0,x.jsx)("label",{className:"form-label",children:(0,x.jsx)("b",{children:"Upload Banner"})}),(0,x.jsx)("input",{type:"file",name:"userBanner",onChange:ie})]}),(0,x.jsx)("div",{className:"mt-4 mx-auto d-block",children:(0,x.jsx)("button",{type:"submit",className:"btn btn-primary form-text",children:"Submit"})})]})})]})}},5462:function(){},4986:function(){}}]);
//# sourceMappingURL=853.dc8bd4cf.chunk.js.map