(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{42:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(2),c=a.n(r),d=a(18),l=a.n(d),i=a(6),o=a(5),u=a(8),s=a(9),b=[{Header:"Date Rec",defaultWidth:"100px"},{Header:"Orig. S.N.",defaultWidth:"160px"},{Header:"Man. Year",defaultWidth:"100px"},{Header:"Face to Face",defaultWidth:"100px"},{Header:"Electrical",defaultWidth:"100px"},{Header:"Meter Type",defaultWidth:"100px"},{Header:"Old Model No.",defaultWidth:"140px"},{Header:"Flange Size",defaultWidth:"100px"},{Header:"Flange Type",defaultWidth:"100px"},{Header:"New Model No.",defaultWidth:"100px"},{Header:"Refurb S.N.",defaultWidth:"160px"},{Header:"Repair Cat.",defaultWidth:"100px"}];var h=function(e){var t={width:b[e.id].defaultWidth,borderColor:"AliceBlue"};return Object(n.jsx)("td",{children:Object(n.jsx)("input",{onClick:function(e){e.target.select()},style:t,onChange:function(t){var a=t.target.value;e.handleChange(e.name,a)},value:e.value})})};var f=function(e){var t=Object.keys(e.rowData),a=Object.values(e.rowData);function r(t,a){e.handleChange(t,a,e.id)}return Object(n.jsxs)("tr",{children:[t.map((function(e,t){return Object(n.jsx)(h,{id:t,name:e,value:a[t],handleChange:r},t)})),Object(n.jsx)("td",{children:Object(n.jsx)("button",{className:"btn btn-danger",onClick:function(){return e.removeRow(e.id)},children:"X"})})]})};var j=function(e){return Object(n.jsx)("th",{children:e.header})},p={dateRec:"enter data...",originalSN:"enter data...",manYear:"enter data...",faceToFace:"enter data...",electricals:"enter data...",meterType:"enter data...",oldModel:"enter data...",flangeSize:"enter data...",flangeType:"enter data...",newModel:"enter data...",refurbSN:"enter data...",repairCat:"enter data..."};var O=function(e){var t=Object(r.useState)(e.data),a=Object(i.a)(t,2),c=a[0],d=a[1];function l(e){var t=Object(s.a)(c);console.log(e),console.log(t),t.splice(e,1),console.log(t),d(t)}function h(e,t,a){d((function(n){return n.map((function(r,c){return c===a?Object(u.a)(Object(u.a)({},n[a]),{},Object(o.a)({},e,t)):r}))}))}return Object(n.jsxs)("div",{children:[Object(n.jsxs)("table",{className:"table table-sm table-hover",children:[Object(n.jsx)("thead",{children:Object(n.jsx)("tr",{children:b.map((function(e,t){return Object(n.jsx)(j,{header:e.Header},t)}))})}),Object(n.jsx)("tbody",{children:c.map((function(e,t){return Object(n.jsx)(f,{id:t,rowData:e,removeRow:l,handleChange:h},t)}))})]}),Object(n.jsx)("button",{onClick:function(){var e=Object(s.a)(c);e.push(p),d(e)},className:"btn btn-success",children:"Add Row"}),Object(n.jsx)("button",{onClick:e.submitData,className:"btn btn-danger",children:"Submit Data"})]})},g=[{dateRec:"28/02/2013",originalSN:"M0100A022000D7",manYear:"2000",faceToFace:"171",electricals:"4-pin",meterType:"MRA100B",oldModel:"G65/D3 R.L.",flangeSize:"2 inch",flangeType:"PN16",newModel:"MRA100B",refurbSN:"R0100A016100D7",repairCat:"3A"},{dateRec:"28/02/2014",originalSN:"M0100A021103D7",manYear:"2003",faceToFace:"171",electricals:"4-pin",meterType:"MRA100B",oldModel:"G65/D3 R.L.",flangeSize:"2 inch",flangeType:"PN16",newModel:"MRA100B",refurbSN:"R0100A016100D7",repairCat:"3A"},{dateRec:"28/02/2013",originalSN:"R0400A002805D8",manYear:"2005",faceToFace:"141",electricals:"6-pin",meterType:"MRA400D",oldModel:"G250/D16 R.L.",flangeSize:"4 inch",flangeType:"PN16",newModel:"MRA400D",refurbSN:"R0400A002805D8",repairCat:"3A"}],x=a(19),m=a.n(x);var v=function(){var e=Object(r.useState)("hello"),t=Object(i.a)(e,2),a=t[0];return t[1],Object(n.jsx)(O,{data:g,submitData:function(){console.log("submitData called");var e={body:a};m()({url:"/save",method:"POST",data:e}).then((function(){console.log("data has been sent to the server")})).catch((function(){console.log("internal server error")}))}})};l.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(v,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.e04f9713.chunk.js.map