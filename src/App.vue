<template>
  <div id="app">
    <v-app>
      <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="#" class="navbar-brand">NND</a>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/founder-consult"
              >상담 리스트</router-link
            >
          </li>
        </div>
      </nav> -->

      <component :is="layout"></component>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseComponent from './core/base.component';
import store from '@/store';

@Component({
  name: 'App',
})
export default class extends Vue {
  // private showSnackBar = false;
  // get layout
  get layout() {
    return this.$route.meta.layout;
  }
}
</script>
<style lang="scss">
// overrides
#app {
  .v-btn.v-size--default,
  .v-btn.v-size--large {
    &:not(.v-btn--icon):not(.v-btn--fab) {
      // padding: 0 30px !important;
    }
  }

  .theme--light.v-list-item .v-list-item__action-text,
  .theme--light.v-list-item .v-list-item__subtitle {
    color: #999;
  }

  .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: #d2d2d2;
  }
  .v-label.v-label,
  .v-alert.v-alert {
    font-size: 14px;
  }

  .theme--light .v-main {
    background-color: #eeeeee;
  }
  .theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: #eeeeee !important;
  }
  .v-card--flat {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.025) !important;
  }
}
.toasted {
  .mdi {
    font-size: 24px !important;
  }
}
</style>
