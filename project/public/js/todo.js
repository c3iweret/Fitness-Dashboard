'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = window.React,
    ReactDOM = window.ReactDOM;

var Todo = function (_React$Component) {
    _inherits(Todo, _React$Component);

    function Todo(props) {
        _classCallCheck(this, Todo);

        var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));

        _this.state = {
            input: '',
            list: [],
            flag: 'all'
        };
        return _this;
    }

    _createClass(Todo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var t = this;
            $.post('/todo/load', {}, function (data, status) {
                if (data.constructor === Array) {
                    t.setState({
                        list: data
                    });
                }
            });
        }
    }, {
        key: 'update',
        value: function update() {
            var t = this;
            $.post('/todo/update', { list: JSON.stringify(t.state.list) }, function (data, status) {
                console.log('data sent');
            });
        }
    }, {
        key: 'handleInput',
        value: function handleInput(e) {
            this.setState({
                input: e.target.value
            });
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (event.which === 13) {
                this.add();
            }
        }
    }, {
        key: 'toggleFlag',
        value: function toggleFlag(f) {
            this.setState({
                flag: f
            });
        }
    }, {
        key: 'add',
        value: function add() {
            var val = this.state.input.trim();
            if (val) {
                var newTodo = {
                    entry: val,
                    completed: false
                };

                this.state.list.push(newTodo);

                this.setState({
                    input: '',
                    list: this.state.list
                });
                this.update();
            }
        }
    }, {
        key: 'check',
        value: function check(i) {
            this.state.list[i].completed = !this.state.list[i].completed;
            this.setState({
                list: this.state.list
            });
            this.update();
        }
    }, {
        key: 'delete',
        value: function _delete(i) {
            this.state.list.splice(i, 1);
            this.setState({
                list: this.state.list
            });
            this.update();
        }
    }, {
        key: 'deleteCompleted',
        value: function deleteCompleted() {
            var lst = this.state.list;
            lst = lst.filter(function (x) {
                return !x.completed;
            });
            this.setState({
                list: lst
            });
            this.update();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var todo = [],
                lst = this.state.list;

            var _loop = function _loop(i) {
                if (_this2.state.flag == 'all' || _this2.state.flag == 'active' && !lst[i].completed || _this2.state.flag == 'completed' && lst[i].completed) {
                    todo.push(React.createElement(
                        'div',
                        { key: i, className: (lst[i].completed ? 'completed' : '') + ' todo-entry' },
                        React.createElement(
                            'label',
                            null,
                            React.createElement('input', { type: 'checkbox', checked: lst[i].completed, onChange: function onChange() {
                                    return _this2.check(i);
                                } }),
                            ' ',
                            React.createElement(
                                'span',
                                null,
                                lst[i].entry
                            )
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-link btn-sm', onClick: function onClick() {
                                    return _this2.delete(i);
                                } },
                            'Delete'
                        )
                    ));
                }
            };

            for (var i in lst) {
                _loop(i);
            }

            return React.createElement(
                'div',
                { className: 'todo' },
                React.createElement(
                    'div',
                    { className: 'todo-input' },
                    React.createElement('input', { placeholder: 'This needs to be done.', type: 'text', value: this.state.input, onChange: function onChange(e) {
                            return _this2.handleInput(e);
                        }, onKeyDown: function onKeyDown() {
                            return _this2.handleKeyDown();
                        } }),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-info btn-sm', onClick: function onClick() {
                                return _this2.add();
                            } },
                        'Add'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'todo-list' },
                    todo
                ),
                React.createElement(
                    'div',
                    { className: 'toggles' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn ' + (this.state.flag == 'all' ? 'btn-info' : 'btn-default') + ' btn-xs', onClick: function onClick() {
                                return _this2.toggleFlag('all');
                            } },
                        'All'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn ' + (this.state.flag == 'active' ? 'btn-info' : 'btn-default') + ' btn-xs', onClick: function onClick() {
                                return _this2.toggleFlag('active');
                            } },
                        'Active'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn ' + (this.state.flag == 'completed' ? 'btn-info' : 'btn-default') + ' btn-xs', onClick: function onClick() {
                                return _this2.toggleFlag('completed');
                            } },
                        'Completed'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'deleteCompleted btn btn-link', 'btn-xs': true, onClick: function onClick() {
                                return _this2.deleteCompleted();
                            } },
                        'Delete completed'
                    )
                )
            );
        }
    }]);

    return Todo;
}(React.Component);

ReactDOM.render(React.createElement(Todo, null), document.getElementById('todo-container'));