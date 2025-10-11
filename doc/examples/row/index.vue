<template>
  <h2>布局</h2>
  <div>
    <h3>基本</h3>
    <fl-row>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="8">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
  </div>
  <div>
    <h3>行列间距</h3>
    <fl-row :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="8">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
  </div>
  <div>
    <h3>偏移量</h3>
    <fl-row :gutter="20" gap="20">
      <fl-col :offset="6" :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="8">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
  </div>
  <div>
    <h3>布局</h3>
    <h4>center</h4>
    <fl-row justify="center" :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
    <h4>end</h4>
    <fl-row justify="end" :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
    <h4>start</h4>
    <fl-row justify="start" :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
    <h4>space-around</h4>
    <fl-row justify="space-around" :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
    <h4>space-between</h4>
    <fl-row justify="space-between" :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
    <h4>space-evenly</h4>
    <fl-row justify="space-evenly" :gutter="20" gap="20">
      <fl-col :span="6">
        <div :class="['gray']"></div>
      </fl-col>
      <fl-col :span="6">
        <div :class="['skyblue']"></div>
      </fl-col>
    </fl-row>
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
