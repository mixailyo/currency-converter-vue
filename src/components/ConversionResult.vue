<template>
  <p v-if="convertedAmount !== null" class="conversion-result__text">
    {{ amount }} {{ baseCurrency }} = {{ convertedAmount }} {{ targetCurrency }}
  </p>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps } from 'vue';
import { getExchangeRate } from '@/api/currencyApi';

const props = defineProps({
  amount: Number,
  baseCurrency: String,
  targetCurrency: String
});

const convertedAmount = ref<number | null>(null);

watchEffect(async () => {
  if (props.amount && props.baseCurrency && props.targetCurrency) {
    try {
      const rate = await getExchangeRate(props.baseCurrency, props.targetCurrency);
      convertedAmount.value = props.amount * rate;
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      convertedAmount.value = null;
    }
  }
});
</script>

<style lang="scss">
.conversion-result {
  &__text {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    padding: 15px;
    background-color: #e3f2fd;
    border-radius: 8px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #bbdefb;
    }
  }
}
</style>
