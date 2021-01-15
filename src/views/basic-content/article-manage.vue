<template>
  <div class="main-content">
    <div class="picker-box">
      <a-range-picker @change="onChange" />
    </div>
    <div class="form-box">
      <a-input-search placeholder="关键字查询" enter-button @search="onSearch" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    onSearch() {
      console.log(1);
    },
    onChange(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less" scoped>
.t {
  display: inline-block;
  vertical-align: middle;
}
.form-box {
  min-width: 200px;
  .t();
}
.picker-box {
  margin-right: 10px;
  .t();
}
</style>
