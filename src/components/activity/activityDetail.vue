<template>
  <div class="contentBox activeDetail">
      <img class="bpic" ref="bpic" :src='msg.photo'  />
      <div class="titleBox" ref="titleBox">
        <div class="text fl">{{msg.title}}</div>
        <div class="answer fr">
          <em></em>
          <div class="phone" @click="showMask">
            <i class="icon"></i>
            <p>咨询</p>
          </div>
        </div>
      </div>
      <div class="line1"></div>
      <ul class="tab" ref="tab">
        <li @click="scroll1"><span :class="{'active':isactive==0}">价格说明</span></li>
        <li @click="scroll2"><span :class="{'active':isactive==1}">详情介绍</span></li>
        <li @click="scroll3"><span :class="{'active':isactive==2}">报名须知</span></li>
      </ul>
      <div class="line2"></div>
      <div class="explainBox" ref="explainBox">
          <div class="priceExplain" ref='title1'>
            <div class="title"></div>
            <div class="child clearfix" v-for="(priceItem,index) in msg.price_explanation" :key="index">
              <b class="fl">{{priceItem.name}}</b><span class="fr">￥{{priceItem.price}}.00</span>
            </div>
            <!-- <div class="man clearfix">
              <b class="fl">贝拉小镇成人票</b><span class="fr">￥89.00</span>
            </div> -->
          </div>
          <div class="details" ref='title2'>
            <div class="title"></div>
            <div class="detailsPic" v-html="msg.detailed_introduction"></div>  
          </div>
          <div class="note" ref='title3'>
             <div class="title"></div>
            <!-- <div class="time">
              <b>活动时间：</b><span>2017-05-20至2017-05-20</span>
            </div>
            <div class="age">
              <b>适学阶段：</b><span>3-15岁</span>
            </div>
            <div class="buyNote">
              <b>购买须知：</b><span>需提前一天购买</span>
            </div>
            <div class="explain clearfix">
              <b class="fl">使用说明：</b>
              <span class="fl">
                <p>1.写什么写什么</p>
                <p>1.写什么写什么</p>
                <p>1.写什么写什么</p>
                <p>1.写什么写什么</p>
                <p>1.写什么写什么</p>
                </span>
            </div>
            <div class="use">
              <b>使用方式：</b><span>请凭二维码或兑换码，至售票中心进行兑换</span>
            </div> -->
            <div v-html="msg.registration_instructions" class="activityDetailSpecial"></div>
            <div class="local">
              <div class="text">
                <b>活动地址：</b><span>{{msg.address_name}}</span>
              </div>
              <em class="fr"></em>
              <div class="iconBox fr" @click="showMap">
                <i></i>
              </div>             
            </div>
            <!-- <div class="wrokTime">
              <b>营业时间：</b><span>9：30-18：00</span>
            </div> -->
          </div>
          <div class="refund">
            <div class="title"></div>
            <p>{{msg.explanation_withdrawal}}</p>
          </div>
          <div class="reminder">
            <div class="title"></div>
            <p>{{msg.reminder}}</p>
            <!-- <p>2.不包含商店、餐厅和其他自费项目；不再与其他优惠同享。</p> -->
          </div>
      </div>
      <a href="javascript:;" @click="signUp" class="signUp" v-if="msg.is_subscribe==1">立即报名</a>
      <!-- <a class="signUp" :href="linkUrl+'/h5/index/addActive/shop_id/'+msg.shop_id+'/goods_id/'+msg.goods_id+'/coupon_id/-1'" v-if="msg.is_subscribe==1">立即报名</a> -->
      <div class="focus" @click="showFocus" v-if="msg.is_subscribe==0">关注微信公众号进行报名</div>
      <div class="phoneMask" ref="phoneMask" @touchmove="scrollPrevent" @click="hideMask">
      </div>
      <div class="phoneBox" ref="phoneBox"> 
          <a :href="'tel:'+item.phone" v-for="(item,index) in msg.contact_numbers" :key="index">{{item.phone}}</a>
          <button class="cance" @click="hideMask">取消</button>
      </div>
      <div class="mapSelect" ref='mapSelect'>
        <a :href="'http://m.amap.com/navigation/index/daddr='+msg.longitude+'%2C'+msg.latitude+'%2C'+msg.address_name+'&saddr_poiid=B02DB0UFF0&saddr_typecode=060101&daddr_lonlat='+msg.longitude+'%2C'+msg.latitude+'%2C贝拉小镇'" class="gaode">高德地图</a>
        <a :href="'https://map.baidu.com/mobile/webapp/place/linesearch/foo=bar/end=word%3D'+msg.address_name+'&tab=line&routeType=1'" class="baidu">百度地图</a>
        <a :href="'http://map.qq.com/m/index/nav/type=bus&cond=3&eword='+msg.address_name+'&epointx='+msg.longitude+'&epointy='+msg.latitude+'&startId=&destId=6527512162143693059'" class="tengxun">腾讯地图</a>
        <button class="cance" @click="hideMask">取消</button>
      </div>
      <div class="pop" ref="pop">
            <div class="mask">
                <div class="share">
                    <h3>关注微信公众号进行报名</h3>
                    <!-- 生产二维码 -->
                    <!-- <img id="erwei" src="../../assets/qrcode110x110.png" alt=""> -->
                    <!-- 测试二维码 -->
                    <!-- <img id="erwei" src="../../assets/q-code.png" alt=""> -->
                    <!-- 开发二维码 -->
                    <img id="erwei" :src="msg.activity_qrcode" alt="">
                </div>
                <div class="cancel"@click="hideMask">取消</div>
            </div>
      </div>
      <div id="allmap"></div>
  </div>
</template>
<script>
import {
  pscroll,
  apiUrl,
  GetRequest,
  linkUrl,
  getCookie,
  analyze,
  destroy,
  setCookie,
  setItem
} from "../../common/js/common.js";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      isactive: 0,
      msg: {},
      flag: 1,
      linkUrl: linkUrl
      // user_id:''
    };
  },
  created() {
    document.title = "活动详情";
    window.scrollTo(0,0)
    // this.user_id=getCookie('src_user_id')
  },
  activated() {

  },
  mounted() {
    // window.scrollTo(0,0)
    setCookie('coupon_price',0)
    setCookie('coupon_id',0)
    setCookie('couponTag',0)
    this.isactive = 0;
    analyze();
    this.getActivityDetails();
    // setCookie("tag", 1);
    // alert(111)
    var that = this;
    window.onscroll = function() {
      var heightY =
        that.$refs.bpic.offsetHeight + that.$refs.titleBox.offsetHeight;
      if (that.flag) {
        if (
          document.body.scrollTop <
          that.$refs.title2.offsetTop - that.$refs.tab.offsetHeight - 20
        ) {
          that.isactive = 0;
        } else if (
          document.body.scrollTop >=
            that.$refs.title2.offsetTop - that.$refs.tab.offsetHeight - 20 &&
          document.body.scrollTop < that.$refs.title3.offsetTop - 60
        ) {
          that.isactive = 1;
        } else {
          that.isactive = 2;
        }
      }
      if (document.body.scrollTop > heightY) {
        that.$refs.tab.classList.add("scrollActive");
        that.$refs.explainBox.style.paddingTop =
          that.$refs.tab.offsetHeight + "px";
      } else {
        that.$refs.tab.classList.remove("scrollActive");
        that.$refs.explainBox.style.paddingTop = 0;
      }
    };
  },
  deactivated() {
    // destroy();
    
  },
  destroyed(){
    destroy();
  },
  methods: {
    getActivityDetails() {
      var params = {
          token: 123,
          goods_id: GetRequest().goods_id,
          user_id: getCookie("src_user_id")
          // user_id: 11267
        },
        url = apiUrl + "/peony/activity/getActivityDetails";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          this.msg = res.body.data.result;
          setItem('is_bind_mobile',res.body.data.result.is_bind_mobile)
        } else if (res.body.code == -1) {
          Toast(res.body.msg);
        }
      });
    },
    scroll1() {
      var end = 0,
        start = 0,
        that = this;
      that.flag = 0;
      that.isactive = 0;
      if (document.body.scrollTop > 20) {
        start = document.body.scrollTop;
        end = this.$refs.title1.offsetTop - 40;
      } else {
        end = this.$refs.title1.offsetTop - this.$refs.tab.offsetHeight;
      }
      pscroll(start, end, that);
    },
    scroll2() {
      var end = 0,
        start = 0,
        that = this;
      that.flag = 0;
      that.isactive = 1;
      if (document.body.scrollTop > 20) {
        start = document.body.scrollTop;
        end = this.$refs.title2.offsetTop - 40;
      } else {
        end = this.$refs.title2.offsetTop - this.$refs.tab.offsetHeight;
      }
      pscroll(start, end, that);
    },
    scroll3() {
      var end = 0,
        start = 0,
        that = this;
      that.flag = 0;
      that.isactive = 2;
      if (document.body.scrollTop > 20) {
        start = document.body.scrollTop;
        end = this.$refs.title3.offsetTop - 40;
      } else {
        end = this.$refs.title3.offsetTop - this.$refs.tab.offsetHeight;
      }
      pscroll(start, end, that);
    },
    scrollPrevent(e) {
      e.preventDefault();
    },
    showMask() {
      this.$refs.phoneMask.classList.add("opacityIn");
      this.$refs.phoneBox.style.transform = `translateY(0)`;
      this.$refs.phoneBox.style.transition = "all 0.4s ease";
    },
    hideMask() {
      this.$refs.phoneMask.classList.remove("opacityIn");
      this.$refs.phoneMask.classList.add("opacityOut");
      this.$refs.phoneBox.style.transform = `translateY(1000px)`;
      this.$refs.mapSelect.style.transform = `translateY(1000px)`;
      this.$refs.pop.style.transform = `translateY(1000px)`;
    },
    showMap() {
      this.$refs.phoneMask.classList.add("opacityIn");
      this.$refs.mapSelect.style.transform = `translateY(0)`;
    },
    showFocus() {
      this.$refs.phoneMask.classList.add("opacityIn");
      this.$refs.pop.style.transform = `translateY(0)`;
      this.$refs.pop.style.transition = "all 0.4s ease";
    },
    signUp() {
      setCookie("c_shop_id", this.msg.shop_id);
      setCookie("c_goods_id", this.msg.goods_id);
      console.log(this.msg.is_bind_mobile);
      setItem('is_bind_mobile',this.msg.is_bind_mobile)
      if (this.msg.is_bind_mobile == 1) {
        this.$router.push("/submitOrder");
      } else {
        setCookie('bindMobile_ord',1)
        this.$router.push("/bindMobile");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'
    .activeDetail{
    //   line-height: 0;
      .bpic{
          display block
          width 100%;
          height 2.98rem;
      }
      .titleBox{
        //   line-height: 0;
          position: relative
          // top -1px
          // margin-bottom 0.1rem
          padding: 0 0.2rem;
          width: 100%;
          height 1.2rem;
        //   line-height 1.2rem;
          background-color: #fff;
          overflow: hidden;
          .text{
              position: absolute
              top 50%
              transform: translateY(-50%)
              display inline-block
              width 5.12rem
              line-height: 0.4rem;
              vertical-align: middle;
              fs: ($font14);
              color: $color333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: box;
              display: -webkit-box;
              line-clamp: 2;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
          }
          .answer{
              
            em{
                position relative
                top 0.1rem
                display: inline-block
                vertical-align: middle
                margin-top: -0.2rem;
                width: 1px;
                height 0.34rem;
                background-color: $color999;
            }
            .phone{
                // position absolute
                position relative
                display: inline-block
                top 0.24rem
                .icon{
                    display: block
                    width 0.52rem
                    height 0.52rem
                    bg("../../assets/icon_dianhua@52x52")
                }
                p{
                    text-align center
                    line-height 0.24rem;
                    fs: (12);
                    color: $color999;
                }
            }        
        }
      }
      .line1{
          width 100%
          height 0.1rem
          background-color: #f3f6f8
      }
      .tab{
          padding: 0 0.34rem;
          display: flex;
          width 100%;
          height 0.8rem;
          line-height 0.8rem;
          background-color: #fff;
          transition all 0.4s ease
          li{
              flex:1;
              fs($font13);
              color: $color999;
              text-align: center;
              span{
                  display: inline-block
                  width 1.5rem
                  // height 0.42rem
                  line-height: 0.42rem
                  border-radius: 0.2rem;
              }
              .active,.active1{           
                  background-color: $colorGreen;
                  color: #fff
              }
          }
      }
      .line2{
          width 100%
          height 0.01rem
          background-color: #f3f6f8
      }
      .scrollActive{
          position: fixed;
          left 0
          top 0
          transition all 0.4s ease
          background-color: #f3f4f9
      }
      .explainBox{
          background-color: #fff;
          padding: 0 0.32rem 2.16rem 0.32rem;
          text-align: center;  
          .priceExplain{           
              width 100%;          
              fs($font13);
              .title{
                  bg("../../assets/title_01")
              }
              .child{
                  margin-bottom: 0.2rem;
                  line-height: 0.26rem;
                  b{
                    display inline-block
                    text-align left
                    width 4.6rem
                  }
              }
              .man{
                  line-height: 0.26rem;
              }
              span{
                  font-weight 900
                  color: $colorPrice;
              }
          }
          .title{
              margin: 0.5rem 0;
              display: inline-block;
              width 1.6rem
              height 0.24rem
          }
          .details{
              .title{
                  bg("../../assets/title_02")
              }
              .detailsPic{
                  // line-height 0
                  width 100%
                  p{
                      width 100%
                      img{
                          width 100%
                      }
                  }
              }
          }
          .note{
              fs($font13)
              .title{
                  bg("../../assets/title_03")
              }
              span{
                  color: $color333;
              }
              .time,.age,.buyNote,.explain,.use,.local,.wrokTime{
                  text-align left;
                  line-height: 0.4rem;
                  margin-bottom: 0.2rem;
              }
              .explain,.use{
                  display: flex;
                  b{
                      flex: 0 0 1.3rem;
                  }
                  span{
                      flex: 1;
                  }
              }
              .local{
                  margin-top 0.2rem
                  position relative
                  .text{
                      display: flex;
                      b{
                          flex: 0 0 1.3rem;
                          font-weight 900
                          color:#E36C09
                      }
                      span{
                          display inline-block
                          width 3.6rem
                      }
                  }               
                  em{
                      position: absolute;
                      right 30px
                      top 0
                    //   margin-left: 0.2rem;
                      margin-right: 0.2rem;
                      width 0.02rem;
                      height 0.4rem;
                      background-color: $color999;
                  }
                  .iconBox{
                      position: absolute;
                      right 0
                      top -0.06rem
                      width 0.52rem
                      height 0.52rem
                      #navigation{
                          position: absolute;
                          width 0.52rem
                          height 0.52rem
                          opacity: 0
                      }
                      i{
                          position: absolute;
                          width 0.52rem
                          height 0.52rem
                          bg("../../assets/icon_dingwei@52x52");
                      }
                  }
              }
          }
          .refund{
              .title{
                margin-top:0.4rem;
                  bg("../../assets/title_04")
              }
              p{
                  text-align left;
                  fs($font13);
                  line-height: 20px;
                  color: $color333;
              }           
          }
          .reminder{
              .title{
                  bg("../../assets/title_05")
              }
              p{
                  text-align left;
                  fs($font13);
                  line-height: 20px;
                  color: $color333;
              }
          }
      }
      .signUp,.focus{
          position: fixed;
          left 0
          bottom 0
          display: block;
          width 100%;
          height 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          background-color: $colorGreen;
          color: #fff;
          fs(14);
      }
      .phoneMask{
          position: fixed;
          z-index: -1
          left 0
          top 0
          width: 100%
          height 100%
          background-color: rgb(0,0,0)
          opacity: 0
      }
      @keyframes opacityOut{
          0%{
              z-index: 0  
              opacity: 0.3
          }
          50%{
              z-index: 0  
              opacity: 0.1
          }
          90%{
              opacity: 0
              z-index: 0   
          }
          100%{
              opacity: 0
              z-index: -1    
          }
      }
      .opacityOut{
          animation: opacityOut .3s forwards;
      }
      @keyframes opacityIn{
          0%{
              z-index: -1  
              opacity: 0
          }
          50%{
              z-index: 0 
              opacity: 0.1
          }
          100%{
              opacity: 0.3
              z-index: 0    
          }
      }
      .opacityIn{
          animation: opacityIn .3s forwards;
      }
      .phoneBox{
          position: fixed;
          z-index: 1
          width 100%
          left 0
          bottom 0
          transform:translateY(1000px)
          a{
                  display block
                  width 100%
                  height 1.08rem
                  border-bottom: 1px solid #f4f5f9;
                  line-height: 1.08rem
                  background-color: #fff
                  text-align: center
                  color: $color333
                  fs($font16)
                  font-weight: 600
                  
              }
          .cance{
                  width 100%
                  height 0.98rem
                  line-height:0.98rem
                  background-color: #f4f5f9
                  text-align: center
                  color: $color333
                  fs($font14)
              }
      }
      .mapSelect{
          // display none
          position: fixed;
          z-index: 1
          transition:all 0.4s ease
          width 100%
          left 0
          bottom 0
          transform:translateY(1000px)
          a{
                  display block
                  width 100%
                  height 1.08rem
                  border-bottom: 1px solid #f4f5f9;
                  line-height: 1.08rem
                  background-color: #fff
                  text-align: center
                  color: $color333
                  fs($font16)
                  font-weight: 600
                  
              }
          .cance{
                  width 100%
                  height 0.98rem
                  line-height:0.98rem
                  background-color: #f4f5f9
                  text-align: center
                  color: $color333
                  fs($font14)
              }
      }
      .pop{
          position: fixed
          z-index: 1
          left 0
          bottom 0
          width 100%
          text-align: center
          background: white;
          padding-top: 0.48rem;
          transform:translateY(1000px)
          }

      .pop .share h3 {
          line-height: 16px;
          fs($font12)
          color: $color333;
      }

      .pop .share img {
          margin-top: 0.2rem;
          margin-bottom: 0.48rem;
          height: 2.2rem;
          width: 2.2rem;
      }

      .pop .cancel {
          background: #f5f5f5;
          height: 0.8rem;
          line-height: 0.8rem;
          fs($font14)
          color: $color333
      }
  }
</style>
<style lang="stylus">
  .activeDetail{
    .detailsPic{
        width 100%
        p{
          width 100%
          img{
            display block
            width 100%
          }
        }
    }
    .activityDetailSpecial{
        p{
            text-align left;
            fs($font13);
            line-height: 20px;
            color: #333 !important;
            // margin-bottom 0.2rem;
        }
    }
    strong{
              font-weight 900!important
              display inline-block
              margin 0.1rem 0;
    }
  }
</style>





