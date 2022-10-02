import EVENT_LIST from '../event';
import { applist } from '../mock';
import BASE_CORE from './core';
// 广告类
export default class AD extends BASE_CORE {
  constructor(container: any, option: any) {
    super(container, option);
    // console.log(container, option);
    this.$options = option;
    this.$container = container;
    this.$type = option.type;
    this.$el = document.createElement('div');
    this.$resource = this.fetchObj({
      appkey: 'undefined',
      adtype: this.$type,
      ...option,
    });
    // console.log(this.$resource);
    // console.log(this.$container);
    this.initDel();
    this.initStyle(this.$el);
    this.initEvent(this.$el, this.$resource);
    this.initRenderEvent();
  }
  // 模拟请求
  fetchObj({ appkey, adtype }: any) {
    return applist
      .find((f: any) => f.appkey == appkey)
      .AD_value.find((f: any) => f.type == adtype);
  }
  // 监听渲染事件
  initRenderEvent() {
    // 创建实例
    this.$mutationObserver_show = new MutationObserver(() =>
      console.log('曝光了...', this.$el)
    );
    this.$mutationObserver_show.observe(this.$container, {
      childList: true,
    });
  }
  // 初始化事件
  initEvent(el: any, options: any) {
    // console.log(el);
    el.addEventListener(options.event, (EVENT_LIST as any)[options.event](options));
  }
  // 初始化style
  initStyle(dom: any, styles = this.$options.style) {
    // console.log(styles);
    dom.style = styles;
  }
  // 初始化广告内容
  initAD($el: any, $resource: any, type: any) { }
  // 删除
  initDel() {
    const delbox: any = document.createElement('div');
    delbox.id = 'ad-close-icon';
    delbox.style =
      'position:absolute; display: block;width: 15px;height: 2px;background: #333;transform: rotate(45deg);margin-top:20px;';
    var style = document.createElement('style');
    style.innerHTML = `#ad-close-icon::after {
      content: '';
      display: block;
      width: 15px;
      height: 2px;
      background: #333;
      transform: rotate(-90deg);
    }`;
    document.head.appendChild(style);
    this.$delIcon = document.createElement('div');
    this.$delIcon.id = 'ad-close-icon-box';
    this.$delIcon.style =
      'width:20px;height:30px;position:absolute;margin-left:15px;right:15px;';
    this.$delIcon.appendChild(delbox);
    this.$container.appendChild(this.$delIcon);
    this.$delIcon.addEventListener('click', (e: any) => this.del(e));
  }
  del(e: any) {
    e.stopPropagation();
    // console.log(this, this.$container);
    this.$container.remove();
    // console.log('del');
  }
}
