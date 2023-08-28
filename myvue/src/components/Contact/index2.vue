<template>
  <!-- 这是一个侧边栏的一个组成部分，分别写静态效果的gitee，邮箱，qq和微信四个部分，分别而用ul和li里面包裹了Icon组件
  引入的矢量文字外加span元素写出的文字组成 -->
  <ul class="contact-container" v-if="data">
    <li>
      <a  v-if="data" target="_blank" :href="data.github">
        <div class="icon">
          <Icon type="gitee" />
        </div>
        <span v-if="data">{{data.githubName}}</span>
      </a>
    </li>
    <li>
      <a  v-if="data" :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="info" />
        </div>
        <span v-if="data">{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a v-if="data"
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span v-if="data">{{data.qq}}</span>
      </a>
      <div class="pop">
        <img src="@/assets/qq.png" alt="" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon weixin">
          <Icon v-if="data" type="weixin" />
        </div>
        <span v-if="data">{{data.weixin}}</span>
      </a>
      <div class="pop">
        <img src="@/assets/vx.png" alt="" />
      </div>
    </li>
  </ul>
</template>
  
  <script>
//这边引入icon组件
import { mapState } from "vuex";
import Icon from "../Icon/index.vue";
export default {
  components: {
    Icon,
  },
  computed:{
    ...mapState("setting",["data"]),
  }
};
</script>
  
  <style scoped lang="less">
// 这边写入了css样式进行规范
@import "~@/styles/var.less";
.contact-container {
  //整体样式中去掉了ul前面的·，然后追加了padding，利用变量定义了高度30px 的 变量
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    //给li设置了行高和高度，当高度和行高保持一致时会出现居中效果
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    &:hover {
      //less叠加写，当鼠标移入li时候，将qq和微信的弹窗显示出来注意注意这边跟下面pop一起看
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    //设置a标签样式居中和鼠标样式
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .icon {
    // 矢量图标样式
    font-size: 26px;
    width: 36px;
  }
  .pop {
    //弹窗样式根据li标签进行绝对定位，靠左并且距离底部35像素
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(
      0
    ); //重点！！将图片沿着底部中心位置进行拉伸 到0即可将图片隐藏起来，后通过上面的鼠标移入将其拉伸回1
    transform-origin: center bottom;
    transition: 0.3s; //设置动画
    img {
      //设置照片样式
      width: 150px;
      height: 150px;
    }
    &::after {
      //通过伪类元素在img下面加入了一个小方块
      content: "";
      position: absolute;
      left: 50%;
      //通过旋转角度形成一个菱形，通过隐藏对应部分，从而得出其他效果
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
}
</style>
  