import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'Backbone'

import NavViewComponent from './NavViewComponent.js'


const AppViewController = React.createClass({
	render: function (){
		console.log('this is AppViewController')
		return(
				<div className="AppViewController">
					<h1>OrgaNized</h1>
					<NavViewComponent />
					{/*<UserInput />
					<ListsContainer /> */}
				</div>

			)
	}
})













export default AppViewController 