<template>
  <div class="main-content">
    <a-button icon="cloud-server" @click="onClick" style="margin-right: 15px">
      备份数据
    </a-button>
    <a-button
      type="primary"
      icon="cloud-download"
      @click="onDownload"
      v-if="downloadRrl != ''"
    >
      下载
    </a-button>
  </div>
</template>

<script>
import { dataBackup } from "@/request/api";
export default {
  name: "data-backup",
  components: {},
  data() {
    return {
      downloadRrl: "",
    };
  },
  created() {},
  methods: {
    onClick() {
      dataBackup().then((res) => {
        if (res.state === 0) {
          this.downloadRrl = res.downloadRrl;
          this.$message.success(res.msg);
        }
      });
    },
    onDownload() {
      window.open(this.downloadRrl);
    },
  },
};
</script>

<style lang="less" scoped></style>
