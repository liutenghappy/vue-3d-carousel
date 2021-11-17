export default {
  methods: {
    getParent(name) {
      let parent = this;
      while ((parent = parent.$parent)) {
        if (parent.$options.name === name) {
          break;
        }
      }
      return parent;
    },
  },
};
