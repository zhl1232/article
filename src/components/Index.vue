<template>
  <div id="index">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="热门文章" name="first">
      <hotArticle></hotArticle>
    </el-tab-pane>
    <el-tab-pane label="html" name="second">
      <htmlArticle></htmlArticle>
    </el-tab-pane>
    <el-tab-pane label="javascript" name="third">
      <jsArticle></jsArticle>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import hotArticle from "../components/article/HotArticle";
import htmlArticle from '../components/article/Html';
import jsArticle from '../components/article/JS';

export default {
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      
    }
  },
  components: {
    hotArticle: hotArticle,
    htmlArticle: htmlArticle,
    jsArticle: jsArticle
  }
};
</script>

<style>
#index {
  width: 1100px;
  margin: 20px auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>