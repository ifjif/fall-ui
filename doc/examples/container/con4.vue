<template>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <fl-container class="gray">
      <fl-aside width="80" class="yellow">
        <div style="height: 500px;">aside</div>
      </fl-aside>
      <fl-main class="beige">
        <div style="height: 500px;width: 1000px;">main</div>
      </fl-main>
      <fl-aside width="80" class="yellow">
        <div style="height: 500px;">aside</div>
      </fl-aside>
    </fl-container>
  </div>
</template>
<style scoped>
.gray {
  background-color: gray;
}

.skyblue {
  background-color: skyblue;
}

.yellow {
  background-color: yellow;
}

.beige {
  background-color: beige;
}
</style>
