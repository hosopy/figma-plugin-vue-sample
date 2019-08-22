<template>
  <div class="container">
    <h2 class="title is-4">Rectangle Creator</h2>

    <div class="field">
      <label class="label">Count</label>
      <p class="control">
        <input class="input is-small" type="number" v-model="count">
      </p>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-primary is-small" @click="create">
          Create
        </button>
      </p>
      <p class="control">
        <button class="button is-small" @click="cancel">
          Cancel
        </button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'RectangleCreator'
})
export default class RectangleCreator extends Vue {
  count: number = 5

  create () {
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count: this.count } }, '*')
  }

  cancel () {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }
}
</script>

<style lang="scss">
.container {
  padding: 0.75rem;
}
</style>
