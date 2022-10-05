// mock 的 app list配置
export const applist: any = [
  {
    appkey: 'app1',
    AD_value: [
      {
        // 类型
        type: 'BannerAD',
        // 链接
        url: 'https://www.baidu.com',
        // 表现形式
        showType: 'image' as any | 'video' as any,
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
        type: 'CoupletAD',
        // 链接
        url: 'https://www.baidu.com',
        // 表现形式
        showType: 'image' as any | 'video' as any,
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
        type: 'InterstitialAD',
        // 链接
        url: 'https://www.baidu.com',
        // 表现形式
        showType: 'image' as any | 'video' as any,
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
        type: 'RollupAD',
        // 链接
        url: 'https://www.baidu.com',
        // 表现形式
        showType: 'image' as any | 'video' as any,
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
