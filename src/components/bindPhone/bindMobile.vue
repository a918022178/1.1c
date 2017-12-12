<template>
    <div class="contentBox bindMobile" v-cloak>
        <div class="tel" v-show="!mobile">
            <i class="iconfont icon-bind_name"></i>
            <input type="text" v-model.trim="name" @keyup="keyup" placeholder="请填写真实姓名" name="name" id="name">
        </div>
        <div class="tel childName" v-show="!mobile">
            <i class="iconfont icon-bind_kids"></i>
            <input @keyup="keyup" type="text" v-model.trim="childName" placeholder="请填写孩子姓名" name="childName" id="childName">
        </div>
        <div class="tel">
            <i class="iconfont icon-bind_iphone"></i>
            <input @keyup="keyup" type="text" v-model.trim="tel" placeholder="请输入手机号码" name="mobile" id="mobile">
            <b v-if="show">正在获取 {{second}}s</b>
            <span v-else  @click="get">获取验证码</span>
        </div>
        <div class="code">
            <i class="iconfont icon-bind_code"></i>
            <input @keyup="keyup" type="text" placeholder="请输入验证码" name="code" id="code" v-model.trim="code">
        </div>
        <!-- <div class="second">
        </div> -->
        <div v-show="!mobile" class="agreement clearfix">
            <b v-if="unAccept" class="iconfont icon-bind_default fl" @click="addClass"></b>
            <b v-else class="iconfont icon-bind_selected fl" @click="addClass"></b>
            <span class="fl">我已阅读并接受</span>
            <router-link class="fl" to="/agreement">《用户注册协议》</router-link>
        </div>
        <div class="btn">
            <div class="gray" @click="bind">{{btn}}</div>
        </div>
    </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,analyze,destroy,setItem,getItem} from "../../common/js/common.js";
export default {
  data() {
    return {
      tel: "",
      name: "",
      second: 59,
      show: 0,
      code:'',
      unAccept:true,
      btn:'',
      mobile:getItem('mobile')||getItem('is_bind_mobile'),
      opType:'',
      childName:'',
      isTeacher:''
    };
  },
  created() {
    document.title = "绑定手机号码";
    analyze()
  },
  mounted() {
    
  },
  activated(){
    // analyze()
    this.mobile = getItem('mobile')||getItem('is_bind_mobile')
    if(this.mobile){
        this.btn = '立即修改'
        this.opType = 1
    }else{
        this.btn = '立即绑定'
        this.opType = 0
    }
    this.unAccept = !getItem('readAgreement')
    analyze();
    },
  deactivated(){
    // destroy()
  },
  destroyed(){
    destroy()

  },
  methods: {
      addClass(){
          this.unAccept=!this.unAccept
      },
    get() {
      var that = this;
      var mobile = this.tel;
      if (this.second == 59) {
        if(!this.mobile){
            if (!/^[\u4e00-\u9fa5]{2,}$/.test(this.name)){
                Toast("请输入中文名且必须大于2位数");
                return false;
            }
        }
        if (!/^1[3456789]\d{9}$/.test(this.tel)) {
          Toast("手机号错误");
          return false;
        } else {
          this.show = 1;
          var timer = setInterval(function() {
            that.second--;
            if (that.second == 0) {
              that.show = 0;
              that.second = 59;
              clearInterval(timer);
            }
          }, 1000);
          Toast("验证码发送成功");
        }
      }
      var params = {
          token: 123,
          phone: this.tel
        },
        url = apiUrl + "/peony/activity/getIdentifyCode";
      this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
        if (res.body.code == 0) {
        } else if (res.body.code == -1) {
          Toast(res.body.msg);
        }
      });
    },
    bind() {
        var that = this;
        if(!this.tel){
            Toast('请输入手机号码')
            return
        }
        if (!/^1[3456789]\d{9}$/.test(this.tel)) {
          Toast("手机号错误");
          return false;
        }
        if(!this.code){
            Toast('请输入验证码')
            return
        }
        if(!this.mobile){
            if(this.unAccept){
            Toast('请阅读协议')
            return
        }
        }
        var params = {
                token: 123,
                mobile: this.tel,
                truename:this.name,
                code:this.code,
                user_id:getCookie('src_user_id'),
                op_type:this.opType
            },
            url = apiUrl + "/peony/activity/bindMobile";
        this.$http.post(url, params, { emulateJSON: true }).then(function(res) {
            console.log(res)
            if (res.body.code == 0) {
                setItem('readAgreement',false)
                // setItem('mobile','')
                setItem('mobile',that.tel)
                if(that.mobile){
                    var toast = Toast('修改成功')
                    setTimeout(() => {
                        toast.close()
                        that.$router.push('/mine/setting')
                    }, 1000);
                }else if(getCookie('bindMobile_ord')){
                    var toast =  Toast('绑定成功')
                    setTimeout(() => {
                        toast.close()
                        that.$router.push('/submitOrder')
                    }, 1000);
                }else{
                    var toast =  Toast('绑定成功')
                    setTimeout(() => {
                        toast.close()
                        that.$router.push('/mine/setting')
                    }, 1000);
                }
            } else if (res.body.code == -1) {

            Toast(res.body.msg);
            }
        });
    },
    keyup(){
        if(this.mobile){
            if(this.tel&&this.code){
                $('.btn div').removeClass('gray')
            }else{
                $('.btn div').addClass('gray')
            }
        }else{
            if(this.tel&&this.code&&this.name&&this.childName){
                $('.btn div').removeClass('gray')
            }else{
                $('.btn div').addClass('gray')
            }
        }
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.bindMobile {
    padding-top: 0.2rem;
    // line-height 0
}
.iconfont{
    color #87919c    
}

.icon-bind_selected{
    color  #00bc71
}
.bindMobile div{
    position relative
}

.bindMobile input {
    position absolute
    // width: 100%;
    height 100%
    top 0px
    left 0.8rem
    // line-height 1rem
    padding 0.3rem 0
}

.tel, .code {
    // height: 1rem;
    // line-height: 1rem;
    padding 0.5rem 0
    padding-left: 0.2rem;
    background: white;
    margin-bottom: 1px;
}
.childName{
    margin-bottom 0.1rem    
}
    i{
        position absolute
        top 50%
        left 0.2rem
        transform translateY(-50%)
        color #87919c
     }

.contentBox input {
    color: #333;
    fs($font14);
    border: none;
    // padding: 0;
    
    margin: 0;
    width: 80%;
}

input::-webkit-input-placeholder {
    fs($font13);
    color: #999;
}

.tel span {
    width: 1.8rem;
    fs($font12);
    line-height 0.52rem
    color: #eea200;
    position: relative;
    text-align: center;
    border 0.02rem solid #eea200
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right 0.2rem
    // height 0.52rem
    border-radius 0.1rem
}

.second {
    height: 0.8rem;
    line-height: 0.8rem;
    padding-right: 0.4rem;
}

.tel b {
    width: 1.8rem;
    fs($font12);
    line-height 0.52rem
    color: #00bc71;
    position: relative;
    text-align: center;
    border 0.02rem solid #00bc71
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right 0.2rem
    // height 0.52rem
    border-radius 0.1rem
}
.agreement{
    line-height 0.32rem
    padding 0.3rem 0.4rem 0
    b{
        fs($font14)
        margin-right 0.1rem
     }
     span{
         fs($font12)
      }
      a{
          fs($font12)
          color #2199ff
       }
}
.btn {
    height: 0.8rem;
    padding: 0 0.2rem;
    margin-top 0.4rem
}

.btn div {
    width: 100%;
    height: 100%;
    background: #00bc71;
    border-radius: 0.1rem;
    color: white;
    fs($font14);
    font-weight: 600;
    border: none;
    line-height 0.8rem
    text-align center
}
.btn .gray{
    background-color #999
}
</style>

