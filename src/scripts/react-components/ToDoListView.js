//Import all standard libraries referenced in this file
import React from 'react'

import ListItemView from './ListItemView.js'

//Create All Tasks React Component
const ToDoListView = React.createClass({

	_convertListEntrytoModel: function(todolistColl){
		return todolistColl.map((listItemModel) => <ListItemView listItemModel={listItemModel} />)
	},

	render: function(){
		//console.log('hello from ToDoListView', this.props)
		//console.log('this is Done Tasks View')
		return (
					<div>
						<ul>
							{this._convertListEntrytoModel(this.props.todolistColl)}
						</ul>
					</div>
				)
	}	
})


//Export this file so its available to app.js
export default ToDoListView