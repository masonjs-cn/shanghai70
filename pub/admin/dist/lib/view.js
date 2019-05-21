/** layuiAdmin-v1.0.0-beta5 GPL-v2 License By http://www.layui.com/admin/ */
 ;layui.define(["laytpl","layer"],function(e){var t=layui.jquery,n=layui.laytpl,a=layui.layer,r=layui.setter,o=(layui.device(),layui.hint()),i=function(e){return new d(e)},s="LAY_app_body",d=function(e){this.id=e,this.container=t("#"+(e||s))};i.loading=function(e){e.append(this.elemLoad=t('<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon layui-icon-loading layadmin-loading"></i>'))},i.removeLoad=function(){this.elemLoad&&this.elemLoad.remove()},i.exit=function(){layui.data(r.tableName,{key:r.request.tokenName,remove:!0}),location.hash="/user/login"},i.req=function(e){var n=e.success,a=(e.error,r.request),o=r.response,s=function(){return r.debug?"<br><cite>URL：</cite>"+e.url:""};return e.data=e.data||{},e.headers=e.headers||{},a.tokenName&&(e.data[a.tokenName]=a.tokenName in e.data?e.data[a.tokenName]:layui.data(r.tableName)[a.tokenName]||"",e.headers[a.tokenName]=a.tokenName in e.headers?e.headers[a.tokenName]:layui.data(r.tableName)[a.tokenName]||""),delete e.success,delete e.error,t.ajax(t.extend({type:"get",dataType:"json",success:function(t){var a=o.statusCode;if(t[o.statusName]==a.ok)"function"==typeof e.done&&e.done(t);else if(t[o.statusName]==a.logout)i.exit();else{var r=["<cite>Error：</cite> "+(t[o.msgName]||"返回状态码异常"),s()].join("");i.error(r)}"function"==typeof n&&n(t)},error:function(e,t){var n=["请求异常，请重试<br><cite>错误信息：</cite>"+t,s()].join("");i.error(n),"function"==typeof n&&n(res)}},e))},i.popup=function(e){var n=e.success,r=e.skin;delete e.success,delete e.skin,a.open(t.extend({type:1,title:"提示",content:"",id:"LAY-system-view-popup",skin:"layui-layer-admin"+(r?" "+r:""),shadeClose:!0,closeBtn:!1,success:function(e,r){var o=t('<i class="layui-icon" close>&#x1006;</i>');e.append(o),o.on("click",function(){a.close(r)}),"function"==typeof n&&n.apply(this,arguments)}},e))},i.error=function(e,n){return i.popup(t.extend({content:e,maxWidth:300,offset:"t",anim:6,id:"LAY_adminError"},n))},d.prototype.render=function(e){var n=this;layui.router();return e=r.views+e+r.engine,t("#"+s).children(".layadmin-loading").remove(),i.loading(n.container),t.ajax({url:e,type:"get",dataType:"html",data:{v:layui.cache.version},success:function(e){e="<div>"+e+"</div>";var a=t(e).find("title"),r=a.text(),o={title:r,body:e};a.remove(),n.then&&(n.then(o),delete n.then),n.parse(e),i.removeLoad(),n.done&&(n.done(o),delete n.done)},error:function(e){return i.removeLoad(),n.render.isError?i.error("请求视图文件异常，状态："+e.status):(404===e.status?n.render("template/tips/404"):n.render("template/tips/error"),void(n.render.isError=!0))}}),n},d.prototype.parse=function(e,a,r){var s=this,d="object"==typeof e,l=d?e:t(e),u=d?e:l.find("*[template]"),c=function(e){var t=n(e.dataElem.html());e.dataElem.after(t.render(e.res||{})),"function"==typeof r&&r();try{e.done&&new Function("d",e.done)(e.res)}catch(a){console.error(e.dataElem[0],"\n存在错误回调脚本\n\n",a)}};l.find("title").remove(),s.container[a?"after":"html"](l.children());for(var y=u.length;y>0;y--)!function(){var e=u.eq(y-1),t=e.attr("lay-done")||e.attr("lay-then"),a=n(e.attr("lay-url")||"").render(layui.router()),r=n(e.attr("lay-data")||"").render(layui.router()),s=n(e.attr("lay-headers")||"").render(layui.router());try{r=new Function("return "+r+";")()}catch(d){o.error("lay-data: "+d.message),r={}}try{s=new Function("return "+s+";")()}catch(d){o.error("lay-headers: "+d.message),s=s||{}}a?i.req({type:e.data("lay-type")||"get",url:a,data:r,dataType:"json",headers:s,success:function(n){c({dataElem:e,res:n,done:t})}}):c({dataElem:e,done:t})}();return s},d.prototype.send=function(e,t){var a=n(e||this.container.html()).render(t||{});return this.container.addClass(SHOW).html(a),this},d.prototype.refresh=function(e){var t=this,n=t.container.next(),a=n.attr("lay-templateid");return t.id!=a?t:(t.parse(t.container,"refresh",function(){t.container.siblings('[lay-templateid="'+t.id+'"]:last').remove(),"function"==typeof e&&e()}),t)},d.prototype.then=function(e){return this.then=e,this},d.prototype.done=function(e){return this.done=e,this},e("view",i)});