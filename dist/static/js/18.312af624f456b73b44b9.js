webpackJsonp([18],{"+Jjd":function(e,t,n){"use strict";(function(e){var a=n("fxnj"),i=(n.n(a),n("CaOM")),o=n("facN");n.n(o);t.a={data:function(){return{arr:["保密","男","女"],change:0,avatarSrc:Object(i.f)("avatar"),faceSrc:"",nickName:Object(i.f)("nickName"),name:Object(i.f)("childName"),sex:"",face:"",mobile:""}},created:function(){document.title="设置",this.sex=this.arr[Object(i.f)("childSex")],this.mobile=Object(i.f)("mobile"),this.avatarSrc=Object(i.f)("avatar"),Object(i.b)()},activated:function(){},mounted:function(){},methods:{tobindMobile:function(){this.$router.push("/bindMobile")},aa:function(){},check:function(){e(".msk").fadeIn(100),e(".check").animate({bottom:"0"},100)},getLibrary:function(){},hide:function(){e(".msk").fadeOut(100),e(".check").animate({bottom:"-2rem"},100),e(".childSex").animate({bottom:"-2.8rem"},100)},preview:function(e){this.$router.push("/mine/avatar"),Object(i.j)("avatar",e.target.src)},showSex:function(){e(".msk").fadeIn(100),e(".childSex").animate({bottom:"-0.1rem"},100)},checkSex:function(t){this.sex=t.target.innerText,e(".msk").fadeOut(100),e(".childSex").animate({bottom:"-2.8rem"},100)},onFileChange:function(t){var n=this;e(".msk").fadeOut(1),e(".check").animate({bottom:"-2rem"},1);var a=document.querySelector("img"),c=t.target.files||t.dataTransfer.files,r=(new Image,new FileReader);o.Indicator.open("上传中..."),r.readAsDataURL(c[0]),r.onload=function(e){console.log(e,1),a.src=e.target.result,n.avatarSrc=e.target.result,n.faceSrc=1,console.log(n.$refs.avatarInput.files[0]);var t=new FormData;t.append("face",n.$refs.avatarInput.files[0]),t.append("token",123),t.append("user_id",Object(i.e)("src_user_id"));var c=i.c+"/peony/activity/userAvatarUpload";console.log(123123),n.$http.post(c,t,{emulateJSON:!0}).then(function(e){o.Indicator.close(),0==e.body.code?(n.face=e.body.data.result.face,console.log(e.body.data.result.face)):-1==e.body.code&&Object(o.Toast)(e.body.msg)})}},save:function(){if(!this.nickName){var e=Object(o.Toast)("请填写昵称");return void setTimeout(function(){console.log(11111111111),e.close()},1e3)}var t=this;Object(i.j)("avatar",i.c+t.face);var n={token:123,user_id:Object(i.e)("src_user_id"),face:t.face,nickname:t.nickName,child_name:t.name,child_sex:"保密"==t.sex?0:"男"==t.sex?1:2},a=i.c+"/peony/activity/userInfoSetting";this.$http.post(a,n,{emulateJSON:!0}).then(function(e){if(0==e.body.code){var n=Object(o.Toast)("保存成功");setTimeout(function(){n.close(),t.$router.push("/mine/myCenter")},1e3),console.log(e.body.data.result)}else-1==e.body.code&&Object(o.Toast)(e.body.msg)})}},filters:{formateTime:function(e,t){return e.replace(/-/g,t)}},destroyed:function(){Object(i.d)()}}}).call(t,n("7t+N"))},"/hZZ":function(e,t,n){t=e.exports=n("BkJT")(!1),t.push([e.i,".contentBox .avatar[data-v-4c51895a]{margin:.1rem 0;height:1.2rem;font-size:13px;line-height:1.2rem;background:#fff;overflow:hidden;padding:0 .2rem;color:#999}@media screen and (min-width:375px) and (max-width:414px){.contentBox .avatar[data-v-4c51895a]{font-size:14px}}@media screen and (min-width:414px){.contentBox .avatar[data-v-4c51895a]{font-size:15px}}.contentBox .avatar img[data-v-4c51895a]{width:.9rem;height:.9rem;margin-top:.15rem;border-radius:50%;border:.02rem solid #dbdbdb}.contentBox .avatar i[data-v-4c51895a]{float:right;margin-left:.1rem;font-size:12px}@media screen and (min-width:375px) and (max-width:414px){.contentBox .avatar i[data-v-4c51895a]{font-size:13px}}@media screen and (min-width:414px){.contentBox .avatar i[data-v-4c51895a]{font-size:14px}}.contentBox .mobile[data-v-4c51895a],.contentBox .name[data-v-4c51895a],.contentBox .nickname[data-v-4c51895a],.contentBox .sex[data-v-4c51895a]{background:#fff;overflow:hidden;padding:0 .2rem;color:#999;font-size:13px;line-height:.8rem;margin-bottom:.02rem}@media screen and (min-width:375px) and (max-width:414px){.contentBox .mobile[data-v-4c51895a],.contentBox .name[data-v-4c51895a],.contentBox .nickname[data-v-4c51895a],.contentBox .sex[data-v-4c51895a]{font-size:14px}}@media screen and (min-width:414px){.contentBox .mobile[data-v-4c51895a],.contentBox .name[data-v-4c51895a],.contentBox .nickname[data-v-4c51895a],.contentBox .sex[data-v-4c51895a]{font-size:15px}}.contentBox .mobile .fr[data-v-4c51895a],.contentBox .name .fr[data-v-4c51895a],.contentBox .nickname .fr[data-v-4c51895a],.contentBox .sex .fr[data-v-4c51895a]{position:relative}.contentBox .mobile .fr div[data-v-4c51895a],.contentBox .name .fr div[data-v-4c51895a],.contentBox .nickname .fr div[data-v-4c51895a],.contentBox .sex .fr div[data-v-4c51895a]{display:inline-block;font-size:14px}@media screen and (min-width:375px) and (max-width:414px){.contentBox .mobile .fr div[data-v-4c51895a],.contentBox .name .fr div[data-v-4c51895a],.contentBox .nickname .fr div[data-v-4c51895a],.contentBox .sex .fr div[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .mobile .fr div[data-v-4c51895a],.contentBox .name .fr div[data-v-4c51895a],.contentBox .nickname .fr div[data-v-4c51895a],.contentBox .sex .fr div[data-v-4c51895a]{font-size:16px}}.contentBox .mobile .fr .co3b[data-v-4c51895a],.contentBox .name .fr .co3b[data-v-4c51895a],.contentBox .nickname .fr .co3b[data-v-4c51895a],.contentBox .sex .fr .co3b[data-v-4c51895a]{color:#3b3b3b}.contentBox .mobile .fr input[data-v-4c51895a],.contentBox .name .fr input[data-v-4c51895a],.contentBox .nickname .fr input[data-v-4c51895a],.contentBox .sex .fr input[data-v-4c51895a]{text-align:right;color:#3b3b3b;font-size:14px}@media screen and (min-width:375px) and (max-width:414px){.contentBox .mobile .fr input[data-v-4c51895a],.contentBox .name .fr input[data-v-4c51895a],.contentBox .nickname .fr input[data-v-4c51895a],.contentBox .sex .fr input[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .mobile .fr input[data-v-4c51895a],.contentBox .name .fr input[data-v-4c51895a],.contentBox .nickname .fr input[data-v-4c51895a],.contentBox .sex .fr input[data-v-4c51895a]{font-size:16px}}.contentBox .mobile .fr input[data-v-4c51895a]::-webkit-input-placeholder,.contentBox .name .fr input[data-v-4c51895a]::-webkit-input-placeholder,.contentBox .nickname .fr input[data-v-4c51895a]::-webkit-input-placeholder,.contentBox .sex .fr input[data-v-4c51895a]::-webkit-input-placeholder{color:#999}.contentBox .mobile i[data-v-4c51895a],.contentBox .name i[data-v-4c51895a],.contentBox .nickname i[data-v-4c51895a],.contentBox .sex i[data-v-4c51895a]{font-size:12px;margin-left:.1rem}@media screen and (min-width:375px) and (max-width:414px){.contentBox .mobile i[data-v-4c51895a],.contentBox .name i[data-v-4c51895a],.contentBox .nickname i[data-v-4c51895a],.contentBox .sex i[data-v-4c51895a]{font-size:13px}}@media screen and (min-width:414px){.contentBox .mobile i[data-v-4c51895a],.contentBox .name i[data-v-4c51895a],.contentBox .nickname i[data-v-4c51895a],.contentBox .sex i[data-v-4c51895a]{font-size:14px}}.contentBox .save[data-v-4c51895a]{margin-top:.6rem;padding:0 .2rem;height:.8rem}.contentBox .save .button[data-v-4c51895a]{border-radius:.1rem;height:100%;background:#00bc71;line-height:.8rem;color:#fff;text-align:center;font-size:14px}@media screen and (min-width:375px) and (max-width:414px){.contentBox .save .button[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .save .button[data-v-4c51895a]{font-size:16px}}.contentBox .change[data-v-4c51895a]{position:fixed;height:100%;width:100%;top:0;left:0;background:#2e2e2e;text-align:center}.contentBox .change .img[data-v-4c51895a]{background:red;position:relative;top:50%;-webkit-transform:translateY(-60%);transform:translateY(-60%)}.contentBox .change .img img[data-v-4c51895a]{width:100%;height:100%}.contentBox .change .btn[data-v-4c51895a]{position:absolute;bottom:-1.54rem;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%);color:#00bc71;font-size:14px;width:2.4rem;line-height:.64rem;height:.64rem;border-radius:.1rem;border:.02rem solid #00bc71}@media screen and (min-width:375px) and (max-width:414px){.contentBox .change .btn[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .change .btn[data-v-4c51895a]{font-size:16px}}.contentBox .msk[data-v-4c51895a]{position:fixed;display:none;height:100%;width:100%;top:0;left:0;background:rgba(0,0,0,.5);font-size:14px}@media screen and (min-width:375px) and (max-width:414px){.contentBox .msk[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .msk[data-v-4c51895a]{font-size:16px}}.contentBox .check[data-v-4c51895a]{font-size:14px;position:fixed;bottom:-2rem;left:0;width:100%;text-align:center;background:#f3f6f8}@media screen and (min-width:375px) and (max-width:414px){.contentBox .check[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .check[data-v-4c51895a]{font-size:16px}}.contentBox .check div[data-v-4c51895a]{position:relative;height:.8rem;background:#fff;line-height:.8rem}.contentBox .check .inp[data-v-4c51895a]{margin-bottom:.1rem}.contentBox .check input[data-v-4c51895a]{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}.contentBox .check .sub[data-v-4c51895a]{top:-30px;opacity:1;height:40px}.contentBox .childSex[data-v-4c51895a]{position:fixed;bottom:-2.9rem;left:0;width:100%;font-size:14px;text-align:center;background:#f3f6f8}@media screen and (min-width:375px) and (max-width:414px){.contentBox .childSex[data-v-4c51895a]{font-size:15px}}@media screen and (min-width:414px){.contentBox .childSex[data-v-4c51895a]{font-size:16px}}.contentBox .childSex div[data-v-4c51895a]{background-color:#fff;margin-bottom:.1rem;line-height:.8rem}",""])},"0nnt":function(e,t){var n=e.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},"3cXf":function(e,t,n){e.exports={default:n("I4CF"),__esModule:!0}},CaOM:function(e,t,n){"use strict";function a(e,t,n){var a=t,i=e,o=null;clearInterval(o),o=setInterval(function(){var e=(a-i)/10;e=e>0?Math.ceil(e):Math.floor(e),i+=e,window.scrollTo(0,i),i==a&&(n.flag=1,clearInterval(o))},10)}function i(){var e=window.location.href,t=e.split("?");t.shift();for(var n="?",a=0;a<t.length;a++)n+=t[a]+"&";var i=new Object;if(-1!=n.indexOf("?"))for(var o=n.substr(1),c=o.split("&"),a=0;a<c.length;a++)i[c[a].split("=")[0]]=unescape(c[a].split("=")[1]);return i}function o(e,t,n){var a=new Date;return a.setTime(a.getTime()+n),document.cookie=e+"="+escape(t)+";expires="+a.toGMTString()+";path=/",!0}function c(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null}function r(){var e=document.createElement("script");e.src="http://pingjs.qq.com/h5/stats.js?v2.0.4",e.setAttribute("name","MTAH5"),e.setAttribute("sid","500546406");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}function s(){var e=document.getElementsByTagName("script")[0];e.parentNode.removeChild(e)}function d(e){try{return JSON.parse(v.getItem(e))}catch(e){return null}}function l(e,t){v.setItem(e,u()(t))}n.d(t,"c",function(){return m}),n.d(t,"g",function(){return p}),t.h=a,t.a=i,t.i=o,t.e=c,t.b=r,t.d=s,t.f=d,t.j=l;var f=n("3cXf"),u=n.n(f),m="http://test-api.shijian666.com",p="http://test.shijian666.com",v=window.localStorage},I4CF:function(e,t,n){var a=n("0nnt"),i=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},fxnj:function(e,t){!function(t,n){e.exports=function(e,t){function n(t,n,a){e.WeixinJSBridge?WeixinJSBridge.invoke(t,i(n),function(e){r(t,e,a)}):l(t,a)}function a(t,n,a){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){a&&a.trigger&&a.trigger(e),r(t,e,n)}):a?l(t,a):l(t,n)}function i(e){return e=e||{},e.appId=O.appId,e.verifyAppId=O.appId,e.verifySignType="sha1",e.verifyTimestamp=O.timestamp+"",e.verifyNonceStr=O.nonceStr,e.verifySignature=O.signature,e}function o(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function c(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function r(e,t,n){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var a=t.errMsg;a||(a=t.err_msg,delete t.err_msg,a=s(e,a),t.errMsg=a),n=n||{},n._complete&&(n._complete(t),delete n._complete),a=t.errMsg||"",O.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var i=a.indexOf(":");switch(a.substring(i+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function s(e,t){var n=e,a=h[n];a&&(n=a);var i="ok";if(t){var o=t.indexOf(":");i=t.substring(o+1),"confirm"==i&&(i="ok"),"failed"==i&&(i="fail"),-1!=i.indexOf("failed_")&&(i=i.substring(7)),-1!=i.indexOf("fail_")&&(i=i.substring(5)),i=i.replace(/_/g," "),i=i.toLowerCase(),("access denied"==i||"no permission to execute"==i)&&(i="permission denied"),"config"==n&&"function not exist"==i&&(i="ok"),""==i&&(i="fail")}return t=n+":"+i}function d(e){if(e){for(var t=0,n=e.length;n>t;++t){var a=e[t],i=v[a];i&&(e[t]=i)}return e}}function l(e,t){if(!(!O.debug||t&&t.isInnerInvoke)){var n=h[e];n&&(e=n),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function f(e){if(!(w||B||O.debug||"6.0.2">I||C.systemType<0)){var t=new Image;C.appId=O.appId,C.initTime=T.initEndTime-T.initStartTime,C.preVerifyTime=T.preVerifyEndTime-T.preVerifyStartTime,z.getNetworkType({isInnerInvoke:!0,success:function(e){C.networkType=e.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+C.version+"&o="+C.isPreVerifyOk+"&s="+C.systemType+"&c="+C.clientVersion+"&a="+C.appId+"&n="+C.networkType+"&i="+C.initTime+"&p="+C.preVerifyTime+"&u="+C.url;t.src=n}})}}function u(){return(new Date).getTime()}function m(t){S&&(e.WeixinJSBridge?t():x.addEventListener&&x.addEventListener("WeixinJSBridgeReady",t,!1))}function p(){z.invoke||(z.invoke=function(t,n,a){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,i(n),a)},z.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}if(!e.jWeixin){var v={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},h=function(){var e={};for(var t in v)e[v[t]]=t;return e}(),x=e.document,g=x.title,b=navigator.userAgent.toLowerCase(),k=navigator.platform.toLowerCase(),w=!(!k.match("mac")&&!k.match("win")),B=-1!=b.indexOf("wxdebugger"),S=-1!=b.indexOf("micromessenger"),_=-1!=b.indexOf("android"),y=-1!=b.indexOf("iphone")||-1!=b.indexOf("ipad"),I=function(){var e=b.match(/micromessenger\/(\d+\.\d+\.\d+)/)||b.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),T={initStartTime:u(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},C={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:y?1:_?2:-1,clientVersion:I,url:encodeURIComponent(location.href)},O={},M={_completes:[]},N={state:0,data:{}};m(function(){T.initEndTime=u()});var V=!1,P=[],z={config:function(e){O=e,l("config",e);var t=!1!==O.check;m(function(){if(t)n(v.config,{verifyJsApiList:d(O.jsApiList)},function(){M._complete=function(e){T.preVerifyEndTime=u(),N.state=1,N.data=e},M.success=function(e){C.isPreVerifyOk=0},M.fail=function(e){M._fail?M._fail(e):N.state=-1};var e=M._completes;return e.push(function(){f()}),M.complete=function(t){for(var n=0,a=e.length;a>n;++n)e[n]();M._completes=[]},M}()),T.preVerifyStartTime=u();else{N.state=1;for(var e=M._completes,a=0,i=e.length;i>a;++a)e[a]();M._completes=[]}}),O.beta&&p()},ready:function(e){0!=N.state?e():(M._completes.push(e),!S&&O.debug&&e())},error:function(e){"6.0.2">I||(-1==N.state?e(N.data):M._fail=e)},checkJsApi:function(e){var t=function(e){var t=e.checkResult;for(var n in t){var a=h[n];a&&(t[a]=t[n],delete t[n])}return e};n("checkJsApi",{jsApiList:d(e.jsApiList)},function(){return e._complete=function(e){if(_){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){a(v.onMenuShareTimeline,{complete:function(){n("shareTimeline",{title:e.title||g,desc:e.title||g,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){a(v.onMenuShareAppMessage,{complete:function(){n("sendAppMessage",{title:e.title||g,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){a(v.onMenuShareQQ,{complete:function(){n("shareQQ",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){a(v.onMenuShareWeibo,{complete:function(){n("shareWeiboApp",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){a(v.onMenuShareQZone,{complete:function(){n("shareQZone",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){n("startRecord",{},e)},stopRecord:function(e){n("stopRecord",{},e)},onVoiceRecordEnd:function(e){a("onVoiceRecordEnd",e)},playVoice:function(e){n("playVoice",{localId:e.localId},e)},pauseVoice:function(e){n("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){n("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){a("onVoicePlayEnd",e)},uploadVoice:function(e){n("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){n("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){n("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){n("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(_){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},getLocation:function(e){},previewImage:function(e){n(v.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){n("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){n("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===V?(V=!0,n("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(V=!1,P.length>0){var t=P.shift();wx.getLocalImgData(t)}},e}())):P.push(e)},getNetworkType:function(e){var t=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var a=t.indexOf(":"),i=t.substring(a+1);switch(i){case"wifi":case"edge":case"wwan":e.networkType=i;break;default:e.errMsg="getNetworkType:fail"}}return e};n("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){n("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},n(v.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())},hideOptionMenu:function(e){n("hideOptionMenu",{},e)},showOptionMenu:function(e){n("showOptionMenu",{},e)},closeWindow:function(e){e=e||{},n("closeWindow",{},e)},hideMenuItems:function(e){n("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){n("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){n("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){n("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){e=e||{},n("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(y){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e}())},openAddress:function(e){n(v.openAddress,{},function(){return e._complete=function(e){e=c(e)},e}())},openProductSpecificView:function(e){n(v.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var t=e.cardList,a=[],i=0,o=t.length;o>i;++i){var c=t[i],r={card_id:c.cardId,card_ext:c.cardExt};a.push(r)}n(v.addCard,{card_list:a},function(){return e._complete=function(e){var t=e.card_list;if(t){t=JSON.parse(t);for(var n=0,a=t.length;a>n;++n){var i=t[n];i.cardId=i.card_id,i.cardExt=i.card_ext,i.isSuccess=!!i.is_succ,delete i.card_id,delete i.card_ext,delete i.is_succ}e.cardList=t,delete e.card_list}},e}())},chooseCard:function(e){n("chooseCard",{app_id:O.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())},openCard:function(e){for(var t=e.cardList,a=[],i=0,o=t.length;o>i;++i){var c=t[i],r={card_id:c.cardId,code:c.code};a.push(r)}n(v.openCard,{card_list:a},e)},consumeAndShareCard:function(e){n(v.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){n(v.chooseWXPay,o(e),e)},openEnterpriseRedPacket:function(e){n(v.openEnterpriseRedPacket,o(e),e)},startSearchBeacons:function(e){n(v.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){n(v.stopSearchBeacons,{},e)},onSearchBeacons:function(e){a(v.onSearchBeacons,e)},openEnterpriseChat:function(e){n("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}},A=1,j={};return x.addEventListener("error",function(e){if(!_){var t=e.target,n=t.tagName,a=t.src;if("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){if(-1!=a.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var i=t["wx-id"];if(i||(i=A++,t["wx-id"]=i),j[i])return;j[i]=!0,wx.getLocalImgData({localId:a,success:function(e){t.src=e.localData}})}}}},!0),x.addEventListener("load",function(e){if(!_){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var a=t["wx-id"];a&&(j[a]=!1)}}},!0),t&&(e.wx=e.jWeixin=z),z}}(t)}(window)},hUst:function(e,t,n){"use strict";function a(e){n("viho")}Object.defineProperty(t,"__esModule",{value:!0});var i=n("+Jjd"),o=n("wIho"),c=n("46Yf"),r=a,s=c(i.a,o.a,!1,r,"data-v-4c51895a",null);t.default=s.exports},viho:function(e,t,n){var a=n("/hZZ");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("35d92716",a,!0)},wIho:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"contentBox setting"},[n("div",{staticClass:"avatar clearfix",on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.check(t)}}},[n("div",{staticClass:"fl"},[e._v("头像")]),e._v(" "),n("div",{staticClass:"fr"},[n("img",{attrs:{src:e.avatarSrc,alt:""},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.preview(t)}}}),e._v(" "),n("i",{staticClass:"iconfont icon-set_more"})])]),e._v(" "),n("div",{staticClass:"nickname clearfix"},[n("div",{staticClass:"fl"},[e._v("昵称")]),e._v(" "),n("div",{staticClass:"fr"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.nickName,expression:"nickName",modifiers:{trim:!0}}],staticClass:"co3b",attrs:{type:"text"},domProps:{value:e.nickName},on:{input:function(t){t.target.composing||(e.nickName=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),n("i",{staticClass:"iconfont icon-set_more"})])]),e._v(" "),n("div",{staticClass:"name"},[n("div",{staticClass:"fl"},[e._v("孩子姓名")]),e._v(" "),n("div",{staticClass:"fr"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"还未设置"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),n("i",{staticClass:"iconfont icon-set_more"})])]),e._v(" "),n("div",{staticClass:"sex",on:{click:e.showSex}},[n("div",{staticClass:"fl"},[e._v("孩子性别")]),e._v(" "),n("div",{staticClass:"fr"},[n("div",{staticClass:"co3b"},[e._v(e._s(e.sex))])])]),e._v(" "),n("div",{staticClass:"save",on:{click:e.save}},[n("div",{staticClass:"button"},[e._v("保存")])]),e._v(" "),n("div",{staticClass:"msk",on:{click:e.hide}}),e._v(" "),n("div",{staticClass:"check"},[n("div",{staticClass:"inp"},[n("input",{ref:"avatarInput",attrs:{type:"file",name:"face",accept:"image/*"},on:{change:e.onFileChange}}),e._v("选择图片")]),e._v(" "),n("div",{on:{click:e.hide}},[e._v("取消")])]),e._v(" "),n("div",{staticClass:"childSex"},[n("div",{on:{click:e.checkSex}},[e._v("男")]),e._v(" "),n("div",{on:{click:e.checkSex}},[e._v("女")]),e._v(" "),n("div",{on:{click:e.checkSex}},[e._v("保密")])])])},i=[],o={render:a,staticRenderFns:i};t.a=o}});