// 数字输入框
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    class="number-form"
  >
    <el-form-item prop="inputValue">
      <el-input
        v-bind="$props"
        v-model.trim="ruleForm.inputValue"
        :autofocus="autofocus"
        :class="{ 'height-input': bitHeight }"
        @keyup.native.enter="keyupEnter"
        @input="$emit('input', ruleForm.inputValue)"
      >
      </el-input>
      <el-input style="display:none"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class NumberInput extends Vue {
  @Prop({ type: String, default: "" }) placeholder!: string;
  @Prop({ type: String, default: "收款金额不能大于合计金额" })
  errorTips!: string;
  @Prop({ type: Boolean, default: true }) bitHeight!: boolean; // 是否设置高度
  @Prop({ type: Number, default: "" }) initInput!: number; // 初始化的金额
  @Prop({ type: String, default: "" }) validateInput!: string; // 判断的值
  @Prop({ type: Boolean, default: false }) autofocus!: boolean; // 是否自动获取焦点

  // data
  ruleForm: any = { inputValue: "" }; // 本次支付金额

  rules: any = {
    inputValue: [{ validator: this.checkNumber, trigger: "change" }]
  };
  stopTime: any = null;
  keyupStatus: boolean = true;

  // Watch
  @Watch("initInput", { immediate: true, deep: true })
  changeInit(val: "initInput") {
    this.ruleForm.inputValue = val;
  }

  // 验证数据
  checkNumber(rule: any, value: number, callback: any) {
    console.log(value);
    if (!value) {
      return callback(new Error("收款金额不能为空"));
    }
    setTimeout(() => {
      if (this.validateInput && Number(value) > Number(this.validateInput)) {
        callback(new Error(this.errorTips));
      } else {
        callback();
      }
    }, 400);
  }

  // methods
  // 清空缓存
  resetForm(formName: any) {
    const form: any = this.$refs[formName];
    form.resetFields();
  }
  // 回车事件
  keyupEnter() {
    if (this.keyupStatus) {
      this.keyupStatus = false;
      this.$emit("enter", this.ruleForm.inputValue);
    }
    this.setButton();
  }
  setButton() {
    // 添加一个定时器，点击之后延时0.8s，防二次点击后台报错
    clearTimeout(this.stopTime);
    this.stopTime = setTimeout(() => {
      this.keyupStatus = true;
    }, 800);
  }
}
</script>

<style lang="scss" scoped>
.number-form {
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
