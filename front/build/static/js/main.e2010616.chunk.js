(this.webpackJsonpapibase=this.webpackJsonpapibase||[]).push([[6],{12:function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"a",(function(){return c})),t.d(a,"c",(function(){return o}));var r=t(31),n=function(e){var a=r.a.success({title:"Informaci\xf3n!",text:e,hide:!0,icon:!0,delay:1e3,animation:"fade",mouseReset:!0,modules:{Buttons:{closer:!0,sticker:!0}}});a.on("click",(function(){a.close()}))},c=function(e){var a=r.a.error({title:"Error!",text:e,hide:!0,icon:!0,delay:1e3,animation:"fade",mouseReset:!0,modules:{Buttons:{closer:!0,sticker:!0}}});a.on("click",(function(){a.close()}))},o=function(e){var a=r.a.notice({title:"Advertencia!",text:e,hide:!0,icon:!0,delay:1e3,animation:"fade",mouseReset:!0,modules:{Buttons:{closer:!0,sticker:!0}}});a.on("click",(function(){a.close()}))}},13:function(e,a,t){"use strict";var r=t(3),n=t.n(r),c=t(10),o=t(16),u=t(25),i=t.n(u),s=t(12),l=o.a.urlApi,m=function(){var e=Object(c.a)(n.a.mark((function e(a){var t,r,c,o,u,m,d,p,b,f,E,v=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v.length>1&&void 0!==v[1]?v[1]:{},r=v.length>2&&void 0!==v[2]&&v[2],c=v.length>3&&void 0!==v[3]?v[3]:0,e.prev=3,(o=i.a.get("auth"))&&(o=atob(o)),t.headers=!0===r?{Authorization:"Bearer ".concat(o)}:{Authorization:"Bearer ".concat(o),"Content-Type":"application/json",Accept:"application/json"},"/auth"===a&&delete t.headers.Authorization,u=l+a,e.next=11,fetch(u,t);case 11:if(401!==(m=e.sent).status){e.next=17;break}return Object(s.a)("El token enviado no es v\xe1lido"),e.abrupt("return",!1);case 17:return e.next=19,m.json();case 19:if(d=e.sent,0!==c){e.next=56;break}if(!d){e.next=52;break}if(p=d.error,d.status,b=d.body,!0!==p){e.next=33;break}if("Validation error"!==b){e.next=29;break}return Object(s.a)("Ocurri\xf3 un error de validaci\xf3n"),e.abrupt("return",!1);case 29:return Object(s.a)("Ocurri\xf3 un error al realizar la petici\xf3n"),e.abrupt("return",!1);case 31:e.next=50;break;case 33:if(!b){e.next=48;break}if(f=b.code,E=b.data,0!==f){e.next=40;break}return Object(s.c)(E),e.abrupt("return",!1);case 40:if(1!==f){e.next=44;break}return e.abrupt("return",E);case 44:return Object(s.a)(E),e.abrupt("return",!1);case 46:e.next=50;break;case 48:return Object(s.a)("El servicio no retorno informaci\xf3n"),e.abrupt("return",!1);case 50:e.next=54;break;case 52:return Object(s.a)("Ocurri\xf3 un error al realizar la acci\xf3n"),e.abrupt("return",!1);case 54:e.next=57;break;case 56:return e.abrupt("return",d);case 57:e.next=63;break;case 59:return e.prev=59,e.t0=e.catch(3),Object(s.a)("Ocurri\xf3 un error en el conector, por favor comuniquese con Soporte"),e.abrupt("return",!1);case 63:case"end":return e.stop()}}),e,null,[[3,59]])})));return function(a){return e.apply(this,arguments)}}();a.a=m},15:function(e,a,t){"use strict";a.a=function(e){return e.children}},16:function(e,a,t){"use strict";a.a={defaultPath:"/base/home",basename:"/app",layout:"vertical",subLayout:"",collapseMenu:!1,layoutType:"menu-light",headerBackColor:"header-blue",rtlLayout:!1,navFixedLayout:!0,headerFixedLayout:!1,boxLayout:!1,urlApi:"http://127.0.0.1:3100/api/",dias_alerta_cambio_pass:10}},17:function(e,a,t){"use strict";var r=t(0),n=t.n(r),c=t(76),o=t(21),u=t(55),i=t.n(u),s=t(15);a.a=function(){return n.a.createElement(s.a,null,n.a.createElement(c.a,null,n.a.createElement(o.a,null,n.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},n.a.createElement("div",{className:"items-center justify-center flex flex-column flex-wrap"},n.a.createElement(i.a,{type:"bars",color:"#4681FF"}),n.a.createElement("h5",{className:"f5 f4-ns mb0 white"},"Cargando..."))))))}},19:function(e,a,t){"use strict";t.d(a,"a",(function(){return u}));var r=t(20),n=t(5),c=t(11),o=t(0),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=Object(o.useState)(e),t=Object(c.a)(a,2),u=t[0],i=t[1],s=function(){i(e)},l=function(e){var a=e.target;i(Object(n.a)({},u,Object(r.a)({},a.name,a.value.toUpperCase())))};return[u,l,s,i]}},26:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAqCAYAAABSkm6BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOTkxM2VhMy0yMjQ5LTgyNDgtYTY1MS03Zjg0OWQ0MWY1YWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTM2MTJDRURCQ0VFMTFFOUFDQzk4QUQyQzhCQTI3QjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTM2MTJDRUNCQ0VFMTFFOUFDQzk4QUQyQzhCQTI3QjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2I3MjA1ZTktZjRkMy0wMDRkLWE4MTQtYmI2NTBjNDc1OTA2IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6M2Q3ZWE1MTgtOGI0OC0xMWU5LTgwZmYtZTEyZGFjZDAxZDRkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dpkU7wAABG5JREFUeNrsW9FxozAQJR434CsBl0BKwJcKcAm4BPKXyx+UYJVgKsiYEuwSTAlHCT7Js0oUBlZaSWDfnXZGY2KkaNm3b7Ur4afr9RoFmUZe3qMT/0h4q3nL4OuWt+rjLWK9Pgz6NPzeln8f8+tybNwimHcWuQECTQCy58BkvT45b2fRh99b8c+jMo4p4/IA3HwimLIRTVwrQKnCoA+DezGwT3y349c76FcE4OaT88B1jPRJBr6r5TjByADcPJIMXLe9Pt0AiEkv3N7GcQZ2y2DTWaTgLJEgpDI0Iv1luEz5uCOALENrFULlfMKAPSmAsOOsqcc6C0bxjw2ExxRAk+NugD+FcmCWcmCLAWUjgXF/qTz9/PWQjLsMZF2fOv9L83ImBsb9T2ILnKjsf/N2HWl5MO1jApcDeKPpbzDt4wKHSazUK0EeBLgMWcAD6x4YONP1KzUEOMgMwCXEEBhY9yDA5Rb9V8HM9wVuhQB39gg2RR/B6ONAOXKCe8md7JrB/BdEN6fkjbJzIiYrR+6teTuMGEpsmP7wvIOB6dIXcYL8qnEu03lNbFQQoozQqbLZx6QwrkAMI3aumQVTbeRIAE0mSaeJ19sY5iiJS4Nw9MPL+83pJwEOW6skYHX0/TBwqnBpG2JKIuAU458cw3ImThLgXROvwI15axt9Hal3yrVrNjqVFJ6ZF0MEWHlygL1P4LB6jGn+niNJkWvYK8L4Pni+6su9AWiqfmcD5uW+gMM8lA0sto3jjoupMEgY5JtTFSRBz4gOajbqKrkmilQD+j2Djsy19l0YhIIUMdyQh9czsE547w7J1DYa8DIP4Q17li3oGI1k2TvkfmzCuoUD22oioL4K8jr6ejcx0hivQ1jnsubGSDLCNM6rMrKxTcAWmpCSIUlJo1FqqtKAGfbrNH1dwnaqWdMo6/NYomINnEkJQGWjj3BJMcx5IuCwqHGIxg+Y+61EwuXKBTgbT+6XCUMGswWvJfbvLI1vEiqnFivgckQ53WsLsmWa5CCIgyzuZNjUMjmIPXpt56B/OzUwH2/4HEuPRiVv8xDXK1U/03HJRMbvNKVKRQDIG+PmCmO55VqRE9iWTwRcc4cdIhS4OJr31brMcozJ7sIBCZWdJdtV0M9IODfecxTFNvz6lCRLgiEby4fFnKHQFOxjUsL/3Y2Ex1IT7mvHNU6WRHuEdQmETaxWK8DmLQdvo1vXVFEPUoV3XhAvfY7MDiOHBDug3A2UFxdCGFUdyuQQs4NnaYl6Dh2kHg3zAabMN+bIt606+KUOCbgc8SBhmI2Dd2In1uKB1g7AUQVLHqjAyQNUX+/VGIO36Bk3stwpMfE4LJTOlRCRMj7DtW7jsTyII8MD2YWSYscWuyCU9NnHWV3jYCTfoH1jiWOy8+kEnG0NBbgp2Wbyf1JDT2thfaI4UgNjqgmZLJm3tcwDxAtDa96Mxy4j/WsFzKNnNshcBTy4CXu3it7ZAOhnALdxSKhspIaWKFEsH3kG4Uid/GkwVf4IMAAhDlpuwmJEEAAAAABJRU5ErkJggg=="},29:function(e,a,t){"use strict";t.d(a,"b",(function(){return l})),t.d(a,"a",(function(){return m})),t.d(a,"d",(function(){return b})),t.d(a,"c",(function(){return f}));var r=t(3),n=t.n(r),c=t(10),o=t(13),u=t(6),i=t(25),s=t.n(i),l=(new Date((new Date).getTime()+9e5),function(e){return function(){var a=Object(c.a)(n.a.mark((function a(t){var r,c,u,i,l,m,d,b,f,v,h,g,O;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(void 0!==e){a.next=11;break}if(!(r=s.a.get("auth"))){a.next=9;break}return r=atob(r),a.next=6,E();case 6:c=a.sent,i=(u=!!c&&c).userInfo,l=u.accesos,m=u.menu,t(p(r,i,l,m));case 9:a.next=22;break;case 11:return a.next=13,Object(o.a)("auth",{method:"POST",body:JSON.stringify(e)});case 13:if(!(d=a.sent)){a.next=22;break}return b=d.token,!0===e.recordarme?s.a.set("auth",btoa(b),{expires:7}):s.a.set("auth",btoa(b)),a.next=19,E();case 19:f=a.sent,h=(v=!!f&&f).userInfo,g=v.accesos,O=v.menu,t(p(b,h,g,O));case 22:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}),m=function(){return function(){var e=Object(c.a)(n.a.mark((function e(a){var t,r,c,o,u;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:t=e.sent,c=(r=!!t&&t).userInfo,o=r.accesos,u=r.menu,a(d(c,o,u));case 5:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()},d=function(e,a,t){return{type:u.u,payload:{userInfo:e,accesos:a,menu:t,logged:!0}}},p=function(e,a,t,r){return{type:u.m,payload:{token:e,userInfo:a,accesos:t,menu:r,logged:!0}}},b=function(){return{type:u.c}},f=function(){return{type:u.n}},E=function(){var e=Object(c.a)(n.a.mark((function e(){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)("usuario/info");case 2:if(!(a=e.sent)){e.next=7;break}return e.abrupt("return",a);case 7:return e.abrupt("return",{});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},30:function(e,a,t){e.exports=t.p+"static/media/logoDiaco.dcf587ea.jpg"},37:function(e,a,t){},46:function(e,a,t){"use strict";var r=t(0),n=t.n(r);a.a=function(){return n.a.createElement("div",{className:"loader-bg"},n.a.createElement("div",{className:"loader-track"},n.a.createElement("div",{className:"loader-fill"})))}},49:function(e,a,t){"use strict";t.d(a,"a",(function(){return w}));var r=t(3),n=t.n(r),c=t(10),o=t(20),u=t(5),i=t(11),s=t(0),l=t.n(s),m=t(28),d=t(21),p=t(23),b=t(9),f=(t(37),t(19)),E=t(12),v=t(13),h=t(26),g=t.n(h),O=t(29),j=t(16),y=t(17),w=function(e){var a=e.history,t=e.isModal,r=void 0!==t&&t,h=e.setAbrirModal,w=Object(p.c)(),I=Object(s.useState)(!1),N=Object(i.a)(I,2),x=N[0],k=N[1],A=Object(f.a)({password_actual:"",password_nuevo:"",password_confirmar:""}),C=Object(i.a)(A,4),L=C[0],T=C[3],M=function(e){var a=e.target,t=a.name,r=a.value;T(Object(u.a)({},L,Object(o.a)({},t,r)))},S=function(){var e=Object(c.a)(n.a.mark((function e(t){var c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),k(!0),e.next=4,Object(v.a)("usuario/actualizarpassword",{method:"PUT",body:JSON.stringify(L)});case 4:(c=e.sent)&&(Object(E.b)(c),w(Object(O.d)()),!0===r?h(!1):a.replace(j.a.defaultPath)),k(!1);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return l.a.createElement("div",{className:"row align-items-center"},l.a.createElement("div",{className:"col-md-12"},l.a.createElement("div",{className:"card-body"},!0===x?l.a.createElement(y.a,null):l.a.createElement(l.a.Fragment,null,l.a.createElement("img",{src:g.a,alt:"",className:"img-fluid mb-4"}),l.a.createElement("h4",{className:"mb-4 f-w-400"},"Actualizar Contrase\xf1a"),l.a.createElement(b.ValidationForm,{onSubmit:S,onErrorSubmit:function(e,a,t){Object(E.c)("Por favor complete la informaci\xf3n solicitada")}},l.a.createElement(m.a.Row,null,l.a.createElement(m.a.Group,{as:d.a,md:"12"},l.a.createElement(b.TextInput,{name:"password_actual",id:"password_actual",required:!0,errorMessage:"Por favor ingrese su contrase\xf1a actual",value:L.password_actual,onChange:M,placeholder:"Contrase\xf1a Actual",autoComplete:"off",type:"password"})),l.a.createElement(m.a.Group,{as:d.a,md:"12"},l.a.createElement(b.TextInput,{name:"password_nuevo",id:"password_nuevo",type:"password",placeholder:"Nueva Contrase\xf1a",required:!0,pattern:"(?=.*[A-Z]).{6,}",errorMessage:{required:"Ingrese la nueva contrase\xf1a",pattern:"La contrase\xf1a debe de tener al menos 6 caracteres y contener al menos una letra may\xfascula"},value:L.password_nuevo,onChange:M,autoComplete:"off"})),l.a.createElement(m.a.Group,{as:d.a,md:"12"},l.a.createElement(b.TextInput,{name:"password_confirmar",id:"password_confirmar",type:"password",placeholder:"Confirmar Nueva Contrase\xf1a",required:!0,validator:function(e){return e&&e===L.password_nuevo},errorMessage:{required:"Por favor confirme la nueva contrase\xf1a",validator:"La contrase\xf1a no coincide"},value:L.password_confirmar,onChange:M,autoComplete:"off"})),l.a.createElement(m.a.Group,{as:d.a,md:"6"},l.a.createElement("button",{className:"btn btn-block btn-danger mb-4",onClick:function(){!0===r?h(!1):a.replace("/auth/login")}},"Cancelar")),l.a.createElement(m.a.Group,{as:d.a,md:"6"},l.a.createElement("button",{className:"btn btn-block btn-primary mb-4",type:"submit"},"Actualizar"))))))))}},51:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(79),o=t(58),u=t.n(o),i=t(15),s=function(){return n.a.createElement(i.a,null,n.a.createElement("div",{className:"auth-wrapper maintenance"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row justify-content-center"},n.a.createElement("div",{className:"text-center"},n.a.createElement("img",{src:u.a,alt:"",className:"img-fluid"}),n.a.createElement("h5",{className:"text-muted mb-4"},"Ups! P\xe1gina no encontrada!"),n.a.createElement(c.a,{to:"/",className:"btn btn-danger mb-4"},n.a.createElement("i",{className:"feather icon-refresh-ccw mr-2"}),"Reload"))))))};a.default=function(){return n.a.createElement(s,null)}},58:function(e,a,t){e.exports=t.p+"static/media/404.fe3817ae.png"},6:function(e,a,t){"use strict";t.d(a,"f",(function(){return r})),t.d(a,"g",(function(){return n})),t.d(a,"h",(function(){return c})),t.d(a,"i",(function(){return o})),t.d(a,"d",(function(){return u})),t.d(a,"e",(function(){return i})),t.d(a,"l",(function(){return s})),t.d(a,"s",(function(){return l})),t.d(a,"o",(function(){return m})),t.d(a,"j",(function(){return d})),t.d(a,"t",(function(){return p})),t.d(a,"r",(function(){return b})),t.d(a,"k",(function(){return f})),t.d(a,"b",(function(){return E})),t.d(a,"q",(function(){return v})),t.d(a,"p",(function(){return h})),t.d(a,"m",(function(){return g})),t.d(a,"a",(function(){return O})),t.d(a,"c",(function(){return j})),t.d(a,"n",(function(){return y})),t.d(a,"u",(function(){return w}));var r="COLLAPSE_MENU",n="COLLAPSE_TOGGLE",c="FULL_SCREEN",o="FULL_SCREEN_EXIT",u="CHANGE_LAYOUT",i="CHANGE_SUB_LAYOUT",s="LAYOUT_TYPE",l="RESET",m="NAV_BACK_COLOR",d="HEADER_BACK_COLOR",p="RTL_LAYOUT",b="NAV_FIXED_LAYOUT",f="HEADER_FIXED_LAYOUT",E="BOX_LAYOUT",v="NAV_CONTENT_LEAVE",h="NAV_COLLAPSE_LEAVE",g="LOGIN",O="ACTUALIZAR_PERMISOS_Y_MENU",j="CAMBIO_PASSWORD",y="LOGOUT",w="UPDATE_USER_INFO"},62:function(e,a,t){e.exports=t(75)},75:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(24),o=t.n(c),u=t(27),i=t(52),s=t(23);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=t(35),m=t(5),d=t(6),p=t(16),b=Object(m.a)({isOpen:[],isTrigger:[]},p.a,{isFullScreen:!1,logged:!1}),f=function(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,r=arguments.length>1?arguments[1]:void 0,n=[],c=[];switch(r.type){case d.f:return Object(m.a)({},t,{collapseMenu:!t.collapseMenu});case d.g:if("sub"===r.menu.type){c=t.isOpen;var o=(n=t.isTrigger).indexOf(r.menu.id);o>-1&&(c=c.filter((function(e){return e!==r.menu.id})),n=n.filter((function(e){return e!==r.menu.id}))),-1===o&&(c=[].concat(Object(l.a)(c),[r.menu.id]),n=[].concat(Object(l.a)(n),[r.menu.id]))}else{c=t.isOpen;var u=t.isTrigger.indexOf(r.menu.id);n=-1===u?[r.menu.id]:[],c=-1===u?[r.menu.id]:[]}return Object(m.a)({},t,{isOpen:c,isTrigger:n});case d.q:return Object(m.a)({},t,{isOpen:c,isTrigger:n});case d.p:if("sub"===r.menu.type){c=t.isOpen;var i=(n=t.isTrigger).indexOf(r.menu.id);return i>-1&&(c=c.filter((function(e){return e!==r.menu.id})),n=n.filter((function(e){return e!==r.menu.id}))),Object(m.a)({},t,{isOpen:c,isTrigger:n})}return Object(m.a)({},t);case d.h:return Object(m.a)({},t,{isFullScreen:!t.isFullScreen});case d.i:return Object(m.a)({},t,{isFullScreen:!1});case d.d:return Object(m.a)({},t,{layout:r.layout});case d.e:return Object(m.a)({},t,{subLayout:r.subLayout});case d.l:return Object(m.a)({},t,{layoutType:r.layoutType,headerBackColor:b.headerBackColor});case d.o:return Object(m.a)({},t,{layoutType:"menu-light"===t.layoutType?"menu-dark":t.layoutType});case d.j:return Object(m.a)({},t,{headerBackColor:r.headerBackColor});case d.t:return Object(m.a)({},t,{rtlLayout:!t.rtlLayout});case d.r:return Object(m.a)({},t,{navFixedLayout:!t.navFixedLayout});case d.k:return Object(m.a)({},t,{headerFixedLayout:!t.headerFixedLayout,headerBackColor:t.headerFixedLayout||"header-default"!==b.headerBackColor?t.headerBackColor:"header-blue"});case d.b:return Object(m.a)({},t,{boxLayout:!t.boxLayout});case d.s:return Object(m.a)({},t,{layout:b.layout,subLayout:b.subLayout,collapseMenu:b.collapseMenu,layoutType:b.layoutType,headerBackColor:b.headerBackColor,rtlLayout:b.rtlLayout,navFixedLayout:b.navFixedLayout,headerFixedLayout:b.headerFixedLayout,boxLayout:b.boxLayout});case d.m:return Object(m.a)({},t,{token:r.payload.token||"",userInfo:r.payload.userInfo||{},menu:r.payload.menu||[],accesos:r.payload.accesos||[],logged:r.payload.logged||!1,forzar_cambio_password:(null===(e=r.payload.userInfo)||void 0===e?void 0:e.forzar_cambio_password)||!1});case d.a:return Object(m.a)({},t,{menu:r.payload.menu||[],accesos:r.payload.accesos||[]});case d.c:return Object(m.a)({},t,{forzar_cambio_password:!1});case d.n:return Object(m.a)({},t,{token:"",userInfo:{},menu:[],accesos:[],logged:!1,forzar_cambio_password:!1});case d.u:return Object(m.a)({},t,{userInfo:r.payload.userInfo||{},menu:r.payload.menu||[],accesos:r.payload.accesos||[],logged:r.payload.logged||!1,forzar_cambio_password:(null===(a=r.payload.userInfo)||void 0===a?void 0:a.forzar_cambio_password)||!1});default:return t}},E=(t(37),t(80)),v=t(81),h=t(57),g=t(54),O=t.n(g),j=t(46),y=t(3),w=t.n(y),I=t(10),N=t(11),x=t(79),k=t(28),A=t(21),C=t(15),L=t(30),T=t.n(L),M=t(29),S=t(19),F=t(9),R=t(12),_=t(17),G=function(e){var a=e.history,t=(e.location,Object(s.c)()),c=Object(s.d)((function(e){return e})).logged,o=Object(r.useState)(!1),u=Object(N.a)(o,2),i=u[0],l=u[1],d=Object(S.a)({user_name:"BLOPEZ",password:"blopez",recordarme:!1}),b=Object(N.a)(d,4),f=b[0],E=b[3],v=function(){var e=Object(I.a)(w.a.mark((function e(a){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.preventDefault(),l(!0),t(Object(M.b)(f)),l(!1);case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){!0===c&&a.replace(p.a.defaultPath)}),[c]),Object(r.useEffect)((function(){t(Object(M.b)())}),[]),n.a.createElement(C.a,null,n.a.createElement(F.ValidationForm,{onSubmit:v,onErrorSubmit:function(e,a,t){Object(R.c)("Por favor complete la informaci\xf3n solicitada")}},n.a.createElement("div",{className:"auth-wrapper align-items-stretch aut-bg-img"},n.a.createElement("div",{className:"flex-grow-1"},n.a.createElement("div",{className:"h-100 d-md-flex align-items-center auth-side-img"},n.a.createElement("div",{className:"col-sm-10 auth-content w-auto"},n.a.createElement("h1",{className:"text-black my-4"},"Sistema Administrativo DIACO"),n.a.createElement("h4",{className:"text-black font-weight-normal"},"Inicie sesi\xf3n con su cuenta y explore el sistema"))),n.a.createElement("div",{className:"auth-side-form"},n.a.createElement("div",{className:" auth-content"},n.a.createElement("img",{src:T.a,alt:"",className:"img-fluid mb-4 d-block d-xl-none d-lg-none"}),n.a.createElement("h3",{className:"mb-4 f-w-400"},"Iniciar Sesi\xf3n"),!0===i?n.a.createElement(_.a,null):n.a.createElement(n.a.Fragment,null,n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(F.TextInput,{name:"user_name",id:"user_name",required:!0,errorMessage:"Por favor ingrese el nombre de usuario",value:f.user_name,onChange:function(e){var a=e.target.value,t=String(a).trim().toUpperCase();E(Object(m.a)({},f,{user_name:t}))},placeholder:"Nombre de Usuario",autoComplete:"off",type:"text"})),n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(F.TextInput,{name:"password",id:"password",required:!0,value:f.password,onChange:function(e){var a=e.target.value;E(Object(m.a)({},f,{password:a}))},errorMessage:"Por favor ingrese su contrase\xf1a",placeholder:"Contrase\xf1a",autoComplete:"off",type:"password"}))),n.a.createElement("div",{className:"form-group text-left mt-2"},n.a.createElement("div",{className:"checkbox checkbox-primary d-inline"},n.a.createElement("input",{type:"checkbox",name:"checkbox-p-1",id:"checkbox-p-1",checked:f.recordarme,onChange:function(){E(Object(m.a)({},f,{recordarme:!f.recordarme}))}}),n.a.createElement("label",{htmlFor:"checkbox-p-1",className:"cr"},"Recordarme"))),n.a.createElement("button",{className:"btn btn-block btn-primary mb-0",type:"submit"},"Ingresar"),n.a.createElement("div",{className:"text-center"},n.a.createElement("p",{className:"mb-2 text-muted"},n.a.createElement(x.a,{to:"/auth/reset-password",className:"f-w-400"},"\xbfHas olvidado la contrase\xf1a?"))))))))))},D=t(51),U=t(49),B=function(e){return n.a.createElement(C.a,null,n.a.createElement("div",{className:"auth-wrapper"},n.a.createElement("div",{className:"blur-bg-images"}),n.a.createElement("div",{className:"auth-content"},n.a.createElement("div",{className:"card"},n.a.createElement(U.a,e)))))},W=t(26),P=t.n(W),z=t(13),Y=function(e){var a=e.history,t=Object(r.useState)(""),c=Object(N.a)(t,2),o=c[0],u=c[1],i=Object(r.useState)(!1),s=Object(N.a)(i,2),l=s[0],m=s[1],d=function(){var e=Object(I.a)(w.a.mark((function e(t){var r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),m(!0),e.next=4,Object(z.a)("resetpassword",{method:"POST",body:JSON.stringify({email:o})});case 4:(r=e.sent)&&(Object(R.b)(r),u(""),a.replace("/auth/login")),m(!1);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return n.a.createElement(C.a,null,n.a.createElement("div",{className:"auth-wrapper"},n.a.createElement("div",{className:"auth-content"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"row align-items-center text-center"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{className:"card-body"},!0===l?n.a.createElement(_.a,null):n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",{className:"mb-3 f-w-400"},"Restablecer Contrase\xf1a"),n.a.createElement("img",{src:P.a,alt:"",className:"img-fluid mb-4"}),n.a.createElement(F.ValidationForm,{onSubmit:d,onErrorSubmit:function(e,a,t){Object(R.c)("Por favor complete la informaci\xf3n solicitada")}},n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(F.TextInput,{name:"email",id:"email",required:!0,errorMessage:{required:"Por favor ingrese el correo electr\xf3nico registrado",type:"El correo electr\xf3nico no es v\xe1lido"},value:o,onChange:function(e){var a=e.target.value;u(a)},placeholder:"Correo electr\xf3nico registrado",autoComplete:"off",type:"email"})),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement("button",{className:"btn btn-block btn-danger mb-4",onClick:function(){a.replace("/auth/login")}},"Cancelar")),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement("button",{className:"btn btn-block btn-primary mb-4"},"Restablecer"))))))))))))},Q=function(e){return n.a.createElement(Y,e)},J=t(20),Z=function(e){var a=e.match,t=e.history,c=a.params.id,o=Object(r.useState)(!1),u=Object(N.a)(o,2),i=u[0],s=u[1],l=Object(S.a)({id:c,password:"",password_confirmar:""}),d=Object(N.a)(l,4),p=d[0],b=d[3],f=function(e){var a=e.target,t=a.name,r=a.value;b(Object(m.a)({},p,Object(J.a)({},t,r)))},E=function(){var e=Object(I.a)(w.a.mark((function e(a){var r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),s(!0),e.next=4,Object(z.a)("resetpassword",{method:"PUT",body:JSON.stringify(p)});case 4:(r=e.sent)&&(Object(R.b)(r),t.replace("/auth/login")),s(!1);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return n.a.createElement(C.a,null,n.a.createElement("div",{className:"auth-wrapper"},n.a.createElement("div",{className:"auth-content"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"row align-items-center text-center"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{className:"card-body"},!0===i?n.a.createElement(_.a,null):n.a.createElement(n.a.Fragment,null,n.a.createElement("img",{src:P.a,alt:"",className:"img-fluid mb-4"}),n.a.createElement("h4",{className:"mb-3 f-w-400"},"Actualizar Contrase\xf1a"),n.a.createElement(F.ValidationForm,{onSubmit:E,onErrorSubmit:function(e,a,t){Object(R.c)("Por favor complete la informaci\xf3n solicitada")}},n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(F.TextInput,{name:"password",id:"password",type:"password",placeholder:"Nueva Contrase\xf1a",required:!0,pattern:"(?=.*[A-Z]).{6,}",errorMessage:{required:"Ingrese la nueva contrase\xf1a",pattern:"La contrase\xf1a debe de tener al menos 6 caracteres y contener al menos una letra may\xfascula"},value:p.password,onChange:f,autoComplete:"off"})),n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(F.TextInput,{name:"password_confirmar",id:"password_confirmar",type:"password",placeholder:"Confirmar Nueva Contrase\xf1a",required:!0,validator:function(e){return e&&e===p.password},errorMessage:{required:"Por favor confirme la nueva contrase\xf1a",validator:"La contrase\xf1a no coincide"},value:p.password_confirmar,onChange:f,autoComplete:"off"})),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement("button",{className:"btn btn-block btn-danger mb-4",onClick:function(){t.replace("/auth/login")}},"Cancelar")),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement("button",{className:"btn btn-block btn-primary mb-4"},"Actualizar"))))))))))))},V=function(e){return n.a.createElement(Z,e)},q=t(76),H=t(78),K=t(59),X=t(50),$=t(41),ee=t.n($),ae=t(42),te=t.n(ae),re=p.a.urlApi,ne={departamentoId:"",municipioId:"",comercioId:"",sucursalId:"",num_documento:"",fecha_documento:"",descripcion:"",solicitud:""},ce=function(e){e.history;var a=Object(S.a)(ne),t=Object(N.a)(a,4),c=t[0],o=t[1],u=t[3],i=Object(r.useState)([]),s=Object(N.a)(i,2),l=(s[0],s[1],Object(r.useState)([])),m=Object(N.a)(l,2),d=m[0],p=m[1],b=Object(r.useState)([]),f=Object(N.a)(b,2),E=f[0],v=f[1],h=Object(r.useState)([]),g=Object(N.a)(h,2),O=g[0],j=g[1],y=Object(r.useState)([]),x=Object(N.a)(y,2),L=x[0],M=x[1],G=Object(r.useState)(null),D=Object(N.a)(G,2),U=D[0],B=D[1],W={addedfiles:function(e){return B(e)}},P=Object(r.useState)(!1),Y=Object(N.a)(P,2),Q=Y[0],J=Y[1],Z=function(){var e=Object(I.a)(w.a.mark((function e(a){var t,r,n,o,i,s,l,m,d,p,b,f,E,v,h,g,O;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),J(!0),(t=new FormData).append("datos",JSON.stringify(c)),r=1,!U){e.next=40;break}n=!0,o=!1,e.prev=8,s=Object(K.a)(U);case 10:return e.next=12,s.next();case 12:return l=e.sent,n=l.done,e.next=16,l.value;case 16:if(m=e.sent,n){e.next=24;break}d=m,t.append("files",d,"img_".concat(r)),r++;case 21:n=!0,e.next=10;break;case 24:e.next=30;break;case 26:e.prev=26,e.t0=e.catch(8),o=!0,i=e.t0;case 30:if(e.prev=30,e.prev=31,n||null==s.return){e.next=35;break}return e.next=35,s.return();case 35:if(e.prev=35,!o){e.next=38;break}throw i;case 38:return e.finish(35);case 39:return e.finish(30);case 40:return p=re+"queja",(b={}).method="POST",b.body=t,e.prev=44,e.next=47,fetch(p,b);case 47:return f=e.sent,e.next=50,f.json();case 50:E=e.sent,J(!1),E?(v=E.error,E.status,h=E.body,!0===v?ae("Validation error"===h?"Ocurri\xf3 un error de validaci\xf3n":"Ocurri\xf3 un error al intentar registrar la queja","error"):h?(g=h.code,O=h.data,0===g?ae(O,"warning"):1===g?(u(ne),ae(O,"success")):ae(O,"error")):ae("El servicio no retorno informaci\xf3n","error")):ae("Ocurri\xf3 un error al realizar la acci\xf3n","error"),e.next=58;break;case 55:e.prev=55,e.t1=e.catch(44),ae("Ocurri\xf3 un error en la aplicaci\xf3n","error");case 58:case"end":return e.stop()}}),e,null,[[8,26,30,40],[31,,35,39],[44,55]])})));return function(a){return e.apply(this,arguments)}}(),V=function(){var e=Object(I.a)(w.a.mark((function e(a){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(z.a)("queja/deptos?include=0&estadoId=1");case 2:(t=e.sent)&&p(t);case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),q=function(){var e=Object(I.a)(w.a.mark((function e(a){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(z.a)("queja/comers?municipioId=".concat(a));case 2:(t=e.sent)&&j(t);case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),H=function(){var e=Object(I.a)(w.a.mark((function e(a){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(z.a)("queja/muns?include=0&departamentoId=".concat(a,"&estadoId=1"));case 2:(t=e.sent)&&v(t);case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),$=function(){var e=Object(I.a)(w.a.mark((function e(a,t){var r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(z.a)("queja/sucurs?comercioId=".concat(a,"&municipioId=").concat(t,"&estadoId=1"));case 2:(r=e.sent)&&M(r);case 4:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){V()}),[]),Object(r.useEffect)((function(){(null===c||void 0===c?void 0:c.departamentoId)>0&&H(c.departamentoId)}),[c.departamentoId]),Object(r.useEffect)((function(){(null===c||void 0===c?void 0:c.municipioId)>0&&q(c.municipioId)}),[c.municipioId]),Object(r.useEffect)((function(){(null===c||void 0===c?void 0:c.comercioId)>0&&(null===c||void 0===c?void 0:c.municipioId)>0&&$(c.comercioId,c.municipioId)}),[c.comercioId]);var ae=function(e,a){ee()(te.a).fire({title:"Informaci\xf3n!",text:e,type:a,showCloseButton:!0,showCancelButton:!1})},ce="Campo obligatorio";return n.a.createElement(C.a,null,n.a.createElement("div",{className:"auth-wrapper"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{className:"card-body"},!0===Q?n.a.createElement(_.a,null):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"d-flex justify-content-center"},n.a.createElement("img",{src:T.a,alt:"",className:"img-fluid mb-4"})),n.a.createElement("h4",{className:"mb-3 f-w-400"},"Por favor complete toda la informaci\xf3n solicitada por el formulario"),n.a.createElement("hr",null),n.a.createElement(F.ValidationForm,{onSubmit:Z,onErrorSubmit:function(e,a,t){Object(R.c)("Por favor complete la informaci\xf3n solicitada")}},n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement(k.a.Label,{htmlFor:"departamentoId"},"Departamento"),n.a.createElement(F.SelectGroup,{name:"departamentoId",id:"departamentoId",required:!0,value:c.departamentoId,onChange:o,errorMessage:ce},n.a.createElement("option",{value:""},"Seleccione un Departamento"),d.map((function(e){var a=e.departamentoId,t=e.descripcion;return n.a.createElement("option",{value:a,key:"".concat(a,"_depto")},t)})))),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement(k.a.Label,{htmlFor:"municipioId"},"Municipio"),n.a.createElement(F.SelectGroup,{name:"municipioId",id:"municipioId",required:!0,value:c.municipioId,onChange:o,errorMessage:ce},n.a.createElement("option",{value:""},"Seleccione un Municipio"),E.map((function(e){var a=e.municipioId,t=e.descripcion;return n.a.createElement("option",{value:a,key:"".concat(a,"_muns")},t)})))),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement(k.a.Label,{htmlFor:"comercioId"},"Comercio"),n.a.createElement(F.SelectGroup,{name:"comercioId",id:"comercioId",required:!0,value:c.comercioId,onChange:o,errorMessage:ce},n.a.createElement("option",{value:""},"Seleccione un Comercio"),O.map((function(e){var a=e.comercioId,t=e.razon_social;return n.a.createElement("option",{value:a,key:"".concat(a,"_comercios")},t)})))),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement(k.a.Label,{htmlFor:"sucursalId"},"Sucursal"),n.a.createElement(F.SelectGroup,{name:"sucursalId",id:"sucursalId",required:!0,value:c.sucursalId,onChange:o,errorMessage:ce},n.a.createElement("option",{value:""},"Seleccione una Sucursal"),L.map((function(e){var a=e.sucursalId,t=e.nombre;return n.a.createElement("option",{value:a,key:"".concat(a,"_sucursal")},t)})))),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement(k.a.Label,{htmlFor:"num_documento"},"N\xfamero de Factura"),n.a.createElement(F.TextInput,{name:"num_documento",id:"num_documento",value:c.num_documento,onChange:o,errorMessage:ce,placeholder:"N\xfamero de Factura",autoComplete:"off",type:"text"})),n.a.createElement("div",{className:"col-md-6"},n.a.createElement("div",{className:"form-group col"},n.a.createElement("label",{className:"form-label"},"Fecha de Factura"),n.a.createElement("input",{type:"date",id:"fecha_documento",name:"fecha_documento",value:c.fecha_documento,onChange:o,className:"form-control"})))),n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(k.a.Label,{htmlFor:"descripcion"},"Descripci\xf3n"),n.a.createElement(F.TextInput,{name:"descripcion",id:"descripcion",required:!0,multiline:!0,value:c.descripcion,onChange:o,errorMessage:ce,placeholder:"Descripci\xf3n",autoComplete:"off",rows:"3",minLength:"50"}))),n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(k.a.Label,{htmlFor:"solicitud"},"Solicita"),n.a.createElement(F.TextInput,{name:"solicitud",id:"solicitud",required:!0,multiline:!0,value:c.solicitud,onChange:o,errorMessage:ce,placeholder:"Solicitud",autoComplete:"off",rows:"3",minLength:"50"}))),n.a.createElement("hr",null),n.a.createElement("h6",{className:"mb-3 f-w-400"},"Adjuntar im\xe1genes (opcional)"),n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"12"},n.a.createElement(X.DropzoneComponent,{config:{iconFiletypes:[".jpg",".png",".jpeg"],showFiletypeIcon:!0,postUrl:"/"},eventHandlers:W,djsConfig:{addRemoveLinks:!0,acceptedFiles:"image/jpeg,image/png"}}))),n.a.createElement("hr",null),n.a.createElement(k.a.Row,null,n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement("button",{className:"btn btn-block btn-danger mb-4",onClick:function(){}},"Cancelar")),n.a.createElement(k.a.Group,{as:A.a,md:"6"},n.a.createElement("button",{className:"btn btn-block btn-primary mb-4"},"Registrar"))))))))))},oe=function(e){var a=e.history;return n.a.createElement(n.a.Fragment,null,n.a.createElement(q.a,{className:"align-items-center m-l-0"},n.a.createElement(A.a,null),n.a.createElement(A.a,{className:"text-right"},n.a.createElement(H.a,{variant:"info",className:"btn-sm btn-round has-ripple",onClick:function(){a.replace("/auth/login")}},"Ingresar",n.a.createElement("i",{className:"feather icon-user"})))),n.a.createElement(ce,null))},ue=O()({loader:function(){return Promise.all([t.e(13),t.e(16)]).then(t.bind(null,523))},loading:j.a}),ie=function(){return n.a.createElement(E.a,{basename:p.a.basename},n.a.createElement(v.a,null,n.a.createElement(h.a,{exact:!0,path:"/",component:oe}),n.a.createElement(h.a,{exact:!0,path:"/auth/login",component:G}),n.a.createElement(h.a,{exact:!0,path:"/auth/reset-password",component:Q}),n.a.createElement(h.a,{exact:!0,path:"/admin/change-password",component:B}),n.a.createElement(h.a,{exact:!0,path:"/auth/update-password/:id",component:V}),n.a.createElement(h.a,{path:"/base",component:ue}),n.a.createElement(h.a,{component:D.default})))},se="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.c,le=Object(u.d)(f,se(Object(u.a)(i.a))),me=n.a.createElement(s.a,{store:le},n.a.createElement(ie,null));o.a.render(me,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[62,7,11]]]);
//# sourceMappingURL=main.e2010616.chunk.js.map