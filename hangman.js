var hangman = {
  //displays amt of guesses/lives//
    guesses : 4, 
    // Available words for guessing
    // arc reactor was correctly guessed, but didn't register the space between and counted as a loss. Replacing with single-word answer: assemble. Also adding other words so the list comes to ten.
    dictionary : ["vision", "wasp", "nidavellir", "assemble", "vibranium", "bast", "radiation", "agamotto", "maximoff", "quinjet"], 
  
    
    word : null,
    
    wordlen : 0,
   
    rights : 0,
    
    wrongs : 0,
    
    elImg : null,
    
    elWord : null,
    
    elChar : null,
    
    elLives : null,

    
    init : function () {

      hangman.elImg = document.getElementById("hangman-img");
      hangman.elWord = document.getElementById("hangman-words");
      hangman.elChar = document.getElementById("hangman-char");
      hangman.elLives = document.getElementById("hangman-lives");
  
      // Generate available characters//
      var charwrap = document.getElementById("hangman-char");
      for (var i=65; i<91; i++) {
        var charnow = document.createElement("input");
        charnow.type = "button";
        charnow.value = String.fromCharCode(i);
        charnow.disabled = true;
        charnow.addEventListener("click", hangman.check);
        charwrap.appendChild(charnow);
      }
    var wins = 0;
    var losses = 0;
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
  
      // Start game
      hangman.reset();
      document.getElementById("hangman-reset").addEventListener("click", hangman.reset);
      document.getElementById("hangman-reset").disabled = false;
    },
  
    toggle : function (disable) {
    // toggle() : toggle enable/disable character select//
    // PARAM disable : enable or disable buttons//
  
      var all = document.querySelectorAll("#hangman-char input");
      for (var i of all) {
        i.disabled = disable;
      }
    },
  
    reset : function () {
    // reset() : reset the game//
  
      // Reset button//
      hangman.rights = 0;
      hangman.wrongs = 0;
      hangman.elLives.innerHTML = hangman.guesses;
      hangman.elImg.style.opacity = 0;
  
      // Random word choice section (still repeats "random" choice to much, even after increased vocab//)
      hangman.word = hangman.dictionary[Math.floor(Math.random() * Math.floor(hangman.dictionary.length))];
      hangman.word = hangman.word.toUpperCase();
      hangman.wordlen = hangman.word.length;
  
      // blanks here //
      hangman.elWord.innerHTML = "";
      for (var i=0; i<hangman.word.length; i++) {
        var charnow = document.createElement("span");
        charnow.innerHTML = "_";
        charnow.id = "hangword-" + i;
        hangman.elWord.appendChild(charnow);
      }
  
      // Enable controls
      hangman.toggle(false);
    },
  
    check : function () {
    // check() : check if selected character is in the word//
  
      // scans for hits //
      var index = 0, hits = [];
      while (index >= 0) {
        index = hangman.word.indexOf(this.value, index);
        if (index == -1) { break; }
        else { 
          hits.push(index);
          index++;
        }
      }
  
      // displays choices etc //
      if (hits.length > 0) {
        // displays word //
        for (var hit of hits) {
          document.getElementById("hangword-" + hit).innerHTML = this.value;
        }
  
        // correctly guessed, funny message appears//
        hangman.rights += hits.length;
        if (hangman.rights == hangman.wordlen) {
          hangman.toggle(true);
          alert("You've Guessed Correctly! You're invited to Tony Stark's Wedding!");
        }
      } else {
        // incorrectly guessed, not so funny message//
        hangman.wrongs++;
      var livesleft = hangman.guesses - hangman.wrongs;
      hangman.elLives.innerHTML = livesleft;
      hangman.elImg.style.opacity = (1 - (livesleft/hangman.guesses)).toFixed(2);

      if (hangman.wrongs == hangman.guesses) {
        hangman.toggle(true);
        alert("Wrong answer, get lost Squidward!");
        }
      }
  
      this.disabled = true;
    }
  };
  
  window.addEventListener("load", hangman.init);