<template>
    <div class="contentBox ticket">
        <div class="ticketList">
            <a class="detail" @click="select(item,index+1)" ref="detail" v-for="(item,index) in list" :key="index" :class="{'no-available':!item.is_available}">
                <!-- :href="'http://www.shijian666.com/h5/index/addActive/shop_id/'+shop_id+'/goods_id/'+goods_id+'/coupon_id/'+item.coupon_id" -->
                <div class="pirce" :class="{'pirce10':item.amount>19?false:true}"><span>￥</span><b>{{item.amount}}</b></div>
                <div class="desc">
                    <div class="msg fl">
                        <div class="title">{{item.title}}</div>
                        <div class="time">{{item.start_date}} 至 {{item.end_date}}</div>
                    </div>
                    <i class="icon fr" :class="{'special':changeIcon==index+1}" v-show="item.is_available&&payPrice>(item.available_amount-1)"></i>
                </div>
            </a>
        </div>
        <div class="btnBox">
            <div class="confirm" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
import {apiUrl,GetRequest,setCookie,getCookie,linkUrl,analyze,destroy} from '../../common/js/common.js'
import { Indicator } from 'mint-ui';


export default {
    data(){
        return{
            list:[],
            changeIcon:'',
            user_id:'',
            goods_id:'',
            shop_id:'',
            coupon_id:'',
            payPrice:getCookie('goodsPrice'),
            coupon_price:''

        }
    },
    created(){   
    },
    mounted(){

    },
    activated(){
        this.payPrice=getCookie('goodsPrice')
            analyze()
        document.title="我的优惠券";
        this.user_id=GetRequest().user_id;
        this.goods_id=GetRequest().goods_id;
        this.shop_id=GetRequest().shop_id;
        this.getMyCoupons()
        console.log(getCookie('couponTag'))
        if(!getCookie('couponTag')){
            this.changeIcon=0
        }else{
            this.changeIcon=getCookie('couponTag')
        } 
        },
        deactivated(){
            destroy()
        },
    methods:{
        select(item,index){
            var that = this;
            if(this.changeIcon==index){
                this.changeIcon=0
                this.coupon_price=0
            console.log(getCookie('couponTag'))
            console.log(getCookie('coupon_price'))
            }else if(item.is_available && getCookie('goodsPrice')>item.available_amount-1){
                that.changeIcon=index;
                that.coupon_id=item.coupon_id;
                that.coupon_price=that.list[index-1].amount
                // setCookie('couponTag',this.changeIcon)
                // setCookie('coupon_price',that.list[index-1].amount)
                console.log(getCookie('coupon_price'))
                console.log(getCookie('couponTag'))
                // that.setPrice(item,index)
            }
            var couponTag = getCookie('couponTag')
            if(couponTag==0){
                setCookie('coupon_id',0)
            }else{
                // setCookie('coupon_id',this.list[getCookie('couponTag')-1].coupon_id)
            }
            
        },
        // setPrice(item,index){
        //         this.changeIcon=index;
        //         this.coupon_id=item.coupon_id;
        //         setCookie('couponTag',this.changeIcon)
        //         setCookie('coupon_price',that.list[index-1].amount)
        //         console.log(getCookie('coupon_price'))
        //         console.log(getCookie('couponTag'))
        // },
        getMyCoupons(){
          Indicator.open('加载中...');
          var params={
            token:123,
            user_id:getCookie('src_user_id')
          },
          url=apiUrl+"/peony/activity/myCoupons";
          this.$http.post(url,params,{emulateJSON:true})
          .then(function(res){
              if(res.body.code==0){
                  this.list=res.body.data.result.not_used_list
                  this.coupon_id=res.body.data.result.not_used_list[0].coupon_id
                  Indicator.close();
                }else if(res.body.code==-1){
                  Toast(res.body.msg)
                }
            })
        },
        confirm(){
                // this.changeIcon=index;
                // this.coupon_id=item.coupon_id;
                // this.coupon_price=that.list[index-1].amount
                setCookie('couponTag',this.changeIcon)
                setCookie('coupon_id',this.coupon_id)
                setCookie('coupon_price',this.coupon_price)
            this.$router.push('/submitOrder?coupon_id='+(getCookie('coupon_id')))
            // if(this.changeIcon==-1){
            //     location.href=`${linkUrl}/h5/index/addActive/shop_id/${this.shop_id}/goods_id/${this.goods_id}/coupon_id/0`
            // }else{
            //     location.href=`${linkUrl}/h5/index/addActive/shop_id/${this.shop_id}/goods_id/${this.goods_id}/coupon_id/${this.coupon_id}`
            // }
        }
    },
    destroyed(){
        // destroy()
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
.ticket{
    line-height 0;
    .ticketList{
        margin-bottom 0.8rem
        padding 0.2rem
        width 100%
        .detail{
            position relative
            display flex
            margin-bottom 0.1rem
            width 100%
            height 1.68rem
            border-radius 0.1rem
            background-color $colorfff
            overflow hidden
            .pirce{
                flex 0 0 1.72rem
                height 1.68rem
                border-right 1px solid #f3f6f8
                text-align center
                color $colorPrice
                span{
                    display inline-block
                    line-height 1.36rem;
                    fs($font12)
                    vertical-align bottom
                }
                b{
                    display inline-block
                    height 1.68rem
                    line-height 1.68rem
                    fs(40)
                    font-weight 600
                }
            }
            .pirce10{
                color #00c7f2
            }
            .desc{
                flex 1
                height 1.68rem
                padding 0.5rem 0.24rem 0 0.24rem
                .msg{
                    line-height 0
                    .title{
                        line-height 0.32rem
                        fs($font13)
                        color $color333
                    }
                    .time{
                        line-height 0.36rem
                        fs($font12)
                        color $color999
                    }
                }
                .icon{
                    margin-top 0.18rem
                    width 0.34rem
                    height 0.34rem
                    bg("../../assets/weixuanzhong34x34")
                }
                .special{
                    bg("../../assets/icon_sel17x17")
                }
            }
            .overdueIcon{
                position absolute
                width 0.8rem
                height 0.8rem
                top 0
                right 0
                bg('../../assets/yiguoqi')
            }
            .usedIcon{
                position absolute
                width 0.8rem
                height 0.8rem
                top 0
                right 0
                bg('../../assets/yishiyong')
            }
        }
        .no-available{
            .pirce{
                color #999
            }
            .desc{
                .msg{
                    .title{
                        color #999
                    }
                }
            }
        }
    }
    .btnBox{
        position fixed
        width 100%
        padding 0 0.2rem 0.2rem 0.2rem
        bottom 0
        left 0
        background-color #f3f6f8;
        .confirm{
            width 100%
            height 0.8rem
            line-height 0.8rem
            background-color $colorGreen
            border-radius 0.1rem
            text-align center
            fs($font14)
            color $colorfff
        }
    }

}
</style>
<style lang="stylus">
  .mint-indicator-wrapper{
    padding 10px
    line-height: 0
    .mint-indicator-text{
        font-size 14px
        line-height 14px
    }
  }
</style>
