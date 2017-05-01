"use strict";

(function (){
  var name =[];
  var wordBank =  ["cat", "sun", "cup", "ghost", "flower", "pie", "cow", "banana", "snowflake", "bug", "book", "jar", "snake", "light", "tree", "lips", "apple", "slide", "socks", "smile", "swing", "coat", "shoe", "water", "heart", "hat", "ocean", "kite", "dog", "mouth", "milk", "duck", "eyes", "skateboard", "bird", "boy", "apple", "person", "girl", "mouse", "ball", "house", "star", "nose", "bed", "whale", "jacket", "shirt", "hippo", "beach", "egg", "face", "cookie", "cheese", "ice cream cone", "drum", "circle", "spoon", "worm", "spider web", "bridge", "bone", "grapes", "bell", "jellyfish", "bunny", "truck", "grass", "door", "monkey", "spider", "bread", "ears", "bowl", "bracelet", "alligator", "bat", "clock", "lollipop", "moon", "doll", "orange", "ear", "basketball", "bike", "airplane", "pen", "moth", "seashell", "rocket", "cloud", "bear", "corn", "chicken", "purse", "glasses", "blocks", "carrot", "turtle", "pencil", "horse", "dinosaur", "head", "lamp", "snowman", "ant", "giraffe", "cupcake", "chair", "leaf", "bunk bed", "snail", "baby", "balloon", "bus", "cherry", "crab", "football", "branch", "robot", "horse", "door", "song", "trip", "backbone", "bomb", "round", "treasure", "garbage", "park", "pirate", "ski", "state", "whistle", "palace", "baseball", "coal", "queen", "dominoes", "photograph", "computer", "hockey", "aircraft", "hot dog", "salt and pepper", "key", "iPad", "whisk", "frog", "mattress", "pinwheel", "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "electricity", "lightsaber", "thief", "teapot", "deep", "spring", "nature", "shallow", "toast", "outside", "America", "roller blading", "gingerbread man", "bowtie", "half", "spare", "wax", "light bulb", "platypus", "music", "sailboat", "popsicle", "brain", "birthday cake", "skirt", "knee", "pineapple", "tusk", "sprinkler", "money", "spool", "lighthouse", "doormat", "face", "flute", "rug", "snowball", "purse", "owl", "gate", "suitcase", "stomach", "doghouse", "pajamas", "bathroom scale", "peach", "newspaper", "watering can", "hook", "school", "beaver", "french fries", "beehive", "beach", "artist", "flagpole", "camera", "hair dryer", "mushroom", "toe", "pretzel", "TV", "quilt", "chalk", "dollar", "soda", "chin", "swing", "garden", "ticket", "boot", "cello", "rain", "clam", "pelican", "stingray", "fur", "blowfish", "rainbow", "happy", "fist", "base", "storm", "mitten", "easel", "nail", "sheep", "stoplight", "coconut", "crib", "hippopotamus", "ring", "seesaw", "plate", "fishing pole", "hopscotch", "bell pepper", "front porch", "cheek", "video camera", "washing machine", "telephone", "silverware", "barn", "snowflake", "bib", "flashlight", "popsicle", "muffin", "sunflower", "skirt", "top hat", "swimming pool", "tusk", "radish", "peanut", "spool", "poodle", "potato", "face", "shark", "fang", "snowball", "waist", "spoon", "gate", "bottle", "mail", "sheep", "lobster", "ice", "crib", "lawn mower", "bubble", "seesaw", "pencil", "cheeseburger", "hopscotch", "rocking chair", "corner", "cheek", "rolly polly", "popcorn", "telephone", "yo-yo", "seahorse", "snowflake", "spine", "desk"];
  var answer = wordGen();
  var whoseTurn = 0;
  
  var socket = io();
  document.getElementsByClassName('form').submit(function(){
    socket.emit('chat message', document.getElementById('m').val());
    document.getElementById('m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    document.getElementById('messages').append(createElement('li').textContent(msg));
    window.scrollTo(0, document.body.scrollHeight);
    if (msg.startsWith('/nick ')){  //add a name
        name.push( {s: socket.id, n: msg.substring(6,msg.length) + ': '} );
    }
    checkAnswer(msg);
    console.log(whoseTurn);
    if (socket.id === name[whoseTurn].s){
      document.getElementsByClassName("answer").innerText = "Your Turn! The word is: "+answer;
    }
  });

//fuction for check if a user guesses the right answer
//if yes, generate a new word.
function checkAnswer(msg){
  if (msg === answer){
    answer = takeTurn();
  }
}

//function for generating new word
function wordGen(){
  let len = wordBank.length;
  return wordBank[Math.floor(Math.random()*len)];
}

//take turn!
function takeTurn(){
  whoseTurn = whoseTurn+1;
  if (whoseTurn === name.length){
    whoseTurn = 0;
  }
}
})();
