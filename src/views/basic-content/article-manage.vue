<template>
  <div class="main-content">
    <div style="overflow: hidden">
      <div class="form-left">
        <!-- <div class="picker-box">
          <a-range-picker @change="onChange" />
        </div> -->
        <div class="form-box">
          <a-input-search
            v-model="keyword"
            placeholder="关键字查询"
            enter-button
            @search="onSearch"
          />
        </div>
      </div>
      <div class="form-right">
        <a-button type="primary" @click="addVisible = true"> 添加 </a-button>
      </div>
    </div>

    <div class="table-box">
      <a-table
        :columns="columns"
        :data-source="data"
        :loading="tableLoading"
        :pagination="false"
        :scroll="{ x: 2000 }"
      >
        <!-- 类型 -->
        <template slot="projectType" slot-scope="text">
          {{ text == 1 ? "移动" : "pc" }}
        </template>
        <!-- 预览图 -->
        <template slot="previewImg" slot-scope="text">
          <img
            v-for="(item, index) in text"
            :key="item"
            :src="item"
            class="preview-img"
            @click="onCheckListImg(text, index)"
          />
        </template>
        <!-- 预览地址 -->
        <template slot="browseAddress" slot-scope="text">
          <img
            v-for="(item, index) in text"
            :key="item"
            :src="item"
            class="preview-img"
            @click="onCheckListImg(text, index)"
          />
        </template>
        <!-- 操作按钮 -->
        <template slot="operate" slot-scope="text, record">
          <a-button
            size="small"
            style="margin-right: 10px"
            @click="operateBtn(record, 1)"
          >
            编辑
          </a-button>
          <a-button type="danger" size="small" @click="operateBtn(record, 2)">
            删除
          </a-button>
        </template>
      </a-table>
    </div>
    <!-- 添加数据 对话框 -->
    <a-modal
      :title="addTitle"
      :visible="addVisible"
      :confirm-loading="addConfirmLoading"
      @ok="addOk"
      @cancel="addCancel"
      :width="700"
    >
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="项目类型">
          <a-radio-group v-decorator="['projectType', { initialValue: 1 }]">
            <a-radio :value="1"> 移动端</a-radio>
            <a-radio :value="2"> pc端 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="项目名称">
          <a-input
            placeholder="项目名称！"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入项目名称！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="项目类型">
          <a-input
            placeholder="例如：微信小程序、H5"
            v-decorator="[
              'tag',
              {
                rules: [{ required: true, message: '请输入项目类型！' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="项目简介">
          <a-textarea
            placeholder="项目简介"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            v-decorator="[
              'brief',
              {
                rules: [{ required: true, message: '请输入项目简介！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="技术栈">
          <a-textarea
            placeholder="技术栈"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            v-decorator="[
              'technology',
              {
                rules: [{ required: true, message: '请输入项目技术栈！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="项目预览图">
          <div class="preview-list">
            <div
              class="item-box"
              v-for="(item, index) in previewfFleList"
              :key="index"
              @click="onCheck(index, 1, '')"
            >
              <img :src="item.url" :alt="item.name" id="src" />
              <a-icon
                type="delete"
                class="delect"
                @click.stop="onCheck(index, 2, '')"
              />
            </div>
          </div>
          <a-upload
            name="file"
            accept="image/*"
            :showUploadList="false"
            :multiple="true"
            :beforeUpload="beforeUpload"
            list-type="picture-card"
            :file-list="previewfFleList"
          >
            <div v-if="previewfFleList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="项目预览地址">
          <div class="preview-list">
            <div
              class="item-box"
              v-for="(item, index) in previewfFleList2"
              :key="index"
              @click="onCheck(index, 1, 2)"
            >
              <img :src="item.url" :alt="item.name" id="src" />
              <a-icon
                type="delete"
                class="delect"
                @click.stop="onCheck(index, 2, 2)"
              />
            </div>
          </div>
          <a-upload
            name="file"
            accept="image/*"
            :showUploadList="false"
            :multiple="true"
            :beforeUpload="beforeUpload2"
            list-type="picture-card"
            :file-list="previewfFleList2"
          >
            <div v-if="previewfFleList2.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 查看大图 -->
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="previewVisibleCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import {
  addArticle,
  uploadFile,
  articleList,
  delectArticle,
  editArticle,
} from "@/request/api";
import moment from "moment/moment";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      addVisible: false,
      addTitle: "添加数据",
      tableLoading: false,
      addConfirmLoading: false,
      form: this.$form.createForm(this),
      previewVisible: false, //查看大图 状态
      previewImage: "", //查看大图地址
      previewfFleList: [], //项目预览列表
      previewfFleList2: [], //项目预览地址列表
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          width: "10%",
        },
        {
          title: "终端",
          dataIndex: "projectType", //1 移动 2 pc
          key: "projectType",
          scopedSlots: { customRender: "projectType" },
          width: "6%",
        },
        {
          title: "类型",
          dataIndex: "tag",
          key: "tag",
          width: "5%",
        },
        {
          title: "简介",
          dataIndex: "brief",
          key: "brief",
          width: "15%",
        },
        {
          title: "技术栈",
          dataIndex: "technology",
          key: "technology",
          width: "15%",
        },
        {
          title: "预览图",
          dataIndex: "previewImg",
          key: "previewImg",
          scopedSlots: { customRender: "previewImg" },
          width: "15%",
        },
        {
          title: "浏览地址",
          dataIndex: "browseAddress",
          key: "browseAddress",
          scopedSlots: { customRender: "browseAddress" },
          width: "10%",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          scopedSlots: { customRender: "createDate" },
          key: "createDate",
          width: "8%",
        },
        {
          title: "编辑时间",
          dataIndex: "editDate",
          key: "editDate",
          width: "8%",
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          scopedSlots: { customRender: "operate" },
          fixed: "right",
          width: "140",
        },
      ],
      data: [], //表格数据
      editid: "", //编辑id
      delectImgData: [], //删除图片的记录 传给后端
      keyword: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onSearch() {
      this.getList(this.keyword);
    },
    getList(keyword) {
      this.tableLoading = true;
      articleList({ keyword: keyword }).then((res) => {
        if (res.state === 0) {
          let data = res.data;
          data.map((item) => {
            item.createDate = moment(item.createDate).format(
              "YYYY-MM-DD HH:mm"
            );
            item.editDate = item.editDate
              ? moment(item.editDate).format("YYYY-MM-DD HH:mm")
              : "还没编辑过哟！";
          });
          this.data = data;
        } else {
          this.$message.success(res.msg);
        }
        this.tableLoading = false;
      });
    },
    addCancel() {
      this.addVisible = false;
      this.emptyForm();
    },
    addOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.addConfirmLoading = true;
          let fileList = [...this.previewfFleList, ...this.previewfFleList2];
          let promiseList = fileList.map((item) =>
            this.uploadFilePromise(item)
          ); //获取promise 队列数组
          Promise.all(promiseList).then((result) => {
            let previewImg = [],
              browseAddress = [];
            result.map((res) => {
              //1是内部预览图 2预览地址
              if (res.dataType === 1) {
                previewImg.push(res.url);
              } else {
                browseAddress.push(res.url);
              }
            });
            values.previewImg = previewImg;
            values.browseAddress = browseAddress;
            let fun = addArticle;
            if (this.editid !== "") {
              fun = editArticle;
              values._id = this.editid;
              values.delectImgData = this.delectImgData;
            }
            fun(values).then((res) => {
              if (res.state === 0) {
                this.$message.success(res.msg);
                this.getList();
              } else {
                this.$message.error(res.msg);
              }
              this.emptyForm();
              this.addConfirmLoading = false;
              this.addVisible = false;
            });
          });
        }
      });
    },
    //清空表单
    emptyForm() {
      this.form.resetFields();
      this.previewfFleList = [];
      this.previewfFleList2 = [];
      this.delectImgData = [];
      this.editid = "";
    },
    //上传文件
    uploadFilePromise(file) {
      return new Promise(function (resolve, reject) {
        //如果只有两个属性 不需要上传
        if (Object.keys(file).length === 2) {
          resolve(file);
        } else {
          let formData = new FormData();
          formData.append("file", file);
          uploadFile(formData).then((res) => {
            if (res.state === 0) {
              resolve({
                dataType: file.dataType,
                url: res.data.url,
              });
            } else {
              reject(res);
            }
          });
        }
      });
    },
    // 上传之前
    beforeUpload(file) {
      this.beforFun(file, 1);
      return false;
    },
    // 上传之前
    beforeUpload2(file) {
      this.beforFun(file, 2);
      return false;
    },
    beforFun(file, type) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("请上传图片!");
        return;
      }
      file.url = window.URL.createObjectURL(file);
      if (type == 1) {
        file.dataType = 1;
        let list = this.previewfFleList;
        this.previewfFleList = [...list, ...[file]];
      } else {
        file.dataType = 2;
        let list = this.previewfFleList2;
        this.previewfFleList2 = [...list, ...[file]];
      }
    },
    previewVisibleCancel() {
      this.previewVisible = false;
    },
    onCheck(index, type, imgType) {
      if (type === 1) {
        this.previewVisible = true;
        this.previewImage = this[`previewfFleList${imgType}`][index].url;
      } else {
        let list = this[`previewfFleList${imgType}`];
        if (Object.keys(list[index]).length === 2) {
          let tempStr = list[index].url;
          var newString = tempStr.substring(
            tempStr.lastIndexOf("/") + 1,
            tempStr.length
          );
          this.delectImgData.push(newString);
        }
        this[`previewfFleList${imgType}`].splice(index, 1);
      }
    },
    onCheckListImg(item, index) {
      this.previewVisible = true;
      this.previewImage = item[index];
    },
    operateBtn(item, type) {
      if (type === 1) {
        //编辑
        console.log(item);
        this.addVisible = true;
        this.addTitle = "编辑数据";
        this.editid = item._id;
        let browseAddress = [],
          previewImg = [];
        if (item.previewImg) {
          previewImg = item.previewImg.map((item) => {
            return { dataType: 1, url: item };
          });
        }
        if (item.browseAddress) {
          browseAddress = item.browseAddress.map((item) => {
            return { dataType: 2, url: item };
          });
        }
        this.previewfFleList = previewImg;
        this.previewfFleList2 = browseAddress;
        setTimeout(() => {
          this.form.setFieldsValue({
            ...item,
          });
        }, 300);
      } else {
        //删除
        let taht = this;
        this.$confirm({
          title: "删除",
          content: "确定删除这条数据？",
          okText: "是",
          okType: "danger",
          cancelText: "否",
          onOk() {
            delectArticle({ _id: item._id }).then((res) => {
              if (res.state === 0) {
                taht.$message.success(res.msg);
                taht.getList();
              } else {
                taht.$message.success(res.msg);
              }
            });
          },
          onCancel() {
          },
        });
        return;
      }
    },
  },
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
.main-content {
  overflow: hidden;
}
.form-left {
  width: 90%;
  float: left;
}
.form-right {
  width: 10%;
  float: right;
  text-align: right;
}
/deep/ .ant-form-item {
  margin: 0 0 10px !important;
}
.preview-list {
  display: inline-block;
  vertical-align: super;
  .item-box {
    display: inline-block;
    position: relative;
    .delect {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  img {
    width: 102px;
    height: 102px;
    margin: 0 5px 5px 0;
    border-radius: 4px;
    cursor: pointer;
  }
}
/deep/ .ant-upload-picture-card-wrapper {
  vertical-align: bottom;
  width: auto;
}
.table-box {
  padding-top: 20px;
  .preview-img {
    width: 50px;
    height: 50px;
    margin: 0 5px 5px 0;
  }
}
</style>
