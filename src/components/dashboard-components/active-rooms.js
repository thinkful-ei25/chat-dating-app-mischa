import React from 'react';
// import {Field, reduxForm, focus} from 'redux-form';
import {getActiveRooms} from '../../actions/dashboard';
import {joinRoom} from '../../actions/chat-room';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export class ActiveRooms extends React.Component {
    componentDidMount(){
        this.props.dispatch(getActiveRooms());
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
                 <button onClick={()=>this.onClickHandler(room)}>{room}</button>
              {/* <button onClick={() => this.onClickHandler(room)}>url: {room}</button> */}
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
        activeRooms: state.dashboard ? state.dashboard.activeRooms : null
    };
}
export default withRouter(connect(mapStatetoProps)(ActiveRooms));
// export default withRouter(connect(mapStatetoProps)(ChatArea));



  // <div>

           
            // <h2>Do you want to join a chat?</h2>
            // <form
            //     className="login-form"
            //     onSubmit={this.props.handleSubmit(values =>
            //         this.onSubmit(values)
            //     )}>
            //     <label htmlFor="openRooms">Open Rooms</label>
            //     <Field component={'select'} type="text" name="openRooms">
            //         <option>1234</option>
            //         <option>1234656</option>
            //     </Field>
            //     <button
            //         type="submit"
            //         disabled={this.props.pristine || this.props.submitting}>
            //         Register
            //     </button>
            // </form>
            // </div>


// export default reduxForm({
//     form: 'open-chat',
//     onSubmitFail: (errors, dispatch) =>
//         dispatch(focus('open-chat', Object.keys(errors)[0]))
// })(ActiveRooms);
