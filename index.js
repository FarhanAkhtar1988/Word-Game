var keyBoardButtons = document.querySelectorAll("#keyboard button");
let tries = document.getElementById("tries");
let suc = document.getElementById("success");
let percent = document.getElementById("percent");
var input = $("#word div");
let chunk = [];
let letterCounter = 0;
let lineCounter = 0;
let res;
const chunkSize = 5;
let obj = {
  totalTries: 0,
  success: 0,
  successRate: 0
}

for (let i = 0; i < input.length; i += chunkSize) {
  let part = input.slice(i, i + chunkSize);
  // converting jquery object into DOM object
  var domObj = part.get();
  // Now pushing DOM object
  chunk.push(domObj)
}

async function fetchWord() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    res = await response.json();
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
fetchWord();

for (let i = 0; i < keyBoardButtons.length; i++) {
  keyBoardButtons[i].addEventListener("click", function () {
    const value = this.getAttribute("data-value");
    if (value === "Enter") {
      result()
    } else if (value === "Delete") {
      if (letterCounter > 0) {
        chunk[lineCounter][letterCounter - 1].innerHTML = "";
        chunk[lineCounter][letterCounter - 1].style.border = "2px solid #e2e8f0";
        letterCounter--;
      }
    } else {
      if (letterCounter && letterCounter % 5 == 0) {
        alert("Please Enter to get the result");
      } else {
        if (lineCounter > 5) {
          return;
        }
        chunk[lineCounter][letterCounter].innerHTML = value;
        chunk[lineCounter][letterCounter].style.border = "2px solid black";
        letterCounter++;
      }
    }
  })
}


function result() {
  let match = 0;
  if (letterCounter < 5 && lineCounter <= 5) {
    alert("Not enough letters")
  } else {
    let word = res[0].toUpperCase();
    for (let i = 0; i < word.length; i++) {
      if (lineCounter > 5) {
        return;
      }
      if (word[i] === chunk[lineCounter][i].innerHTML) {
        chunk[lineCounter][i].style.backgroundColor = "#22c55e";
        chunk[lineCounter][i].style.borderColor = "#22c55e";
        chunk[lineCounter][i].style.color = "white";
        match++;
      } else if (word.includes(chunk[lineCounter][i].innerHTML)) {
        chunk[lineCounter][i].style.backgroundColor = "#eab308";
        chunk[lineCounter][i].style.borderColor = "#eab308";
        chunk[lineCounter][i].style.color = "white";
      } else {
        chunk[lineCounter][i].style.backgroundColor = "#94a3b8";
        chunk[lineCounter][i].style.borderColor = "#94a3b8";
        chunk[lineCounter][i].style.color = "white";
      }
    }
    if (match === 5) {
      setTimeout(() => {
        alert("Great job, Press ok to continue");
        fetchWord();
        obj.success += 1;
        obj.totalTries += 1;
        obj.successRate = Math.round(obj.success / obj.totalTries * 100) + "%";
        showResult();
        const id = setInterval(() => {
          for (let i = word.length - 1; i >= 0; i--) {
            chunk[lineCounter - 1][i].innerHTML = "";
            chunk[lineCounter - 1][i].style.borderColor = "#e2e8f0";
            chunk[lineCounter - 1][i].style.backgroundColor = "unset";
            chunk[lineCounter - 1][i].style.color = "black";
          }
          if (lineCounter === 1) {
            clearInterval(id)
          }
          lineCounter--;
        })
      }, 1000)
    }
    if (lineCounter === 5 && match < 5) {
      setTimeout(() => {
        alert("Better luck next time, Press ok to get the result");
        fetchWord();
        obj.totalTries += 1;
        obj.successRate = Math.round(obj.success / obj.totalTries * 100) + "%";
        showResult();
        const id = setInterval(() => {
          for (let i = word.length - 1; i >= 0; i--) {
            chunk[lineCounter - 1][i].innerHTML = "";
            chunk[lineCounter - 1][i].style.borderColor = "#e2e8f0";
            chunk[lineCounter - 1][i].style.backgroundColor = "unset";
            chunk[lineCounter - 1][i].style.color = "black";
          }
          if (lineCounter === 1) {
            clearInterval(id)
          }
          lineCounter--;
        })
      }, 1000)
    }
    letterCounter = 0;
    if (lineCounter <= 5) {
      lineCounter++;
    }
  }
}

function showResult() {
  tries.innerHTML = "Total Tries" + ":" + " " + obj.totalTries;
  suc.innerHTML = "Success" + ":" + " " + obj.success;
  percent.innerHTML = "Success Rate" + ":" + " " + obj.successRate;
}

showResult();
