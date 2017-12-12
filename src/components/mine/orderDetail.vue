<template>
    <div class="contentBox orderDetail">
        <div class="top">
            <section class="topBg"></section>
            <i class="iconfont" 
            :class="result.status<=2?'icon-order_tobepaid':(result.status==3?'icon-order_done':
            (result.status==10?'icon-order_refunding':'icon-order_refunded'))"></i>
            <!-- icon-order_refunding 退款中 -->
            <!-- icon-order_refunded  退款已完成-->
            <!-- icon-order_done  已完成-->
            <div v-if="result.status==1">
                <h3>正在出票中</h3>
                <p>券码生成中，请耐心等待...</p>
           </div>
            <div v-if="result.status==2">
                <h3>待使用</h3>
                <p>请在有效期内使用，过期失效</p>
           </div>
            <div v-if="result.status==10">
                <h3>退款中</h3>
                <p>预计两个工作日内到帐</p>
           </div>
            <div v-if="result.status==15">
                <h3>退款已完成</h3>
                <p>订单支付的钱款按原路退回至您的账户</p>
           </div>
            <div v-if="result.status==3">
                <h3>已完成</h3>
                <p>订单交易已完成</p>
           </div>
        </div>
        
        <div class="code" @click.stop.prevent="code">
            <span>券码</span>
            <div class="fr num"  @click.stop.prevent="showCodes" v-if="more">
                <i>共有3张券码</i><b class="iconfont icon-set_more"></b>
            </div>
            <div class="fr" v-else>
                <i>{{list.act_code}}</i><s class="iconfont icon-order_qcode"></s><b class="iconfont icon-set_more"></b>
            </div>
        </div>
        <div class="lists">
            <div class="code codes" v-for="(v,i) in list" :key="i" @click="codes(i)">
                <span>券码 0{{i+1}}</span>
                <div class="fr">
                    <i>{{v.act_code}}</i><s class="iconfont icon-order_qcode"></s>
                </div>
            </div>
        </div>
        <div class="validity">
            <span>有效期至</span>
            <div class="fr">{{result.expiry_date}}</div>
        </div>
        <div class="activity">
            <img :src="result.goods_photo" alt="">
            <div>
                <h3>{{result.goods_name}}</h3>
                <span>￥{{result.goods_price}}.00</span>
            </div>
        </div>
        <div class="msg">
            <div class="quantity"><span>购买数量</span><i class="fr">x{{result.goods_num}}</i></div>
            <div class="price"><span>活动总价</span><i class="fr">￥{{result.original_price}}.00</i></div>
            <div class="coupon" v-if="result.coupon_amount"><span>优惠券</span><i class="fr">-￥{{result.coupon_amount}}.00</i></div>
            <div class="payment"><span>实付款</span><i class="fr">￥{{result.total_price}}.00</i></div>
        </div>
        <div class="phone">
            <div><i class="iconfont icon-order_telephone"></i><a href="tel:4000-399-118">客服电话 4000-399-118</a></div>
        </div>
        <div class="order">
            <div>订单号：{{result.order_id}}</div>
            <div>创建时间：{{result.created_time}}</div>
            <div>支付时间：{{result.payment_time}}</div>
        </div>
        <div v-if="result.status==2" class="refund clearfix"><router-link class="fr" :to="'/refund?order_id='+result.order_id">申请退款</router-link></div>
        <div class="schedule clearfix" v-if="result.status==10||result.status==15"><router-link class="fr" :to="'/mine/refundDetail?order_id='+result.order_id">查看退款进度</router-link></div>
        <div class="msk">
            <div>
                <img class="codeImg" src="" alt="">
                <i @click="hideMsk"><b></b></i>
            </div>
        </div>
    </div>
</template>
<script>
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  getItem,
  destroy
} from "../../common/js/common";
import { Toast, Indicator, Actionsheet } from "mint-ui";
export default {
  data() {
    return {
        result:'',
        list:'',
        tag:0,
        more:0
    };
  },
  created() {
    document.title = "订单详情";
    analyze();
    this.avatar = getItem("avatar");
  },
  mounted() {
      this.init()
  },
  methods: {
    init() {
      var that = this;
      var params = {
          token: 123,
          user_id: getCookie("src_user_id"),
        //   user_id: 11375,
          order_id:this.$route.query.order_id
        },
        url = apiUrl + "/peony/activity/getOrderDetails";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          that.result = res.body.data.result;
          if(that.result.coupon_code_list.length<=1){
              that.list = that.result.coupon_code_list[0];
              if(!that.list){
                  that.list={}
                  console.log(that.list)
                //   that.list.act_img='../../assets/loading1.gif'
                //   that.list.act_code='正在出票中...'
                  that.$set(that.list,'act_img',require('../../assets/loading1.gif'))
                  that.$set(that.list,'act_code','正在出票中...')
                }
                console.log(that.list)
          }else{
              that.list = that.result.coupon_code_list;
              that.more = 1
          }
        //   console.log(that.result);
          console.log(that.result.coupon_code_list);
          //   Indicator.close();
        } else if (res.body.code == -1) {
          Toast(res.body.msg);
        }
      });
    },
    code(){
        if(this.list&&!this.list.length){
            $('.msk').fadeIn()
            $('.codeImg').attr('src',this.list.act_img)
            // console.log(this.list.act_img)
        }
    },
    showCodes(){
        this.tag++
        if(this.tag%2){
            $('.lists').slideDown()
        }else{
            $('.lists').slideUp()
        }
        $('.num b').toggleClass('rotate')
    },
    codes(i){
        $('.msk').fadeIn()
         $('.codeImg').attr('src',this.list[i].act_img)
    },
    hideMsk(){
        $('.msk').fadeOut()
    }
  },
  filters: {
    formateTime(str, symbol2) {
      return str.replace(/-/g, symbol2);
    }
  },
  destroyed() {
    destroy();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.orderDetail {
    fs($font13);

    .top {
        height: 1.5rem;
        background: linear-gradient(to right, #37d193, #00bc71);
        color: white;
        padding: 0.38rem 0 0 0.4rem;
        position: relative;
        margin-bottom 0.1rem
        .topBg {
            position: absolute;
            height: 100%;
            width: 2.86rem;
            right: 0;
            top: 0;
            bg('../../assets/order_bg');
        }

        i {
            float: left;
            // overflow: hidden;
            fs($font34);
            color: white;
        }

        div {
            overflow: hidden;
            padding-left: 0.28rem;

            h3 {
                line-height: 0.38rem;
                fs($font16);
                font-weight: 600;
            }

            p {
                line-height: 0.24rem;
                margin-top: 0.08rem;
                fs($font12);
            }
        }
    }

    .schedule {
        background-color: white;
        height: 0.8rem;
        margin-top 0.1rem
        a {
            // line-height 0.8rem
            padding: 0.04rem 0.3rem;
            border-radius: 0.24rem;
            color: $colorGreen;
            border: 0.02rem solid $colorGreen;
            margin-top: 0.14rem;
            margin-right: 0.2rem;
        }
    }


    .code, .validity {
        height: 0.8rem;
        background-color: white;
        padding: 0 0.2rem;
        position: relative;
        margin-bottom: 1px;

        span {
            display: inline-block;
            line-height: 0.8rem;
            color: #999;
        }
        div {
            position: absolute;
            top: 50%;
            right: 0.18rem;
            transform: translateY(-50%);
            color: #333;
            
            i {
                fs($font15);
                color: #333;
                font-weight: 600;
                // vertical-align: middle;
            }

            s {
                display: inline-block;
                // vertical-align: middle;
                margin: 0 0.1rem 0 0.2rem;
                text-decoration: none;
            }

            b {
                fs($font13);
                color: #999;
                // vertical-align: middle;
                position relative
                top -0.02rem
            }
        }
        .num{
            i{
                // font-family: 'PT Sans Caption'; 
                fs($font14)
             }
             b{
                 top 0
                 margin-left 0.08rem
                 transition  all .3s
                 display inline-block
              }
              .rotate{
                transform rotate(90deg)    
              }
        }
    }

    .codes {
        background-color #fafbfe
        margin-bottom 1px
    }
    .lists{
        display none
        // height 0
        // overflow hidden
        // transition all .3s
     }
     .hideLists{
        // height auto
     }
    .activity {
        height: 2rem;
        background-color: white;
        padding: 0.3rem 0.2rem;
        margin-bottom: 1px;
        img {
            width: 1.9rem;
            height: 1.4rem;
            float: left;
            overflow: hidden;
        }

        div {
            padding-top: 0.08rem;
            height: 1.4rem;
            overflow: hidden;
            padding-left: 0.2rem;
            position: relative;

            h3 {
                color: #333;
                line-height: 0.38rem;
            }

            span {
                color: $colorPrice;
                position: absolute;
                line-height: 0.18rem;
                left: 0.2rem;
                bottom: 0.1rem;
            }
        }
    }

    .msg {
        background-color: white;
        margin-bottom: 1px;
        padding: 0.2rem 0.2rem;

        span {
            color: #999;
        }

        i {
            color: #333;
        }

        div {
            line-height: 0.43rem;
        }

        .payment {
            span {
                color: #333;
            }

            i {
                fs($font15);
                color: #e62b2b;
            }
        }
    }

    .phone {
        text-align: center;
        background-color: white;
        line-height: 0.8rem;
        margin-bottom 1px
        div {
            display: inline-block;

            i {
                fs($font17);
                vertical-align: middle;
                color: $colorGreen;
            }

            a {
                color: #999;
                vertical-align: middle;
                margin-left: 0.12rem;
                fs($font12);
            }
        }
    }

    .order {
        background-color: white;
        padding: 0.34rem 0.2rem 0.83rem 0.2rem;

        div {
            color: #999;
            line-height: 0.36rem;
        }
    }

    .refund {
        height: 0.8rem;
        background-color: white;
        margin-top: 0.1rem;
        padding-top: 0.12rem;

        a {
            background-color: $colorPrice;
            color: white;
            border-radius: 0.28rem;
            padding: 0.1rem 0.3rem;
            fs($font12);
            margin-right: 0.2rem;
        }
    }
    .msk{
        display none
        position fixed
        top 0
        left 0
        height 100%
        width 100%
        background-color rgba(0,0,0,.8)
        div{
            position absolute
            top 50%
            width 4.6rem
            height 4.6rem
            background-color white
            padding 0.6rem
            border-radius 0.2rem
            left 50%
            transform translate(-50%,-60%)
            img{
                height 100%
                width 100%
             }
             i{
                 position absolute
                 width 0.38rem
                 height 0.38rem
                 bg('../../assets/icoon_close19x19');
                 right 0
                 top -0.58rem
                 b{
                     position absolute
                     width 0.02rem
                     height 0.2rem
                     background-color white
                     top 0.38rem
                     left 50%
                     transform translate(-50%)
                  }
              }
         }
    }
}
</style>

