<template>
  <div>
    <div 
      @click="$emit('openEditor')"
      class="
      rounded-sm 
      p-2 
      text-gray-600 
      cursor-pointer 
      text-s 
      hover:bg-gray-400 
      hover:text-gray-800">
      Add New Card
    </div>
  </div>
</template>

<script>

export default {

}
</script>