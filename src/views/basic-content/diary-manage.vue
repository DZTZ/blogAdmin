<template>
  <div class="main-content">
    <div style="overflow: hidden">
      <div class="form-left">
        <a-form :form="screenForm" layout="inline">
          <a-form-item label="时间段">
            <a-range-picker v-decorator="['date']" />
          </a-form-item>
          <a-form-item label="">
            <a-input-search
              v-decorator="['keyword']"
              placeholder="关键字查询"
              enter-button
              @search="onSearch"
            />
          </a-form-item>
        </a-form>
      </div>
      <div class="form-right">
        <a-button type="primary" icon="plus" @click="openDialog">
          添加
        </a-button>
      </div>
    </div>
    <div class="table-box">
      <a-table
        :columns="columns"
        :data-source="data"
        :loading="tableLoading"
        :pagination="pagination"
        @change="tableChange"
      >
        <template slot="htmlText" slot-scope="text">
          <p v-html="text" style="max-height: 100px; overflow-y: auto"></p>
        </template>
        <!-- 操作按钮 -->
        <template slot="operate" slot-scope="text, record">
          <a-button
            size="small"
            style="margin: 0 10px 10px 0"
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
      :width="900"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="标题">
          <a-input
            placeholder="标题！"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请输入标题！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="内容">
          <div id="content"></div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import E from "wangeditor";
import moment from "moment/moment";
import { addDiary, diaryList, delectDiary, editDiary } from "@/request/api";
let editor = null;
export default {
  name: "diary-manage",
  components: {},
  data() {
    return {
      screenForm: this.$form.createForm(this),
      form: this.$form.createForm(this),
      addConfirmLoading: false,
      addVisible: false,
      addTitle: "添加数据",
      html: "",
      tableLoading: false,
      editid: "",
      columns: [
        {
          title: "标题",
          dataIndex: "title",
          key: "title",
          width: "20%",
        },
        {
          title: "内容",
          dataIndex: "htmlText",
          key: "htmlText",
          scopedSlots: { customRender: "htmlText" },
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          scopedSlots: { customRender: "createDate" },
          key: "createDate",
          width: "13%",
        },
        {
          title: "编辑时间",
          dataIndex: "editDate",
          key: "editDate",
          width: "13%",
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          scopedSlots: { customRender: "operate" },
          width: "10%",
        },
      ],
      data: [], //表格数据
      pagination: false,
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    newEditor(html) {
      setTimeout(() => {
        if (!editor) {
          editor = new E("#content");
          editor.create();
        }
        if (editor) {
          editor.txt.clear();
          if (html) {
            editor.txt.append(html);
          }
        }
      }, 500);
    },
    getList(page, data) {
      this.tableLoading = true;
      let formData = {
        page,
        pageSize: 6,
      };
      if (data) {
        formData = { ...formData, ...data };
      }
      diaryList(formData).then((res) => {
        if (res.state === 0) {
          this.tableLoading = false;
          let data = res.data;
          let list = data.list.map((item) => {
            item.createDate = moment(item.createDate).format(
              "YYYY-MM-DD HH:mm"
            );
            item.editDate = item.editDate
              ? moment(item.editDate).format("YYYY-MM-DD HH:mm")
              : "还没编辑过哟！";
            return item;
          });
          this.data = list;
          if (data.length > 1) {
            this.pagination = {};
            this.pagination.total = data.length;
            this.pagination.pageSize = 5;
            this.pagination.current = Number.parseInt(data.currentPage);
          } else {
            this.pagination = false;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    onSearch() {
      this.screenForm.validateFields((err, values) => {
        if (values.date && values.date.length != 0) {
          // values.date = [
          //   moment(values.date[0]).format("YYYY-MM-DD"),
          //   moment(values.date[1]).format("YYYY-MM-DD"),
          // ];
          values.date = [
            moment(values.date[0]).unix() * 1000,
            moment(values.date[1]).unix() * 1000,
          ];
        }
        this.getList(1, values);
      });
    },
    openDialog() {
      this.newEditor();
      this.addVisible = true;
    },
    addCancel() {
      this.addVisible = false;
    },
    addOk() {
      this.form.validateFields((err, values) => {
        values.htmlText = editor.txt.html();
        this.addConfirmLoading = true;
        let fun = addDiary;
        if (this.editid !== "") {
          fun = editDiary;
          values._id = this.editid;
        }
        fun(values).then((res) => {
          if (res.state === 0) {
            this.addConfirmLoading = false;
            this.addVisible = false;
            this.$message.success(res.msg);
            this.editid = "";
            this.form.resetFields();
            this.getList();
          } else {
          }
        });
      });
    },
    operateBtn(item, type) {
      if (type === 1) {
        //编辑
        this.addVisible = true;
        this.addTitle = "编辑数据";
        this.editid = item._id;
        setTimeout(() => {
          this.form.setFieldsValue({
            ...item,
          });
        }, 300);
        this.newEditor(item.htmlText);
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
            delectDiary({
              _id: item._id,
            }).then((res) => {
              if (res.state === 0) {
                taht.$message.success(res.msg);
                taht.getList();
              } else {
                taht.$message.success(res.msg);
              }
            });
          },
          onCancel() {},
        });
        return;
      }
    },
    tableChange(pagination) {
      this.getList(pagination.current);
    },
  },
};
</script>

<style lang="less" scoped>
.form-left {
  width: 90%;
  float: left;
}
.form-right {
  width: 10%;
  float: right;
  text-align: right;
}
.table-box {
  padding-top: 20px;
}
</style>
