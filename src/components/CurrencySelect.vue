<template>
  <label class="currency-select__label">
    {{ label }}
    <select v-model="internalCurrency" class="currency-select__dropdown">
      <option v-for="(currency, name) in currencies" :key="name" :value="name">
        {{ name }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';


const props = defineProps({
  currencies: Object,
  currency: String,
  label: String,
});

const emit = defineEmits(['update:currency']);
const internalCurrency = ref<string>(props.currency || 'USD');
// 

watch(() => props.currency, (newValue) => {
  internalCurrency.value = newValue ?? 'USD';
});

watch(internalCurrency, (newValue) => {
  emit('update:currency', newValue);
});
</script>

<style lang="scss">
.currency-select {
  &__label {
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
  }

  &__dropdown {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    appearance: none;

    &:hover {
      border-color: $primary-color;
    }

    &:focus {
      border-color: $primary-color;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      outline: none;
    }
  }
}
</style>
