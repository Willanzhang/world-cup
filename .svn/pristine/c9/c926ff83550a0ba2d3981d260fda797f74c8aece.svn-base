<template>
  <div class="loading">
    <img width="30" height="30" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: 'loading'
      }
    },
    data () {
      return {
        titles: this.$t('loading.loadingText')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 0.2rem
      font-size: 0.24rem
      color: #333
      padding-bottom:0.3rem
</style>
