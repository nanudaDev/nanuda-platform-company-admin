<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        clearable
        @click:clear="$emit('update:date', null)"
        outlined
        v-model="date"
        :label="title"
        readonly
        v-bind="attrs"
        v-on="on"
        dense
        placeholder=" "
        prepend-icon="mdi-calendar"
        hide-details
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable locale="ko-kr">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn
        text
        color="primary"
        @click="[$refs.menu.save(date), $emit('update:date', date)]"
        >OK</v-btn
      >
    </v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  name: 'DateField',
})
export default class DateField extends Vue {
  @Prop() readonly title;
  @Prop() readonly date;
  // private date = new Date().toISOString().substr(0, 10);
  private menu = false;
}
</script>
<style></style>
