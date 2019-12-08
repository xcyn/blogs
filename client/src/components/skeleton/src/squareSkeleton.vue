<template>
  <div class="square-list">
    <div
      class="square"
      v-for="i in count"
      :key="i"
      :style="{'backgroundColor': backColor}"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    backColor: {
      type: String,
      default: "#e7e7e7"
    },
    count: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="stylus" scoped>
.square-list {
  width: 100%;
}
</style>
