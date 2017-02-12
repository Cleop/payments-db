const getAccounts = require('./database/queries/get_accounts.js');
const getTransactions = require('./database/queries/get_transactions.js');

const general = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
};

const home = {
  method: 'GET',
  path: '/',
  handler:(req, reply) => {
    getAccounts((error, accounts) => {
      if (error) console.log('Error:', error);
      console.log("Back in router");
      reply.view('index', {accounts});
    });
  }
};

const payments = {
  method: 'GET',
  path: '/payments',
  handler:(req, reply) => {
    reply.view('payments');
  }
}

const accounts = {
  method: 'GET',
  path: '/nirvana',
  handler:(req, reply) => {
    getTransactions((error, transactions) => {
      if (error) console.log('Error:', error);
      console.log(transactions);
      reply.view('account', {transactions});
    });
  }
};

module.exports = [
  general,
  home,
  payments,
  accounts
];
