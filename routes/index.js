const express = require('express');
const q = require('../questions');
const f = require('../friends');

const router = express.Router();

const questions = q.questions();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET quiz page. */
router.get('/quiz', function(req, res, next) {
  res.render('quiz', { questions });
});

const friends = f.friends();
/* GET quiz page. */
router.get('/friends', function(req, res, next) {
  res.render('allFriends', { friends });
});
//  Post to friends page
router.post('/friends', (req, res, next) => {
  const answers = Object.keys(req.body).map(i => +req.body[i]);
  const diffs = [];
  friends.forEach(friend => {
    let totalDiff = 0;
    answers.forEach((answer, i) => {
      const diff = Math.abs(answer - friend.answers[i]);
      totalDiff += diff;
    });
    diffs.push(totalDiff);
  });
  const leastDiff = Math.min(...diffs);
  const bestMatch = friends[diffs.indexOf(leastDiff)];
  console.log(bestMatch);
  res.render('friends', { bestMatch });
});

module.exports = router;
