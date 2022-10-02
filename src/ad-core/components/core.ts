export default class BASE_CORE {
  $state: any
  $container: any
  $el: any
  $resource: any
  $options: any
  $type: any
  $mutationObserver_show: any
  $delIcon: any
  constructor(container: any, options: any) {
    // console.log(container, option);
    this.initApp(container, options);
  }
  // 初始化App
  initApp(container: any, options: any) {
    this.$state = {
      container,
      options,
    };
  }
  // 初始化App数据
  initAppData() { }
  // 初始化DOM
  initDom() { }
  // 初始化监听事件
  initEvent(el: any, options: any) { }
}
