//右面板
<template>
  <div class="right-panel">
    <!-- <h3>右面板</h3> -->
    <BaseTablePage
      :totalElements="30"
      @current-change="currentChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import BaseTablePage from "@/components/BaseTablePage.vue";

@Component({
  components: {
    BaseTablePage
  }
})
export default class RightPanel extends Vue {
  currentChange(val: number) {
    console.log(val);
  }

  mounted() {
    console.log(this.$store);
  }
}
</script>


<style lang="scss" scoped>
.right-panel {
  margin: 10px;
  background-color: #ffffff;
  // @include flex-type(center, center);
}
</style>

