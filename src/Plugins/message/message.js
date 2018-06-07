import Vue from 'vue'
import Main from './message.vue'
let MessageConstructor = Vue.extend(Main)
let instance
const Message = function (options) {
  // options = options || {}
  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  let isNode = document.querySelector('.message')
  if (!isNode) {
    document.body.appendChild(instance.vm.$el)
  } else {
    document.body.removeChild(isNode)
  }
}
Vue.prototype.$message = Message
export default Message
