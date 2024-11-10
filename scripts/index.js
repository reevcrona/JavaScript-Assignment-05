
//Start page
  const frontPageContainer = document.querySelector(".frontpage-container");
  const loginBtn = document.querySelector(".login-btn");
  const signUpPage = document.querySelector(".sign-up-page");
  const accountSuccessText = document.querySelector(".account-success");

//Start page

//Sign up page

  const signUpContainer = document.querySelector(".sign-up-container");
  const fullNameInput = document.querySelector(".full-name");
  const pinNumberInput = document.querySelector(".pin-number");
  const signUpBtn = document.querySelector(".sign-up-btn");
  const signUpError = document.querySelector(".error-sign-up");
  const arrowLeftIcon = document.querySelector(".arrow-left-icon");

//Sign up page

//Login page

  const loginContainer = document.querySelector(".login-container");
  const loginFullName = document.querySelector(".login-full-name");
  const loginPinNumber = document.querySelector(".login-pin-number");
  const SignInButton = document.querySelector(".sign-in-btn");
  const loginError = document.querySelector(".login-error-message");
  const createAccountLink = document.querySelector(".create-account-link");

//Login page


//First time login

const firstTimeDepositContainer = document.querySelector(".first-time-deposit-container");
const firstTimeDepositBtn = document.querySelector(".first-time-deposit-btn");
const firstTimeSkipBtn = document.querySelector(".first-time-skip-btn");

//First time login


//Panel page

  const panelContainer = document.querySelector(".container");
  const getBalanceBtn = document.querySelector(".get-balance-btn");
  const checkUserBtn = document.querySelector(".check-user");
  const depositCard = document.querySelector(".deposit-card");
  const withdrawalCard = document.querySelector(".withdrawal-card");
  const historyCard = document.querySelector(".history-card");
  const signOutCard = document.querySelector(".sign-out-card");
  const outputText = document.querySelector(".output");
  const userNameText = document.querySelector(".userName");

//Panel page


//Deposit page

  const depositContainer = document.querySelector(".deposit-container");
  const depositAmount = document.querySelector(".deposit-amount");
  const depositConfirmBtn = document.querySelector(".deposit-confirm-btn");

//Deposit page


//Withdrawal page

  const withdrawalContainer = document.querySelector(".withdrawal-container");
  const withdrawalAmount = document.querySelector(".withdrawal-amount");
  const withdrawalConfirmBtn = document.querySelector(".withdrawal-confirm-btn");
  const withdrawalArrow = document.querySelector("#withdraw-arrow-left");

//Withdrawal page



//History page

  const historyContainer = document.querySelector(".history-container");
  const historyBackIcon = document.querySelector("#history-back-icon");

//History page


//Other

  const eyeIcon = document.querySelectorAll(".open-eye-icon");

//Other




let accounts = [];
let activeAccount;

toggleContainer(frontPageContainer);


// Object constructor function that creates a new Account object.
// Takes account name and password from inputs and initializes balance, login status, and transaction history.
// Provides methods for getting the balance, making deposits and withdrawals, and retrieving the account name.

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
            amount:`+ $${amount}`
            });
            return true;
        }else{
            depositAmount.value ="";
            depositAmount.placeholder ="Not a valid amount"
            depositAmount.classList.add("input-error-placeholder")
            return false;
        }
  }
  this.withdrawal = function(){
    const amount = parseFloat(withdrawalAmount.value);
        if(this.balance > 0 && this.balance >= amount && amount > 0){
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
            amount:`- $${amount}`
            });
            return true;
        }else{
            withdrawalAmount.value="";
            withdrawalAmount.placeholder ="Invalid withdrawal amount"
            withdrawalAmount.classList.add("input-error-placeholder-small");
            return false;
        }
  }
  this.getAccountName = function(){
    userNameText.style.display = "block";
    userNameText.textContent = `Current user: ${this.accountName}`
  }
}

function createNewAccount(){
  // Checks if the input fields for full name and PIN are not empty.
  if(fullNameInput.value && pinNumberInput.value){
    
    /* 
      If the accounts array is empty
      Creates a new Account object using the input field values.
      Pushes the new account to the accounts array.
      Clears the input fields and displays a success message.
      Returns to the front page.
    */
    if(accounts.length === 0){
      const newAccount = new Account(fullNameInput.value,pinNumberInput.value);
     accounts.push(newAccount);
  
     fullNameInput.value = "";
     pinNumberInput.value ="";
  
    accountSuccessText.style.display ="block";
     toggleContainer(frontPageContainer);
    }
    /* 
        If the accounts array is not empty
        Loops through existing accounts to check if an account with the same name
        and password already exists.
        If a match is found, displays an error message and stops further checks.
        If no match is found, creates a new Account object, adds it to the accounts array,
        clears input fields, displays a success message, and returns to the front page.
    
    */
    else{
      
      let accountExists = false;
  
      for(let i = 0; i < accounts.length; i++){
        if(accounts[i].accountName === fullNameInput.value && accounts[i].password === pinNumberInput.value){
          signUpError.style.display ="block";
          accountExists = true;

          break;
        } 
       }
       if(!accountExists){
        const newAccount = new Account(fullNameInput.value,pinNumberInput.value);
        accounts.push(newAccount);
  
        fullNameInput.value = "";
        pinNumberInput.value ="";
        signUpError.style.display ="none";
        accountSuccessText.style.display ="block";
        toggleContainer(frontPageContainer);
        
      }
    }
  }
}

function findAccount(){

  /* 
    Loops through the accounts array to find an account object 
    where accountName and password match the login input values.
    If a match is found, it returns the account object to the targetAccount variable.
    If no match is found, targetAccount will be undefined.
  */ 

 const targetAccount = accounts.find((account) => {
    return account.accountName === loginFullName.value && 
      account.password === loginPinNumber.value;
  })

  /* 
    If a targetAccount is found
      Sets activeAccount to the found account.
      Checks if this account has previously logged in
      If true, navigates the user to the panel.
      If false, prompts the user to make a deposit since its their first login,
      updates the login status, and then hides any login error messages.


      If an account was not found it will display an error message.
 */
  

  if(targetAccount){
    activeAccount = targetAccount;
    if(activeAccount.hasLoggedIn){
      toggleContainer(panelContainer)
      loginError.style.display ="none";
    }else{
      toggleContainer(firstTimeDepositContainer)
      activeAccount.hasLoggedIn = true;
      loginError.style.display ="none";
    }
    
    
  }else{
    loginError.style.display ="block";
  }
  loginFullName.value ="";
  loginPinNumber.value="";
}


function toggleContainer(container){
  const containers = [loginContainer,firstTimeDepositContainer,panelContainer,depositContainer
    ,withdrawalContainer,historyContainer,signUpContainer,frontPageContainer
  ];

  containers.forEach((item) => {
    item.style.display = "none";
  })

  container.style.display ="flex";
}

function displayHistory(){
  
  /* 
     Hides the username and balance text.

     Shows the history container and back arrow, 
     and clears any existing content in the history container.

  */
  userNameText.style.display ="none";
  outputText.style.display ="none";
  toggleContainer(historyContainer)
  historyBackIcon.style.display = "block";
  historyContainer.innerHTML = "";
  
  /* 
  
    Checks if the active accounts history array is empty.

    If empty, displays a message indicating there are no previous transactions.
    If not empty, iterates through the accounts history array to display each transaction.

  */
  if(activeAccount.history.length === 0 ){
    const emptyMessage = document.createElement("h2");
    emptyMessage.textContent ="There are currently no transactions to display for this account.";
    emptyMessage.classList.add("empty-message");
    historyContainer.appendChild(emptyMessage);
  }else{
    
    /* 
    
    For each transaction in history
      Creates a `div` for the transaction, along with `h2` elements for the transaction time and amount.
      Adds appropriate classes to the elements for styling.
      Sets the `h2` text content to display the transaction time and amount.
      Checks the amount if it starts with `+`, sets the text color to green; if it starts with `-`, sets it to red.
    
    */
    
    activeAccount.history.forEach((hist) => {
      
      const historyDiv = document.createElement("div");
      historyDiv.classList.add("history-div");
      const historyTime = document.createElement("h2")
      const historyAmount = document.createElement("h2")
      historyTime.classList.add("history-time");
      historyAmount.classList.add("history-amount");
      historyTime.textContent = `${hist.time}`;
      historyAmount.textContent = `${hist.amount}`;
      if(historyAmount.textContent[0] === "+"){
        historyAmount.style.color = "green"
      }else if (historyAmount.textContent[0] === "-"){
        historyAmount.style.color = "red"
      }
      
      /* 
        Appends the time and amount elements to the transaction `div`, 
        and then appends the `div` to the history container.
      */
      
      historyDiv.appendChild(historyTime);
      historyDiv.appendChild(historyAmount);
      historyContainer.appendChild(historyDiv);
  
    });
  }
  
}

historyBackIcon.addEventListener("click", () => {
  toggleContainer(panelContainer)
  historyBackIcon.style.display ="none";
})

firstTimeDepositBtn.addEventListener("click",() => {
  toggleContainer(depositContainer);
})

firstTimeSkipBtn.addEventListener("click",() => {
  toggleContainer(panelContainer);
})


historyCard.addEventListener("click",() => {
  displayHistory();
})

arrowLeftIcon.addEventListener("click", () => {
  toggleContainer(frontPageContainer);
  signUpError.style.display ="none";
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
  toggleContainer(frontPageContainer);
  outputText.style.display ="none";
  userNameText.style.display = "none";
  activeAccount = undefined;
})

createAccountLink.addEventListener("click",() => {
    toggleContainer(signUpContainer);
})

SignInButton.addEventListener("click",() => {
  findAccount();
})


signUpPage.addEventListener("click", () => {
  fullNameInput.value ="";
  pinNumberInput.value ="";
  toggleContainer(signUpContainer);
})



loginBtn.addEventListener("click", () => {
  toggleContainer(loginContainer);
  accountSuccessText.style.display ="none";
})


signUpBtn.addEventListener("click", () => {
  createNewAccount();
})


depositCard.addEventListener("click", () => {
    outputText.style.display ="none";
    userNameText.style.display = "none";
    toggleContainer(depositContainer)
    
})

depositConfirmBtn.addEventListener("click", () => {
      const success = activeAccount.deposit();
      if(success){
        depositAmount.value ="";
        depositAmount.placeholder ="Amount";
        depositAmount.classList.remove("input-error-placeholder")
        toggleContainer(panelContainer);
      }
    
    
  
})

withdrawalCard.addEventListener("click", () => {
    outputText.style.display ="none";
    userNameText.style.display = "none";
    toggleContainer(withdrawalContainer);
    
})

withdrawalConfirmBtn.addEventListener("click", () => {
    const success = activeAccount.withdrawal();
    if(success){
      withdrawalAmount.value ="";
      withdrawalAmount.classList.remove("input-error-placeholder-small");
      toggleContainer(panelContainer);
    }
  
    
})

getBalanceBtn.addEventListener("click", () => {
    activeAccount.getBalance();
})

withdrawalArrow.addEventListener("click", () => {
  toggleContainer(panelContainer);
  withdrawalAmount.value="";
})