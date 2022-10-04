import { DOM, OPTIONS } from '../interface';
import { applist } from "../mock";
import EVENT_LIST from '../event';
import { CSS_ad_close_icon, CSS_ad_close_icon_after, CSS_ad_close_icon_box } from '../style';
export default class BASE_CORE {
  constructor(container: any, options: any) {
  }
  // DOM
  protected $DOM: DOM | undefined = {
    $container: undefined,
    $ad: undefined,
    $delIcon: undefined,
  };
  // 状态管理
  protected $state: any;
  // 接口请求的资源
  protected $resource: any;
  // 构造函数的参数配置
  protected $options: OPTIONS;
  // 曝光事件
  protected $mutationObserver_show: any;
  // 初始化广告内容
  protected initAD($ad: any, $resource: any, type: any) { }
  // 初始化App
  protected initApp(container: any, options: any) {
    this.initState(container, options);
    this.initAppData(options);
    this.initDom();
  }
  // 初始化数据仓库
  protected initState(container: any, options: any) {
    this.$DOM.$container = container;
    this.$state = {
      container,
      options,
    };
  }
  // 初始化App数据
  protected initAppData(options: any) {
    const { appkey, adtype } = options;
    this.$state.$appkey = appkey;
    this.$state.$adtype = adtype;
    this.initResource();
  }
  // 初始化资源
  protected initResource() {
    this.$resource = this.fetch(this.$state.$appkey, this.$state.$adtype);
    console.log(this.$resource);
  }
  // 初始化DOM
  protected initDom() {
    this.$DOM.$ad = document.createElement('div');
    this.initStyle();
    this.initCloseBtn();
  }
  // 初始化style
  protected initStyle(dom: any = this.$DOM.$ad, styles = this.$state.options.style || 'width:100%;height:100%;') {
    dom.style.cssText = styles;
    var style = document.createElement('style');
    style.innerHTML = CSS_ad_close_icon_after;
    this.appendChild(document.head, style)
  }
  // 初始化删除按钮
  protected initCloseBtn() {
    const delbox: HTMLElement = document.createElement('div');
    delbox.id = 'ad-close-icon';
    delbox.style.cssText = CSS_ad_close_icon;

    this.$DOM.$delIcon = document.createElement('div');
    this.$DOM.$delIcon.id = 'ad-close-icon-box';
    this.$DOM.$delIcon.style.cssText = CSS_ad_close_icon_box;
    // 插入dom
    this.appendChild(this.$DOM.$delIcon, delbox);
    this.appendChild(this.$DOM.$container, this.$DOM.$delIcon);
    // 绑定close事件
    this.registerEvent(this.$DOM.$delIcon, 'click', (e: any) => this.onClose(e))
  }

  // 初始化通用监听事件
  protected initEvent(el: any, options: any) {
    // console.log(el);
    el.addEventListener(options.event, (EVENT_LIST as any)[options.event](options));
  }
  // 模拟请求
  protected fetch(appkey: any, adtype: any) {
    return applist
      .find((f: any) => f.appkey == appkey)
      .AD_value.find((f: any) => f.type == adtype);
  }
  // 上报数据 , click close ... 触发
  protected Escalation(url, data) {
    fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application:/x-www-form-urlencoded:charset=UTF-8"
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res);
    })
  }
  // 关闭事件
  protected onClose(event: Event) {
    event.stopPropagation();
    this.$DOM.$container.remove();
  }
  // 监听渲染事件
  protected initRenderEvent() {
    // 创建实例
    this.$mutationObserver_show = new MutationObserver(() =>
      console.log('曝光了...', this.$DOM.$ad)
    );
    this.$mutationObserver_show.observe(this.$DOM.$container, {
      childList: true,
    });
  }
  protected appendChild(father, child) {
    father.appendChild(child);
  }
  protected registerEvent(dom, operation, event) {
    dom.addEventListener(operation, event)
  }
}
