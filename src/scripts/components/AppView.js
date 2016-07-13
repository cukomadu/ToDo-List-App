//Import Standard Libraries
import React from 'react'
import Backbone from 'backbone'

//Import Backbone Collection and Backbone Model
import {TodoListCollection, TodoListModel} from './models.js'

//Passed Props from Backbone >>> backboneColl={todolistCollection}

const AppView = React.createClass({

    getInitialState: function(){
        return {
            todoColl: this.props.backboneColl,
            currentView: 'all',
            status: 'undone'
            
        }
    },

    componentWillMount: function(){

        this.state.todoColl.on('update', () => {
            this.setState({
                todoColl: this.state.todoColl
            })
        })
      
        //Backbone.Events.on('changeAppView', updateView)

        // Backbone.Events.on('updateAppView', (clickedView) => {
        //     console.log('clickedView successfully passed up', clickedView)
        //     this.setState({
        //         currentView: clickedView
        //     })
        // }) 
    },

    render: function(){
        console.log('rendering')
        return (
                <div className="AppView">
                    <Header />
                    <NavView />
                    <InputBox todoColl={this.state.todoColl}/>
                    <TaskContainer todoColl={this.state.todoColl}/> 
                </div>
            )
    }
})

const Header = React.createClass({
    render: function(){
        return (
                <div className="Header">
                    <h1><span id="hLeft">Orga</span><span id="hRight">Nized</span></h1>
                </div>
            )
    }
})


const NavView = React.createClass({

    // _changeView: function(e){
    //    var clickedView = e.target.dataset['view']

    //     Backbone.Events.trigger('updateAppView', clickedView)
    // },
    //*onClick={this._changeView */

    render: function(){
        return (
                <div className="NavViewComponent">
                    <a href="#all" data-view="alltasksview">All Tasks</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#done" data-view="donetasksview">Done Tasks</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#undone" data-view="undonetasksview">Undone Tasks</a>
                </div>
            )
    }
})


const InputBox = React.createClass({

    _getUserInput: function(e){
        if(e.keyCode === 13){
            var userEntry = e.target.value
            console.log(userEntry)
            
            var todoModel = new TodoListModel({
                taskName: userEntry
            })
            this.props.todoColl.add(todoModel)
            
            e.target.value = ''
        }
    },

    render: function(){
        return (
                <div className="InputBox">
                    <input className="u-full-width" 
                    type="text"  
                    placeholder="Enter A New Task and Press Enter" onKeyDown={this._getUserInput}/>
                </div>
            )
    }
})


const TaskContainer = React.createClass({
    render: function(){
        console.log(this.props.todoColl.models)
        return (
                <ul>
                    {this.props.todoColl.map((model) => {
                        return <Task key={model.cid} todomodel={model} />
                        })
                    }
                </ul>
            )
    }
})


const Task = React.createClass({

    getInitialState: function(){
        return {
            complete: false,
            textColor: '#f45800'
        }
    },

    _toggleTask: function(e){
        console.log(e.target)
        if(this.state.complete === false){
            this.setState({
                complete: true
            })
            console.log('task complete')

        } else {
            this.setState({
                complete: false
            })
            console.log('task incomplete')
        }
    },

    
    _removeTask:function(){
       this.props.todomodel.destroy()
    },
    
    
    render: function(){
        console.log(this.props.todomodel)
        var todoClass

        if(this.state.complete === true){
            todoClass = 'done'
            this.props.todomodel.set({
                status: 'done'
            })

        } else {
            todoClass = 'undone'
           this.props.todomodel.set({
                status: 'undone'
            })
        }

        var styleObj = {
            color: this.state.textColor
        }

        var statusVal = this.props.todomodel.get('status')

        return (
                <li className="Task" style={styleObj}>
                    <input type="checkbox" onChange={this._toggleTask}/>
                    &nbsp;
                    <strong className={todoClass}>{this.props.todomodel.get('taskName')}</strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label className={todoClass}>{statusVal}</label>
                    <button onClick={this._removeTask}>x</button>
                </li>
            )
    }
})






//export React Top Level Component - AppView; Use "export default" to export a single file
export default AppView