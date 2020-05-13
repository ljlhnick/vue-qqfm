<template>
  <div>
    <h4>
      <router-link :to="{ path: '/' }" class="h4">首页-></router-link>{{ name
      }}<span v-if="sname">->{{ sname }}</span>
    </h4>
    <Row>
      <div
        class="ivu-col ivu-col-span-6"
        v-for="(item, index) in List"
        :key="index"
      >
        <Card>
          <router-link
            :to="{ path: '/ablumDetail', query: { aid: item.album.albumID } }"
          >
            <img :src="item.album.cover.urls[0].url" class="img" />
          </router-link>
          <h3>{{ item.album.name }}</h3>
          <p>{{ item.album.desc }}</p>
        </Card>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
    <div class="row">
      <div class="col-md-10 col-sm-10 col-xs-10 row">
        <ol>
          <button class="btn btn-info" @click="goto(prevIndex)">上一页</button>
          <button class="btn btn-info" @click="goto(nextIndex)">下一页</button>
        </ol>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-2">
        <ul class="list-group">
          <li v-for="(item, index) in subMenuList" :key="index">
            <router-link
              :to="{
                path: '/category',
                query: { cid: item.id, cname: name, sname: item.name }
              }"
            >
              <a>{{ item.name }}</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <Page
      :current="current"
      :total="totalCount"
      show-sizer
      show-total
      @on-change="changePageList"
    />
  </div>
</template>

<script>
import { Card, Row } from "iview";
export default {
  data() {
    return {
      name: "",
      sname: "",
      List: [],
      subMenuList: [],
      current: 1,
      spinShow: true
    };
  },
  components: {
    Card,
    Row
  },
  computed: {
    prevIndex() {
      if (this.current == 0) return 0;
      return this.current - 1;
    },
    nextIndex() {
      return this.current + 1;
    }
  },
  created() {
    this.get();
  },
  methods: {
    goto(index) {
      this.current = index;
      this.changeGet();
    },
    get() {
      if (typeof this.$route.query.cid === "undefined") return;
      this.$http
        .get(
          "https://api.imjad.cn/qqfm/v1/?type=album&id=" +
            this.$route.query.cid +
            "&page=" +
            this.current +
            "&page_size=20"
        )
        .then(res => {
          this.name = this.$route.query.cname;
          this.sname = this.$route.query.sname;
          this.List = res.data.data.albumInfoList;
          this.totalCount = res.data.data.total;
          this.spinShow = false;
          //console.log(res.data.data)
          this.getSub();
        });
    },
    getSub() {
      this.$http.get("/api/data").then(res => {
        const tmp = res.data.data.catList;
        for (let i = 0; i < tmp.length; i++) {
          if (this.$route.query.cid === tmp[i].id) {
            this.subMenuList = tmp[i].subList;
            return;
          }
        }
      });
    },
    changeGet() {
      this.spinShow = true;
      this.get();
    },
    changePageList(page) {
      this.current = page;
      this.get();
    }
  },
  watch: {
    $route: "get"
  }
};
</script>
<style scoped>
h4,
.h4 {
  margin: 1rem;
  color: #d26917;
}
.wrap {
  margin: 1rem 0;
}
.desc {
  height: 150px;
  width: 100%;
  overflow: hidden;
}
ul,
ol {
  list-style-type: none;
}
ul {
  background: red;
}
ul li {
  height: 50px;
  line-height: 50px;
  color: yellow;
}
ul li a {
  font-size: 14px;
  padding-left: 10px;
}

.img {
  width: 100%;
  height: 100%;
}

.list-group a {
  color: yellow;
  text-decoration: none;
}
.list-group li:hover {
  background: #b8860b;
}
.ivu-col {
  border-radius: 4px;
  margin-bottom: 20px;
  height: 550px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.el-card {
  height: 100%;
}
</style>
