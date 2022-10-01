// 触发的事件类型
export default {
  // 点击事件
  click: ({ url }) => {
    // console.log(url);
    return function (e) {
      window.open(url);
    };
  },
};
