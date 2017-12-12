<template>
    <div>

    </div>
</template>
<script>
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  setItem,
  getItem,
  destroy
} from "../../common/js/common";
export default {
  data() {
    return {

    };
  },
  created(){
      setCookie('coupon_price',0)
      setCookie('coupon_id',0)
      setCookie('couponTag',0)
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
                  var mobile=res.body.data.result.mobile
                  if(mobile){
                        this.$router.push('/submitOrder')
                    }else{
                        this.$router.push('/bindMobile')
                    }
                }else{
                  Indicator.close();
                  Toast(res.body.msg)
                }
            })
    //   if(getItem('is_bind_mobile')||getItem('mobile')){
    //       this.$router.push('/submitOrder')
    //   }else{
    //       this.$router.push('/bindMobile')
    //   }
  }
};
</script>