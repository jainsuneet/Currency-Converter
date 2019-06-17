
# :currency_exchange: Currency-Converter
> Currency converter project using Vue.js and Vuetify.js.

## Demo  
  
[Demo Link](http://suneetjain.tk)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## CurrencyConverter Component Description
***

### Imports

|Name|Description|
|---|---|
|Sketch|Custom Color Picker|
|API|API service provider for currency symbols and rates|

### Props

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|currencySymbols|Array of currency symbols|`Array`|`false`|EUR,USD|
|conversionRate|Object with base currency and target rates in nested object|`Object`|`false`|base: 'EUR', rates: { 'USD': 1 }|
|languages|Array of objects with 'text' as display text and 'value' for language change|`Array`|`false`|{ text: 'English', value: 'en' }, { text: 'Deutsch', value: 'de' }|
|color|Object with 'hex' as key and hex color code as value|`Object`|`false`|hex:'#002856'|
|selectedLanguage|Default language is set to English|`String`|`false`|en|
|sourceValue|Primary input value|`Number`|`false`|0|
|targetValue|Secondary input value|`Number`|`false`|0|
|selectedCurrencies|Object with keys 'currency1' and 'currency2' to store primary and secondary currencies|`Object`|`false`|currency1: 'EUR', currency2: 'USD'|

### Methods

|Method|Description|
|---|---|
|changeGlobalPrimaryColor|To change global theme of the component|
|changeLanguage|To change Internationalization and localization of the component|
|swapCurrencies|On Swap icon click, Primary & secondary input and select fields are interchanged|
|setTargetRate|Conversion of rate from source to traget currency.Takes into consideration if there is any previous stored conversion rate before calling the REST API|
|setSourceRate|Conversion of rate from target to source currency.Takes into consideration if there is any previous stored conversion rate before calling the REST API|