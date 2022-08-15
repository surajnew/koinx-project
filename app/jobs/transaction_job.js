
//JOB for retriving the transaction every day & updating user balance base on transaction data.

const serviceLocator = require("../lib/service_locator");
const axios = serviceLocator.get("axios");
const Database = serviceLocator.get("mongoService");

const transaction = function Transaction() {
  this.taskName = "TRANSACTIONS_JOB";

  this.getTransactionData = async (pageNo, user) => {
    try {
      const response = await axios.get("https://api.etherscan.io/api", {
        params: {
          module: "account",
          action: "txlist",
          address: user.address,
          startblock: Number(user.endblock) + 1,
          endblock: 9999999999999999,
          page: pageNo,
          offset: 50,
          sort: "desc",
          apikey: process.env.API_KEY,
        },
      });
      // console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  

  this.updateUserEndblcok = async (user, dataArr) => {
    let letestTransData = dataArr[0];
    if (letestTransData.blockNumber > user.endblock) {
      await Database.update(
        "User",
        { _id: user._id },
        { endblock: letestTransData.blockNumber }
      );
    }
  };

  this.updateUserbalance = async (user, userBalance, data) => {
    data.map((obj) => {
      console.log(obj.value, Number(obj.value));
      if (user.address === obj.from) {
        userBalance += Number(obj.value);
      } else if (user.address == obj.to) {
        userBalance -= Number(obj.value);
      }
    });
    return userBalance;
  };

  this.insertDataInDB = async (dataArr, user) => {
    let newDataArr = dataArr.map((obj) => {
      return {
        ...obj,
        user: user._id.toString(),
        address: user.address,
      };
    });
    // console.log(newDataArr)
    await Database.insertMany("Transaction", newDataArr);
  };

  this.getData = async (getDataFrom, user) => {
    let page = 1;
    let data = [];
    let userBalance = user.balance;
    while (data) {
      data = await getDataFrom(page, user);
      if (data.length == 0) {
        break;
      }

      userBalance = await this.updateUserbalance(user, userBalance, data);

      await this.insertDataInDB(data, user);
      if (page == 1) {
        await this.updateUserEndblcok(user, data);
      }
      page++;
    }
    await Database.update("User", { _id: user._id }, { balance: userBalance });
  };

  this.taskHandler = async () => {
    console.log("TRANSACTIONS_JOB running");
    const userData = await Database.getbByQuery(
      "User",
      {},
      ["address", "endblock"],
      false
    );
    for (let user of userData) {
      await this.getData(this.getTransactionData, user);
    }
    console.log("TRANSACTIONS_JOB completed");
  };
};
module.exports = transaction;
