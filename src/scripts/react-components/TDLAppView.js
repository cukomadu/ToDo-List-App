//Import all standard libraries referenced in this file
import React from 'react'


//Import all custom files referenced in this file
/*import ListItemInputView from 'allTasksView.js'
import DoneTasksView from 'doneTasksView.js'
import UndoneTasksView from 'undoneTasksView.js'*/


//Create Main React Component

const TDLAppView = React.createClass({
	render: function(){
		return (
				<div>
					<div className="homeView" id="header">
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
					{/*<ListItemInputView />
					<DoneTasksView />
					<UndoneTasksView />*/}
				</div>
			)
	}
	


})


//Export this file so its available to app.js
export default TDLAppView


