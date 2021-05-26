<template>
  <svg fill="none" height="9" viewBox="0 0 9 9" width="9" xmlns="http://www.w3.org/2000/svg">
    <path :stroke="color" d="M1 1L8 8M8 1L1 8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  }
}
</script>
