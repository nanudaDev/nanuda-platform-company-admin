<template>
  <v-app id="inspire">
    <!-- pc -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mdAndUp"
      app
      flat
      floating
      :mini-variant.sync="mini"
      mobile-breakpoint="960"
    >
      <NavList :items="modifiedRoutes" :mini="mini" />
    </v-navigation-drawer>
    <!-- mobile -->
    <v-navigation-drawer v-else app v-model="drawer">
      <NavList :items="modifiedRoutes" :mini="mini" />
    </v-navigation-drawer>

    <v-app-bar flat app height="75">
      <!-- pc -->
      <v-app-bar-nav-icon @click.stop="mini = !mini" v-if="$vuetify.breakpoint.mdAndUp"></v-app-bar-nav-icon>
      <!-- mobile -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-else></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-row align="center" no-gutters>
          <span class="d-block mx-5" v-if="$vuetify.breakpoint.mdAndUp">DARK MODE</span>
          <v-switch
            @change="onThemeChanged()"
            v-model="$vuetify.theme.dark"
            inset
            color="orange"
            class="mt-6 mr-5"
          ></v-switch>
        </v-row>
        <v-toolbar-items>
          <v-row align="center" no-gutters>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text>
                  <v-icon>mdi-account-circle</v-icon>
                  <span class="mx-2 text-uppercase">{{ myName }}</span>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in profileDropDownList"
                  :key="index"
                  @click="$router.push(item.path)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-toolbar-items>
      </v-toolbar-items>

      <v-btn text @click="logout">
        <v-icon>mdi-logout</v-icon>
        <span class="ml-2" v-if="$vuetify.breakpoint.mdAndUp">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <keep-alive :include="keepAliveList">
          <router-view />
        </keep-alive>
      </v-container>
      <!-- <v-footer color="indigo">
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>-->
    </v-main>
    <v-footer>
      <v-spacer></v-spacer>
      <div>위대한 상사 The Great Trading Company &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import AuthService from '@/services/shared/auth/auth.service';
import NavList from '@/modules/_layouts/components/NavList.vue';
import routes from '@/router/component';
import { RouteConfig } from 'vue-router';
import store from '@/store/';
import { VUETIFY_THEME } from '../../services/shared';
@Component({
  name: 'MainLayout',
  components: {
    NavList,
  },
})
export default class MainLayout extends BaseComponent {
  private drawer = false;
  private mini = false;
  private routes: RouteConfig[] = routes;
  private profileDropDownList = [{ title: '내 정보', path: '/mypage' }];
  private keepAliveList = [
    'FounderCounsultList',
    'Dashboard',
    'NoticeBoard',
    'Company',
    'District',
    'Contracts',
    'QNA',
  ];
  get myName(): string {
    return store.state.myName;
  }
  get modifiedRoutes() {
    const tempArr = [];
    this.routes.map(e => {
      if (!e.meta.noNav) {
        tempArr.push(e);
      }
    });
    console.log('tempArr', tempArr);
    return tempArr;
  }
  logout() {
    AuthService.signout();
    this.$router.push('/login');
  }
  onThemeChanged() {
    console.log('onThemeChanged');
    console.log('vuetify theme dark', this.$vuetify.theme.dark);
    // this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    let theme;
    if (this.$vuetify.theme.dark) {
      theme = 'DARK';
    } else {
      theme = 'LIGHT';
    }
    localStorage.setItem('theme', theme);
  }
  created() {
    console.log('routes', routes);
    // this.getNavItems();
    if (localStorage.theme) {
      if (localStorage.theme === VUETIFY_THEME.LIGHT) {
        this.$vuetify.theme.dark = false;
      } else {
        this.$vuetify.theme.dark = true;
      }
    } else {
      localStorage.setItem('theme', 'LIGHT');
    }
  }
}
</script>
<style lang="scss" scoped></style>
