<template>
<transition name="appear">
  <div class="overlay fixed z-30 top-0 bottom-0 left-0 w-full h-full bg-black" 
    @click.self="$emit('closed')"
    v-if="show"
  >
    <div class="w-full h-full bg-transparent flex justify-center items-center"
      @click.self="$emit('closed')"> <!-- .self directive will prevent propagation -->
      <div :style="style" @click.self="$emit('closed')">
        <slot></slot>
      </div>
    </div>
  </div>
</transition>

</template>

<style scoped>
  .overlay {
    background: rgba(0, 0, 0, 0.7);
  }
</style>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    show: Boolean
  },
  computed: {
    style() {
      return {
        width: `${this.width}px`,
        height: `${this.width}px`
      }
    }
  }
}
</script>