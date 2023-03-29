
//typescript to js

//import jsonwebtoken

const jwt = require("jsonwebtoken")

userDetails = {
  1000: { username: "Anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
  1001: { username: "Amal", acno: 1000, password: "abc123", balance: 0, transaction: [] },
  1002: { username: "Arun", acno: 1000, password: "abc123", balance: 0, transaction: [] },
  1003: { username: "Megha", acno: 1000, password: "abc123", balance: 0, transaction: [] }


}

//ts to js

register = (acno, uname, psw) => {

  if (acno in userDetails) {
    return {
      status: false,
      message: "User already present",
      statusCode: 404
    }
  }
  else {
    userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
    return {
      status: true,
      message: "Registered",
      statusCode: 200
    }
  }

}


login = (acno, psw) => {


  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {

      //initialize and store current user

      currentUser = userDetails[acno]["username"]
      currentAcno = acno

      //token generate

      const token = jwt.sign({ acno }, "tokenkey")

      return {
        status: true,
        message: "Login success",
        statusCode: 200,
        currentUser,
        currentAcno,
        token
      }

    }
    else {
      return {
        status: false,
        message: "Incorrect password",
        statusCode: 400
      }
    }
  }
  else {
    return {
      status: false,
      message: "Not registered",
      statusCode: 400
    }


  }

}

deposit = (acno, psw, amnt) => {
  amount = parseInt(amnt)

  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amount

      // console.log(userDetails);

      //add transaction data
      userDetails[acno]["transaction"].push(
        {
          Type: "Credit",
          Amount: amount
        }
      )

      return {
        status: true,
        message: `Your account has been credited with the amount ${amount} and the remaining balance is ${userDetails[acno]["balance"]}`,
        statusCode: 200,
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect password",
        statusCode: 400
      }
    }
  }
  else {
    return {
      status: false,
      message: "Incorrect account number",
      statusCode: 400
    }
  }

}

withdraw = (acno, psw, amnt) => {
  var amount = parseInt(amnt)

  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      if (amount <= userDetails[acno]["balance"]) {

        userDetails[acno]["balance"] -= amount

        userDetails[acno]["transaction"].push(
          {
            Type: "Debit",
            Amount: amount
          }
        )

        // console.log(userDetails);

        return {
          status: true,
          message: `Your account has been withdrawed with th amount ${amount} and the remaining balance is ${userDetails[acno]["balance"]}`,
          statusCode: 200
        }

      }
      else {
        return {
          status: true,
          message: "Insufficient Balance",
          statusCode: 400
        }
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect password",
        statusCode: 400
      }
    }

  }
  else {
    return {
      status: false,
      message: "Incorrect account number",
      statusCode: 400
    }
  }
}


getTransaction = (acno) => {
  return {
    status: true,
    transaction: userDetails[acno].transaction,
    statusCode: 200
  }
}

module.exports = {
  register, login, deposit, withdraw, getTransaction
}