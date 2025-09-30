<template>
  <h2>布局</h2>
  <div>
    <h3>基本</h3>
    <a-row>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="8">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
  </div>
  <div>
    <h3>行列间距</h3>
    <a-row :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="8">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
  </div>
  <div>
    <h3>偏移量</h3>
    <a-row :gutter="20" gap="20">
      <a-col :offset="6" :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="8">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
  </div>
  <div>
    <h3>布局</h3>
    <h4>center</h4>
    <a-row justify="center" :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
    <h4>end</h4>
    <a-row justify="end" :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
    <h4>start</h4>
    <a-row justify="start" :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
    <h4>space-around</h4>
    <a-row justify="space-around" :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
    <h4>space-between</h4>
    <a-row justify="space-between" :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
    <h4>space-evenly</h4>
    <a-row justify="space-evenly" :gutter="20" gap="20">
      <a-col :span="6">
        <div :class="['gray']"></div>
      </a-col>
      <a-col :span="6">
        <div :class="['skyblue']"></div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.gray {
  height: 32px;
  background-color: gray;
}

.skyblue {
  height: 32px;
  background-color: skyblue;
}
</style>
