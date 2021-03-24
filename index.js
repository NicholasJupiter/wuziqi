const CHESS_POINT_COUNT = 15;
const RESULT_COUNT = 5; // 获胜需要几个棋子
let isVictory = false;

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
var currState = true; // true: black false: white
let lastStep = []; // 最后一步

// const huiqiStep = {
//   black: true,
//   white: true,
// }

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
  canvas.addEventListener('mousedown', play);
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
  // const state = currState ? 'black' : 'white';
  // if (!huiqiStep[state]) {
  //   document.getElementById('huiqi').style.display = 'none';
  // } else {
  //   document.getElementById('huiqi').style.display = 'inline-block';
  // }
  // lastStep = [y, x];
  const currImg = currState ? img_b : img_w;
  ctx.drawImage(currImg, x * 50, y * 50);
  DATA[y][x] = currState;
  judge(x, y);
  if (isVictory) {
    setTimeout(() => { alert(currState ? '黑方胜利' : '白方胜利'); }, 100);
    canvas.removeEventListener('mousedown', play);
    return;
  }
  currState = !currState;
}

function judge (x, y) {
  // 计算x轴
  forData(x, y, to_X, toX);
  // 计算y
  forData(x, y, to_Y, toY);
  // 计算斜线
  forData(x, y, to_XY, toX_Y);
  forData(x, y, toXY, to_X_Y);
}
/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {*} step1 
 * @param {*} step2 
 * @returns 
 */
function forData (x, y, step1, step2) {
  const [_x, _y] = step1;
  const [_x2, _y2] = step2;
  let res = 1;
  let currX = x;
  let currY = y;
  for (let i = 0; i < RESULT_COUNT; i++) {
    if (dataJudge(currX, currY, step1) !== currState ||
      (x < 0 || y < 0 || x >= CHESS_POINT_COUNT || y >= CHESS_POINT_COUNT)) {
      break;
    };
    ++res;
    currX = currX + _x;
    currY = currY + _y;
  }
  currX = x;
  currY = y;
  for (let i = 0; i < RESULT_COUNT; i++) {
    if (dataJudge(currX, currY, step2) !== currState ||
      (x < 0 || y < 0 || x >= CHESS_POINT_COUNT || y >= CHESS_POINT_COUNT)) {
      break;
    };
    ++res;
    currX = currX + _x2;
    currY = currY + _y2;
  }
  if (res >= RESULT_COUNT) {
    isVictory = true;
  }
  return res;
}

function dataJudge (x, y, step) {
  const [_x, _y] = step;
  return DATA[y + _y][x + _x];
}

// function huiqi () {
//   const state = currState ? 'black' : 'white';
//   huiqiStep[state] = false;
// }

function reload () {
  location.reload();
}

init();