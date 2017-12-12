<template>
  <div class="searchPage">
    <div class="searchBox">
      <div class="inputWrapper">
        <div class="inputBOX">
          <i class="iconfont icon-index_search"></i>
          <input type="text" placeholder="搜索" @focus="focus" @keyup="blur" v-model.trim="value">
          <i class="iconfont icon-search_closed" @click="clear"></i>
        </div>
        <button class="btn" @click="search" v-if="value">搜索</button>
        <button class="btn" v-else @click="cancel">取消</button>
      </div>
    </div>
    <div class="searchResult" v-if="list.length>0">
      <router-link :to="'/activityDetail?goods_id='+item.goods_id" class="detailBox" v-for="(item,index) in list" :key="index">
                <img class="pic" :src="item.photo">
                <div class="textBox">
                    <div class="title">{{item.title}}</div>
                    <div class="middle">
                        <i class="iconfont icon-index_popularity"></i><span>人气 {{item.views}}</span>
                        <i class="iconfont icon-index_coordinate" v-show="item.juli"></i><span v-show="item.juli"><{{(item.juli/1000)>1?parseInt(item.juli/1000)+'km':item.juli+'m'}} </span>
                    </div>
                    <div class="price">
                        <span class="nowPrice"><b>￥</b>{{item.price}}</span>
                        <span class="oldPrice">￥{{item.mall_price}}</span>
                    </div>
                </div>
      </router-link>
    </div>
    <div class="noActivityTip" v-show="showTag">
        <div class="pic"></div>
        <p>没有相关活动~</p>
     </div>
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
    return{
      value:'',
      list:'',
      showTag:0
    }
  },
  created(){
    document.title = "搜索";
    analyze()
  },
  mounted () {
    // console.log(this.value.length)
  },
  methods:{
    focus(){
        // $('.inputBOX').animate({width:'87%'})
    },
    blur(){
      // console.log(111)
      // if(!this.value.length){
      //   $('.inputBOX').animate({width:'100%'})
      //   // $('.btn').hide(200)
      // }
    },
    clear(){
      this.value=''
      // $('.inputBOX').animate({width:'100%'})
    },
    search(){
      this.showTag=0
      var searchValue =this.value.trim()
      if(searchValue.length>0){
          Indicator.open("加载中...");
          var params = {
              token: 123,
              datum:1,
              city_id:getCookie('city_id')||8,
              keyword:searchValue,             
              type:'',
              edu:'',
              flag:'',
              price:'',
              latitude:getCookie('latitude'),
              longitude:getCookie('longitude')
              },
              url = apiUrl + "/peony/activity/getIndexSearch";
          this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
                if (res.body.code == 0) {
                    Indicator.close();
                    this.list = res.body.data.result;
                    if(this.list.length==0){
                      this.showTag=1
                    }
                    // console.log(res.body.data.result)
                } else if (res.body.code == -1) {
                    Indicator.close();
                    Toast(res.body.msg);
                }
            });
      }
    },
    cancel(){
      // this.$router.push('/activityList')
      this.$router.back(-1)
    }

  },
  destroyed(){
    destroy()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
.searchPage{
  .searchBox{
    // position fixed
    padding 0 0.2rem
    // left 0
    // top 0
    width 100%
    height 0.8rem
    // line-height 0.8rem
    overflow hidden
    .inputWrapper{
      // position relative
      height 0.8rem
      line-height 0.76rem
      .inputBOX{
        position relative
        z-index 1
        margin-right 0.22rem
        display inline-block
        width 87%
        height 0.8rem     
        line-height 0.76rem
        .icon-index_search{
          position absolute
          z-index 3
          top 50%
          left 0.25rem
          margin-top -0.13rem
          font-size 0.3rem
          line-height 0.3rem
          color #d3d3d3
        }
        input{
          position relative
          z-index 2
          width 100%
          padding-left 0.6rem
          margin-top -0.13rem
          height 0.54rem
          line-height 0.54rem
          border-radius 0.4rem
          fs(13)
          color #333
        }
        input::-webkit-input-placeholder{
          fs(13)
          color #d3d3d3
          line-height 0.54rem
        }
        .icon-search_closed{
          position absolute
          z-index 2
          top 50%
          margin-top -0.14rem
          right 0.14rem
          font-size 0.28rem
          line-height 0.28rem
          color #d3d3d3
        } 
      }
      .btn{
        position absolute
        top 0
        right -6px
        width 20%
        // height 0.8rem
        line-height 0.8rem
        fs(14)
        color #333
        background-color transparent
      }
    }
    
  }
  .searchResult{
    // margin-top 0.8rem
    background-color #fff
    .detailBox{
            display block
            display flex
            padding 0.3rem 0.2rem
            border-bottom 1px solid #f3f6f8
            height 2.08rem
            .pic{
                flex 0 0 1.9rem
                width 1.9rem
                height 1.47rem
                margin-right 0.2rem    
            }
            .textBox{
                flex 1
                position relative
                .title{
                    position relative
                    top -0.04rem
                    margin-bottom 0.06rem
                    overflow hidden
                    fs(13)
                    color #333
                    text-overflow: ellipsis;
                    display: box;
                    display: -webkit-box;
                    line-clamp: 2;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;                   
                }
                .middle{
                    margin-bottom 0.2rem
                    lh(12)
                    i{
                        font-size 12px                       
                        margin-right 0.06rem
                    }
                    span{
                        fs(12)
                        color $color999
                    }
                    .icon-index_popularity{
                        color:#ff4fa2
                    }
                    .icon-index_coordinate{
                        margin-left 0.4rem
                        color $colorGreen
                    }
                }
                .price{
                    position absolute
                    left 0
                    bottom -0.02rem
                    lh(16)
                    he(16)
                    .nowPrice{
                        fs(16)
                        color #f58d12
                        margin-right 0.2rem
                        font-weight 600
                        b{
                            fs(12)
                            font-weight normal
                        }
                    }
                    .oldPrice{
                        fs(12)
                        color $color999
                        opacity:0.5;
                        text-decoration:line-through
                    }
                }
            }
        }
  }
  .noActivityTip{
      // position fixed
      margin 0 auto
      margin-top 40%
      // left 50%
      // top 50%
      // transform:translate(-50%,-70%)
      text-align center
      .pic{
        margin-bottom 0.28rem
        // width 2.2rem
        height 2.2rem
        bg('../../assets/pic_kong_01')
       }
      p{
        fs(14)
        color #c6ccd7
      }
  }
}
</style>

