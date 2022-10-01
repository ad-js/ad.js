import EVENT_LIST from '../event.js';
import { applist } from '../mock.js';
// 广告类
export default class AD {
  constructor(el, option) {
    // console.log(el, option);
    this.$options = option;
    this.$container = document.querySelector(el);
    this.$type = option.type;
    this.$el = document.createElement('div');
    this.$resource = this.fetchObj({
      appkey: 'undefined',
      ad_type: this.$type,
      ...option,
    });
    // console.log(this.$resource);
    // console.log(this.$container);
    this.initDel();
    this.initStyle(this.$el);
    this.initEvent(this.$el, this.$resource);
  }
  // 模拟请求
  fetchObj({ appkey, ad_type }) {
    return applist
      .find(f => f.appkey == appkey)
      .AD_value.find(f => f.type == ad_type);
  }
  // 初始化事件
  initEvent(el, options) {
    // console.log(el);
    el.addEventListener(options.event, EVENT_LIST[options.event](options));
  }
  // 初始化style
  initStyle(dom, styles = this.$options.style) {
    // console.log(styles);
    dom.style = styles;
  }
  // 初始化广告内容
  initAD($el, $resource, type) {}
  // 删除
  initDel() {
    const delbox = document.createElement('div');
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
    this.$delIcon.addEventListener('click', e => this.del(e));
  }
  del(e) {
    e.stopPropagation();
    // console.log(this, this.$container);
    this.$container.remove();
    // console.log('del');
  }
}
