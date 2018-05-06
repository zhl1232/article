<template>
  <div id="articleContent">
    <div class="title">
      {{data.title}}
    </div>
    <div class="nick-name">
      {{data.nick_name}}
    </div>
    <div class="info">
      {{data.modify_time | time1}}
    浏览{{data.browser_num}}
    评论{{data.comment_num}}
    </div>
    

    <span v-html="data.content">
    </span>
    
    <hr>
    <div class="number">      
      <span class="collect" @click="collect">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-favorite" v-if="!iscoll"></use>
          <use xlink:href="#icon-favoritesfilling" v-if="iscoll"></use>
        </svg>
        收藏
      </span>          
      <span class="like" @click="like">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-good" v-if="!iszan"></use>
          <use xlink:href="#icon-good-filling" v-if="iszan"></use>
        </svg>
        赞
      </span>
    </div>

    <el-input v-model="input"
    type="textarea"
    rows="4" 
    placeholder="法治社会,文明发方言"
    ></el-input>
    <el-button type="primary" @click="comment">发表评论</el-button>


    <el-table
    :data="tableData"
    style="width: 100%"
    :show-header="false"
    :cell-style="cellStyle"
    >
      <!-- <el-table-column prop="avatar">
      </el-table-column> -->

      <el-table-column prop="nick_name" width="980">
        <template slot-scope="scope">
          <span>{{ scope.row.nick_name}}:</span>
          <p>{{ scope.row.comment }}</p>
        </template>
      </el-table-column>

      <el-table-column prop="date" width="100">
        <template slot-scope="scope">
          {{scope.row.date | time}}
        </template>
          
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import state from '../../store/state';
import Axios from 'axios';

export default {
  data() {
    return {
      data: state.article.data,
      iszan: state.article.iszan,
      iscoll: state.article.iscoll,
      input: '',
      time: '',
      tableData: []
    };
  },
  created() {
    this.getCommentList();
    
  },
  methods: {
    //收藏
    collect() {
      this.iscoll = this.iscoll ? false : true; 
      Axios.post('http://www.ftusix.com/static/data/zan.php', {
        user_id: state.user[0].user_id,
        topic_id: this.data.topic_id,
        type: 'coll'
      }).then(res => {
        let data = res.data;
        if (data.status !== 1) {
          this.$message.error({
            showClose: true,
            message: data.info
          });
        }
      }) 
    },
    //点赞
    like() {
      this.iszan = this.iszan ? false : true; 
      Axios.post('http://www.ftusix.com/static/data/zan.php', {
        user_id: state.user[0].user_id,
        topic_id: this.data.topic_id,
        type: 'zan'
      }).then(res => {
        let data = res.data;
        if (data.status !== 1) {
          this.$message.error({
            showClose: true,
            message: data.info
          });
        }
      });
    },
    //评论
    comment() {
      Axios.post('http://www.ftusix.com/static/data/comment.php', {
        user_id: state.user[0].user_id,
        topic_id: this.data.topic_id,
        comment: this.input
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {
          this.getCommentList();
          this.input = '';
        }
      });
    },
    //评论列表
    getCommentList() {
      Axios.get('http://www.ftusix.com/static/data/commentList.php', {
        params: {
          topic_id: this.data.topic_id
        }
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {
          this.tableData = data.data;
        }
      });
    },
    cellStyle({row, column, rowIndex }) {
      
    }
  }
};
</script>

<style >
#articleContent {
  max-width: 1100px;
  margin: 20px auto;
}
#articleContent hr {
  height: 1px;
  width: 100%;
}
#articleContent .icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 25px;
  color: #f00;
}
#articleContent .number {
  width: 200px;
  height: 40px;
  line-height: 40px;
  padding-top: 5px;
  border-radius: 15px;
  border: 1px solid #f00;
  color: #f00;
}
#articleContent .number span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  cursor: pointer;
}
#articleContent .collect {
  border-right: 1px solid;
}
#articleContent .el-textarea__inner {
  margin-top: 20px;
  resize: none;
}

#articleContent .el-button {
  margin-top: 20px;
  float: right;
}
#articleContent .title {
  font-size: 28px;
  margin: 10px;
}
#articleContent .nick-name,
#articleContent .info {
  font-size: 14px;
  color: #ccc;
}
#articleContent tr {
  text-align: left;
  border-bottom: 1px solid #f00;
}
</style>

