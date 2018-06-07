<template>
<transition name="slide">
  <div class="home">
    <x-header style="background-color:#ffcc00;arrow-color:#fff;" :left-options="{backText: ''}">{{$t('list.title')}}</x-header>

    <h1>ddasdas</h1>
    <div class="img" @click="showShank"></div>
    <x-icon type="ios-arrow-up" class="icon-red"></x-icon>
    <x-button type="primary" @click="showShank">primary</x-button>
    <divider>我是有底线的</divider>
    <transition name="fade">
      <shank v-if="shank" @hideshank="hideShankNow"></shank>
    </transition>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import shank from '@/components/shank/shank'
  import { Divider, XButton, XHeader } from 'vux'
  // import { clearInterval } from 'timers';
  export default {
    data () {
      return {
        listenScroll: true,
        shank: false,
        step: 10,
        moveDistance: 80,
        levelArr: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: '全场'}], // 关卡数量
        levelIndex: 2, // 当前关卡索引
        runTimer: null, // 计时器
        recordsList: [{nickname: 'hah', prizesName: '超级奔驰'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: '反正我也不知道是什么'}], // 消息列表
        firstRecord: {nickname: 'hah', prizesName: '超级奔驰'} // 轮播最后重复第一个
      }
    },
    created () {
      localStorage.setItem('userCodeNBA', '123')
      // this.$vux.toast.show({
      //   text: '加载中',
      //   duration: 60000
      // })
      // this.$vux.loading.show({
      //   text: 'Loading'
      // })
    },
    mounted () {
    },
    destroyed () {
      clearInterval(this.runTimer)
    },
    methods: {
      // 猜胜负
      guessWin (index, e, nowResult) {
        console.log(e)
      },
      // 猜大小球
      guessScore (index, e) {
        console.log(index, e)
      },
      // 关卡选择
      goTab (e) {
        this.levelIndex = e
      },
      onSwiperItemIndexChange (e) {
        console.log(e, 'index 12', this.levelIndex)
        this.levelIndex = e
      },
      showShank () {
        console.log('shank')
        this.shank = true
      },
      hideShankNow () {
        console.log('shank', 'hellp')
        this.shank = false
      },
      scrollDowns () {
        // 触底加载+-
      },
      pullDowns () {
        // 下拉刷新
      }
    },
    components: {
      scroll,
      loading,
      Divider,
      XButton,
      XHeader,
      shank
    }
  }
</script>

<!--// <style lang="stylus" scoped>
//   // @import "../../common/stylus/colorreset"
//   // @import "../../common/stylus/marginAndsize"
//   @import "../../common/stylus/mixin"
//   // @import "../../common/stylus/fontsize"
  
//   .home
//     font-size:0.3rem
//   .img
//     width: 2.0rem
//     height 3.0rem
//     bg-image('./img/dot')
    
// </style>  -->

<!--<style lang="less" scoped>
  .home {
    .img {
      background-color: blue;
      width: 0.3rem;
      height: 0.4rem;
      }}
    
</style>  -->
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"

  .fade-enter-active, .fade-leave-active {
      animation: scale 0.5s;
    }
  .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  } 
  @keyframes scale {
    0%{
      transform: scale(1);
    }
    20% {
      transform: scale(1.2);
    }
    100%{
      transform: scale(1);
    }
  }
  .demo3-item {
    border: 0.1rem solid red;
  }
</style>  
