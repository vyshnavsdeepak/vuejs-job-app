<template>
  <div class="notification is-danger">
    <button class="delete" 
    @click="onClose"></button>
    {{ text }}
  </div>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>
