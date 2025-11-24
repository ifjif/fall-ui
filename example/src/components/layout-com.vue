<template>
  <h2>布局</h2>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局1</h3>
    <fl-container class="gray">
      <fl-header height="60" class="skyblue">
        header
      </fl-header>
      <fl-container class="gray">
        <fl-aside width="80" class="yellow">
          <fl-scrollbar>
            <div style="height: 500px;">aside</div>
          </fl-scrollbar>
        </fl-aside>
        <fl-main class="beige">
          <fl-scrollbar>
            <div style="height: 500px;width: 1000px;">main</div>
          </fl-scrollbar>
        </fl-main>
      </fl-container>
      <fl-footer height="60" class="skyblue">
        footer
      </fl-footer>
    </fl-container>
  </div>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局2</h3>
    <fl-container class="gray">
      <fl-aside width="80" class="yellow">
        <fl-scrollbar>
          <div style="height: 500px;">aside</div>
        </fl-scrollbar>
      </fl-aside>
      <fl-container class="gray">
        <fl-header height="60" class="skyblue">
          header
        </fl-header>
        <fl-main class="beige">
          <fl-scrollbar>
            <div style="height: 500px;width: 1000px;">main</div>
          </fl-scrollbar>
        </fl-main>
        <fl-footer height="60" class="skyblue">
          footer
        </fl-footer>
      </fl-container>
    </fl-container>
  </div>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局3</h3>
    <fl-container class="gray">
      <fl-header height="60" class="skyblue">
        header
      </fl-header>
      <fl-container class="gray">
        <fl-aside width="80" class="yellow">
          <fl-scrollbar>
            <div style="height: 500px;">aside</div>
          </fl-scrollbar>
        </fl-aside>
        <fl-container class="gray">
          <fl-container class="gray">
            <fl-main class="beige">
              <fl-scrollbar>
                <div style="height: 500px;width: 1000px;">main</div>
              </fl-scrollbar>
            </fl-main>
            <fl-aside width="80" class="yellow">
              <fl-scrollbar>
                <div style="height: 500px;">aside</div>
              </fl-scrollbar>
            </fl-aside>
          </fl-container>
          <fl-footer height="60" class="skyblue">
            footer
          </fl-footer>
        </fl-container>
      </fl-container>
    </fl-container>
  </div>
  <div style="height: 400px;display: flex;flex-direction: column;">
    <h3>布局4</h3>
    <fl-container class="gray">
      <fl-aside width="80" class="yellow">
        <fl-scrollbar>
          <div style="height: 500px;">aside</div>
        </fl-scrollbar>
      </fl-aside>
      <fl-main class="beige">
        <fl-scrollbar>
          <div style="height: 500px;width: 1000px;">main</div>
        </fl-scrollbar>
      </fl-main>
      <fl-aside width="80" class="yellow">
        <fl-scrollbar>
          <div style="height: 500px;">aside</div>
        </fl-scrollbar>
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
