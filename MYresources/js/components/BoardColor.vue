<template>
  <div 
    @click="$emit('changed', color)"
    :class="[colors[color]]"
    class="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 rounded-sm cursor-pointer flex justify-center items-center text-white text-xl"
  >
    <span v-if="activeColor == color">✓</span><!-- 'check character unicode in google search -->
  </div>
</template>

<script>
import { colorMap500 } from '../utils'
export default {
  props: {
    color: String,
    activeColor: String,

  },
  computed: { // use for getting js values into the template
    colors: () => colorMap500
  }
}
</script>