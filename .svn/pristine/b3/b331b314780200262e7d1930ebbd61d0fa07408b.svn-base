<template>
  <transition name="fade">
    <div class="message" v-if="state">
      <div class="prizeimg">
        <div class="cloaseC" @click="UpdateWinningMsg(0)">
          <span class="closeThis"></span>
        </div>
      </div>
      <div class="prizemsg">
        <p class="prizetitle">{{prizeTitle}} </p>
        <p class="prizeissue">No:{{issueNo}}</p>
        <p class="prizeProName">{{prizeName}}</p>
        <p class="checkout" @click="UpdateWinningMsg(1)">{{checkOut}}</p>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import { updateWinningMsg } from 'api/free'
  export default {
    data () {
      return {
        state: false,
        checkOut: '',
        prizeTitle: '',
        issueNo: '',
        prizeName: '',
        router: null
      }
    },
    methods: {
      close () {
        this.state = false
      },
      UpdateWinningMsg (type) {
        updateWinningMsg({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            if (type === 0) {
              this.state = false
            } else {
              this.state = false
              let language = localStorage.getItem('ELEMENT_LANGUAGE')
              this.router.push({path: '/userrecord/' + language})
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
  .message
    position:fixed
    width:100%
    height:100%
    background:rgba(0,0,0,.8)
    z-index 5000
    top:0
    .prizeimg
      width:4.66rem
      height:4.52rem
      background:url('../img/prize.png')
      background-size: cover
      margin:0 auto
      margin-top:2rem
      position: relative
      .cloaseC
        position:absolute
        width:1rem
        height:1rem
        top:0
        right:-1rem
        display:flex
        justify-content: center
        justify-content:center
        align-items: center
        .closeThis
          display:inline-block
          width:0.44rem
          height:0.45rem
          background:url('../img/close.png')
          background-size: cover
    .prizemsg
        text-align: center
        font-size:0.24rem
      .prizetitle
        color:#fff
        font-size:0.35rem
      .prizeissue
        color:#ccc34c
        margin-top:0.25rem
      .prizeProName
        font-size:0.36rem
        color:#ccc34c
        margin-top:0.4rem
      .checkout
        height:0.7rem
        line-height:0.7rem
        width:2rem
        margin:0 auto
        margin-top:0.5rem
        text-align: center
        font-size:0.3rem
        color:#fff
        border-radius:0.1rem
        background:#d93a55
</style>

  
