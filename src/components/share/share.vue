<template>
    <div class="share">
        分享页面
        <div class="mask" @touchmove="scrollPrevent" @click="hideMask">
            <div class="pic">

            </div>
        </div>
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { Indicator,Toast } from 'mint-ui';
import {
  pscroll,
  apiUrl,
  GetRequest,
  linkUrl,
  getCookie,
  analyze,
  destroy,
  setCookie
} from "../../common/js/common.js";
export default {
  data() {
    return {
        data:'',
        wx_param:''
    };
  },
  mounted() {
    var that = this;
    if (getCookie("shareTag")) {
      $(".mask").hide();
    }   
  },
  created() {
    document.title = "活动分享";
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS && getCookie("shareTag1")){
        location.reload()
        setCookie('shareTag1','')
    }
    this.init()
  },
  methods: {
    init() {
      Indicator.open("加载中...");
      var that = this;
      var params = {
            goods_id:getCookie('share_goods_id')||GetRequest().goods_id,
            // goods_id:9
        },
        url = apiUrl + "/peony/activity/getActivityInfo";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
            Indicator.close();
            that.data = res.body.data.result.info;
            console.log(that.data)
            that.wx_param = res.body.data.result.wx_param;
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: that.wx_param.appId, // 必填，公众号的唯一标识
                timestamp: that.wx_param.timestamp, // 必填，生成签名的时间戳
                nonceStr: that.wx_param.nonceStr, // 必填，生成签名的随机串
                signature: that.wx_param.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']
            })
            
                wx.onMenuShareTimeline({

                    title: that.data.title, // 分享标题

                    link: that.data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                    imgUrl: that.data.imgUrl, // 分享图标
                    trigger: function (res) {    
                          //  alert('用户点击发送给朋友');    
                    }, 
                    success: function (res) { 
                        logUtil.printLog("分享到朋友圈成功返回的信息为:",res);
                        alert('朋友圈成功')
                        // 用户确认分享后执行的回调函数

                    },

                    cancel: function () { 

                        // 用户取消分享后执行的回调函数

                    }

                });
                wx.onMenuShareAppMessage({

                    title: that.data.title, // 分享标题

                    desc: that.data.desc, // 分享描述

                    link: that.data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                    imgUrl: that.data.imgUrl, // 分享图标

                    type: '', // 分享类型,music、video或link，不填默认为link

                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

                    success: function (res) { 
                        logUtil.printLog("分享到朋友成功返回的信息为:",res);
                        alert('朋友成功')
                        // 用户确认分享后执行的回调函数

                    },

                    cancel: function () { 

                        // 用户取消分享后执行的回调函数

                    }

                });
                wx.onMenuShareQQ({

                    title: that.data.title, // 分享标题

                    desc: that.data.desc, // 分享描述

                    link: that.data.link, // 分享链接

                    imgUrl: that.data.imgUrl, // 分享图标

                    success: function () { 
                        alert('QQ成功')
                    // 用户确认分享后执行的回调函数

                    },

                    cancel: function () { 

                    // 用户取消分享后执行的回调函数

                    }

                });
                wx.onMenuShareQZone({

                    title: that.data.title, // 分享标题

                    desc: that.data.desc, // 分享描述

                    link: that.data.link, // 分享链接

                    imgUrl: that.data.imgUrl, // 分享图标

                    success: function () { 
                        alert('QZone成功')
                    // 用户确认分享后执行的回调函数

                    },

                    cancel: function () { 

                    // 用户取消分享后执行的回调函数

                    }

                });
        } else {
          Indicator.close();
          Toast(res.body.msg);
        }
      });
    },
    scrollPrevent(e) {
      e.preventDefault();
    },
    hideMask() {
      $(".mask").hide();
      setCookie("shareTag", 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.share {
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);

        .pic {
            width: 100%;
            height: 1.9rem;
            bg('../../assets/share_tip');
        }
    }
}
</style>

