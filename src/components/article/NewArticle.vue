<template>
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


</template>

<script>
import Axios from 'axios';
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      Axios.get('http://www.ftusix.com/static/data/topicList.php', {
        params: {
          type: 0,
          sort: 'new',
          page: 1,
          index: true
        }
      }).then(res => {
        let data = res.data;
        console.log(data);
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
          console.log(data);
          this.$store.commit('SET_ARTICLE', data);
          this.$router.push({
            path: '/article/' + res.data.data.topic_id
          });
        }
      });
    }
  }
};
</script>

<style >
/* #topic {
  position: relative;
  display: inline-block;
  width: 800px;
} */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #cc8565;
}
#topic tr {
  border: 10px solid #000;
  /* background: #e6dcdc; */
}
#topic tr .cell {
  text-align: left;
}
</style>