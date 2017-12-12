<template>
    <div class="classActivity">
        <div class="headBox">
            <img class="pic" :src="res.user_face" alt="">
            <!-- <div></div> -->
            <div class="msg">
                <div class="name">{{res.nick_name}}</div>
                <div class="school">{{res.school_name}}</div>
                <div class="class">{{res.class_name}}</div>
            </div>
        </div>
        <div class="listBox">
            <div class="detailBox" v-for="(v,i) in list" :key="i" @click.stop.prevent="toDetail(v.goods_id)">
                <img class="pic" :src="v.photo" alt="">
                <!-- <div></div> -->
                <div class="text">
                    <div class="title">{{v.title}}</div>
                    <div class="num">
                        <div  @click.stop.prevent="toSignup(i,v.goods_id)" class="number fl">已报名{{v.num}}/{{v.max_num}}<i class="iconfont icon-set_more"></i></div>
                        <div @click.stop.prevent="toShare(v.goods_id)" class="share fr">
                            <i class="iconfont icon-class_share fl"></i><span class="fl font">分享活动</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noActivityTip" v-show="showTag">
            <div class="pic"></div>
            <p>还没有开放活动哦~</p>
            <p>敬请期待</p>
        </div>
        <a href="tel:4000-399-118" class="contact" v-show="false">
            客服及商务合作联系电话 4000-399-118
        </a>
    </div>
</template>

<script>
import {
  apiUrl,
  GetRequest,
  linkUrl,
  getCookie,
  analyze,
  destroy,
  setCookie
} from "../../common/js/common.js";
import { Indicator,Toast } from 'mint-ui';
export default {
    data(){
        return{
            res:'',
            list:'',
            showTag:0
        }
    },
    created(){
        document.title="班级活动";
        this.init()
        setCookie('shareTag1',1)
    },
    mounted () {
        analyze()
    },
    destroyed(){
        destroy()
    },
    methods:{
        init(){
          Indicator.open('加载中...')
          var that = this
          var params={
            token:123,
            user_id:getCookie('src_user_id')
          },
          url=apiUrl+"/peony/activity/getClassinfo";
          this.$http.post(url,params,{emulateJSON:true})
          .then(function(res){
              if(res.body.code==0){
                  that.res=res.body.data.result
                  that.list=res.body.data.result.goods_info_list
                  console.log(that.res)
                  Indicator.close();
                  if(that.list.length==0){
                      that.showTag=1
                  }
                }else if(res.body.code==-1){
                  Indicator.close();
                  Toast(res.body.msg)
                }
            })
      },
      toDetail(id){
          this.$router.push('activityDetail?goods_id='+id)
      },
      toSignup(index,id){
          console.log(this.list[index].max_num)
          console.log(this.list[index].num)
          this.$router.push('/classSignup?goods_id='+id)
          setCookie('signUp_max_num',this.list[index].max_num)
          setCookie('signUp_num',this.list[index].num)
      },
      toShare(id){
          this.$router.push('/share')
          setCookie('share_goods_id',id)
      }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
.classActivity{
    .headBox{
        position relative
        width 100%
        height 2rem
        bg('../../assets/class_bgpic')
        .pic{
            position absolute
            left 0.2rem
            top 50%
            margin-top -0.46rem
            width 0.92rem
            height 0.92rem
            border-radius 50%
        }
        .msg{
            position absolute
            top 50%
            left 1.3rem
            margin-top -0.52rem
            fs(12)
            color $colorfff
            .name{
                fs(15)
                font-weight 600
                margin-bottom 0.1rem
            }
        }
    }
    .listBox{
        padding 0.2rem 0.2rem 0 0.2rem
        background-color #f3f6f8
        .detailBox{
            display flex
            padding 0.3rem 0.2rem 0 0.2rem
            margin-bottom 0.1rem
            width 100%
            height 2.08rem
            background-color $colorfff
            border-radius 0.2rem
            .pic{
                flex 0 0 1.9rem
                margin-right 0.2rem
                width 1.9rem
                height 1.47rem
                background-color red
            }
            .text{
                flex 1
                position relative
                .title{
                    position relative
                    top -0.08rem
                    overflow hidden
                    text-overflow: ellipsis;
                    display: box;
                    display: -webkit-box;
                    line-clamp: 2;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical; 
                    fs(13)
                    color $color333
                }
                .num{
                    position absolute
                    left 0
                    bottom 0.3rem
                    line-height 0.36rem
                    .number{
                        margin-right 0.2rem
                        display inline-block
                        width 1.9rem
                        text-align center
                        fs(12)
                        color $colorfff
                        background-color #d1d7e4
                        border-radius 0.2rem
                        .icon-set_more{
                            display inline-block
                            vertical-align top
                            transform scale(0.6)
                        }
                    }
                    .share{
                        float right 
                        fs(12)
                        color $color333
                        .font{
                        }
                        .icon-class_share{
                            margin-top 0.02rem
                            display inline-block
                            transform scale(1)
                            vertical-align middle
                            margin-right 0.1rem
                            color $colorGreen    
                        }
                    }
                }
            }
        }
    }
    .noActivityTip{
        position fixed
        left 50%
        top 50%
        transform:translate(-50%,-70%)
        text-align center
        .pic{
            margin-bottom 0.28rem
            // width 2.2rem
            height 2.2rem
            bg('../../assets/pic_kong_04')
        }
        p{
            fs(14)
            color #c6ccd7
        }
    }
    .contact{
        position fixed
        display block
        width 100%
        left 0
        bottom 0.5rem
        fs(12)
        color #c6ccd7
        text-align center

    }
}

</style>

