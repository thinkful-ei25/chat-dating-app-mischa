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
      success: () =>  this._wasPageCleanedUp = true
      });
  }
  }