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
    req.headers['content-type'] === 'text' ? reply().code(400) :
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
    req.headers['content-type'] === 'text' ? reply().code(400) :
    reply.view('payments', {transaction_id: req.query.transaction_id});
  }
};

const newPayment = {
  method: 'POST',
  path: '/new-payment',
  config: {
    handler: (req, reply) => {
      req.headers['content-type'] === 'text' ? reply().code(400) :
      console.log(" - - - - - - - req.payload: ")
      console.log(req.payload);
      console.log(' - - - - - - - - - - - - - - -')
      makeTransfer(req.payload, (error, status, success) => {
        if (error) {
          console.log('Error:', error);
          return reply.view('payments', {error: error});
        }
        console.log(error, status, success);
        reply.view('payments', {success});
      });
    }
  }
};

const nirvana = {
  method: 'GET',
  path: '/nirvana',
  handler:(req, reply) => {
    req.headers['content-type'] === 'text' ? reply().code(400) :
    getTransactions(2,(error, transactions) => {
      if (error) console.log('Error:', error);
      console.log(transactions);
      reply.view('account', {transactions});
    });
  }
};

const queen = {
  method: 'GET',
  path: '/queen',
  handler:(req, reply) => {
    req.headers['content-type'] === 'text' ? reply().code(400) :
    getTransactions(3,(error, transactions) => {
      if (error) console.log('Error:', error);
      console.log(transactions);
      reply.view('account', {transactions});
    });
  }
};

const abba = {
  method: 'GET',
  path: '/abba',
  handler:(req, reply) => {
    req.headers['content-type'] === 'text' ? reply().code(400) :
    getTransactions(4,(error, transactions) => {
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
  nirvana,
  abba,
  queen
];
