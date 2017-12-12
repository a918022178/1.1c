<template>
  <div class="contentBox payok">
    <div class="remind">
        <div class="pic"></div>
        <div class="txt">支付成功!</div>
            <a href="#">
                <div class="mineActive" @click="mineActive">查看我的活动</div>
            </a>
    </div>
  </div>
</template>

<script>
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,analyze,destroy,setItem} from '../../common/js/common.js'
export default {
    data(){
        return{

        }
    },
    created(){
      document.title="支付完成";
      analyze()
    },
    methods:{
        mineActive(){
            setItem('orderTag',1)
            this.$router.push('/mine/myOrder')
        }
    },
    mounted(){
        
    },
    //  activated(){
    //         analyze()
    //     },
    //     deactivated(){
    //         destroy()
    //     },
    destroyed(){
        destroy()
    }
}
</script>

<style lang="stylus" scoped>
 @import '../../common/stylus/variable.styl'
.payok{
    position fixed
    width 100%
    height 100%
    background-color: #fff
}
.remind {
    position: absolute;
    width: 100%;
    top: 25%;
    height: 2.56rem;
    height 100%
    // background-color: #fff;
}

.remind .pic {
    margin: 0 auto;
    margin-top:0.44rem;
    width: 1.4rem;
    height: 1.4rem;
    bg('../../assets/icon_success60x60');

}

.remind .txt {
    margin-top: 0.34rem;
    margin-bottom: 0.24rem;
    line-height: 0.28rem;
    text-align: center;
    fs($font14)
    font-weight: 600;
    color: #333;
}

.remind .mineActive {
    margin: 0 auto;
    width: 1.82rem;
    height: 0.54rem;
    line-height :0.52rem;
    text-align center;
    border: 0.02rem solid #00bc71;
    border-radius: 0.4rem;
    fs($font12)
    color: #00bc71;
}

// .common {
//     padding: 0 15px;
//     margin-bottom: 1px;
//     width: 100%;
//     height: 50px;
//     line-height: 50px;
//     background-color: #fafafc;
//     font-size: 13px;
// }

// .common span {
//     margin-right: 30px;
//     color: #999;
// }

// .common i {
//     color: 333;
// }

// .common .sp1 {
//     width: 208px;
// }

// .phone {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     line-height: 60px;
//     text-align: center;
//     color: #999;
//     font-size: 13px;
// }
</style>

