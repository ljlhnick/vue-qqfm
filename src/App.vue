<template>
  <div id="app">
    <div class="header">
      <h2 class="text-center">企鹅fm仿写</h2>
    </div>
    <div class="cont">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer">
      <h2 class="text-center">加油啊，罗小娇</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";

// @Component({
//   components: {
//     HelloWorld
//   }
// })
export default class App extends Vue {}
</script>

<style>
.header {
  width: 100%;
  height: 50px;
  background: #333;
  color: #ccc;
  text-align: center;
}
.footer {
  width: 100%;
  height: 50px;
  background: #333;
  color: #ccc;
  text-align: center;
}
h2 {
  line-height: 50px;
  padding: 25px 0;
}
</style>
