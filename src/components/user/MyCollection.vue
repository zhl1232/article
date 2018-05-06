<template>
  <div id="mycollection">
    <span style="float:left">我的收藏</span> 
    <hr>
    <el-table
    :data="tableData"
    style="width: 100%"
    height="760"
     @row-click="content($event)">
      <el-table-column
        label="主题"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type | type }}</span>      
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
          <span class="time" v-html="scope.row.modify_time"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click.stop="handleCancelColl(scope.row)">
            取消收藏
          </el-button>
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
    //获取收藏列表
    this.getList(this.currentPage);
  },
  compumted: {
    myInfo() {
      return JSON.parse(sessionStorage.getItem('user'));
    }
  },
  methods: {
    //取消收藏
    handleCancelColl(row) {
      Axios.post('http://www.ftusix.com/static/data/zan.php', {
        user_id: state.user[0].user_id,
        topic_id: row.topic_id,
        type: 'coll'
      }).then(res => {
        let data = res.data;
        if (data.status === 1) {
          this.getList(this.currentPage); 
        } else {
          this.$message.error({
            showClose: true,
            message: data.info
          });
        }
      });   
    },
    //获取收藏列表函数
    getList(page) {
      Axios.get('http://www.ftusix.com/static/data/myColl.php?page=' + page, {
        params: {
          user_id: state.user[0].user_id
        }
      }).then(res => {
        let data = res.data;
        console.log(data)
        if (data.status === 1) {
          this.listCount = Number(data.commentList[0]);
          console.log(this.listCount)
          this.tableData = data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            const time = new Date(this.tableData[i].modify_time * 1000);
            const data = this.timetrans(time)
            this.tableData[i].modify_time = data; 
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.getList(val)
    },
    //文章详情
    content(event) {
      console.log(event)
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
            path: '/article/' + res.data.data.topic_id
          });
        }
      });
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
#mycollection {
  position: relative;
  display: inline-block;
  width: 800px;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 20px;
}

#mycollection li {
  float: left;
  list-style: none;
  margin: 0 20px;
  cursor: pointer;
}
#mycollection hr {
  margin-top: 40px;
}
#mycollection .el-table th > .cell {
  text-align: center;
}
#mycollection .el-table td:nth-child(1) > .cell {
  text-align: left;
}
#mycollection .el-pagination li {
  margin: 0;
}
#mycollection .el-pagination {
  display: inline-block;
  text-align: center;
}
#mycollection .time {
  display: block;
  text-align: center;
}
</style>