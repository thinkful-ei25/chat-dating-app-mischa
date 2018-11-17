import React, {Component} from 'react';

export default class Input extends Component {

  render() {
    return(
      <form>
        <input type="text" placeholder="chat!"/>
        <input type="submit" value="send"/>
      </form>
    )
  }
}