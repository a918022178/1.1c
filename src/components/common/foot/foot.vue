<template>
  <div class="foot">
      <router-link to="/home" class="homePage common" :class="{active1:activeIndex==1}">
          <!-- <p class="iconfont icon-tab_index pic1"></p> -->
          <p class="pic1"></p>
          <p class="text">首页</p>
      </router-link>
      <router-link to="/activityList" class="activity common" :class="{active2:activeIndex==2}">
          <!-- <p class="iconfont icon-tab_active pic2"></p> -->
          <p class="pic2"></p>
          <p class="text">活动</p>
      </router-link>
      <router-link to="/mine/myCenter" class="mine common" :class="{active3:activeIndex==3}">
          <!-- <p class="iconfont icon-tab_mine pic3"></p> -->
          <p class="pic3"></p>
          <p class="text">我的</p>
      </router-link>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        activeIndex:{
            type:Number
        }
    },
    methods:{

    },
    mounted () {

    }
    
}
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/variable.styl'
    .foot{
        // line-height 0
        // display flex
        position fixed
        padding 0 0.85rem
        padding-top 5px
        left 0
        bottom 0
        width 100%
        height 0.88rem
        background-color #fff
        text-align center
        z-index 10
        border 1px solid #f4f5f9
        .common{
            // flex 1
            float left
            width 33%
            color $color999
            text-align center
            line-height 0
            p{
                // line-height 0
                margin-bottom 0.05rem
            }
            .text{
                fs(12)
                line-height 12px
            }
        }
        .homePage{
            text-align left
            .pic1{
                display inline-block
                width 0.44rem
                height 0.44rem
                bg('../../../assets/tab_index')
            }
        } 
        .activity{
            .pic2{
                display inline-block
                width 0.44rem
                height 0.44rem
                bg('../../../assets/tab_active')
            }
        }
        .mine{
            text-align right
            // color:$colorGreen;
            .pic3{
                display inline-block
                width 0.44rem
                height 0.44rem
                bg('../../../assets/tab_mine')
            }
        }
        .active1{
            color:$colorGreen;
            .pic1{
                bg('../../../assets/tab_index_sel')
                }
            }
        .active2{
            color:$colorGreen;
            .pic2{
                bg('../../../assets/tab_active_sel')
                }
            }
         .active3{
            color:$colorGreen;
            .pic3{
                bg('../../../assets/tab_mine_sel')
                }
            }
            
    }
</style>
