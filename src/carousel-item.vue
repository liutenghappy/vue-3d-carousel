<template>
  <div
    @click="go"
    class="carousel-item"
    :style="itemStyle"
  >
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import Mixin from "./minxin";
export default {
  name: "carousel-item",
  mixins: [Mixin],
  props: {
    width: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      translate: 0,
      rotation: 0,
      x: 0,
      y: 0
    };
  },
  computed: {
    index() {
      return this.parent.items.indexOf(this);
    },
    fullWidth() {
      return this.$el.offsetWidth;
    },
    fullHeight() {
      return this.$el.offsetHeight;
    },
    parent() {
      return this.getParent("carousel");
    },
    scale() {
      return (
        this.parent.farScale +
        (1 - this.parent.farScale) * (Math.sin(this.rotation) + 1) * 0.5
      );
    },
    itemStyle() {
      const value = `translate(${this.x}px,${this.y}px) scale(${this.scale})`;
      const style = {
        width: this.width,
        transform: value,
        zIndex: ("" + this.scale * 100) | 0
      };
      return style;
    }
  },
  created() {
    this.parent.items.push(this);
  },
  mounted() {
    console.log(this.$el.offsetWidth);
  },
  methods: {
    renderItem() {
    //   console.log(this.fullWidth, this.fullHeight, this.parent.xOrigin);
      this.x =
        this.parent.xOrigin +
        this.scale *
          (Math.cos(this.rotation) * this.parent.xR - this.fullWidth * 0.5);
      this.y =
        this.parent.yOrigin +
        this.scale * Math.sin(this.rotation) * this.parent.yR;
    },
    go() {
      this.parent.goTo(this.index);
    }
  },
  components: {},
  watch: {}
};
</script>

<style lang="css" scoped>
.carousel-item {
  display: block;
  transform-origin: 0 0;
  position: absolute;
  cursor: pointer;
}
</style>
