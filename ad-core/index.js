const AD_TYPE = {
  BUTTON: function () {},
  BOX: function () {},
  BANNER: function () {},
};
// 触发的事件类型
const EVENT_LIST = {
  // 点击事件
  click: ({ url }) => {
    console.log(url);
    return function (e) {
      window.open(url);
    };
  },
};

// mock 的 app list配置
const applist = [
  {
    appkey: 'app1',
    AD_value: [
      {
        // 类型
        type: 'BannerAD',
        // 链接
        url: 'https://www.baidu.com',
        // 表现形式
        showType: 'image' | 'video',
        // 图片
        image:
          'https://img-operation.csdnimg.cn/csdn/silkroad/img/1662634720055.png',
        // 触发事件
        event: 'click',
        // 计费
        money: 10,
        // 单价
        price: 0.5,
        // 触发次数
        eventTime: 20,
      },
      {
        // 类型
        type: 'ButtonAD',
        // 链接
        url: 'https://www.qq.com',
        // 表现形式
        showType: 'video' | 'image',
        // 图片
        image:
          'https://img-operation.csdnimg.cn/csdn/silkroad/img/1662634720055.png',
        // 触发事件
        event: 'click',
        // 计费
        money: 10,
        // 单价
        price: 0.5,
        // 触发次数
        eventTime: 20,
      },
    ],
    // app 总计费
    money: 100,
  },
];

// 广告类
class AD {
  constructor(el, option) {
    console.log(el, option);
    this.$options = option;
    this.$container = document.querySelector(el);
    this.$type = option.type;
    this.$el = document.createElement('div');
    this.$resource = this.fetchObj({
      appkey: 'undefined',
      ad_type: this.$type,
      ...option,
    });
    console.log(this.$resource);
    console.log(this.$container);
    this.initDel();
    this.initStyle(this.$el);
    this.initEvent(this.$el, this.$resource);
  }
  // 模拟请求
  fetchObj({ appkey, ad_type }) {
    return applist
      .find(f => f.appkey == appkey)
      .AD_value.find(f => f.type == ad_type);
  }
  // 初始化事件
  initEvent(el, options) {
    console.log(el);
    el.addEventListener(options.event, EVENT_LIST[options.event](options));
  }
  // 初始化style
  initStyle(dom, styles = this.$options.style) {
    console.log(styles);
    dom.style = styles;
  }
  // 初始化广告内容
  initAD($el, $resource, type) {}
  // 删除
  initDel() {
    const delbox = document.createElement('div');
    delbox.id = 'ad-close-icon';
    delbox.style =
      'position:absolute; display: block;width: 15px;height: 2px;background: #333;transform: rotate(45deg);margin-top:20px;';
    var style = document.createElement('style');
    style.innerHTML = `#ad-close-icon::after {
      content: '';
      display: block;
      width: 15px;
      height: 2px;
      background: #333;
      transform: rotate(-90deg);`;
    document.head.appendChild(style);
    this.$delIcon = document.createElement('div');
    this.$delIcon.id = 'ad-close-icon-box';
    this.$delIcon.style =
      'background: red;width:20px;height:30px;position:absolute;';
    this.$delIcon.appendChild(delbox);
    this.$container.appendChild(this.$delIcon);
    this.$delIcon.addEventListener('click', e => this.del(e));
  }
  del(e) {
    e.stopPropagation();
    console.log(this, this.$container);
    this.$container.remove();
    console.log('del');
  }
}

// 实例化 指定广告类型
class BannerAD extends AD {
  constructor(el, option) {
    super(el, {
      ...option,
      type: 'BannerAD',
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
