<template>
  <div class="refund">
        <div class="tel">
            <div>活动名称</div>
            <span class="txt-overflow title">{{data.activity_name}}</span>
        </div>
        <div class="tel">
            <div>订单号</div>
            <span>{{data.order_id}}</span>
        </div>
        <div class="tel">
            <div>购买数量</div>
            <span>{{data.purchase_quantity}}</span>
        </div>
        <div class="tel">
            <div>订单金额</div>
            <span>￥{{data.order_amount}}.00</span>
        </div>
        <div class="tel price">
            <div>实付金额</div>
            <span class="actual" v-if="data.coupon_amount"><p>￥{{data.pay_amount}}.00</p><p class="ticket">优惠券 -{{data.coupon_amount}}.00( 不可退 )</p></span>
            <span v-else>￥{{data.pay_amount}}.00</span>
        </div>
        <div class="tel should price">
            <div>应退金额</div>
            <span>￥{{data.refund_amount}}.00</span>
        </div>
        <div class="reason" @click="showMsk">
            <span>退款原因（必选）</span>
            <i class="iconfont icon-set_more fr"></i>
            <div class="fr">{{reason}}</div>
        </div>
        <div class="tip">
            <i></i><span>资金将原路返回到您的支付账户，无手续费！</span>
        </div>
        <div class="btn">
            <button class="apply" @click="applyRefund">申请退款</button>
        </div>

        <div class="msk" @click="hideMsk"></div>
        <div class="list">
            <div @click="checkReason" v-for="(v,i) in list" :key="i">{{v.reason}}</div>
            <!-- <div @click="checkReason">计划有变，没有时间上课</div>
            <div @click="checkReason">朋友/网上评价不好</div>
            <div @click="checkReason">去过了，不太满意</div>
            <div @click="checkReason">课程过期了</div> -->
        </div>
  </div>
</template>

<script>
import { Toast,Indicator,MessageBox } from 'mint-ui'
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,analyze,destroy} from '../../common/js/common.js'
export default {
    data(){
      return{
        order_id:'',
        data:'',
        reason:'',
        list:''
      }
    },
    methods:{
      getOrderRefundInfo(){
        var params={
              token:123,
              order_id:this.order_id,
            //   order_id:'D2017120652100504991'
            },
            url=apiUrl+"/peony/activity/getOrderRefundInfo";
            this.$http.post(url,params,{emulateJSON:true}).then(function(res){
              if(res.body.code==0){
                this.data=res.body.data.result;
                this.list=res.body.data.result.refund_reasons_list;
              }else if(res.body.code==-1){
                  Indicator.close();
                  console.log(res.body.msg)
              }
            })
      },
      applyRefund(){
        var that=this;
        if(!this.reason){
            Toast('请选择退款原因')
            return
        }
        MessageBox.confirm(
            '是否确定申请退款',
            '温馨提示',
            {showCancelButton:true,cancelButtonText:'确定',confirmButtonText:'再想想',closeOnClickModal:false}
        ).then(action=>{
            console.log(222)
        }).catch(cancel=>{
            console.log(111)
            Indicator.open('申请退款中...');
            var params={
                token:123,
                order_id:this.order_id,
                reason:that.reason
                },           
                url=apiUrl+"/peony/activity/applyRefund";
                that.$http.post(url,params,{emulateJSON:true}).then(function(res){
                        Indicator.close();
                    if(res.body.code==0){
                        that.$router.push({
                            path:'/submit?order_id='+that.order_id
                        })
                     }else{
                        Toast(res.body.msg)
                    }
                })
        })
      },
      showMsk(){
          $('.msk').fadeIn(100)
          $('.list').animate({'bottom':'-0.02rem'},200)
      },
      hideMsk(){
          $('.msk').fadeOut(100)
          $('.list').animate({'bottom':'-4.5rem'},200)
      },
      checkReason(e){
        //   console.log(e.target.innerText)
          this.reason = e.target.innerText
          this.hideMsk()
      }
    },
    created(){
        document.title="申请退款";
        this.order_id=GetRequest().order_id;
        this.getOrderRefundInfo()
        analyze()
    },
    mounted(){
        
    },
    //  activated(){
    //         analyze()
    //     },
    //     deactivated(){
    //         destroy()
    //     },
    destroyed () {
        destroy()
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
.refund .btn .apply {
    background: #F23434;
    width: 100%;
    height: 100%;
    border-radius: 0.1rem;
    color: white;
    fs($font14);
    font-weight: 600;
    border: none;
}

.refund .tel .title{
    left:1.6rem;
    text-align:right; 
    line-height: 0.8rem;
    top:0;
    transform:translateY(-1px);
}
.refund .tip {
    fs($font13);
    padding: 0.2rem 0.32rem 0.5rem 0.32rem;
    overflow: hidden;
}

.refund .tip i {
    float: left;
    width: 0.32rem;
    height: 0.32rem;
    bg('../../assets/icon_biaoji14x14')
    vertical-align: middle;
    margin-right: 0.1rem;
}

.refund .tip span {
    float: left;
    fs($font12);
    color: #333;
    vertical-align:middle;
}

.refund .tel {
    position: relative;
    height: 0.8rem;
    padding: 0 0.2rem;
    background: white;
    margin-bottom : 0.02rem;
}

.refund .price{
    height: 1rem;
}

.refund .tel div {
    height: 100%;
    line-height: 0.8rem;
    color: #333;
    fs($font13);
    color: #999;
}
.refund  .price div{
    line-height: 1rem;
}
.refund .tel .ticket {
    fs($font12);
    color: #999;
}

.refund .tel span {
    position: absolute;
    right: 0.2rem;
    top: 50%;
    transform translateY(-50%)
    fs($font13);
    color: #333;
}
.refund .tel .actual{
    text-align :right;
    line-height :0.3rem;
    position :absolute;
    top:50%;
    transform :translateY(-50%);
}

.refund .should{
    // margin-top :5px;
}

.refund .should span {
    fs($font15);
    color: #f23434;
    font-weight: 600;
}
.btn {
    fs($font14);
    height: 0.8rem;
    padding: 0 0.32rem;
}
.reason{
    fs($font13);    
    line-height: 1rem;
    background-color white
    margin-top 0.09rem
    color: #999;
    padding 0 0.2rem
    i{
        fs($font14);
        margin-left 0.1rem
     }
     .fr{
        //  width 1.6rem
        //  height 100%
      }
}
.msk{
    display none
    position fixed
    top 0
    left 0
    height 100%
    width 100%
    background rgba(0,0,0,.5)
}
.list{
    position fixed
    bottom -4.5rem
    left 0
    width 100%
    fs($font14);
    color: #999;
    text-align center
    background: #f3f6f8;
    div{
        background-color white
        margin-bottom 0.02rem
        line-height 0.8rem
     }
}
</style>
<style lang="stylus">
// @import '../../common/stylus/variable.styl'
.mint-msgbox{
    border-radius 0.1rem;
    transform: translate3d(-50%,-70%,0)
}
.mint-msgbox-content{
    padding-top 5px
    color #999
}
.mint-indicator-wrapper{
    padding 10px
    line-height: 0
    .mint-indicator-text{
        font-size 14px
        line-height 14px
    }
}
.mint-msgbox-btns{
    height 49px
    line-height 49px
}
.mint-msgbox-cancel{
    font-size 15px
    color #333
}
.mint-msgbox-confirm {
    font-size 15px
    color #00bc71
}
</style>



