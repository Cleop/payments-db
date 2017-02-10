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
    reply.view('index');
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
