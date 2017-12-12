<template>
    <div class="contentBox" >
        <div class="mask">
            <div class="PayBox">
                <div class="num common">
                    <i>￥</i><span>{{totalPrice}}.00</span>
                </div>
                <div class="wxPayBox common">
                    <div class="left fl">
                        <i class="fl"></i><span class="fl">微信支付</span>
                    </div>
                    <div class="right fr"></div>
                </div>
                <div class="verfiyBtn" @click="verfiy">
                    <button>确认支付</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,analyze,destroy,setCookie} from '../../common/js/common.js'
export default {
    data(){
        return{
            totalPrice:0
        }
    },
    created () {
        document.title="确认订单";
    },
    mounted(){
        analyze()
        this.totalPrice=getCookie('totalPrice');
    },
    activated(){
    },
    methods:{
        verfiy(){
            setCookie('coupon_price',0)
            var that =this;
            var submitOrder = getCookie('submitOrder').split(',')
            console.log(submitOrder[4])
            wx.chooseWXPay({
                        appId: submitOrder[0],
                        timestamp: submitOrder[1],
                        nonceStr: submitOrder[2],
                        package: submitOrder[3],
                        signType: submitOrder[4],
                        paySign: submitOrder[5],
                        success(res) {
                            if (res.errMsg === 'chooseWXPay:ok') {
                                // window.alert('支付成功')
                                that.$router.push('/payok')
                            } else {
                                // window.alert(' 支付失败')
                                // window.location.reload()
                            }
                        },
                        cancel() {
                            // window.alert('支付取消')
                            // window.location.reload()
                        },
                        error(res) {
                            // window.alert('支付失败')
                            // window.location.reload()
                        }
                    })
        }
    },
        destroyed(){
            destroy()
        },
}
</script>

<style lang="stylus" scoped>
 @import '../../common/stylus/variable.styl'
.mask {
    width: 100%;
    height: 100%;
}

.mask .PayBox {
    color: #333;
    /* margin-bottom: 55px; */
    background-color: #f4f5f9;
}

.mask .PayBox .common {
    padding: 0 0.3rem;
    width: 100%;
    background-color: #fff;
}

.mask .PayBox .verfiy {
    height: 0.98rem;
    line-height: 0.98rem;
    text-align: center;
    position: relative;
}

.mask .PayBox .verfiy i {
    position: absolute;
    left: 0.2rem;
    top: 0.3rem;
    width: 0.38rem;
    height: 0.38rem;
    bg('../../assets/icon_close19x19')
}

.mask .PayBox .verfiy span {
    fs($font15)
    font-weight: 600;
}

.mask .PayBox .num {
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    margin-bottom: 0.02rem;
}


/* .mask .PayBox .num div{
    display: inline-block;
    height: 100%;
    width: 100px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
} */

.mask .PayBox .num i {
    /* position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0; */
   fs($font15)
}

.mask .PayBox .num span {
    /* float: right; */
    height: 1.16rem;
    line-height: 1.16rem;
    fs($font36)
    font-weight: 900;
}

.mask .PayBox .wxPayBox {
    height: 1rem;
    line-height: 1rem;
    margin: 0;
}

.mask .PayBox .wxPayBox .left i {
    margin-right: 0.2rem;
    margin-top: 0.24rem;
    width: 0.48rem;
    height: 0.48rem;
    bg('../../assets/wechat-icon24x24');
}

.mask .PayBox .wxPayBox .left span {
    fs($font13)
    color: #525252;
}

.mask .PayBox .wxPayBox .right {
    margin-top: 0.34rem;
    width: 0.34rem;
    height: 0.34rem;
    bg('../../assets/icon_sel17x17');
}

.mask .PayBox .verfiyBtn {
    margin-top: 0.5rem;
    padding: 0 0.32rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    fs($font14)
    color: #fff;
}

.mask .PayBox .verfiyBtn button {
    margin: 0 !important;
    width: 100%;
    margin-top: 0.5rem;
    height: 100%;
    background-color: #00bc71;
    text-align: center;
    fs($font14)
    color: #fff;
    border-radius: 0.1rem;
}
</style>

