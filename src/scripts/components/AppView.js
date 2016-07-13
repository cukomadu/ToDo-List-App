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
            currentView: 'alltasksview',
            status: 'undone'
            
        }
    },

    componentWillMount: function(){

        // Backbone.Events.on('update', () => {
        //     this.setState({
        //         todoColl: this.state.todoColl
        //     })
        // })

        // or trigger your own event
        Backbone.Events.on('updateTodoList', (userEntry)=>{
            var todoModel = new TodoListModel({
                taskName: userEntry,
                status: 'undone'
            })

            this.state.todoColl.add(todoModel)  

            // or new collection ...
            // var todoCollCopy = new TodoListCollection(this.state.todoColl.models)
            // todoCollCopy.add(todoModel)

            this.setState({
                todoColl: this.state.todoColl
            })
        })

        Backbone.Events.on('updateCompletionStatus', (cid , completionStatus) => {
            console.log(this.state.todoColl)
            console.log(cid)
            console.log(completionStatus)

            var todoCollCopy = new TodoListCollection(this.state.todoColl.models)
            console.log("theCollection", todoCollCopy)

            todoCollCopy._byId[cid].set({
                status: completionStatus
            })

            console.log('model set on collection', todoCollCopy._byId[cid])

            this.setState({
                todoColl: todoCollCopy
            })
            console.log('target model', todoCollCopy._byId[cid])
        })


       Backbone.Events.on('updateAppView', (clickedView) => {
             this.setState({
                currentView: clickedView
            })
       })

       Backbone.Events.on('removeTodo', (model)=>{
            var todoCollCopy = new TodoListCollection(this.state.todoColl.models)
            todoCollCopy.remove(model.cid)
            this.setState({
                todoColl: todoCollCopy
            })
       })

       Backbone.Events.on('changealltoComplete', () => {
            var todoCollCopy = new TodoListCollection(this.state.todoColl.models)
           // console.log("theCollection", todoCollCopy)

            todoCollCopy.map((model) => {
                model.set({
                    status: 'done'
                })

            })
            

            this.setState({
                todoColl: todoCollCopy
            })

       })
       
        // Backbone.Events.on('updateAppView', (clickedView) => {
        //     console.log('clickedView successfully passed up', clickedView)
        //     this.setState({
        //         currentView: clickedView
        //     })
        // }) 
    },

    render: function(){
        console.log('rendering', this.state.currentView)
        return (
                <div className="AppView">
                    <Header />
                    <NavView />
                    <InputBox todoColl={this.state.todoColl}/>
                    <TaskContainer todoColl={this.state.todoColl} currView={this.state.currentView}/> 
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

    _changeView: function(e){
        e.preventDefault()
       var clickedView = e.target.dataset['view']
       console.log('this is clickedView: ', clickedView)

     Backbone.Events.trigger('updateAppView', clickedView)
    },
    

    render: function(){
        return (
                <div className="NavViewComponent" onClick={this._changeView}>
                    <a href="#" data-view="alltasksview">All Tasks</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#" data-view="donetasksview">Done Tasks</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#" data-view="undonetasksview">Undone Tasks</a>
                </div>
            )
    }
})


const InputBox = React.createClass({

    _getUserInput: function(e){
        if(e.keyCode === 13){
            var userEntry = e.target.value
            console.log(userEntry)

            Backbone.Events.trigger('updateTodoList', userEntry)
            
            e.target.value = ''
        }
    },

    _markAllComplete: function() {
        Backbone.Events.trigger('changealltoComplete')

    },

    render: function(){
        return (
                <div className="InputBox">
                    <input className="u-full-width" 
                    type="text"  
                    placeholder="Enter A New Task and Press Enter" onKeyDown={this._getUserInput}/>
                    <input type="checkbox" onChange={this._markAllComplete}/><p>Mark All As Done</p>
                </div>
            )
    }
})


const TaskContainer = React.createClass({
    _countUndoneTasks: function(todosColl){
        
        var filteredArray = todosColl.filter((model) => {return model.get('status') === 'undone'})
        return filteredArray.length
    },

    _createJSXForViewType: function(currView){
        if(currView === 'alltasksview'){
            return (
                <div>
                    <h1>All Tasks View</h1>
                    {
                        this.props.todoColl.map((model) => {
                        return <Task key={model.cid} todomodel={model} />
                        })
                    }
                    <div>
                        <p>{ this._countUndoneTasks(this.props.todoColl) } Tasks Left!</p>
                    </div>
                </div>
            )

        }

        if(currView === 'donetasksview'){

             return (
                    <div>
                        <h1>Done Tasks View</h1>
                        {
                            this.props.todoColl
                                .filter((model) => {
                                    if(model.get('status') === 'done'){
                                        return true
                                    } else {
                                        return false
                                    }
                                })
                                .map((model) => {
                                    return <Task key={model.cid} todomodel={model} />
                                })
                        }
                        <div>
                            <p>{this.props.todoColl.length} Tasks Left!</p>
                        </div>
                    </div>
                )
        }

        if(currView === 'undonetasksview'){
             return (
                    <div>
                        <h1>Undone Tasks View</h1>
                        {
                            this.props.todoColl
                                .filter((model) => {
                                    if(model.get('status') === 'undone'){
                                        return true
                                    } else {
                                        return false
                                    }
                                })
                                .map((model) => {
                                    return <Task key={model.cid} todomodel={model} />
                                })
                        }
                        <div>
                            <p>{this.props.todoColl.length} Tasks Left!</p>
                        </div>
                    </div>
                )
        }
    },

    render: function(){
        console.log(this.props.todoColl.models)
        console.log('tasks container this.props.currView: ', this.props.currView)


        return (
                <ul>
                    { this._createJSXForViewType(this.props.currView)}
                </ul>
            )
    }
})



const Task = React.createClass({

    getInitialState: function(){
        return {
            textColor: '#f45800'
        }
    },

    _toggleTask: function(e){
        console.log(e.target)
        var completionStatus
        if(this.props.todomodel.get('status') === 'undone'){
            console.log('task complete')
            completionStatus = 'done'

        } else {
            completionStatus = 'undone'
            console.log('task incomplete')
        }

        Backbone.Events.trigger("updateCompletionStatus", this.props.todomodel.cid , completionStatus)
    },

    
    _removeTask:function(){
        console.log('removing model')
       var removeModel = this.props.todomodel

       Backbone.Events.trigger('removeTodo', removeModel)
    },
    
    
    render: function(){
        console.log(this.props.todomodel)

        var todoClass

        if(this.props.todomodel.get('status') === 'done'){
            todoClass = 'done'
        } else {
            todoClass = 'undone'
           //this.props.todomodel.set({
        }

        var styleObj = {
            color: this.state.textColor
        }

        var statusVal = this.props.todomodel.get('status')


        return (
                <li className="Task" style={styleObj}>
                    <div className="cool-check"> 
                        <input type="checkbox" onChange={this._toggleTask}/>
                        <div></div>
                    </div>
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