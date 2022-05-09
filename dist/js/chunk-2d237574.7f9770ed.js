(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d237574"],{fb68:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"feedback-page col-md-8"},[r("page-title",{attrs:{heading:"Feedback",subheading:"Please feel free to submit feedback and let us know about any issues you've run into, improvements you've thought of, things you like and things you don't like!",icon:"pe-7s-note"}}),r("div",{staticClass:"card mb-3"},[r("b-row",{attrs:{"align-h":"center"}},[r("h1",[e._v("Feedback")])]),e.successful?e._e():r("b-row",[r("b-col",[r("ValidationObserver",{ref:"observer",on:{submit:function(t){return t.preventDefault(),e.onSave.apply(null,arguments)},reset:e.resetForm},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.invalid;return[r("b-form",[r("ValidationProvider",{attrs:{name:"Subject",rules:"required|min:3"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("b-form-group",{attrs:{id:"subject-group",label:"Enter a Subject","label-for":"subject-input"}},[r("b-form-input",{attrs:{id:"subject-input",type:"text",placeholder:"(required)",required:""},model:{value:e.feedback.subject,callback:function(t){e.$set(e.feedback,"subject",t)},expression:"feedback.subject"}}),r("b-form-invalid-feedback",{staticClass:"auth-invalid-feedback",attrs:{state:!1}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),r("ValidationProvider",{attrs:{name:"Feedback",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("b-form-group",{attrs:{id:"feedback-group",label:"Feedback","label-for":"feedback-input"}},[r("b-form-textarea",{attrs:{id:"feedback-input",type:"text",placeholder:"(required)",rows:"3","max-rows":"6",required:""},model:{value:e.feedback.body,callback:function(t){e.$set(e.feedback,"body",t)},expression:"feedback.body"}}),r("b-form-invalid-feedback",{staticClass:"auth-invalid-feedback",attrs:{state:!1}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),r("b-button",{attrs:{disabled:a,type:"submit",variant:"primary"}},[e._v("Submit")]),r("b-button",{attrs:{type:"reset",variant:"danger"}},[e._v("Reset")])],1)]}}],null,!1,1442194869)})],1)],1),e.displayMsg?[r("b-row",{attrs:{"align-h":"center"}},[e._v(" "+e._s(e.displayMsg)+" ")]),r("b-row",{attrs:{"align-h":"center"}},[r("b-button",{attrs:{variant:"primary"},on:{click:function(t){return t.preventDefault(),e.submitMoreFeedback.apply(null,arguments)}}},[e._v("Submit more feedback? ")])],1)]:e._e()],2)],1)},n=[],s=r("1da1"),u=r("5530"),c=(r("96cf"),r("2f62")),i=r("5661"),o=r("d4ad"),b=r("d4ec"),d=r("bee2"),l=(r("d3b7"),r("5d32")),f="usr/feedback/",p="Feedback",m=function(){function e(){Object(b["a"])(this,e)}return Object(d["a"])(e,[{key:"create",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r={userId:t.userId,email:t.email,subject:t.subject,body:t.body},e.next=4,Object(l["b"])(p,"create",f,r);case 4:return a=e.sent,e.abrupt("return",Promise.resolve(a));case 8:return e.prev=8,e.t0=e["catch"](0),e.next=12,Object(l["a"])(p,"create",e.t0);case 12:return e.abrupt("return",Promise.reject(e.t0));case 13:case 14:case"end":return e.stop()}}),e,null,[[0,8]])})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),v=new m,k=r("1947"),h=r("11de"),y=r("8226"),g=r("9c7d"),w=r("4797"),j=r("3010"),_=r("a15b"),x=r("b28b"),F={components:{PageTitle:o["a"],"b-button":k["a"],"b-form":h["a"],"b-form-group":y["a"],"b-form-textarea":g["a"],"b-form-input":w["a"],"b-form-invalid-feedback":j["a"],"b-row":_["a"],"b-col":x["a"]},data:function(){return{feedback:new i["a"]("","",""),successful:!1,displayMsg:null}},computed:Object(u["a"])({},Object(c["d"])("auth",["user"])),methods:{onSave:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.feedback.email=e.user.email,t.next=4,e.$refs.observer.validate();case 4:if(r=t.sent,r){t.next=7;break}return t.abrupt("return");case 7:return t.next=9,v.create(e.feedback);case 9:a=t.sent,a&&(e.successful=!0,e.displayMsg="Feedback Successfully Submitted."),t.next=15;break;case 13:t.prev=13,t.t0=t["catch"](0);case 15:case"end":return t.stop()}}),t,null,[[0,13]])})))()},resetForm:function(){this.feedback=new i["a"]("","","")},submitMoreFeedback:function(){this.resetForm(),this.displayMsg=null,this.successful=!1}}},S=F,O=r("2877"),M=Object(O["a"])(S,a,n,!1,null,"dbf96958",null);t["default"]=M.exports}}]);