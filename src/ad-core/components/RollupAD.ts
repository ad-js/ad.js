import AD from './AD';
// 实例化 指定广告类型
export default class RollupAD extends AD {
  constructor(el: any, options: any) {
    super(el, {
      ...options,
      adtype: 'RollupAD',
      style: 'width:100%;height:100%;',
      name: 'rollupad',
    });
    this.initAD(this.$DOM.$ad, this.$resource);
    this.initRollbox();
  }
  // 初始化广告内容
  initAD($ad: any, $resource: any) {
    this.$DOM.$ad.style.backgroundImage = `url(${$resource.image})`;
    this.$DOM.$ad.style.backgroundSize = `100% 100%`;
  }
  // 初始化滚动盒子
  initRollbox() {
    const rollbtn: HTMLElement = document.createElement('div');
    rollbtn.id = 'ad-rollbtn'
    
    rollbtn.innerHTML = '收起';

    rollbtn.style.cssText = "margin-top: -30px;background: yellow;left: 0% ;display: block ;width: 80px ;height: 30px ;transform: none; transition:2s;"
    // 滚动事件
    let isroll: boolean = false;
    this.registerEvent(rollbtn, 'click', (e: any) => {
      if(!isroll) {
        rollbtn.innerHTML = '展开';
        rollbtn.style.cssText = "margin-top: 70px;background: green;left: 0% ;display: block ;width: 80px ;height: 30px ;transform: none; transition:2s;"
      }
      else {
        rollbtn.innerHTML = '收起';
        rollbtn.style.cssText = "margin-top: -30px;background: yellow;left: 0% ;display: block ;width: 80px ;height: 30px ;transform: none; transition:2s;"
      }
      isroll = !isroll;
    })

    this.appendChild(this.$DOM.$container, rollbtn);
    this.appendChild(this.$DOM.$container, this.$DOM.$ad);
  }
}
