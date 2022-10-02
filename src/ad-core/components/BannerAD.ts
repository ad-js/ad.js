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
    this.appendChild(this.$DOM.$container, this.$DOM.$ad)
  }
  // 初始化广告内容
  initAD($ad: any, $resource: any) {
    console.log(this.$DOM);

    this.$DOM.$ad.style.backgroundImage = `url(${$resource.image})`;
    this.$DOM.$ad.style.backgroundSize = `100% 100%`;
  }
}
