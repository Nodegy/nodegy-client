(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bb201"],{"39af":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"strategy-view"},[n("ErrorOverlay",[n("page-title",{attrs:{heading:"Mod Dashboard",subheading:"",icon:"pe-7s-graph3"}}),n("b-card",{staticClass:"admin-dash-card"},[n("b-tabs",{attrs:{"content-class":"mt-3",align:"center"}},[n("b-tab",{attrs:{title:"Signup Keys"}},[n("ManageSignupKeys")],1),n("b-tab",{attrs:{title:"Mailing List"}},[n("ManageMailingList")],1),n("b-tab",{attrs:{title:"Feedback"}},[n("ManageFeedback")],1),n("b-tab",{attrs:{title:"Users"}},[n("ManageUsers")],1),n("b-tab",{attrs:{title:"Webhooks"}},[n("ManageWebhooks")],1)],1)],1)],1),n("RequestResponseArea",{on:{isErr:function(t){e.isResErr=!0}}})],1)},r=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},i=[],c=n("d4ec"),u=n("bee2"),l=n("bc3a"),o=n.n(l),d="http://nodegyserver-env-1.eba-mup3v75d.ap-southeast-1.elasticbeanstalk.com/mod/feedback/",b=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,[{key:"getAll",value:function(){return o.a.get(d+"findall")}},{key:"setHandled",value:function(e,t){return o.a.patch(d+"updatehandled",{_id:e,handled:t}).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"delete",value:function(e){return o.a.delete(d+"deleteone/".concat(e))}}]),e}(),f=(new b,{name:"ManageFeedback",components:{},data:function(){return{}},methods:{}}),p=f,m=n("2877"),h=Object(m["a"])(p,s,i,!1,null,null,null),g=h.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ModTable",{ref:"manageMailingListModTable",attrs:{dataTableItems:[{label:null,data:null}],inputFields:e.fields,items:e.mailingList,label:"Addressess"},on:{delete:e.onDelete,refresh:e.loadMailingList}},[n("div",{staticClass:"text-left",staticStyle:{"max-width":"400px"}},[n("span",[e._v(" Add to Mailing List: ")]),n("div",{staticClass:"d-flex",staticStyle:{width:"400px"}},[n("b-form-input",{attrs:{placeholder:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),n("b-button",{attrs:{disabled:!e.form.email,size:"sm"},on:{click:function(t){return t.preventDefault(),e.addToList.apply(null,arguments)}}},[e._v(" Submit ")])],1)])])],1)},y=[],k=n("1da1"),x=n("5530"),O=(n("d81d"),n("96cf"),n("d3b7"),n("5d32")),j=n("4360"),w="mod/mailinglist/",S="Mod Mailing List",_=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,[{key:"getMailingList",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(O["b"])(S,"get",w+"get");case 3:if(t=e.sent,!t){e.next=8;break}return e.next=7,j["a"].dispatch("mailingList/init",t.data.payload);case 7:return e.abrupt("return",Promise.resolve(t));case 8:e.next=16;break;case 11:return e.prev=11,e.t0=e["catch"](0),e.next=15,Object(O["a"])(S,"get",e.t0);case 15:return e.abrupt("return",Promise.reject(e.t0));case 16:case 17:case"end":return e.stop()}}),e,null,[[0,11]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"deleteAddresses",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={_ids:t},e.next=4,Object(O["b"])(S,"patch",w+"delete",n);case 4:if(a=e.sent,!a){e.next=9;break}return e.next=8,j["a"].dispatch("mailingList/delete",t);case 8:return e.abrupt("return",Promise.resolve(a));case 9:e.next=17;break;case 12:return e.prev=12,e.t0=e["catch"](0),e.next=16,Object(O["a"])(S,"delete",e.t0);case 16:return e.abrupt("return",Promise.reject(e.t0));case 17:case 18:case"end":return e.stop()}}),e,null,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),K=new _,M=n("4ed2"),R=n("2f62"),T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-center"},[n("div",{staticStyle:{height:"300px"}},[e.items.length<1?n("i",{staticClass:"material-icons md-48",staticStyle:{margin:"100px 0"},attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.$emit("refresh")}}},[e._v(" refresh ")]):[n("b-table",{ref:"selectableTable",staticClass:"mx-auto",staticStyle:{height:"100%","max-width":"600px"},attrs:{striped:"",hover:"",items:e.items,fields:e.fields,sortable:"","select-mode":"range",responsive:"",selectable:"",sticky:""},on:{"row-selected":e.onRowSelected}})]],2),n("div",{staticClass:"mx-auto",staticStyle:{width:"fit-content"}},[n("b-button-toolbar",{attrs:{"aria-label":"Toolbar with buttons"}},[n("b-button-group",{staticClass:"mt-3",attrs:{size:"sm"}},[n("b-button",{attrs:{variant:"primary"},on:{click:function(t){return t.preventDefault(),e.selectAllRows.apply(null,arguments)}}},[e._v("Select All")]),n("b-button",{attrs:{disabled:e.selected.length<1},on:{click:function(t){return t.preventDefault(),e.clearSelected.apply(null,arguments)}}},[e._v("Clear")]),n("b-button",{on:{click:function(t){return t.preventDefault(),e.$emit("refresh")}}},[n("i",{staticClass:"material-icons align-middle"},[e._v(" refresh ")])])],1),n("b-button-group",{staticClass:"mt-3",attrs:{size:"sm"}},[n("b-button",{attrs:{variant:"danger",disabled:!e.selected.length},on:{click:function(t){return t.preventDefault(),e.onDelete.apply(null,arguments)}}},[e._v("Delete")])],1)],1)],1),n("b-table-simple",{staticClass:"mx-auto",staticStyle:{"max-width":"200px"}},[n("b-tbody",[n("b-tr",[n("b-th",[e._v("Total "+e._s(e.label)+":")]),n("b-td",[e._v(e._s(e.items.length))])],1),n("b-tr",[n("b-th",[e._v("Total Selected:")]),n("b-td",[e._v(e._s(e.selected.length))])],1),e._l(e.dataTableItems,(function(t,a){return n("b-tr",{key:"data-table-item-"+a},[n("b-th",[e._v(e._s(t.label))]),n("b-td",[e._v(e._s(t.data))])],1)}))],2)],1),e._t("default")],2)},A=[],L=n("53ca"),P=(n("159b"),n("caad"),n("2532"),n("b64b"),n("ce96")),D=n("1947"),$=n("12aa"),C=n("a026"),E=n("c637"),F=n("a723"),I=n("9bfa"),U=n("906c"),G=n("6b77"),z=n("cf75"),N=n("8c18"),W=[".btn:not(.disabled):not([disabled]):not(.dropdown-item)",".form-control:not(.disabled):not([disabled])","select:not(.disabled):not([disabled])",'input[type="checkbox"]:not(.disabled)','input[type="radio"]:not(.disabled)'].join(","),q=Object(z["d"])({justify:Object(z["c"])(F["g"],!1),keyNav:Object(z["c"])(F["g"],!1)},E["f"]),J=C["default"].extend({name:E["f"],mixins:[N["a"]],props:q,mounted:function(){this.keyNav&&this.getItems()},methods:{getItems:function(){var e=Object(U["A"])(W,this.$el);return e.forEach((function(e){e.tabIndex=-1})),e.filter((function(e){return Object(U["s"])(e)}))},focusFirst:function(){var e=this.getItems();Object(U["d"])(e[0])},focusPrev:function(e){var t=this.getItems(),n=t.indexOf(e.target);n>-1&&(t=t.slice(0,n).reverse(),Object(U["d"])(t[0]))},focusNext:function(e){var t=this.getItems(),n=t.indexOf(e.target);n>-1&&(t=t.slice(n+1),Object(U["d"])(t[0]))},focusLast:function(){var e=this.getItems().reverse();Object(U["d"])(e[0])},onFocusin:function(e){var t=this.$el;e.target!==t||Object(U["f"])(t,e.relatedTarget)||(Object(G["f"])(e),this.focusFirst(e))},onKeydown:function(e){var t=e.keyCode,n=e.shiftKey;t===I["i"]||t===I["f"]?(Object(G["f"])(e),n?this.focusFirst(e):this.focusPrev(e)):t!==I["a"]&&t!==I["g"]||(Object(G["f"])(e),n?this.focusLast(e):this.focusNext(e))}},render:function(e){var t=this.keyNav;return e("div",{staticClass:"btn-toolbar",class:{"justify-content-between":this.justify},attrs:{role:"toolbar",tabindex:t?"0":null},on:t?{focusin:this.onFocusin,keydown:this.onKeydown}:{}},[this.normalizeSlot()])}}),Z=n("29a1"),H=n("d82f"),B=n("493b"),Q=n("31df"),V=n("90ef"),X=n("48f9"),Y=n("712b");function ee(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ee(Object(n),!0).forEach((function(t){ne(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ee(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ae=Object(z["d"])(Object(H["l"])(te(te(te({},V["b"]),X["a"]),Y["a"])),E["Z"]),re=C["default"].extend({name:E["Z"],mixins:[B["a"],Q["a"],V["a"],N["a"],Y["b"],X["b"]],props:ae,computed:{isTableSimple:function(){return!0}}}),se=n("0809"),ie=n("6cf6"),ce=n("2a2e"),ue=n("a247"),le={name:"mod-table",components:{"b-button":D["a"],"b-button-group":$["a"],"b-button-toolbar":J,"b-table":Z["a"],"b-table-simple":re,"b-td":se["a"],"b-th":ie["a"],"b-tr":ce["a"],"b-tbody":ue["a"]},props:{dataTableItems:{type:Array,default:function(){return[{label:null,data:null}]}},inputFields:{type:Array},items:{type:Array},label:{type:String,default:"items"}},data:function(){return{fields:[],selected:[]}},mounted:function(){var e=this;this.inputFields.forEach((function(t){"object"===Object(L["a"])(t)&&Object.keys(t).includes("key")&&"createdAt"==t.key&&(t={key:"createdAt",label:"Created",sortable:!0,default:null,formatter:function(t){return Object(P["formatTime"])(t,e.$store.state.prefs.timezone,e.$store.state.prefs.timeFormat)}}),e.fields.push(t)}))},methods:{onRowSelected:function(e){this.selected=e},selectAllRows:function(){this.$refs.selectableTable.selectAllRows()},clearSelected:function(){this.$refs.selectableTable.clearSelected()},onDelete:function(){this.selected.length&&this.$emit("delete",this.selected)}}},oe=le,de=Object(m["a"])(oe,T,A,!1,null,null,null),be=de.exports,fe=n("4797"),pe={name:"mod-manage-mailing-list",components:{ModTable:be,"b-button":D["a"],"b-form-input":fe["a"]},data:function(){return{fields:["email",{key:"createdAt"}],form:{email:null}}},computed:Object(x["a"])({},Object(R["c"])({mailingList:"mailingList/getMailingList"})),methods:{loadMailingList:function(){return Object(k["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,K.getMailingList();case 3:e.next=7;break;case 5:e.prev=5,e.t0=e["catch"](0);case 7:case"end":return e.stop()}}),e,null,[[0,5]])})))()},addToList:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M["a"].add(e.form.email);case 3:t.next=7;break;case 5:t.prev=5,t.t0=t["catch"](0);case 7:case"end":return t.stop()}}),t,null,[[0,5]])})))()},onDelete:function(e){var t=this;return Object(k["a"])(regeneratorRuntime.mark((function n(){var a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.map((function(e){return e._id})),n.next=3,K.deleteAddresses(a);case 3:r=n.sent,r&&t.$refs.manageMailingListModTable.clearSelected();case 5:case"end":return n.stop()}}),n)})))()}}},me=pe,he=Object(m["a"])(me,v,y,!1,null,null,null),ge=he.exports,ve=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ModTable",{ref:"manageSignupKeysModTable",attrs:{dataTableItems:[{label:"Total Used Keys",data:e.numberOfUsedKeys}],inputFields:e.fields,items:e.signupKeys,label:"Signup Keys"},on:{delete:e.onDelete,refresh:e.loadSignupKeys}},[n("div",{staticClass:"text-left",staticStyle:{"max-width":"400px"}},[n("span",[e._v(" Generate Signup Keys: ")]),n("div",{staticClass:"d-flex",staticStyle:{width:"400px"}},[n("b-form-input",{attrs:{placeholder:"# keys to generate"},model:{value:e.numKeysToGenerate,callback:function(t){e.numKeysToGenerate=t},expression:"numKeysToGenerate"}}),n("b-button",{attrs:{disabled:!e.numKeysToGenerate,size:"sm"},on:{click:function(t){return t.preventDefault(),e.generateSignupKeys.apply(null,arguments)}}},[e._v(" Submit ")])],1)])])],1)},ye=[],ke=(n("4de4"),"adm/signupkeys/"),xe="Admin Signup Keys",Oe=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,[{key:"delete",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={_ids:t},e.next=4,Object(O["b"])(xe,"patch",ke+"delete",n);case 4:if(a=e.sent,!a){e.next=9;break}return e.next=8,j["a"].dispatch("signupKeys/delete",t);case 8:return e.abrupt("return",Promise.resolve(a));case 9:e.next=17;break;case 12:return e.prev=12,e.t0=e["catch"](0),e.next=16,Object(O["a"])(xe,"delete",e.t0);case 16:return e.abrupt("return",Promise.reject(e.t0));case 17:case"end":return e.stop()}}),e,null,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"generateSignupKeys",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n={generateSignupKeys:!0,total:t},e.next=4,Object(O["b"])(xe,"patch",ke+"generate",n);case 4:if(a=e.sent,!a){e.next=9;break}return e.next=8,j["a"].dispatch("signupKeys/init",a.data.payload);case 8:return e.abrupt("return",Promise.resolve(a));case 9:e.next=17;break;case 12:return e.prev=12,e.t0=e["catch"](0),e.next=16,Object(O["a"])(xe,"generate",e.t0);case 16:return e.abrupt("return",Promise.reject(e.t0));case 17:case"end":return e.stop()}}),e,null,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getSignupKeys",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(O["b"])(xe,"get",ke+"getall");case 3:if(t=e.sent,!t){e.next=7;break}return e.next=7,j["a"].dispatch("signupKeys/init",t.data.payload);case 7:e.next=15;break;case 10:return e.prev=10,e.t0=e["catch"](0),e.next=14,Object(O["a"])(xe,"getAll",e.t0);case 14:return e.abrupt("return",Promise.reject(e.t0));case 15:case"end":return e.stop()}}),e,null,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()}]),e}(),je=new Oe,we={name:"ModManageWebhooks",components:{ModTable:be,"b-button":D["a"],"b-form-input":fe["a"]},data:function(){return{fields:["key",{key:"isUsed",sortable:!0},{key:"createdAt",sortable:!0}],numKeysToGenerate:null}},computed:Object(x["a"])(Object(x["a"])({},Object(R["c"])({signupKeys:"signupKeys/getSignupKeys"})),{},{numberOfUsedKeys:function(){return this.signupKeys.filter((function(e){return e.isUsed})).length}}),methods:{loadSignupKeys:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.getSignupKeys();case 3:n=t.sent,n&&(e.allKeys=n.data.payload),t.next=9;break;case 7:t.prev=7,t.t0=t["catch"](0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})))()},onDelete:function(e){var t=this;return Object(k["a"])(regeneratorRuntime.mark((function n(){var a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.map((function(e){return e._id})),n.next=3,je.delete(a);case 3:r=n.sent,r&&t.$refs.manageSignupKeysModTable.clearSelected();case 5:case"end":return n.stop()}}),n)})))()},generateSignupKeys:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.numKeysToGenerate&&(n=parseInt(e.numKeysToGenerate)),!n){t.next=5;break}return t.next=4,je.generateSignupKeys(n);case 4:t.sent;case 5:case"end":return t.stop()}}),t)})))()}}},Se=we,_e=Object(m["a"])(Se,ve,ye,!1,null,null,null),Ke=_e.exports,Me=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},Re=[],Te=(n("377c"),"http://nodegyserver-env-1.eba-mup3v75d.ap-southeast-1.elasticbeanstalk.com/mod/webhook/"),Ae=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,[{key:"getAllWebhooks",value:function(){return o.a.get(Te+"findall")}},{key:"create",value:function(e,t){return o.a.post(Te+"create/".concat(e),t)}}]),e}(),Le=(new Ae,{name:"ModManageWebhooks",components:{},data:function(){return{}},methods:{}}),Pe=Le,De=Object(m["a"])(Pe,Me,Re,!1,null,null,null),$e=De.exports,Ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},Ee=[],Fe="http://nodegyserver-env-1.eba-mup3v75d.ap-southeast-1.elasticbeanstalk.com/mod/user/",Ie=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,[{key:"getAllUserInfo",value:function(){return o.a.get(Fe+"findall")}},{key:"create",value:function(e){return o.a.post(Fe+"create",e)}},{key:"updateUserName",value:function(e,t){return o.a.patch(Fe+"update",{uid:e,username:t})}},{key:"updateUserEmail",value:function(e,t){return o.a.patch(Fe+"update",{uid:e,email:t})}},{key:"delete",value:function(e){return o.a.delete(Fe+"delete/".concat(e))}}]),e}(),Ue=(new Ie,{name:"UserList",components:{},data:function(){return{}},methods:{}}),Ge=Ue,ze=Object(m["a"])(Ge,Ce,Ee,!1,null,null,null),Ne=ze.exports,We=n("d4ad"),qe=n("205f"),Je=n("6190"),Ze=n("f902"),He=(n("6f44"),n("2af9")),Be={name:"Strategy",components:{ErrorOverlay:He["b"],PageTitle:We["a"],ManageFeedback:g,ManageMailingList:ge,ManageSignupKeys:Ke,ManageUsers:Ne,ManageWebhooks:$e,RequestResponseArea:He["i"],"b-card":qe["a"],"b-tab":Je["a"],"b-tabs":Ze["a"]},data:function(){return{isResErr:!1}},methods:{}},Qe=Be,Ve=Object(m["a"])(Qe,a,r,!1,null,null,null);t["default"]=Ve.exports}}]);