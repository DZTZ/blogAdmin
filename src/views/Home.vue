<template>
  <a-layout style="height: 100%">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{ !collapsed ? "BlogAdmin" : "Blog" }}</div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="$store.state.selectedKeys"
      >
        <a-menu-item key="/article-manage">
          <router-link to="/article-manage">
            <a-icon type="unordered-list" />
            <span>文章管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/picture-manage">
          <router-link to="/picture-manage">
            <a-icon type="file-image" />
            <span>图片管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/data-backup">
          <router-link to="/data-backup">
            <a-icon type="database" />
            <span>数据备份</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="header-right-box">
          <span class="name">Admin</span>
          <!--          <a-icon type="close-square" class="close" />-->
        </div>
      </a-layout-header>
      <a-layout-content class="main-contnet">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      collapsed: false,
    };
  },
  created() {},
};
</script>
<style lang="less" scoped>
//@import url("~ant-design-vue/dist/antd.less");
.main-contnet {
  background: #ffffff;
  padding: 24px;
  margin: 24px 16px;
  min-height: auto !important;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.logo {
  height: 32px;
  margin: 16px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
}
.header-right-box {
  float: right;
  padding: 0 16px;
  .name {
    padding: 0 15px;
    font-size: 18px;
  }
  .close {
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: #3e91f7;
    }
  }
}
</style>
