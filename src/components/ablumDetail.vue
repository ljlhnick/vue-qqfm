<template>
  <div>
    <div class="row top-row" v-if="List.length != 0">
      <Row>
        <div class="ivu-col ivu-col-span-8">
          <img :src="List.cover.urls[0].url" />
        </div>
        <div class="ivu-col ivu-col-span-16">
          <p style="font-size:20px;">{{ List.name }}</p>
          <p>{{ List.desc }}</p>
          <p v-if="currentShow.times">
            播放次数:{{ currentShow.times }} 收藏:
            {{ currentShow.isCollected }} 喜欢{{ currentShow.likeNum }} 下载{{
              currentShow.downloadNum
            }}
          </p>
          <p v-if="currentShow.duration">总时长:{{ currentShow.duration }}</p>
          <audio v-if="src" :src="src" controls autoplay></audio>
        </div>
      </Row>
    </div>
    <ul class="list-group">
      <h4>节目列表</h4>
      <li v-for="(item, index) in showList" :key="index">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xs-6 left">
            <p>{{ item }}</p>
            <p v-if="currentShow.text">{{ currentShow.text }}</p>
          </div>
          <div>
            <button @click="change(index)">点击按钮播放{{ item }}</button>
          </div>
        </div>
      </li>
    </ul>
    <BackTop></BackTop>
  </div>
</template>

<script>
import api from "../api";
import { BackTop } from "iview";
export default {
  data() {
    return {
      showList: [],
      name: "",
      src: "",
      currentShow: {},
      List: ""
    };
  },
  components: {
    BackTop
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      if (typeof this.$route.query.aid === "undefined") {
        return;
      }
      this.$http.get(api.getAllShow(this.$route.query.aid)).then(res => {
        this.showList = res.data;
        this.change(0);
      });
    },
    change(index) {
      this.$http
        .get(
          `https://api.imjad.cn/qqfm/v1/?type=skip_show&id=${this.$route.query.aid}&shows=${this.showList[index]}`
        )
        .then(res => {
          const currentItem = res.data.data.showList[this.showList[index]];
          this.currentShow = currentItem.show;
          this.src = this.currentShow.audioURL.urls[0].url;

          this.List = currentItem.album;
        });
    }
  },
  watch: {
    $route: "get"
  }
};
</script>
<style scoped>
.top-row {
  height: 300px;
  margin: 10px 10%;
}
.top-row .ivu-row {
  height: 100%;
}
.top-row .ivu-row .ivu-col {
  height: 100%;
}
.top-row .ivu-row .ivu-col img {
  height: 100%;
}
.top-row .ivu-col p {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: yellowgreen;
  padding: 20px;
}
.top-row .ivu-col audio {
  width: 80%;
  padding: 20px;
}
.ivu-col-span-16 p {
  margin-bottom: 20px;
}
.list-group {
  list-style: none;
  width: 1200px;
  margin: 10px auto;
}
.list-group li {
  display: block;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #ccc;
}
.list-group p {
  height: 25px;
  line-height: 25px;
}
.right button {
  margin-top: 60px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
