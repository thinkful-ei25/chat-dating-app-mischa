import React from 'react';
// import {Field, reduxForm, focus} from 'redux-form';
import {getActiveRooms} from '../../actions/dashboard';
import {joinRoom} from '../../actions/chat-room';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export class ActiveRooms extends React.Component {
    componentDidMount(){
        this.props.dispatch(getActiveRooms());
        this.interval = setInterval(() => {
            this.props.dispatch(getActiveRooms());
        }, 10 * 60)    
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    onClickHandler(room){
        return (
            this.props.dispatch(joinRoom(this.props.history, room))
        )
    }
    

    render() {
        const activeRooms = this.props.activeRooms.map((room, idx) => {
            return (
            <li key={idx}>
                 <button onClick={()=>this.onClickHandler(room.url)}>{room.url}</button>
            </li>
            )
          })
        return (
          <ul>
            {activeRooms}
          </ul>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        activeRooms: state.dashboard ? state.dashboard.activeRooms.filter(room => room.users.length < 2) : null
    };
}
export default withRouter(connect(mapStatetoProps)(ActiveRooms));
