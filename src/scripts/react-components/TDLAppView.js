//Import all standard libraries referenced in this file
import React from 'react'
import Backbone from 'backbone'

//Import all custom files referenced in this file
import UserInputView from './UserInputView.js'
import ToDoListView  from './ToDoListView.js'



//Create Top Level React Component

const TDLAppView = React.createClass({
	//Get Initial state of collection and default states we want to change later
	getInitialState: function(){
		return {
			todolistColl: this.props.todolistColl,
			taskStatus: 'all',
			styleObj: {
				textDecoration: 'none'
			}	
		}
	},

	// Set event listeners on the backbone collection to listen to all events pertaining to this top level component and sub components
	componentWillMount: function(){
		
		var collectionUpdater = () => {
			this.setState({
				todolistColl: this.state.todolistColl,
				styleObj: {
					textDecoration: 'line-through'
				}
			})
		}
		
		this.props.todolistColl.on('update', collectionUpdater)
		
		Backbone.Events.on('changeCheckStatus', collectionUpdater)

		Backbone.Events.on('updateViewType', (viewType) => {
			this.setState({
				taskStatus: viewType
			})
		})

	},

	_addUserInput: function(newToDoEntry){
		this.props.todolistColl.add({
			taskName: newToDoEntry
		})

	},

	render: function(){
		var collectionToPassDown = this.state.todolistColl 
        if (this.state.taskStatus !== 'all') {
            collectionToPassDown = this.state.todolistColl.where({status:this.state.taskStatus})
        }
		//console.log('this is TDLAppView')
		//console.log('First Pass: this is backbone collection passed in backbone router', this.props)
		return (
				<div id="tdlViewContainer">
					<Header />
					<Tabs />
					<UserInputView _addNewTodolistItem={this._addUserInput}/>
					<ToDoListView todolistColl={collectionToPassDown} />
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

const Tabs = React.createClass({

	_updateToDoListView: function(evt){
		console.log(evt)
        if (evt.target.tagName === 'A') {
            var viewType = evt.target.textContent
            // clicking on a tab should cause the GuestsView element to update its state
            Backbone.Events.trigger('updateViewType',viewType)
        }
	},

	render: function(){
		return(
				<div onClick={this._updateToDoListView}>
	                <a href="#ListItemView/all">All</a>
	                <a href="#ListItemView/done">Done</a>
	                <a href="#ListItemView/undone">Undone</a>
            	</div>
			)
	}
})

//Export this file so its available to app.js
export default TDLAppView


