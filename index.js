var keyBoardButtons = document.querySelectorAll("#keyboard button");
var input = document.querySelectorAll("#word div");


for(let i = 0; i < keyBoardButtons.length; i++){
    keyBoardButtons[i].addEventListener("click", function(){
       const value = this.getAttribute("data-value");
       if(value === "Enter"){
        console.log("enter press hua")
       } else if(value === "Delete"){
        console.log("Delete press hua")
       } else {
         input[i].innerHTML = value;
       }
})
}
