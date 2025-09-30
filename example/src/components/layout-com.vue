<template>
  <h2>布局</h2>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局1</h3>
    <a-container class="gray">
      <a-header height="60" class="skyblue">
        header
      </a-header>
      <a-container class="gray">
        <a-aside width="80" class="yellow">
          <div style="height: 500px;">aside</div>
        </a-aside>
        <a-main class="beige">
          <div style="height: 500px;width: 1000px;">main</div>
        </a-main>
      </a-container>
      <a-footer height="60" class="skyblue">
        footer
      </a-footer>
    </a-container>
  </div>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局2</h3>
    <a-container class="gray">
      <a-aside width="80" class="yellow">
        <div style="height: 500px;">aside</div>
      </a-aside>
      <a-container class="gray">
        <a-header height="60" class="skyblue">
          header
        </a-header>
        <a-main class="beige">
          <div style="height: 500px;width: 1000px;">main</div>
        </a-main>
        <a-footer height="60" class="skyblue">
          footer
        </a-footer>
      </a-container>
    </a-container>
  </div>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局3</h3>
    <a-container class="gray">
      <a-header height="60" class="skyblue">
        header
      </a-header>
      <a-container class="gray">
        <a-aside width="80" class="yellow">
          <div style="height: 500px;">aside</div>
        </a-aside>
        <a-container class="gray">
          <a-container class="gray">
            <a-main class="beige">
              <div style="height: 500px;width: 1000px;">main</div>
            </a-main>
            <a-aside width="80" class="yellow">
              <div style="height: 500px;">aside</div>
            </a-aside>
          </a-container>
          <a-footer height="60" class="skyblue">
            footer
          </a-footer>
        </a-container>
      </a-container>
    </a-container>
  </div>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局4</h3>
    <a-container class="gray">
      <a-aside width="80" class="yellow">
        <div style="height: 500px;">aside</div>
      </a-aside>
      <a-main class="beige">
        <div style="height: 500px;width: 1000px;">main</div>
      </a-main>
      <a-aside width="80" class="yellow">
        <div style="height: 500px;">aside</div>
      </a-aside>
    </a-container>
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
