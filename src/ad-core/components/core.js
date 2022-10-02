export default class BASE_CORE {
  constructor(container, options) {
    // console.log(container, option);
    this.initApp(container, options);
  }
  // 初始化App
  initApp(container, options) {
    this.state = {
      container,
      options,
    };
  }
  // 初始化App数据
  initAppData() {}
  // 初始化DOM
  initDom() {}
  // 初始化监听事件
  initEvent() {}
}
