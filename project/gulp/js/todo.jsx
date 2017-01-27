var React = window.React,
    ReactDOM = window.ReactDOM;

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            list: [],
            flag: 'all'
        }
    }

    componentDidMount() {
        var t = this;
        $.post('/todo/load', {}, function(data, status) {
            if (data.constructor === Array) {
                t.setState({
                    list: data
                })
            }
        });
    }

    update() {
        var t = this;
        $.post('/todo/update', {list: JSON.stringify(t.state.list)}, function(data, status) {
            console.log('data sent')
        });
    }

    handleInput(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleKeyDown(e) {
		if (event.which === 13) {
			this.add();
		}
	}

    toggleFlag(f) {
        this.setState({
            flag: f
        })
    }

    add() {
		var val = this.state.input.trim()
		if (val) {
            let newTodo = {
                entry: val,
                completed: false
            }

            this.state.list.push(newTodo);

			this.setState({
                input: '',
                list: this.state.list
            })
            this.update()
		}
	}

    check(i) {
        this.state.list[i].completed = !this.state.list[i].completed
        this.setState({
            list: this.state.list
        })
        this.update()
    }

    delete(i) {
        this.state.list.splice(i, 1)
        this.setState({
            list: this.state.list
        })
        this.update()
    }

    deleteCompleted() {
        let lst = this.state.list
        lst = lst.filter(x => !x.completed)
        this.setState({
            list: lst
        })
        this.update()
    }

    render() {
        let todo = [],
            lst = this.state.list

        for(let i in lst) {
            if (this.state.flag == 'all' || this.state.flag == 'active' && !lst[i].completed || this.state.flag == 'completed' && lst[i].completed) {
                todo.push(
                    <div key={i} className={`${lst[i].completed ? 'completed' : ''} todo-entry`}>
                        <label><input type="checkbox" checked={lst[i].completed} onChange={() => this.check(i)}/> <span>{lst[i].entry}</span></label>
                        <button type="button" className='btn btn-link btn-sm' onClick={() => this.delete(i)}>Delete</button>
                    </div>
                )
            }
        }

        return (
            <div className='todo'>
                <div className='todo-input'>
                    <input placeholder='This needs to be done.' type="text" value={this.state.input} onChange={(e) => this.handleInput(e)} onKeyDown={() => this.handleKeyDown()}/>
                    <button type="button" className="btn btn-info btn-sm" onClick={() => this.add()}>Add</button>
                </div>

                <div className='todo-list'>
                    {todo}
                </div>

                <div className='toggles'>
                    <button type="button" className={`btn ${this.state.flag == 'all' ? 'btn-info' : 'btn-default'} btn-xs`} onClick={() => this.toggleFlag('all')}>All</button>
                    <button type="button" className={`btn ${this.state.flag == 'active' ? 'btn-info' : 'btn-default'} btn-xs`} onClick={() => this.toggleFlag('active')}>Active</button>
                    <button type="button" className={`btn ${this.state.flag == 'completed' ? 'btn-info' : 'btn-default'} btn-xs`} onClick={() => this.toggleFlag('completed')}>Completed</button>
                    <button type="button" className='deleteCompleted btn btn-link' btn-xs onClick={() => this.deleteCompleted()}>Delete completed</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Todo/>, document.getElementById('todo-container'))
