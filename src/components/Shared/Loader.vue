<template>
  <div class="loader"></div>
</template>

<script>
  export default {
    props: ['loading']
  }
</script>

<style lang="sass" scoped>
  .loader
    border: 5px solid #f3f3f3
    border-radius: 50%
    border-top: 5px solid #00d1b2
    width: 30px
    height: 30px
    margin-top: 50px
    margin-left: auto
    margin-right: auto
    -webkit-animation: spin 1s linear infinite
    animation: spin 1s linear infinite
    @-webkit-keyframes spin
      0%
        -webkit-transform: rotate(0deg)
      100%
        -webkit-transform: rotate(360deg)
    @keyframes spin
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)
</style>
