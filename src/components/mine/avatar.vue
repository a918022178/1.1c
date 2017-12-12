<template>
    <div class="contentBox setting">
        <div class="change">
            <div class="img" ref="img">
                <img :src="avatar" alt="">
                <!-- <div class="btn">更换头像</div> -->
            </div>
        </div>
        <!-- <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet> -->
    </div>
</template>
<script>
import {
  apiUrl,
  GetRequest,
  getCookie,
  analyze,
  getItem,
  destroy
} from "../../common/js/common";
import { Toast, Indicator, Actionsheet } from "mint-ui";
export default {
  data() {
    return {
      avatar:''
    };
  },
  methods: {

  },
  filters: {
    formateTime(str, symbol2) {
      return str.replace(/-/g, symbol2);
    }
  },
  created() {
    document.title = "设置";
    analyze();
    this.avatar=getItem('avatar')
  },
  mounted() {
    // console.log(window.innerWidth, this.$refs.img);
    this.$refs.img.style.height = window.innerWidth + "px";
  },
  destroyed() {
    destroy();
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.contentBox {
    .change {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: #2e2e2e;
        text-align: center;

        .img {
            background: transparent;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
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
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        fs($font14);

        // color white
        .check {
            position: absolute;
            bottom: 0;
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
        }
    }
}
</style>

