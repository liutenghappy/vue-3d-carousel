<template>
  <div
    :style="styleObj"
    id="carousel"
  >
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "carousel",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "460px"
    },
    farScale: {
      //最远时的缩放
      type: Number,
      default: 0.5
    },
    xRadius: {
      type: Number
    },
    yRadius: {
      type: Number
    },
    speed: {
      type: Number,
      default: 4
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    },
    isMotion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      count: 0,
      items: [],
      rotation: Math.PI / 2,
      destRotation: Math.PI / 2,
      lastTime: Date.now(),
      timer: 0,
      autoPlayTimer: null,
      uniformMotionTimer: null,
      index: 0
    };
  },
  computed: {
    styleObj() {
      return {
        width: this.width,
        height: this.height
      };
    },
    yR() {
      return this.yRadius || this.$el.offsetHeight / 6;
    },
    xR() {
      return this.xRadius || this.$el.offsetWidth / 2.3;
    },
    xOrigin() {
      return this.$el.offsetWidth / 2;
    },
    yOrigin() {
      return this.$el.offsetHeight / 10;
    },
    activeIndex() {
      return Math.round(this.floatIndex()) % this.count;
    }
  },
  mounted() {
    this.initItem();
    if (this.autoPlay) this.start();
    this.uniformMotion();
  },
  methods: {
    initItem() {
      //   this.$nextTick(() => {
      let radians = this.rotation;
      this.count = this.items.length;
      let space = (2 * Math.PI) / this.count;
      this.items.forEach(ele => {
        ele.rotation = radians;
        ele.renderItem();
        radians += space;
      });
      //   });
    },
    scheduleNextFrame() {
      this.lastTime = Date.now();
      this.timer = window.requestAnimationFrame(this.playFrame);
    },
    play() {
      if (this.timer === 0) {
        this.scheduleNextFrame();
      }
    },
    playFrame() {
      var rem = this.destRotation - this.rotation;
      var now = Date.now();
      var dt = (now - this.lastTime) * 0.002;
      this.lastTime = now;
      if (Math.abs(rem) < 0.005) {
        this.rotation = this.destRotation;
        this.uniformMotion();

        this.pause();
        this.$emit("change", this.activeIndex);
        if (typeof this.onAnimationFinished === "function")
          this.onAnimationFinished();
      } else {
        // 渐近地接近目标
        this.rotation = this.destRotation - rem / (1 + this.speed * dt);
        this.scheduleNextFrame();
      }

      this.initItem();
    },
    pause() {
      console.log("暂停");
      window.cancelAnimationFrame(this.timer);
      this.timer = 0;
    },
    go(count) {
      this.destRotation += ((2 * Math.PI) / this.count) * count;
      this.play();
    },
    goTo(index) {
      this.stopMotion();
      this.stop();
      //找到将项目旋转到前面的最短方法
      let diff = index - (this.floatIndex() % this.count);

      if (2 * Math.abs(diff) > this.count)
        diff -= diff > 0 ? this.count : -this.count;

      // 停止任何正在进行的旋转
      this.destRotation = this.rotation;

      // 旋转相反的方向把项目带到前面
      this.go(-diff);

      // 返回到目标的旋转距离(以项目为单位)
      return diff;
    },
    itemsRotated() {
      return (this.count * (Math.PI / 2 - this.rotation)) / (2 * Math.PI);
    },
    floatIndex() {
      let floatIndex = this.itemsRotated() % this.count;

      // 确保float-index是正的
      return floatIndex < 0 ? floatIndex + this.count : floatIndex;
    },
    start() {
      this.autoPlayTimer = setInterval(() => {
        this.go(1);
      }, this.interval);
    },
    stop() {
      clearInterval(this.autoPlayTimer);
    },
    uniformMotion() {
      if (this.activeIndex != this.index) {
        this.index = this.activeIndex;
        this.$emit("change", this.index);
      }

      this.rotation += 0.005;
      this.initItem();
      this.uniformMotionTimer = window.requestAnimationFrame(
        this.uniformMotion
      );
    },
    stopMotion() {
      window.cancelAnimationFrame(this.uniformMotionTimer);
    }
  },

  components: {},
  beforeDestroy() {}
};
</script>

<style lang="css" scoped>
</style>
