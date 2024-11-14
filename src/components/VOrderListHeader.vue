<template>
  <v-toolbar class="toolbar" height="300px" flat>
    <div class="action-list">
      <v-toolbar-title>Найдено {{ ordersCount }} заказов</v-toolbar-title>
      <div class="action-container action-search">
        <v-text-field v-model="id" variant="plain" placeholder="ID заказа" />
        <v-btn @click="onSearch">Искать</v-btn>
      </div>
      <div class="action-container">
        <v-date-input
          v-model="filters.dateFrom"
          prepend-icon=""
          variant="plain"
          placeholder="Дата от"
          max="2024-06-30"
          min="2024-05-01"
        />
        <v-date-input
          v-model="filters.dateTo"
          prepend-icon=""
          variant="plain"
          placeholder="Дата до"
          max="2024-06-30"
          min="2024-05-01"
        />
        <v-select
          v-model="filters.statuses"
          placeholder="Статус заказа"
          variant="plain"
          item-value="id"
          item-title="name"
          multiple
          chips
          width="470px"
          :items="statuses"
        >
        </v-select>
        <v-btn @click="onFilter">Искать</v-btn>
      </div>
    </div>
  </v-toolbar>
</template>

<script setup>
import { VDateInput } from 'vuetify/labs/VDateInput'

import { reactive, ref, shallowReactive, shallowRef } from 'vue'

const props = defineProps({
  statuses: {
    type: Array,
    default: []
  },
  ordersCount: {
    type: Number,
    default: 0
  }
})

const disabledDates = ['2018-03-03', '2023-03-05']

const emit = defineEmits(['search', 'filter'])

const id = ref('')
const filters = shallowReactive({
  statuses: [],
  dateFrom: new Date('2024/05/01'),
  dateTo: new Date('2024/06/30')
})

function onSearch() {
  emit('search', id.value)
}

function onFilter() {
  emit('filter', filters)
}
</script>

<style scoped>
.action-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 40px;
  width: 100%;
  justify-content: flex-start;
}

.action-list {
  display: flex;
  flex-direction: column;

  width: 100%;
}

.action-search {
  max-width: 400px;
}

.toolbar {
  padding: 20px;
}
</style>
