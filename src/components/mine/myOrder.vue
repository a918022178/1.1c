<template>
    <div class="contentBox myOrder">
       <div class="tab clearfix">
           <div :class="{'active':index==1}" @click="check(1)">全部<i></i></div>
           <div :class="{'active':index==2}" @click="check(2)">待使用<i></i></div>
           <div :class="{'active':index==3}" @click="check(3)">已使用<i></i></div>
           <div :class="{'active':index==4}" @click="check(4)">退款/售后<i></i></div>
       </div>
       <div class="main clearfix">
           <div class="all">
               <router-link tag="div" :to="'/mine/orderDetail?order_id='+v.order_id" class="list" v-for="(v,i) in result" :key="i" v-if="index==1||index==v.status||(index==4&&v.status>=10)">
                   <div class="time clearfix">
                        <div class="fl">下单时间：{{v.created_time}}</div>
                        <span class="fr status1" :class="v.status<=2?'status1':((v.status==15||v.status==3)?'status3':'status2')">{{status[v.status]}}</span>
                    </div>
                    <div class="content">
                        <img :src="v.goods_photo" alt="">
                        <div class="msg">
                            <h3>{{v.goods_name}}</h3>
                            <div>￥{{v.goods_price}}.00</div>
                        </div>
                    </div>
               </router-link>
               <section class="blank">
                   <section>
                       <span></span>
                        <p>千里之行始于足下</p>
                        <router-link tag="div" to="/">
                            立即起程
                        </router-link>
                   </section>
                    
                </section>
               <!-- <router-link to="/" class="list">
                   <div class="time clearfix">
                        <div class="fl">下单时间：2017-11-21 09:29</div>
                        <span class="fr status1">待使用</span>
                    </div>
                    <div class="content">
                        <img src="../../assets/qq96x96.png" alt="">
                        <div class="msg">
                            <h3>贝拉小镇贝拉小镇贝拉小镇贝拉小镇贝拉小镇</h3>
                            <div>￥1899.00</div>
                        </div>
                    </div>
               </router-link> -->
           </div>
           
       </div>
    </div>
</template>
<script>
import wx from "weixin-js-sdk";
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  setItem,
  getItem,
  destroy
} from "../../common/js/common";
import { Toast, Indicator, Actionsheet, Picker } from "mint-ui";
export default {
  data() {
    return {
      index: getItem("orderTag")||1,
      result: "",
      status: ["未付款", "已付款待出票", "待使用", "已使用"],
      tag: ""
    };
  },
  created() {
    document.title = "我的订单";
    analyze();
    this.status[10] = "申请退款中";
    this.status[15] = "退款完成";
  },
  mounted() {
    this.init();
    
  },
  methods: {
    check(i) {
      this.index = i;
      setItem("orderTag", i);
      if(i==1){
        //   console.log(this.result)
          if(!this.result.length){
              $('.blank').css({'display':'block'})
          }else{
              $('.blank').css({'display':'none'})
          }
      }
      if(i==2){
          if(this.foreach(this.result,2)){
              $('.blank').css({'display':'none'})
          }else{
              $('.blank').css({'display':'block'})
          }
      }
      if(i==3){
          if(this.foreach(this.result,3)){
              $('.blank').css({'display':'none'})
          }else{
              $('.blank').css({'display':'block'})
          }
      }
      if(i==4){
          if(this.foreach(this.result,10)||this.foreach(this.result,15)){
              $('.blank').css({'display':'none'})
          }else{
              $('.blank').css({'display':'block'})
          }
      }
    },
    init() {
      Indicator.open("加载中...");
      var that = this;
      var params = {
          token: 123,
          user_id: getCookie("src_user_id")
        //   user_id: 11375
        },
        url = apiUrl + "/peony/activity/myActivity";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          that.result = res.body.data.list;
          //   that.list = res.body.data.result.growth_track_list;
          //   console.log(that.result);
          this.check(this.index)
          Indicator.close();
        } else if (res.body.code == -1) {
          Indicator.close();
          Toast(res.body.msg);
        }
      },this);
    },
    foreach(arr,status){
        var have = 0;
        arr.forEach((v,i)=>{
            if(v.status==status){
            console.log(v.status)
                have = 1
                return
            }
        })
        console.log(have)
        return have
    }
  },
  filters: {
    formateTime(str, symbol2) {
      return str.replace(/-/g, symbol2);
    }
  },
  destroyed() {
    destroy();
    setItem("orderTag", 1);
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.myOrder {
    fs($font13);

    .tab {
        position: fixed;
        background-color: white;
        z-index: 4;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.8rem;
        background: white;
        margin-bottom: 0.02rem;

        div {
            line-height: 0.8rem;
            width: 25%;
            text-align: center;
            float: left;
            fs($font13);
            position: relative;

            i {
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 100%;
                height: 0.04rem;
            }
        }

        .active {
            color: #00bc71;

            i {
                background-color: #00bc71;
            }
        }
    }

    .main {
        padding-top: 0.82rem;

        .all {
            .list {
                margin-bottom: 0.1rem;

                .time {
                    line-height: 0.8rem;
                    background-color: white;
                    margin-bottom: 0.02rem;
                    padding: 0 0.2rem;

                    div {
                        color: #999;
                    }

                    .status1 {
                        // color: #ff9c00;
                        color: #00bc71;
                    }

                    .status2 {
                        color: #e62b2b;
                    }

                    // .status3 {
                    // color: #999;
                    // }
                    .status3 {
                        color: #999;
                    }
                }

                .content {
                    background-color: white;
                    height: 1.5rem;
                    padding: 0.25rem 0.3rem 0.28rem 0.2rem;

                    img {
                        float: left;
                        width: 1.2rem;
                        height: 0.9rem;
                        overflow: hidden;
                    }

                    .msg {
                        padding-left: 0.2rem;
                        overflow: hidden;
                        position: relative;
                        height: 100%;

                        h3 {
                            color: #333;
                            line-height: 0.34rem;
                            fs($font13);
                        }

                        div {
                            fs($font14);
                            color: #ff9c00;
                            font-weight: 600;
                            position: absolute;
                            left: 0.2rem;
                            bottom: 0;
                        }
                    }
                }
            }

            .blank {
                background-color: white;
                text-align: center;
                display none
                position fixed
                top 0.8rem
                left 0
                width 100%
                height calc(100% - 0.8rem)
                fs($font12);
                color: #cfd5e0;
                section{
                    margin-top 2rem
                 }
                span {
                    display: inline-block;
                    width: 2.2rem;
                    height: 2.2rem;
                    bg('../../assets/pic_kong_02');
                }

                p {
                    margin: 0.1rem;
                }

                div {
                    border: 1px solid #cfd5e0;
                    display: inline-block;
                    width: 1.8rem;
                    line-height: 0.46rem;
                    border-radius: 0.3rem;
                    margin-top 0.16rem
                }
            }
        }
    }
}
</style>

