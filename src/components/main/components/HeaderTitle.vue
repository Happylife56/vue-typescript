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
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";

@Component
export default class headerTitle extends Vue {
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


