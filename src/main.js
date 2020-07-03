const $ulList = $(".ulList");
const $lastLi = $ulList.find("li.lastLi");
// const $search1 = $(".touch-search");
// const $body = $("body");
const x = localStorage.getItem("x"); //此时取出 x 还是一个对象
const xObject = JSON.parse(x); //把字符串变成对象 parse不能访问空字符串
//创建哈希数组表
const hashMap = xObject || [
  //xObject存在就用x，否则就用初始↓↓
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "I", url: "https://www.iqiyi.com" },
  { logo: "J", url: "https://jirengu.com" },
];

const removeX = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // \是为了转意 删除 / 开头的内容
};

const render = () => {
  $ulList.find("li:not(.lastLi)").remove();
  hashMap.forEach((node, index) => {
    console.log(index);
    const $li = $(`  <li>   
          <div class="site">
            <div class="logo"> ${node.logo[0]}</div>
            <div class="link">${removeX(node.url)}</div>
            <div class='close'> 
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg></div>
          </div>
        </li> 
          `).insertBefore($lastLi);

    $li.on("click", () => {
      window.open(node.url); //监听Li按钮，如果点击li就打开新标签
    });
    $li.on("click", ".close", (e) => {
      console.log("这里");
      e.stopPropagation(); //阻止冒泡
      console.log(hashMap);
      hashMap.splice(index, 1); //在index位置删除1项
      render();
    });
  });
};

// $search1.on("click", () => {
//   console.log("我是search");
//   $search1.css("border", "#cfb0f7 solid 3px");
// }); //当search触碰时，border变成red solid 1px

// $("div:not(.globalHeader)").on("click", () => {
//   // $search1.css("border", "none");
//   console.log("我是body");
// });

//遍历哈希数组（把数组带入下面的新增代码公式里）

/* <li>
          <a href="https://www.bilibili.com/">
          <div class="site">
            <div class="logo"> <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bili"></use>
            </svg></div>
            <div class="link">bilibili.com</div>
          </div>
        </a>
        </li>
        <li>
          <a href="https://www.iqiyi.com/">
          <div class="site">
            <div class="logo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iqiyi"></use>
                </svg>
            </div>
            <div class="link">iqiyi.com</div>
          </a>
        </li> */
render();
$(".addButton").on("click", () => {
  //   console.log(1);
  let url = window.prompt("请问你要添加的网址是？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: removeX(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  }),
    //在ulList里面找到所有的li，唯独不找lastLi
    render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //把对象变成字符串
  localStorage.setItem("x", string);
  // 在本地存储设置并命名为x，x就是string;
};

$(document).on("keypress", (e) => {
  const { key } = e; // const key = e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
