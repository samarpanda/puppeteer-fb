const qdp = require('./qdp');

// const token = qdp.getToken().then((res) => {
//   console.log(res.data);
// });
// const token = { error: 'false',
// message: 'Success',
// token: '4ec80ffd4a1c55e40d107164778d6f3c',
// tokenId: '1541691931',
// expiresAfter: '46782' };


qdp.getAdsByCategory(71).then((res) => {
  console.log(res.data.AdsByCategoryResponse.AdsByCategoryData.docs[0]);
})