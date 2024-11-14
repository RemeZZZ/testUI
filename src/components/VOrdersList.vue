<template>
  <VOrderListHeader
    :statuses="statuses"
    :orders-count="ordersList.length"
    @search="onSearch"
    @filter="onFilter"
  />
  <v-data-table
    class="height-100"
    :headers="headers"
    :items="ordersList"
    density="compact"
    item-key="name"
    items-per-page="25"
    @click:row="onClickRow"
    theme="light"
    :loading="loading"
  >
    <template #top>
      <VOrderInfo ref="orderInfoModal" />
    </template>
    <template #item.status="{ item }">
      <span :style="{ color: getStatusColor(item.status?.id) }">{{ item?.status?.title }}</span>
    </template>
    <template #item.shipment="{ item }">
      {{ item.shipment?.method?.title }}
    </template>
    <template #item.shipmentDate="{ item }">
      {{ item.shipment?.date }}
    </template>
    <template #item.payment="{ item }">
      {{ item.payment?.method?.title }}
    </template>
    <template #item.shop="{ item }">
      {{ item.shop?.title }}
    </template>
    <template #item.client="{ item }">
      {{ item.client?.firstname }} {{ item.client?.lastname }}
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@25"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>

<script setup>
import VOrderInfo from './Modals/VOrderInfo.vue'
import VOrderListHeader from './VOrderListHeader.vue'
import Http from '/core/adapters/Http'
import { computed, onMounted, reactive, ref } from 'vue'
import moment from 'moment'

const loading = ref(true)
const orderInfoModal = ref(null)

const statuses = [
  { color: 'green', id: 6, name: 'Зарезервирован' },
  { color: '#FF0000', id: 5, name: 'Отменен' },
  { color: '#052419', id: 4, name: 'Выполнен' },
  { id: 3, name: 'Не хватило товара' },
  { id: 2, name: 'Обработан' },
  { id: 1, name: 'Обрабатывается' }
]

const ordersList = ref([])

onMounted(async () => {
  const result = await Http.get('/front/service/test-api/v1/orders')

  if (result.orders?.length) {
    ordersList.value.push(...result.orders)
    loading.value = false
  }
})

const headers = [
  { title: 'Номер заказа (ID)', key: 'id', width: 50, sortable: false },
  { title: 'Дата-время создания заказа', key: 'created', sortable: false },
  { title: 'Статус заказа', key: 'status', sortable: false },
  { title: 'Тип отгрузки', key: 'shipment', sortable: false },
  { title: 'Дата отгрузки', key: 'shipmentDate', sortable: false },
  { title: 'Способ оплаты', key: 'payment', sortable: false },
  { title: 'Место отгрузки', key: 'shop', sortable: false },
  { title: 'ФИО клиента', key: 'client', sortable: false },
  { title: 'Сумма заказа', key: 'amount', sortable: false },
  { title: 'Количество товаров в заказе', key: 'quantity', sortable: false, width: 50 },
  { title: 'Кто создал заказ (оператор)', key: 'operator', sortable: false }
]

async function onClickRow(event, row) {
  const order = await getOrderById(row.item.id)

  orderInfoModal.value.open(order)
}

function getStatusColor(id) {
  return statuses.find((item) => +id === item.id)?.color
}

async function getOrderById(id) {
  const result = await Http.get(`/front/service/test-api/v1/order/${id}`)

  return result.order
}

async function updateOrderListByFilters(filters) {
  loading.value = true

  const result = await Http.get(`/front/service/test-api/v1/orders`, filters)

  loading.value = false

  ordersList.value = result.orders

  return result.order
}

async function onSearch(id) {
  const order = await getOrderById(id)

  orderInfoModal.value.open(order)
}

async function onFilter(filters) {
  const dateTo = moment(filters.dateTo).format('YYYY-MM-DD')
  const dateFrom = moment(filters.dateFrom).format('YYYY-MM-DD')

  const orderStatus = filters.statuses.join(',')

  updateOrderListByFilters({ dateTo, dateFrom, orderStatus })
}
</script>

<style scoped>
.height-100 {
  height: 100%;
}
</style>
