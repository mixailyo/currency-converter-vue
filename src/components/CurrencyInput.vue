<template>
  <input 
    type="number" 
    v-model="internalAmount" 
    @input="emitAmount" 
    class="currency-input__field" 
    placeholder="Enter amount" 
  />
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  amount: Number
});

const emit = defineEmits(['update:amount']);
const internalAmount = ref<number>(props.amount || 0);

watch(() => props.amount, (newValue) => {
  internalAmount.value = newValue ?? 0;
});

function emitAmount() {
  emit('update:amount', internalAmount.value);
}
</script>

<style lang="scss">
.currency-input {
  &__field {
    width: -webkit-fill-available;
    padding: 10px 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:focus {
      border-color: $primary-color;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      outline: none;
    }
  }
}
</style>
