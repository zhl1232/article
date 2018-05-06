// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.filter('type',function(value) {
  if ( value === '1') {
    return '入门学习'
  } else if ( value === '2') {
    return '经验分享'
  } else if ( value === '3') {
    return '成果分享'
  }
})

Vue.filter('time', function (value) {
  var date2 = value * 1000;
  var date1 = new Date().getTime();
  var date = new Date(date1 - date2);

  var Y = ~~(date/1000/60/60/24/365);
  var M = ~~(date/1000/60/60/24/30);
  var D = ~~(date/1000/60/60/24);
  var h = ~~(date/1000/60/60%24);
  var m = ~~(date/1000/60%60);

  if ( Y ) {
    return Y + '年前'
  } else if ( M ) {
    return M + '月前'
  } else if ( D ) {
    return D + '天前'
  } else if ( h ) {
    return h + '小时前'
  } else {
    return m + '分前'
  } 
}),

Vue.filter('time1', function (value) {
  var date = new Date(value * 1000);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ' ;
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}),


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
