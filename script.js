let number=document.querySelectorAll(".number");
let display=document.querySelector("#display");
let backspace=document.querySelector("#backspace");
let clear=document.querySelector("#clear");
let operator=document.querySelectorAll(".operator");
let result=document.querySelector("#result");

function calculate(num1,num2,operator){
    let result;
    switch (operator){
        case "+":result=Number(num1)+Number(num2);
                 return result;
        case "-":result=Number(num1)-Number(num2);
                 return result;
        case "X":result=Number(num1)*Number(num2);
                 return result;
        case "/":result=Number(num1)/Number(num2);
                 return result;
        case "%":result=Number(num1)%Number(num2);
                 return result;
    }
}

for(let i=0; i<number.length; i++){
    number[i].addEventListener("click",()=>{
        display.textContent += number[i].textContent;
    });
}

backspace.addEventListener("click",()=>{
    display.textContent=display.textContent.slice(0,-1);
});

clear.addEventListener("click",()=>{
    display.textContent="";
})

let choice;
let firstNum;
for(let i=0; i<operator.length; i++){
    operator[i].addEventListener("click",()=>{
        choice=operator[i].textContent;
        firstNum=display.textContent;
        display.textContent="";
    });
}

let secondNum;
result.addEventListener("click",()=>{
    secondNum=display.textContent;
    display.textContent=calculate(firstNum,secondNum,choice);
})

