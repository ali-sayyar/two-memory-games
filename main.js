let box = Array.from(document.querySelectorAll(".box"));
let start = document.querySelector(".start span");
let timerDiv = document.querySelector(".timer");
let scoreDiv = document.querySelector(".score");
let boxArea = document.querySelector(".boxes");
let durtion = 60;

function createAnimolesIcons() {
  boxArea.innerHTML = "";
  boxArea.style.maxWidth = "600px";
  animoles.forEach((el, i) => {
    let div = document.createElement("div");
    div.classList.add("box");
    div.dataset.type = i;
    div.innerHTML = el;
    div.append(document.createElement("div"));
    div.firstElementChild.style = "font-size :50px;";
    boxArea.appendChild(div);
    boxArea.appendChild(div);
  });
  animoles.forEach((el, i) => {
    let div = document.createElement("div");
    div.classList.add("box");
    div.dataset.type = i;
    div.innerHTML = el;
    div.append(document.createElement("div"));
    div.firstElementChild.style = "font-size :50px;";
    boxArea.appendChild(div);
    boxArea.appendChild(div);
  });
  box = Array.from(document.querySelectorAll(".box"));
  durtion = 90;
}

let score = 0;
let arr = [];
start.onclick = function () {
  let x = document.getElementById("animoles");
  if (x.checked) {
    createAnimolesIcons();
  }

  start.parentElement.remove();
  box.forEach((el) => {
    el.style.transform = "rotatey(-180deg)";
  });
  setTimeout(() => {
    box.forEach((el) => {
      el.style.transform = "rotatey(0)";
    });
  }, 2000);
  timer(durtion);
  box.forEach((el) => {
    console.log(el.innerHTML);
    el.style.order = Math.floor(Math.random() * box.length);
    el.addEventListener("click", () => {
      if (!el.classList.contains("true") && arr.length < 2) {
        el.style.transform = "rotatey(-180deg)";
        arr.push(el);
        if (arr.length == 2) {
          if (arr[0].dataset.type == arr[1].dataset.type && arr[0] != arr[1]) {
            arr[0].classList.add("true");
            arr[1].classList.add("true");
            score++;
            arr = [];
          } else {
            setTimeout(() => {
              arr[0].style.transform = "rotatey(0)";
              arr[1].style.transform = "rotatey(0)";
              arr = [];
            }, 1000);
          }
        }
      }
      check();
    });
  });
};

function check() {
  scoreDiv.innerHTML = score < 10 ? `Score : 0${score}` : `Score : ${score}`;
  if (score == 10) {
    text(`Parfect, All Right`);
  }
}

function timer(t) {
  let men = Math.floor(t / 60);
  let sec = t % 60;
  let xx = setInterval(() => {
    timerDiv.innerHTML = sec < 10 ? `0${men}:0${sec--}` : `0${men}:${sec--}`;
    if (sec <= 0 && men <= 0) {
      clearInterval(xx);
      text(`Time Is Finsh, Your Right Answer Is ${score}`);
    } else if (sec <= 0 && men > 0) {
      men--;
      sec = 59;
    }
  }, 1000);
}

function text(te) {
  let div = document.createElement("div");
  div.classList.add("finsh");
  let text = document.createTextNode(te);
  div.append(text);
  document.querySelector(".boxes").append(div);
  div.addEventListener("click", function () {
    window.location.reload();
  });
}

// /*my write Elzero Code || this is batter but not finsh*/
// start.onclick = function(){
//     this.parentElement.remove()
//     flliped()
// }

// function flliped(){
//     box.forEach(b=>{
//         b.onclick = ()=>{
//             b.classList.add('r-180')
//             let active = box.filter(b => b.classList.contains('r-180'))
//             console.log(active)
//             if(active.length == 2){
//                 console.log('length is 2')
//                 nonClick()
//                 checkActiveBox(active[0],active[1])
//             }
//         }
//     })
// }

// function nonClick(){
//     document.querySelector('.boxes').classList.add('no-click')
//     setTimeout(()=>{
//         document.querySelector('.boxes').classList.remove('no-click')
//     },1000)
// }
// function checkActiveBox(box1,box2){
//     if(box1.dataset.type == box2.dataset.type){
//         console.log('right')
//         box1.classList.remove('r-180')
//         box2.classList.remove('r-180')
//         box1.classList.add('ac')
//         box2.classList.add('ac')
//     }else{
//         setTimeout(()=>{
//             box1.classList.remove('r-180')
//             box2.classList.remove('r-180')
//         },999)
//     }

// }

// /*Get a Random Number Array*/
// let numArr = [...Array(12).keys()]
// let numBox
// for( num of numArr){
//     let random = Math.floor(Math.random() * numArr.length)
//     /*خذ الرقم*/
//     numBox = numArr[num]
//     /*ثم ضع مكانه رقم من مكان عشوائي*/
//     numArr[num] = numArr[random]
//     /*ثم ضع الرقم الذي اخذته في المكان العشوائي*/
//     numArr[random] = numBox
// }
// box.forEach((box,i)=>box.style.order = numArr[i])
