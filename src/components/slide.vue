<template>
  <div>
    <div class="slide">
      <div class="slide-wrap row">
        <div class="col-sm-2 col-sm-2 col-xs-2 left">
          <a @click="goto(prevIndex)">before</a>
        </div>
        <div class="col-sm-8 col-sm-8 col-xs-8 center">
          <img :src="slides[index].src" />
        </div>
        <div class="col-sm-2 col-sm-2 col-xs-2 right">
          <a @click="goto(nextIndex)">next</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    slides: {
      type: Array
    },
    inv: {
      type: Number,
      default: 4000
    }
  },
  computed: {
    prevIndex() {
      if (this.index === 0) return this.slides.length - 1;
      return this.index - 1;
    },
    nextIndex() {
      if (this.index == this.slides.length - 1) return 0;
      return this.index + 1;
    }
  },
  created() {
    this.runInv();
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    goto(index) {
      this.index = index;
    },
    runInv() {
      setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    }
  }
};
</script>
<style scoped>
div,
img,
ul,
a,
p,
span {
  margin: 0;
  padding: 0;
  list-style: none;
}
.slide {
  width: 100%;
  margin: 2rem 0;
}
.slide-wrap {
  width: 100%;
  height: 600px;
}
.slide-wrap .center {
  height: 100%;
}
.slide-wrap img {
  width: 100%;
  height: 100%;
}
.row .left,
.row .right {
  position: relative;
}
.row a {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: blue;
  cursor: pointer;
  top: 50%;
}
.left a {
  left: 100px;
}
.right a {
  right: 100px;
}
</style>
