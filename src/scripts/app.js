import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'Backbone'

import AppViewController from './react-components/AppViewController.js'

var TodoModel = Backbone.Model.extend({

})

var TodoCollection = Backbone.Collection.extend({
	model: TodoModel
})

const AppRouter = Backbone.Router.extend({
	
	routes: {
		'all': 'showAllTasks',
		//'/done': 'showDoneTasks',
		//'/undone': 'showUndoneTasks',
		'*home': 'showAllTasks'
	},

	showAllTasks: function() {
		console.log('showing all tasks view')
		var todoCollection = new TodoCollection()

		ReactDOM.render(<AppViewController backboneColl={todoCollection}/>,document.querySelector('.container'))
		
	},


	initialize: function(){
		console.log('app router is working')
		Backbone.history.start()
	}
})

var router = new AppRouter()