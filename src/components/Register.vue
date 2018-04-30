<template>
  <div id="Register">
    <h3>欢迎加入猿计划</h3>
    <hr>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="mobile" ref="mobileForm" :rules="rules.mobile">
        <el-input type="text" 
        v-model="ruleForm.mobile" 
        placeholder="请输入手机号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="text" 
        v-model="ruleForm.pass"
        placeholder="请输入昵称,至少3个字符,至多20个字符"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" 
        v-model="ruleForm.pwd"
        placeholder="请输入密码,字母和数字相结合,至少6位密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="rePwd">
        <el-input type="password" 
        v-model="ruleForm.rePwd"
        placeholder="请再次输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="sms_code">
        <el-input v-model.number="ruleForm.sms_code" 
        placeholder="请输入短信验证码"
        style="width:255px"
        >
        </el-input>
        <el-button id="smsBut"
        type="primary" 
        @click="getSmsCode($event)"
        style="width:140px"
        >获取验证码
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" >注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
 
  </div>
</template>

<script>
import Axios from 'axios';
import { parseCode } from '../../static/parseCodeToJSON';
var mobileReg = /^1[34578]\d{9}$/;
var pwdReg = /^[0-9a-zA-Z]{6}/;
export default {
  data() {
    //手机号验证方法
    var checkMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (!mobileReg.test(this.ruleForm.mobile)) {
          callback(new Error('手机号码有误,请重新输入'));
        } else callback();
      }
    };
    //昵称验证方法
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'));
      } else {
        if (this.ruleForm.pass.length < 3) {
          callback(new Error('昵称不能少于3个字符'));
          //把中文替换成两个字节计算
        } else if (
          this.ruleForm.pass.replace(/[^\u0000-\u00ff]/g, 'aa').length > 20
        ) {
          callback(new Error('昵称不能多于20个字符'));
        } else callback();
      }
    };
    //密码验证方法
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'));
        } else if (!pwdReg.test(value)) {
          callback(new Error('密码请使用字母和数字'));
        }
        callback();
      }
    };
    //重复密码验证方法
    var checkRePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        mobile: '',
        pass: '',
        pwd: '',
        rePwd: '',
        sms_code: ''
      },
      //失去焦点,调用方法验证
      rules: {
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
        pass: [{ validator: checkPass, trigger: 'blur' }],
        pwd: [{ validator: checkPwd, trigger: 'blur' }],
        rePwd: [{ validator: checkRePwd, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //验证输入是否正确
      this.$refs[formName].validate(valid => {
        //如果正确,post注册请求
        if (valid) {
          Axios.post('http://www.ftusix.com/static/data/register.php', {
            mobile: this.ruleForm.mobile,
            pwd: this.ruleForm.pwd,
            sms_code: this.ruleForm.sms_code
          })
            .then(response => {
              let data = response.data;
              //注册成功
              //API接口原因,现在无法成功注册
              if (data.status === 1) {
                this.$message({
                  showClose: true,
                  message: data.info,
                  type: 'success'
                });
              } else if (data.status === 0) {
                //注册失败
                this.$message.error({
                  showClose: true,
                  message: data.info
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码
    getSmsCode(event) {
      let t = 60;
      let button = event.target;
      Axios.post('http://www.ftusix.com/static/data/sendsms.php', {
        mobile: this.ruleForm.mobile
      })
        .then(res => {
          let data = res.data;
          //获取成功
          if (data.status === 1) {
            button = document.getElementById('smsBut');
            button.disabled = true;

            this.ruleForm.sms_code = data.data.code;
            button.innerText = `${t--}秒后重新获取`;
            let timer = setInterval(() => {
              if (t === 0) {
                clearInterval(timer);
                button.innerText = '获取验证码';
                button.disabled = false;
              } else {
                button.innerText = `${t--}秒后重新获取`;
              }
            }, 1000);
            // this.$router
          } else if (data.status === 0) {
            //获取失败
            this.$message.error({
              showClose: true,
              message: data.info
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#Register {
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
#Register hr {
  width: 415px;
  height: 2px;
  border: none;
  margin-bottom: 25px;
  margin-left: 68px;
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
