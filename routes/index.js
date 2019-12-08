const express = require('express');
const q = require('../questions');
const f = require('../friends');

const router = express.Router();

const questions = q.questions();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET quiz page. */
router.get('/quiz', function(req, res, next) {
  res.render('quiz', { questions });
});

const friends = f.friends();
/* GET friends page. */
router.get('/friends', function(req, res, next) {
  res.render('allFriends', { friends });
});

//  Post to friends page / send back match
router.post('/friends', (req, res, next) => {
  // convert form data from object to array
  const answers = Object.keys(req.body).map(i => +req.body[i]);
  // declare empty array to put calculated differences in
  const diffs = [];
  // loop over each potential friend
  friends.forEach(friend => {
    // this will be the overall difference for this friend
    let totalDiff = 0;
    // loop over all user answers
    answers.forEach((answer, i) => {
      // calculate difference against potential friend's answer
      const diff = Math.abs(answer - friend.answers[i]);
      // add difference to total
      totalDiff += diff;
    });
    // push total to array of differences
    diffs.push(totalDiff);
  });
  // find the lowest score in the array (best match)
  const leastDiff = Math.min(...diffs);
  // find the friend that had that score
  const bestMatch = friends[diffs.indexOf(leastDiff)];

  res.render('friends', { bestMatch });
});

module.exports = router;
