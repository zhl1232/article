<template>
  <div id="mytask">
    我的任务
    <ul>
      <li>进行中</li>
      <li>已完成</li>
      <li>未通过</li>

    </ul>
    <br>
    <hr>
    
  </div>
</template>
<style>
#mytask {
  position: relative;
  display: inline-block;
  width: 800px;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
#mytask ul {
  width: 400px;
  margin: 20px auto;
}
#mytask li {
  float: left;
  list-style: none;
  margin: 0 30px;
  cursor: pointer;
}
</style>