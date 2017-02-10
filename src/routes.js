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

module.exports = [
  general,
  home
];
