import axios from 'axios';

var config = {
  method: 'get',
  url: 'https://v3.football.api-sports.io/leagues',
  headers: {
    'x-rapidapi-key': 'b2f109165027ceabf02f519941ec1c81',
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});