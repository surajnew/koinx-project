# koinx-project
## project-flow 
## project is hosted on ```https://koin-x.herokuapp.com```
###### create-user-account
-this api will create user account
-it fetches Trans. data from etherscan and stores in db 
-also fetches user balance

``` https://koin-x.herokuapp.com/api/create-account
note: this user is already created you can hit other apis directly using provided userids and address.
body ex:
  {
        "name":"suraj",
        "address":"0xce94e5621a5f7068253c42558c147480f38b5e0d"
}
```

###### 1st task .
-create route where api will get address as input and related transactions should be returned 

``` 
https://koin-x.herokuapp.com/api/transaction?userId=62f8d7fd515eef511ba85c8d&address=0xce94e5621a5f7068253c42558c147480f38b5e0d&page=0
```
it will return list of transaction(paginated)

###### 2nd taks.
-create system for taking ether price every 10 min 
for this task I have created job using node cron which stores data in ethereum model.

###### 3 rd task 
-take address as input and create get route for getting ether price and user balance by calculating it from trans. data of etherscan.

-1) so initially when user creates his account at that time i am fetching the user balance from etherscan api
-2) after that . I have written job which will run every day at midnight and will extract the transaction data of the users who are aleready registered on our platform.
-and while retriving transactin data i am updating the user balance based on to and from as per problem statment 3.

###### I have hoste project on heroku


## Note
1) I have assumed that I will be evaluted based on my logic and scalable folder structure.
2) I have not created any authetication or authorizatin mechanism or validation for shcema. by assuming that will not considered while evaluation
3) I have not written the test cases.
4) I could refactored more if i get more time.
