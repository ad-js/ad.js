import AD from './AD';
// 实例化 指定广告类型
export default class BannerAD extends AD {
  constructor(el: any, options: any) {
    super(el, {
      ...options,
      adtype: 'BannerAD',
      style: 'width:100%;height:100%;',
      name: 'ldq',
    });
    this.initAD(this.$DOM.$ad, this.$resource);
    this.initboxStyle();
  }
  // 初始化广告内容
  initAD($ad: any, $resource: any) {
    this.$DOM.$ad.style.backgroundImage = `url(${$resource.image})`;
    this.$DOM.$ad.style.backgroundSize = `100% 100%`;
  }
  // 给容器加一个子盒子来撑开容器
  initboxStyle() {
    const stylebox: HTMLElement = document.createElement('div');
    stylebox.style.cssText = "background-color: red;float: right; width:100%;height:100px;";
    this.appendChild(stylebox, this.$DOM.$ad);
    this.appendChild(this.$DOM.$container, stylebox);
  }
}
