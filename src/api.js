const axios = require('axios');
const config = require('../config');

function getCustomerFromNorthWind(id) {
  return northWindApiCall(id).then(response =>
    apiResultToCarousselle(response.data)
  ).catch(function (error) {
    // handle error
    console.log(error);
  });
}


// var sapgw = {
//   host: 'https://accounts.sap.com/saml2/idp/sso/accounts.sap.com',

//   // set up Basic authentication
//   // headers: {
//   //   'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
//   // }
// }

// function northWindApiCall(id) {
//   return axios.get(`https://services.odata.org/V4/Northwind/Northwind.svc/Customers('${id}')`, {});
// }

function northWindApiCall(id) {
  var username = 'S0019042205',
    password = 'Simpleplan123*';

  return axios.get(`https://gwaas-pui4xsty20.hana.ondemand.com/odata/SAP/ZCODI_SRV/GetPOInfoSet?$filter=PurchaseOrder eq '${id}'`,
  {headers: {
    'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
}});
}

//fomaat on query formed
// function northWindApiCall(id) {
//   return axios.get(`https://gwaas-pui4xsty20.hana.ondemand.com/odata/SAP/ZCODI_SRV/GetPOInfoSet?$format=json&$filter=PurchaseOrder eq '${id}'`, {headers: {
//     Cookie: "BIGipServergwaas.hana.ondemand.com=!Dujj5xQ86ysrJkAd5jKFI7F71MsHquyLcFgE6AtZ/syn+ypZK+SudAyVlDoKFqrnG4laBJromNooh+I=;JSESSIONID=4B9CF7B35CDDD5A301CC344AB1027879917BCC32725E235D26B8ED3D0BA95EE1;JTENANTSESSIONID_pui4xsty20=SZgbdJmCdTtyfpZ9UejoCfBnHb%2FtCG1gvS0dFo1KrMM%3D;"
// }});
// }
// https://gwaas-pui4xsty20.hana.ondemand.com/odata/SAP/ZCODI_SRV/GetPOInfoSet?$format=json&$filter=PurchaseOrder eq '${0904480030}'

function apiResultToCarousselle(results) {
  var replyMsgArray = [];
  if (!results) {
    return [
      {
        type: 'quickReplies',
        content: {
          title: 'Sorry, but I could not find any results for your request :(',
          buttons: [{ title: 'Start over', value: 'Start over' }],
        },
      },
    ];
  }

//   const cards = results.slice(0, 10).map(e => ({
//     title: e.Address || e.City,
//     subtitle: e.CompanyName || e.ContactTitle,
//     imageUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.poster_path}`,
//     buttons: [
//       {
//         type: 'web_url',
//         value: `https://www.themoviedb.org/movie/${e.id}`,
//         title: 'View More',
//       },
// ], https://gwaas-pui4xsty20.hana.ondemand.com/odata/SAP/ZCODI_SRV/GetPDFSet('${results.d.results[0].PurchaseOrder}')/$value
//   }));


 replyObj = {

  // title: results.CompanyName,
  // subtitle: results.ContactTitle,
    title: results.d.results[0].PurchaseOrder,
    subtitle: results.d.results[0].UserName,

    imageUrl: "",
    buttons: [

      {
       type: 'web_url',
       value: `https://gwaas-pui4xsty20.hana.ondemand.com/odata/SAP/ZCODI_SRV/GetPDFSet('${results.d.results[0].PurchaseOrder}')/$value`,
       title: 'Download PDF',
              },
    ]
};

// replyMsgArray.push(replyObj);

return [

  { type: 'card', content: replyObj },
];
}


module.exports = {
    getCustomerFromNorthWind,
};