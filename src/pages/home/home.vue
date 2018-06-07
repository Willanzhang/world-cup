<template>
<transition name="slide">
  <div class="home">
    <!--<x-header style="background-color:#ffcc00;arrow-color:#fff;" :left-options="{backText: '',preventGoBack:true}" @on-click-back="goTheirHome">{{$t('home.title')}}</x-header>-->
     <div class="userInfo">
      <div class="userLogo" @click="goUserPage">
        <img :src="userInfo.picture" class="logoImg"></img>
      </div>
      <div class="nickname">
        {{userInfo.nickname}} {{lkey}}
      </div>
      <!--<div class="cupImg">
      </div>-->
      <div class="listButton" @click="goUserPage">
        红包余额： {{cash}}
      </div>
    </div>
    <!--<div class="notice">
      <div class="noticeLogo">
      </div>
      <div class="noticeContent" ref="noticeBox">
        <ul id="notice"  ref="noticeContent" class="clearfix">
          <li v-for="(val, index) in recordsList" :key="index">
            {{val}}
          </li>
          <li v-if="recordsList.length >= 1">{{firstRecord}}</li>
        </ul>
      </div>
    </div>-->
    <div class="noticeB" v-if="recordsList.length > 0">
      <div class="noticeLogo">
      </div>
      <div class="noticeContent" ref="noticeBox">
        <div id="notice"  ref="ulBox" class="clearfix divBox"><span v-for="(val, index) in recordsList" :key="index">{{val}}</span><span>{{recordsList[0]}}</span></div>
      </div>
    </div>
    <div class="swiperContainer" v-if="!iphone5 && isAjax" ref="swiperContainer">
      <swiper v-if="matchList.length >= 1" class="dx" style="height: 440px;" height="400px"  dots-class="botS" :min-moving-distance="moveDistance" :show-dots="matchList.length > 1" dots-position="center" @on-index-change="onSwiperItemIndexChange" v-model="levelIndex">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in matchList" :key="index">
          <div class="swiperUntil">
            <div class="topB">
              <div class="downTime" v-if="distanceNow(item.matchTime) != -1">
                距比赛开始时间还有{{item.matchTime | distanceNow}}小时
              </div>
              <div v-else class="downTime">
                比赛进行中
              </div>
              <div class="battleBoth">
                <!--<div class="top">NBA总决赛</div>-->
                <div class="top">{{item.leagueName}}</div>
                <div class="both">
                  <div class="homeTeam">
                    <div class="logo">
                      <img :src="item.homeTeamLogoUrl" alt="">
                    </div>
                    <div class="name">{{item.homeTeamName}}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="guestTeam">
                    <div class="logo">
                      <img :src="item.guestTeamLogoUrl" alt="">
                    </div>
                    <div class="name">{{item.guestTeamName}}</div>
                  </div>
                </div>
              </div>
              <div class="prize">
                <!--<div class="prizeText">总价值5000元红包</div>-->
                <div class="prizeText">总价值{{item.prizeInfo[0].prizeMoney}}元{{item.prizeInfo[0].goodsName}}</div>
              </div>
              <div class="playNotice">
                玩法介绍:全部猜中每节及全场赛果可获得
              </div>
            </div>
            <div v-if="item.lockSectionInfo.hasJoined === 0 && item.lockSectionInfo.isAllFree === 0 && item.lockSectionInfo.isLockAll === 1" class="bottom" @click="sureJoin(item)">
              马上报名 {{item.lockSectionInfo.allOpenMoney/100}}虎扑币参与
            </div>
            <div v-else-if="item.lockSectionInfo.hasJoined === 0 && item.lockSectionInfo.isAllFree === 1 && item.lockSectionInfo.isLockAll === 0" class="bottom" @click="goGamePage(item)">
              马上报名 免费参与
            </div>
            <div v-else class="bottom green" @click="goGamePage(item)">
              已经参与 立即查看
            </div>
          </div>
        </swiper-item>
      </swiper>
      <swiper v-else class="dx" style="height: 440px;" height="400px"  dots-class="botS" :min-moving-distance="moveDistance" :show-dots="false" dots-position="center" @on-index-change="onSwiperItemIndexChange" v-model="levelIndex">
        <swiper-item class="swiper-demo-img">
          <div class="swiperUntil">
            <div class="topB">
              <div style="height: .42rem">
              </div>
              <div class="battleBoth">
                <!--<div class="top">NBA总决赛</div>-->
                <div class="top"></div>
                <div class="both">
                  <div class="homeTeam">
                    <div class="logo">
                    </div>
                  </div>
                  <div class="noVs">今日暂无比赛</div>
                  <div class="guestTeam">
                    <div class="logo">
                    </div>
                  </div>
                </div>
              </div>
              <div class="prize">
                <!--<div class="prizeText">总价值5000元红包</div>-->
                <div class="prizeText">大奖在路上</div>
              </div>
              <div class="playNotice">
                玩法介绍:全部猜中每节及全场赛果可获得
              </div>
            </div>
            <div class="bottom">
              敬请期待
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="swiperContainer" v-if="iphone5 && isAjax" ref="swiperContainer">
      <swiper v-if="matchList.length >= 1" style="height: 390px;" height="350px"  dots-class="botS" :min-moving-distance="moveDistance" :show-dots="matchList.length > 1" dots-position="center" @on-index-change="onSwiperItemIndexChange" v-model="levelIndex">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in matchList" :key="index">
          <div class="swiperUntil">
            <div class="topB">
              <div class="downTime" v-if="distanceNow(item.matchTime) != -1">
                距比赛开始时间还有{{item.matchTime | distanceNow}}小时
              </div>
              <div v-else class="downTime">
                比赛进行中
              </div>
              <div class="battleBoth">
                <!--<div class="top">NBA总决赛</div>-->
                <div class="top">{{item.leagueName}}</div>
                <div class="both">
                  <div class="homeTeam">
                    <div class="logo">
                      <img :src="item.homeTeamLogoUrl" alt="">
                    </div>
                    <div class="name">{{item.homeTeamName}}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="guestTeam">
                    <div class="logo">
                      <img :src="item.guestTeamLogoUrl" alt="">
                    </div>
                    <div class="name">{{item.guestTeamName}}</div>
                  </div>
                </div>
              </div>
              <div class="prize">
                <!--<div class="prizeText">总价值5000元红包</div>-->
                <div class="prizeText">总价值{{item.prizeInfo[0].prizeMoney}}元{{item.prizeInfo[0].goodsName}}</div>
              </div>
              <div class="playNotice">
                玩法介绍:全部猜中每节及全场赛果可获得
              </div>
            </div>
            <div v-if="item.lockSectionInfo.hasJoined === 0 && item.lockSectionInfo.isAllFree === 0 && item.lockSectionInfo.isLockAll === 1" class="bottom" @click="sureJoin(item)">
              马上报名 {{item.lockSectionInfo.allOpenMoney/100}}虎扑币参与
            </div>
            <div v-else-if="item.lockSectionInfo.hasJoined === 0 && item.lockSectionInfo.isAllFree === 1 && item.lockSectionInfo.isLockAll === 0" class="bottom" @click="goGamePage(item)">
              马上报名 免费参与
            </div>
            <div v-else class="bottom green" @click="goGamePage(item)">
              已经参与 立即查看
            </div>
          </div>
        </swiper-item>
      </swiper>
      <swiper v-else class="dx" style="height: 390px;" height="350px"  dots-class="botS" :min-moving-distance="moveDistance" :show-dots="false" dots-position="center" @on-index-change="onSwiperItemIndexChange" v-model="levelIndex">
        <swiper-item class="swiper-demo-img">
          <div class="swiperUntil">
            <div class="topB">
              <div style="height: .42rem">
              </div>
              <div class="battleBoth">
                <!--<div class="top">NBA总决赛</div>-->
                <div class="top"></div>
                <div class="both">
                  <div class="homeTeam">
                    <div class="logo">
                    </div>
                  </div>
                  <div class="noVs">今日暂无比赛</div>
                  <div class="guestTeam">
                    <div class="logo">
                    </div>
                  </div>
                </div>
              </div>
              <div class="prize">
                <!--<div class="prizeText">总价值5000元红包</div>-->
                <div class="prizeText">大奖在路上</div>
              </div>
              <div class="playNotice">
                玩法介绍:全部猜中每节及全场赛果可获得
              </div>
            </div>
            <div class="bottom">
              敬请期待
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <transition name="fade">
      <shank v-if="shank" @hideshank="hideShankNow"></shank>
    </transition>
  </div>
</transition>
</template>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  import { getLogin, getMatchList, openIssuePass } from '@/api/home'
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import shank from '@/components/shank/shank'
  import { Divider, XButton, XHeader, Swiper, SwiperItem } from 'vux'
  export default {
    data () {
      return {
        listenScroll: true,
        shank: false,
        userInfo: {},
        step: 10,
        matchList: [],
        isAjax: false,
        data: {},
        sum: 0,
        cash: null,
        iphone5: false,
        swiperHeight: '200px',
        moveDistance: 80,
        levelArr: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: '全场'}], // 关卡数量
        levelIndex: 0, // 当前关卡索引
        runTimer: null, // 计时器
        recordsList: [], // 消息列表
        firstRecord: '' // 轮播最后重复第一个
      }
    },
    created () {
      let localUserCode = window.localStorage.getItem('userCodeNBA')
      let lkey = window.localStorage.getItem('lkeyNBA')
      let userInfo = window.localStorage.getItem('userInfoNBA')
      this.userCode = this.$route.query.userCode || ''
      if (localUserCode !== this.userCode || !lkey || !userInfo) {
        let params = {userCode: this.userCode, timestamp: this.$route.query.timestamp, sign: this.$route.query.sign}
        getLogin(params).then(res => {
          if (res.data.errCode === 0) {
            this.userInfo = res.data.data
            this.lkey = res.data.data.lkey
            window.localStorage.setItem('lkeyNBA', res.data.data.lkey)
            window.localStorage.setItem('userInfoNBA', JSON.stringify(res.data.data))
            window.localStorage.setItem('userCodeNBA', this.userCode)
            this.setLkey(res.data.data.lkey)
            // console.log(this.$store)
            this.getPageInfo()
          } else {
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 700,
              text: '登录失败',
              isShowMask: true
            })
            window.localStorage.removeItem('lkeyNBA')
            window.localStorage.removeItem('userInfoNBA')
            window.localStorage.removeItem('userCodeNBA')
            this.setCookie('lkey', '')
          }
        })
      } else {
        this.getPageInfo()
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfoNBA'))
      }
    },
    computed: {
      ...mapState([
        'lkey'
      ]),
      vuexLkey () {
        return this.$store.state.lkey
      }
    },
    mounted () {
      let height = document.body.clientHeight
      if (height <= 568) {
        this.iphone5 = true
        this.swiperHeight = '300px'
      }
      // this.noticeSwiper()
    },
    destroyed () {
      clearInterval(this.runTimer)
    },
    methods: {
      ...mapActions([
        'geMyInfo'
      ]),
      ...mapMutations({
        setLkey: 'SET_LKEY'
      }),
      setCookie (name, value) {
        document.cookie = `${name} = ${value};path=/`
      },
      goTheirHome () {
        window.location.href = `${this.data.rechargeUrl}?user_code=${this.userCode}/#/tab/home`
      },
      getPageInfo () {
        let params = {
          betType: 'JCHH',
          lotyId: 'JCLQ',
          page: 1,
          pageSize: 10,
          lkey: this.lkey
        }
        getMatchList(params).then(res => {
          if (res.data.errCode === 0) {
            this.matchList = res.data.data.matchList
            this.data = res.data.data
            this.cash = res.data.data.cash
            this.rechargeUrl = res.data.data.rechargeUrl
            window.localStorage.setItem('rechargeUrl', this.rechargeUrl)
            this.recordsList = [...res.data.data.broadcastInfo, ...res.data.data.broadcastInfo]
            this.firstRecord = res.data.data.broadcastInfo.slice(0, 1)
            this.isAjax = true
            if (this.recordsList.length > 0) {
              this.$nextTick(() => {
                this.textSwiper()
              })
            }
          }
        })
      },
      textSwiper () {
        let ulBox = this.$refs.ulBox
        let liArr = ulBox.children
        let recordsLength = this.recordsList.length
        let noEnd
        let tureArr = Array.prototype.slice.call(liArr)
        let lastSpan = tureArr.pop()
        this.sum = 0
        tureArr.forEach((val, index) => {
          this.sum = this.sum + val.clientWidth
        })
        tureArr.push(lastSpan)
        noEnd = this.sum - lastSpan.clientWidth
        ulBox.style.width = this.sum + 'px'
        this.sum = 0
        // 此处setTimeout 是为了使dom结构完全渲染 解决 计算属性宽度不准确
        window.setTimeout(() => {
          tureArr.forEach((val, index) => {
            this.sum = this.sum + val.clientWidth
          })
          noEnd = this.sum - lastSpan.clientWidth
          // 此处 + 10 是因为计算结果是整数 有误差 会把 最后一个span 挤下去
          ulBox.style.width = this.sum + 10 + 'px'
          recordsLength = this.recordsList.length
          if (recordsLength <= 0) return
          this.runTimer = window.setInterval(() => {
            this.step++
            ulBox.style.transform = `translateX(-${this.step}px)`
            if (this.recordsList.length >= 1) {
            }
            if (this.step >= noEnd) {
              this.step = 0
            }
          }, 25)
        }, 10)
        // window.setTimeout(() => {
      },
      // 消息喇叭
      noticeSwiper () {
        let noticeContent = this.$refs.noticeContent
        let noticeBox = this.$refs.noticeBox
        let noticeBoxWidth = window.getComputedStyle(noticeBox, null).width
        let liArr = noticeContent.children
        // [].forEach.bind(liArr)
        let tureArr = Array.prototype.slice.call(liArr)
        tureArr.forEach((val) => {
          noticeContent.style.width = noticeBoxWidth
        })
        let recordsLength = this.recordsList.length
        // window.setTimeout(() => {
        let temp = recordsLength + 1
        if (recordsLength <= 0) return
        noticeContent.style.width = `${temp}00%`
        this.runTimer = window.setInterval(() => {
          this.step++
          noticeContent.style.transform = `translateX(-${this.step}px)`
          if (this.recordsList.length >= 1) {
            this.firstLi = this.recordsList[0]
            this.liWidth = window.getComputedStyle(noticeContent.children[0], null).width
          }
          if (this.step >= recordsLength * parseInt(this.liWidth)) {
            this.step = 0
            noticeContent.style.transform = `translateX(-${this.step}px)`
          }
        }, 25)
        // }, 500)
      },
      distanceNow (matchTime) {
        let nowTime = (new Date().getTime()) / 1000
        let hourTime
        if (nowTime >= matchTime) {
          hourTime = -1
          return hourTime
        } else {
          hourTime = matchTime / 3600 - nowTime / 3600
          return Math.ceil(hourTime)
        }
      },
      // 解锁参加
      sureJoin (item) {
        let params = {
          payType: 3,
          payAmount: item.lockSectionInfo.allOpenMoney,
          oIssueNoList: item.lockSectionInfo.lockIssueNo,
          matchNo: item.matchNo,
          betType: 'JCHH',
          lotyId: 'JCLQ'
        }
        // if (this.data.balance < this.lockSectionInfo.allOpenMoney) {
        //   this.$vux.toast.show({
        //     position: 'middle',
        //     width: '16em',
        //     type: 'text',
        //     time: 700,
        //     text: '余额不足，请充值',
        //     isShowMask: true
        //   })
        //   return
        // }
        openIssuePass(params).then(res => {
          if (res.data.errCode === 0) {
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 700,
              text: '已参加',
              isShowMask: true
            })
            this.$router.push({name: 'game'})
          } else if (res.data.retCode === 2109) {
            this.showPlugin()
          } else {
            this.$vux.toast.show({
              position: 'middle',
              width: '16em',
              type: 'text',
              time: 1000,
              text: res.data.msg,
              isShowMask: true
            })
          }
        })
      },
      showPlugin () {
        let that = this
        this.$vux.confirm.show({
          title: '操作提示',
          content: '是否去充值页面',
          onShow () {
          },
          onHide () {
          },
          onCancel () {
            this.prizeModeState = false
          },
          onConfirm () {
            this.prizeModeState = false
            window.location.href = `${that.data.rechargeUrl}?from=cjdj/#/recharge`
            // window.location.href = `${that.data.rechargeUrl}?from=cjdj&user_code=${that.userCode}/#/recharge`
          }
        })
      },
      // 关卡选择
      goTab (e) {
        this.levelIndex = e
      },
      // 去游戏内页
      goGamePage (item) {
        this.$router.push({name: 'game', query: {uniqueId: item.uniqueId, matchNo: item.matchNo}})
      },
      // 跳转用户中心
      goUserPage () {
        // this.geMyInfo()
        this.$router.push({name: 'userCenter'})
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
      shank,
      SwiperItem,
      Swiper
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
  .home {
    height: 100vh;
    background-color $color-default-color;
    font-size:0.16rem;
    width: 100%;
    background-color: #000;
    color: #fff;
    .userInfo {
      padding-left: .23rem;
      height 0.9rem;
      position relative;
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
          height: 0.72rem;
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .nickname {
        vertical-align: middle;
        display: inline-block;
        /*width: 1.2rem;*/
        height: 100%;
        font-size: .24rem;
        line-height: .9rem;
      }
      .cupImg {
        width: .23rem;
        height: .23rem;
        vertical-align: middle;
        display: inline-block;
        bg-image('./img/trophy')
        background-size: .23rem .23rem;
      }
      .listButton {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.1rem;
        text-align: center;
        width: 2.8rem;
        height: .6rem;
        line-height: .6rem;
        background-color: #333;
        font-size: .28rem;
        // border-radius: .12rem;
        color: $color-meta;
      }
    }
    .notice {
      /*background-color:red;*/
      /*height: 100%;*/
      position: relative;
      margin-top .14rem
      padding-left: 0.6rem;
      background-color: #1e1e1e;
      overflow: hidden;
      height: .5rem;
      .noticeLogo {
        position: absolute;
        top: 0;
        left: 0;
        width: .6rem;
        height: .5rem;
        bg-image('./img/notice')
        background-size: .37rem .31rem;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .noticeContent {
        height: 100%;
        /*width: 100%;*/
        overflow: hidden;
      }
      ul{
        /*width: 1100%;*/
        height: 100%;
        /*animation: barrageRun 20s linear infinite;*/
        li{
          float:left;
          width: 6.5rem;
          height: .5rem;
          color:#fff;
          line-height: .5rem;
          overflow:hidden;
          font-size .24rem
          text-overflow:ellipsis;
          white-space:nowrap;
          /*padding-left:2.5rem;*/
          text-align: left;
          /*text-align: center;*/
          span{
            color: #ffc813;
          }
        }
      }
    }
    .noticeB {
      /*background-color:red;*/
      /*height: 100%;*/
      position: relative;
      margin-top .14rem
      padding-left: 0.6rem;
      background-color: #1e1e1e;
      overflow: hidden;
      height: .5rem;
      .noticeLogo {
        position: absolute;
        top: 0;
        left: 0;
        width: .6rem;
        height: .5rem;
        bg-image('./img/notice')
        background-size: .37rem .31rem;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .noticeContent {
        height: 100%;
        /*width: 100%;*/
        overflow: hidden;
      }
      .divBox{
        /*width: 1100%;*/
        height: 100%;
        wrap: no-wrap;
        /*display: flex;*/
        /*justify-content: center;*/
        /*flex-wrap: no-wrap*/
        /*animation: barrageRun 20s linear infinite;*/
        span {
          display inline-block
          line-height: .5rem;
          padding: 0 .2rem
          font-size .2rem
        }
        li{
          float:left;
          width: 6.5rem;
          height: .5rem;
          color:#fff;
          line-height: .5rem;
          overflow:hidden;
          font-size .24rem
          text-overflow:ellipsis;
          white-space:nowrap;
          /*padding-left:2.5rem;*/
          text-align: left;
          /*text-align: center;*/
          span{
            color: #ffc813;
          }
        }
      }
    }
    .swiperContainer {
      width: 100%;
      height 400px
      margin 0 auto
      margin-top 1.0rem
      touch-action none
      .dx {
        /*height 440px !important*/
        /*width 6rem*/
        .botS {
          background-color blue
        }
      }
      .vux-indicator-center > a {
        width .6rem
        height .6rem
      }
      .vux-swiper-item {
        display flex 
        justify-content center
      }
      .vux-swiper {
        /*width: 3rem;*/
        .swiperUntil {
          background-color: #1e1e1e;
          width 5.7rem
          height 100%
          display flex
          flex-direction column
          justify-content center
          text-align center
          .topB {
            flex 1
            border: .02rem solid #333333;
            .downTime {
              margin-left: .1rem
              padding-left .25rem
              height: .42rem;
              font-size: .18rem;
              line-height: .42rem;
              text-align left
              bg-image('./img/time')
              background-position: left center;
              background-size: .25rem .24rem;
              background-repeat: no-repeat;
            }
            .battleBoth {
              margin-top .26rem
              .top {
                height: .82rem;
                line-height: .82rem;
                font-size .24rem
                color $color-meta
              }
              .both {
                display flex
                justify-content center
                height: 2.1rem;
                .homeTeam {
                  flex 211
                  .logo {
                    height: 1.1rem;
                    padding-top: .2rem;
                    img {
                      height: 0.97rem;
                      width: 1.2rem;
                      border-radius 50%
                    }
                  }
                  .name {
                    height: .6rem;
                    line-height: .6rem
                    font-size .24rem
                  }
                }
                .vs {
                  flex 143
                  height: 1.3rem;
                  line-height: 1.3rem;
                  font-size .52rem
                  font-weight bold
                }
                .noVs {
                  font-size .4rem
                  font-weight bold
                }
                .guestTeam {
                  flex 211
                  .logo {
                    height: 1.1rem;
                    padding-top: .2rem;
                    img {
                      height: .97rem;
                      width: 1.2rem;
                      border-radius 50%
                    }
                  }
                  .name {
                    height: .6rem;
                    line-height: .6rem
                    font-size .24rem
                  }
                }
              }
            }
            .prize {
              height: 1.78rem;
              line-height: 1.78rem;
              font-size: .38rem;
              bg-image('./img/prizebg')
              background-size: 4.68rem 1.78rem;
              background-repeat: no-repeat;
              background-position: center center;
              position: relative;
              color: #fffc91;
              .prizeText {
                height: .5rem;
                line-height: .5rem
                width: 100%;
                position: absolute;
                left 50%
                top 50%
                font-weight bold
                transform translate(-50%, -50%)
                background: linear-gradient( #fffc91, #ffce05);
                -webkit-background-clip: text;
                color: transparent;
              }
            }
            .playNotice {
              margin-top .3rem
              height: .56rem;
              line-height: .56rem;
              color: #999
              font-size .24rem
            }
          }
          .bottom {
            flex 0 0 1.04rem
            line-height 1.04rem
            /*font-weight bold*/
            color #000
            font-size .34rem
            background-color $color-meta
          }
          .green {
            background-color: #7ad06d;
            color #fff
          }
        }
      }
    }
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
