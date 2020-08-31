<template>
  <div>
    <v-btn
      text
      block
      height="75"
      @click="$router.push('/dashboard')"
      class="px-0"
      v-if="$vuetify.breakpoint.mdAndUp && mini"
    >
      <v-avatar color="orange" size="38">
        <span class="black--text title font-weight-black">N</span>
      </v-avatar>
    </v-btn>
    <v-btn @click="$router.push('/dashboard')" text x-large block height="75" v-else>
      <span class="orange--text font-weight-black mt-3">NANUDA PLATFORM</span>
    </v-btn>
    <v-list v-for="(item, index) in items" :key="index">
      <v-list-item
        :to="`${item.path}`"
        exact
        link
        v-if="!item.children && item.meta.roles.includes(myRole)"
      >
        <v-list-item-action>
          <v-icon>{{ item.meta.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group :prepend-icon="item.meta.icon" v-else>
        <template v-slot:activator>
          <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
        </template>
        <template v-for="(children, i) in item.children">
          <v-list-item
            :to="`${children.path}`"
            exact
            :key="i"
            v-if="children.meta.roles.includes(myRole)"
          >
            <template>
              <v-list-item-title v-text="children.meta.title"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="children.meta.icon"></v-icon>
              </v-list-item-icon>
            </template>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { RouteConfig } from 'vue-router';
import store from '@/store';

@Component({
  name: 'NavList',
})
export default class NavList extends BaseComponent {
  @Prop() readonly mini: boolean;
  @Prop() readonly items: RouteConfig[];

  get myRole(): string {
    return store.state.myRole;
  }
  // created() {
  //   console.log(store.state);
  // }
}
</script>

<style></style>
