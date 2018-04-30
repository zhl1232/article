<template>
  <div id="userinfo">
    个人信息
    <hr>
    <span>个性头像</span>
    <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    >
      <!-- <img v-if="avatar" :src="avatar" class="avatar"> 
           返回头像地址无效,暂时写成静态地址
      -->
      <img v-if="avatar" src="../../assets/images/face.jpg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon">
      </i>    
    </el-upload>
    <div class="item">
       <h4>注册手机号</h4>{{mobile}}
    </div>
    <div class="item">
      <h4>昵称</h4>
      <el-input v-model="nick_name" style="width:250px"></el-input>
    </div>
    <div class="item">
      <h4>性别</h4>
      <el-radio v-model="sex" label='1'>男</el-radio>
      <el-radio v-model="sex" label='2'>女</el-radio>
    </div>
    <br>
    <el-button type='primary' @click='changeInfo' class='btn'>提交</el-button>
  </div>
</template>

<script>
import state from "../../store/state";
import Axios from 'axios';
export default {
  data() {
    return {
      mobile: state.user[0].mobile,
      user_id: state.user[0].user_id,
      token: state.user[0].token,
      nick_name: state.user[0].nick_name,
      avatar: state.user[0].avatar,
      sex: state.user[0].sex + "" //默认label要匹配字符串,API返回数值
    };
  },
  computed: {
    myInfo() {
      return JSON.parse(sessionStorage.getItem("user"));
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
      state.user.avatar = this.avatar;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeInfo() {
      Axios.post("http://www.ftusix.com/static/data/update.php",{
        sex: this.sex,
        nick_name: this.nick_name,
        token: this.token
      })
      .then( res => {
        let data = res.data;
        console.log(data)
        if ( data.status === 1 ) {        
          this.$store.commit("SET_USER", data);
          sessionStorage.setItem("user", JSON.stringify(data));

          this.$message({
            showClose: true,
            message: data.info,
            type: "success"
          });
        }
        
      })
      
    }
  }
};
</script>




<style >
#userinfo {
  display: inline-block;
  width: 800px;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
hr {
  width: 800px;
  height: 2px;
  background: #000;
  margin: 10px auto;
}
#userinfo img {
  width: 70px;
  height: 70px;
  border: 1px solid #000;
}
#userinfo i {
  position: relative;
  width: 70px;
  height: 70px;
}
#userinfo i::before {
  position: absolute;
  top: -50px;
  left: 22px;
}
#userinfo h4 {
  display: inline;
  margin-right: 20px;
}
#userinfo .item {
  margin: 40px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
