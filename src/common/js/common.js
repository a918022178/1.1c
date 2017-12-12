//开发环境 
// export const apiUrl="http://dev-api.shijian666.com" 
// export const linkUrl="http://dev.shijian666.com"
//测试环境 
export const apiUrl="http://test-api.shijian666.com" 
export const linkUrl="http://test.shijian666.com"
// 哈哈哈
//生成环境
// export const apiUrl="http://api.shijian666.com" 
// export const linkUrl="http://www.shijian666.com" 

//缓动函数
export function pscroll(start,end,that){
    var target = end,
        leader = start,
        timer = null;
    clearInterval(timer);
    timer = setInterval(function(){
    // target 目标值 leader初始时是滚动的高度
      var step = (target - leader)/10;
      // 如果大于0向上取整小于0向下取整
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      // leader发生改变

      // console.log(step)
      leader = leader + step;
      // 返回到哪一个地方
      window.scrollTo(0,leader);
      if (leader == target) {
        that.flag=1;
        clearInterval(timer);
      }
    },10)
    // clearInterval(timer);
  }

// 获取url参数
export function GetRequest() {
  var a =window.location.href;
  var b =  a.split('?');
  b.shift();
  var url ='?';
  for(var i =0;i<b.length;i++){
    url+=b[i]+'&';
  }
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
  }
  return theRequest; 
}

//操作cookie 
// export function setCookie(key,  value, time) {
  
//       var cookie_key = key;
//       var oDate = new Date();
//       oDate.setTime(oDate.getTime() + time);
//       document.cookie = cookie_key + '=' + value + ';expires=' + oDate.toGMTString()+';path=/';
//   }
  export function  setCookie(name,value,time) {
    var exp = new Date();
    exp.setTime(exp.getTime() + time); //3天过期 3 * 24 * 60 * 60 * 1000
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+';path=/';
    return true;
};



export function getCookie(name) {

    var arr, 
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }
}

// export function getCookie(name) {
//     var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//     if (arr != null) return arr[2]; return null;
// };


export function removeCookie(key) {
    var cookie_key = key;
    document.cookie = cookie_key + '= ;expires=-1; path=/';
}

// 腾讯埋点
export function analyze() {
    var _mtac = {};
    var mta = document.createElement("script");
    mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500546406");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
}
export function destroy() {
    var s = document.getElementsByTagName("script")[0];
  		s.parentNode.removeChild(s);
}

// localStorage
const ls = window.localStorage;
export function getItem(key) {
    try {
        return JSON.parse(ls.getItem(key))
    } catch (err) {
        return null
    }
}
export function setItem(key, val) {
    ls.setItem(key, JSON.stringify(val))
}
export function removeAll() {
    ls.clear()
}
export function getKeys() {
    return ls.keys()
}
export function removeItem(key) {
    ls.removeItem(key)
}