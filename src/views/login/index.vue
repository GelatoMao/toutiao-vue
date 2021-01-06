<template>
  <div class="login-form-wrap">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹

      配置Form表单验证
      1.必须给el-form组件绑定model为表单数据对象
      2.给需要验证的表单项el-form-item绑定prop属性 注意：prop属性需要指定表单对象中的数据名称
      3.通过el-form组件的rules属性配置验证规则
      具体的验证规则可以参考：https://github.com/yiminghe/async-validator
      如果内置的验证规则不满足，也可以自定义验证规则

      手动触发表单验证
      1、给 el-form 设置 ref 起个名字（随便起名，不要重复即可）
      2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
    -->
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 密码
        agree: false // 是否同意协议
      },
      loginLoading: false, // 登录的loading状态
      formRules: {
        // 表单验证规则配置
        // 要验证的数据名称 规则列表[]
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请输入正确的手机号格式',
            trigger: 'change'
          }
        ],
        code: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的密码格式',
            trigger: 'change'
          }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过 callback()
            // 验证失败 callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 1.获取表单数据 (根据接口要求绑定数据)
      // const user = this.user;
      // 2.表单验证 validate方法是异步的
      this.$refs['login-form'].validate(valid => {
        // valid为false 没有通过 为true 验证通过 如果表单验证失败 停止提交return
        if (!valid) {
          return
        }
        // 验证通过 请求登录
        this.login()
      })
    },
    login () {
      // 开启登录中 loading....
      this.loginLoading = true
      // 验证通过 提交登录
      login(this.user)
        .then(res => {
          console.log(res)
          // 使用了message消息组件 登录成功提示
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          // 登录成功 关闭loading
          this.loginLoading = false
        })
        .catch(err => {
          console.log(err)
          // 登录失败消息提示
          this.$message.error('登录失败，手机号或密码错误')
          // 登录失败 关闭loading
          this.loginLoading = false
        })
      // 处理后端响应结果
      // 成功 xxx 失败 xxx
    }
  }
}
</script>

<style scoped lang="less">
.login-form-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
