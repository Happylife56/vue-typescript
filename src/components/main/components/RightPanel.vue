//右面板
<template>
  <div class="right-panel">
    <!-- <h3>右面板</h3> -->
    <BaseTablePage
      :totalElements="30"
      @current-change="currentChange"
      ref="table"
    />
    <!-- <BaseChangeGoods /> -->
    <NumberInput
      v-model="value1"
      :initInput="123"
      @enter="enterValue"
    />
    {{ value1 }}
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import BaseTablePage from "@/components/BaseTablePage.vue";
import BaseChangeGoods from "@/components/BaseChangeGoods/index.vue";
import NumberInput from "@/components/NumberInput.vue";

@Component({
  components: {
    BaseTablePage,
    BaseChangeGoods,
    NumberInput
  }
})
export default class RightPanel extends Vue {
  value1: string = "";

  currentChange(val: number) {
    console.log(val);
  }

  mounted() {}

  enterValue(val: number) {
    console.log(val);
  }
}
</script>


<style lang="scss" scoped>
.right-panel {
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  // @include flex-type(center, center);
}
</style>

