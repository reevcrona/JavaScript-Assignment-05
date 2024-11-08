const getBalanceBtn = document.querySelector(".get-balance-btn");
const checkUserBtn = document.querySelector(".check-user");
const depositCard = document.querySelector(".deposit-card");
const withdrawalCard = document.querySelector(".withdrawal-card");
const historyCard = document.querySelector(".history-card");
const signOutCard = document.querySelector(".sign-out-card");

const panelContainer = document.querySelector(".container");


const outputText = document.querySelector(".output");
const userNameText = document.querySelector(".userName");

const depositContainer = document.querySelector(".deposit-container");
const depositAmount = document.querySelector(".deposit-amount");
const depositConfirmBtn = document.querySelector(".deposit-confirm-btn");

const withdrawalContainer = document.querySelector(".withdrawal-container");
const withdrawalAmount = document.querySelector(".withdrawal-amount");
const withdrawalConfirmBtn = document.querySelector(".withdrawal-confirm-btn");

const firstTimeDepositContainer = document.querySelector(".first-time-deposit-container");
const firstTimeDepositBtn = document.querySelector(".first-time-deposit-btn");
const firstTimeSkipBtn = document.querySelector(".first-time-skip-btn");

const historyContainer = document.querySelector(".history-container");

const loginBtn = document.querySelector(".login-btn");
const signUpPage = document.querySelector(".sign-up-page");

const signUpContainer = document.querySelector(".sign-up-container");
const loginContainer = document.querySelector(".login-container");

const fullNameInput = document.querySelector(".full-name");
const pinNumberInput = document.querySelector(".pin-number");
const signUpBtn = document.querySelector(".sign-up-btn");

const loginFullName = document.querySelector(".login-full-name");
const loginPinNumber = document.querySelector(".login-pin-number");
const SignInButton = document.querySelector(".sign-in-btn");

const createAccountLink = document.querySelector(".create-account-link");
const arrowLeftIcon = document.querySelector(".arrow-left-icon");

const eyeIcon = document.querySelectorAll(".open-eye-icon");



let accounts = [];
let activeAccount;

function Account(accountName,password){
  this.accountName = accountName;
  this.balance = 0;
  this.hasLoggedIn = false;
  this.password = password;
  this.history = [];
  this.getBalance = function(){
    outputText.style.display ="block";
    outputText.textContent = `Balance: $${this.balance}`;

  }
  this.deposit = function(){
    const amount = parseFloat(depositAmount.value);
        if(amount > 0 ){
            this.balance += amount;
            this.history.push({
              time:new Date().toLocaleString("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            amount:`+${amount}`
            });
            console.log(this.history)
        }else{
            console.log("Sorry 0 is not a valid deposit");
        }
  }
  this.withdrawal = function(){
    const amount = parseFloat(withdrawalAmount.value);
        if(this.balance > 0 && this.balance > amount && amount > 0){
            this.balance -= amount
            this.history.push({
              time:new Date().toLocaleString("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            amount:`-${amount}`
            });
            console.log(this.history)
        }else{
            console.log('Invalid withdrawal amount or insufficient funds.');
        }
  }
  this.getAccountName = function(){
    userNameText.style.display = "block";
    userNameText.textContent = `Current user: ${this.accountName}`
  }
}

function createNewAccount(){
   const newAccount = new Account(fullNameInput.value,pinNumberInput.value);
   accounts.push(newAccount);

   console.log(accounts)

   fullNameInput.value = "";
   pinNumberInput.value ="";

   signUpPage.style.display = "block";
    loginBtn.style.display = "block";

  signUpContainer.style.display ="none";
}


function findAccount(){
 const targetAccount = accounts.find((account) => {
    return account.accountName === loginFullName.value && 
      account.password === loginPinNumber.value;
  })

  if(targetAccount){
    activeAccount = targetAccount;
    if(activeAccount.hasLoggedIn){
      showPanel();
    }else{
      firstTimeDeposit();
      activeAccount.hasLoggedIn = true;
    }
    
    
  }else{
    console.log("We could not find your account");
    console.log(targetAccount)
  }
  loginFullName.value ="";
  loginPinNumber.value="";
}


function showPanel(){
  panelContainer.style.display = "flex";
  loginContainer.style.display = "none";
  firstTimeDepositContainer.style.display ="none";
  depositContainer.style.display ="none";
}


function firstTimeDeposit(){
  loginContainer.style.display ="none";
  firstTimeDepositContainer.style.display ="flex";
}

function displayHistory(){
  historyContainer.innerHTML = "";
  activeAccount.history.forEach((hist) => {
    const historyDiv = document.createElement("div");
    historyDiv.classList.add("history-div");
    const historyTime = document.createElement("h2")
    const historyAmount = document.createElement("h2")
    historyTime.classList.add("history-time");
    historyTime.textContent = `${hist.time}`;
    historyAmount.textContent = `${hist.amount}`;
    if(historyAmount.textContent[0] === "+"){
      historyAmount.style.color = "green"
    }else if (historyAmount.textContent[0] === "-"){
      historyAmount.style.color = "red"
    }
    
    historyDiv.appendChild(historyTime);
    historyDiv.appendChild(historyAmount);
    historyContainer.appendChild(historyDiv);

  });
}


firstTimeDepositBtn.addEventListener("click",() => {
  depositContainer.style.display ="flex";
  firstTimeDepositContainer.style.display ="none"
})

firstTimeSkipBtn.addEventListener("click",() => {
  showPanel();
})


historyCard.addEventListener("click",() => {
  displayHistory();
})

arrowLeftIcon.addEventListener("click", () => {
  signUpContainer.style.display = "none";
  signUpPage.style.display = "block";
  loginBtn.style.display = "block";
  
})

checkUserBtn.addEventListener("click", () => {
  activeAccount.getAccountName();
})

eyeIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    if(icon.id === "icon-login"){
      togglePassword(loginPinNumber);
    }else{
      togglePassword(pinNumberInput);
    }
  })
})

function togglePassword(input){

if(input.type === "password"){
    input.type = "text";
    eyeIcon.forEach((icon) => {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    })
    
}else if (input.type === "text"){
    input.type ="password";
    eyeIcon.forEach((icon) => {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    })
    
}

}

signOutCard.addEventListener("click",() => {
  panelContainer.style.display ="none";
  signUpPage.style.display = "block";
  loginBtn.style.display = "block";
  outputText.style.display ="none";
  userNameText.style.display = "none";
  activeAccount = undefined;

})

createAccountLink.addEventListener("click",() => {
    loginContainer.style.display = "none";
    signUpContainer.style.display ="flex";
})

SignInButton.addEventListener("click",() => {
  findAccount();
})


signUpPage.addEventListener("click", () => {
  signUpPage.style.display = "none";
  loginBtn.style.display = "none";

  signUpContainer.style.display ="flex";
})



loginBtn.addEventListener("click", () => {
  signUpPage.style.display = "none";
  loginBtn.style.display = "none";

  loginContainer.style.display = "flex";

})


signUpBtn.addEventListener("click", () => {
  createNewAccount();
})


depositCard.addEventListener("click", () => {
    panelContainer.style.display ="none"
    outputText.style.display ="none";
    userNameText.style.display = "none";
    depositContainer.style.display = "flex";
})

depositConfirmBtn.addEventListener("click", () => {
    activeAccount.deposit();
    depositAmount.value ="";
    showPanel();
})

withdrawalCard.addEventListener("click", () => {
    panelContainer.style.display ="none";
    outputText.style.display ="none";
    userNameText.style.display = "none";
    withdrawalContainer.style.display = "flex";
})

withdrawalConfirmBtn.addEventListener("click", () => {
    activeAccount.withdrawal();
    withdrawalAmount.value ="";
    panelContainer.style.display ="block";
    withdrawalContainer.style.display = "none";
})

getBalanceBtn.addEventListener("click", () => {
    activeAccount.getBalance();
})


/*
BANK ACCOUNT

REQUIREMENTS

Create an object called `account` that has the following properties:

- `accountName`: should be the data type string.
  This property should contain the name of the account holder.

- `balance`: should be the data type number.
  This property should contain the total amount of the account.

- `getBalance`: should be a function.
  This function should display the total amount of the account to the user.

- `deposit`: also a function.
  This function should be able to deposit money onto the balance of the account.

- `withdrawal`: also a function.
  This function should be able to withdraw money from the balance of the account.

- `getAccountName`: function as well.
  This function should display the account holder's name to the user.

- `accountError`: same as above function!
  This one is a bit tricky... it's up to you to figure out how or what you should use this for.
  HINT: it's more a thinking problem than a technical problem :)

EXTRA: `exitAccount`, should be a function.
This function should exit the account.
HINT: there are a few different ways to do this; it's up to you which way you choose.

EXTRA = OPTIONAL NOT MANDATORY

Remember that a function is just a value. And if a function is just a value then we can both pass it as a parameter to a function and pass it as a property of an object.

The object should handle all of the functionality (logic).

The `atm()` function should be responsible for showing the user interface and based on the user input show the right menu choice.

HINT:
These operators could probably be useful in this assignment: 
- `&&` operator
- `||` operator

In this assignment, you do not have to create any HTML; you will only output to the console.

To handle one of the potential errors, you can use this built-in method `isNaN()`, this is how you use it:

const variableName = 10;
isNaN(variableName);
*/



