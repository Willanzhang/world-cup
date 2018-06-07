<template>
  <div class="container gradient relative">
    <!--<x-header style="background-color:#ffcc00;arrow-color:#fff;" :left-options="{backText: ''}">{{$t('kiting.title')}}</x-header>-->
    <div style="height:1.20rem;"></div>
    <!--提现-->
    <div v-if="drawAccountBind" class="center borderR">
      <div class="account clearfix bline">
        <div class="left " style="width: 100%;height:1.50rem;">
          <div class="font30 ellipsis text-center" style="width: 100%;line-heigth:.60rem;height:.60rem;line-height:.60rem;font-size:.3rem">红包余额</div>
          <div class="font42 ellipsis text-center" style="width: 100%;line-height:.75rem;font-size:.5rem;height:.90rem;">¥{{userInfo.cash}}</div>
        </div>
        <!--<div class="lf rline" style="height:80%; margin-top:.26rem;"></div>-->
      </div>
      <!--提现开始-->
      <div class="kitingText">
        <div class="bold" style="height:.38rem;line-height:.38rem;font-size:.3rem">
          转出金额
        </div>
        <div class="font50" style="height:.72rem;line-height:.72rem;">
          <div class="bline">
            <span class="inlineB21 font50" style="vertical-align: middle;">¥</span>
            <input class="font50" v-model="kitingMoney" auto-focus type="" placeholder="0" style="vertical-align: middle;height:.72rem;line-height:.72rem;display: inline-block;width:90%;"/>
          </div>
        </div>
      </div>
      <div class="kitingBottom">
        <span>账户余额¥{{userInfo.cash}}</span><span style="margin-left:.32rem;color:#5a5aab" v-if="true" @click="fillIn">全部转出</span>
      </div>
      <!--提现按钮-->
      <div class="kitingButton borderR text-center font36" @click="kitingButton(1)" style="color:#fff;">
        转出
      </div>
      <p style="fontsize:0.24rem;color:#999;text-align:center;margin-top:0.2rem">将转入账户：{{userInfo.drawAccount}}</p>

      
    </div>
    <!--填写支付宝和姓名-->
    <div v-else class="center" style="border-radius:.12rem;">
      <div  style="width:100%;height: 4.6rem;;font-size:0;">
        <div class="borderR" style="height:3.30rem;">
          <div class="phoneText">用于账户现金红包提现，确认后不可修改</div>
          <div class="bline">
            <input class="phoneTextInput" placeholder="填写支付宝账号" style="font-size:.24rem" v-model="drawAccount" auto-focus/>
          </div>
          <div class="bline">
            <input class="phoneTextInput" placeholder="填写真实姓名" style="font-size:.24rem" auto-focus v-model="userRealName" maxlength="20"/>
          </div>
        </div>
          <div class="borderR sure" @click="bindAccountName">确定</div>
      </div>
      <!--<div class="phoneButton absolute font36 text-center">
          <div class="borderR cancel" @click="cancel">取消</div>
      </div>-->
    </div>
    <!--信息绑定弹窗-->
    <div class="bg absolute"  v-if="toBind" style="height:100%;width:100%;">
      <div class="warn text-center">
        填写信息必须与支付宝账号的姓名、手机信息一致
      </div>
      <!--手机号码验证-->
      <div class="" v-if="toBind === 1" style="margin-top: .34rem;width:100%;height: 3.26rem;;font-size:0;">
        <div class="center borderR" style="height:1.50rem">
          <div class="phoneText gray">填写手机号码</div>
          <input type="tel" class="phoneText" style="font-size:.38rem" focus v-model="phone" maxlength="11"/>
        </div>
        <div class="center borderR relative" style="height:1.50rem;margin-top:.26rem;">
          <div class="phoneText gray">填写验证码</div>
          <input class="phoneText" style="font-size:.38rem;width:50%;" v-model="authCode" maxlength="4"/>
          <div v-if="!getCode" class="absolute getCode text-center borderR" @click="getPhoneCode(1)">
            <div>获取验证码</div>
          </div>
          <div v-else class="absolute getCode text-center borderR">
            <div>{{downTime}}s</div>
          </div>
        </div>
      </div>
      <!--身份验证-->
      <div class="" v-if="toBind === 2" style="margin-top: .34rem;width:100%;height: 3.26rem;;font-size:0;">
        <div class="center borderR" style="height:1.50rem;">
          <div class="phoneText gray">填写姓名</div>
          <input class="phoneText" style="font-size:.38rem" auto-focus v-model="userRealName" maxlength="20"/>
        </div>
        <div class="center borderR relative" style="height:1.50rem;margin-top:.26rem;">
          <div class="phoneText gray">填写身份证号</div>
          <input class="phoneText" style="font-size:.38rem" type="idcard" v-model="identityNo" maxlength="18"/>
        </div>
      </div>
      <!--提款账号-->
    </div>
    <!--<show-model v-if="showKiting" @cancel="goodBye" @sureKiting = "kitingNow" :kitingMoney="kitingMoney"></show-model>    -->
  </div>
</template>

<script>
  import loading from '@/components/loading/loading'
  import showModel from '@/components/showModel'
  import scroll from '@/components/scroll/scroll'
  import { XHeader } from 'vux'
  import {fetchBindPhone, fetchBindName, fetchAcount, fetchKitingInfo, fetchKiting} from '@/api/footerballguess'
  let timer
  export default {
    data () {
      return {
        list: [{name: 'tom', age: 12}, {name: 'tom', age: 12}, {name: 'tom', age: 12}, {name: 'tom', age: 12}, {name: 'tom', age: 12}, {name: 'tom', age: 12}],
        title: '正在加载...',
        height: 0,
        channelList: [],
        listenScroll: true,
        firstPull: true,
        userInfo: {},
        showKiting: false,
        loading: false, // 是否正在加载--
        phone: '',
        authCode: null, // 验证码
        actionType: 1, // 1 获取验证码 2 验证手机号
        userRealName: '',
        identityNo: 'dada',
        bindType: null, // 1: 手机号绑定 2：身份信息绑定 3：提款账号绑定
        drawType: 1, // 提现账号类型 1 支付宝
        drawAccount: '', // 提款账号
        toBind: null, // 去绑定 1: 手机号绑定 2：身份信息绑定 3：提款账号绑定
        downTime: 60, // 倒计时
        getCode: false, // 是否在获取二维码
        phoneBind: false, // 号码是否绑定
        userBind: false, // 用户姓名信息是否绑定
        drawAccountBind: false, // 提款账号是否绑定
        isEdit: false, // 是否需要编辑
        kitingMoney: null, // 提现金额
        guessCash: null,
        cash: null,
        false: false,
        true: true,
        bindSuccess: false
      }
    },
    components: {
      XHeader,
      loading,
      scroll,
      showModel
    },
    computed: {
    },
    created () {
      this.getUserInfo()
    },
    mounted () {
    },
    destroyed () {
      clearInterval(timer)
    },
    methods: {
      getUserInfo () {
        fetchKitingInfo({}).then(res => {
          this.userInfo = res.data.data
          this.phone = res.data.data.phone
          this.phoneBind = res.data.data.phone ? this.true : this.false
          this.userBind = res.data.data.realName ? this.true : this.false
          this.drawAccountBind = res.data.data.drawAccount ? this.true : this.false
          this.drawAccount = res.data.data.drawAccount
          this.userRealName = res.data.data.realName
          this.identityNo = res.data.data.identityNo
        })
      },
      // 去绑定账号
      goBind (options) {
        let toBind = options
        this.toBind = toBind
      },
      // 验证身份证正确性
      testCardId (sId) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(sId)) {
          return false
        } else {
          return true
        }
      },
      // 验证身份证正确性
      testName (name) {
        let regName = /^[\u4e00-\u9fa5]{2,4}$/
        if (!regName.test(name)) {
          return false
        } else {
          return true
        }
      },
      // 获取手机验证 actionType 1 获取验证码 2 校验及绑定
      getPhoneCode: function (actionType) {
        let pattern = /^((1[3,5,8,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
        if (!this.phone) { // 手机号码为空
          this.$toast({
            message: '请输入11位手机号码',
            duration: 2000
          })
          return false
        } else if (!(pattern.test(this.phone))) { // 手机号码位数不对
          this.$toast({
            message: '请输入11位手机号码',
            duration: 2000
          })
          return false
        }
        // let actionType = actionType
        let params = {
          actionType: 1,
          mobile: this.phone
        }
        // if (this.actionType == 2) params.authCode = 1232
        fetchBindPhone(params).then(res => {
          if (res.data.errCode === 0) {
            this.getCode = true
            this.downTimeFun(60)
            this.$toast({
              message: '请注意查收短信',
              duration: 2000
            })
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 2000
            })
          }
        })
      },
      // 绑定姓名 身份证
      bindName: function () {
        let valName = this.userRealName
        let valId = this.identityNo
        if (!(/^[\u4e00-\u9fa5]{2,5}$/).test(valName)) {
          this.$toast({
            message: '请输入正确的中文名字',
            duration: 2000
          })
          return
        } else if (!this.testCardId(valId)) {
          this.$toast({
            message: '请输入正确的身份证号码',
            duration: 2000
          })
          return
        }
        let params = {
          identityNo: this.identityNo,
          userRealName: this.userRealName
        }
        fetchBindName(params).then(res => {
          if (res.data.errCode === 0) {
            this.$toast({
              message: '身份信息绑定成功',
              duration: 2000
            })
            this.userBind = true
            this.toBind = null
          } else {
            // wx.showToast({
            //   title: res.msg,
            //   image: '/static/images/common/err.png',
            //   duration: 2000
            // })
            this.toBind = null
            this.$toast({
              message: res.data.msg,
              duration: 2000
            })
          }
        })
      },
      // 绑定 提款账号
      bindAccount: function () {
        let drawAccount = this.drawAccount
        if (!drawAccount) { // 提款账号 为空
          this.$toast({
            message: '请输入提款账号',
            duration: 2000
          })
          return false
        }
        let params = {
          drawType: 1,
          drawAccount: this.drawAccount
        }
        fetchAcount(params).then(res => {
          if (res.data.errCode === 0) {
            this.$toast({
              message: '账号绑定成功',
              duration: 2000
            })
            this.drawAccountBind = true
            this.toBind = null
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 2000
            })
          }
        })
      },
      // 绑定 提款账号 和真实姓名
      bindAccountName: function () {
        let drawAccount = this.drawAccount
        let valName = this.userRealName
        if (!drawAccount) { // 提款账号 为空
          // wx.showModal({
          //   title: '提示',
          //   content: '请输入提款账号',
          //   showCancel: false
          // })
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            time: 700,
            text: '请输入支付宝账号',
            isShowMask: true
          })
          return false
        } else if (!(/^[\u4e00-\u9fa5]{2,5}$/).test(valName)) {
          this.$vux.toast.show({
            position: 'middle',
            time: 700,
            type: 'text',
            text: '请输入真实姓名',
            isShowMask: true
          })
          return
        }
        let params = {
          drawType: 1,
          drawAccount: this.drawAccount,
          fullname: this.userRealName
        }
        fetchAcount(params).then(res => {
          if (res.data.errCode === 0) {
            this.$vux.toast.show({
              position: 'middle',
              time: 700,
              type: 'text',
              text: '绑定成功',
              isShowMask: true
            })
            this.drawAccountBind = true
            this.toBind = null
          } else {
            this.$vux.toast.show({
              position: 'middle',
              time: 700,
              type: 'text',
              text: res.data.msg,
              isShowMask: true
            })
          }
        })
      },
      fillIn () {
        // 全部提现
        this.kitingMoney = this.userInfo.cash
      },
      // 提现按钮 1 普通提现 2 全部提现
      kitingButton (type) {
        if (type === 2) {
          this.kitingMoney = this.userInfo.cash
          if (!this.userInfo.cash) {
            this.$vux.toast.show({
              position: 'middle',
              time: 700,
              type: 'text',
              text: '可提现余额不足',
              isShowMask: true
            })
          }
        } else if (type === 1) {
          if (this.kitingMoney <= 0) {
            this.$vux.toast.show({
              position: 'middle',
              time: 700,
              type: 'text',
              text: '请输入提现金额',
              isShowMask: true
            })
            return false
          }
        }
        this.kitingNow()
        // this.showKiting = true
      },
      // 弹窗取消
      goodBye () {
        this.showKiting = false
      },
      // 确认提现
      kitingNow: function (e) {
        let params = {
          amount: this.kitingMoney * 100,
          drawType: 1 // 1-支付宝 2-微信
        }
        fetchKiting(params).then(res => {
          if (res.data.errCode === 0) {
            this.$vux.toast.show({
              position: 'middle',
              time: 700,
              type: 'text',
              width: '16em',
              text: '提现成功，请注意查收',
              isShowMask: true
            })
            this.$router.back()
            // this.getUserInfo()
          } else {
            this.$vux.toast.show({
              position: 'middle',
              time: 700,
              width: '16em',
              type: 'text',
              text: res.data.msg,
              isShowMask: true
            })
            // this.goodBye()
          }
        })
      },
      // 确认绑定 修改 type 1: 手机号绑定 2：身份信息绑定 3：提款账号绑定
      sure (type) {
        switch (type) {
          case 1:
            if (!this.phone) { // 手机号码为空
              // wx.showModal({
              //   title: '提示',
              //   content: '请输入手机号码',
              //   showCancel: false
              // })
              this.$toast({
                message: '请输入手机号码'
              })
              return false
            } else if (this.phone.length < 11) { // 手机号码位数不对
              // wx.showModal({
              //   title: '提示',
              //   content: '请输入11位手机号码',
              //   showCancel: false
              // })
              this.$toast({
                message: '请输入11位手机号码'
              })
              return false
            } else if (!this.authCode) { // 验证码为空
              // wx.showModal({
              //   title: '提示',
              //   content: '请输入验证码',
              //   showCancel: false
              // })
              this.$toast({
                message: '请输入验证码'
              })
              return false
            } else if (this.authCode < 4) { // 验证码少于4位
              // wx.showModal({
              //   title: '提示',
              //   content: '请输入4位验证码',
              //   showCancel: false
              // })
              this.$toast({
                message: '请输入4位验证码'
              })
              return false
            }
            let params = {
              actionType: 2,
              mobile: this.phone,
              authCode: this.authCode
            }
            fetchBindPhone(params).then(res => {
              if (res.data.errCode === 0) {
                // wx.showToast({
                //   title: "手机号码绑定成功",
                //   icon: 'success',
                //   duration: 2000
                // })
                this.$toast({
                  message: '手机号码绑定成功'
                })
                this.setData({
                  phoneBind: true,
                  toBind: null
                })
              } else {
                // wx.showToast({
                //   title: res.msg,
                //   image: '/static/images/common/err.png',
                //   duration: 2000
                // })
              }
            })
            break
          case 2:
            this.bindName()
            break
          case 3:
            this.bindAccount()
            break
          default:
            break
        }
      },
      // 取消绑定
      cancel () {
        this.toBind = null
        this.bindType = null
        this.downTime = 60
        this.getCode = false
      },
      // 编辑
      edit () {
        this.isEdit = true
      },
      // 倒计时
      downTimeFun (time) {
        timer = setInterval(() => {
          this.downTime = --time
          if (time === 0) {
            this.getCode = false
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
 @import "../../common/stylus/colorreset"
@import "../../common/stylus/mixin"
.bline:after {
  border-color: #ccc;
}
.text-right {
  text-align: right;
}
.blue {
  color: #3333ff !important;
}
.font42 {
  font-size: .42rem;
}
.font32 {
  font-size: .32rem;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
}
.center {
  width: 6.10rem;
  /*height: 5.00rem;*/
  margin: 0 auto;
  background-color: #fff;
  padding: 0 .30rem .4rem;
}
.header {
  height: 1.50rem;
}
.header image {
  width: .66rem;
  height: .66rem;
  border-radius: 50%;
}
.inlineB {
  display: inline-block;
}
.account  {
  width: 100%;
  height: 1.50rem;
  padding-top: .36rem;
}
.lf {
  float: left;
}
.font36 {
  font-size: .36rem;
  line-height: .48rem;
  height: .48rem;
}
.font50 {
  font-size: .50rem;
}
.button {
  line-height: .40rem;
  padding: 0 .48rem;
  border: 1px solid #ccc;
  border-radius: .16rem;
}
.tabbar {
  width: 6.90rem;
  height: 2.00rem;
  margin: .40rem auto;
}
.borderR {
  border-radius: .12rem;
}
.kitingButton {
  background-color:$color-meta;
  color:#999999;
  height: .90rem;
  line-height: .90rem;
}
.gray {
  color: #b3b3b3;
}
.orange {
  color: #ffac84;
}
.icon-arrow-right {
  display:inline-block;
  width:.14rem;
  height:.20rem;
  position: relative;
  top: 1px;
  padding-left:.18rem; 
}

.icon-arrow-right-black {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYBAMAAAA46dFkAAAAFVBMVEUAAABhYWFhYWFhYWFhYWFhYWFhYWHNtsHYAAAABnRSTlMAw+EhDQwrR612AAAAK0lEQVQI12NgdWAAg0ARCG2UCBFgVsMQEIUJBBAvADMLZhSlXAZHCBfmbgCWdAwZzIy+6wAAAABJRU5ErkJggg==') no-repeat center center;
  background-size: contain;
}

.icon-arrow-right-white {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDc3NUNDM0Q5RjM5MTFFNzkzMjY5NTREQzlCMTAxMTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDc3NUNDM0U5RjM5MTFFNzkzMjY5NTREQzlCMTAxMTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0Nzc1Q0MzQjlGMzkxMUU3OTMyNjk1NERDOUIxMDExMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0Nzc1Q0MzQzlGMzkxMUU3OTMyNjk1NERDOUIxMDExMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmVZiRQAAACXSURBVHjatJTbCYAwDEVT8bOZwcc4DqwDOIkO4I8D1CtWEKk2XjBwoC0cGtI0LoQgCA8cWMUYRZQG0AO1ioIbazCFI0agexY5zkX7Vb5uPsn3g7vsraJZfkolK78V4FXOlf1RFsObJWWLmJQL4cIxtylTHGWeQ5kGUKbllGly/e1bNcxHrpjRUaILFjBHOuukc+x43AQYAFmOXhM27oYvAAAAAElFTkSuQmCC') no-repeat center center;
  background-size: contain;
}
.kitingText {
  padding-top: .32rem; 
}
.kitingBottom {
  height: .94rem;
  line-height: .94rem;
  font-size: .30rem;
  color:#999999;
}
.bg {
  top: 0;
  background-color: #333399;
  z-index: 2;
}
.warn {
  height: .78rem;
  line-height: .78rem;
  padding: 0 .30rem 0 0;
  color:#fff;
  font-size: .28rem;
}
.phoneText {
  height: 1.12rem;
  line-height: 1.12rem;
  font-size: .25rem;
  color: #ff9966;
}
.phoneTextInput {
  height: .7rem;
  line-height: .7rem;
  font-size: .25rem;
  width: 100%;
  /*color: #ff9966;*/
}
.getCode {
  width: 1.40rem;
  height: .40rem;
  line-height: .40rem;
  font-size: .24rem;
  /*background-color: #9999ff;*/
  border: 1px solid #9999ff;
  color: #6666cc;
  top: .55rem;
  right: .20rem;
  z-index: 10;
}
.phoneButton {
  /*overflow: hidden;*/
  width: 100%;
  color:#fff;
  bottom: .90rem;
  min-height: 2.00rem;
  /*padding: 0 .76rem;*/
}
.phoneButton > div {

  width: 6.90rem;
  margin: 0 auto;
}
.sure {
  height: .90rem;
  line-height: .90rem;
  text-align: center;
  font-size: .3rem;
  color: #fff;
  background-color: $color-meta;
}
.cancel {
  height: .86rem;
  line-height: .86rem;
  margin-top: .20rem !important;
  color: #9999ff;
  border:0.02rem solid #9999ff;
}
</style>