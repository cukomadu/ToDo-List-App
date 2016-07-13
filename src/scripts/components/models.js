import Backbone from 'backbone'


export const TodoListModel = Backbone.Model.extend({
	
})

export const TodoListCollection = Backbone.Collection.extend({
	model: TodoListModel
})