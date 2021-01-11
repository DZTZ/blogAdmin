<template>
  <div class="Login">
    <div class="content">
      <div class="input-box">
        <h3 class="title">LOGIN</h3>
        <div class="account">
          <input type="text" placeholder="ACCOUNT" v-mode="account" />
        </div>
        <div class="password">
          <input type="password" placeholder="PASSWORD" v-mode="password" />
        </div>
      </div>
      <a-alert type="error" message="Error text" banner />
      <div class="btn-box bold">
        SIGN IN
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      account: "",
      password: ""
    };
  },
  created() {},
  methods: {
    onLoad() {
      console.log(123);
    }
  }
};
</script>

<style lang="less" scoped>
.Login {
  background: url("~@/assets/images/bg.jpg") no-repeat center;
  background-size: cover;
  height: 100%;
  .content {
    overflow: hidden;
    background: #ffffff;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "微软雅黑", "黑体", "宋体";
    .input-box {
      padding: 25px 30px;
    }
    .title {
      color: #3b495d;
      font-size: 24px;
    }
    .account input,
    .password input {
      border-bottom: 1px solid #e7e7e7;
      width: 100%;
      padding: 10px 0;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
  .btn-box {
    border-top: 1px solid #e7e7e7;
    padding: 14px;
    text-align: center;
    font-size: 12px;
    background: #313b51;
    color: #ffffff;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
      background: #495e77;
    }
  }
}
</style>
