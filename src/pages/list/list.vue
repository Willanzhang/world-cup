<template>
<transition name="slide">
  <div class="userCenter">
    <div class="fixedBox">
      <!--<x-header style="background-color:#ffcc00;arrow-color:#fff;" :left-options="{backText: ''}">{{$t('userCenter.title')}}</x-header>-->
      <!--<div class="userInfo">
        <div class="userLogo">
          <div class="logoImg" @click="goUserPage">
            <img v-lazy="picture" alt="">
          </div>
        </div>
        <div class="nickname ellipsis">
          {{userInfo.nickname}}
        </div>
        <div class="redPackage ellipsis">
          红包账户：
        </div>
        <div class="cash ellipsis">
          ¥{{userInfo.crashAmount}}
        </div>
        <div class="cupImg">
        </div>
        <div class="kiting" @click="goKitingPage">
          转出
        </div>
      </div>-->
      <div class="userInfo">
        <div class="gold text-center">金币：{{userInfo.gold | formatFloat}}</div>
      </div>
    </div>
    <scroll
      :listenScroll="listenScroll"
      :data="recordsList"
      @scroll="scrolls"
      @scrollDown="pullUp"
      @pullDown="pullDowns"
      class="scrollContent"
    >
      <ul class="lists">
        <div class="topSpace"></div> 
        <!--<div v-if="iphone5" class="blankBox"></div>-->
        <li v-for="(item, index) in recordsList" @click="goGamePage(item)">
          <div class="top bline xv">
            <p class="matchDate">{{item.timeDesc}}</p>
            <div class="teamgroup">
              <p class="mathcTeam ellipsis">{{item.homeTeamName}}</p>
              <p class="teamScore">{{item.planState != 1?item.homeTeamScore:''}}</p>
              <p class="battle">VS</p>
              <p class="teamScore">{{item.planState != 1?item.guestTeamScore: ''}}</p>
              <p class="mathcTeam ellipsis">{{item.guestTeamName}} </p>
            </div>
          </div>
          <div class="bottom">
            <!--<p class="left">猜中次数：<span class="passLevel">{{item.luckyGuessPassNum}}</span>/<span class="totalLevel">{{item.joinGuessPassNum}}</span></p>-->
            <p class="right noPrize">
              <span v-if="item.planState==0" :class="{'State0':item.planState==0}">未开赛</span>
              <span v-else-if="item.planState==1" :class="{'State1':item.planState==1}">等待派奖</span>
              <span v-else-if="item.planState==2" :class="{'State2':item.planState==2}">未中奖</span>
              <span v-else="item.planState==3" :class="{'State3':item.planState==3}">夺得{{item.jackpot}}元红包</span>
            </p>
          </div>
        </li>
        <div class="goHome" v-if="recordsList.length <= 0" @click="goHome">您已错过无数大奖，赶紧报名参与</div>
      </ul>
    </scroll>
    <transition name="fade">
      <shank v-if="shank" @hideshank="hideShankNow"></shank>
    </transition>
  </div>
</transition>
</template>
<style>
  .clas {
    flex-wrap: wrap;
  }
</style>
<script>
  import scroll from '@/components/scroll/scroll'
  import shank from '@/components/shank/shank'
  import { XHeader, Swiper, SwiperItem, Checker, CheckerItem } from 'vux'
  import { getGuessRecordList } from 'api/footerballguess'
  // import { clearInterval } from 'timers';
  // planState 0未开赛 1未开奖 2未中奖 3派奖成功
  export default {
    data () {
      return {
        listenScroll: true,
        shank: false,
        page: 0,
        iphone5: false,
        totalPage: 0,
        tags: 0,
        step: 10,
        picture: '',
        userInfo: {},
        loading: false,
        moveDistance: 80,
        levelArr: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: '全场'}], // 关卡数量
        levelList: [[{}, {}], [{}, {}], [{}, {}], [{}, {}], [{}, {}]], // 关卡数量
        levelIndex: 2, // 当前关卡索引
        runTimer: null, // 计时器
        recordsList: [] // 消息列表
      }
    },
    created () {
      this._getGuessRecordList({})
    },
    mounted () {
      let height = document.body.clientHeight
      if (height <= 568) {
        this.iphone5 = true
      }
    },
    destroyed () {
      clearInterval(this.runTimer)
    },
    methods: {
      goHome () {
        this.$router.push({name: 'home', query: {userCode: localStorage.getItem('userCodeNBA')}})
      },
      _getGuessRecordList ({page = 0}) {
        // alert(0)
        // 获取竞猜记录
        this.$loading({
          state: true
        })
        getGuessRecordList({
          lotyId: 'JCZQ',
          betType: 'JCDY',
          page: page,
          pageSize: 10,
          tags: this.tag
        }).then(res => {
          if (res.data.errCode === 0 && res.data.retCode === 0) {
            this.totalPage = res.data.page
            this.picture = res.data.userInfo.picture
            this.userInfo = res.data.userInfo
            this.recordsList = this.recordsList.concat(res.data.data)
          }
          this.$loading({
            state: false
          })
        })
      },
      // 跳转夺宝记录
      goKitingPage () {
        if (this.userInfo.crashAmount === 0) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '20em',
            time: 1000,
            text: '您当前可转出金额为0',
            isShowMask: true
          })
          return
        }
        this.$router.push({name: 'kiting'})
      },
      // 跳转用户中心
      goUserPage () {
        this.$router.push({name: 'userCenter'})
      },
      // 去游戏内页
      goGamePage (item) {
        this.$router.push({name: 'game', query: {uniqueId: item.uniqueId, matchNo: item.matchNo}})
      },
      onSwiperItemIndexChange (e) {
        this.levelIndex = e
      },
      showShank () {
        this.shank = true
      },
      hideShankNow () {
        this.shank = false
      },
      // 下拉刷新
      pullUp () {
        if (this.page < this.totalPage) {
          this.page = this.page + 1
          this._getGuessRecordList({page: this.page})
        }
        this.$loading({
          state: true
        })
        this.loadMore()
      },
      pullDowns () {
      },
      scrolls () {
      },
      // 加载更多
      loadMore () {
        this.page = ++this.page
        this.$loading({
          state: false
        })
        // this.getPropsList()
      }
    },
    components: {
      scroll,
      XHeader,
      shank,
      SwiperItem,
      Swiper,
      CheckerItem,
      Checker
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"
  .userCenter {
    height: 100vh;
    background-color $color-default-color;
    font-size:0.22rem;
    padding-bottom .98rem
    position: fixed;
    width: 100%;
    color: #fff;
    width:100%
    .fixedBox {
      background-color: #000;
      position absolute
      width: 100%;
      top 0
      z-index 100
    }
    .userInfo {
      padding-left: .23rem;
      height 0.9rem;
      position relative;
      .gold {
        position: absolute;
        top: 50%;
        transform: translateY(-50%)
        width: 2.2rem;
        height: .6rem;
        line-height: .6rem;
        color $color-meta
        font-size .24rem
        background-color: #1e1e1e;
      }
      div {
        vertical-align: middle;
      }
      .userLogo {
        vertical-align: middle;
        width 0.8rem;
        height 0.8rem;
        margin-top: 0.05rem;
        border-radius: 50%;
        background-color #fff;
        position:relative;
        display: inline-block;
        .logoImg {
          width: 0.72rem;
          height 0.72rem;
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          overflow:hidden
          display:flex
          justify-content:center
          align-items:center
          img{
            width:100%
            height:100%
          }
        }
      }
      .redPackage {
        /*width: 1.4rem;*/
        height: 100%;
        line-height: .9rem;
        display: inline-block;
        text-align: center;
      }
      .cash {
        width: 1.5rem;
        height: 100%;
        line-height: .9rem;
        display: inline-block;
        text-align: center;
      }
      .nickname {
        vertical-align: middle;
        display: inline-block;
        width: 1.7rem;
        height: 100%;
        font-size: .24rem;
        line-height: .9rem;
      }
      .kiting {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.1rem;
        text-align: center;
        width: 1.5rem;
        height: .5rem;
        line-height: .5rem;
        background-color: $color-meta;
        font-size: .28rem;
        border-radius: .3rem;
        color: #fff;
      }
    }
    .scrollContent {
      background-color: #000;
      // height:100vh
      margin-top: 1.0rem;
      /*margin-top:3rem*/
      height:10rem
      // padding-bottom:3rem
      // /*height:9rem*/
      .topSpace {
        width: 100%;
        /*height: 3rem;*/
      }
      .lists {
        width: 7.3rem;
        /*height: 100%;*/
        margin: 0 auto;
        .blankBox {
          width: 100%;
          height: .2rem;
        }
        li {
          touch-action: none;
          margin-top 0.12rem
          background-color: #fff;
          padding 0 .24rem
          color #000
          height: 2rem;
          border-radius .12rem
          .top {
            height: .98rem;
            line-height: .98rem;
            font-size 0
            display:flex
            justify-content:space-between
            p {
              display inline-block
              text-align: center;
              vertical-align: middle;
            }
            .matchDate {
              // width: 2.42rem;
              font-size .21rem
              text-align: left;
            }
            .teamgroup{
              display:flex;
              justify-content:space-between;
              p{
                /*text-align:right;*/
              }
            }
            .matchHour {
              width: 1.86rem;
              font-size .24rem
              /*font-weight bold*/
              text-align: left;
            }
            .mathcTeam {
              width: 1.4rem;
              font-size .24rem
            }
            .teamScore {
              width: .5rem;
              font-size .24rem
              text-align center
            }
            .battle {
              width: .5rem;
              font-size .16rem;
              text-align:center !important;
            }
          }
          .bottom {
            height: .98rem;
            line-height: .98rem;
            font-size 0.3rem 
            color #666
            .left {
              width: 3rem;
              /*height: .98rem;*/
              float left
              .passLevel {
                font-size .32rem 
                color red
              }
              .totalLevel {
                font-size .28rem
              }
            }
            .right {
              width: 3rem;
              float right
            }
            .bingo {
              color red
            }
            .noPrize {
              color #ccc
              text-align:right
              .State0{
                color:#ccc;
              }
              .State1{
                color:#333;
              }
              .State2{
                color:#999;
              }
              .State3{
                color:#ff2700;
              }
            }
          }
        }
      }
      .goHome {
        height: .4rem;
        line-height: .4rem;
        padding-top: 2.4rem;
        text-align: center;
        color: $color-meta;
        font-size: .24rem
      }
    }
  }
  .bline:after {
    border-color: #ccc !important;
  }
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
