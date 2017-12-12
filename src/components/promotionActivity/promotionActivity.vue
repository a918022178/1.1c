<template>
    <div class="promotionActivity">

        <img :src="data.share_qrcode_img" alt="">

    </div>
</template>

<script>
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  destroy,
  setCookie
} from "../../common/js/common.js";
import { Indicator } from "mint-ui";
export default {
    data(){
        return {
            data:''
        }
    },
    created () {
        document.title = "活动优惠券";
        this.initData()
        analyze()
    },
    methods: {
      initData(){
          Indicator.open("加载中...");
          var params = {
              token: 123,
              user_id:getCookie('src_user_id')
            //   user_id:11439
              },
              url = apiUrl + "/peony/activity/initData";
          this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
                if (res.body.code == 0) {
                    Indicator.close();
                    this.data = res.body.data.result;
                    console.log(this.data)
                } else{
                    Indicator.close();
                    Toast(res.body.msg);
                }
            });
      },
    //   showShareMask(){
    //       $('.shareActivityMask').fadeIn(200)
    //   },
    //   closeShareMask(){
    //       $('.shareActivityMask').fadeOut(200)
    //   },
    //   scrollPrevent(e){
    //       e.preventDefault();
    //   }
    },
    mounted () {
        
    },
    destroyed () {
        destroy()
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
.promotionActivity{
    position fixed
    width 100%
    height 100%
    background-color #9604D3
    img{
        width 100%
    }
}
</style>

