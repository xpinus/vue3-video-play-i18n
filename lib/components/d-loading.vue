/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 11:00:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-01 18:08:30
 * @Description: file content
*/
<template>
  <div
    class="d-loading"
    :style="loadingStyle"
    v-show="LOAD_TYPE.includes(loadType)&&!isIOSBrowser()"
  >
    <div>
      <!-- 初始化加载 -->
      <span v-if="loadType == 'loadstart'">
        <i class="rotating iconfont icon-loading f50"></i>
        <p>{{ text }}</p>
      </span>
      <!-- 缓冲中 -->
      <span v-show="loadType == 'waiting'">
        <i class="rotating iconfont icon-loading f50"></i>
        <p>{{ t('loading.loading') }}</p>
      </span>
      <!-- 播放结束 -->
      <span v-show="loadType == 'ended'">
        <p @click="replayHandle" class="d-flex-x d-pointer">
          <i class="iconfont icon-replay f24 mr5"></i>{{ t('loading.replay') }}
        </p>
      </span>
      <!-- 播放错误 -->
      <span v-show="loadType == 'error' || loadType == 'stalled'">
        <p @click="replayHandle" class="d-flex-x d-pointer">
          <i class="iconfont icon-replay f24 mr5"></i>{{ t('loading.error') }}
        </p>
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, reactive, computed } from "vue";
import DIcon from "./d-icon.vue";
import { useComponentI18n } from "../locales";

//IOS移动端不显示加载动画
const isIOSBrowser=()=> {
  return /iP(ad|hone|od)/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
const { t } = useComponentI18n();
const { proxy } = getCurrentInstance();
const LOAD_TYPE = ["loadstart", "waiting", "ended", "error", "stalled"];
const props = defineProps({
  loadType: String,
  text: {
    type: String,
    default: "",
  },
});
const replayHandle = () => {
  proxy.$parent.play();
};
const loadingStyle = computed(() => {
  let style = "background: rgba(0, 0, 0, .1);z-index:1";
  if (props.loadType == "loadstart") {
    style = "background: rgba(0, 0, 0, 1);;z-index:3";
  }
  return style;
});
</script>

<style scoped lang='less'>
@import "../style/iconfont.css";
@import "../style/reset.less";
@import "../style/base.less";
@import "../style/animate.less";
@import "../style/transition.less";

.f50 {
  font-size: 50px;
}
.f24 {
  font-size: 24px;
}
.d-loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  color: #efefef;
  text-align: center;
  font-size: 13px;
}
// .d-play-btn {
//     width: 90px;
//     height: 90px;
//     color: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: rgba(0, 0, 0, 0.7);
//     border-radius: 50%;
// }
</style>
