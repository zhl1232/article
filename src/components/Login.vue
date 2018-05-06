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
      <el-checkbox v-model="checked">下次自动登录</el-checkbox>

      <router-link to="">
        <a href="javascript:void(0)" class="forget">忘记密码</a>
      </router-link>
      <router-link to="/register">
        <a href="javascript:void(0)" class="reg">立即注册</a>
      </router-link>

      <el-form-item class="login-btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      
    </el-form>

  </div>
</template>
<script>
import Axios from 'axios';

export default {
  data() {
    return {
      checked: false,
      form: {
        mobile: '',
        pwd: ''
      }
    };
  },
  methods: {
    onSubmit() {
      Axios.post('http://www.ftusix.com/static/data/login.php', {
        mobile: this.form.mobile,
        pwd: this.form.pwd
      }).then(res => {
        let data = res.data;
        if (data.status === 0) {
          this.$message.error({
            showClose: true,
            message: data.info
          });
        } else if (data.status === 1) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          });
          this.$store.commit('SET_USER', data.data);
          sessionStorage.setItem('user', JSON.stringify(data.data));

          let date = new Date();
          if (this.checked) {
            localStorage.setItem('time', date.setDate(date.getDate() + 7));
            localStorage.setItem('user', JSON.stringify(data.data));
            //保存到cookie
            // setCookie('user',JSON.stringify(data.data),7)
          }

          this.$router.push({
            path: '/index'
          });
        }
      });
    }
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

#Login input:focus {
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

#Login .el-form-item__content {
  margin: auto;
  width: 400px;
}

#Login .el-button--danger {
  width: 140px;
  margin-top: 25px;
  font-size: 1.1em;
}
#Login .el-button--danger span {
  margin-left: 15px;
  letter-spacing: 1.6em;
}
#Login a {
  text-decoration: none;
  font-size: 14px;
  margin-left: 10px;
}
#Login .reg {
  color: #f00;
}
#Login .forget {
  color: #7e8c8d;
}
.login-btn {
  margin: 20px 0;
}
#Login .el-checkbox {
  margin-right: 80px;
}
</style>