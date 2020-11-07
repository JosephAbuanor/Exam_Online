    
      const saveScoreBtn = document.getElementById('gohome');
      const finalScore = document.getElementById('finalScore');
      const mostRecentScore = localStorage.getItem('mostRecentScore');
      const scoreval = document.getElementById('scoreval');



      const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

      const MAX_HIGH_SCORES = 5;

      finalScore.innerText = mostRecentScore;
      scoreval.value = mostRecentScore;


      

