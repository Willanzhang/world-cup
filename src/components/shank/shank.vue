<template>
  <div class="shank" @click="hideShank">
    <div class="box">
      <div class="title">
        温馨提示
      </div>
      <div class="lists">1、前{{freePassNum + 3}}次竞猜选项免费;</div>
      <div class="lists">2、{{freePassNum + 3 + 1}}-{{totalPassNum + 3}}次竞猜选项需要消耗金币;</div>
      <div class="lists">3、每场比赛最多选择{{totalPassNum + 3}}个竞猜选项;</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      totalPassNum: Number,
      freePassNum: Number
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
      width: 4.2rem;
      height: 1.8rem;
      padding-left .22rem
      padding-top .15rem
      background-color: #000;
      color #fff
      font-size .2rem
      border-radius .12rem
      .title {
        font-size .2rem
        height: .4rem;
        line-height: .4rem;
      }
      .lists {
        font-size .2rem
        height: .34rem;
        line-height: .34rem;
      }
    }
  }
</style>
