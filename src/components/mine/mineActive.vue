<template>
  <div class="contentBox mineActive">
    <!-- <volist name="myactive" id="v"> -->
    <div class="activeBox" v-for="(v,i) in msg" :key="i">
        <div class="num">
            <div class="left fl">订单编号：{{v.order_id}}</div>
            <div class="right fr orderNum" 
            :class="{'status1':v.status<=2,'status3':v.status==3,'status10':v.status==10,'status15':v.status==15}">{{status[v.status]}}</div>
            <!-- :class="{'status1':<{$v['status']}><=2,'status3':<{$v[ 'status']}>==3,'status10':<{$v[ 'status']}>==10,'status15':<{$v[ 'status']}>==15}" -->
        </div>
        <div class="picBox">
            <img class="pic" :src="v.goods_photo" alt="">
            <div class="txt">
                <div class="title">{{v.goods_name}}</div>
                <div class="flex">
                    <span class="price fl"> ￥{{v.goods_price}}.00</span>
                    <span class="refund fr" @click="refundShow(i)" v-show="v.status<=2">
                        <!-- @click="refund(<{$v.index}>)" v-show="<{$v['status']}><=2" -->
                        <i></i><i></i><i></i>
                        <transition name="refundFade">
                            <!-- <a  class="pop" ref="pop" v-show="refundFlag"> -->
                            <<router-link :to="'/refund?order_id='+v.order_id" class="pop" ref="pop" v-show="showRefund['a'+i]">
                                <s></s>
                                申请退款
                            </router-link>
                        </transition>
                    </span>
                    <!--<a href="<{:U('H5/Index/refund')}>" class="pop" ref="pop">-->
                </div>
            </div>
        </div>
        <div class="msk" v-show="showMask" @click="hideMask"></div>
        <div class="msgBox">
            <div class="num common">
                <div class="left fl">活动券码</div>
                <div class="right fr pcode status1" ref="J_code">{{v.act_code||'正在出票中...'}}</div>
                <!-- <?php if(!empty($v['piao_uucode'])){ echo $v['piao_uucode']; }else{ echo '正在出票中...';} ?> -->
                <!-- <div class="right fr" v-else>正在出票中...</div> -->
            </div>
            <div class="time common">
                <div class="left fl">使用时间</div>
                <div class="right fr">{{v.service_time.substr(0,4)+'年'+v.service_time.substr(5,2)+'月'+v.service_time.substr(8,2)+'日'}}</div>
            </div>
            <div class="address common">
                <div class="left fl">基地地址</div>
                <div class="right fr">{{v.active_address}}</div>
            </div>
            <div class="code">
                <div class="left fl">点击查看二维码</div>
                <div class="right fr" @click="clk(i)"></div>
            </div>
        </div>
    </div>
    <!-- </volist> -->
    <transition name="maskFade">
        <div class="mask" v-show="codeFlag">
            <div class="outer">
                <div class="showCode">
                    <!-- <div class="code"></div> -->

                    <img v-show="act_code" src="" alt="" id="show_img" ref="qrCode">
                    <img v-show="!act_code" src="../../assets/loading1.gif" alt="" id="show_img">

                    <div class="txt" v-if="act_code"><span>活动券码</span>&nbsp;{{act_code}}</div>
                    <div class="txt"v-else>正在出票中,请稍后查看...</div>
                    
                    <div class="close" @click="coldeCodeMask"></div> 
                    <!-- @click="maskOut" -->
                </div>
            </div>
        </div>
    </transition>
    <div class="noActive" v-if="noActive">
        <div>
            <img src="../../assets/icon_chaping70x70@3x.png" alt="">
            <p>您还没有参加活动</p>
            <router-link to="activityList">快快参与</router-link>
        </div>
    </div>
</div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,analyze,destroy} from '../../common/js/common.js'
export default {
        data(){
            return{
                refundIndex:'',
                refundFlag:false,
                act_code:'',
                codeFlag:false,
                msg:[],
                status:['未付款','已付款待出票','待使用','已使用'],
                showRefund:{},
                showMask:0,
                noActive:0,
                statu:''
            }
        },
        created(){
            this.status[10]='申请退款中';
            this.status[15]='退款完成';
            document.title="我的活动";
            var that =this;
            var params={
                token:123,
                user_id:getCookie('src_user_id'),
            },
            url=apiUrl+"/peony/activity/myActivity";
            this.$http.post(url,params,{emulateJSON:true})
            .then(function(res){
                if(res.body.code==0){
                    that.msg=res.body.data.result;
                    if(that.msg.length===0){
                        that.noActive=1;
                    }
                    console.log(that.msg)
                    }else if(res.body.code==-1){
                    Toast(res.body.msg)
                    }
                })
            analyze()
        },
        mounted(){
            
            // $('.msk').click(function(e){
            //     console.log(11111111)
            //     // e.preventDefault()
            //     $('.txt a').fadeOut(200)
            //     $('.msk').hide()
            // })
            
        },
        activated(){
            // analyze()
        },
        deactivated(){
            // destroy()
        },
        destroyed(){
            destroy()
        },
        methods:{
            coldeCodeMask(){
                this.codeFlag=false;
                this.act_code='';
            },
            clk(i){
                this.codeFlag=true;
                var that =this;
                console.log(that.$refs.qrCode)
                this.statu=this.msg[i].status;
                var params={
                    token:123,
                    order_id:this.msg[i].order_id,
                    user_id:getCookie('src_user_id'),
                },
                url=apiUrl+"/peony/activity/getCouponCode";
                this.$http.post(url,params,{emulateJSON:true})
                .then(function(res){
                    if(res.body.code==0){
                        console.log(res.body.data.result.act_img)
                            if(res.body.data.result.act_img){
                                that.act_code=res.body.data.result.act_code;
                                console.log(that.act_code,i)
                                console.log(that.$refs.J_code[i],'dom')
                                that.$refs.J_code[i].innerHTML=that.act_code;
                                that.$refs.qrCode.src=res.body.data.result.act_img
                                // that.$refs.qrCode.setAttribute('src',res.body.data.result.act_img)
                            }
                        }else if(res.body.code==-1){
                        Toast(res.body.msg)
                        }
                    })
                // if(this.msg[i].act_img){
                //     this.$refs.qrCode.src=this.msg[i].act_img
                // }


            //     var e = e.target;
            //     var that = this;
            //     var order_id = $(e).data('order_id');
            //     $.post("<{:U('/H5/Index/getMyCode')}>",{
            //         order_id : order_id
            //     },function(ret){
            //         if(ret.code == 1){
            //             //that.act_code = $(e).data('act_code')||'正在出票中...';
            //             that.act_code = ret.act_code||'正在出票中，请稍后查看...';
            //             if(ret.act_code){
            //                 $(e).parents('.msgBox')[0].querySelector('.pcode').innerHTML = ret.act_code;
            //                 if($(e).parents('.activeBox')[0].querySelector('.orderNum').innerHTML == '已付款待出票'){
            //                     $(e).parents('.activeBox')[0].querySelector('.orderNum').innerHTML = '待使用';
            //                 }
            //             }
            //             var qrcode = ret.img|| '__PUBLIC__/H5/image/loading1.gif';
            //             $('#show_img').attr('src', qrcode);
            //             $('.mask').fadeIn(200);
            //         }else{

            //         }
            //     });
            },
            refund(i) {
            //         // e.stopPropagation()
            //         // $('.pop').fadeOut(200)
            //         // $($('.pop')[i]).fadeIn(200)
            //         // $('.msk').show();
            //     },
            //     maskOut(){
            //         // $('.mask').fadeOut(200);
            },
            refundShow(i){
                // this.refundFlag=!this.refundFlag;
                this.showMask=1;
                console.log(this.showRefund)
                this.showRefund = {};
                this.$set(this.showRefund,'a'+i,1);
                
            },
            hideMask(){
                this.showMask=0;
                this.showRefund = {};
            }
        }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.noActive{
    position fixed
    top:0;
    left:0;
    width 100%
    height 100%
    background white
    div{
        text-align: center;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
        line-height 0
        p {
            margin-top: 0.16rem;
            fs($font16)
            line-height 0.3rem
        }
        a {
            display: inline-block;
            margin-top: 0.3rem;
            padding: 0.06rem 0.2rem;
            fs($font14)
            color: #00bc71;
            border: 0.02rem solid #00bc71;
            border-radius: 0.3rem;
            line-height 0.3rem
        }
        img {
            height: 1.2rem;
            width: 1.2rem;
        }
    }
}

.mineActive {
    min-height: 100%;
    padding: 0.3rem;
    padding-bottom: 0.6rem;
}

.activeBox {
    margin-bottom: 10px;
    width: 100%;
    border-radius: 0.2rem 0.2rem 0 0;
    /* overflow: hidden; */
    background-color: #f4f5f9;
    fs($font12)
    color: $color333;
}

.num {
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0 0.2rem;
    margin-bottom: 0.02rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color:$colorfff;
}

.num .status1 {
    color: #f5841f;
}

.num .status3 {
    color: $colorGreen;
}

.num .status10 {
    color: #f23434;
}

.num .status15 {
    color: $color999;
}

.picBox {
    margin-bottom: 0.02rem;
    padding: 0.2rem;
    display: flex;
    width: 100%;
    height: 1.54rem;
    background-color: $colorfff;
}

.picBox .pic {
    margin-right: 0.2rem;
    flex: 0 0 1.46rem;
    height: 1.04rem;
}

.picBox .txt {
    flex: 1;
}

.picBox .txt .title {
    margin-bottom: 0.1rem;
}

.picBox .txt .flex {
    line-height: 0.4rem;
    height: 0.4rem;
    position: relative;
}

.picBox .txt .price {
    /* margin-top: 7px; */
    color: #ee7907;
}

.picBox .txt .refund {
    z-index: 2;
}

.picBox .txt .refund i {
    display: inline-block;
    width: 0.08rem;
    height: 0.08rem;
    background: $color999;
    border-radius: 50%;
    margin-left: 0.08rem;
}

.picBox .txt a {
    overflow: visible !important;
    z-index: 6;
    // display: none;
    position: absolute;
    width: 2.6rem;
    height: 0.76rem;
    background: white;
    fs($font13);
    color: $color333;
    line-height: 0.76rem;
    text-align: center;
    bottom: -0.96rem;
    right: -0.22rem;
    box-shadow: 0 0 9px 4px rgb(226, 222, 222);
    border-radius: 0.08rem;
}

.refundFade-enter-active, .refundFade-leave-active {
   transition: opacity .5s
}
.refundFade-enter, .refundFade-leave-to {
    // transform: translate3d(0, 0, 0);
    opacity: 0
}

.picBox .txt a::after {
    position: absolute;
    display: inline-block;
    top: -0.12rem;
    right: 0.26rem;
    width: 0;
    height: 0px;
    content: '';
    border-style: solid;
    border-width: 0.14rem;
    border-color: transparent transparent #fff #fff;
    transform: rotate(135deg);
    box-shadow: -2px 2px 1px #dedede;
}

.msk {
    // display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0;
    top: 0;
}


/* .picBox .txt .refund s{
    width:8px;
    height:8px;
    box-shadow: 0 0px 9px 4px rgb(212, 210, 210);
    position:absolute;
    top:0px;
    right:10px;
    transform: rotate(45deg);
} */

.msgBox .common {
    padding: 0 0.2rem;
    width: 100%;
    height: 0.92rem;
    line-height: 0.92rem;
    background-color: $colorfff;
    fs($font12);
    color: $color333;
    margin-bottom: 0;
}

.msgBox .common .left {
    color: $color999;
}

.msgBox .common .right {
    font-weight: 600;
}

.msgBox .num {
    border-radius: 0;
}

.msgBox .code {
    padding: 0 0.2rem;
    width: 100%;
    height: 1.14rem;
    line-height: 1.14rem;
    background-color: #fff;
    fs($font12);
    color: $color999;
    border-radius: 0 0 0.2rem 0.2rem;
}

.msgBox .code .right {
    margin-top: 0.29rem;
    width: 0.56rem;
    height: 0.56rem;
    bg('../../assets/icon_qcode28x28');
}

.mask {
    position: fixed;
    // display: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0 1rem;
}

// .maskFade-enter-active, .maskFade-leave-active {
//    transition: opacity .5s
// }
// .maskFade-enter, .maskFade-leave-to {
//     // transform: translate3d(0, 0, 0);
//     opacity: 0
// }

.mask .outer {
    position: relative;
    height: 100%;
}

.mask .showCode {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    margin: 0 auto;
    /* margin-top: 40%; */
    width: 100%;
    /* height: 280px; */
    border-radius: 0.2rem;
    background-color: #fff;
    text-align: center;
    padding: 0.6rem 0.8rem;
    line-height 0
}

.mask .showCode .code {
    margin: 0 auto;
    width: 2.3rem;
    height: 2.3rem;
    background-color: black;
}

.mask .showCode img {
    width: 100%;
}

.mask .showCode .txt {
    font-weight: 600;
    margin-top: 0.1rem;
    text-align: center;
    line-height: 0.52rem;
    fs($font12)
    color: $color333;
}

.mask .showCode .txt span {
    fs($font13);
    font-weight: 300;
}

.mask .showCode .close {
    position: absolute;
    top: -0.68rem;
    right: 0;
    width: 0.38rem;
    height: 0.38rem;
    bg('../../assets/icoon_close19x19');
}

.mask .showCode .close::after {
    content: "";
    width: 0.02rem;
    height: 0.6rem;
    background: white;
    position: absolute;
    bottom: -0.9rem;
    left: 50%;
    transform: translateY(-50%);
}
</style>

