# vue-qqfm

### vue + vue-router + vuex + iview  + TypeScript + Jest

### use iview UI
```
npm i iview

//inject in main.ts
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);

//use in component
import { Card, Row } from "iview";
components: {
    Card,
    Row
},
```

## Project setup
```
npm install
npm run serve
npm run build
npm run test
npm run test:e2e
npm run test:unit
npm run lint
```

### this project showCase
![the indexPage](https://github.com/ljlhnick/vue-qqfm/blob/master/public/showCase/menuList.png)
![List](https://github.com/ljlhnick/vue-qqfm/blob/master/public/showCase/List.png)
![detail](https://github.com/ljlhnick/vue-qqfm/blob/master/public/showCase/detail.png)
![page](https://github.com/ljlhnick/vue-qqfm/blob/master/public/showCase/page.png)
fix bug
![bug](https://github.com/ljlhnick/vue-qqfm/blob/master/public/showCase/bug.png)
### API
```
the document is here:  https://api.imjad.cn/qqfm.md
```

### vue page link change
```
1. router-link <=> <a>
2. js时间中 this.$router.push()
3. 回退，前进  this.$router.go(-1) this.$router.go(1)
```

### Col标签在VS中一直报错
```
https://www.jianshu.com/p/5a84f32beef5 文字的方法并没有效果，所以用div+ class替换Col标签
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
