import AD from './AD';
// 实例化 指定广告类型
export default class BannerAD extends AD {
  constructor(el: any, option: any) {
    super(el, {
      ...option,
      adtype: 'BannerAD',
      style: 'width:100%;height:100%;background:green;',
      name: 'ldq',
    });
    this.$container.appendChild(this.$el);
    this.initAD(this.$el, this.$resource);
  }
  // 初始化广告内容
  // 根据内容自定义显示类型
  initAD($el: any, $resource: any) {
    this.$el.style.backgroundImage = `url(${$resource.image})`;
    this.$el.style.backgroundSize = `100% 100%`;
  }
}
