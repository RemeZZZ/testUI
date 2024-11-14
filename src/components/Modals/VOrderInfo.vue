<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="card" :title="`Ордер #${data.id}`" width="600px">
      <div class="card-row">
        <span class="row-name">ID Учетной:</span> <span class="row-value">{{ data.uid1c }}</span>
      </div>
      <div class="card-row">
        <span class="row-name">Дата создания:</span>
        <span class="row-value">{{ data.created }}</span>
      </div>
      <div class="card-row">
        <span class="row-name">Статус:</span> <span class="row-value">{{ data.status.title }}</span>
      </div>
      <div class="card-row">
        <span class="row-name">Клиент:</span>
        <span class="row-value">{{ data.client.firstname }} {{ data.client.lastname }}</span>
      </div>
      <div class="card-row">
        <span class="row-name">Магазин:</span> <span class="row-value">{{ data.shop.title }}</span>
      </div>
      <div v-if="data.payment.method.id !== 1" class="card-row">
        <span class="row-name">Способ оплаты:</span>
        <span class="row-value">{{ data.payment.method.title }}</span>
      </div>
      <div v-if="data.items.length" class="card-items">
        <div><span class="row-title">Состав заказа:</span></div>
        <div v-for="item of data.items" :key="item.id">
          <div class="card-row">
            <span class="row-name">Название:</span> <span class="row-value">{{ item.title }}</span>
          </div>
          <div class="card-row">
            <span class="row-name">Количество:</span>
            <span class="row-value">{{ item.quantity }}</span>
          </div>
          <div class="card-row">
            <span class="row-name">Цена:</span> <span class="row-value">{{ item.price }}</span>
          </div>
          <div class="card-row">
            <span class="row-name">Статус:</span> <span class="row-value">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const data = ref({})

function open(order) {
  console.log(order)
  data.value = order

  dialog.value = true
}

defineExpose({ open })
</script>

<style scoped>
.card-row {
  display: flex;
  gap: 10px;
  padding: 7px 24px;
}

.row-name,
.row-title {
  font-size: 16px;
  font-weight: 600;
}

.card-items {
  padding: 7px 24px;
  display: flex;
  flex-direction: column;
}

.card-items .card-row {
  padding: 0px 16px;
}

.card-items .row-name,
.row-value {
  font-size: 14px;
}

.card {
  padding: 10px;
  border-radius: 10px;
}
</style>
