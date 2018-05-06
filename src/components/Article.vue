<template>
  <div id="article">
    <ul class="type-list">
      <li><span></span>所有分类</li> 
      <li><span></span>经验分享</li> 
      <li><span></span>入门学习</li> 
      <li><span></span>成果分享</li>
    </ul>

    <el-radio-group v-model="sort" size="mini" fill="#f00" @change="change">
      <el-radio-button label="new">最新</el-radio-button>
      <el-radio-button label="hot">热门</el-radio-button>
    </el-radio-group>

    <hotArticle v-if="sort=='hot'"></hotArticle>
    <newArticle v-if="sort=='new'"></newArticle>
  </div>
</template>

<script>
import hotArticle from '../components/article/HotArticle.vue';
import newArticle from '../components/article/NewArticle.vue';
export default {
  data() {
    return {
      sort: 'new'
    };
  },
  computed: {},
  methods: {
    change() {
      console.log(this.sort);
    }
  },
  components: {
    hotArticle: hotArticle,
    newArticle: newArticle
  }
};
</script>

<style>
#article {
  min-width: 850px;
  max-width: 1100px;
  margin: 0 auto;
  padding-left: 60px;
}
.type-list {
  height: 35px;
  margin: 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}
.type-list li {
  float: left;
  height: 15px;
  line-height: 15px;
  margin-right: 30px;
  padding: 10px;
  list-style: none;
  cursor: pointer;
}
.type-list li span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

.type-list li:nth-child(4) span {
  background: #9c2698;
}
.type-list li:nth-child(3) span {
  background: #26719b;
}
.type-list li:nth-child(2) span {
  background: #d76734;
}
.type-list li:nth-child(1) span {
  background: #259d94;
}

.el-radio-group {
  float: left;
  margin-bottom: 20px;
}
</style>
