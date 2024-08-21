<template>
  <div class="app__container">
    <h1 class="app__title">Currency Converter</h1>
    <div v-if="isLoading" class="app__loader">
      <div class="spinner"></div>
    </div>
    <template v-else>
      <CurrencyInput 
        v-model:amount="amount" 
        class="app__input" 
      />
      <div class="app__selects">
        <CurrencySelect 
          v-model:currency="baseCurrency"
          :currencies="currencies" 
          label="Base Currency"
          class="app__select"
        />
        <CurrencySelect 
          v-model:currency="targetCurrency"
          :currencies="currencies" 
          label="Target Currency"
          class="app__select"
        />
      </div>
      <ConversionResult 
        :amount="amount" 
        :baseCurrency="baseCurrency" 
        :targetCurrency="targetCurrency" 
        class="app__result"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CurrencyInput from '@/components/CurrencyInput.vue';
import CurrencySelect from '@/components/CurrencySelect.vue';
import ConversionResult from '@/components/ConversionResult.vue';
import { fetchCurrencies, getDefaultCurrency } from '@/api/currencyApi';

const currencies = ref<{ [key: string]: string }>({});
const amount = ref<number>(0);
const baseCurrency = ref<string>('USD');
const targetCurrency = ref<string>('KZT');
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    currencies.value = await fetchCurrencies();
    baseCurrency.value = await getDefaultCurrency();
  } catch (error) {
    console.error('Error loading currencies:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss">
.app {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f7f8fc;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    color: #333;
    position: relative;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__input {
    margin-bottom: 20px;
  }

  &__selects {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }

  &__select {
    width: 48%;
  }

  &__result {
    margin-top: 20px;
  }

  &__loader {
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
    position: relative;

    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top: 4px solid #3498db;
      width: 100%;
      height: 100%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}
</style>
