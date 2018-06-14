<template>
<transition name="slide">
  <div class="home">
    <!--<div class="headerTop">
      <x-header style="background-color:#ffcc00;arrow-color:#fff;" :left-options="{backText: ''}">{{$t('home.title')}}</x-header>
    </div>-->
    <!--<prizemode
      :showPrize="prizeModeState"
      :prizeTotal="firstPrize.prizeMoney"
      :needGold="lockSectionInfo.allOpenMoney"
      @hidePrizeMode="hidePrizeMode"
      @sureJoin = "sureJoin"
    ></prizemode>-->
    <scroll
      :listenScroll="listenScroll"
      :data="matchPreview"
      @scroll="scrolls"
      @scrollDown="pullUp"
      @pullDown="pullDowns"
      class="scrollContent">
        <div class="bigBox">
          <div class="matchInfo">
            <div class="matchScore relative">
              <div class="matchPrize"><span>{{firstPrize.prizeMoney}}</span>{{firstPrize.goodsName}}</div>
              <!--<div class="nowUntil">{{data.matchStageDesc}}</div>-->
              <!--<div class="nowUntil" v-else>{{data.runningSectionId | matchStateType(data.matchState)}}</div>-->
              <div class="bothTeamInfo">
                <div class="teamLeft">
                  <div class="logo">
                    <div class="imgBox">
                      <img :src="data.homeTeamLogoUrl" alt="">
                    </div>
                  </div>
                  <div class="homeName text-center">
                    {{data.homeTeamName}}（主）
                    <!--<div class="reallyName ellipsis">{{data.homeTeamName}}</div><div class="text">（主）</div>-->
                  </div>
                </div>
                <div class="teamMiddle text-center">
                  <div class="title">{{data.leagueName}}</div>
                  <div class="matchTime">
                    <!--<div class="timeText">{{data.matchStageType | matchStateType(data.matchTime )}}</div>-->
                    <div class="timeText" v-if="data.matchStageDesc === '未开赛'">{{data.matchTime | timeFormat('M/d hh:mm')}}</div>
                    <div class="timeText" v-else>{{data.matchStageDesc}}</div>
                  </div>
                </div>
                <div class="teamRight">
                  <div class="logo">
                    <div class="imgBox">
                      <img :src="data.guestTeamLogoUrl" alt="">
                    </div>
                  </div>
                  <div class="homeName text-center">
                    {{data.guestTeamName}}（客）
                    <!--<div class="reallyName ellipsis">{{data.guestTeamName}}</div><div class="text">（客）</div>-->
                  </div>
                </div>
              </div>
              <div class="bottomInfo absolute text-center">同时猜中3种赛果，可以平分奖池</div>
            </div>
            <div class="joinPeople">
              <div class="people">
                <div class="joinLeft">
                  已选： {{betNum}}/{{this.data.totalPassNum + 3}}
                  <div class="questionIcon" @click="showQuestion"></div>
                </div>
                <div class="joinRight">
                  参与人数： {{data.hasJoinedPeopleNum}}
                </div>
              </div>
              <!--<div class="aboutShank" @click="showShank">当前排名</div>-->
            </div>
          </div>
          <div class="guessContainer">
            <div class="guessResult">
              <div class="guessTitle">
                猜胜平负
              </div>
              <!--result-->
              <!--choosed-->
              <!--chooseErr-->
              <div class="guessButtonContainer">
                <div class="buttonUntil" :class="[{choosed: judgeIs(winObj.keyString, '3')},{result: judgeIs(winObj.result, '3')},{chooseErr: winObj.result && judgeIs(winObj.isChoosed, '3') && !judgeIs(winObj.result, '3')}]" @click.prevent="guessWin(winObj, '3')">{{data.homeTeamName}} <span>胜</span></div>
                <div class="buttonUntil" :class="[{choosed: judgeIs(winObj.keyString, '1')},{result: judgeIs(winObj.result, '1')},{chooseErr: winObj.result && judgeIs(winObj.isChoosed, '1') && !judgeIs(winObj.result, '1')}]" @click.prevent="guessWin(winObj, '1')"><span>平</span></div>
                <div class="buttonUntil" :class="[{choosed: judgeIs(winObj.keyString, '0')},{result: judgeIs(winObj.result, '0')},{chooseErr: winObj.result && judgeIs(winObj.isChoosed, '0') && !judgeIs(winObj.result, '0')}]" @click.prevent="guessWin(winObj, '0')">{{data.guestTeamName}} <span>胜</span></div>
              </div>
            </div>
            <div class="guessSize">
              <div class="guessTitle">
                猜大小球
              </div>
              <div class="guessButtonContainer">
                <div class="buttonUntil" :class="[{choosed: judgeIs(ballSize.keyString, 'GT')},{result: judgeIs(ballSize.result, 'GT')},{chooseErr: ballSize.result && judgeIs(ballSize.isChoosed, 'GT') && !judgeIs(ballSize.result, 'GT')}]" @click.prevent="guessScore(ballSize, 'GT')">高于 <span>{{this.data.waterline}}</span></div>
                <div class="buttonUntil" :class="[{choosed: judgeIs(ballSize.keyString, 'EQ')},{result: judgeIs(ballSize.result, 'EQ')},{chooseErr: ballSize.result && judgeIs(ballSize.isChoosed, 'EQ') && !judgeIs(ballSize.result, 'EQ')}]" @click.prevent="guessScore(ballSize, 'EQ')"><span>平</span></div>
                <div class="buttonUntil" :class="[{choosed: judgeIs(ballSize.keyString, 'LT')},{result: judgeIs(ballSize.result, 'LT')},{chooseErr: ballSize.result && judgeIs(ballSize.isChoosed, 'LT') && !judgeIs(ballSize.result, 'LT')}]" @click.prevent="guessScore(ballSize, 'LT')">低于 <span>{{this.data.waterline}}</span></div>
              </div>
            </div>
            <div class="guessScore">
              <div class="guessTitle">
                猜全场比分
              </div>
              <!--主队赢-->
              <div class="guessButtonSmall">
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '1:0')},{result: judgeIs(BFobj.result, '1:0')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '1:0') && !judgeIs(BFobj.result, '1:0')}]" @click.prevent="guessBF(BFobj, '1:0')"><span>1:0</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '2:0')},{result: judgeIs(BFobj.result, '2:0')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '2:0') && !judgeIs(BFobj.result, '2:0')}]" @click.prevent="guessBF(BFobj, '2:0')"><span>2:0</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '2:1')},{result: judgeIs(BFobj.result, '2:1')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '2:1') && !judgeIs(BFobj.result, '2:1')}]" @click.prevent="guessBF(BFobj, '2:1')"><span>2:1</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '3:0')},{result: judgeIs(BFobj.result, '3:0')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '3:0') && !judgeIs(BFobj.result, '3:0')}]" @click.prevent="guessBF(BFobj, '3:0')"><span>3:0</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '3:1')},{result: judgeIs(BFobj.result, '3:1')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '3:1') && !judgeIs(BFobj.result, '3:1')}]" @click.prevent="guessBF(BFobj, '3:1')"><span>3:1</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '3:2')},{result: judgeIs(BFobj.result, '3:2')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '3:2') && !judgeIs(BFobj.result, '3:2')}]" @click.prevent="guessBF(BFobj, '3:2')"><span>3:2</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '4:0')},{result: judgeIs(BFobj.result, '4:0')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '4:0') && !judgeIs(BFobj.result, '4:0')}]" @click.prevent="guessBF(BFobj, '4:0')"><span>4:0</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '4:1')},{result: judgeIs(BFobj.result, '4:1')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '4:1') && !judgeIs(BFobj.result, '4:1')}]" @click.prevent="guessBF(BFobj, '4:1')"><span>4:1</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '4:2')},{result: judgeIs(BFobj.result, '4:2')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '4:2') && !judgeIs(BFobj.result, '4:2')}]" @click.prevent="guessBF(BFobj, '4:2')"><span>4:2</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '9:0')},{result: judgeIs(BFobj.result, '9:0')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '9:0') && !judgeIs(BFobj.result, '9:0')}]" @click.prevent="guessBF(BFobj, '9:0')"><span>胜其他</span></div>
              </div>
              <!--平-->
              <div class="guessButtonSmall marginBoth">
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '0:0')},{result: judgeIs(BFobj.result, '0:0')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '0:0') && !judgeIs(BFobj.result, '0:0')}]" @click.prevent="guessBF(BFobj, '0:0')"><span>0:0</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '1:1')},{result: judgeIs(BFobj.result, '1:1')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '1:1') && !judgeIs(BFobj.result, '1:1')}]" @click.prevent="guessBF(BFobj, '1:1')"><span>1:1</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '2:2')},{result: judgeIs(BFobj.result, '2:2')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '2:2') && !judgeIs(BFobj.result, '2:2')}]" @click.prevent="guessBF(BFobj, '2:2')"><span>2:2</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '3:3')},{result: judgeIs(BFobj.result, '3:3')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '3:3') && !judgeIs(BFobj.result, '3:3')}]" @click.prevent="guessBF(BFobj, '3:3')"><span>3:3</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '9:9')},{result: judgeIs(BFobj.result, '9:9')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '9:9') && !judgeIs(BFobj.result, '9:9')}]" @click.prevent="guessBF(BFobj, '9:9')"><span>平其他</span></div>
              </div>
              <!--客队赢-->
              <div class="guessButtonSmall">
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '0:1')},{result: judgeIs(BFobj.result, '0:1')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '0:1') && !judgeIs(BFobj.result, '0:1')}]" @click.prevent="guessBF(BFobj, '0:1')"><span>0:1</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '0:2')},{result: judgeIs(BFobj.result, '0:2')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '0:2') && !judgeIs(BFobj.result, '0:2')}]" @click.prevent="guessBF(BFobj, '0:2')"><span>0:2</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '1:2')},{result: judgeIs(BFobj.result, '1:2')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '1:2') && !judgeIs(BFobj.result, '1:2')}]" @click.prevent="guessBF(BFobj, '1:2')"><span>1:2</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '0:3')},{result: judgeIs(BFobj.result, '0:3')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '0:3') && !judgeIs(BFobj.result, '0:3')}]" @click.prevent="guessBF(BFobj, '0:3')"><span>0:3</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '1:3')},{result: judgeIs(BFobj.result, '1:3')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '1:3') && !judgeIs(BFobj.result, '1:3')}]" @click.prevent="guessBF(BFobj, '1:3')"><span>1:3</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '2:3')},{result: judgeIs(BFobj.result, '2:3')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '2:3') && !judgeIs(BFobj.result, '2:3')}]" @click.prevent="guessBF(BFobj, '2:3')"><span>2:3</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '0:4')},{result: judgeIs(BFobj.result, '0:4')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '0:4') && !judgeIs(BFobj.result, '0:4')}]" @click.prevent="guessBF(BFobj, '0:4')"><span>0:4</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '1:4')},{result: judgeIs(BFobj.result, '1:4')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '1:4') && !judgeIs(BFobj.result, '1:4')}]" @click.prevent="guessBF(BFobj, '1:4')"><span>1:4</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '2:4')},{result: judgeIs(BFobj.result, '2:4')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '2:4') && !judgeIs(BFobj.result, '2:4')}]" @click.prevent="guessBF(BFobj, '2:4')"><span>2:4</span></div>
                <div class="buttonUntilSmall" :class="[{choosed: judgeIs(BFobj.keyString, '0:9')},{result: judgeIs(BFobj.result, '0:9')},{chooseErr: BFobj.result && judgeIs(BFobj.isChoosed, '0:9') && !judgeIs(BFobj.result, '0:9')}]" @click.prevent="guessBF(BFobj, '0:9')"><span>负其他</span></div>
              </div>
            </div>
          </div>
          <div class="sureButton text-center" v-if="payGolds > 0 && data.matchState < 1 && betItemNum < data.totalPassNum + 3" @click="joinGame()">需要消耗{{payGolds}}金币</div>
          <!--{{choosedNum}}---{{payNum}}-->
          <div class="sureButton text-center gray" v-if="betItemNum === data.totalPassNum + 3 &&  data.matchState < 1">已完成投注</div>
          <div class="sureButton text-center" v-if="payGolds <= 0  && data.matchState < 1 && betItemNum < data.totalPassNum + 3" @click="joinGame()">提交</div>
          <div class="sureButton text-center gray" v-else-if="data.matchState >= 1">已截止</div>
          <!--<div class="sureButton text-center">需要消耗xx金币{{choosedNum}}</div>-->
          <div style="height: .3rem"></div>
        </div>
    </scroll>
    <transition name="fade">
      <shank v-if="shank" @hideshank="hideShankNow" :totalPassNum="data.totalPassNum" :freePassNum="data.freePassNum"></shank>
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
  import { getHomeInfo, getJoinGuess } from '@/api/home'
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import shank from '@/components/shank/shank'
  import prizemode from '@/components/prizemode/prizemode'
  import { mapState } from 'vuex'
  import { XHeader, Swiper, SwiperItem, Checker, CheckerItem, Confirm } from 'vux'
  export default {
    data () {
      return {
        listenScroll: true,
        shank: false,
        step: 10,
        data: {},
        moveDistance: 80,
        prizeModeState: false, // 奖品弹窗状态
        userCode: '',
        userInfo: {},
        lockSectionInfo: {},
        firstPrize: {},
        secondPrize: {},
        lkey: '',
        recharge: false,
        isPull: false,
        thirdPrize: {},
        uniqueId: null,
        matchNo: null,
        payNum: null,
        payGolds: '',
        matchPreview: [], // 赛事预告数据
        prizeInfo: [], // 奖品信息
        matchScore: {}, // 每节得分情况
        matchSectionBet: [], // 每节比赛投注信息
        levelIndex: 0, // 当前关卡索引
        runTimer: null, // 计时器
        BFobj: {temChoose: [], keyString: '', isChoosed: '', betItem: []},
        winObj: {temChoose: [], keyString: '', isChoosed: '', betItem: []}, // 胜负平对象
        ballSize: {temChoose: [], keyString: '', isChoosed: '', betItem: []} // 大小球对象
      }
    },
    created () {
      this.uniqueId = this.$route.query.uniqueId
      this.matchNo = this.$route.query.matchNo
      this.getPageInfo()
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfoNBA')) || {}
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {
      showQuestion () {
        this.shank = true
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
      pullUp () {
      },
      scrollDowns () {
        // 触底加载+-
      },
      pullDowns () {
        clearInterval(this.runTimer)
        this.getPageInfo(true)
        this.isPull = true
        // 下拉刷新
      },
      scrolls () {
      },
      getPageInfo (action) {
        this.$loading({
          state: true
        })
        // let that = this
        getHomeInfo({uniqueId: this.uniqueId, matchNo: this.matchNo, lotyId: 'JCZQ', betType: 'JCDY', lkey: this.lkey || localStorage.getItem('lkeyNBA')}).then(res => {
          if (res.data.errCode === 0) {
            this.data = res.data.data
            this.payNum = 3 + this.data.betPayPassNum
            this.matchBetInfo = res.data.data.matchBetInfo
            console.log(this.matchBetInfo, 'matchBetInfo')
            this.BFobj = {...this.matchBetInfo.BF, keyString: this.matchBetInfo.BF.betItem.toString(), temChoose: [].concat(this.matchBetInfo.BF.betItem), isChoosed: this.matchBetInfo.BF.betItem.toString()}
            this.winObj = {...this.matchBetInfo.SPF, keyString: this.matchBetInfo.SPF.betItem.toString(), temChoose: [].concat(this.matchBetInfo.SPF.betItem), isChoosed: this.matchBetInfo.SPF.betItem.toString()}
            this.ballSize = {...this.matchBetInfo.DXF, keyString: this.matchBetInfo.DXF.betItem.toString(), temChoose: [].concat(this.matchBetInfo.DXF.betItem), isChoosed: this.matchBetInfo.DXF.betItem.toString()}
            console.log(this.winObj.betItem, 'dasd')
            this.prizeInfo = res.data.data.prizeInfo // 奖品信息
            this.firstPrize = res.data.data.prizeInfo[0] || {}
            this.secondPrize = res.data.data.prizeInfo[1] || {}
            this.thirdPrize = res.data.data.prizeInfo[2] || {}
            this.$loading({
              state: false
            })
          } else if (res.data.errCode === 3) {
            // that.getPageInfo()
            // window.location.href = window.location.href
          } else if (res.data.errCode === 1 && res.data.retCode === 1) {
            this.$loading({
              state: false
            })
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 1500,
              text: '暂无比赛',
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
      // 投注
      joinGame () {
        let DXF = this.ballSize.temChoose.toString()
        let DXF_ = this.ballSize.isChoosed.toString()
        let SPF = this.winObj.temChoose.toString()
        let SPF_ = this.winObj.isChoosed.toString()
        let BF = this.BFobj.temChoose.toString()
        let BF_ = this.BFobj.isChoosed.toString()
        if (DXF === DXF_ && SPF === SPF_ && BF === BF_) {
          this.$vux.toast.show({
            position: 'middle',
            width: '16em',
            type: 'text',
            time: 700,
            text: '请选择',
            isShowMask: true
          })
          return false
        }
        let myBet = {
          DXF: DXF,
          SPF: SPF,
          BF: BF
        }
        Object.keys(myBet).forEach(v => {
          console.log(v, 'this.is/////////')
          if (myBet[v]) {
            return false
          }
          // myBet[v] === '' ? return : ''
        })
        let params = {
          lotyId: 'JCZQ',
          betType: 'JCDY',
          issueNo: this.data.issueNo,
          betItemBo: JSON.stringify(myBet)
        }
        getJoinGuess(params).then(res => {
          if (res.data.errCode === 0) {
            this.$vux.toast.show({
              position: 'middle',
              width: '16em',
              type: 'text',
              time: 700,
              text: '投注成功',
              isShowMask: true
            })
            if (this.levelIndex < 4) {
              this.levelIndex = this.levelIndex + 1
            }
            this.getPageInfo()
          } else if (res.data.retCode === 2109) {
            this.showPlugin()
          } else {
            if (res.data.errCode === 2 && res.data.retCode === 2144) {
              this.$vux.toast.show({
                position: 'middle',
                width: '16em',
                type: 'text',
                time: 700,
                text: '未解锁',
                isShowMask: true
              })
              // this.prizeModeState = true
            } else {
              this.$vux.toast.show({
                position: 'middle',
                width: '16em',
                type: 'text',
                time: 700,
                text: '提交失败，请重试',
                isShowMask: true
              })
            }
            this.getPageInfo()
          }
        })
      },
      hidePrizeMode () {
        // 控制奖品弹窗
        this.prizeModeState = false
      },
      // 跳转用户中心
      goUserPage () {
        this.$router.push({name: 'userCenter'})
      },
      // 猜胜负
      guessWin (item, e) {
        // let defaultLevel = 1
        // let freeLevel = this.data.freePassNum
        if (item.sectionId === 5 && e === '1') {
          return
        }
        if (this.data.matchState >= 1) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已截至',
            isShowMask: true
          })
          return
        }
        // 以前投注了的
        if (item.isChoosed.indexOf(e) !== -1 || item.isChoosed.indexOf(e) === 0) {
          return
        }
        // 第一次选中
        if (item.keyString.indexOf(e) === -1) {
          if (this.choosedNum >= (3 + this.data.totalPassNum)) {
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 700,
              text: `最多选择${3 + this.data.totalPassNum}项`,
              isShowMask: true
            })
            return
          }
          // 任意一个有选择大于3 的 其他项目就最多选择两项
          if ((this.BFobjNum >= 3 || this.ballSizeNum >= 3)) {
            if (item.temChoose.length >= 2) {
              return
            }
            // 若 比分项 选择超过或者等于4个(配置关卡总数加上自己的默认的1) 为保证其他选项都有选择
            if (this.BFobjNum >= (1 + this.data.totalPassNum) && item.temChoose.length >= 1) {
              return
            }
          }
          item.temChoose.push(e)
          // 数组去重
          let temArr = [...new Set(item.temChoose)]
          item.keyString = temArr.toString()
        } else { // 第二次选中取消
          item.temChoose.forEach((val, ind) => {
            if (val === e) {
              item.temChoose.splice(ind, 1)
            }
          })
          let temArr = [...new Set(item.temChoose)]
          item.keyString = temArr.toString()
        }
        // let length = item.temChoose.length
        // if (length > defaultLevel + freeLevel) {
        //   // if (this.ballSize.temChoose.length < defaultLevel + freeLevel) {
        //   //   return
        //   // }
        //   // if (this.BFobj.temChoose.length < defaultLevel + freeLevel) {
        //   //   return
        //   // }
        //   this.$vux.toast.show({
        //     position: 'middle',
        //     type: 'text',
        //     width: '16em',
        //     time: 200,
        //     text: '免费关卡已用完',
        //     isShowMask: true
        //   })
        // }
      },
      // 猜比分
      guessBF (item, e) {
        // let defaultLevel = 1
        // let freeLevel = this.data.freePassNum
        if (item.sectionId === 5 && e === '1') {
          return
        }
        if (this.data.matchState >= 1) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已截至',
            isShowMask: true
          })
          return
        }
        // 以前投注了的
        if (item.isChoosed.indexOf(e) !== -1 || item.isChoosed.indexOf(e) === 0) {
          return
        }
        // 第一次选中
        if (item.keyString.indexOf(e) === -1) {
          // 任意一个有选择大于3 的 其他项目就最多选择两项
          if ((this.winObjNum >= 3 || this.ballSizeNum >= 3) && item.temChoose.length >= 2) {
            return
          }
          // 任意一个有一项没选 且有项大于等于2 就不能选择4项
          if (((this.winObjNum === 0 && this.ballSizeNum >= 2) || (this.winObjNum >= 2 && this.ballSizeNum === 0)) && item.temChoose.length >= 3) {
            return
          }
          if (this.choosedNum >= 3 + this.data.totalPassNum) {
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 700,
              text: `最多选择${3 + this.data.totalPassNum}项`,
              isShowMask: true
            })
            return
          }
          if (item.temChoose.length >= 4) {
            return
          }
          item.temChoose.push(e)
          // 数组去重
          let temArr = [...new Set(item.temChoose)]
          item.keyString = temArr.toString()
        } else { // 第二次选中取消
          item.temChoose.forEach((val, ind) => {
            if (val === e) {
              item.temChoose.splice(ind, 1)
            }
          })
          let temArr = [...new Set(item.temChoose)]
          item.keyString = temArr.toString()
        }
        // let length = item.temChoose.length
        // console.log(item.temChoose, 'item.temChoose1111')
        // if (length > defaultLevel + freeLevel) {
        //   // if (this.ballSize.temChoose.length < defaultLevel + freeLevel) {
        //   //   return
        //   // }
        //   // if (this.winObj.temChoose.length < defaultLevel + freeLevel) {
        //   //   return
        //   // }
        //   this.$vux.toast.show({
        //     position: 'middle',
        //     type: 'text',
        //     width: '16em',
        //     time: 200,
        //     text: '免费关卡已用完',
        //     isShowMask: true
        //   })
        // }
      },
      // 判断字符串中是否存在
      judgeIs (string, e) {
        if (typeof string !== 'string') {
          return
        }
        if (string.indexOf(e) !== -1 || string.indexOf(e) === 0) {
          return true
        } else {
          return false
        }
      },
      // 猜大小球
      guessScore (item, e) {
        // let defaultLevel = 1
        // let freeLevel = this.data.freePassNum
        console.log(item.temChoose, '///////--------')
        if (item.sectionId === 5 && e === '1') {
          return
        }
        if (this.data.matchState >= 1) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已截至',
            isShowMask: true
          })
          return
        }
        // 上次已经提交
        if (item.isChoosed.indexOf(e) !== -1 || item.isChoosed.indexOf(e) === 0) {
          return
        }
        // 第一次选中
        if (item.keyString.indexOf(e) === -1) {
          if (this.choosedNum >= 3 + this.data.totalPassNum) {
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 700,
              text: `最多选择${3 + this.data.totalPassNum}项`,
              isShowMask: true
            })
            return
          }
          // 任意一个有选择大于3 的 其他项目就最多选择两项
          if ((this.BFobjNum >= 3 || this.winObjNum >= 3)) {
            if (item.temChoose.length >= 2) {
              return
            }
            // 若 比分项 选择超过或者等于4个(配置关卡总数加上自己的默认的1) 为保证其他选项都有选择
            if (this.BFobjNum >= (1 + this.data.totalPassNum) && item.temChoose.length >= 1) {
              return
            }
          }
          item.temChoose.push(e)
          // 数组去重
          let temArr = [...new Set(item.temChoose)]
          item.keyString = temArr.toString()
        } else { // 第二次选中取消
          item.temChoose.forEach((val, ind) => {
            if (val === e) {
              item.temChoose.splice(ind, 1)
            }
          })
          let temArr = [...new Set(item.temChoose)]
          item.keyString = temArr.toString()
        }
        // let length = item.temChoose.length
        // console.log(item.temChoose, 'item.temChoose000')
        // if (length > defaultLevel + freeLevel) {
        //   // if (this.BFobj.temChoose.length < defaultLevel + freeLevel) {
        //   //   return
        //   // }
        //   // if (this.winObj.temChoose.length < defaultLevel + freeLevel) {
        //   //   return
        //   // }
        //   this.$vux.toast.show({
        //     position: 'middle',
        //     type: 'text',
        //     width: '16em',
        //     time: 200,
        //     text: '免费关卡已用完',
        //     isShowMask: true
        //   })
        // }
        console.log(item.temChoose, 'item.temChoose', item.keyString)
      },
      showShank () {
        this.shank = true
      },
      hideShankNow () {
        this.shank = false
      },
      payGold (e) {
        let feeNum = e
        console.log(feeNum, '88888888888888')
        let sum = 0
        let arr = [].concat(this.data.openPassCnf)
        // if (this.choosedNum > this.payNum) {
        for (let i = 1; i <= feeNum; i++) {
          sum = sum + arr[i - 1].openPassMoney
        }
        sum = sum - this.data.betPayMoney
        return sum
        // }
      }
    },
    computed: {
      ...mapState({
        countx: state => state.lkey
      }),
      betItemNum () {
        return this.winObj.betItem.length + this.ballSize.betItem.length + this.BFobj.betItem.length
      },
      choosedNum () {
        return this.winObj.temChoose.length + this.ballSize.temChoose.length + this.BFobj.temChoose.length
      },
      betNum () {
        console.log(this.BFobj.length, 'this.BFobj.length/////////////')
        return this.BFobj.betItem.length + this.winObj.betItem.length + this.ballSize.betItem.length
      },
      winObjNum () {
        return this.winObj.temChoose.length
      },
      BFobjNum () {
        return this.BFobj.temChoose.length
      },
      ballSizeNum () {
        return this.ballSize.temChoose.length
      }
    },
    watch: {
      choosedNum (newV, old) {
        if (newV > old) {
        }
      },
      winObjNum (newV, old) {
        let freeLevel = 1 + this.data.freePassNum
        let add = ((this.ballSizeNum - freeLevel) <= 0 ? 0 : (this.ballSizeNum - freeLevel)) + ((this.BFobjNum - freeLevel) <= 0 ? 0 : (this.BFobjNum - freeLevel)) + ((newV - freeLevel) <= 0 ? 0 : (newV - freeLevel))
        console.log((this.ballSizeNum - freeLevel) >= 0 || (this.BFobjNum - freeLevel) >= 0, '(this.ballSizeNum - freeLevel) >= 0 || (this.BFobjNum - freeLevel) >= 0')
        if ((this.ballSizeNum - freeLevel) >= 0) {
          add = ((this.ballSizeNum - freeLevel) <= 0 ? 0 : (this.ballSizeNum - freeLevel)) + ((this.BFobjNum - 1) <= 0 ? 0 : (this.BFobjNum - 1)) + ((newV - 1) <= 0 ? 0 : (newV - 1))
        } else if ((this.BFobjNum - freeLevel) >= 0) {
          add = ((this.ballSizeNum - 1) <= 0 ? 0 : (this.ballSizeNum - 1)) + ((this.BFobjNum - freeLevel) <= 0 ? 0 : (this.BFobjNum - freeLevel)) + ((newV - 1) <= 0 ? 0 : (newV - 1))
        }
        this.payGolds = this.payGold(add)
      },
      BFobjNum (newV, old) {
        let freeLevel = 1 + this.data.freePassNum
        let add = ((this.ballSizeNum - freeLevel) <= 0 ? 0 : (this.ballSizeNum - freeLevel)) + ((this.winObjNum - freeLevel) <= 0 ? 0 : (this.winObjNum - freeLevel)) + ((newV - freeLevel) <= 0 ? 0 : (newV - freeLevel))
        if ((this.ballSizeNum - freeLevel) >= 0) {
          add = ((this.ballSizeNum - freeLevel) <= 0 ? 0 : (this.ballSizeNum - freeLevel)) + ((this.winObjNum - 1) <= 0 ? 0 : (this.winObjNum - 1)) + ((newV - 1) <= 0 ? 0 : (newV - 1))
        } else if ((this.winObjNum - freeLevel) >= 0) {
          add = ((this.ballSizeNum - 1) <= 0 ? 0 : (this.ballSizeNum - 1)) + ((this.winObjNum - freeLevel) <= 0 ? 0 : (this.winObjNum - freeLevel)) + ((newV - 1) <= 0 ? 0 : (newV - 1))
        }
        this.payGolds = this.payGold(add)
      },
      ballSizeNum (newV, old) {
        let freeLevel = 1 + this.data.freePassNum
        // 任意一个用了免费的名额 其他都么得用
        let add = ((this.winObjNum - freeLevel) <= 0 ? 0 : (this.winObjNum - freeLevel)) + ((this.BFobjNum - freeLevel) <= 0 ? 0 : (this.BFobjNum - freeLevel)) + ((newV - freeLevel) <= 0 ? 0 : (newV - freeLevel))
        if ((this.BFobjNum - freeLevel) >= 0) {
          add = ((this.BFobjNum - freeLevel) <= 0 ? 0 : (this.BFobjNum - freeLevel)) + ((this.winObjNum - 1) <= 0 ? 0 : (this.winObjNum - 1)) + ((newV - 1) <= 0 ? 0 : (newV - 1))
        } else if ((this.winObjNum - freeLevel) >= 0) {
          add = ((this.BFobjNum - 1) <= 0 ? 0 : (this.BFobjNum - 1)) + ((this.winObjNum - freeLevel) <= 0 ? 0 : (this.winObjNum - freeLevel)) + ((newV - 1) <= 0 ? 0 : (newV - 1))
        }
        // add 算的是要收费的关卡数量
        this.payGolds = this.payGold(add)
      }
    },
    components: {
      scroll,
      loading,
      XHeader,
      shank,
      SwiperItem,
      Swiper,
      CheckerItem,
      Checker,
      prizemode,
      Confirm
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"
  .home {
    height: 100vh;
    /*background-color $color-default-color;*/
    font-size:0.16rem;
    background-image: url('./img/bigBg.jpg');
    background-size: contain;
    width: 100%;
    position: fixed;
    /*touch-action: none;*/
    top 0
    color: #fff;
    .headerTop {
      position: absolute;
      height: .92rem;
      top 0
      width: 100%;
      z-index 10
    }
    .scrollContent {
      /*position: fixed;*/
      /*height: 10rem;*/
      height: 70vh;
      /*margin-top: 46px;*/
      /*padding-bottom:2rem;*/
      .bigBox {
        .matchInfo {
          width: 7.5rem;
          margin: 0 auto;
          height: 4.3rem;
          touch-action none
          .teamInfo {
            height: .4rem;
            line-height: .4rem;
            margin-bottom: 0.04rem;
            font-size .24rem
            display: flex;
            .teamName {
              flex: 1;
              // background-color: #fff;
              .nowScoreLeft {
                width .65rem
                text-align center
                float right 
                display inline-block
                color: $color-meta
                background-color #1e1e1e
              }
              .nowScoreRight {
                width .65rem
                text-align center
                float left 
                display inline-block
                color: $color-meta
                background-color #1e1e1e
              }
            }
            .space {
              flex: 0 0 .04rem;  
            }
          }
          .matchScore {
            width: 100%;
            height: 3.67rem;
            position: relative;
            bg-image('./img/topBg')
            /*background-size: contain;*/
            background-size: 7.5rem 3.67rem;
            background-repeat: no-repeat;
            background-position: center center;
            width 100%
            /*bg-image('./img/basebg')*/
            display flex
            justify-content center
            align-items center
            flex-wrap wrap
            position relative
            .matchPrize{
              width: 100%;
              margin-top .66rem
              font-size .34rem
              text-align center
              background: linear-gradient( #f8f4cf, #eecd90);
              -webkit-background-clip: text;
              color: transparent;
              font-weight bold
              span {
                font-size .6rem
                background: linear-gradient( #f8f4cf, #eecd90);
                -webkit-background-clip: text;
                color: transparent;
                font-weight bold
                font-size .5rem
              }
            }
            .bothTeamInfo {
              width: 6.61rem;
              height:1.76rem;
              padding-top .2rem
              display flex
              justify-content center
              align-items center
              .teamLeft {
                flex 208
                height: 100%;
                .homeName {
                  font-size .24rem
                  div {
                    display inline-block
                    vertical-align: middle;
                  }
                  .reallyName {
                    width: 100%;
                  }
                  .text {
                    /*width: 40%;*/
                  }
                }
                .logo {
                  height: .9rem;
                  text-align: center;
                  display flex
                  justify-content center
                  align-items center
                  .imgBox {
                    width: .92rem;
                    height: .92rem;
                    background-color: #e0d09d;
                    border-radius 50%
                    display flex
                    justify-content center
                    align-items center
                    img {
                      width: .84rem;
                      height: .84rem;
                      border-radius: 50%;
                    }
                  }
                }
              }
              .teamMiddle {
                flex 194
                height: 1.52rem;
                padding-top .24rem
                .title {
                  color $color-meta
                  font-size .24rem
                  height: .3rem;
                  line-height: .3rem;
                }
                .matchTime {
                  height: .3rem;
                  line-height: .3rem;
                  font-size .26rem
                  display flex
                  justify-content center
                  align-items center
                  .timeText {
                    /*width: 1.3rem;*/
                    width: 100%;
                    height: 100%;
                    border-radius .12rem
                  }
                }
                .vs {
                  width: 100%;
                  height: 1.1rem;
                  line-height: 1.1rem;
                  font-weight bold
                  font-size .38rem
                }
              }
              .teamRight {
                height: 100%;
                flex 208
                .homeName {
                  font-size .24rem;
                  div {
                    display inline-block
                    vertical-align: middle;
                  }
                  .reallyName {
                    width: 70%;
                  }
                  .text {
                    width: 30%;
                  }
                }
                .logo {
                  height: .9rem;
                  text-align: center;
                  display flex
                  justify-content center
                  align-items center
                  .imgBox {
                    width: .92rem;
                    height: .92rem;
                    background-color: #e0d09d;
                    border-radius 50%
                    display flex
                    justify-content center
                    align-items center
                    img {
                      width: .84rem;
                      height: .84rem;
                      border-radius: 50%;
                    }
                  }
                }
              }
            }
            .bottomInfo {
              position: absolute;
              width: 100%;
              bottom: 0;
              font-size .24rem
              color #cc9900
            }
            .scoreUntil {
              width 6.1rem
              height 1.1rem
              background-color rgba(0,0,0,.4)
              border-radius .08rem
              display flex
              justify-content center
              .teamBoth {
                flex 2
                font-size .24rem
                .everyNode {
                  width 100%
                  height .31rem
                  line-height .31rem
                  color #838280
                }
                .middle {
                  width 90%
                  padding-left 10%
                  height .4rem
                  line-height .4rem
                  text-align center
                }
                .bottom {
                  width 90%
                  padding-left 10%
                  height .4rem
                  line-height .4rem
                }
              }
              .chooseUntil {
                flex 1 
                text-align center
                .everyNode {
                  width 100%
                  height .31rem
                  line-height .31rem
                  color #838280
                }
                .middle {
                  width 100%
                  height .4rem
                  line-height .4rem
                }
                .bottom {
                  width 100%
                  height .4rem
                  line-height .4rem
                }
              }
              .allMatch {
                .middle {
                  color: $color-meta
                }
                .bottom {
                  color: $color-meta
                }
              }
            }
          }
          .joinPeople {
            height .50rem
            line-height .50rem
            width 7.1rem
            margin 0 auto
            background-color: #e0d9c6;
            border: 0.02rem solid #999966;
            border-radius .3rem
            font-size .24rem
            color #000
            display flex
            justify-content space-between
            .joinLeft {
              height .50rem
              line-height .50rem
              float: left;
              padding-left: .2rem;
              width: 1.8rem;
              position: relative;
              .questionIcon {
                position: absolute;
                top 50%
                transform translateY(-50%)
                right 0
                width: .28rem;
                height: .28rem;
                bg-image('./img/question')
                -webkit-background-size: contain;
                background-size: contain;
                background-repeat: no-repeat;
              }
            }
            .joinRight {
              float right
              display inline-block
              padding-right .2rem
            }
            .people {
              font-size .24rem
              width: 100%;
            }
            .aboutShank {
              padding-right .3rem
              bg-image('./img/shank')
              line-height .70rem
              background-size .26rem .24rem
              background-position center right
              background-repeat no-repeat
            }
          }
        }
        .guessContainer {
          color #000
          .guessTitle {
            height: .4rem;
            line-height: .4rem;
            font-size .24rem
          }
          .guessButtonContainer {
            height: .8rem;
            line-height: .8rem;
            .buttonUntil {
              text-align center
              float left
              width: 2.48rem;
              height: 100%;
              font-size .28rem
              margin-left .03rem
              transition: all ease-in-out .2s;
              background-color: #ccc;
              &:first-child {
                margin-left 0 !important
              }
              span {
                color #336633
              }
              &.choosed {
                background-color: #cc3333;
                color #fff
                span {
                  color $color-meta
                }
              }
              &.result {
                position: relative;
                /*background-color: #cc3333;*/
                /*color #fff
                span {
                  color $color-meta
                }*/
                &::before {
                  width: .38rem;
                  height: .4rem;
                  content: ''
                  position: absolute;
                  right 0
                  bottom 0
                  bg-image('./img/corner')
                  -webkit-background-size: contain;
                  background-size: contain;
                }
              }
              $.chooseErr {
                background-color: #999 !important;
              }
            }
          }
          .guessButtonSmall {
            width: 100%;
            height: 1.62rem;
            display flex
            justify-content space-between
            align-content space-between
            flex-wrap wrap
            &.marginBoth {
              margin .06rem 0
              height: .8rem;
            }
            .buttonUntilSmall {
              text-align center
              flex 0 0 1.48rem;
              height: .8rem;
              /*height: 100%;*/
              font-size .28rem
              line-height: .8rem;
              background-color: #ccc;
              span {
                color #336633
              }
              &.choosed {
                background-color: #cc3333;
                color #fff
                span {
                  color $color-meta
                }
              }
              &.result {
                position: relative;
                /*background-color: #cc3333;*/
                color #fff
                /*span {
                  color $color-meta
                }*/
                &::before {
                  width: .38rem;
                  height: .4rem;
                  content: ''
                  position: absolute;
                  right 0
                  bottom 0
                  bg-image('./img/corner')
                  -webkit-background-size: contain;
                  background-size: contain;
                }
              }
              $.chooseErr {
                background-color: #999 !important;
              }
            }
          }
          .guessResult {

          }
          .guessSize {

          }
          .guessScore {

          }
        }
        .sureButton {
          width: 7.12rem;
          height: .8rem;
          font-size .34rem
          line-height: .8rem;
          background-color: #cc3333;
          color: #fff
          margin 0 auto
          margin-top .12rem
          border-radius .12rem
          &.gray {
            background-color: #999;
          }
        }
      }
      /*overflow: hidden;*/
    }
  }
  .chooseErr {
    background-color: #999 !important;
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
