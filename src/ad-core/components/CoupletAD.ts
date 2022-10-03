import AD from './AD';
import { CSS_ad_close_icon_couplet, CSS_ad_close_icon_box_couplet } from '../style';
// 实例化 指定广告类型
export default class CoupletAD extends AD {
  constructor(el: any, options: any) {
    super(el, {
      ...options,
      adtype: 'CoupletAD',
      style: 'position: fixed;width:10%;height:30%;',
      name: 'dlad',
    });
    this.initAD(this.$DOM.$ad, this.$resource);
    this.appendChild(this.$DOM.$container, this.$DOM.$ad)
  }
  // 初始化广告内容
  initAD($ad: any, $resource: any) {
    console.log(this.$DOM);

    this.$DOM.$ad.style.backgroundImage = `url(${$resource.image})`;
    this.$DOM.$ad.style.backgroundSize = `100% 100%`;
  }
  // 初始化关闭按钮样式
  protected initCloseBtn() {
    const delbox: HTMLElement = document.createElement('div');
    delbox.id = 'ad-close-icon';
    delbox.style.cssText = CSS_ad_close_icon_couplet;

    this.$DOM.$delIcon = document.createElement('div');
    this.$DOM.$delIcon.id = 'ad-close-icon-box';
    this.$DOM.$delIcon.style.cssText = CSS_ad_close_icon_box_couplet;
    // 插入dom
    this.appendChild(this.$DOM.$delIcon, delbox);
    this.appendChild(this.$DOM.$container, this.$DOM.$delIcon);
    // 绑定close事件
    this.registerEvent(this.$DOM.$delIcon, 'click', (e: any) => this.onClose(e))
  }
}
