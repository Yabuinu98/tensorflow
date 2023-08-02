<template>
  <div id="All">
    <h1>PoseNet Training</h1>
    <h2 id="result_label"></h2>
    <div>
      <video
        ref="video"
        width="640"
        height="480"
        autoplay
        muted
        playsinline
      ></video>
      <canvas ref="canvas"></canvas>
      <h3 id="cap_result"></h3>
    </div>
  </div>
</template>
<script></script>
<style scoped>
#All {
  background-color: burlywood;
  height: 100%;
  width: 100%;
  margin-top: 5%;
}
video,
canvas {
  position: absolute;
}
#cap_result {
  position: absolute;
  top: 70%;
}
</style>
