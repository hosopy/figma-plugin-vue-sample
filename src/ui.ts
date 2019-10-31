import Vue from 'Vue'
import FinderComponent from './FinderComponent'
import './ui.scss'

new Vue({
  el: '#app',
  render (h) {
    return h('finder-component')
  },
  components: {
    FinderComponent
  }
})
