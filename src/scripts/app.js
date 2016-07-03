//Standard Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//Custom .js Files
import ToDoListView from './react-components/toDoListView.js'


//Todo List Model
var ToDoListModel = Backbone.Model.extend({

})



//Todo List Collection
var ToDoListCollection = Backbone.Collection.extend({

})



//App Router Function
var ToDoListRouter = Backbone.Router.extend({


initialize: function(){
	Backbone.history.start()
}

})


new ToDoListRouter ()