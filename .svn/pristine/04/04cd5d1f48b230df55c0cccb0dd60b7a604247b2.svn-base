<template>
<transition name="ease">
  <div class="prizemode" v-show="showPrize" @click="hidePrizeMode">
    <div class="prizecontainer">
      <div>
        <img src="./prizeimg.png" alt="">
        <p class="title">猜NBA赛事  赢取总价值{{prizeTotal}}元大奖</p>
        <p class="palybtn" @click.stop="joinThisMatch">{{needGold/100}}虎扑币报名参赛</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    props: {
      showPrize: {
        type: Boolean,
        default: false
      },
      needGold: Number,
      prizeTotal: String
    },
    data () {
      return {}
    },
    methods: {
      hidePrizeMode () {
        this.$emit('hidePrizeMode')
      },
      joinThisMatch () {
        this.$emit('sureJoin')
        console.log('参加本次比赛')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .ease-enter-active, .ease-leave-active {
    transition: opacity .5s;
  }
  .ease-enter, .ease-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .prizemode
    position:fixed
    width:100%
    height:100%
    background:rgba(0,0,0,.85)
    top:0
    left:0
    z-index:1000
    .prizecontainer
      display:flex
      justify-content:center
      align-items:center
      height:100vh
      div
        p
          font-size:0.3rem
          text-align:center
        .title
          margin-top:0.4rem
        .palybtn
          background:#ffcc00
          width:3.8rem
          height:0.8rem
          margin:0 auto
          line-height:0.8rem
          border-radius:0.1rem
          color:#333
          margin-top:0.3rem
          box-shadow:0px 2px 0px #7f6600
        img
          width:5.51rem
          height:3.75rem
</style>

