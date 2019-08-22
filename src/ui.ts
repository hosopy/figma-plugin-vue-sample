import Vue from 'Vue'
import RectangleCreator from './RectangleCreator'
import './ui.scss'

new Vue({
  el: '#app',
  render (h) {
    return h('rectangle-creator')
  },
  components: {
    RectangleCreator
  }
})
