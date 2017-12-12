<template>
  <div class="contentBox refund submit">
       <div class="remind">
            <div class="pic"></div>
            <div class="txt">退款申请提交成功</div>
            <div class="time">预计 7 个工作日内到帐</div>
        </div>
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
  destroy
} from "../../common/js/common.js";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    document.title = "提交成功";
    analyze();
  },
  mounted() {
      var that = this
      setTimeout(() => {
          that.$router.push('/mine/refundDetail?order_id='+that.$route.query.order_id)
      }, 1000);
  },
  // activated() {
  //   analyze();
  // },
  // deactivated() {
  //   destroy();
  // }
  destroyed () {
    destroy();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.submit {
    position: absolute;
    top: 0px;
    left: 0;
    height: 100%;
    width: 100%;
    background: white;
}

.remind {
    position: absolute;
    top: 27%;
    width: 100%;
    left: 0;
    text-align: center;
}

.time {
    fs($font12);
    color: #999;
}

.remind {
    overflow: hidden;
    width: 100%;
    height: 3.26rem;
    background-color: #fff;
}

.remind .pic {
    margin: 0 auto;
    margin-top: 0.44rem;
    bg('../../assets/icon_success70x70');
    width: 1.4rem;
    height: 1.4rem;
}

.remind .txt {
    margin-top: 0.34rem;
    margin-bottom: 0.18rem;
    line-height: 0.28rem;
    text-align: center;
    fs($font14);
    font-weight: 600;
    color: #333;
}
</style>
