<template>
  <div class="classSignup">
     <div class="num">
         已报名人数{{num}}/{{max_num}}
     </div>
     <div class="list" v-for="(item,index) in signUpData" :key="index">
         <img class="pic fl" :src="item.face">
         <div class="msg fl"><span class="name">{{item.truename}}</span><a :href="'tel:'+item.mobile" class="tel">{{item.mobile}}</a></div>
         <div class="btn fr" @click="remove(index)" v-show="!item.show&&item.status!=10">移出</div>
         <div class="del fr"  v-show="item.show||item.status==10">已移出</div>
     </div>
     <div class="noActivityTip" v-show="showTag">
        <div class="pic"></div>
        <p>还没有活动成员~</p>
     </div>
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
import { Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      signUpData: "",
      showTag:0,
      max_num:getCookie("signUp_max_num"),
      num:'',
    };
  },
  created() {
    document.title = "报名详情";
    this.getClassDetailinfo();
  },
  methods: {
    remove(index) {
      var that = this;
      MessageBox.confirm("是否确定移出", "温馨提示", {
        showCancelButton: true,
        // cancelButtonText: "确定",
        // confirmButtonText: "取消",
        closeOnClickModal: false
      })
        .then(action => {
          that.signUpData[index].show = 1;
          that.$set(that.signUpData, index, that.signUpData[index]);

          var params = {
              order_id: that.signUpData[index].order_id,
              goods_id:GetRequest().goods_id,
            }
            console.log(params);
            var url = apiUrl + "/peony/activity/changeStatus";
          that.$http
            .post(url, params, { emulateJSON: true })
            .then(function(res) {
                console.log(res)
              if (res.body.code == 0) {
              } else if (res.body.code == -1) {
                Toast(res.body.msg);
              }
            });
        })
        .catch(cancel => {
        });
    },
    getClassDetailinfo() {
      Indicator.open("加载中...");
      var params = {
          goods_id:GetRequest().goods_id,
        //   goods_id: 9
        },
        url = apiUrl + "/peony/activity/getClassDetailinfo";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
          Indicator.close();
          this.num=res.body.data.count
          this.signUpData = res.body.data.result;
          if(this.this.signUpData.list==0){
              this.showTag=1
          }
          // this.activityType = res.body.data.result.type
          // console.log(res.body.data.result)
        } else{
          Indicator.close();
          Toast(res.body.msg);
        }
      });
    }
  },
  mounted () {
    analyze()
  },
  destroyed(){
    destroy()
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.classSignup {
    .num {
        padding: 0 0.2rem;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        fs(13);
        color: $color333;
    }

    .list {
        padding: 0 0.2rem;
        margin-bottom: 1px;
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        background-color: $colorfff;

        .pic {
            margin-top: 0.14rem;
            margin-right: 0.1rem;
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            overflow: hidden;
        }

        .msg {
            fs(13);
            color: $color333;

            .name {
                margin-right: 0.1rem;
            }

            .tel {
                color: $color333;
            }
        }

        .btn {
            margin-top: 0.27rem;
            width: 1.1rem;
            line-height: 0.34rem;
            text-align: center;
            fs(12);
            color: #0086f8;
            border: 1px solid #0086f8;
            border-radius: 0.2rem;
        }

        .del {
            margin-top: 0.27rem;
            width: 1.1rem;
            height: 0.34rem;
            line-height: 0.34rem;
            text-align: center;
            fs(12);
            color: $color999;
            border: 1px solid $color999;
            border-radius: 0.2rem;
        }
    }

    .noActivityTip {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
        text-align: center;

        .pic {
            margin-bottom: 0.28rem;
            // width 2.2rem
            height: 2.2rem;
            bg('../../assets/pic_kong_04');
        }

        p {
            fs(14);
            color: #c6ccd7;
        }
    }
}
</style>

