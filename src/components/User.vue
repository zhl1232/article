<template>
  <div id="user">
    <ul>
      <router-link tag="li" to="./userinfo">
        <a href="javascript:void(0)">我的信息</a>
      </router-link>
      <router-link tag="li" to="./resetpwd">
        <a href="javascript:void(0)">修改密码</a>
      </router-link>
      <router-link tag="li" to="./mynote">
        <a href="javascript:void(0)">我的帖子</a>
      </router-link>
      <router-link tag="li" to="./mycollection">
        <a href="javascript:void(0)">我的收藏</a>
      </router-link>
      <router-link tag="li" to="./myinfo">
        <a href="javascript:void(0)">我的消息</a>
      </router-link>
      <router-link tag="li" to="./mytask">
        <a href="javascript:void(0)">我的任务</a>
      </router-link>
      
    </ul>
      <router-view></router-view>
    
    
  </div>
</template>
<style scoped>
#user {
  width: 1100px;
  margin: 10px auto;
}
#user ul {
  display: inline-block;
  width: 150px;
  height: 500px;
  padding-right: 30px;

  margin-left: 20px;
  border-right: 1px solid #bababa;
}
#user li {
  width: 150px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #bababa;
  list-style: none;
  font-weight: bold;
}
#user a {
  text-decoration: none;
  color: #000;
}

#user .router-link-active a {
  color: #f00;
}
</style>
