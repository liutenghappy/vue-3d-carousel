<template>
  <div id="">
    <div>3d轮播</div>
    <div class="container">

      <carousel :isMotion="true" :yRadius="180" :xRadius="300" :autoPlay="false" @change="change">
        <carousel-item>
          <img
            src="./img/chrome.png"
            alt="chrome"
          >
        </carousel-item>
        <carousel-item>
          <img
            src="./img/firefox.png"
            alt="firefox"
          >
        </carousel-item>
        <carousel-item>
          <img
            src="./img/iexplore.png"
            alt="iexplore"
          >
        </carousel-item>
        <carousel-item>
          <img
            src="./img/opera.png"
            alt="opera"
          >
        </carousel-item>
        <carousel-item>
          <img
            src="./img/safari.png"
            alt="safari"
          >
        </carousel-item>
        <carousel-item>
          <img
            src="./img/wyzo.png"
            alt="wyzo"
          >
        </carousel-item>
      </carousel>
    </div>

  </div>
</template>

<script type="text/javascript">
import Carousel from "./carousel.vue";
import CarouselItem from "./carousel-item.vue";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  methods: {
    change(index) {
      console.log(index);
    }
  },
  components: {
    Carousel,
    CarouselItem
  }
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 460px;
}
img {
  width: 200px;
}
</style>
