import $ from 'jquery';

export function arrayIsEmpty(arr) {
  if (arr.length === 0) {
    return true;
  }else {
    return false;
  }
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