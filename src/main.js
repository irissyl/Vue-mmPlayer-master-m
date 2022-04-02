import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import fastclick from 'fastclick'
import mmToast from 'base/mm-toast'
import Icon from 'base/mm-icon/mm-icon'
import VueLazyload from 'vue-lazyload'
import { VERSION } from './config'
import layer from 'layui-layer'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import APlayer from '@moefe/vue-aplayer';
import VDistpicker from 'v-distpicker'
import '@/styles/index.less'
import VueSimpleVerify from 'vue-simple-verify'
import '../node_modules/vue-simple-verify/dist/vue-simple-verify.css'


Vue.component('vue-simple-verify', VueSimpleVerify)
//self
Vue.use(element)
Vue.use(VDistpicker)
Vue.use(APlayer)
Vue.prototype.$layer = layer;
// 优化移动端300ms点击延迟
fastclick.attach(document.body)

// 弹出层
Vue.use(mmToast)

// icon 组件
Vue.component(Icon.name, Icon)

// 懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('assets/img/default.png')
})

// 访问版本统计
window._hmt && window._hmt.push(['_setCustomVar', 1, 'version', VERSION, 1])

const redirectList = ['/music/details', '/music/comment']
router.beforeEach((to, from, next) => {
  window._hmt &&
    to.path &&
    window._hmt.push(['_trackPageview', '/#' + to.fullPath])
  if (redirectList.includes(to.path)) {
    next()
  } else {
    document.title =
      (to.meta.title && `${to.meta.title} - 深藏blue音乐`) ||
      '深藏blue音乐'
    next()
  }
})

let InitAudioEle

// eslint-disable-next-line no-new
new Vue({
  el: '#mmPlayer',
  store,
  router,
  render: h => h(App)
})
