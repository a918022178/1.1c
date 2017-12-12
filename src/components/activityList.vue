<template>
  <div class="contentBox activeList">
      <router-link v-for="(item,index) in activeList " :key="index" :to="'/activityDetail?goods_id='+item.goods_id" class="list" >
      <!-- <router-link v-for="(item,index) in activeList " :key="index" to="/activityDetail" class="list" > -->
        <div class="bg">
          <img :src=item.photo alt="">
          <p class="txt-overflow">{{item.title}}</p>
        </div>
        <div class="price">
          <i>￥{{item.price}}</i>
          <div><s></s><span>{{item.start_date}} 至 {{item.end_date}}</span></div>
        </div>
      </router-link>
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  destroy
} from "../common/js/common";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      activeList: [],
      user_id: ""
    };
  },
  methods: {
    getActivityList() {
      Indicator.open("加载中...");
      var params = {
          token: 123
        },
        url = apiUrl + "/peony/activity/getActivityList";

      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          this.activeList = res.body.data.list;
          Indicator.close();
        } else if (res.body.code == -1) {
          Indicator.close();
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
  created() {
    document.title = "活动列表";
    // this.user_id=GetRequest().user_id
    this.getActivityList();
    analyze();

    console.log(wx);
  },
  mounted() {
    this.user_id = getCookie("src_user_id");
  },
  activated() {
    // analyze();
  },
  deactivated() {
    // destroy();
  },
  destroyed(){
    destroy();
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/variable.styl';

.activeList {
  padding: 0.2rem;

  .list {
    display: block;
    border-radius: 0.1rem;
    overflow: hidden;
    margin-bottom: 0.2rem;

    .bg {
      height: 2.8rem;
      position: relative;

      img {
        width: 100%;
        height: 2.8rem;
      }

      p {
        position: absolute;
        width: 100%;
        fs($font13);
        bottom: 0;
        color: white;
        left: 0;
        line-height: 0.7rem;
        padding-left: 0.2rem;
        background: rgba(0, 0, 0, 0.4);
      }
    }

    .price {
      height: 0.7rem;
      background: white;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      display: flex;
      justify-content: space-between;

      i {
        fs($font16);
        color: $colorPrice;
        font-weight: 600;
        line-height: 0.7rem;
      }

      div {
        fs($font12);
        height: 0.7rem;
        line-height: 0.7rem;

        s {
          display: inline-block;
          width: 0.26rem;
          height: 0.26rem;
          bg('../assets/icon_time26x26');
          vertical-align: middle;
          margin-right: 0.1rem;
        }

        span {
          vertical-align: middle;
          line-height: 0;
          color: $color999;
        }
      }
    }
  }
}
</style>
<style lang="stylus">
@import '../common/stylus/variable.styl';

.activeList {
  padding: 0.2rem;

  .list {
    display: block;
    border-radius: 0.1rem;
    overflow: hidden;
    margin-bottom: 0.2rem;

    .bg {
      height: 2.8rem;
      position: relative;

      img {
        width: 100%;
        height: 2.8rem;
      }

      p {
        position: absolute;
        width: 100%;
        fs($font13);
        bottom: 0;
        color: white;
        left: 0;
        line-height: 0.7rem;
        padding-left: 0.2rem;
        background: rgba(0, 0, 0, 0.4);
      }
    }

    .price {
      height: 0.7rem;
      background: white;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      display: flex;
      justify-content: space-between;

      i {
        fs($font16);
        color: $colorPrice;
        font-weight: 600;
        line-height: 0.7rem;
      }

      div {
        fs($font12);
        height: 0.7rem;
        line-height: 0.7rem;

        s {
          display: inline-block;
          width: 0.26rem;
          height: 0.26rem;
          bg('../assets/icon_time26x26');
          vertical-align: middle;
          margin-right: 0.1rem;
        }

        span {
          vertical-align: middle;
          line-height: 0;
          color: $color999;
        }
      }
    }
  }
}
</style>

