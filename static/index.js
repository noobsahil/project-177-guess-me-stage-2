/*let words = [
  {
    "inputs": 5,
    "category": "Fruit",
    "word": "apple"
  },
  {
    "inputs": 5,
    "category": "Weapon",
    "word": "sword"
  },
  {
    "inputs": 6,
    "category": "Colour",
    "word": "yellow"
  },
  {
    "inputs": 6,
    "category": "Animal",
    "word": "spider"
  },
  {
    "inputs": 10,
    "category": "Sport",
    "word": "basketball"
  },
  {
    "inputs": 8,
    "category": "Animal",
    "word": "dinosaur"
  },
  {
    "inputs": 4,
    "category": "Plant",
    "word": "tree"
  },
];*/

var gameState = false;

$(document).ready(function(){
    $.ajax({
        "url": "/get-words",
        "type": "get",
        "success": function(result){
            fillBlanks(result.word);
        },
        "error": function(result){
            alert(result.responseJSON.message);
        }
    });	
});

function fillBlanks(word){
  var correctGuess = false;
  var correctLetters = 0;

  //var ranNum = Math.floor(Math.random()*words.length);
  //var ranWord = words[ranNum].word;
  //var ranIn = words[ranNum].inputs;
  var ranWord = word["word"];
  var ranIn = word["inputs"];

  for (let i = 0; i < ranIn; i++){
    let blanks = `<span id="blank-${i}" class="fill_blanks">_</span>`;
    $("#blanks").append(blanks);
  };

  //$("#hint").html(words[ranNum].category);
  $("#hint").html(word["category"]);

  $(document).on('click', '.clickable', function(){ 
    var life = $("#life").html();

    if (!gameState) {
      correctGuess = false
      let id = $(this).attr("id");
    
      for (let i = 0; i < ranIn; i++){
        if (ranWord[i] == id){
          $(`#blank-${i}`).html(id);
          correctGuess = true;
          correctLetters++;
        };
      };
  
      if (!correctGuess){
        $("#life").html(life-1);
        $("#hangman").attr("src", `/static/assets/hangmanl_${life-1}lives.png`);
         
        if (life == 1){
          gameOver(false, ranWord, ranIn);
        }
      }

      if (correctLetters == ranIn){
        gameOver(true);
      }

      $(`#${id}`).remove();
    }
  });
};

function gameOver(win, ranWord, ranIn){
  if (win){
    gameState = true;
    $("#result").html("You Win!");
  } else {
    gameState = true;
    $("#result").html("Game Over!");

    for (let i = 0; i < ranIn; i++){
      if ($(`#blank-${i}`).text() == "_"){
        $(`#blank-${i}`).html(ranWord[i]);
      };
    };
  }
}