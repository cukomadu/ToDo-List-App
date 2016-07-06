//Import all standard libraries referenced in this file
import React from 'react'
import Backbone from 'backbone'


//Create All Tasks React Component
const ListItemView = React.createClass({
    
	
  	_changeStatus: function(evt) { 
        console.log('this is evt target from ListItemView', evt.target)
        if(this.props.listItemModel.get('status') === 'undone'){
            this.props.listItemModel.set({ 
                status: 'done'
            })
        } 
        else if (this.props.listItemModel.get('status') === 'done'){
            this.props.listItemModel.set({ 
                status: 'undone'
            })
        }
        
        Backbone.Events.trigger('changeCheckStatus')
    }, 

    _removeToDoItem: function() {
        this.props.listItemModel.destroy() //instead of deleting task - change text decoration property to line-through
    },

    render: function() {
    	//console.log('this is List Item View')
    	console.log(this.props.listItemModel)
        var itemStatus = this.props.listItemModel.get('status')

        return (
            <div className="listItem">
            	<input type="checkbox" onClick={this._changeStatus} />
                <span className="name">{this.props.listItemModel.get('taskName')}</span>
                <span className="status">{itemStatus}</span>
               {/* <p>Select Due Date <input type="date" /> </p> */}
                <button id="button" onClick={this._removeToDoItem}>X</button>
            </div>
            ) 
    }
})



//Export this file so its available to app.js
export default ListItemView