<template>
  <div class="activityList">
      <searchBar></searchBar>
     <!-- <div class="conditionBox clearfix"> -->
         <ul class="condition">
          <li @click="show(0)"><span>{{typeArr[0]}}</span><i class=""></i></li>
          <li class="second" @click="show(1)"><span>{{typeArr[1]}}</span><i class="arrow"></i></li>
          <li @click="show(2)"><span>{{typeArr[2]}}</span><i class=""></i></li>
          <!-- <li @click="show(3)" class="sp"><span>{{typeArr[3]}}</span><i class="last"></i></li> -->
        </ul>
     <!-- </div> -->
      <ul class="type common" @touchmove="scrollPrevent">
          <li class="selectTypeActive" data-id=''><span class="fl">全部</span><i class="fr iconfont icon-list_selected"></i></li>
          <li :data-id='item.type_id' v-for="(item,index) in conditionList.type" :key="index"><span class="fl">{{item.type_name}}</span><i class="fr iconfont icon-list_selected"></i></li>
          <!-- <li data-id='3'><span class="fl">社会服务</span><i class="fr iconfont icon-list_selected"></i></li>
          <li data-id='4'><span class="fl">设计制作</span><i class="fr iconfont icon-list_selected"></i></li>
          <li data-id='5'><span class="fl">职业体验</span><i class="fr iconfont icon-list_selected"></i></li> -->
      </ul>
      <!-- <ul class="pirce common" @touchmove="scrollPrevent">
          <li :data-id='item.price_id' v-for="(item,index) in conditionList.price" :key="index"><span class="fl">{{item.price_name}}</span><i class="fr iconfont icon-list_selected"></i></li>
      </ul> -->
      <ul class="school common" @touchmove="scrollPrevent">
          <li data-id=''><span class="fl">全部</span><i class="fr iconfont icon-list_selected"></i></li>
          <li :data-id='item.edu_id' v-for="(item,index) in conditionList.edu" :key="index"><span class="fl" >{{item.edu_name}}</span><i class="fr iconfont icon-list_selected"></i></li>
          <!-- <li data-id='2'><span class="fl">初中</span><i class="fr iconfont icon-list_selected"></i></li>
          <li data-id='3'><span class="fl">高中</span><i class="fr iconfont icon-list_selected"></i></li> -->
      </ul>
      <ul class="distance common" @touchmove="scrollPrevent">
          <li :data-id='item.flag_id' v-for="(item,index) in conditionList.flag" :key="index" v-if="!(!latitude&&item.flag_id==1)"><span class="fl">{{item.flag_name}}</span><i class="fr iconfont icon-list_selected"></i></li>
          <!-- <li data-id='2'><span class="fl">最新发布</span><i class="fr iconfont icon-list_selected"></i></li> -->
      </ul>
      <div class="mask" @touchmove="scrollPrevent" @click="hide"></div>
      <div class="listBox" v-show="totalList.length>0">
            <router-link :to="'/activityDetail?goods_id='+item.goods_id" class="detailBox" v-for="(item,index) in totalList" :key="index">
                <img :src="item.photo" alt="" class="pic">
                <div class="textBox">
                    <div class="title">{{item.title}}</div>
                    <div class="middle">
                        <i class="iconfont icon-index_popularity"></i><span>人气 {{item.views}}</span>
                        <i class="iconfont icon-index_coordinate"></i><span><{{(item.juli/1000)>1?parseInt(item.juli/1000)+'km':item.juli+'m'}}</span>
                    </div>
                    <div class="price">
                        <span class="nowPrice"><b>￥</b>{{item.price}}.00</span>
                        <span class="oldPrice">￥{{item.mall_price}}.00</span>
                    </div>
                </div>
            </router-link>
      </div>
      <div class="noActivityTip" v-show="showTag">
            <div class="pic"></div>
            <p>没有相关活动~</p>
      </div>
      <foot :activeIndex="2"></foot>
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
import searchBar from '../common/searchBar/searchBar'
import foot from '../common/foot/foot'
export default {
    data(){
        return{
            conditionFlag:1,
            tag:-1,
            type:'',
            edu:'',
            flag:'',
            price:'',
            totalList:1,
            conditionList:'',
            latitude:getCookie('latitude'),
            showTag:0,
            typeArr:['活动类型','学段','智能排序']
        }
    },
    components:{
        foot,
        searchBar
    },
    created(){
        document.title = "活动列表";
        this.getIndexSearch()
        this.getComdata()
        analyze()
    },
    mounted () {
        var that=this;
        // this.exclusive('type',1)
        // this.exclusive('school',2)
        var time=setInterval(function(){
            if($('.common li')[2]){
                     console.log($('.common li')[2])
                    that.exclusive('type',1)
                    // that.exclusive('pirce',2)
                    that.exclusive('school',2)
                    that.exclusive('distance',3)
                    if(that.$route.query.type){
                        $('.type li')[that.$route.query.type-3].onclick()
                        that.$set(that.typeArr,0,$('.type li')[that.$route.query.type-3].innerText)
                    }
                    clearInterval(time)
            }
            
        },10)
        // setTimeout(function(){
        //     that.exclusive('type',1)
        //     that.exclusive('pirce',2)
        //     that.exclusive('school',3)
        //     that.exclusive('distance',4)
        //     if(that.$route.query.type){
        //         $('.type li')[that.$route.query.type-3].onclick()
        //         that.$set(that.typeArr,0,$('.type li')[that.$route.query.type-3].innerText)
        //     }
        // },10)
        // this.exclusive('distance',3)
        // this.exclusive('pirce',4)
        this.conditionExclusive('condition')
    },
    methods: {
        show(i){
            $('.common').removeClass('down')
            
            if(this.tag==-1){
                $('.mask').fadeIn()
                $($('.common')[i]).addClass('down')
                this.tag=i
            }else if(this.tag==i){
                $('.mask').fadeOut()
                $($('.common')[i]).removeClass('down')
                this.tag=-1
            }else{
                this.tag=i
                $($('.common')[i]).addClass('down')
            }
        },
        hide(){
            $('.common').removeClass('down')
            $('.mask').fadeOut()
            this.tag=-1
            $('.condition>li').removeClass('typeTipActive')
        },
        selectType(e){

        },
        scrollPrevent(e) {
            e.preventDefault();
        },
        exclusive(tag,index){
            console.log(index)
            var that = this;
            var listItem=$('.'+tag+'>li');
            // console.log(listItem)
            for(let i=0;i<listItem.length;i++){
                listItem[i].onclick=function(){
                    that.$set(that.typeArr,index-1,this.innerText)
                    if(index==1){
                        that.type=$(this).attr('data-id')
                    }
                    if(index==2){
                        that.edu=$(this).attr('data-id')
                    }
                    if(index==3){
                        that.flag=$(this).attr('data-id')
                    }
                    // if(index==4){
                    // }
                    console.log($(this).attr('data-id'))
                    that.hide()
                    Indicator.open("加载中...");
                    var params = {
                            token: 123,
                            datum:2,
                            city_id:getCookie('city_id')||8,
                            // keyword:searchValue,             
                            type:that.type,
                            edu:that.edu,
                            flag:that.flag,
                            // price:that.price,
                            latitude:getCookie('latitude')||'',
                            longitude:getCookie('longitude')||''
                        },
                        url = apiUrl + "/peony/activity/getIndexSearch";
                    that.$http.post(url, params, { emulateJSON: true }).then(function(res) {
                            if (res.body.code == 0) {
                                Indicator.close();
                                this.showTag=0
                                this.totalList = res.body.data.result;
                                if(this.totalList.length==0){
                                    this.showTag=1
                                }
                            } else if (res.body.code == -1) {
                                Indicator.close();
                                Toast(res.body.msg);
                            }
                        });
                    for(var i=0;i<listItem.length;i++){
                        listItem[i].className=""
                    }
                    this.className="selectTypeActive"
                }
            }
        },
        conditionExclusive(tag){
            var that = this;
            var listItem=$('.'+tag+'>li');
            for(var j=0;j<listItem.length;j++){
                listItem[j].onclick=function(){
                    for(var j=0;j<listItem.length;j++){
                        listItem[j].className=""
                    }
                    this.className="typeTipActive"
                }
            }
        },
        getComdata(){
            var params = {
                // token: 123,
                // datum:2,
                // city_id:getCookie('city_id')||8,
                // // keyword:searchValue,             
                // type:GetRequest().type||'',
                // edu:'',
                // flag:'',
                // price:'',
                // latitude:'',
                // longitude:''
              },
              url = apiUrl + "/peony/activity/getComdata";
          this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
                if (res.body.code == 0) {
                    // Indicator.close();
                    this.conditionList = res.body.data.result;
                    console.log(this.conditionList.flag)
                } else if (res.body.code == -1) {
                    // Indicator.close();
                    Toast(res.body.msg);
                }
            });
        },
        getIndexSearch(){
          Indicator.open("加载中...");
          var params = {
                token: 123,
                datum:2,
                city_id:getCookie('city_id')||8,
                // keyword:searchValue,             
                type:GetRequest().type||'',
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
                    this.totalList = res.body.data.result;
                } else if (res.body.code == -1) {
                    Indicator.close();
                    Toast(res.body.msg);
                }
            });
        }
    },
    destroyed(){
        destroy()
    }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
    .activityList{
        // .conditionBox{
        //     position fixed
        //     z-index 4
        //     left 0
        //     top 0.8rem
        //     background-color #fff
        //     width 100%
        //     height  0.8rem 
        //     margin-bottom 1px;
            .condition{
                // margin 0 auto
                position fixed
                display flex
                // left 50%
                // margin-left -2.9rem
                top 0.8rem
                z-index 4
                border-bottom 1px solid #f3f6f8;
                height  0.8rem 
                width 100%
                line-height 0.8rem
                text-align center
                background-color #fff
                fs(13)
                color $color999
                li{
                    flex 1
                    float left
                    height 0.8rem 
                    line-height 0.8rem
                    text-align center
                    // margin-right 0.44rem
                    div{
                        width 120%
                     }
                    span{
                        display inline-block
                        margin-right  0.06rem
                    }
                    i{
                        display inline-block
                        width 0.14rem
                        height 0.14rem
                        bg('../../assets/list_arrow_down')
                        // margin-right 0.56rem
                    }
                    .last{
                        // margin-right 0
                    }        
            }
            .sp{
                //   float right
                margin-right 0
            }
            .typeTipActive{
                color $colorGreen
                i{
                    display inline-block
                    width 0.14rem
                    height 0.14rem
                    bg('../../assets/list_arrow_up')
                }
            }
            }
        // }
       .listBox{
        background-color #fff
        margin-top 1.62rem;
        margin-bottom 0.98rem
        .detailBox{
            display block
            display flex
            padding 0.3rem 0.2rem
            border-bottom 1px solid #f3f6f8
            height 2.08rem
            .pic{
                flex 0 0 1.9rem
                height 1.47rem
                width 1.9rem
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
                        margin-right 0.1rem
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
      .type,.common{
          position fixed
          left 0
          top 1.6rem
          z-index 2
          transition all 0.5s
          width 100%
          background-color #fff
        //   border-top 1px soild #f3f6f8
          transform translateY(-300px)
          li{
              padding 0 0.2rem 0 0.4rem
              width 100%
              height 0.8rem
              line-height 0.79rem
              border-bottom 1px solid #f3f6f8
              span{
                  fs(14)
                  color $color333
              }
              i{
                  font-size 17px
                  color transparent
              }
          }
          .selectTypeActive{
              span{
                 color $colorGreen
              }
              i{
                  color $colorGreen
              }
     }

    }
    .down{
          z-index 2
          transform translateY(0px)
    }
    // .schoolDown{
    //       z-index 2
    //       transform translateY(0px)
    // } 
    // .distanceDown{
    //       z-index 2
    //       transform translateY(0px)
    // } 
    // .pirceDown{
    //       z-index 2
    //       transform translateY(0px)
    // } 
    .mask{
        position fixed
        display none
        z-index 1
        width 100%
        height 100%
        left 0
        right 0
        background-color rgba(0,0,0,.5)
    }
    .noActivityTip{
            position fixed
            left 50%
            top 50%
            transform:translate(-50%,-70%)
            text-align center
            .pic{
                margin-bottom 0.28rem
                width 2.2rem
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

