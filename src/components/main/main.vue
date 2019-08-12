<template>
  <div class="main">
    <!-- 导航栏 -->
    <Sidebar class="sidebar-contain"></Sidebar>
    <!-- right -->
    <div class="main-contain">
      <!-- 头部标题 -->
      <HeaderTitle></HeaderTitle>
      <!-- 内容 -->
      <RightPanel class="right-contain"></RightPanel>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "./components/Sidebar.vue";
import HeaderTitle from "./components/HeaderTitle.vue";
import RightPanel from "./components/RightPanel.vue";

import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    Sidebar,
    HeaderTitle,
    RightPanel
  }
})
export default class Main extends Vue {}
</script>


<style lang="scss">
.main {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #f6f6f6;
  .main-contain {
    width: 100%;
    @include flex-column();
    .right-contain {
      flex: 1;
    }
  }
}
</style>