const CRED = require('./creds');
const axios = require('axios');
const dateFns = require('date-fns');
const HmacSha1 = require('hmac_sha1');
const today = () => dateFns.format(new Date(), 'YYYY-MM-DD');

exports.getToken = function(){

  const data = `${CRED.email}${CRED.appid}${today()}`
  const signature = new HmacSha1().digest(CRED.skey, data);
  const URL = 'https://api.quikr.com/app/auth/access_token';

  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: URL,
    data: {
      appId: CRED.appid,
      signature: signature
    }
  });
}

exports.getAdsByCategory = function(catId){
  const URL = `https://api.quikr.com/public/adsByCategory?categoryId=${catId}&city=Bangalore&from=4&size=1`
  const TOKEN = '';
  const TOKENID = ''
  const data = `${CRED.appid}${CRED.email}${today()}`
  const signaturev2 = new HmacSha1().digest(TOKEN, data);

  return axios({
    url: URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Quikr-App-Id': CRED.appid,
      'X-Quikr-Token-Id': TOKENID,
      'X-Quikr-Signature-v2': signaturev2
    }
  });
}

