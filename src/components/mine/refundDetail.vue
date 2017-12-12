<template>
    <div class="contentBox refundDetail">
        <div class="top">
            <h3>退款金额</h3>
            <h2>-{{res.refund_amount}}.00</h2>
            <p>{{status[res.refund_status]}}</p>
        </div>
        <div class="clearfix list">
            <div class="fl">退款帐户</div>
            <span class="fr">{{res.refund_account}}</span>
        </div>
        <div class="clearfix list">
            <div class="fl">退款状态</div>
            <span class="fr">{{status[res.refund_status]}}</span>
        </div>
        <div class="schedule">
            <div class="fl dispose">处理进度</div>
            <div class="right">
                <div class="apply" v-for="(v,i) in list" :key="i" :class="{'overCol':v.refund_time}">
                    <div><i><b></b></i><span >{{v.status_name}}</span></div>
                    <div class="fr">{{v.refund_time}}</div>
                </div> 
                <!-- <div class="ing"></div>
                    <div class="apply"><i><b></b></i><span>申请退款</span></div>
                    <div class="fr">2017-11-22 20:10</div>
                </div>
                <div class="done">
                    <div class="fl apply"><i></i><span>已退款</span></div>
                </div>  -->
            </div>
        </div>
        <div class="phone">
            <p>客服电话 4000-399-118</p>
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
      res: "",
      list:'',
      status:[]
    };
  },
  created() {
    document.title = "退款详情";
    this.status[10]='提交申请中'
    this.status[12]='退款中'
    this.status[15]='退款完成'
    analyze();
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
          order_id: this.$route.query.order_id
        //   order_id: 2083952135
        },
        url = apiUrl + "/peony/activity/getRefundDetails";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          that.res = res.body.data.result;
          that.list = res.body.data.result.refund_progress_list;
        } else if (res.body.code == -1) {
          Toast(res.body.msg);
        }
      });
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

.refundDetail {
    .top {
        background-color: white;
        text-align: center;
        padding: 0.34rem 0 0.38rem 0;

        h3 {
            fs($font13);
            color: #333;
        }

        h2 {
            fs($font21);
            color: #333;
            line-height: 0.3rem;
            margin: 0.3rem 0;
            font-weight: 600;
        }

        p {
            fs($font12);
            color: #999;
        }
    }

    .list {
        line-height: 0.8rem;
        margin-top: 0.02rem;
        background-color: white;
        fs($font13);
        padding: 0 0.2rem;

        div {
            color: #999;
        }

        span {
            color: #333;
        }
    }

    .schedule {
        margin-top: 0.02rem;
        background-color: white;
        padding: 0.35rem 0.2rem 0.8rem;

        .dispose {
            overflow: hidden;
            fs($font13);
            color: #999;
            margin-right: 1rem;
            line-height 0.36rem
        }

        .right {
            padding-top: 0.03rem;
            overflow: hidden;
            fs($font12);
            color: #999;

            >div {
                margin-bottom: 0.4rem;

                div {
                    display: inline-block;
                    position: relative;
                    padding-left: 0.26rem;
                    line-height 0.36rem
                    span{
                        color #333
                     }
                }
            }
            .overCol {
                i,b{
                    background-color: #0797f7;
                 }
                 span{
                    color: #0797f7;
                  }
            }
            .apply{
                div:first-child{
                    // line-height 0.36rem
                }    
            }
            .apply:first-child{
                b{
                    display none
                    // background-color: #999;
                 }
            }
            .overBg {
                background-color: #0797f7;
            }

            i {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 0.16rem;
                height: 0.16rem;
                border-radius: 50%;
                background-color: #dbdbdb;

                b {
                    position: absolute;
                    width: 0.04rem;
                    top: -0.6rem;
                    left: 50%;
                    transform translate(-50%)
                    height: 0.6rem;
                    background-color: #dbdbdb;
                }
            }

            span {
            }
        }
    }

    .phone {
        position: fixed;
        bottom: 0.58rem;
        left: 0;
        width: 100%;
        text-align: center;
        fs($font12);
        color: #999;
    }
}
</style>

