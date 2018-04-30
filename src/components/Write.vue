<template>
  <div id="write">
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

    <vue-editor v-model="content"></vue-editor>
    <button @click="addArticle">保存</button>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor';
import Axios from 'axios';
import state from '../store/state';
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      type: [
        {
          value: '1',
          label: '经验分享'
        },
        {
          value: '2',
          label: '入门学习'
        },
        {
          value: '3',
          label: '成果分享'
        }
      ],
      typeValue: '',
      techType: [
        {
          value: '1',
          label: 'html'
        },
        {
          value: '2',
          label: 'javascript'
        },
        {
          value: '3',
          label: 'vue'
        }
      ],
      techTypeValue: '',
      title: '',
      content: ''
    };
  },

  methods: {
    addArticle() {
      Axios.post('http://www.ftusix.com/static/data/writeArticle.php', {
        content: this.content, //  话题内容html
        md_content: 'hello world', //  话题内容md
        user_id: state.user[0].user_id, //  用户id
        nickname: state.user[0].nick_name, //  昵称,
        token: state.user[0].token, //  token
        type: this.typeValue, //  一级分类 0.全部 1.经验分享 2.入门学习 3.成果分享,
        tech_type: this.techTypeValue, //  技术分类 1.html 2.js 3.vue 类型暂时未定
        title: this.title, //  标题
        isEdit: false, //是否为编辑状态
        topic_id: '' //如果为编辑状态则加上文章id
      }).then(res => {
        
        let data = res.data;
        console.log(data);
        if (data.status === 1) {
          this.$message.success({
            showClose: true,
            message: data.info
          });
        }
      });
    }
  }
};
</script>

<style>
#write {
  min-width: 850px;
  max-width: 1100px;
  margin: 20px auto;
}
#write .el-icon-arrow-up {
  height: 60px;
}
</style>
