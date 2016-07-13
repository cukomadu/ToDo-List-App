import React from 'react'
import Header from './AppView'


const DoneTasks = React.createClass({
    render: function(){
        return (
                <div className="DoneTasks">
                	<Header />
                    <p>This is Done Tasks View</p>
                </div>
            )
    }
})

export default DoneTasks