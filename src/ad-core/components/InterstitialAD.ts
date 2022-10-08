import AD from './AD';
// 实例化 指定广告类型
export default class InterstitialAD extends AD {
  constructor(el: any, options: any) {
    super(el, {
      ...options,
      adtype: 'InterstitialAD',
      style: 'width: 100%;height: 200px;z-index: 22;position: absolute;', //想办法动态获取宽高
      name: 'interstitialad',
    });
    this.initcover();
    this.initAD(this.$DOM.$ad, this.$resource);
    this.initboxStyle();
  }
  // 初始化广告内容
  initAD($ad: any, $resource: any) {
    this.$DOM.$ad.style.backgroundImage = `url(${$resource.image})`;
    this.$DOM.$ad.style.backgroundSize = `repeat`;
  }
  // 创建蒙版
  initcover() {
    // console.log(this.$DOM.$ad);
    const ad: HTMLElement = document.createElement('div');
    let html1=`<div id='cover' style="width: 100%;position: fixed;z-index: 114514;height: 100%;background: rgba(0,0,0,0.4);top: 0;left: 0;"></div>`
    ad.innerHTML = html1;
    //在$container后面加上子节点ad
    this.$DOM.$container.appendChild(ad);
  }
  // 给容器加一个子盒子来撑开容器
  initboxStyle() {
    const stylebox: HTMLElement = document.createElement('div');
    stylebox.style.cssText = "background-color: blue;position: fixed;z-index:11451419;top: 50%;width:100%;";
    this.appendChild(stylebox, this.$DOM.$ad);
    this.appendChild(this.$DOM.$container, stylebox);
  }
}