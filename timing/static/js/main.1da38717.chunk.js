(this["webpackJsonplive-timing"]=this["webpackJsonplive-timing"]||[]).push([[0],{102:function(e,t,a){},103:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),c=a.n(l),i=(a(79),a(68)),o=a(12),s=a.n(o),m=a(23),u=a(9),f=a(65),d=a(66),p=function(){function e(t,a,n,r,l,c,i){Object(f.a)(this,e),this.clazz=t,this.name=a,this.time=this.parseTime(n),this.number=r,this.rawTimes=l,this.car=c,this.fastestIndex=i}return Object(d.a)(e,[{key:"parseTime",value:function(e){return e=parseFloat(e,10),isNaN(e)?999:e}}]),e}(),E=a(81),h=function(){var e=Object(m.a)(s.a.mark((function e(t,a){var n,r,l,c,i,o,m,u,f,d,h;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.get(t);case 2:return n=e.sent,r="",n.headers&&(l={hour:"numeric",minute:"numeric",second:"numeric"},c=new Date(n.headers["last-modified"]),r=new Intl.DateTimeFormat("en",l).format(c)),i=new DOMParser,o=i.parseFromString(n.data,"text/html"),m={},u="",f=0,d=0,h=0,o.querySelectorAll("body > a > table:nth-child(4) > tbody > tr").forEach((function(e){if(e.querySelector("th"))u=e.querySelector("a").name,m[u]=[];else{var t=e.querySelector("td:nth-child(2)").innerText,a=e.querySelector("td:nth-child(3)").innerText,n=e.querySelector("td:nth-child(4)").innerText,r=e.querySelector("td:nth-child(5)").innerText,l=Array.prototype.slice.call(e.querySelectorAll("td:nth-child(n+7)"));l=l.slice(0,l.length-2);var c=[],i=[],o=999,s=-1;l.forEach((function(e,t){if(0!==t){var a=e.innerText.split("+").map((function(e){return e.trim()}));if(i.push(e.innerText.trim()),1===a.length){if(""===a[0])return;var n=parseFloat(a,10);c.push(n),h++,n<o&&(o=n,s=t)}else if(2===a.length){if("dnf"===a[1]||"dns"===a[1])return void c.push(999);var r=parseFloat(a[1],10);isNaN(r)&&(r=0);var l=parseFloat(a,10)+2*r;d+=r,h++,c.push(l),l<o&&(o=l,s=t)}}}));var E=c.sort((function(e,t){return e-t}))[0];m[u].push(new p(t,n,E,a,i,r,s)),i.length>f&&(f=i.length)}})),a({type:"RUNS_AND_CONES",data:{conesHit:d,runCount:h,maxRuns:f,lastMod:r}}),e.abrupt("return",m);case 15:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),g=a(132),b=a(138),y=a(142),w=a(141),v=a(135),x=a(139),O=a(140),j=a(137),T=Object(n.createContext)(),F=function(e){var t=e.initialState,a=e.children,l=e.reducer;return r.a.createElement(T.Provider,{value:Object(n.useReducer)(l,t)},a)},C=function(){return Object(n.useContext)(T)};function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function R(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var z=r.a.createElement("g",null),A=r.a.createElement("g",null),k=r.a.createElement("g",null),D=r.a.createElement("g",null),I=r.a.createElement("g",null),P=r.a.createElement("g",null),N=r.a.createElement("g",null),W=r.a.createElement("g",null),B=r.a.createElement("g",null),_=r.a.createElement("g",null),L=r.a.createElement("g",null),M=r.a.createElement("g",null),U=r.a.createElement("g",null),V=r.a.createElement("g",null),X=r.a.createElement("g",null),H=function(e){var t=e.svgRef,a=e.title,n=R(e,["svgRef","title"]);return r.a.createElement("svg",S({id:"Layer_1",x:"0px",y:"0px",viewBox:"0 0 512 512",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve",ref:t},n),a?r.a.createElement("title",null,a):null,r.a.createElement("path",{style:{fill:"#FFA055"},d:"M467.862,512H44.138c-4.875,0-8.828-3.953-8.828-8.828v-17.655c0-4.875,3.953-8.828,8.828-8.828 h423.724c4.875,0,8.828,3.953,8.828,8.828v17.655C476.69,508.047,472.737,512,467.862,512z"}),r.a.createElement("path",{style:{fill:"#FFB45A"},d:"M269.3,0h-26.6c-7.819,0-14.707,5.143-16.928,12.64L88.276,476.69h335.448L286.228,12.64 C284.007,5.143,277.119,0,269.3,0z"}),r.a.createElement("g",null,r.a.createElement("polygon",{style:{fill:"#FFEBBE"},points:"171.975,194.207 340.025,194.207 319.101,123.586 192.899,123.586  "}),r.a.createElement("polygon",{style:{fill:"#FFEBBE"},points:"119.662,370.759 392.338,370.759 371.413,300.138 140.587,300.138  "})),r.a.createElement("g",null,r.a.createElement("polygon",{style:{fill:"#FFA055"},points:"219.055,35.31 292.945,35.31 287.714,17.655 224.286,17.655  "}),r.a.createElement("polygon",{style:{fill:"#FFA055"},points:"208.593,70.621 303.407,70.621 298.176,52.966 213.824,52.966  "})),z,A,k,D,I,P,N,W,B,_,L,M,U,V,X)},q=r.a.forwardRef((function(e,t){return r.a.createElement(H,S({svgRef:t},e))}));a.p;function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function Y(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var $=r.a.createElement("g",null),G=r.a.createElement("g",null),K=r.a.createElement("g",null),Q=r.a.createElement("g",null),Z=r.a.createElement("g",null),ee=r.a.createElement("g",null),te=r.a.createElement("g",null),ae=r.a.createElement("g",null),ne=r.a.createElement("g",null),re=r.a.createElement("g",null),le=r.a.createElement("g",null),ce=r.a.createElement("g",null),ie=r.a.createElement("g",null),oe=r.a.createElement("g",null),se=r.a.createElement("g",null),me=function(e){var t=e.svgRef,a=e.title,n=Y(e,["svgRef","title"]);return r.a.createElement("svg",J({id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 512 512",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve",ref:t},n),a?r.a.createElement("title",null,a):null,r.a.createElement("g",null,r.a.createElement("path",{style:{fill:"#FFA000"},d:"M373.333,256c-5.891,0-10.667-4.776-10.667-10.667c0-5.891,4.776-10.667,10.667-10.667 C432.214,234.596,479.93,186.881,480,128V42.667h-96c-5.891,0-10.667-4.776-10.667-10.667S378.109,21.333,384,21.333h106.667 c5.891,0,10.667,4.776,10.667,10.667v96C501.251,198.658,443.992,255.918,373.333,256z"}),r.a.createElement("path",{style:{fill:"#FFA000"},d:"M138.667,256c-70.658-0.082-127.918-57.342-128-128V32c0-5.891,4.776-10.667,10.667-10.667H128 c5.891,0,10.667,4.776,10.667,10.667S133.891,42.667,128,42.667H32V128c0.071,58.881,47.786,106.596,106.667,106.667 c5.891,0,10.667,4.776,10.667,10.667C149.333,251.224,144.558,256,138.667,256z"}),r.a.createElement("path",{style:{fill:"#FFA000"},d:"M322.709,425.131l-5.739-5.888C294.613,396.245,288.469,331.947,288,309.12 c-0.116-5.808-4.858-10.454-10.667-10.453h-42.667c-5.801-0.001-10.539,4.633-10.667,10.432 c-0.448,22.827-6.592,87.083-28.971,110.123l-5.739,5.888c-29.291,30.144-50.624,51.925-50.624,76.224 c0,5.891,4.776,10.667,10.667,10.667h213.333c5.891,0,10.667-4.776,10.667-10.667C373.333,477.035,352,455.253,322.709,425.131z"})),r.a.createElement("path",{style:{fill:"#FFC107"},d:"M384,0H128c-5.891,0-10.667,4.776-10.667,10.667v170.667C118.333,257.499,179.834,319,256,320 c76.166-1,137.667-62.501,138.667-138.667V10.667C394.667,4.776,389.891,0,384,0z"}),$,G,K,Q,Z,ee,te,ae,ne,re,le,ce,ie,oe,se)},ue=r.a.forwardRef((function(e,t){return r.a.createElement(me,J({svgRef:t},e))})),fe=(a.p,Object(g.a)({table:{minWidth:500},height:"35px"}));function de(e){var t=e.data,a=e.name,n=(e.showTour,C()),l=Object(u.a)(n,2),c=l[0].maxRuns,i=l[1],o=t.map((function(e){return function(e,t,a,n,r,l,c){return{name:e,number:t,time:a,clazz:n,rawTimes:r,car:l,fastestIndex:c}}(e.name,e.number,e.time,e.clazz,e.rawTimes,e.car,e.fastestIndex)})),s=null;(o&&o.length>1&&"PAX"===a||o&&"RAW"!==a)&&(s=o[0].time),console.log("rows",o),o=o.filter((function(e){return e.name}));var m,f=0;"PAX"!==a&&"RAW"!==a&&(m=o.length,f=m<=3?1:m<=6?2:m<=9?3:(m-=9,Math.ceil(m/4)+3));var d=fe(),p=0;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{component:j.a},r.a.createElement("div",null,"RAW"!==a&&"PAX"!==a&&r.a.createElement(r.a.Fragment,null,"Time to match top PAX: ",e.timeNeeded.toFixed(3)),r.a.createElement(b.a,{className:d.table,"aria-label":"simple table"},r.a.createElement(x.a,null,r.a.createElement(O.a,{style:{background:"gray"}},r.a.createElement(w.a,{style:{width:25,color:"white"},align:"left"},"Position"),r.a.createElement(w.a,{style:{color:"white"}},"Name"),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Number"),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Best"),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Diff"),new Array(c).fill().map((function(e,t){return r.a.createElement(w.a,{style:{color:"white"},align:"left"},t+1)})),s&&r.a.createElement(w.a,{style:{color:"white"},align:"left"},"DOTY Points"))),r.a.createElement(y.a,null,o.map((function(e,t){return p++,r.a.createElement(O.a,{style:t%2?{background:"#f2f2f2"}:{}},r.a.createElement(w.a,{align:"left"},p<=f&&r.a.createElement(ue,{style:{height:"10px"}})," ",p),r.a.createElement(w.a,{onClick:function(){return i({type:"SELECTED_DRIVER",data:e})},component:"th",scope:"row"},r.a.createElement("div",{style:{color:"blue",cursor:"pointer"}},e.name)),r.a.createElement(w.a,{align:"left"},e.number+" "+e.clazz.toUpperCase()),r.a.createElement(w.a,{align:"left"},e.time),r.a.createElement(w.a,null,e&&e.fastestIndex&&e.rawTimes&&0===t||!o[t-1]?"":(o[t-1].time-e.time).toFixed(3)),new Array(c).fill().map((function(t,a){var n=r.a.createElement(q,{style:{height:"10px"}}),l=e.rawTimes.length>a?e.rawTimes[a]:"";return e.fastestIndex-1===a?r.a.createElement(w.a,{align:"left",style:{backgroundColor:"lightgreen"}},l," ",l.includes("+")?n:""):r.a.createElement(w.a,{align:"left"},l," ",l.includes("+")?n:"")})),s&&r.a.createElement(w.a,null,(s/e.time*1e3).toFixed(3)))})))))))}a(102);var pe=a(146),Ee=Object(g.a)({table:{minWidth:500,maxWidth:500,width:500}});function he(e){var t=Ee(),a=C(),n=Object(u.a)(a,1)[0].selected,l=n.clazz,c=n.name,i=n.rawTimes,o=n.car,s=n.fastestIndex,m=0;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{component:j.a},r.a.createElement("div",{style:{overflow:"auto"}},r.a.createElement("h2",{style:{marginLeft:"15px"}},c," (",l.toUpperCase(),")"),r.a.createElement("h4",{style:{marginLeft:"15px"}},o),r.a.createElement(b.a,{className:t.table,"aria-label":"simple table",style:{tableLayout:"fixed"}},r.a.createElement(x.a,null,r.a.createElement(O.a,null,r.a.createElement(w.a,{align:"left"},"Run"),r.a.createElement(w.a,{align:"left"},"Time"))),r.a.createElement(y.a,null,i.map((function(e,t){return m++,r.a.createElement(O.a,null,r.a.createElement(w.a,{align:"left"},m),s+1===m?r.a.createElement(w.a,{align:"left",style:{backgroundColor:"lightgreen"}},e):r.a.createElement(w.a,{align:"left"},e))})))))))}function ge(){return{top:"".concat(50,"%"),left:"".concat(50,"%"),transform:"translate(-".concat(50,"%, -").concat(50,"%)")}}var be=Object(g.a)((function(e){return{paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})),ye=function(){var e=C(),t=Object(u.a)(e,2),a=t[0].selected,n=t[1],l=be(),c=r.a.useState(ge),i=Object(u.a)(c,1)[0];return a?r.a.createElement("div",null,r.a.createElement(pe.a,{"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",open:!!a,onClose:function(){return n({type:"DESELECT_DRIVER"})}},r.a.createElement("div",{style:i,className:l.paper},r.a.createElement(he,null)))):r.a.createElement("div",null)},we=a(147),ve=a(145),xe=a(143),Oe=a(144),je=Object(g.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}})),Te=function(e){var t=e.clazzes,a=je(),n=C(),l=Object(u.a)(n,2),c=l[0].dropdown,i=l[1];return r.a.createElement(xe.a,{className:a.formControl},r.a.createElement(we.a,null,"Class"),r.a.createElement(Oe.a,{value:c,onChange:function(e){window.history.pushState("","","".concat(window.location.pathname,"?class=").concat(e.target.value)),i({type:"UPDATE_DROPDOWN",data:e.target.value})}},t.map((function(e){return r.a.createElement(ve.a,{value:e},e.toUpperCase())}))))};Object(g.a)({table:{minWidth:500},height:"35px"});var Fe=Object(g.a)({table:{minWidth:500},height:"35px"});function Ce(e){var t=e.data,a=e.name;e.showTour;t=t.filter((function(e){return e.combinedTime})).sort((function(e,t){return e.combinedTime-t.combinedTime}));var n=C(),l=Object(u.a)(n,2),c=l[0].maxRuns,i=l[1],o=t.map((function(e){return function(e,t,a,n,r,l,c,i,o,s,m){return{name:e,number:t,time:a,clazz:n,rawTimes:r,car:l,fastestIndex:c,day1:i,combinedTime:o,day1FastestIndex:s,day1Best:m}}(e.name,e.number,e.time,e.clazz,e.rawTimes,e.car,e.fastestIndex,e.day1,e.combinedTime,e.day1FastestIndex,e.day1Best)}));0!==t.length&&(o&&o.length>1&&"PAX"===a||o&&"RAW"!==a)&&o[0].time;var s=Fe(),m=0;return 0===t.length?r.a.createElement("div",null):r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{component:j.a},r.a.createElement("div",null,r.a.createElement(b.a,{className:s.table,"aria-label":"simple table"},r.a.createElement(x.a,null,r.a.createElement(O.a,{style:{background:"gray"}},r.a.createElement(w.a,{style:{width:25,color:"white"},align:"left"},"Position"),r.a.createElement(w.a,{style:{color:"white"}},"Name"),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Number"),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Best"),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Diff"),new Array(c).fill().map((function(e,t){return r.a.createElement(w.a,{style:{color:"white"},align:"left"},t+1)})),r.a.createElement(w.a,{style:{color:"white"},align:"left"},"Combined"))),r.a.createElement(y.a,null,o.map((function(e,t){return m++,r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{style:t%2?{background:"#f2f2f2"}:{}},r.a.createElement(w.a,{align:"left"},m),r.a.createElement(w.a,{onClick:function(){return i({type:"SELECTED_DRIVER",data:e})},component:"th",scope:"row"},r.a.createElement("div",{style:{color:"blue",cursor:"pointer"}},e.name)),r.a.createElement(w.a,{align:"left"},e.number+" "+e.clazz.toUpperCase()),r.a.createElement(w.a,{align:"left"},e.day1Best),r.a.createElement(w.a,null,e&&e.fastestIndex&&e.rawTimes&&0===t||!o[t-1]?0:(o[t-1].combinedTime-e.combinedTime).toFixed(3)),new Array(c).fill().map((function(t,a){var n=r.a.createElement(q,{style:{height:"10px"}}),l=e.day1.length>a?e.day1[a]:"";return e.day1FastestIndex===a?r.a.createElement(w.a,{align:"left",style:{backgroundColor:"lightgreen"}},l," ",l.includes("+")?n:""):r.a.createElement(w.a,{align:"left"},l," ",l.includes("+")?n:"")})),r.a.createElement(w.a,{align:"left"},e.combinedTime.toFixed(3))),r.a.createElement(O.a,{style:t%2?{background:"#f2f2f2"}:{}},r.a.createElement(w.a,{align:"left"}),r.a.createElement(w.a,{onClick:function(){return i({type:"SELECTED_DRIVER",data:e})},component:"th",scope:"row"},r.a.createElement("div",{style:{color:"blue",cursor:"pointer"}})),r.a.createElement(w.a,{align:"left"}),r.a.createElement(w.a,{align:"left"},e.time),r.a.createElement(w.a,null,e&&e.fastestIndex&&e.rawTimes&&""),new Array(c).fill().map((function(t,a){var n=r.a.createElement(q,{style:{height:"10px"}}),l=e.rawTimes.length>a?e.rawTimes[a]:"";return e.fastestIndex===a?r.a.createElement(w.a,{align:"left",style:{backgroundColor:"lightgreen"}},l," ",l.includes("+")?n:""):r.a.createElement(w.a,{align:"left"},l," ",l.includes("+")?n:"")})),r.a.createElement(w.a,null)))})))))))}var Se={ss:.823,fsp:.825,as:.821,bs:.814,cs:.809,ds:.807,es:.793,fs:.806,gs:.794,hs:.782,hcs:.796,ssr:.843,"xs-a":.838,"xs-b":.856,ev:.826,ssp:.853,asp:.849,bsp:.852,csp:.865,dsp:.842,esp:.839,fsf:.825,sts:.811,stx:.816,str:.827,stu:.828,sth:.813,ssc:.812,smf:.841,sm:.854,ssm:.875,xp:.882,bp:.867,cp:.851,dp:.866,ep:.85,fp:.871,hcr:.815,am:1,bm:.962,cm:.893,dm:.895,em:.898,fm:.911,fsae:.963,km:.93,ja:.855,jb:.82,jc:.718,camc:.818,camt:.817,cams:.833},Re=30,ze=function(e){var t=[];return Object.keys(e).forEach((function(a){t="n"===a?t.concat(e[a].map((function(e){var t=e.time,a=e.clazz.substring(1);999!==t&&(t=(e.time/Se[a]).toFixed(3));var n=e.rawTimes.map((function(e){return((e=e.split("+")[0])/Se[a]).toFixed(3)}));return new p(e.clazz,e.name,t,e.number,n,e.car,e.fastestIndex)}))):t.concat(e[a])})),t.sort((function(e,t){return e.time-t.time})),t},Ae=function(e){var t=[];return Object.keys(e).forEach((function(a){t=t.concat(e[a].map((function(e){var t=e.clazz.startsWith("n")?e.clazz.substring(1):e.clazz;return new p(e.clazz,e.name,(e.time*Se[t]).toFixed(3),e.number,e.rawTimes,e.car,e.fastestIndex)})))})),t.sort((function(e,t){return e.time-t.time})),t},ke=function(e){var t=Object(n.useState)(),a=Object(u.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(""),f=Object(u.a)(o,2),d=f[0],p=f[1],E=Object(n.useState)(""),g=Object(u.a)(E,2),b=g[0],y=g[1],w=Object(n.useState)(null),v=Object(u.a)(w,2),x=(v[0],v[1],Object(n.useState)(!1)),O=Object(u.a)(x,2),j=O[0],T=(O[1],Object(n.useState)(!1)),F=Object(u.a)(T,2),S=F[0],R=(F[1],Object(n.useState)(null)),z=Object(u.a)(R,2),A=(z[0],z[1],Object(n.useState)(30)),k=Object(u.a)(A,2),D=(k[0],k[1]),I=Object(n.useState)(!1),P=Object(u.a)(I,2),N=P[0],W=P[1],B=function(){var e=Object(m.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){if(window.location.search&&window.location.search.includes("?class=")){var e=window.location.search.replace("?class=","").trim();(Object.keys(Se).includes(e)||"RAW"===e)&&X({type:"UPDATE_DROPDOWN",data:e})}else X({type:"UPDATE_DROPDOWN",data:"PAX"})},L=C(),M=Object(u.a)(L,2),U=M[0],V=U.dropdown,X=(U.conesHit,U.runCount,U.lastMod,M[1]);Object(n.useEffect)((function(){function e(){return t.apply(this,arguments)}function t(){return(t=Object(m.a)(s.a.mark((function e(){var t,a,n,r,l,o,m,u;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(h("http://www.stcsolo.com/live/live.html?cache="+(new Date).getTime(),X));case 2:return t=e.sent,console.log(t),e.next=6,B(h("http://www.stcsolo.com/live/results_live.htm?cache="+(new Date).getTime(),X));case 6:a=e.sent,n={},Object.keys(t).forEach((function(e){a[e]&&(n={},a[e].forEach((function(e){n[e.name]=e})),t[e]=t[e].map((function(e){return n[e.name]&&(e.day1=n[e.name].rawTimes,e.combinedTime=e.time+n[e.name].time,e.day1FastestIndex=n[e.name].fastestIndex,e.day1Best=n[e.name].time),e})))})),r=ze(t),l=ze(a),n={},l.forEach((function(e){n[e.name]=e})),r=r.map((function(e){return n[e.name]&&(e.day1=n[e.name].rawTimes,e.combinedTime=e.time+n[e.name].time,e.day1FastestIndex=n[e.name].fastestIndex,e.day1Best=n[e.name].time),e})),o=Ae(t),m=Ae(a),n={},m.forEach((function(e){n[e.name]=e})),o=o.map((function(e){return n[e.name]&&(e.day1=n[e.name].rawTimes,e.combinedTime=e.time+n[e.name].time,e.day1FastestIndex=n[e.name].fastestIndex,e.day1Best=n[e.name].time),e})),t.RAW=r,t.PAX=o,y(t.PAX[0].time),c(t),u=Object.keys(t),u=["PAX","RAW"].concat(Object(i.a)(u.slice(0,u.length-2))),p(u),_();case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e();var a=setInterval(Object(m.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Re<=0?(e(),Re=30,D(30)):(D(Re-1),Re-=1);case 1:case"end":return t.stop()}}),t)}))),1e3);return function(){return clearInterval(a)}}),[]);window.onpopstate=function(e){return _()};var H=N?"Hide Tour":"Show Tour",J=b/Se[V.toLowerCase()];return r.a.createElement(r.a.Fragment,null,l&&d&&V&&!j&&!S&&r.a.createElement("div",null,r.a.createElement(ye,null),r.a.createElement("span",null,r.a.createElement(Te,{clazzes:d})),r.a.createElement("span",null,r.a.createElement("button",{style:{float:"right",margin:".5em",height:"45px",display:"none"},onClick:function(){return W(!N)}},H," ",r.a.createElement(q,{style:{height:"23px"}}))),r.a.createElement("br",null),V&&"N"===V&&N&&r.a.createElement(Ce,{class:"col",data:Ae([l[V]]),name:V,topPax:b,showTour:N}),V&&"N"===V&&!N&&r.a.createElement(de,{class:"col",data:Ae([l[V]]),name:V,topPax:b,showTour:N}),V&&"N"!==V&&N&&r.a.createElement(Ce,{class:"col",data:l[V],name:V,topPax:b,showTour:N,timeNeeded:J}),V&&"N"!==V&&!N&&r.a.createElement(de,{class:"col",data:l[V],name:V,topPax:b,showTour:N,timeNeeded:J})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var De=a(39);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,{initialState:{selected:null,dropdown:"PAX"},reducer:function(e,t){switch(t.type){case"SELECTED_DRIVER":return Object(De.a)({},e,{selected:t.data});case"DESELECT_DRIVER":return Object(De.a)({},e,{selected:null});case"UPDATE_DROPDOWN":return Object(De.a)({},e,{dropdown:t.data});case"RUNS_AND_CONES":return Object(De.a)({},e,{conesHit:t.data.conesHit,runCount:t.data.runCount,maxRuns:t.data.maxRuns,lastMod:t.data.lastMod});default:return e}}},r.a.createElement(ke,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},74:function(e,t,a){e.exports=a(103)},79:function(e,t,a){}},[[74,1,2]]]);
//# sourceMappingURL=main.1da38717.chunk.js.map