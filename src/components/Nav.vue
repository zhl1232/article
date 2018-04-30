<template>
  <div id="header">
    <img src="../assets/images/logo.png" alt="" class="logo">
    <ul>
        <router-link to="/user/myinfo" tag="li">
          <a href="javascript:void(0)">未读消息</a>
        </router-link>
        <router-link to="/index" tag="li">
          <a href="javascript:void(0)">首页</a>
        </router-link>
        <router-link to="/knowledge" tag="li">
          <a href="javascript:void(0)">知识体系</a>
        </router-link>
        <router-link to="/activity" tag="li">
          <a href="javascript:void(0)">活动中心</a>
        </router-link>
        <router-link to="/article" tag="li">
          <a href="javascript:void(0)">文章</a>
        </router-link>
        <router-link to="/write" tag="li">
          <a href="javascript:void(0)">写文章</a>
        </router-link>      
        <router-link to="/login" tag="li" v-if="!isLogin">
          <a href="javascript:void(0)">登录</a>
        </router-link>
        <router-link to="/register" tag="li" v-if="!isLogin">
          <a href="javascript:void(0)">注册</a>
        </router-link>
        <li v-if="isLogin">
          <el-col :span="12" >
            <el-dropdown trigger="click" placement="top">
              <span class="el-dropdown-link">
                <img src="../assets/images/face.jpg" alt="" style="width:50px">
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-for="item in myLinks" :key="item.index">
                  <router-link :to="item.url">
                    {{item.text}}
                  </router-link>
                </el-dropdown-item>

                <el-dropdown-item @click.native="outLogin">
                  <a href="javascript:void(0)">退出</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </li>
        
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import state from '../store/state';

export default {
  methods: {
    outLogin() {
      this.$store.commit('CLEAR_USER');
      this.$router.push({
        path: '/login'
      });
    }
  },
  computed: {
    ...mapGetters({
      myLinks: 'myLinks',
      user: 'user'
    }),
    isLogin() {
      return this.user[0];
    }
  }
};
</script>


<style>
#header {
  position: relative;
  min-width: 850px;
  height: 60px;
  line-height: 60px;
  background: #fafafa;
  border-bottom: 1px solid #d5d5d5;
  box-shadow: 2px 2px 2px 2px #f8f8f8;
}
#header .logo {
  position: absolute;
  left: 50px;
}
#header ul {
  position: absolute;
  right: 100px;
  width: 550px;
}
#header li {
  float: left;
  height: 55px;
  margin: 0 10px 0;
  list-style: none;
}
#header a {
  text-decoration: none;
  color: #000;
}
#header li:hover {
  border-bottom: 3px solid #f00;
}
#header .router-link-active a {
  color: #f00;
}
.el-dropdown-menu__item {
  padding: 0;
}
.el-dropdown-menu__item a:hover {
  background: #f5f5f5;
}
.el-dropdown-menu__item a {
  display: block;
  width: 90px;
  text-align: center;
  color: #000;
  text-decoration: none;
}
.el-col img {
  margin-top: 5px;
  border-radius: 50%;
}
.el-dropdown {
  height: 60px;
}
</style>



