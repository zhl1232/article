<template>
  <div id="write">
    <header>
    <span style="text-align:left">
      文章标题
    </span>
    <el-input v-model="title" placeholder="请输入内容" style="width:300px"></el-input>
    <span style="margin-left:150px">
      所属分类
    </span>
    <el-select v-model="typeValue" placeholder="请选择" style="width:200px">
      <el-option
        v-for="item in type"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    技术分类
    <el-select v-model="techTypeValue" placeholder="请选择" style="width:200px">
      <el-option
        v-for="item in techType"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </header>

    <div class="indexContainer">
      <div class="btnsContainer">
        <!-- <div class="btn" @click="getMdValueFn">获取mdValue</div> -->
        <el-button type="primary" @click="addArticle">发布文章</el-button>
      </div>
      <!-- <div class="maskContainer" v-if="dilogStatus">
        <div class="contentContainer">
        <div class="closeBtnContainer" @click="closeMaskFn"></div>
          <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea>
        </div>
      </div> -->
      <div class="editorContainer">
        <markdown 
        :mdValuesP="msg.mdValue"  
        :fullPageStatusP="false" 
        :editStatusP="true" 
        :previewStatusP="true" 
        :navStatusP="true"
        :icoStatusP="true"  
        @childevent="childEventHandler"
        ></markdown>
        <!--变量后面的大写P表示是从父组件中传入的参数-->
        <!--:mdValuesP="msg" 表示需要初始化传入编辑器的内容-->
        <!--:fullPageStatusP="false" 加载时是否全屏（true全屏/false跟随父容器）-->
        <!--:editStatusP="false" 加载时是否显示编辑容器（true显示/false不显示）-->
        <!--:previewStatusP="false" 加载时是否显示预览容器（true全屏/false不显示）-->
        <!--:navStatusP="false" 加载时是否显示顶部快速标签栏（true显示/false不显示）-->
        <!--:icoStatusP="false" 加载时是否显示版权标志（true显示/false不显示）,如果取消掉，请勿忘挖井人，谢谢！-->
        <!--@childevent="childEventHandler" 监听组件的$.emit()方法传回父组件的值，便于父容器保存获取-->
      </div>
    </div>
  </div>
</template>

<script>
import markdown from './article/MarkDown';
import Axios from 'axios';
import state from '../store/state';

export default {
  name: 'index',
  data() {
    return {
      msg: {
        mdValue: state.article.data.md_content
      },
      type: state.type,
      typeValue: state.article.data.type,
      techType: state.techType,
      techTypeValue: state.article.data.tech_type,
      title: state.article.data.title,
      isEdit: false
    };
  },
  components: {
    markdown
  },
  computed: {
    
  },
  methods: {
    childEventHandler: function(res) {
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.msg = res;
    },
    addArticle() {
      Axios.post('http://www.ftusix.com/static/data/writeArticle.php', {
        content: this.msg.htmlValue, //  话题内容html
        md_content: this.msg.mdValue, //  话题内容md
        user_id: state.user[0].user_id, //  用户id
        nickname: state.user[0].nick_name, //  昵称,
        // token: state.user[0].token, 
        type: this.typeValue, //  一级分类 0.全部 1.经验分享 2.入门学习 3.成果分享,
        tech_type: this.techTypeValue, //  技术分类 1.html 2.js 3.vue 类型暂时未定
        title: this.title, //  标题
        isEdit: state.isEdit, //是否为编辑状态
        topic_id: state.article.data.topic_id //如果为编辑状态则加上文章id
      }).then(res => {
        let data = res.data;
        console.log(data)
        this.$store.commit('ISEDIT',false);
        if (data.status === 1) {
          this.$store.commit('CLEAR_ARTICLE');
          this.$router.push({
            path: '/article/'
          });
        } else {
          this.$message.error({
            showClose: true,
            message: "文章发布失败"
          });
        }
      });
    },
    
  },
  beforeCreate() {
    //编辑文章和写文章使用一个组件,清除一些BUG
    //判断isEdit状态为否,是从文章详情转跳到写文章页面
    //判断$route.params.topic_id为空,是从编辑页面没保存转跳到写文章页面
    if ( !state.isEdit || !Object.keys(this.$route.params).length ) {
      this.$store.commit('CLEAR_ARTICLE');
    }
  }
};
</script>

<style scoped>
#write {
  min-width: 1100px;
  margin: 30px auto;
}
#write header {
  min-width: 1100px;
}
.show {
  position: absolute;
  left: 0;
  top: 0;
}

.indexContainer {
  max-width: 1100px;
  max-width: 1400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 30px auto;
}

.btnsContainer {
  position: absolute;
  z-index: 10;
  right: 60px;
  bottom: -70px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* .btnsContainer .btn {
    display: inline-block;
    border: 1px solid #ccc;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 0 10px;
    background: #fff;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none; }
    .btnsContainer .btn:active {
      opacity: 0.8;
      background: lightblue; } */

.maskContainer {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.maskContainer .contentContainer {
  width: 60%;
  height: 60%;
  background: #fefefe;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
.maskContainer .contentContainer .showAreaContainer {
  height: 100%;
  width: 100%;
  outline: none;
  background: #eee;
  display: block;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
}
.maskContainer .contentContainer .closeBtnContainer {
  position: absolute;
  height: 30px;
  width: 30px;
  right: -40px;
  top: -40px;
  border: 1px solid #fff;
  border-radius: 50%;
}
.maskContainer .contentContainer .closeBtnContainer::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 2px;
  display: bblock;
  background: #fff;
  left: 15%;
  top: calc(50% - 1px);
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
}
.maskContainer .contentContainer .closeBtnContainer::after {
  content: '';
  position: absolute;
  width: 70%;
  height: 2px;
  display: bblock;
  background: #fff;
  left: 15%;
  top: calc(50% - 1px);
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
}

.editorContainer {
  width: 90%;
  height: 650px;
  border: 1px solid #ddd;
}

/*# sourceMappingURL=aa.css.map */
</style>