<template>
  <div id="mynote">
    <span style="float:left">我的帖子</span> 
    <hr>
    <!-- <button @click="getList">123</button> -->
    <el-table
    :data="tableData"
    style="width: 100%"
    height="760"
    @row-click="content($event)">
      <el-table-column
        label="主题"
        width="300">
        <template slot-scope="scope">
          <span >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="90">
        <template slot-scope="scope">
          <span>{{scope.row.type | type}}</span>      
        </template>
      </el-table-column>
      <el-table-column
        label="回复"
        width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.comment_num }}</span>      
        </template>
      </el-table-column>
      <el-table-column
        label="浏览"
        width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.browser_num }}</span>      
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="120">
        <template slot-scope="scope" >
          <span v-html="scope.row.modify_time" class="time"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button            
            @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button            
            @click.stop="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <el-pagination
      layout="total, prev, pager, next"
      :total="listCount"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 后台返回参数只显示一页,暂时取消分页 -->
  </div>
</template>
<script>
import Axios from 'axios';
import state from '../../store/state';

export default {
  data() {
    return {
      tableData: [],
      listCount: 0,
      currentPage: 1
    };
  },
  created() {
    //获取文章列表
    this.getList(this.currentPage);
  },
  compumted: {
    myInfo() {
      return JSON.parse(sessionStorage.getItem('user'));
    },
  },
  methods: {
    //编辑文章
    handleEdit(row) {
      Axios.get('http://www.ftusix.com/static/data/content.php', {
        params: {
          user_id: state.user[0].user_id,
          topic_id: row.topic_id
        }
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {
          this.$store.commit('SET_ARTICLE', data);
          this.$store.commit('ISEDIT', true);
          this.$router.push({
            path: '/write/' + row.topic_id
          });
        }
      });    
    },
    //删除文章
    handleDelete(row) {
      Axios.post('http://www.ftusix.com/static/data/delete.php', {
        user_id: state.user[0].user_id, //  用户id
        topic_id: row.topic_id //如果为编辑状态则加上文章id
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {
          this.getList(this.currentPage);
          this.$message.success({
            showClose: true,
            message: data.info
          });
        }
      });
    },
    //获取文章列表函数
    getList(page) {
      Axios.get('http://www.ftusix.com/static/data/myNote.php?page=' + page, {
        params: {
          user_id: state.user[0].user_id
        }
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {

          this.tableData = data.data;
          this.listCount = Number(data.commentList[0]);
          for (let i = 0; i < this.tableData.length; i++) {
            const time = new Date(this.tableData[i].modify_time * 1000);
            const data = this.timetrans(time)
            this.tableData[i].modify_time = data; 
          }
        }
      });
    },
    //文章详情
    content(event) {
      Axios.get('http://www.ftusix.com/static/data/content.php', {
        params: {
          user_id: state.user[0].user_id,
          topic_id: event.topic_id
        }
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {

          this.$store.commit('SET_ARTICLE', data);
          this.$router.push({
            path: '/article/' + data.data.topic_id
          });
        }
      });
    },
    //换页
    handleCurrentChange(val) {
      this.getList(val)
    },
    //时间戳转换函数
    timetrans(date) {
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '<br>' ;
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y+M+D+h+m+s;
    }
  }
};
</script>


<style>
#mynote {
  position: relative;
  display: inline-block;
  width: 800px;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 20px;
}

#mynote li {
  float: left;
  list-style: none;
  margin: 0 20px;
  cursor: pointer;
}
#mynote hr {
  margin-top: 40px;
}
#mynote .el-table th > .cell {
  text-align: center;
}
#mynote .el-table td:nth-child(1) > .cell {
  text-align: left;
}
#mynote .time {
  display: block;
  text-align: center;
}

tr td:last-child .cell {
  text-align: center;
}
#mynote .el-pagination li {
  margin: 0;
}
#mynote .el-pagination {
  display: inline-block;
  margin: 0 auto;
  text-align: center;
}
</style>