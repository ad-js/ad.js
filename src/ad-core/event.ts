// 触发的事件类型
export default {
  // 点击事件
  click: ({ url }: any) => {
    // console.log(url);
    return function (e: any) {
      window.open(url);
    };
  },
  // dom渲染事件
  render: ({ }) => {
    console.log();
  },
};
