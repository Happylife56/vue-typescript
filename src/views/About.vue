<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class About extends Vue {
  @Prop() private msg!: string;

  @Prop({ default: "default value" }) private propB!: string;

  @Watch("propB", { immediate: true, deep: true })
  msgChange(val: "propB") {
    console.log(val);
  }
}
</script>



