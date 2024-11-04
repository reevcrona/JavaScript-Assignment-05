const account = {
    accountName:"Jacob Reevcrona",
    balance:0,
    getBalance(){
        console.log(`You have ${this.balance} in your account`);
    },
    deposit(){
        const amount = parseInt(prompt("How much do you want to deposit"))
        this.balance += amount;
    }
}

account.deposit();


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



