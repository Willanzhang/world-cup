<template>
  <div class="shank" @click="hideShank">
    <div class="box"></div>
  </div>
</template>

<script>
  export default {
    props: {
    },
    mounted () {
    },
    methods: {
      hideShank () {
        this.$emit('hideshank')
        console.log('this is shank')
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shank {
    position: fixed;
    display: flex;
    z-index 100
    justify-content: center;
    align-items: center;
    top: 0;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,.3)
    .box {
      width: 3rem;
      height: 3rem;
      background-color: #fff;
    }
  }
</style>
