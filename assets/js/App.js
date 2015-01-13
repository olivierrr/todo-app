
/*
 * @constructor
 */
var App = function ($todoList, $addButton, $addInput) {

    /*
     * @property {Object}
     */
    this.$todoList = $todoList

    /*
     * @property {Object}
     */
    this.$addButton = $addButton

    /*
     * @property {Object}
     */
    this.$addInput = $addInput

    /*
     * @property {String}
     */
    this.todoTemplate = 
        '<li class="todo" id="<%this.id%>">' + 
            '<span class="toggle <%if(this.isCompleted) {%>on<%}%>" id="<%this.id%>" data-action="toggle"></span>' +
            '<span class="task"> <%this.task%> </span>' +
            '<span class="close" id="<%this.id%>" data-action="remove" > x </span>' +
        '</li>'

    /*
     * @property {Object}
     */
    this.todoManager = new TodoManager()

    this.boot()

}

/*
 * @method
 */
App.prototype.boot = function () {
    this.$addInput.focus()
    this.attachEvents()
    this.load()
    this.render()

    Velocity(this.$todoList.children, 'transition.flipYIn', {
        duration: 700, stagger: 50
    })
}

/*
 * @method
 */
App.prototype.render = function() {
    var _this = this
    ,   todos = _this.todoManager.todos

    this.$todoList.innerHTML = todos.map(function (todo) {
        return template(_this.todoTemplate, todo)
    }).reverse().join('')

    this.save()
}

/*
 * @method
 */
App.prototype.attachEvents = function () {
    var _this = this

    this.$addInput.addEventListener('keypress', function (event) { 
        if (event.keyCode === 13) onTodoSubmit(event)
    }, false)

    this.$addButton.addEventListener('click', function (event) {
        onTodoSubmit(event)
    }, false)

    this.$todoList.addEventListener('click', function (event) {
        onTodoClick(event)
    }, false)

    function onTodoSubmit (event) {
        var newTask = _this.$addInput.value

        if(newTask.trim().length > 0) {
            _this.todoManager.add(newTask)
            _this.$addInput.value = ''
            _this.render()
        } else {
            Velocity(_this.$addInput, 'callout.bounce', {duration: 250, drag: true})
        }
    }

    function onTodoClick (event) {
        var action = event.target.getAttribute('data-action')
        var id = event.target.getAttribute('id')

        if(action !== null) {
            switch (action) {
                case 'remove':  _this.todoManager.remove(id)                ;break
                case 'edit':    _this.todoManager.editTask(id, 'to-do!')    ;break
                case 'toggle':  _this.todoManager.toggleCompleted(id)       ;break
            }
            _this.render()
        }
    }
}

/*
 * @method
 */
App.prototype.save = function () {
    if (this.isLocalStorageSuported) window.localStorage.setItem('todo-app', JSON.stringify(this.todoManager.todos))
}

/*
 * @method
 */
App.prototype.load = function () {
    if (this.isLocalStorageSuported) this.todoManager.todos = JSON.parse(window.localStorage.getItem('todo-app')) || []
}

/*
 * @method
 */
App.prototype.isLocalStorageSuported = function() {
    return !!window.localStorage
}
