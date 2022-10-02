import { applist } from '../mock';
import BASE_CORE from './core';
// 广告类
export default class AD extends BASE_CORE {
  constructor(container: any, options: any) {
    super(container, options);
    this.initApp(container, options);
    this.initEvent(this.$DOM.$ad, this.$resource);
    this.initRenderEvent();
  }
}
