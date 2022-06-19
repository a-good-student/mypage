<template>
  <div class="foot"></div>
</template>

<script>
export default {
  name: "FootNew"
}
</script>

<style scoped>
  .foot{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--background-color);
    z-index: 1000;
    animation: load .5s ease forwards;
    animation-delay: .6s;
  }
  @keyframes load {
    from{
      background: var(--background-color);
    }
    to{
      background: transparent;
      z-index: -1;
    }
  }
</style>
