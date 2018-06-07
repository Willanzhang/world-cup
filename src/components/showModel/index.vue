<template>
  <div class="amendS">
    <div class="content">
      <div class="closecon" @click="closeThisDialog">
        <p class="close"></p>
      </div>
      <div class="title">提款：¥{{kitingMoney}}</div>
      <p class="confirm" @click="confirm">确定提款</p>
      <p class="text">将于5个工作日内派发到您的账户</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      kitingMoney: {
        type: [String, Number]
      }
    },
    data () {
      return {
        showFlag: true
      }
    },
    computed: {
    },
    methods: {
      confirm () {
        this.$emit('sureKiting')
      },
      closeThisDialog () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .amendS
    position:fixed
    width:100%
    height:100%
    background:rgba(0,0,0,.7)
    display:flex
    top: 0
    justify-content:center
    align-items:center
    z-index:500
    .content
      width:6.5rem
      height:4.5rem
      background:#fff
      border-radius:0.1rem
      position: relative
      .closecon
        position:absolute
        width:0.8rem
        height:0.8rem
        right:-0.4rem
        top:-0.8rem
        display:flex
        justify-content:center
        align-items:center
      .close
        width:0.42rem
        height:0.41rem
        background:url('./close.png')
        background-size:cover
      .text
        font-size: .24rem
        text-align: center;
        line-height: .5rem;
      .title
        padding-top:0.9rem
        font-size:0.48rem
        color:#333333
        text-align:center
        font-weight:bold
      .confirm
        margin:0 auto
        margin-top:1rem
        width:5.9rem
        height:0.9rem
        line-height:0.9rem
        background:#9999ff
        color:#fff
        border-radius:0.1rem
        font-size:0.36rem
        text-align:center
</style>

