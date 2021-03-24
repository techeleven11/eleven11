app.directive("usernameValidation",["$compile","CSS",function(r,e){return{restrict:"E",scope:!0,template:'<div style="color:red" class="'+e.errormsg_box+'" ng-if="hasError">{{message}}</div>',link:function(r,e,o){r.form="",r.field="",o.hasOwnProperty("formObj")&&""!=o.formObj&&(r.form=o.formObj,r.objectBased=!0),o.hasOwnProperty("fieldTarget")&&""!=o.fieldTarget&&(r.field=o.fieldTarget),r.$parent[r.form].hasOwnProperty(r.field)||(r.$parent[r.form][r.field]=""),r.$watch(function(){return r.$parent[r.form][r.field]},function(e,o){r.hasOwnProperty("hasError")?r.logic(e)?r.hasError=!1:(r.message="Username must have 6 Characters",r.hasError=!0):r.hasError=!1,r.hasError?r.$parent[r.form].error[r.field]=!0:typeof r.$parent[r.form]==Object&&typeof r.$parent[r.form].error==Object&&delete r.$parent[r.form].error[r.field]},!0)},controller:function(r){r.logic=function(r){return!(r.length<6)}}}}]),app.directive("emailValidation",["$compile","CSS",function(r,e){return{restrict:"E",scope:!0,template:'<div style="color:red" class="'+e.errormsg_box+'" ng-if="hasError">{{message}}</div>',link:function(r,e,o){r.form="",r.field="",o.hasOwnProperty("formObj")&&""!=o.formObj&&(r.form=o.formObj,r.objectBased=!0),o.hasOwnProperty("fieldTarget")&&""!=o.fieldTarget&&(r.field=o.fieldTarget),r.$parent[r.form].hasOwnProperty(r.field)||(r.$parent[r.form][r.field]=""),r.$watch(function(){return r.$parent[r.form][r.field]},function(e,o){if(null==e||null==e)return!1;r.hasOwnProperty("hasError")?r.logic(e)?r.hasError=!1:(r.message="Please Enter a valid email",r.hasError=!0):r.hasError=!1,r.hasError?typeof r.$parent[r.form]==Object&&typeof r.$parent[r.form].error==Object?r.$parent[r.form].error[r.field]=!0:(r.$parent[r.form].error={},r.$parent[r.form].error[r.field]=!0):typeof r.$parent[r.form]==Object&&typeof r.$parent[r.form].error==Object&&delete r.$parent[r.form].error[r.field]},!0)},controller:function(r){r.logic=function(r){return!!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r)}}}}]),app.directive("passwordValidation",["$compile","CSS",function(r,e){return{restrict:"E",scope:!0,template:'<div style="color:red" class="'+e.errormsg_box+'" ng-if="hasError">{{message}}</div>',link:function(r,e,o){r.form="",r.field="",o.hasOwnProperty("formObj")&&""!=o.formObj&&(r.form=o.formObj,r.objectBased=!0),o.hasOwnProperty("fieldTarget")&&""!=o.fieldTarget&&(r.field=o.fieldTarget),r.$parent[r.form].hasOwnProperty(r.field)||(r.$parent[r.form][r.field]=""),r.$watch(function(){return r.$parent[r.form][r.field]},function(e,o){if(null==e||null==e)return!1;r.hasOwnProperty("hasError")?r.logic(e)?r.hasError=!1:(r.message="Password must have One capital, One Number and 6 character long",r.hasError=!0):r.hasError=!1,r.hasError?r.$parent[r.form].error[r.field]=!0:typeof r.$parent[r.form]==Object&&typeof r.$parent[r.form].error==Object&&delete r.$parent[r.form].error[r.field]},!0)},controller:function(r){r.logic=function(r){return!!/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9])(.{6,15})$/.test(r)}}}}]);var compareTo=function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(r,e,o,t){t.$validators.compareTo=function(e){return e==r.otherModelValue},r.$watch("otherModelValue",function(){t.$validate()})}}};app.directive("compareTo",compareTo);