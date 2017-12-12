import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'

import '../../node_modules/mint-ui/lib/style.min.css'

import '../common/fonts/iconfont.css'



// 相当于 import HelloWorld from '@/components/HelloWorld' 引入 可以分批次打包 优化浏览体验
// const ActivityList = (resolve) => {
//   import('../components/activityList.vue').then((module) => {
//     resolve(module)
//   })
// }

const ActivityDetail = (resolve) => {
  import ('../components/activity/activityDetail.vue').then((module) => {

    resolve(module)
  })
}

const Refund = (resolve) => {
  import('../components/refund/refund.vue').then((module) => {
    resolve(module)
  })
}

const Submit = (resolve) => {
  import('../components/refund/submit.vue').then((module) => {
    resolve(module)
  })
}

const Ticket = (resolve) => {
  import('../components/mine/ticket.vue').then((module) => {
    resolve(module)
  })
}

const MineTicket = (resolve) => {
  import('../components/mine/mineTicket.vue').then((module) => {
    resolve(module)
  })
}

const BindMobile = (resolve) => {
  import('../components/bindPhone/bindMobile.vue').then((module) => {
    resolve(module)
  })
}

const Pay = (resolve) => {
  import('../components/pay/pay.vue').then((module) => {
    resolve(module)
  })
}

const PayOK = (resolve) => {
  import('../components/pay/payok.vue').then((module) => {
    resolve(module)
  })
}
const SubmitOrder = (resolve) => {
  import('../components/pay/submitOrder.vue').then((module) => {
    resolve(module)
  })
}

const MineActive = (resolve) => {
  import('../components/mine/mineActive.vue').then((module) => {
    resolve(module)
  })
}
const MyCenter = (resolve) => {
  import('../components/mine/myCenter.vue').then((module) => {
    resolve(module)
  })
}
const Setting = (resolve) => {
  import('../components/mine/setting.vue').then((module) => {
    resolve(module)
  })
}
const Avatar = (resolve) => {
  import('../components/mine/avatar.vue').then((module) => {
    resolve(module)
  })
}
const MyOrder = (resolve) => {
import ('../components/mine/myOrder.vue').then((module) => {
    resolve(module)
  })
}
const OrderDetail = (resolve) => {
import ('../components/mine/orderDetail.vue').then((module) => {
    resolve(module)
  })
}
const RefundDetail = (resolve) => {
import ('../components/mine/refundDetail.vue').then((module) => {
    resolve(module)
  })
}

const Location = (resolve) => {
  import('../components/location/location.vue').then((module) => {
    resolve(module)
  })
}

const Home = (resolve) => {
  import('../components/homePage/home.vue').then((module) => {
    resolve(module)
  })
}

const ActivityList = (resolve) => {
  import('../components/activity/activityList.vue').then((module) => {
    resolve(module)
  })
}

const SearchPage = (resolve) => {
  import('../components/activity/searchPage.vue').then((module) => {
    resolve(module)
  })
}

const Agreement = (resolve) => {
  import('../components/bindPhone/agreement.vue').then((module) => {
    resolve(module)
  })
}

const Share = (resolve) => {
  import('../components/share/share.vue').then((module) => {
    resolve(module)
  })
}

const ClassActivity = (resolve) => {
  import('../components/mine/classActivity.vue').then((module) => {
    resolve(module)
  })
}

const ClassSignup = (resolve) => {
  import('../components/mine/classSignup.vue').then((module) => {
    resolve(module)
  })
}

const Blank = (resolve) => {
  import('../components/pay/blank.vue').then((module) => {
    resolve(module)
  })
}

const PromotionActivity = (resolve) => {
  import('../components/promotionActivity/promotionActivity.vue').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)
Vue.use(VueResource)
Vue.use(Mint)


export default new Router({
  //消除链接后面的 http://localhost:8080/#/
  // mode:'history',
  routes: [
    {
      path: '/',
      // name: 'Home',
      component: Home,
    },
    // {
    //   path: '/activityList',
    //   name: 'ActivityList',
    //   component: ActivityList,
    //   // beforeEnter: (to, from, next) => {
    //   //   window.dataLayer = window.dataLayer || [];
    //   //   function gtag(list){dataLayer.push(arguments);}
    //   //   gtag('js','list', new Date());
    
    //   //   gtag('config', 'UA-109314458-1');
    //   //   next()
    //   //  }
    // },
    {
      path: '/activityDetail',
      name: 'ActivityDetail',
      component: ActivityDetail,
    },
    {
      path: '/refund',
      name: 'Refund',
      component: Refund
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/mineTicket',
      name: 'MineTicket',
      component: MineTicket,
      meta: { keepAlive: true }
    },
    {
      path: '/ticket',
      name: 'Ticket',
      component: Ticket,
      meta: { keepAlive: true }
    },
    {
      path: '/bindMobile',
      name: 'BindMobile',
      component: BindMobile,
      meta: { keepAlive: true }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },   
    {
      path: '/payok',
      name: 'PayOK',
      component: PayOK
    },
    {
      path: '/blank',
      name: 'Blank',
      component: Blank
    },
    {
      path: '/submitOrder',
      name: 'SubmitOrder',
      component: SubmitOrder,
      meta: { keepAlive: true }
    },
    {
      path: '/mineActive',
      name: 'MineActive',
      component: MineActive
    },
    {
      path: '/mine/myCenter',
      name: 'MyCenter',
      component: MyCenter
    },
    {
      path: '/mine/setting',
      name: 'Setting',
      component: Setting,
      // meta: { keepAlive: true }
    },
    {
      path: '/mine/avatar',
      name: 'Avatar',
      component: Avatar,
    },
    {
      path: '/mine/myOrder',
      name: 'MyOrder',
      component: MyOrder,
    },
    {
      path: '/mine/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
    },
    {
      path: '/mine/refundDetail',
      name: 'RefundDetail',
      component: RefundDetail,
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    },
    {
      path: '/home/',
      name: 'Home',
      component: Home
    },
    {
      path: '/activityList',
      name: 'ActivityList',
      component: ActivityList
    },
    {
      path: '/searchPage',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
    {
      path: '/classActivity',
      name: 'ClassActivity',
      component: ClassActivity
    },
    {
      path: '/classSignup',
      name: 'ClassSignup',
      component: ClassSignup
    },
    {
      path: '/promotionActivity',
      name: 'PromotionActivity',
      component: PromotionActivity
    }
  ]
})
