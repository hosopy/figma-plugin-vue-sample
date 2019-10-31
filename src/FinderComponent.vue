<template>
  <div class="container">
    <p>Master component</p>
    <p> {{ masterComponent }} </p>

    <hr>

    <p> {{ instances }} </p>

    <div style="display:flex;justify-space-between;">
      <p>Total</p>
      <p> {{ instanceCount }} </p>
    </div>

    <hr>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-small" @click="clear">
          Clear
        </button>
      </p>
      <p class="control">
        <button class="button is-primary is-small" @click="find">
          Find
        </button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'FinderComponent'
})

export default class Finder extends Vue {

  masterComponent: string = '';
  instanceCount: number = 0;
  instances: Array<any> = []


  find () {
    parent.postMessage({ 
      pluginMessage: {
        type: 'find',
      }
    }, '*')
    onmessage = (event) => {
      this.masterComponent = event.data.pluginMessage.componentName
      this.instanceCount = event.data.pluginMessage.instanceCount
      this.instances = event.data.pluginMessage.instances
    }
  }

  clear() {
    parent.postMessage({
      pluginMessage: {
        type: 'clear',
      }
    }, '*')
  }

}
</script>

<style lang="scss">
.container {
  padding: 8px;
}
</style>
