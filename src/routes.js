const getAccounts = require('./database/queries/get_accounts.js');

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
    console.log("Running handler");
    getAccounts((error, accounts) => {
      if (error) console.log('Error:', error);
      console.log("Back in router");
      console.log(accounts);
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

module.exports = [
  general,
  home,
  payments
];
