const getAccounts = require('./database/queries/get_accounts.js');
const getTransactions = require('./database/queries/get_transactions.js');
const makeTransfer = require('./database/queries/make_transfer.js');

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
    reply.view('payments', {transaction_id: req.query.transaction_id});
  }
};

const newPayment = {
  method: 'POST',
  path: '/new-payment',
  config: {
    handler: (req, reply) => {
      console.log(req.payload);
      makeTransfer(req.payload, error => {
        console.log("req.payload:"+req.payload);
        if (error) console.log('Error:', error);
        console.log("back in router");
        reply.redirect('/');
      });
    }
  }
};

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
  newPayment,
  accounts
];
