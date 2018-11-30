import $ from 'jquery';

export function arrayIsEmpty(arr) {
  if (arr.length === 0) {
    return true;
  }else {
    return false;
  }
}  
//from https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
export function mod(x, n) {
  return (x % n + n) % n  
}

//from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function logOutOnClose(pageCleanedUp){
  if (pageCleanedUp){
    $.ajax({
      type: 'POST',
      async: false,
      url: 'http://localhost:8080/auth/logout',
      success: () =>  pageCleanedUp = true
      });
  }
  }

  export function leaveRoom(pageCleanedUp){
    if (pageCleanedUp){
      $.ajax({
        type: 'PUT',
        async: false,
        url: 'http://localhost:8080/api/leave-room',
        success: () =>  pageCleanedUp = true
        });
    }
    }

export function addUsernameToMessage(messageData, users){
      const messages = messageData.messages.map((message) => {
            const userIdofMessage = message.user
              users.forEach((user) => {
                if (user.id === userIdofMessage) {
                  message.userName = user.username;
                }
            })
            return message;
      });
      return messages;
    }
    