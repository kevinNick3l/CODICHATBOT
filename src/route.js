const config = require('../config');
const { getCustomerFromNorthWind } = require('./api');

function loadCustomerRoute(app) {
  app.post('/getcustomerbyid', function(req, res) {
    console.log('[GET] /get customer');
    const id = req.body.conversation.memory['commandid'].raw;



    return getCustomerFromNorthWind(id)
      .then(function(carouselle) {
        res.json({
          replies: carouselle,
          conversation: {
          }
        });
      })
      .catch(function(err) {
        console.error('customerApi::getCustomerById error: ', err);
        res.status(400).send({
          type: 'quickReplies',
          content: {
            title: 'Sorry, but I could not find any results for your request :(',
            buttons: [{ title: 'Start over', value: 'Start over' }],
          },
        });
      });
  });
}

module.exports = loadCustomerRoute;