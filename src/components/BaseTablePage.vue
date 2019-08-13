
// 公用的表格和分页
<template>
  <div class="table-page">
    <el-table :data="tableData">
      <el-table-column
        v-for="(item, index) in tableColumn"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        :min-width="item.minWidth ? item.minWidth : ''"
        :width="item.width ? item.width : ''"
        :sortable="item.sortable"
        :show-overflow-tooltip="!item.toolTip"
      >
        <template slot-scope="scope">
          <span v-if="scope.row[item.prop] == '0'">
            {{ scope.row[item.prop] }}
          </span>
          <span v-else>
            {{ scope.row[item.prop] | paramsType }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :width="setbtnWidth"
        v-if="bitSetbtn"
      >
        <template slot-scope="scope">
          <slot :item="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20 page-div">
      <div
        v-if="totalElements > pageSize"
        class="text-right "
      >
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next,total, jumper"
          :total="totalElements"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
@Component
export default class TablePage extends Vue {
  currentPage: number = 1;
  @Prop({
    // 表格表头
    type: Array,
    default: () => {
      return [
        { label: "排名", prop: "pName" },
        { label: "商品名称", prop: "spec", sortable: true, minWidth: "135" },
        { label: "商品类别", prop: "price", minWidth: "135", sortable: true },
        { label: "零售价", prop: "one", sortable: true },
        { label: "销量", prop: "two", sortable: true },
        { label: "销量总额", prop: "three", sortable: true, minWidth: "135" }
      ];
    }
  })
  tableColumn!: Array<object>;

  @Prop({ type: Array, default: () => [] }) // 表格数据
  tableData!: Array<object>;

  @Prop({ type: Number, default: 9 })
  totalElements!: number;

  // 操作列的宽度
  @Prop({ type: String, default: "240px" })
  setbtnWidth!: string;

  // 操作列是否存在
  @Prop({ type: Boolean, default: false })
  bitSetbtn!: boolean;

  // 分页页数
  @Prop({ type: Number, default: 10 })
  pageSize!: number;

  @Watch("totalElements")
  onTotalElements(val: "totalElements") {
    if (val) {
      this.currentPage = 1;
    }
  }

  @Watch("tableColumn", { immediate: true, deep: true })
  onTableData(val: "tableColumn") {
    (val as any).map((items: any) => {
      Object.keys(items).forEach(key => {
        if (typeof items[key] === "number") {
          items[key] = items[key].toFixed(2);
        }
      });
    });
  }

  // 切换页数
  @Emit("current-change")
  handleCurrentChange() {
    return this.currentPage;
  }
}
</script>





