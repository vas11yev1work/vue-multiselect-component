<template>
  <svg fill="none" height="9" viewBox="0 0 14 9" width="14" xmlns="http://www.w3.org/2000/svg">
    <path
      :fill="color"
      d="M12.6777 0.699997H1.32226C0.806766 0.699997 0.531258 1.30715 0.870714 1.6951L6.54845 8.18394C6.7875 8.45714 7.2125 8.45714 7.45155 8.18394L13.1293 1.6951C13.4687 1.30715 13.1932 0.699997 12.6777 0.699997Z"/>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#ec5959'
    }
  }
}
</script>
