# SE-payments
Build a payment app that enables you to monitor account activity and make payments

## Setup

- Clone the repo from github
- Set your environment variable in the command line using ```export DB_URL=```
- Run ```npm install```
- Run ```npm start``` to run the server and navigate to http://localhost:8000/
- Run ```npm test``` to run tests

## Next steps

Given more time the two highest priority areas would be:
- Adding the automated email functionality
- Writing more tests to increase coverage and the type of testing (not just status codes)

## Automated Email Functionality

- Installed in package.json is the sendemail module
- To make this module work I would then follow the steps given in its [README](https://github.com/dwyl/sendemail)
- The templates for this email can be seen in the template folder
- So what remains is getting the environment variables from the AWS account and
writing the js file to execute the sending of the emails.

## Schema

| Accounts Table       |
|----------------------|
| acc_id (primary Key) |
| acc_name             | 
| acc_email            | 

| Transactions Table   |
|----------------------|
| transaction_id (primary Key)|
| account_id_from      | 
| account_id_to        | 
| amount               | 
| tran_date            | 
