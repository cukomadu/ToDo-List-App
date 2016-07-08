import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'Backbone'


const NavViewComponent = React.createClass({

	_changeAppView: function(evt){
		console.log(evt.target.dataset)
		var selectedAppView = evt.target.dataset['view']
		if(selectedAppView === 'alltasksview'){
			location.hash = "all"
		}
		else if(selectedAppView === 'donetasksview'){
			location.hash = "done"
		} 
		else if(selectedAppView === 'undonetasksview'){
			location.hash = "undone"
		}

	},

	render: function(){
		return(
				<div className="NavViewComponent">
					<button data-view="alltasksview" onClick={this._changeAppView}>All</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button data-view="donetasksview" onClick={this._changeAppView}>Done</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button data-view="undonetasksview" onClick={this._changeAppView}>Undone</button>
				</div>
			)
	}
})


export default NavViewComponent