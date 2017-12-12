<template>
    <div class="home" v-show="showTag">
        <searchBar></searchBar>
        <div class="ad">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in totalData.ad" :key="index"><a :href="item.link_url"><img :src="item.photo" alt="" class="adPic"></a></mt-swipe-item>
                <!-- <mt-swipe-item>2</mt-swipe-item>
                <mt-swipe-item>3</mt-swipe-item> -->
            </mt-swipe>
        </div>
        <ul class="navigation clearfix">
            <li>
                <router-link :to="'/activityList?type='+activityTypeId[0]">
                    <p class="iconfont icon-index_icon_one"></p>
                    <p class="headline">{{activityTypeName[0]}}</p>
                </router-link>
            </li>
             <li>
                <router-link :to="'/activityList?type='+activityTypeId[1]">
                    <p class="iconfont icon-index_icon_two"></p>
                    <p class="headline">{{activityTypeName[1]}}</p>
                </router-link>
            </li>
            <li>
                <router-link :to="'/activityList?type='+activityTypeId[2]">
                    <p class="iconfont icon-index_icon_three"></p>
                    <p class="headline">{{activityTypeName[2]}}</p>
                </router-link>
            </li>
            <li class="sp">
                <router-link  :to="'/activityList?type='+activityTypeId[3]">
                    <p class="iconfont icon-index_icon_four"></p>
                    <p class="headline">{{activityTypeName[3]}}</p>
                </router-link>
            </li>
        </ul>
        <div class="recommend">
            <p class="reTitle">精选推荐</p>
            <router-link :to="'/activityDetail?goods_id='+item.goods_id" class="detailBox" v-for="(item,index) in totalData.info" :key="index">
                <img class="pic" :src="item.photo">
                <div class="textBox">
                    <div class="title">{{item.title}}</div>
                    <div class="middle">
                        <i class="iconfont icon-index_popularity"></i><span>人气 {{item.views}}</span>
                        <i class="iconfont icon-index_coordinate" v-show="item.juli"></i><span v-show="item.juli"> <{{(item.juli/1000)>1?parseInt(item.juli/1000)+'km':item.juli+'m'}}</span>
                    </div>
                    <div class="price">
                        <span class="nowPrice"><b>￥</b>{{item.price}}.00</span>
                        <span class="oldPrice">￥{{item.mall_price}}.00</span>
                    </div>
                </div>
            </router-link>
            <!-- <div class="detailBox">
                <div class="pic"></div>
                <div class="textBox">
                    <div class="title">教你的孩子如何辨别网络信息的真伪络信息的真伪络信息的真伪络信息的真伪的真伪络信息的真伪络信息的真伪</div>
                    <div class="middle">
                        <i class="iconfont icon-index_popularity"></i><span>人气 1208</span>
                        <i class="iconfont icon-index_coordinate"></i><span> <100m </span>
                    </div>
                    <div class="price">
                        <span class="nowPrice"><b>￥</b>158.00</span>
                        <span class="oldPrice">￥288.00</span>
                    </div>
                </div>
            </div> -->
        </div>
        <div id="allmap"></div>
        <foot :activeIndex="1"></foot>
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
  setCookie,
  setItem
} from "../../common/js/common.js";
import { Swipe,SwipeItem,Indicator  } from 'mint-ui';
import searchBar from '../common/searchBar/searchBar'
import foot from '../common/foot/foot'
export default {
    data(){
        return{
            totalData:'',
            city_id:GetRequest().city_id||8,
            activityType:'',
            activityTypeId:'',
            activityTypeName:'',
            // defaultCity:'',
            longitude:'',
            latitude:'',
            showTag:0,
            // aa:getCookie('city')||'长沙'
        }
    },
    components:{
        foot,
        searchBar
    },
    created () {
        document.title = "学生综合实践平台";
        analyze()
        
    },
    mounted () {
        var that=this;
        if(!getCookie('home_location_tag')){
            // alert(111)
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,12);

            function myFun(result){
                var cityName = result.name;
                map.setCenter(cityName);
                if(cityName.slice(0,2)=='全国'){
                    setCookie('city','长沙')
                }else{
                    setCookie('city',cityName.slice(0,2))
                }
                // that.defaultCity=cityName.slice(0,2);
                
                // alert("当前定位城市:"+cityName.slice(0,2));
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    // alert('您的位置：'+r.point.lng+','+r.point.lat);
                    that.longitude=r.point.lng;
                    that.latitude=r.point.lat;
                    setCookie('longitude',that.longitude)
                    setCookie('latitude',that.latitude)
                }
                else {
                    // alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
            setCookie('home_location_tag','1',0.5 * 24 * 60 * 60 * 1000)
        }
        setTimeout(function(){
            that.getIndexinfo()
        },1)
        setItem('mobile','')
    },
    methods:{
        getIndexinfo(){
           var params = {
                    token: 123,
                    // city_id:getCookie('city_id')||8,
                    city_id:8,
                    // city_name:getCookie('city')||'长沙',
                    city_name:'长沙',
                    latitude:getCookie('latitude'),
                    longitude:getCookie('longitude')
                },
               url = apiUrl + "/peony/activity/getIndexinfo";
            this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
                if (res.body.code == 0) {
                    this.totalData = res.body.data.result;
                    this.activityType = res.body.data.result.type
                    var arrId=[],arrName=[];
                    for(var i=0;i<this.activityType.length;i++){
                        arrId.push(this.activityType[i].type_id)
                        arrName.push(this.activityType[i].type_name)
                    }
                    this.activityTypeId=arrId
                    this.activityTypeName=arrName
                    this.showTag=1
                } else if (res.body.code == -1) {
                    Toast(res.body.msg);
                }
            });
        },
    },
    destroyed () {
        destroy()
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
.home{
    width 100%
    .ad{
        width 100%
        height 2.5rem
        margin-top 0.8rem
        .adPic{
            width 100%
            height 2.5rem    
        }
    }
    .navigation{
        // display flex
        padding 0.3rem 0.4rem 0.47rem 0.4rem;
        background-color #fff
        margin-bottom 0.1rem
        li{
            float left
            margin-right 0.58rem
            // flex 1
            height 1.2rem
            text-align center
            a{
                display inline-block
                text-align center
                .iconfont{
                    font-size 0.96rem
                    line-height 0.96rem
                    color $colorGreen
                }
                .headline{
                    fs(12)
                    line-height 12px;
                    color $color333
                }
            }
        }
        .sp{
            float right
            margin-right 0
        }
    }
    .recommend{
        padding-top 0.3rem
        margin-bottom 0.98rem
        background-color #fff
        .reTitle{
            margin-bottom 0.2rem
            padding 0 0.2rem
            fs(13)
            line-height 13px
            color #000
        }
        .detailBox{
            display block
            // display flex
            padding 0.3rem 0.2rem
            height 2.08rem
            border-bottom 1px solid #f3f6f8
            .pic{
                // flex 0 0 1.9rem
                float left
                height 1.47rem
                width 1.9rem
                margin-right 0.2rem    
            }
            .textBox{
                // flex 1
                float left
                position relative
                height 1.47rem
                .title{
                    overflow hidden
                    position relative
                    top -0.04rem
                    margin-bottom 0.06rem
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
                    he(12)
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
                        margin-right 0.12rem
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
}
</style>
<style lang="stylus">
@import '../../common/stylus/variable.styl'
    .mint-swipe-indicators{
        bottom 0.12rem
        .mint-swipe-indicator{
            // width 0.1rem
            // height 0.1rem
            margin 0 0.1rem
            background rgba(255,255,255,.3)
    //         border-radius 50%
    //         overflow hidden
        }
        .is-active{
            background-color #fff
            opacity 1
    //         border-radius 50%
    //         overflow hidden
        }
    }
</style>


