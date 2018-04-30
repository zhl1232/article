<template>
  <div id="mynote">
    我的帖子
    <hr>
    <!-- <button @click="getList">123</button> -->
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        label="主题"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>      
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
          <span>{{ scope.row.modify_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button            
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button            
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
  </div>
</template>
<script>
import Axios from 'axios';
import state from '../../store/state';

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    //获取文章列表
    this.getList();
  },
  compumted: {
    myInfo() {
      return JSON.parse(sessionStorage.getItem('user'));
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除文章
    handleDelete(row) {
      Axios.post('http://www.ftusix.com/static/data/delete.php', {
        user_id: state.user[0].user_id, //  用户id
        topic_id: row.topic_id //如果为编辑状态则加上文章id
      }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.status === 1) {
          this.getList();
          this.$message.success({
            showClose: true,
            message: data.info
          });
        }
      });
    },
    //获取文章列表函数
    getList() {
      Axios.get('http://www.ftusix.com/static/data/myNote.php', {
        params: {
          user_id: state.user[0].user_id,
          page: 1
        }
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {
          this.tableData = data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            // this.tableData[i].type =
            const time = new Date(this.tableData[i].modify_time * 1000);

            this.tableData[i].modify_time = time;
            // console.log(this.tableData[i].modify_time)
          }
        }
      });
    }
    // timetrans(date) {
    //   var Y = date.getFullYear() + '-';
    //   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //   var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    //   var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    //   var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    //   var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    //   return Y+M+D+h+m+s;
    // }
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
  text-align: left;
}
#mynote ul {
  position: absolute;
  right: 80px;
  width: 400px;
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
.el-table th > .cell {
  text-align: center;
}
.el-table th:nth-child(1) > .cell {
  text-align: left;
}
</style>