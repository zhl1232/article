<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      id="topic"
      :show-header="false"
      @row-click="content($event)"
      >
      <el-table-column
        prop="title">
      </el-table-column>
      <el-table-column
        prop="comment_num"
        width="70px">
        <template slot-scope="scope">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-comments"></use>
          </svg>
          <span>{{ scope.row.comment_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="like_num"
        width="50px">
        <template slot-scope="scope">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-good"></use>
          </svg>
          <span>{{ scope.row.like_num }}</span>
        </template>
      </el-table-column>
      
      
    </el-table>

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
export default {
  data() {
    return {
      tableData: [],
      listCount: 0,
      currentPage: 1
    };
  },
  created() {
    this.getList(this.currentPage);
  },
  methods: {
    getList(page) {
      Axios.get('http://www.ftusix.com/static/data/topicList.php?page=' + page , {
        params: {
          type: 0,
          sort: 'new',
          index: false
        }
      }).then(res => {
        let data = res.data;
        this.listCount = Number(data.listCount[0]);
        if (data.status === 1) {
          this.tableData = data.data;
        }
      });
    },
    content(event) {
      Axios.get('http://www.ftusix.com/static/data/content.php', {
        params: {
          user_id: event.user_id,
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
    handleCurrentChange(val) {
      this.getList(val)
    }
  }
};
</script>

<style >

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #cc8565;
}
.el-table {
  height: 550px;
}
</style>