// 导航栏
<template>
  <div v-if="isCollapse">
    <!--  :collapse="isCollapse" -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo sidebar"
      @select="handleSelect"
      background-color="#3d3d45"
      text-color="#ffffff"
      active-text-color="#f4364c"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.id"
        :index="item.id"
      >
        <i
          class="iconfont"
          :class="item.iconfont"
        ></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";

@Component({})
export default class Sidebar extends Vue {
  // data
  // @State("common") isCollapse: any;

  @State("isCollapse", { namespace: "common" }) isCollapse!: boolean;
  @Mutation("setCollapseState", { namespace: "common" }) setCollapseState: any;
  // isCollapse: boolean = false; // 是否折叠
  // object[]
  menuList: Array<object> = [
    { iconfont: "icon-caidan1", title: "", id: "0" },
    { iconfont: "icon-qiantai", title: "收银平台", id: "1" },
    { iconfont: "icon-dingdan", title: "订单", id: "2" },
    { iconfont: "icon-caiwuguanli1", title: "财务", id: "3" },
    { iconfont: "icon-dingdan1", title: "商品管理", id: "4" },
    { iconfont: "icon-caidanguanli", title: "更多", id: "5" },
    { iconfont: "icon-shezhi2", title: "设置", id: "6" }
  ];

  // methods
  handleSelect(key: string, keyPath: string) {
    console.log(key, keyPath);
    if (key === "0") {
      this.setCollapseState(false);
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  .is-active {
    background-color: $themeColor !important;
    color: #fff !important;
    border-bottom: none !important;
  }
  .el-menu-item {
    line-height: 36px;
    padding: 45px 20px;
    @include flex-column();
    @include flex-type(center, center);
    .iconfont {
      color: #fff;
      font-size: 30px;
    }
    &:last-child {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>

<style>
.sidebar {
  height: 100%;
  width: 120px !important;
  position: relative;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 120px;
  min-height: 400px;
}
</style>

