//右面板
<template>
  <div class="right-panel">
    <h3>右面板</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  }
});
</script>


<style lang="scss" scoped>
.right-panel {
  margin: 10px;
  background-color: #ffffff;
  @include flex-type(center, center);
}
</style>

