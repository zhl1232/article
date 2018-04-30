<template>
  <div id="Login">
    <h3>欢迎登录猿计划</h3>
    <hr>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-input 
        v-model="form.mobile"
        placeholder="请输入登录手机号"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
        type="password"
        v-model="form.pwd"
        placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
 
  </div>
</template>
<script>
import Axios from "axios";

export default {
  data() {
    return {
      form: {
        mobile: "13834453058",
        pwd: "123456"
      }
    };
  },
  methods: {
    onSubmit() {
      Axios.post("http://www.ftusix.com/static/data/login.php", {
        mobile: this.form.mobile,
        pwd: this.form.pwd
      }).then(res => {
        let data = res.data;
        console.log(data)
        if (data.status === 0) {
          this.$message.error({
            showClose: true,
            message: data.info
          });
        } else if (data.status === 1) {
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success"
          });
          this.$store.commit("SET_USER", data.data);

          sessionStorage.setItem("user", JSON.stringify(data.data));

          this.$router.push({
            path: "user/userinfo"
          });
        }
      });
    },
   
  }
};
</script>


<style>
#Login {
  width: 550px;
  height: 650px;
  padding-top: 30px;
  background-color: #fff;
  margin: 10px auto;
}
input {
  width: 400px;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
  border: 1px solid #ccc;
  outline: none;
}

input:focus {
  border: 1px solid #f00;
}
#Login hr {
  width: 410px;
  height: 2px;
  border: none;
  margin-left: 73px;
  margin-bottom: 25px;
  background: #000;
}

.el-form-item__content {
  margin: auto;
  width: 400px;
}

.el-button--danger {
  width: 140px;
  margin-top: 25px;
  font-size: 1.1em;
}
.el-button--danger span {
  margin-left: 15px;
  letter-spacing: 1.6em;
}
</style>