webpackJsonp([22],{"0nnt":function(t,i){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},"3cXf":function(t,i,n){t.exports={default:n("I4CF"),__esModule:!0}},"7ZQQ":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"location"}},[n("mt-index-list",[n("div",{staticClass:"title"},[t._v("当前城市定位")]),t._v(" "),n("a",{staticClass:"cur"},[t._v(t._s(t.defaultCity)+"市 "),n("span",{on:{click:t.getloca}},[n("i",{staticClass:"iconfont icon-search_location"}),t._v("重新定位")])]),t._v(" "),n("div",{staticClass:"title"},[t._v("目前仅开放以下城市")]),t._v(" "),n("ul",{staticClass:"offen"},t._l(t.cityMsg,function(i,e){return n("li",{key:e},[n("router-link",{attrs:{to:"/home"},nativeOn:{click:function(i){t.setCity(e)}}},[t._v(t._s(i.name)+"市")])],1)}))]),t._v(" "),n("div",{attrs:{id:"container"}})],1)},o=[],a={render:e,staticRenderFns:o};i.a=a},CaOM:function(t,i,n){"use strict";function e(t,i,n){var e=i,o=t,a=null;clearInterval(a),a=setInterval(function(){var t=(e-o)/10;t=t>0?Math.ceil(t):Math.floor(t),o+=t,window.scrollTo(0,o),o==e&&(n.flag=1,clearInterval(a))},10)}function o(){var t=window.location.href,i=t.split("?");i.shift();for(var n="?",e=0;e<i.length;e++)n+=i[e]+"&";var o=new Object;if(-1!=n.indexOf("?"))for(var a=n.substr(1),c=a.split("&"),e=0;e<c.length;e++)o[c[e].split("=")[0]]=unescape(c[e].split("=")[1]);return o}function a(t,i,n){var e=new Date;return e.setTime(e.getTime()+n),document.cookie=t+"="+escape(i)+";expires="+e.toGMTString()+";path=/",!0}function c(t){var i,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(i=document.cookie.match(n))?unescape(i[2]):null}function s(){var t=document.createElement("script");t.src="http://pingjs.qq.com/h5/stats.js?v2.0.4",t.setAttribute("name","MTAH5"),t.setAttribute("sid","500546406");var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i)}function l(){var t=document.getElementsByTagName("script")[0];t.parentNode.removeChild(t)}function d(t){try{return JSON.parse(x.getItem(t))}catch(t){return null}}function r(t,i){x.setItem(t,f()(i))}n.d(i,"c",function(){return u}),n.d(i,"g",function(){return p}),i.h=e,i.a=o,i.i=a,i.e=c,i.b=s,i.d=l,i.f=d,i.j=r;var m=n("3cXf"),f=n.n(m),u="http://test-api.shijian666.com",p="http://test.shijian666.com",x=window.localStorage},I4CF:function(t,i,n){var e=n("0nnt"),o=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},OmvJ:function(t,i,n){"use strict";function e(t){n("WmZD")}Object.defineProperty(i,"__esModule",{value:!0});var o=n("lXIK"),a=n("7ZQQ"),c=n("46Yf"),s=e,l=c(o.a,a.a,!1,s,null,null);i.default=l.exports},WmZD:function(t,i,n){var e=n("uKZX");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("8bSs")("2a59c20e",e,!0)},lXIK:function(t,i,n){"use strict";var e=n("CaOM"),o=n("facN");n.n(o);i.a={data:function(){return{defaultCity:Object(e.e)("city")||"长沙",cityMsg:"",longitude:"",latitude:""}},created:function(){document.title="定位",this.getComcity(),Object(e.b)()},mounted:function(){},methods:{setCity:function(t){Object(e.i)("city",this.cityMsg[t].name),Object(e.i)("city_id",this.cityMsg[t].city_id),this.defaultCity=this.cityMsg[t].name},getloca:function(){var t=this;o.Indicator.open("定位中...");var i=new BMap.Map("container"),n=new BMap.Point(116.331398,39.897445);i.centerAndZoom(n,12),(new BMap.Geolocation).getCurrentPosition(function(n){if(o.Indicator.close(),this.getStatus()==BMAP_STATUS_SUCCESS){var a=new BMap.Marker(n.point);i.addOverlay(a),i.panTo(n.point),t.longitude=n.point.lng,t.latitude=n.point.lat,Object(e.i)("longitude",t.longitude),Object(e.i)("latitude",t.latitude);var c=new BMap.Geocoder,s=new BMap.Point(t.longitude,t.latitude),l=(new BMap.Marker(s),s);!function(i){c.getLocation(i,function(i){o.Indicator.close();var n=i.addressComponents;t.defaultCity=n.city.slice(0,2),Object(e.i)("city",n.city.slice(0,2))})}(l)}else alert("failed"+this.getStatus())},{enableHighAccuracy:!0})},getComcity:function(){var t={token:123},i=e.c+"/peony/activity/getComcity";this.$http.post(i,t,{emulateJSON:!0}).then(function(t){0==t.body.code?this.cityMsg=t.body.data.result:-1==t.body.code&&Toast(t.body.msg)})}},destroyed:function(){Object(e.d)()}}},uKZX:function(t,i,n){i=t.exports=n("BkJT")(!1),i.push([t.i,"#location{height:100%}#location,#location .mint-indexlist .mint-indexlist-content{width:100%}#location .mint-indexlist .mint-indexlist-content .title{width:100%;height:.63rem;line-height:.63rem;padding-left:.2rem;font-size:12px;color:#999}@media screen and (min-width:375px) and (max-width:414px){#location .mint-indexlist .mint-indexlist-content .title{font-size:13px}}@media screen and (min-width:414px){#location .mint-indexlist .mint-indexlist-content .title{font-size:14px}}#location .mint-indexlist .mint-indexlist-content .cur{display:inline-block;width:100%;height:.8rem;padding-left:.2rem;line-height:.8rem;font-size:14px;color:#3b3b3b;background:#fff}@media screen and (min-width:375px) and (max-width:414px){#location .mint-indexlist .mint-indexlist-content .cur{font-size:15px}}@media screen and (min-width:414px){#location .mint-indexlist .mint-indexlist-content .cur{font-size:16px}}#location .mint-indexlist .mint-indexlist-content .cur span{float:right;margin-right:.2rem;font-size:13px;color:#2e8ae8}@media screen and (min-width:375px) and (max-width:414px){#location .mint-indexlist .mint-indexlist-content .cur span{font-size:14px}}@media screen and (min-width:414px){#location .mint-indexlist .mint-indexlist-content .cur span{font-size:15px}}#location .mint-indexlist .mint-indexlist-content .cur span i{font-size:13px;margin-right:5px}@media screen and (min-width:375px) and (max-width:414px){#location .mint-indexlist .mint-indexlist-content .cur span i{font-size:14px}}@media screen and (min-width:414px){#location .mint-indexlist .mint-indexlist-content .cur span i{font-size:15px}}#location .mint-indexlist .mint-indexlist-content .offen{background:#fff}#location .mint-indexlist .mint-indexlist-content .offen li a{display:inline-block;width:100%;height:.8rem;padding-left:.2rem;line-height:.8rem;font-size:14px;color:#3b3b3b;border-bottom:1px solid #f1f3ff}@media screen and (min-width:375px) and (max-width:414px){#location .mint-indexlist .mint-indexlist-content .offen li a{font-size:15px}}@media screen and (min-width:414px){#location .mint-indexlist .mint-indexlist-content .offen li a{font-size:16px}}#location .mint-indexlist .mint-indexlist-content .mint-indexsection ul a{display:block;width:100%;height:40px;padding-left:10px;line-height:40px;font-size:14px;color:#3b3b3b;background:#fff;border-bottom:1px solid #f1f3ff}#location #container{display:none}",""])}});