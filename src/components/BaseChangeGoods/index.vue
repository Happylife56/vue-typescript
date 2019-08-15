// 添加商品
<template>
  <div class="add-goods-panel">
    <el-row>
      <el-col :span="7">
        <el-input
          v-model.trim="goodsSearch"
          placeholder="请输入商品名称或者商品编号"
          @keyup.enter.native="getShopDataList()"
        >
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            @click="getShopDataList()"
          >
          </i>
        </el-input>
      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      class="mt20"
    >
      <el-col :span="16">
        <div class="table">
          <el-table
            ref="goodsTable"
            v-loading="dialogLoading"
            :data="goodsListData"
            size="medium"
            tooltip-effect="light"
            class=""
            @select="handleSelectionChange"
            @select-all="allSelectionChange"
            @row-click="rowClick"
          >
            <el-table-column
              type="selection"
              :selectable="checkSelection"
              width="55"
            >
            </el-table-column>
            <el-table-column
              v-for="(item, index) in tableColumn"
              :key="index"
              :label="item.label"
              show-overflow-tooltip
              :property="item.prop"
            >
              <template slot-scope="scope">
                {{ scope.row[item.prop] }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          v-if="totalElements > 10"
          class="tool-panel text-right"
        >
          <div></div>
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next,total, jumper"
            :total="totalElements"
            class="mt20"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-col>

      <el-col :span="8">
        <el-card
          class="card-panel"
          shadow="never"
          body-style="{padding:'0 20px'}"
        >
          <div
            slot="header"
            class="clearfix card-head"
          >
            <span>已选择（{{ multipleSelection.length }}）</span>
          </div>
          <div
            v-for="(item, index) in multipleSelection"
            :key="index"
            class="goods-item"
          >
            <span>{{ item.name }}</span>
            <el-button
              type="text"
              @click="deleteItem(item, index)"
            >
              删除
            </el-button>
          </div>
        </el-card>
        <div class="btn-group">
          <el-button
            size="medium"
            @click="closeDialogView"
          >
            取消
          </el-button>
          <el-button
            size="medium"
            type="primary"
            :disabled="multipleSelection.length == 0"
            @click="subMultipleData"
          >
            确定
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Getter, Action, namespace } from "vuex-class";

@Component
export default class AddGoodsPanel extends Vue {
  @Prop({
    type: Array,
    default: () => [
      { label: "商品名称", prop: "name" },
      { label: "规格", prop: "format" },
      { label: "编号", prop: "proCode" },
      { label: "单价", prop: "retailPrice" }
    ]
  })
  tableColumn!: Array<string>; //  默认表格col项
  // 基础商品数据
  @Prop({ type: Array, default: () => [] }) goodsData!: Array<string>;
  // 已经选择的商品
  @Prop({ type: Array, default: () => [] }) selectedGoods!: Array<string>;
  @Prop({ type: Boolean, default: false }) productDialogView!: boolean; // 弹窗显示
  @Prop({ type: Boolean, default: false }) dialogLoading!: boolean; // loading
  @Prop({ type: Boolean, default: false }) bitMember!: boolean; // 是否为会员二次价
  @Prop({ type: Boolean, default: false }) bitLabelGoods!: boolean; // 是否为标签商品

  // data
  multipleSelection: Array<object> = [];
  goodsSearch: string = ""; // 搜索商品的数据
  currentPage: number = 1; // 当前页
  // getter
  @Getter("goodsListData", { namespace: "addChangegoods" })
  goodsListData!: Array<string>; // 列表的数据
  @Getter("totalElements", { namespace: "addChangegoods" })
  totalElements!: number; // 列表的元素的总数
  @Action("getListData", { namespace: "addChangegoods" }) getListData: any; // 获取商品的列表的数据

  get goodsTable(): any {
    return this.$refs.goodsTable;
  }
  // created
  created() {
    // 获取门店的数据列表
    this.getShopDataList();
  }
  // methods
  // 获取门店的数据列表
  getShopDataList(page = 1) {
    const params: any = { pageIndex: page, pageCount: 10, searchType: 9 }; // 查询类型（1条形码 2商品编码 9模糊搜索）
    if (this.goodsSearch) {
      params.search = this.goodsSearch;
    }
    this.getListData(params);
  }
  // 点击行的添加
  rowClick(row: any, column: object) {
    this.$nextTick(() => {
      let flag = true;
      this.multipleSelection.map((type: any, index) => {
        if (type.id === row.id) {
          this.multipleSelection.splice(index, 1);
          //  let goodsTable: any = this.$refs.goodsTable
          this.goodsTable.toggleRowSelection(type, false);
          flag = false;
        }
      });
      if (flag) {
        this.multipleSelection.push(row);
        this.goodsTable.toggleRowSelection(row, true);
      }
    });
  }
  // 单个商品添加
  handleSelectionChange(selection: any, row: any) {
    this.$nextTick(() => {
      let flag = false;
      selection.map((item: any) => {
        if (item.id === row.id) {
          this.multipleSelection.push(row);
          flag = true;
        }
      });
      if (!flag) {
        this.multipleSelection.map((type: any, index) => {
          if (type.id === row.id) {
            this.multipleSelection.splice(index, 1);
          }
        });
      }
    });
  }
  // 全选的时候
  allSelectionChange(selection: any) {
    if (this.multipleSelection.length > 0) {
      // 获取当前页数的商品清除右侧商品的数据
      const result: Array<object> = [];
      this.multipleSelection!.map((item: any) => {
        let flag = false;
        this.goodsListData.map((type: any) => {
          if (item.id === type.id) {
            flag = true;
          }
        });
        if (!flag) {
          result.push(item);
        }
      });
      this.multipleSelection = result;
      selection.map((item: any) => {
        this.multipleSelection.push(item);
      });
    } else {
      this.multipleSelection = selection;
      // 如果全选为反选的时候清空右侧的数组
      if (selection.length === 0) {
        // 清空选择的内容
        this.multipleSelection = [];
      }
    }
  }
  // 删除商品
  deleteItem(row: any, index: any) {
    //   删除已选项
    this.multipleSelection.splice(index, 1);
    this.goodsListData.map((item: any) => {
      if (item.id === row.id) {
        this.goodsTable.toggleRowSelection(item, false);
      }
    });
  }
  // 分页查询
  handleCurrentChange(val: number) {
    this.getShopDataList(val);
  }

  closeDialogView() {
    //   关闭弹窗
    this.$emit("update:productDialogView", false);
  }
  // 确认
  subMultipleData() {
    this.multipleSelection.map((item: any) => {
      item.imgUrl = item.imgUrl
        ? item.imgUrl
        : item.mainImgs && item.mainImgs.length
        ? item.mainImgs[0]
        : "";
    });
    this.$emit("update:productDialogView", false);
    this.$emit("formatterMultipleData", this.multipleSelection);
    //   清除已选数据
    // this.multipleSelection.forEach((item, index) => {
    //     this.deleteItem(index)
    // })
  }
  checkSelection(row: any) {
    //   检查当前项是否可以选择
    if (this.selectedGoods.length === 0) {
      // 如果选择的商品为空设置可选状态
      return true;
    } else {
      if (row.disabled) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style lang="scss">
@import "../BaseChangeGoods/changeGoods.scss";
</style>
