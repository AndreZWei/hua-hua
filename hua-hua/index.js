const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public/'));

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));


//chat part
var name = [];
var wordBank =  ["cat", "sun", "cup", "ghost", "flower", "pie", "cow", "banana", "snowflake", "bug", "book", "jar", "snake", "light", "tree", "lips", "apple", "slide", "socks", "smile", "swing", "coat", "shoe", "water", "heart", "hat", "ocean", "kite", "dog", "mouth", "milk", "duck", "eyes", "skateboard", "bird", "boy", "apple", "person", "girl", "mouse", "ball", "house", "star", "nose", "bed", "whale", "jacket", "shirt", "hippo", "beach", "egg", "face", "cookie", "cheese", "ice cream cone", "drum", "circle", "spoon", "worm", "spider web", "bridge", "bone", "grapes", "bell", "jellyfish", "bunny", "truck", "grass", "door", "monkey", "spider", "bread", "ears", "bowl", "bracelet", "alligator", "bat", "clock", "lollipop", "moon", "doll", "orange", "ear", "basketball", "bike", "airplane", "pen", "moth", "seashell", "rocket", "cloud", "bear", "corn", "chicken", "purse", "glasses", "blocks", "carrot", "turtle", "pencil", "horse", "dinosaur", "head", "lamp", "snowman", "ant", "giraffe", "cupcake", "chair", "leaf", "bunk bed", "snail", "baby", "balloon", "bus", "cherry", "crab", "football", "branch", "robot", "horse", "door", "song", "trip", "backbone", "bomb", "round", "treasure", "garbage", "park", "pirate", "ski", "state", "whistle", "palace", "baseball", "coal", "queen", "dominoes", "photograph", "computer", "hockey", "aircraft", "hot dog", "salt and pepper", "key", "iPad", "whisk", "frog", "mattress", "pinwheel", "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "electricity", "lightsaber", "thief", "teapot", "deep", "spring", "nature", "shallow", "toast", "outside", "America", "roller blading", "gingerbread man", "bowtie", "half", "spare", "wax", "light bulb", "platypus", "music", "sailboat", "popsicle", "brain", "birthday cake", "skirt", "knee", "pineapple", "tusk", "sprinkler", "money", "spool", "lighthouse", "doormat", "face", "flute", "rug", "snowball", "purse", "owl", "gate", "suitcase", "stomach", "doghouse", "pajamas", "bathroom scale", "peach", "newspaper", "watering can", "hook", "school", "beaver", "french fries", "beehive", "beach", "artist", "flagpole", "camera", "hair dryer", "mushroom", "toe", "pretzel", "TV", "quilt", "chalk", "dollar", "soda", "chin", "swing", "garden", "ticket", "boot", "cello", "rain", "clam", "pelican", "stingray", "fur", "blowfish", "rainbow", "happy", "fist", "base", "storm", "mitten", "easel", "nail", "sheep", "stoplight", "coconut", "crib", "hippopotamus", "ring", "seesaw", "plate", "fishing pole", "hopscotch", "bell pepper", "front porch", "cheek", "video camera", "washing machine", "telephone", "silverware", "barn", "snowflake", "bib", "flashlight", "popsicle", "muffin", "sunflower", "skirt", "top hat", "swimming pool", "tusk", "radish", "peanut", "spool", "poodle", "potato", "face", "shark", "fang", "snowball", "waist", "spoon", "gate", "bottle", "mail", "sheep", "lobster", "ice", "crib", "lawn mower", "bubble", "seesaw", "pencil", "cheeseburger", "hopscotch", "rocking chair", "corner", "cheek", "rolly polly", "popcorn", "telephone", "yo-yo", "seahorse", "snowflake", "spine", "desk"];
var answer = wordGen();
var whoseTurn = 0;
var room = [];
var joined = false;
let ids = [];
let painter = [];
room.push({
  name: 'lobby',
  people: ids
})
room.push({
  name: 'LBR',
  people: painter
})
var painterAnnounced = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//get name of the painter
function whoo(whoseTurn){
  return name[whoseTurn].n.split(":")[0];
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    if (msg.startsWith('/nick ')){  //add a name
      let newName = msg.substring(6,msg.length);
      name.push( {s: socket.id, n: newName + ': '} );
      room[0].people.push(socket.id);
      socket.join('lobby');
      io.emit("chat message", newName + " has joined the game!");

      if (!painterAnnounced){
        io.emit("chat message", whoo(whoseTurn)+" is now the painter.");
        io.emit("chat message", "The game will start when "+whoo(whoseTurn)+" type 'ready'.");
        painterAnnounced = true;
      }
    }
    else{  //check if the person has a name. If not, ask him to give one
      var who = '';
      for (let i = 0; i<name.length; i++){
        if (name[i].s === socket.id){
          who = name[i].n;
        }
      }
      if (who === '')
        io.emit('chat message',"Please type in your nick name in this format: /nick yourname");
      else{
        io.emit('chat message', who + msg);
        if (checkAnswer(msg)) {
          io.emit("chat message", who.split(":")[0] + " got the right answer! Congratulations!");
          io.emit("chat message", whoo(whoseTurn)+" is now the painter.");
          io.emit("chat message", "please clear your board by clicking on the refresh button and the game will start when "+whoo(whoseTurn)+" type 'ready'.")
          painterAnnounced = true;
        }
        //new game starts!
        if (socket.id === name[whoseTurn].s && !joined && msg==='ready'){

          let n = room[0].people.indexOf(socket.id);
          room[0].people.splice(n, 1);
          socket.leave('lobby');

          room[1].people.push(socket.id);
          socket.join('LBR');

          io.in('LBR').emit("chat message", "You are the painter this turn!");
          io.in('LBR').emit("chat message", "Here is your word: " + answer);
          //io.in('lobby').emit("chat message", "You are not the painter this turn!");

          n = room[1].people.indexOf(socket.id);
          room[1].people.splice(n, 1);
          socket.leave('LBR');

          room[0].people.push(socket.id);
          socket.room = 'lobby';
          socket.join(socket.room);
        }
      }
    }
  });

  //delete a person's name when disconnected
  socket.on('disconnect', function(){
    for (let i = 0; i<name.length; i++){
      if (name[i].s == socket.id){
        name.splice(i,1);
      }
    }
  });
});

//help
/*function help(){
  document.getElementsByClassName("answer").innerText = "Your Turn! The word is: "+answer;
}*/

//fuction for check if a user guesses the right answer
//if yes, generate a new word.
function checkAnswer(msg){
  let correct = (msg === answer);
  if (correct){
    answer = takeTurn();
    joined = false;
    painterAnnounced = false;
    //socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  }
  return correct;
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
  return wordGen();
}
