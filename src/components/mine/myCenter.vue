<template>
    <div class="contentBox myCenter">
        <div class="top">
            <section>
                <img :src="result.user_face" alt="">
                <h3>{{result.nickname}}</h3>
                <router-link v-if="result.notused_coupon_total" to="/mineTicket" tag="div"><span>{{result.notused_coupon_total}} 张优惠券</span><i class="iconfont icon-set_more"></i></router-link>
                <div v-else><span>暂无优惠券</span></div>
                <b class="iconfont icon-personal_center_set" @click="toSetting"></b>
            </section>
        </div>
        <div class="activity classAct" v-if="result.is_teacher" >
             <!-- -->
            <div>
                <span>我的班级活动</span>
                <router-link to="/classActivity" tag="div" class="fr allActivity"><i class="fl"></i><b class="iconfont icon-set_more"></b></router-link>
            </div>
            <section></section>
        </div>
        <div class="activity">
            <div>
                <span>孩子的活动</span>
                <div class="fr allActivity" @click="toOrder(1)"><i>查看全部活动</i><b class="iconfont icon-set_more"></b></div>
            </div>
            <section></section>
        </div>
        <div class="icon">
            <div @click="toOrder(2)">
                <span class="iconfont icon-personal_center_icon1"><i v-if="result.notused_order_total">{{result.notused_order_total}}</i></span>
                <p>待使用</p>
            </div>
            <div @click="toOrder(3)">
                <span class="iconfont icon-personal_center_icon2"></span>
                <p>已使用</p>
            </div>
            <div @click="toOrder(4)">
                <span class="iconfont icon-personal_center_icon"></span>
                <p>退款/售后</p>
            </div>
        </div>
        <div class="track">
            <h3>孩子的成长轨迹</h3>
            <section class="blank" v-if="blank">
                <span></span>
                <p>千里之行始于足下</p>
                <router-link tag="div" to="/">
                    立即起程
                </router-link>
            </section>
            <router-link tag="div" :to="'/mine/orderDetail?order_id='+v.order_id" class="list" v-for="(v,i) in list" :key="i">
                <s :class="{'hide':i>=list.length-1}"></s>
                <!-- <i></i> -->
                <img :src="imgArr[i]" alt="">
                <div>
                    <h4>{{v.activity_date}}</h4>
                    <p>{{v.activity_name}}</p>
                    <b class="iconfont icon-personal_center_done" v-if="v.activity_status==3"></b>
                </div>
            </router-link>
        </div>
        <foot :activeIndex="3"></foot>
    </div>
</template>
<script>
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  getItem,
  setItem,
  destroy
} from "../../common/js/common";
import { Toast, Indicator, Actionsheet } from "mint-ui";
import foot from '../common/foot/foot'
export default {
  data() {
    return {
        result:'',
        list:'',
        blank:0,
        imgArr:[require('../../assets/flower0@3x.png'),require('../../assets/flower1@3x.png'),require('../../assets/flower2@3x.png')],
        avaSrc:require('../../assets/default_avatar@3x.png')
    };
  },
  components:{
        foot,
    },
  created() {
    document.title = "个人中心";
    analyze();
  },
  mounted() {
   this.init()
  },
  methods: {
      init(){
          Indicator.open('加载中...')
          var that = this
          var params={
            token:123,
            user_id:getCookie('src_user_id'),
            // user_id:11375
          },
          url=apiUrl+"/peony/activity/myBasicData";
          this.$http.post(url,params,{emulateJSON:true})
          .then(function(res){
              if(res.body.code==0){
                  that.result=res.body.data.result
                  that.list=res.body.data.result.growth_track_list
                  if(!that.result.user_face){
                      that.result.user_face=that.avaSrc;
                  }
                  if(that.list.length){
                      that.blank = 0
                  }else{
                      that.blank = 1
                  }
                //   console.log(this.result)
                  Indicator.close();
                }else{
                  Indicator.close();
                  Toast(res.body.msg)
                }
            })
      },
      toOrder(i){
          setItem('orderTag',i)
          this.$router.push('/mine/myOrder')
      },
      toSetting(){
          setItem('avatar',this.result.user_face)
          setItem('nickName',this.result.nickname)
          setItem('childSex',this.result.child_sex)
          setItem('childName',this.result.child_name)
          setItem('mobile',this.result.mobile)
          this.$router.push('/mine/setting')
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
.myCenter{
    fs($font12)
    .top{
        height 3rem
        background #00bc71
        text-align center
        position relative
        section{
            height 100%
            bg('../../assets/personal_center_bg')
         }
        img{
            width 1.22rem
            height 1.22rem
            border-radius 50%
            margin-top 0.24rem
            border 0.05rem solid  white
         }
         h3{
             color white
             fs($font16)
             font-weight 600
             margin-top 0.01rem
          }
          div{
              display inline-block
              background-color #f4c902
            //   padding 0.02rem 0.3rem 0.07rem
              padding 0 0.3rem 
              line-height 0.4rem
            //   height 0.4rem
              color white
              border-radius 0.26rem
              margin-top 0.22rem
              i{
                  fs($font12)
                  margin-left 0.1rem
               }
               span{
                    
                }
           }
           b{
               position absolute
               top 0.3rem
               right 0.3rem
               width 0.4rem
               height 0.4rem
               text-decoration none
               fs($font20)
               color white
            }
     }
     .activity{
         >div{
             padding 0.28rem 0.2rem 0.44rem
             background-color white
             span{
                 fs($font14)
              }
              .allActivity{
                  fs($font12)
                  color #999
                  padding-top 0.04rem
                  b{
                      fs($font12)
                      margin-left 0.08rem
                   }
               }
          }
    }
    .classAct{
        // position relative
        >div{
            padding 0.2rem 0.2rem 0.2rem
            i{
                display inline-block
                width 0.98rem
                height 0.3rem
                margin-top 0.02rem
                bg('../../assets/pic_tuantirukou')
                vertical-align top
             }
             b{
                 vertical-align top
              }
         }
         margin-bottom 0.02rem
    }
    .icon{
        display flex
        justify-content space-around
        background-color white
        padding-bottom 0.38rem
        margin-bottom 0.1rem
        width 100%
        div{
            text-align center
            flex 1
            color #999
            span{
                position relative
                fs($font36)
                color #87919c
                i{
                    position absolute
                    top 0px
                    right 0
                    width 0.3rem
                    height 0.3rem
                    background-color #ff4f4f
                    border-radius 50%
                    border 0.02rem solid #e41616
                    fs($font12)
                    color white
                    line-height 0.28rem
                    text-align center
                    // font-family: 'PT Sans Caption';
                 }
             }
             p{
              }
         }
    }
    .track{
        background-color white
        padding-top 0.28rem
        padding-bottom 0.34rem
        >div:nth-of-type(1){
            margin-top 0.56rem
        }
        >div:nth-of-type(2){
            i{
                // bg('../../assets/flower2')
             }
        }
        >div:nth-of-type(3){
            i{
                // bg('../../assets/flower3')
             }
             s{
                //  display none
              }
        }
        .hide{
            display none
        }
        h3{
            padding-left 0.2rem
            fs($font14)
            margin-bottom 0.1rem
         }
         >div{
             height 2.2rem
             position relative
            s{
                position absolute
                z-index 1
                top 0.4rem
                width 0.02rem
                height 1.8rem
                left 0.51rem
                //  transform translate(-50%)
                background-color #eee
            }
             img{
                 float left
                 width 0.5rem
                 height 0.5rem
                 margin 0 0.7rem 0 0.26rem
                //  bg('../../assets/flower')
                 position relative
                 z-index 1
              }
              div{
                  padding 0.1rem 0.6rem 0.63rem 0
                  overflow hidden
                  border-bottom 0.02rem solid #f3f6f8
                  position relative
                  h4{
                      background-color #d1d8e2
                      display inline-block
                      color white
                      fs($font13)
                      padding 0 0.1rem
                      border-radius 0.06rem
                   }
                   p{
                        fs($font13)
                        color #333
                        line-height 0.36rem
                        margin-top 0.16rem
                        position relative
                        z-index 5
                    }
                    b{
                        position absolute
                        right 0.3rem
                        bottom 0.4rem
                        font-size 50px
                        color $colorGreen
                        opacity .3
                     }
               }
          }
        .blank{
            background-color white
            text-align center
            fs($font12)
            color #cfd5e0
            padding-bottom 0.98rem
            span{
                display inline-block
                width 2.2rem
                height 2.2rem
                bg('../../assets/pic_kong_02')
             }
             p{
                margin  0.16rem 0
              }
              div{
                  border 1px solid #cfd5e0
                  display inline-block
                  width 1.8rem
                  line-height 0.46rem
                  border-radius 0.3rem
               }
        }
    }
}

</style>

