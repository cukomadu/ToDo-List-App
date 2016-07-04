//Import all standard libraries referenced in this file
import React from 'react'


//Create All Tasks React Component
const UserInputView = React.createClass({
	_addUserInput: function(evt){
		if(evt.keyCode === 13){
			console.log('target.value has been captured', evt.target.value)
			evt.target.value = ''
		}

	},



	render: function(){
		console.log('this is List Item Input View Component')
		return (
				<p>
					<input onKeyDown={this._addUserInput} />
					<input type="checkbox" /> 
					Mark All as Done
					{''}
				</p>
			)
	}
	

	
})


//Export this file so its available to app.js
export default UserInputView