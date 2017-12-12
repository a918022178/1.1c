<template>
    <div class="contentBox mineTicket">
        <div class="nav clearfix">
            <div class="notUsed fl" @click="getNotUsed" :class="{'active':isactive==1}">未使用{{data.not_used_total}}</div>
            <div class="used fl" @click="getUsed" :class="{'active':isactive==2}">已使用{{data.already_used_total}}</div>
            <div class="overdue fl" @click="getOverdue" :class="{'active':isactive==3}">已过期{{data.expired_total}}</div>
        </div>
        <div class="ticketList">
            <div class="detail" @click="select(index)" ref="detail" v-for="(item,index) in list" :key="index" :class="{'special':usedCss}">
                <div class="pirce" :class="{'pirce10':item.amount>10?false:true}"><span>￥</span><b>{{item.amount}}</b></div>
                <div class="desc">
                    <div class="msg fl">
                        <div class="title">{{item.title}}</div>
                        <div class="time">{{item.start_date}}至{{item.end_date}}</div>
                    </div>
                    <!-- <i class="icon fr"></i> -->
                </div>
                <div class="overdueIcon" v-show="overdueIcon"></div>
                <div class="usedIcon" v-show="usedIcon"></div>
            </div>
        </div>
        <div class="noTicketTip" v-show="noTicketTip">
            <div class="pic"></div>
            <p>{{text}}</p>
            <router-link :to="'/activityList?user_id='+user_id" class="btn">返回活动中心</router-link>
        </div>  
    </div>
</template>

<script>
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,analyze,destroy} from '../../common/js/common.js'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            data:{},
            list:[],
            isactive:1,
            usedCss:false,
            overdueIcon:false,
            usedIcon:false,
            noTicketTip:false,
            user_id:getCookie('src_user_id'),
            text:'暂无可使用优惠券'

        }
    },
    methods:{
        select(index){
            this.a=index;
        },
        getMyCoupons(){
          Indicator.open('加载中...');
          this.noTicketTip=false;
          var params={
            token:123,
            user_id:this.user_id
            // user_id:11375
          },
          url=apiUrl+"/peony/activity/myCoupons";
          this.$http.post(url,params,{emulateJSON:true})
          .then(function(res){
              if(res.body.code==0){
                //   this.noTicketTip=false
                  this.data=res.body.data.result
                  this.list=res.body.data.result.not_used_list
                  Indicator.close();
                  if(this.list.length==0){
                      var that=this;
                      setTimeout(function(){
                          that.noTicketTip=true;
                      },15)
                    }
                }else if(res.body.code==-1){
                  Toast(res.body.msg)
                }
            })
        },
        getNotUsed(){
            // Indicator.open('加载中...');
            this.noTicketTip=false;
            this.isactive=1;
            this.usedCss=false;
            this.usedIcon=false;
            this.overdueIcon=false;
            this.list=this.data.not_used_list
            if(this.list.length==0){
                // var that=this;
                    // setTimeout(function(){
                this.text='暂无可使用优惠券';
                this.noTicketTip=true;
                    // },15)
            }else{
                this.noTicketTip=false;
            }
            // var params={
            //     token:123,
            //     user_id:this.user_id
            // },
            // url=apiUrl+"/peony/activity/myCoupons";
            // this.$http.post(url,params,{emulateJSON:true})
            // .then(function(res){
            //     if(res.body.code==0){
            //         // this.noTicketTip=false
            //         this.list=res.body.data.result.not_used_list
            //         Indicator.close();
            //         if(this.list.length==0){
            //           var that=this;
            //           setTimeout(function(){
            //               that.noTicketTip=true;
            //           },15)
            //         }
            //     }else if(res.body.code==-1){
            //         Toast(res.body.msg)
            //     }
            // })

        },
        getUsed(){
            // Indicator.open('加载中...');
            this.noTicketTip=false;
            this.isactive=2;
            this.usedCss=true;
            this.usedIcon=true;
            this.overdueIcon=false;
            this.list=this.data.already_used_list
            if(this.list.length==0){
                // var that=this;
                    // setTimeout(function(){
                this.text='暂无已使用优惠券';
                this.noTicketTip=true;
                    // },15)
            }else{
                this.noTicketTip=false;
            }
            // var params={
            //     token:123,
            //     user_id:this.user_id
            // },
            // url=apiUrl+"/peony/activity/myCoupons";
            // this.$http.post(url,params,{emulateJSON:true})
            // .then(function(res){
            //     if(res.body.code==0){
            //         // this.noTicketTip=false
            //         this.list=res.body.data.result.already_used_list
            //         Indicator.close();
            //         if(this.list.length==0){
            //           var that=this;
            //           setTimeout(function(){
            //               that.noTicketTip=true;
            //           },15)
            //         }
            //     }else if(res.body.code==-1){
            //         Toast(res.body.msg)
                    
            //     }
            // })       
        },
        getOverdue(){
            // Indicator.open('加载中...');
            this.noTicketTip=false;
            this.isactive=3;
            this.usedCss=true;
            this.usedIcon=false;
            this.overdueIcon=true;
            this.list=this.data.expired_list
            if(this.list.length==0){
                this.text='暂无已过期优惠券';
                this.noTicketTip=true;
            }else{
                this.noTicketTip=false;
            }
            // var params={
            //     token:123,
            //     user_id:this.user_id
            // },
            // url=apiUrl+"/peony/activity/myCoupons";
            // this.$http.post(url,params,{emulateJSON:true})
            // .then(function(res){
            //     if(res.body.code==0){
            //         // this.noTicketTip=false
            //         this.list=res.body.data.result.expired_list
            //         Indicator.close();
            //         if(this.list.length==0){
            //           var that=this;
            //           setTimeout(function(){
            //               that.noTicketTip=true;
            //           },15)
            //         }
            //     }else if(res.body.code==-1){
            //        Toast(res.body.msg)
            //     }
            // })
        }
    },
    created(){
        document.title="我的优惠券";
        this.getMyCoupons()
        analyze()
    },
    mounted(){
        
    },
    // activated(){
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
.mineTicket{
    line-height 0;
    .nav{
        width 100%
        height 0.98rem
        line-height 0.98rem
        padding 0.2rem 0.9rem
        fs($font12)
        div{
            width 1.53rem
            height 0.58rem
            line-height 0.58rem
            text-align center
            border 1px solid $colorGreen
            color $colorGreen
        }
        .notUsed{
            border-radius 0.4rem 0 0 0.4rem
            border-right 0
        }
        .overdue{
            border-radius 0 0.4rem 0.4rem 0
            border-left 0
        }
        .active{
            background-color $colorGreen
            color $colorfff
        }

    }
    .ticketList{
        padding 0 0.2rem
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
            border  none
            .pirce{
                flex 0 0 1.72rem
                height 1.68rem
                line-height 1.68rem
                border-right 1px solid #f3f6f8
                text-align center
                color $colorPrice
                span{
                    fs($font12)
                }
                b{
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
                padding 0.28rem 0.24rem 0 0.24rem
                .msg{
                    .title{
                        line-height 0.52rem
                        fs($font13)
                        color $color333
                    }
                    .time{
                        line-height 0.48rem
                        fs($font12)
                        color $color999
                    }
                }
                .icon{
                    margin-top 0.16rem
                    width 30px
                    height 30px
                    bg("../../assets/weixuanzhong34x34")
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
                z-index 1
                width 0.8rem
                height 0.8rem
                top 0
                right 0
                bg('../../assets/yishiyong')
            }
        }
        .special{
            color $color999
            .pirce{
                color $color999
            }
            .desc{
                .msg{
                    .title{
                        color $color999
                    }
                }
                .icon{
                    // bg('../assets/weixuanzhong34x34')
                }
            }
        }
    }
    .noTicketTip{
        position absolute
        left 50%
        top 50%
        transform:translate(-50%,-70%)
        text-align center
        .pic{
            width 2.2rem
            height 2.2rem
            bg('../../assets/pic_kong_03')

        }
        p{
            margin 0.28rem 0 0.2rem 0
            line-height 0.28rem
            fs($font14)
            color #c6ccd7
            // font-weight 600
        }
        .btn{
            // margin-top 0.8rem
            // padding 0 0.2rem
            // height 0.5rem
            // line-height 0.5rem
            // width 1.83rem
            border 1px solid $colorGreen
            // border-radius 0.4rem
            // text-align center
            fs($font12)
            color $colorGreen
            display inline-block
            width 1.84rem
            line-height 0.46rem
            border-radius 0.3rem
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


