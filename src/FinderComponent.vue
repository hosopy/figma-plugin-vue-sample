<template>
  <div>
    <div class="container component-container">
      <h1>Master component</h1>
      <p>{{ masterComponent }}</p>
    </div>
    <hr />
    <div class="instance-container">
      <template v-if="instances.length > 0">
        <div class="list-item" v-for="(instance, i) in instances" :key="i">
          <div class="list-content">
            <div class="list-item-title">
              <p>{{ instance }}</p>
            </div>
            <div class="list-item__subtitle"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="display:flex;justify:center;align-items:center;height: 100%;">
          <p>Find instances of a component or find a component from an instance</p>
        </div>
      </template>
    </div>
    <hr />
    <div class="container" style="display:flex;justify-content:space-between;">
      <h1>Total</h1>
      <p>{{ instanceCount }}</p>
    </div>
    <hr />
    <div class="container field is-grouped is-grouped-right">
      <p class="control">
        <button class="button is-small" @click="clear">Clear</button>
      </p>
      <p class="control">
        <button class="button is-primary is-small" @click="find">Find</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "FinderComponent"
})
export default class Finder extends Vue {
  masterComponent: string = "";
  instanceCount: number = 0;
  instances: Array<any> = [];

  find() {
    parent.postMessage(
      {
        pluginMessage: {
          type: "find"
        }
      },
      "*"
    );
    onmessage = event => {
      this.masterComponent = event.data.pluginMessage.componentName;
      this.instanceCount = event.data.pluginMessage.instanceCount;
      this.instances = event.data.pluginMessage.instances;
    };
  }

  clear() {
    this.instanceCount = 0;
    this.masterComponent = "";
    this.instances = [];

    parent.postMessage(
      {
        pluginMessage: {
          type: "clear"
        }
      },
      "*"
    );
  }
}
</script>
