const entries = [
  {
    username: String,
    name: String,
    password: String,
    city: String,
    country: String,
    email: String,
    description: String,
    schedule: Object,
    prices: Object,
    isWifi: Boolean,
    isParking: Boolean,
    isSpa: Boolean,
    isPool: Boolean,
    isTRX: Boolean,
    isPersonalTraining: Boolean,
    isCrossfit: Boolean,
    isSpinning: Boolean,
    isBasketballCourt: Boolean,
    isSoccerCourt: Boolean,
    isTenisCourt: Boolean,
    isPaddleCourt: Boolean,
    otherClasses: String,
    imgUrl     : { type: Array, default: ["https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"] }
  },
  {
    date: new Date(),
    title: 'Hola q ase',
    content : 'uydilnlkg jmsdflnwdfnlfwdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'Bonjour',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'Haupei Chera',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'Yooo',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'HEy',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'Suaza',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'Javamaster',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  },
  {
    date: new Date(),
    title: 'ZERTY',
    content : 'uydilnlkg jmswdiowdrmrdkjgwdm'
  }
];


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kunto-local');
const Gym = require('../auth/gyms/gym.model.js');

// bin/seeds.js
Gym.create(entries, (err, docs) => {
  if (err) { throw err };

 docs.forEach( (entries) => {
    console.log(entries.title)
  })
  mongoose.connection.close();
});
