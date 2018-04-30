<template>
  <div id="articleid">
    {{data.title}}
    {{data.nick_name}}
    {{data.modify_time}}
    浏览{{data.browser_num}}
    评论{{data.comment_num}}

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
    >
      <el-table-column prop="nick_name">
      </el-table-column>

      <el-table-column prop="comment"> 
      </el-table-column>

      <el-table-column prop="date">  
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import state from '../../store/state';
import Axios from 'axios'

export default {
  data() {
    return {
      data: state.article.data,
      iszan: state.article.iszan,
      iscoll: state.article.iscoll,
      input: '',
      tableData: []
    }

  },
  created() {
    this.getCommentList();
  },
  methods: {
    collect() {
      this.iscoll = this.iscoll ? false : true;
      if (this.iscoll) {
        Axios.post("http://www.ftusix.com/static/data/zan.php",{
          "user_id": state.user[0].user_id,
          "topic_id": this.data.topic_id,
          "type": "coll"
        })
        .then( res => {
          let data = res.data;
          if ( data.status !== 1 ) {
            this.$message.error({
              showClose: true,
              message: data.info
            });
          }
        })       
      }    
    },
    like() {
      this.iszan = this.iszan ? false : true;
      if (this.iszan) {
        Axios.post("http://www.ftusix.com/static/data/zan.php",{
          "user_id": state.user[0].user_id,
          "topic_id": this.data.topic_id,
          "type": "zan"
        })
        .then( res => {
          let data = res.data;
          if ( data.status !== 1 ) {
            this.$message.error({
              showClose: true,
              message: data.info
            });
          }
        })       
      } 
    },
    comment() {
      Axios.post("http://www.ftusix.com/static/data/comment.php",{
        "user_id": state.user[0].user_id,
        "topic_id": this.data.topic_id,
        "comment": this.input
      })
      .then( res => {
        let data = res.data;
        if ( data.status === 1 ) {
          this.getCommentList();
          this.input = '';
        }
      })  
    },
    getCommentList() {
      Axios.get("http://www.ftusix.com/static/data/commentList.php",{
        params: {
          "topic_id": this.data.topic_id,
        }       
      })
      .then( res => {
        let data = res.data;
        console.log(data)
        if ( data.status === 1 ) {         
          this.tableData = data.data;
        }
      }) 
    }
  }
};
</script>




<style >
#articleid {
  max-width: 1100px;
  margin: 20px auto;
}
#articleid hr {
  height: 1px;
  width: 100%;
}
#articleid .icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
   font-size: 25px;
   color: #f00;
}
#articleid .number {
  width: 200px;
  height: 40px;
  line-height: 40px;
  padding-top: 5px;
  border-radius: 15px;
  border: 1px solid #f00; 
  color: #f00;
}
#articleid .number span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  cursor: pointer;
}
#articleid .collect {
  border-right: 1px solid;
}
#articleid .el-textarea__inner {
  margin-top: 20px;
  resize: none;
}

#articleid .el-button {
  margin-top: 20px;
  float: right;
}
</style>

