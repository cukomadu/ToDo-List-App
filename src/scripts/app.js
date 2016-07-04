//Standard Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//Custom .js Files
import TDLAppView from './react-components/TDLAppView.js'


//Todo List Model
var ToDoListModel = Backbone.Model.extend({
	defaults: {
		status: 'undone'
	}
})


//Todo List Collection
var ToDoListCollection = Backbone.Collection.extend({
	model: ToDoListModel
}) 


//App Router Function
var ToDoListRouter = Backbone.Router.extend({
routes: {
	'*home': 'showAllTasks'
},

showAllTasks: function(){
	console.log('this is To do List Router')

	var toDoListCollection = new ToDoListCollection ()

	ReactDOM.render(<TDLAppView todolistColl={toDoListCollection}/>, document.querySelector('.container'))

},


initialize: function(){
	Backbone.history.start()
}

})

new ToDoListRouter()