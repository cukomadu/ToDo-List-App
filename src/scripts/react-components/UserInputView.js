//Import all standard libraries referenced in this file
import React from 'react'


//Create All Tasks React Component
const UserInputView = React.createClass({
	_captureUserInput: function(evt){
		if(evt.keyCode === 13){
			console.log('target.value has been captured', evt.target.value)
			// pass captured user input value as input for addUserInput function defined in the React Owner Component
			this.props._addNewTodolistItem(evt.target.value)
			evt.target.value = ''
		}

	},



	render: function(){
		//console.log('this is List Item Input View Component')
		//console.log(this.props)
		return (
				<p>
					<input onKeyDown={this._captureUserInput} />
					{/*<input type="checkbox" /> 
					Mark All as Done
					{''} */}
				</p>
			)
	}
	

	
})


//Export this file so its available to app.js
export default UserInputView