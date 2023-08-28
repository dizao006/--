<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>
  
  <script>
import RightList from "./rightList";
import { debounce } from "@/utils";
export default {
  created() {
    //给setSelect添加防抖，并且保存在this中
    this.setSelectDebounce = debounce(this.setSelect, 100);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    //移除效果
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  components: {
    RightList,
  },
  data() {
    return {
      //这个数据控制哪个选中
      activeAnchor: "",
    };
  },
  props: {
    toc: {
      type: Array,
    },
  },
  methods: {
    handleSelect(item) {
      //改变哈希即可跳转到对应位置，在模拟数据中以及存在哈希位置
      location.hash = item.anchor;
    },
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }
      console.log(1);
      this.activeAnchor = ""; //清空激活样式
      const range = 200; //划定规定的范围，在这个范围内在处理相应的情况
      for (const dom of this.doms) {
        //判断当前dom是否应该被选中
        // 看一下当前这个dom元素是不是应该被选中
        if (!dom) {
          continue;
        }
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          // 在规定的范围内
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定的范围下方
          return;
        } else {
          // 在规定的范围上方
          this.activeAnchor = dom.id; // 先假设自己是激活的，然后继续看后面
        }
      }
    },
  },
  computed: {
    //计算属性方法,添加选中效果isSelect
    //根据toc属性以及activeAnchhor得到带有isSelect属性的toc数组
    tocWithSelect() {
      //整个toc是目录列表的每一项，children是下面的子目录
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          // t.anchor 是每个目录项对应的id，此方法是为了返回一个带选中判断的数组toc
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          //创建一个id我t.anchor的dom，并且将它加入到doms中
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            //如果有子目录，并且子目录的长度大于0
            addToDoms(t.children);
            // 将子目录也传进去（深度优先遍历）
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
};
</script>
  
  <style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
  