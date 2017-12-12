<template>
    <div id='location'>
        <mt-index-list>
            <div class="title">当前城市定位</div>
                <a class="cur">{{defaultCity}}市 <span @click="getloca"><i class="iconfont icon-search_location"></i>重新定位</span></a>
            <div class="title">目前仅开放以下城市</div>
            <ul class="offen">
                <li v-for="(item,index) in cityMsg" :key="index">
                    <router-link to="/home" @click.native="setCity(index)">{{item.name}}市</router-link>
                </li>
            </ul>
            <!-- <mt-index-section index="A">
                <router-link to="/home/鞍山市" data-id="210300">鞍山市</router-link>
                <router-link to="/home/安庆市" data-id="340800">安庆市</router-link>
                <router-link to="/home/安阳市" data-id="410500">安阳市</router-link>
            </mt-index-section>
            <mt-index-section index="B">
                <router-link to="/home/北京市" data-id="110100">北京市</router-link>
            </mt-index-section>
            <mt-index-section index="C">
                <router-link to="/home/长春市" data-id="220100">长春市</router-link>
                <router-link to="/home/郴州市" data-id="431000">郴州市</router-link>
                <router-link to="/home/长沙市" data-id="430100">长沙市</router-link>
                <router-link to="/home/常德市" data-id="430700">常德市</router-link>
                <router-link to="/home/重庆市" data-id="500100">重庆市</router-link>
                <router-link to="/home/成都市" data-id="510100">成都市</router-link>
                
            </mt-index-section>
            <mt-index-section index="D">

                <router-link to="/home" data-id="210200">大连市</router-link>
            </mt-index-section>
            <mt-index-section index="E">
                <router-link to="/home/鄂州市" data-id="420700">鄂州市</router-link>
            </mt-index-section>
            <mt-index-section index="F">
                <router-link to="/home/福州市" title="Zack">福州市</router-link>
                <router-link to="/home/佛山市" title="Zane">佛山市</router-link>
            </mt-index-section>
            <mt-index-section index="G">
                <router-link to="/home/广州市" title="Zack">广州市</router-link>
                <router-link to="/home/桂林市" title="Zane">桂林市</router-link>
                <router-link to="/home/贵阳市" title="Zane">贵阳市</router-link>
            </mt-index-section>
            <mt-index-section index="H">
                <router-link to="/home/海口市" title="Zack">海口市</router-link>
            </mt-index-section>
            <mt-index-section index="J">
                <router-link to="/home/嘉兴市" title="Zack">嘉兴市</router-link>
            </mt-index-section>
            <mt-index-section index="K">
                <router-link to="/home/昆明市" title="Zack">昆明市</router-link>
            </mt-index-section>
            <mt-index-section index="L">
                <router-link to="/home/娄底市" title="Zack">娄底市</router-link>
            </mt-index-section>
            <mt-index-section index="M">
                <router-link to="/home/绵阳市" title="Zack">绵阳市</router-link>
            </mt-index-section>
            <mt-index-section index="N">
                <router-link to="/home/南京市" title="Zack">南京市</router-link>
                <router-link to="/home/南昌市" title="Zane">南昌市</router-link>
            </mt-index-section>
            <mt-index-section index="Q">
                <router-link to="/home/青岛市" title="Zack">青岛市</router-link>
            </mt-index-section>
            <mt-index-section index="S">
                <router-link to="/home/三亚市" title="Zack">三亚市</router-link>
                <router-link to="/home/上海市" title="Zane">上海市</router-link>
                <router-link to="/home/深圳市" title="Zane">深圳市</router-link>
            </mt-index-section>
            <mt-index-section index="X">
                <router-link to="/home/湘潭市" title="Zack">湘潭市</router-link>
                <router-link to="/home/厦门市" title="Zane">厦门市</router-link>
            </mt-index-section>
            <mt-index-section index="Y">
                <router-link to="/home/岳阳市" title="Zack">岳阳市</router-link>
            </mt-index-section>
            <mt-index-section index="Z">
                <router-link to="/home/张家界市" title="Zack">张家界市</router-link>
                <router-link to="/home/株洲市" title="Zane">株洲市</router-link>
            <!-- </mt-index-section> -->
        </mt-index-list>
        <div id="container"></div>
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
import { Indicator } from "mint-ui";
export default {
    data(){
        return{
            defaultCity:getCookie('city')||'长沙',
            cityMsg:'',
            longitude:'',
            latitude:''

        }
    },
    created(){
        document.title = "定位";
        this.getComcity()
        analyze()
    },
    mounted () {

    },
    methods:{
        setCity(index){
            setCookie('city',this.cityMsg[index].name)
            setCookie('city_id',this.cityMsg[index].city_id)
            this.defaultCity=this.cityMsg[index].name
            // alert(this.cityMsg[index].name)
        },
        getloca(){
            var that= this;
            // alert('111')
                    Indicator.open("定位中...");
                        // 百度地图API功能
                        var map = new BMap.Map("container");
                        // map.centerAndZoom(new BMap.Point(112.948569, 28.226925), 13);
                        // map.enableScrollWheelZoom(true);
                        // var index = 0;

                        	var point = new BMap.Point(116.331398,39.897445);
                            map.centerAndZoom(point,12);

                            var geolocation = new BMap.Geolocation();
                            geolocation.getCurrentPosition(function(r){
                                Indicator.close()
                                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                                    var mk = new BMap.Marker(r.point);
                                    map.addOverlay(mk);
                                    map.panTo(r.point);
                                    // alert('您的位置：'+r.point.lng+','+r.point.lat);
                                    that.longitude=r.point.lng;
                                    that.latitude=r.point.lat;
                                    setCookie('longitude',that.longitude)
                                    setCookie('latitude',that.latitude)
                                    var myGeo = new BMap.Geocoder();
                                    var adds = new BMap.Point(that.longitude, that.latitude);
                                    // var adds = new BMap.Point(116.331398,39.897445);
                                        var marker = new BMap.Marker(adds);
                                        // map.addOverlay(marker);
                                        // marker.setLabel(new BMap.Label("我是商圈:", {
                                        //     offset: new BMap.Size(20, -10)
                                        // }));                      
                                    // function bdGEO() {
                                        var pt = adds;
                                        geocodeSearch(pt);
                                    // }
                                    function geocodeSearch(pt) {
                                            // window.bdGEO
                                        myGeo.getLocation(pt, function (rs) {
                                            Indicator.close();
                                            var addComp = rs.addressComponents;
                                            that.defaultCity=addComp.city.slice(0,2);
                                            setCookie('city',addComp.city.slice(0,2))
                                            // alert(that.defaultCity)
                                            // document.getElementById("result").innerHTML += adds.lng + "," + adds.lat + "：" + "商圈(" + rs.business + ")  结构化数据(" + addComp.province + ", " +
                                            //     addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber +
                                            //     ")<br/><br/>";
                                        });
                                    }
                                }
                                else {
                                    alert('failed'+this.getStatus());
                                }        
                            },{enableHighAccuracy: true})
        },
        getComcity(){
           var params = {
            token: 123,
          },
        url = apiUrl + "/peony/activity/getComcity";
            this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
                if (res.body.code == 0) {
                this.cityMsg = res.body.data.result;
                // console.log(this.cityMsg)
                } else if (res.body.code == -1) {
                Toast(res.body.msg);
                }
            });
        }
        
    },
    destroyed () {
        destroy()
    }
}
</script>

<style lang="stylus">
@import '../../common/stylus/variable.styl'
 #location
    // line-height 0;
    width 100%
    height 100%
    .mint-indexlist
        .mint-indexlist-content
            width 100%
            .title
                width: 100%;
                height: 0.63rem;
                line-height:0.63rem;
                padding-left:0.2rem;
                fs(12)
                color:$color999
            .cur
                display:inline-block
                width: 100%;
                height: 0.8rem;
                padding-left:0.2rem;
                line-height:0.8rem
                fs(14)
                color:#3b3b3b
                background:#fff
                span
                    float right
                    margin-right 0.2rem
                    fs(13);
                    color #2e8ae8
                    i
                        fs(13)
                        margin-right 5px      
            .offen
                background:#fff
                li
                    a
                        display:inline-block
                        width: 100%;
                        height: 0.8rem;
                        padding-left:0.2rem
                        line-height:0.8rem
                        fs(14)
                        color:#3b3b3b
                        border-bottom:1px solid #f1f3ff
            .mint-indexsection
                ul                    
                    a
                        display block
                        width: 100%;
                        height: 40px;
                        padding-left:10px
                        line-height:40px
                        font-size:14px
                        color:#3b3b3b
                        background:#fff
                        border-bottom:1px solid #f1f3ff
    #container
        display none
</style>