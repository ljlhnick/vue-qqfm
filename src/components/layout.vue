<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" :active-name="activeMenu">
      <router-link
        :to="{ path: '/category', query: { cid: item.id, cname: item.name } }"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <MenuItem :name="item.name">
          <Icon type="ios-paper" />
          {{ item.name }}
        </MenuItem>
      </router-link>
    </Menu>
    <!-- <slide-show :slides="slides"></slide-show> -->
    <Carousel autoplay v-model="carouseIndex" loop class="carousel">
      <CarouselItem v-for="(item, index) in slides" :key="index">
        <div class="carItem" :name="index">
          <img :src="item.src" />
        </div>
      </CarouselItem>
    </Carousel>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import SlideShow from "./slide";
import { Menu, MenuItem, Carousel, CarouselItem } from "iview";
export default {
  components: {
    // SlideShow,
    Menu,
    MenuItem,
    Carousel,
    CarouselItem
  },
  data() {
    return {
      theme1: "light",
      activeMenu: "",
      carouseIndex: 0,
      menuList: [],
      slides: [
        {
          src: require("../assets/1.jpg"),
          title: "xxx1",
          href: "detail/analysis"
        },
        {
          src: require("../assets/2.jpg"),
          title: "xxx2",
          href: "detail/count"
        },
        {
          src: require("../assets/3.jpg"),
          title: "xxx3",
          href: "http://xxx.xxx.com"
        },
        {
          src: require("../assets/4.jpg"),
          title: "xxx4",
          href: "detail/forecast"
        }
      ]
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.$http.get("../../data.json").then(res => {
        this.menuList = res.data.catList;
      });
    }
  },
  wathch: {
    $route: "get"
  }
};
</script>
<style scoped>
ul li:hover {
  background: #b8860b;
}
.carousel {
  height: 700px;
}
.ivu-carousel-list img {
  width: 100%;
  height: 700px;
}
</style>
<style>
.ivu-carousel-list {
  width: 100%;
}
</style>
