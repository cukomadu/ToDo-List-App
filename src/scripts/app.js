import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//import AppViewController from './components/AppViewController.js'
import AppView from './components/AppView.js'
import {TodoListCollection, TodoListModel} from './components/models.js'
import DoneTasks from './components/DoneTasks.js'


const app = function(){

	const AppRouter = Backbone.Router.extend({
		
		routes: {
			'all': 'showAllTasks',
			'done': 'showDoneTasks',
			'undone': 'showUndoneTasks',
			'*catchall': '_redirect'
		},

		showAllTasks: function() {
			console.log('showing all tasks view')
			var todolistCollection = new TodoListCollection()

			ReactDOM.render(<AppView backboneColl={todolistCollection}/>,document.querySelector('.container'))
			
		},

		showDoneTasks: function(){
			console.log('showing done tasks view')
			var todolistCollection = new TodoListCollection()
			ReactDOM.render(<DoneTasks backboneColl={todolistCollection}/>,document.querySelector('.container'))
			
		},

		_redirect: function(){
			location.hash = "all"
		},

		initialize: function(){
			console.log('app router is working')
			Backbone.history.start()
		}
	})

	var router = new AppRouter()
}

app()