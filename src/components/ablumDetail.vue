<template>
  <div>
    <div class="row top-row" v-if="List.length != 0">
      <div class="col-md-2 col-sm-2 col-xs-2"></div>
      <div class="col-md-3 col-sm-3 col-xs-3">
        <img :src="List.cover.urls[0].url" />
      </div>
      <div class="col-md-7 col-sm-7 col-xs-7 col">
        <p style="font-size:20px;">{{ List.name }}</p>
        <p>{{ List.desc }}</p>
      </div>
    </div>
    <div class="row audio-row">
      <div class="col-md-3 col-sm-3 col-xs-3"></div>
      <audio
        v-if="src"
        :src="src"
        controls
        autoplay
        class="col-md-6 col-sm-6 col-xs-6"
      ></audio>
    </div>
    <ul class="list-group">
      <h4>节目列表</h4>
      <li v-for="(item, index) in showList" :key="index">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xs-6 left">
            <p>{{ item }}</p>
            <p v-if="text[index]">{{ text[index] }}</p>
            <p>
              <span v-if="times[index]">播放:{{ times[index] }}</span>
              <span v-if="duration[index]">总时长:{{ duration[index] }}</span>
            </p>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 right">
            <button class="btn btn-success" @click="change(index)">
              点击按钮播放
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      showList: [],
      name: "",
      src: "",
      text: [],
      duration: [],
      times: [],
      List: ""
    };
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
      });
    },
    change(index) {
      this.$http
        .get(
          "https://api.imjad.cn/qqfm/v1/?type=skip_show&id=rd003v8thW1HWSae&shows=" +
            this.showList[index]
        )
        .then(res => {
          this.src =
            res.data.data.showList[
              this.showList[index]
            ].show.audioURL.urls[0].url;
          this.text[index] =
            res.data.data.showList[this.showList[index]].show.name;
          this.duration[index] =
            res.data.data.showList[this.showList[index]].show.duration;
          this.times[index] =
            res.data.data.showList[this.showList[index]].show.lPlayNum;

          this.List = res.data.data.showList[this.showList[index]].album;
          //console.log(this.List.name)
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
  background: url(../assets/2.jpg);
  opacity: 0.5;
}
.top-row .col {
  margin-top: 2rem;
}
.top-row .col p {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: yellow;
}
.audio-row {
  margin: 1rem 0;
}
.audio-row audio {
  border: 1px solid red;
}
.list-group {
  list-style: none;
  width: 1200px;
  margin: 10px auto;
}
.list-group li {
  display: block;
  width: 100%;
  height: 120px;
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
