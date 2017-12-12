<template>
  <div class="searchBar">
      <router-link to="/location" class="city fl">
          {{city}}
          <i class="iconfont icon-order_arrow_down"></i>
      </router-link>
      <!-- <div class="searchBox fl">
          <i class="iconfont icon-index_search" ref="icon1"></i>
          <input type="text" placeholder="搜索" class="text" v-model="value" @focus="focus" @blur="blur">
          <i class="iconfont icon-search_closed" v-if="value.length" @click="clear"></i>
      </div> -->
      <router-link to="/searchPage" class="searchBox1 fl">
          <i class="iconfont icon-index_search" ref="icon1"></i><span>搜索</span>
          <!-- <input type="text" placeholder="搜索" class="text" v-model="value" @focus="focus" @blur="blur">
          <i class="iconfont icon-search_closed" v-if="value.length" @click="clear"></i> -->
      </router-link>
      <!-- <button class="cancel">取消</button>
      <button class="cancel">确定</button> -->
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
} from "../../../common/js/common.js";
import { Indicator } from "mint-ui";
export default {
    data(){
        return{
            city:getCookie('city')||'长沙'
        }
    },
    // props:{
    //     ab:{
    //         type:String
    //     }
    // },
    methods: {

    }
}
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/variable.styl'
    .searchBar{
        position fixed
        display flex
        left 0
        top 0
        width 100%
        height 0.8rem
        line-height 0.8rem
        padding 0 0.2rem
        z-index 4
        background: #f3f6f8;
        .city{
            flex 0 0 1rem
            margin-right 0.02rem
            height 0.8rem
            line-height 0.8rem
            fs(13)
            color $color333
            i{  
                position relative
                left -5px
                margin-left 0.11rem
                font-size 0.24rem
                color $color999
            }    
        }
        .searchBox1{
            flex 1
            margin-top 0.13rem
            height 0.54rem
            line-height 0.52rem
            width 80%
            text-align center
            border-radius 0.4rem
            border 1px solid #ebedf0
            background-color #fff
            .icon-index_search{
                display inline-block
                vertical-align middle
                font-size 0.3rem;
                color #d3d3d3
                margin-right 0.1rem
            }
            span{
                display inline-block
                fs(13)
                line-height 26px
                color #d3d3d3
            }
        }
        button{
            display none
            margin-left 0.1rem
            height 0.8rem
            line-height 0.8rem
            background-color:transparent
            fs(14)
            color $color333
        }
    }
</style>

