import AD from './AD';
// 实例化 指定广告类型
export default class CoupletAD extends AD {
  constructor(el: any, options: any) {
    super(el, {
      ...options,
      adtype: 'CoupletAD',
      style: 'position: fixed;width:10%;height:30%;margin:auto;',
      name: 'coupletad',
    });
    this.initAD(this.$DOM.$ad, this.$resource);
    this.initboxStyle();
  }
  // 初始化广告内容
  initAD($ad: any, $resource: any) {
    this.$DOM.$ad.style.backgroundImage = `url(${$resource.image})`;
    this.$DOM.$ad.style.backgroundSize = `repeat`;
  }
  // 给容器加一个子盒子来撑开容器
  initboxStyle() {
    // 判断是否已经有一个对联了
    const couplet1 = document.getElementById('ad-has1');
    if (!couplet1) {
      const stylebox1: HTMLElement = document.createElement('div');
      stylebox1.style.cssText = "background-color: green;left: 0;bottom: 150px;position: fixed;z-index: 114514;width: 10%;height: 30%;background: border-box;min-height: 120px;";
      this.appendChild(stylebox1, this.$DOM.$ad);
      this.appendChild(this.$DOM.$container, stylebox1);
      const hasbox1: HTMLElement = document.createElement('div');
      hasbox1.id = 'ad-has1';
      this.appendChild(stylebox1,hasbox1);
    }
    else {
      const stylebox2: HTMLElement = document.createElement('div');
      stylebox2.style.cssText = "background-color: green;right: 0;bottom: 150px;position: fixed;z-index: 114514;width: 10%;height: 30%;background: border-box;min-height: 120px;";
      this.appendChild(stylebox2, this.$DOM.$ad);
      this.appendChild(this.$DOM.$container, stylebox2);
    }
    
  }
}
