const getBalanceBtn = document.querySelector(".get-balance-btn");
const withdrawalBtn = document.querySelector(".withdrawal-btn");
const depositBtn = document.querySelector(".deposit-btn");

const outputText = document.querySelector(".output");

const depositContainer = document.querySelector(".deposit-container");
const depositAmount = document.querySelector(".deposit-amount");
const depositConfirmBtn = document.querySelector(".deposit-confirm-btn");

const withdrawalContainer = document.querySelector(".withdrawal-container");
const withdrawalAmount = document.querySelector(".withdrawal-amount");
const withdrawalConfirmBtn = document.querySelector(".withdrawal-confirm-btn");

const account = {
    accountName:"Jacob Reevcrona",
    balance:100,
    getBalance(){
        outputText.textContent = `You have ${this.balance} in your account`;
    },
    deposit(){
        const amount = parseInt(depositAmount.value);
        if(amount > 0 ){
            this.balance += amount;
        }else{
            console.log("Sorry 0 is not a valid deposit");
        }
    },
    withdrawal(){
        const amount = parseInt(withdrawalAmount.value);
        if(this.balance > 0 && this.balance > amount && amount > 0){
            this.balance -= amount
            
        }else{
            console.log('Invalid withdrawal amount or insufficient funds.');
        }
            
    }    
}
depositBtn.addEventListener("click", () => {
    getBalanceBtn.style.display = "none";
    depositBtn.style.display = "none";
    withdrawalBtn.style.display = "none";

    depositContainer.style.display = "block";
})

depositConfirmBtn.addEventListener("click", () => {
    account.deposit();

    getBalanceBtn.style.display = "block";
    depositBtn.style.display = "block";
    withdrawalBtn.style.display = "block";
    depositContainer.style.display = "none";
})

withdrawalBtn.addEventListener("click", () => {
    getBalanceBtn.style.display = "none";
    depositBtn.style.display = "none";
    withdrawalBtn.style.display = "none";

    withdrawalContainer.style.display = "block";
})

withdrawalConfirmBtn.addEventListener("click", () => {
    account.withdrawal();

    getBalanceBtn.style.display = "block";
    depositBtn.style.display = "block";
    withdrawalBtn.style.display = "block";
    withdrawalContainer.style.display = "none";
})

getBalanceBtn.addEventListener("click", () => {
    account.getBalance();
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



