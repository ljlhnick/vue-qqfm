<template>
  <div>
    <h4 class="h4">
      <router-link :to="{ path: '/' }" class="h4">首页 -> </router-link>{{ name
      }}<span v-if="sname"> -> {{ sname }}</span>
    </h4>
    <Tabs :value="currentTabName" @on-click="changeTab">
      <TabPane
        :label="item.name"
        :name="item.name"
        v-for="(item, index) in subMenuList"
        :key="index"
      >
        <Row>
          <div
            class="ivu-col ivu-col-span-6"
            v-for="(item, index2) in List"
            :key="index2"
          >
            <Card>
              <router-link
                :to="{
                  path: '/ablumDetail',
                  query: { aid: item.album.albumID }
                }"
              >
                <img :src="item.album.cover.urls[0].url" class="img" />
              </router-link>
              <h3>{{ item.album.name }}</h3>
              <p>{{ item.album.desc }}</p>
            </Card>
          </div>
        </Row>
      </TabPane>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Tabs>
    <Page
      :current="current"
      :total="totalCount"
      :page-size="20"
      show-sizer
      show-total
      @on-change="changePageList"
    />
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { Card, Row } from "iview";
export default {
  data() {
    return {
      currentTabName: "",
      name: "",
      sname: "",
      List: [],
      subMenuList: [],
      current: 1,
      spinShow: true,
      totalCount: 0
    };
  },
  components: {
    Card,
    Row
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      if (typeof this.$route.query.cid === "undefined") return;
      this.currentTabName = this.$route.query.sname;
      this.$http
        .get(
          `https://api.imjad.cn/qqfm/v1/?type=album&id=${this.$route.query.cid}&page=${this.current}&page_size=20`
        )
        .then(res => {
          this.name = this.$route.query.cname;
          this.sname = this.$route.query.sname;
          this.List = res.data.data.albumInfoList;
          this.totalCount = res.data.data.total;
          this.spinShow = false;
          this.getSub();
        });
    },
    getSub() {
      this.$http.get("../../data.json").then(res => {
        const tmp = res.data.catList;
        for (let i = 0; i < tmp.length; i++) {
          // eslint-disable-next-line prettier/prettier
          if ( tmp[i].subList.filter(item => item.id === this.$route.query.cid).length > 0) {
            this.subMenuList = tmp[i].subList;
            return;
          }
        }
      });
    },
    changePageList(page) {
      this.current = page;
      this.get();
    },
    changeTab(tab) {
      const id = this.subMenuList.filter(item => item.name == tab)[0].id;
      this.$router.push(`/category?cid=${id}&cname=${this.name}&sname=${tab}`);
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
