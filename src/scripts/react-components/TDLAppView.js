//Import all standard libraries referenced in this file
import React from 'react'


//Import all custom files referenced in this file
import UserInputView from './UserInputView.js'
import ToDoListView  from './ToDoListView.js'
/*iimport UndoneTasksView from 'undoneTasksView.js'*/


//Create Top Level React Component

const TDLAppView = React.createClass({



	render: function(){
		console.log('this is TDLAppView')
		console.log('First Pass: this is backbone collection passed in backbone router', this.props)
		return (
				<div id="tdlViewContainer">
					<Header />
					<UserInputView />
					<ToDoListView />
				</div>
			)
	}
})

const Header = React.createClass({
	render: function(){
		console.log('this is the Header Component')
		return (
				<div className="header">
						<h1>Todosfy</h1>
						<div id="nav-buttons">
							<ul>
								<li>Home</li>
								<li>All</li>
								<li>Done</li>
								<li>Undone</li>
							</ul>
						</div>
				</div>
			)
		
	}
})


//Export this file so its available to app.js
export default TDLAppView


