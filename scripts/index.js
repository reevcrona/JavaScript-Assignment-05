const getBalanceBtn = document.querySelector(".get-balance-btn");
const withdrawalBtn = document.querySelector(".withdrawal-btn");
const depositBtn = document.querySelector(".deposit-btn");
const checkUserBtn = document.querySelector(".check-user");
const checkHistoryBtn = document.querySelector(".check-history");
const panelContainer = document.querySelector(".container");
const signOutBtn = document.querySelector(".sign-out-btn");

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


let accounts = [];
let activeAccount;

function Account(accountName,pinNumber){
  this.accountName = accountName;
  this.balance = 0;
  this.hasLoggedIn = false;
  this.pinNumber = pinNumber;
  this.history = [];
  this.getBalance = function(){
    outputText.style.display ="block";
    outputText.textContent = `You have ${this.balance} in your account`;

  }
  this.deposit = function(){
    const amount = parseInt(depositAmount.value);
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
    const amount = parseInt(withdrawalAmount.value);
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
    userNameText.textContent = `Current user ${this.accountName}`
  }
}

function createNewAccount(){
   const newAccount = new Account(fullNameInput.value,parseInt(pinNumberInput.value));
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
      account.pinNumber === parseInt(loginPinNumber.value);
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
  panelContainer.style.display = "block";
  loginContainer.style.display = "none";
  firstTimeDepositContainer.style.display ="none";
  depositContainer.style.display ="none";
}


function firstTimeDeposit(){
  loginContainer.style.display ="none";
  firstTimeDepositContainer.style.display ="block";
}

function displayHistory(){
  historyContainer.innerHTML = "";
  activeAccount.history.forEach((hist) => {
    const historyDiv = document.createElement('div');
    historyDiv.textContent = `${hist.time}: ${hist.amount}`;
    historyContainer.appendChild(historyDiv);
  });
}


firstTimeDepositBtn.addEventListener("click",() => {
  depositContainer.style.display ="block";
  firstTimeDepositContainer.style.display ="none"
})

firstTimeSkipBtn.addEventListener("click",() => {
  showPanel();
})


checkHistoryBtn.addEventListener("click",() => {
  displayHistory();
})



checkUserBtn.addEventListener("click", () => {
  activeAccount.getAccountName();
})



signOutBtn.addEventListener("click",() => {
  panelContainer.style.display ="none";
  signUpPage.style.display = "block";
  loginBtn.style.display = "block";
  outputText.style.display ="none";
  userNameText.style.display = "none";
  activeAccount = undefined;

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


depositBtn.addEventListener("click", () => {
    panelContainer.style.display ="none"
    outputText.style.display ="none";
    userNameText.style.display = "none";
    depositContainer.style.display = "block";
})

depositConfirmBtn.addEventListener("click", () => {
    activeAccount.deposit();

    showPanel();
})

withdrawalBtn.addEventListener("click", () => {
    panelContainer.style.display ="none";
    outputText.style.display ="none";
    userNameText.style.display = "none";
    withdrawalContainer.style.display = "block";
})

withdrawalConfirmBtn.addEventListener("click", () => {
    activeAccount.withdrawal();

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



