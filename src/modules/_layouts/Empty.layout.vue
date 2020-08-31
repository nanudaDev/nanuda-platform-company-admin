<template>
  <router-view />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';

@Component({
  name: 'EmptyLayout',
})
export default class EmptyLayout extends BaseComponent {}
</script>
<style lang="scss" scoped></style>
