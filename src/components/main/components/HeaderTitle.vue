// 标题
<template>
  <ul class="header-title">
    <li><i
        class="iconfont icon-caidan1"
        @click="setCollapseState(!isCollapse)"
      ></i></li>
    <li>收银平台</li>
    <li><i class="iconfont icon-yonghu"></i></li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { Test } from "@/mixins/test.ts";
import { Common } from "@/mixins/common.ts";

@Component
export default class HeaderTitle extends Mixins(Test, Common) {
  @State("isCollapse", { namespace: "common" }) isCollapse!: boolean;

  @Mutation("setCollapseState", { namespace: "common" }) setCollapseState: any;
}
</script>

<style lang="scss" scoped>
.header-title {
  padding: 10px;
  background-color: #fff;
  @include flex-type(space-between, center);
}
</style>


