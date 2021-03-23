const CHESS_POINT_COUNT = 15;
const RESULT_COUNT = 5; // 获胜需要几个棋子

// 数据
const DATA = initData();

function initData () {
  return Array.from({ length: CHESS_POINT_COUNT }).
    fill(0).map(() => Array.from({ length: CHESS_POINT_COUNT }).fill(-1));
}

// 如何移动
// 水平移动
const toX = [1, 0];
const to_X = [-1, 0];
// 垂直
const toY = [0, 1];
const to_Y = [0, -1];
// 斜
const toXY = [1, 1];
const to_X_Y = [-1, -1];
const to_XY = [-1, 1];
const toX_Y = [1, -1];
// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 当前操作者
let currState = true; // true: black false: white

// img 
const img_b = new Image();
img_b.src = "black.png";//白棋图片
const img_w = new Image();
img_w.src = "white.png";//黑棋图片



function init () {
  for (let i = 0; i < CHESS_POINT_COUNT; i++) {
    // 横线
    ctx.moveTo(15 + i * 50, 15);
    ctx.lineTo(15 + i * 50, 715);
    ctx.stroke();
    // 竖线
    ctx.moveTo(15, 15 + i * 50);
    ctx.lineTo(715, 15 + i * 50);
    ctx.stroke();
  }
}

// 下棋
function play (e) {
  let x = parseInt((e.layerX) / 50);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
  let y = parseInt((e.layerY) / 50);
  drawChess(x, y);
}

function drawChess (x, y) {
  if (DATA[y][x] !== -1) {
    return alert('已经有棋子了');
  }
  const currImg = currState ? img_b : img_w;
  ctx.drawImage(currImg, x * 50, y * 50);
  DATA[y][x] = currState;
  judge(x, y);
  currState = !currState;
}

function judge (x, y) {
  const scope = CHESS_POINT_COUNT - RESULT_COUNT;

  if (x <= scope) {
    forData(x, y, to_X);
  }
  if (x >= scope) {

  }
  if (x !== CHESS_POINT_COUNT - 1) {
    forData(x, y, toX);
  }
  if (y < RESULT_COUNT) {
    // forData(x, y, to);
  }
}

function forData (x, y, step) {
  const [_x, _y] = step;
  let res = 1;
  for (let i = 0; i < RESULT_COUNT; i++) {
    if (dataJudge(x, y, step) !== currState) {
      break;
    };
    ++res;
    x = x + _x;
    y = y + _y;
  }
  console.log(res);
}

function dataJudge (x, y, step) {
  const [_x, _y] = step;
  return DATA[y + _y][x + _x];
}


init();