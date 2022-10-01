import AD from './AD.js';
// 实例化 指定广告类型
export default class CoupletAD extends AD {
  constructor(el, option) {
    super(el, {
      ...option,
      type: 'CoupletAD',
      style: 'width:100%;height:100%;background:green;',
    });
    this.$container.appendChild(this.$el);
    this.initAD(this.$el, this.$resource);
  }
  // 初始化广告内容
  // 根据内容自定义显示类型
  initAD($el, $resource) {
    this.$el.style.backgroundImage = `url(${$resource.image})`;
    this.$el.style.backgroundSize = `100% 100%`;
  }
}