<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Company' })
export default class Company extends BaseComponent {}
</script>

<style></style>
