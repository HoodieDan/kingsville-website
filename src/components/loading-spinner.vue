<template>
  <div class="flex justify-center items-center py-12">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e3e3e3;
  border-top: 4px solid #28166f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
