<template>
    <div class="contentBox setting">
        <div class="avatar clearfix" @click.stop.prevent="check">
            <div class="fl">头像</div>
            <div class="fr">
                <img :src="avatarSrc" alt="" @click.stop.prevent="preview">
                <i class="iconfont icon-set_more"></i>
            </div>
        </div>
        <div class="nickname clearfix">
            <div class="fl">昵称</div>
            <div class="fr">
                <!-- <div class="co3b">{{nickName}}</div> -->
                <input class="co3b" type="text" v-model.trim="nickName">
                <i class="iconfont icon-set_more"></i>
            </div>
        </div>
        <div class="name">
            <div class="fl">孩子姓名</div>
            <div class="fr">
                <input type="text" placeholder="还未设置" v-model.trim="name">
                <!-- <div>还未设置</div> -->
                <i class="iconfont icon-set_more"></i>
            </div>
        </div>
        <div class="sex" @click="showSex">
            <div class="fl">孩子性别</div>
            <div class="fr">
                <div  class="co3b">{{sex}}</div>
            </div>
        </div>
        <!-- <div class="mobile" @click="tobindMobile">
            <div class="fl">手机号码</div>
            <div class="fr">
                <div  class="co3b">{{mobile||'绑定手机号码'}}</div>
                <i class="iconfont icon-set_more"></i>
            </div>
        </div> -->
        <div class="save" @click="save">
            <div class="button">保存</div>
        </div>
        
        <!-- <div class="change">
            <div class="img" ref="img">
                <img src="" alt="">
                <div class="btn">更换头像</div>
            </div>
        </div> -->
        <div class="msk" @click="hide"></div>
        <div class="check">
            <!-- <form action="http://dev-api.shijian666.com/peony/activity/userAvatarUpload"
             method="post" enctype="multipart/form-data" target="uploadFrame">
                <input type="text" value="123" name="token">
                <input type="text" value="11267" name="user_id">
                <div class="inp"><input type="file" accept="image/*" @change="onFileChange" name="face">选择图片</div>
                <iframe name="uploadFrame" id="uploadFrame" style="display:none;"></iframe>
            </form> -->
            <div class="inp"><input type="file" ref="avatarInput" name="face" accept="image/*" @change="onFileChange">选择图片</div>
            <div @click="hide">取消</div>
        </div>
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <div class="childSex">
            <div @click="checkSex">男</div>
            <div @click="checkSex">女</div>
            <div @click="checkSex">保密</div>
        </div>
    </div>
</template>
<script>
import wx from "weixin-js-sdk";
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  setItem,
  getItem,
  destroy,
  setCookie
} from "../../common/js/common";
import { Toast, Indicator, Actionsheet,Picker  } from "mint-ui";
export default {
  data() {
    return {
        arr:['保密','男','女'],
        change: 0,
        avatarSrc:getItem('avatar'),
        faceSrc:'',
        nickName:getItem('nickName'),
    //   slots: [{values: ['男','女'],defaultIndex:0}],
        name:getItem('childName'),
        sex:'',
        face:'',
        mobile:'',
    };
  },
  created() {
    document.title = "设置";
    this.sex = this.arr[getItem('childSex')]
      this.mobile =getItem('mobile')
      this.avatarSrc =getItem('avatar')
    analyze();
  },
  activated(){
  },
  mounted() {
  },
  methods: {
      tobindMobile(){
          this.$router.push('/bindMobile')
      },
      aa(){

      },
    check() {
      $('.msk').fadeIn(100)
      $('.check').animate({'bottom':'0'},100)
    },
    getLibrary() {},
    hide() {
      $('.msk').fadeOut(100)
      $('.check').animate({'bottom':'-2rem'},100)
      $('.childSex').animate({'bottom':'-2.8rem'},100)
    },
    preview(e){
        // console.log(e.target.src)
        this.$router.push("/mine/avatar");
        setItem('avatar',e.target.src);
    },
    showSex(){
        $('.msk').fadeIn(100)
        $('.childSex').animate({'bottom':'-0.1rem'},100)
    },
    checkSex(e){
        this.sex = e.target.innerText
        $('.msk').fadeOut(100)
        $('.childSex').animate({'bottom':'-2.8rem'},100)
    },
    onFileChange(e) {
        var that = this
        $('.msk').fadeOut(1)
        $('.check').animate({'bottom':'-2rem'},1)
      var img = document.querySelector("img");
      var files = e.target.files || e.dataTransfer.files;
      //   console.log(e);
      //   var length = parseInt(this.images.length) + parseInt(files.length);
      var image = new Image();
      var reader = new FileReader();
        Indicator.open('上传中...')
      reader.readAsDataURL(files[0]);
      reader.onload = function(e) {
        console.log(e,1);
        // console.log(typeof (files[0]));
        // var url1 = window.webkitURL.createObjectURL(e.target.result);
        img.src = e.target.result;
        that.avatarSrc=e.target.result;
        that.faceSrc=1;
        console.log(that.$refs.avatarInput.files[0])
        var data1 = new FormData();
        data1.append('face',that.$refs.avatarInput.files[0]);
        data1.append('token',123 );
        data1.append('user_id',getCookie('src_user_id') );
         var url=apiUrl+"/peony/activity/userAvatarUpload";
        //   url=apiUrl+"/test";
          console.log(123123)
          that.$http.post(url,data1,{emulateJSON:true})
          .then(function(res){
              Indicator.close()
              if(res.body.code==0){
                  that.face = res.body.data.result.face
                  console.log(res.body.data.result.face)
                //   Indicator.close();
                }else if(res.body.code==-1){
                  Toast(res.body.msg)
                }
            })
      };
    },
    // onValuesChange(picker, values){
    //     console.log(picker,values)
    //     if (values[0] > values[1]) {
    //     picker.setSlotValue(1, values[0]);
    //   }
    // },
    save(){
        if(!this.nickName){
            var a = Toast('请填写昵称')
            setTimeout(() => {
                console.log(11111111111)
                a.close()
            }, 1000);
            return
        }
        var that = this
        setItem('avatar',apiUrl+that.face)
          var params={
            token:123,
            user_id:getCookie('src_user_id'),
            face:that.face,
            nickname:that.nickName,
            child_name:that.name,
            child_sex:that.sex=='保密'?0:(that.sex=='男'?1:2),
          },
          url=apiUrl+"/peony/activity/userInfoSetting";
          this.$http.post(url,params,{emulateJSON:true})
          .then(function(res){
              if(res.body.code==0){
                  var toast = Toast('保存成功')
                  setTimeout(() => {
                      toast.close()
                      that.$router.push('/mine/myCenter')
                  }, 1000);
                //   that.res=res.body.data.result
                  console.log(res.body.data.result)
                //   Indicator.close();
                }else if(res.body.code==-1){
                  Toast(res.body.msg)
                }
            })
    }
  },
  filters: {
    formateTime(str, symbol2) {
      return str.replace(/-/g, symbol2);
    }
  },
  destroyed() {
    destroy();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.contentBox {
    .avatar {
        margin: 0.1rem 0;
        height: 1.2rem;
        fs($font13);
        line-height: 1.2rem;
        background: white;
        overflow: hidden;
        padding: 0 0.2rem;
        color: #999;

        img {
            width: 0.9rem;
            height: 0.9rem;
            margin-top: 0.15rem;
            border-radius: 50%;
            border 0.02rem solid #dbdbdb
        }

        i {
            float: right;
            // width: 0.22rem;
            // height: 0.22rem;
            // bg('../../assets/more_18x18');
            // margin-top: 0.49rem;
            margin-left: 0.1rem;
            fs($font12);
        }
    }

    .nickname, .name, .sex, .mobile{
        background: white;
        overflow: hidden;
        padding: 0 0.2rem;
        color: #999;
        fs($font13);
        line-height: 0.8rem;
        margin-bottom: 0.02rem;

        .fr {
            position relative
            div {
                display: inline-block;
                fs($font14);
            }

            .co3b {
                color: #3b3b3b;
            }
            input{
                // padding-right 0.3rem
                text-align right
                color: #3b3b3b;
                fs($font14);
             }
            input::-webkit-input-placeholder{
                color #999
            }
        }

        i {
            fs($font12);
            // position absolute
            // width: 0.22rem;
            // height: 0.22rem;
            // top 50%
            // right 0
            // transform: translateY(-50%);
            // bg('../../assets/more_18x18');
            margin-left: 0.1rem;
        }
    }
    .mobile{
        .fr{
            // padding-right 0.3rem
         }
    }
    .save {
        margin-top: 0.6rem;
        padding: 0 0.2rem;
        height: 0.8rem;

        .button {
            border-radius: 0.1rem;
            height: 100%;
            background: #00bc71;
            line-height: 0.8rem;
            color: white;
            text-align: center;
            fs($font14);
        }
    }
    .change {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: #2e2e2e;
        text-align: center;

        .img {
            background: red;
            position: relative;
            top: 50%;
            transform: translateY(-60%);
            img{
                width 100%
                height 100%
            }
        }

        .btn {
            position: absolute;
            bottom: -1.54rem;
            left: 50%;
            transform: translate(-50%);
            color: #00bc71;
            fs($font14);
            width: 2.4rem;
            line-height: 0.64rem;
            height: 0.64rem;
            border-radius: 0.1rem;
            border: 0.02rem solid #00bc71;
        }
    }

    .msk {
        position: fixed;
        display none
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        fs($font14);

        // color white
    }
        .check {
            fs($font14);
            position: fixed;
            bottom: -2rem;
            left: 0;
            width: 100%;
            text-align: center;
            background: #f3f6f8;

            div {
                position: relative;
                height: 0.8rem;
                background: white;
                line-height: 0.8rem;
            }

            .inp {
                margin-bottom: 0.1rem;
            }

            input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            .sub{
                top -30px
                opacity 1  
                height 40px  
            }
        }
        .childSex{
            position fixed
            bottom -2.9rem
            left 0
            width 100%
            fs($font14);
            text-align center
            background: #f3f6f8;
            div{
                background-color white
                margin-bottom 0.1rem
                line-height 0.8rem
            }
        }
}
</style>

