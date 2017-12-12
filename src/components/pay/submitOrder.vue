<template>
  <div class="contentBox submitOrder" v-cloak>
    <div class="theme">
        <div class="name">活动名称</div>
        <!-- <img src="__PUBLIC__/H5/image/pic_big110x85@2x.png" alt="" class="pic"> -->
        <div class="txt">{{msg.goods_name}}</div>
    </div>
    <div class="select-box priceBox common">
        <span>价格</span>
        <span class="fr">￥{{msg.goods_price}}.00</span>
    </div>
    <!-- <volist name="goods_list" id="v"> -->
    <div class="numBox common" data-goods-id="<{$v.goods_id}>">
        <div class="txt fl"> <span class="ticket">报名数量</span></div>
        <div class="select fr">
            <i class="decrease fl" @click="change(count,-1)"><s></s></i>
            <span class="num fl amount" ref="num">{{count}}</span>
            <i class="add fl" @click="change(count,1)"><s></s></i>
        </div>
    </div>
    <div class="devide"></div>
    <!-- </volist> -->

	<div class="select-box common" @click="openPicker" v-show="msg.is_service_time==1">
        <span>入园日期</span>
        <span class="fr time" v-show="year">{{year}}年{{month}}月{{date}}日</span>
        <span class="tip fr" v-show="!year">请选择日期</span>
    </div>
    <div class="devide"></div>
    <div class="useTicket common" @click="use">
        <div class="txt fl">优惠劵</div>
        <!-- <div class="price fr" >-￥<span ref="decreaseNum"><{$k_juan*10}></span></div> -->
        <div class="fr triangle" v-if="msg.not_used_conpon"></div>
        <div class="fr noticket" v-if="!msg.not_used_conpon||unused_conpon==0">暂无优惠劵可用</div>
        <div class="fr noticket" v-if="tag>0&&msg.not_used_conpon&&unused_conpon!=0">已选择 <span style="color:#ee7907">1</span> 张优惠劵</div>
        <div class="fr noticket" v-if="tag==0&&msg.not_used_conpon&&unused_conpon!=0">有 <span style="color:#ee7907">{{unused_conpon}}</span> 张优惠劵可用</div>
    </div>
    <!-- <div class="slide" v-show="swoosh">
        <div class="avilable cashTicket">
            <span>本次可用现金劵</span>
            <b class="fr">-￥<{$coupon_amount}></b>
        </div> -->
        <!-- <div class="cashTicket" v-show="juan">
            <i></i>
            <span>您共有
                <{$total_juan*10}>元现金券</span>
        </div>
    </div> -->

        <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="date"
            :startDate="startDate"
            :endDate="endDate"
            year-format="{value}"
            month-format="{value}"
            date-format="{value}"
            @confirm="confirm">
        </mt-datetime-picker>
        
    <!-- <transition name="animate"> -->
        <!-- <transition name="tip">
            <div class="inform" v-show="tip">
                <i></i>
                <div>
                    单独购买《儿童课程体验卡》无法入园，需配合<span>《成人课程陪同卡》</span>使用!
                </div>
            </div>
        </transition> -->
    <!-- </transition> -->

    <div class="pay">
        <!--<div class="left" :class="{'lh':juan&&(swoosh>0||swoosh=='')}">-->
            <!--<span class="total" v-show="coupon_status==0||coupon_status==2">合计：￥{{totalPrice}}.00</span>-->
            <!--<span class="total"  v-show="coupon_status==1">合计：￥{{totalPrice}}.00</span><br>-->
            <!--<span class="ticket" v-show="coupon_status==1">优惠券 -<{$coupon_amount}>.00</span>-->
        <!--</div>-->
        <div class="left" :class="{'lh':tag>0}">
            <p class="total" v-show="tag==0">合计：￥{{totalPrice}}.00</p>
            <span class="total"  v-show="tag>0">合计：￥{{totalPrice}}.00</span><br>
            <p class="ticket" v-show="tag>0">优惠券 -{{coupon_price}}.00</p>
        </div>
        <div class="button" @click="sub" :class="{gray:!flag}">
            结算
        </div>
    </div>
    <div class="loading" v-show="!flag">
        <div><i></i><p>订单提交中...</p></div>
    </div>
</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { Toast, Indicator, MessageBox, DatetimePicker } from "mint-ui";
import {
  pscroll,
  apiUrl,
  GetRequest,
  linkUrl,
  getCookie,
  analyze,
  destroy,
  setCookie,
  getItem
} from "../../common/js/common.js";
export default {
  data() {
    return {
      year: "",
      month: "",
      date: "",
      flag: 1,
      count: 1,
      price:0,
      totalPrice: 0,
      startDate: new Date(Date.now() + 86400000),
      endDate: new Date("2017-12-31"),
      pickerVisible: "",
      msg: "",
      tag: 0,
      data:'',
      coupon_price:0,
      tip:0,
      show:false,
      conpon:1,
      conponList:[],
      not_used_list:[],
      unused_conpon:''
    };
  },
  created() {
    //   if(!getItem('is_bind_mobile')){
    //       this.$router.push('/bindMobile')
    //   }else{
    //       }
    document.title = "活动报名";
    // console.log(getCookie("asss") >= 0);
    //   this.init();
  },
  mounted() {
      
    var scripr;
    //   setTimeout(function () {
        //             $('.inform').animate({ bottom: '66px', opacity: 1 }, 250)
    //         }, 500);
    setTimeout(() => {
        this.tip=1;
    }, 500);
  },
  activated() {
    this.init();
    analyze()
    var that =this;
    this.tag = this.$route.query.coupon_id||0;
    this.coupon_price=getCookie("coupon_price")||0;
    // this.totalPrice =this.price*this.count - getCookie("coupon_price");
    // if(this.tag==0){
    //     that.coupon_price=0;
    //     // that.totalPrice=that.msg.goods_price*that.count;
    // }else{
        
    // }
      console.log(that.price)
    
  },
  destroyed() {
    
  },
  methods: {
    init() {
      var that = this;
      var params = {
          token: 123,
          user_id: getCookie("src_user_id"),
          shop_id: getCookie("c_shop_id"),
          goods_id: getCookie("c_goods_id"),
          coupon_id: -1
        },
        url = apiUrl + "/peony/activity/activityRegist";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          that.msg = res.body.data.result;
          that.price=that.msg.goods_price;
          console.log(that.price)
        //   console.log(GetRequest().coupon_id,'GetRequest().coupon_id')
        //   if(GetRequest().coupon_id==='null'||GetRequest().coupon_id===undefined||(GetRequest().coupon_id===''&&getCookie('tag')!=='0')){
              that.totalPrice = that.price*that.count-that.coupon_price
                console.log(that.totalPrice,'totalPrice')
        var params1={
                    token:123,
                    user_id:getCookie('src_user_id')
                },
                url1=apiUrl+"/peony/activity/myCoupons";
                this.$http.post(url1,params1,{emulateJSON:true})
                .then(function(res){
                    if(res.body.code==0){
                        console.log(res.body.data.result.not_used_list)
                        that.not_used_list = res.body.data.result.not_used_list
                        var arr = []
                        that.not_used_list.forEach((v,i)=>{
                            
                            if(v.is_available==1&&v.available_amount<=that.totalPrice){
                                console.log(i)
                                arr.push(v)
                            }
                        })
                        that.couponList = arr
                        that.unused_conpon = arr.length
                        console.log(that.couponList)
                        that.change(that.count,0)
                        // console.log(typeof GetRequest().coupon_id,'sdafsad')
                        // console.log(that.coupon_price,'res')
                        }else{
                            // that.totalPrice = that.price*that.count
                            Toast(res.body.msg)
                        }
                    })
            //   
        //       this.coupon_price=that.msg.coupon_amount;
        //   }else{
        //       that.totalPrice = that.price*that.count-getCookie('coupon_price')
        //       this.coupon_price=getCookie("coupon_price");
        //   }
        //   if(that.msg.not_used_conpon==0){
        //     //   that.totalPrice = that.price;
        //       setCookie('tag',0)
        //       that.tag = 0;
        //   }else{
              
        //   }
        //   console.log(that.msg);
        } else if (res.body.code == -1) {
          Toast(res.body.msg);
        }
      });

    },
    use() {
      if (this.msg.not_used_conpon||unused_conpon==0) {
          setCookie('goodsPrice',this.price*this.count)
        this.$router.push("/ticket");
      }
    },
    change(count, num) {
        var couponTag = getCookie('couponTag')
        var that = this
        console.log(this.coupon_price,'change')
      if (this.count == 1 && num == -1) {
        return;
      }
      var arr =[];
      this.count += num;
      if(couponTag==0){
        this.tag = 0;
      }else if(couponTag>0){
        if(that.not_used_list[couponTag-1].available_amount>this.count * this.msg.goods_price){
            this.tag = 0
            setCookie('couponTag',0)
            setCookie('coupon_price',0)
        }
      }
        this.coupon_price=getCookie("coupon_price")||0;
      this.totalPrice = this.count * this.msg.goods_price-this.coupon_price;
      that.not_used_list.forEach((v,i)=>{
                    if(v.is_available==1&&v.available_amount<=that.totalPrice){
                            console.log(i)
                            arr.push(v)
                        }
                    })
                that.couponList = arr
                this.unused_conpon= arr.length
                if(!this.unused_conpon){
                    this.tag = 0
                }
        console.log(that.totalPrice)

    },
    openPicker() {
      this.$refs.picker.open();
      document.querySelector('.mint-popup-bottom').ontouchmove=function(e){
          e.preventDefault()
      }
    },
    confirm(date) {
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate();
    },
    sub() {
        
        var that = this;
      if (!that.year&&that.msg.is_service_time==1) {
        Toast("请选择时间");
      } else {
          var coupon_id = GetRequest().coupon_id
          setCookie('totalPrice',this.totalPrice)
          Indicator.open('订单生成中...');
          if(getCookie('couponTag')==0){
              coupon_id = 0
          }
            var params = {
                token: "123",
                user_id: getCookie("src_user_id"),
                shop_id: getCookie("c_shop_id"),
                goods_id: getCookie("c_goods_id"),
                coupon_id:coupon_id||0,
                num:this.count,
                is_service_time:that.msg.is_service_time,
                service_time:(that.msg.is_service_time==2?'':this.year+'-'+this.month+'-'+this.date)

            },
            url = apiUrl + "/peony/activity/submitOrder";
            that.$http.post(url, params, { emulateJSON: true }).then(function(res) {
            if (res.body.code == 0) {
                Indicator.close();
                setCookie('coupon_id','')
                that.data = res.body.data.result.sign_body;
                console.log(that.data)
                setCookie('submitOrder',[that.data.appId,that.data.timeStamp,that.data.nonceStr,that.data.package,that.data.signType,that.data.paySign])
                wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: that.data.appId, // 必填，公众号的唯一标识
                timestamp: that.data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: that.data.nonceStr, // 必填，生成签名的随机串
                signType: that.data.signType,
                signature: that.data.paySign, // 必填，签名，见附录1
                jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                console.log(wx.chooseWXPay)
                that.$router.push('/pay')
                // wx.chooseWXPay({
                //         appId: that.data.appId,
                //         timestamp: that.data.timeStamp,
                //         nonceStr: that.data.nonceStr,
                //         package: that.data.package,
                //         signType: that.data.signType,
                //         paySign: that.data.paySign,
                //         success(res) {
                //             if (res.errMsg === 'chooseWXPay:ok') {
                //                 window.alert('支付成功')
                //                 window.location.reload()
                //             } else {
                //                 window.alert(' 支付失败')
                //                 window.location.reload()
                //             }
                //         },
                //         cancel() {
                //             window.alert('支付取消')
                //             window.location.reload()
                //         },
                //         error(res) {
                //             window.alert('支付失败')
                //             window.location.reload()
                //         }
                //     })
                }else{
                    Indicator.close();
                    Toast(res.body.msg)
                }
            });
        }
      },
      aa(){
          aert(111)
      }
    },
    deactivated(){
        destroy()
            
    },
};
</script>
<style lang="stylus">
.mint-indicator-mask,.mint-indicator-wrapper{
    z-index: 10;
}
.mint-indicator-wrapper{
    padding 10px
    line-height: 0
    .mint-indicator-text{
        font-size 14px
        line-height 14px
    }
  }
  .mint-datetime-picker{
      z-index 100000
  }
</style>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.submitOrder {
    background-color: #f4f5f9;
    overflow hidden
}

.theme {
    display: flex;
    padding: 0.2rem 0.32rem 0.2rem 0.32rem;
    margin-bottom: 0.1rem;
    width: 100%;
    height: 1.2rem;
    background-color: #fff;
    position: relative;
}

.theme .name {
    flex: 0 0 1.12rem;
    height: 100%;
    line-height: 0.84rem;
    fs($font13);
    color: #999;
}

.theme .txt {
    flex: 1;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    max-width: calc(100% - 1.6rem);
    padding-right: 0.32rem;
    fs($font13);
    font-weight: 600;
    color: #333;
    text-align: left;
    line-height 0.28rem
}

.common {
    position: relative;
    padding: 0 0.32rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    /* margin-bottom: 1px; */
    // z-index: 10;
}

.devide {
    position: relative;
    height: 1px;
    background-color: #f4f5f9;
    // z-index: 10;
}

.common .txt {
    line-height: 1rem;
    fs($font13);
    color: #999;
}

.common .price {
    fs($font15);
    color: #ee7907;
}

.numBox .select {
    margin-top: 0.14rem;
    width: 2.44rem;
    height: 0.72rem;
    border-radius: 0.1rem;
    overflow: hidden;
}

.numBox .select i {
    /* padding: 12px 16px; */
    width: 0.8rem;
    height: 0.72rem;
    position: relative;
    background-color: #f5f5f5;
}

.numBox .select .num {
    width: 0.8rem;
    height: 0.72rem;
    line-height: 0.72rem;
    text-align: center;
    fs($font13);
    font-weight: 600;
    color: #3b3b3b;
    background: #eee;
    margin: 0 0.02rem;
}

.numBox .select .add s, .numBox .select .decrease s {
    position: absolute;
    width: 0.16rem;
    height: 0.16rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.numBox .select .decrease s {
    height: 0.04rem;
}

.numBox .select .decrease s {
    bg('../../assets/icon_del8x8');
}

.numBox .select .add s {
    bg('../../assets/icon_plus8x8');
}

.cashTicket {
    padding: 0 0.32rem;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #fafbfd;
}

.cashTicket i {
    display: inline-block;
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
    bg('../../assets/icon_biaoji14x14');
}

.cashTicket span {
    fs($font12);
    color: #333;
}

.pay {
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.98rem;
}

.pay .left {
    flex: 1;
    padding-left: 0.4rem;
    height: 0.98rem;
    background-color: #fff;
    line-height: 0.98rem;
}

.pay .lh {
    line-height: 0.28rem;
    padding-top: 0.2rem;
}

.pay .ticket {
    fs($font12);
    color: #999;
}

.pay .left .total {
    fs($font15);
    font-weight: 600;
    color: #ee7907;
}

.pay .button {
    flex: 0 0 2.4rem;
    height: 0.98rem;
    line-height: 0.98rem;
    background-color: #00bc71;
    text-align: center;
    fs($font14);
    color: #fff;
}

.mask {
    width: 100%;
    height: 100%;
}

.mask .PayBox {
    color: #333;
    background-color: #f4f5f9;
}

.mask .PayBox .common {
    padding: 0 0.32rem;
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
    bg('../../assets/icon_close19x19');
}

.mask .PayBox .verfiy span {
    fs($font15);
    font-weight: 600;
}

.mask .PayBox .num {
    height: 2.5rem;
    text-align: center;
    line-height: 2.8rem;
    margin-bottom: 0.02rem;
}

.mask .PayBox .num i {
    fs($font15);
}

.mask .PayBox .num span {
    height: 1.16rem;
    line-height: 1.16rem;
    fs($font34);
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
    fs($font13);
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
    fs($font14);
    color: #fff;
}

.mask .PayBox .verfiyBtn button {
    margin: 0 !important;
    width: 100%;
    margin-top: 0.5rem;
    height: 100%;
    background-color: #00bc71;
    text-align: center;
    fs($font14);
    color: #fff;
    border-radius: 0.1rem;
}

.select-box {
    fs($font13);
    color: #999;
}

.select-box .tip, .select-box .time {
    fs($font14);
    color: #333;
}

// .loading {
//     top: 0;
//     z-index: 11;
//     position: fixed;
//     height: calc(100% - 0.98rem);
//     width: 100%;
//     background: rgba(0, 0, 0, .8)
// }

// .loading div {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 100px;
//     text-align: center;
// }

// .loading div i {
//     width: 1rem;
//     display: inline-block;
//     height: 1rem;
//     background: url('../assets/') center/cover;
// }

// .loading div p {
//     color: #f5f5f5;
// }
.gray {
    background: #999 !important;
}

/* 1.1 */
.slide {
    transform: translateY(-1.48rem);
    transition: all 0.4s;
}

.slidedown {
    transform: translateY(0px);
}

.useTicket .triangle {
    margin-top: 0.4rem;
    margin-left: 0.08rem;
    width: 0.18rem;
    height: 0.18rem;
    background: url('../../assets/forward.png') center / cover;
}

.useTicket .use {
    bg('../../assets/icon_success60x60');
}

.avilable {
    margin-bottom: 0.02rem;
}

.avilable span {
    fs($font13);
    color: #999;
}

.avilable b {
    font-size: 13px;
    color: #ee7907;
}

.numBox .ticket {
    color: #999;
}

.numBox .price {
    color: #ee7907;
}

.useTicket .noticket {
    fs($font14);
    color: #333;
}

/* ------------------------ */
.priceBox {
    margin-bottom: 1px;
}

.priceBox .fr {
    color: #ee7907;
    font-weight: 600;
}

#contentBox .numBox {
    height: 1.2rem;
    line-height: 1.2rem;
    margin-bottom: 0.08rem;
}

.numBox .txt {
    // line-height: 1.2rem;
    color: #999;
}

.inform {
    position: fixed;
    width: 100%;
    bottom: 1.4rem;
    // bottom: 2.6rem;
    padding: 0 0.32rem;
}

.inform div {
    width: 100%;
    padding: 0.22rem 0.24rem 0.14rem 0.5rem;
    fs($font12);
    background: white;
    border-radius: 0.1rem;
    border: 0.02rem solid #00bc71;
    line-height: 0.4rem;
    position: relative;
}
.tip-enter-active,.tip-leave-active{
    transition:all .5s;
}
.tip-enter{
    transform:translateY(1.5rem)
}
.inform div span {
    color: #00bc71;
    font-weight: 600;
}

.inform i {
    position: absolute;
    z-index: 2;
    height: 0.3rem;
    top: 0.28rem;
    left: 0.46rem;
    width: 0.3rem;
    bg('../../assets/tongzhi30x30');
}
</style>


