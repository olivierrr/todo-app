
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
            '<span class="close" id="<%this.id%>" data-action="remove" > x </span>' +
            '<%this.task%> ' +
        '</li>'

    /*
     * @property {Object}
     */
    this.todoManager = new TodoManager()

    this.attachEvents()
}

/*
 * @method
 */
App.prototype.render = function() {
    var _this = this
    ,   todos = _this.todoManager.todos

    this.$todoList.innerHTML = todos.map(function (todo) {
        return template(_this.todoTemplate, todo)
    }).join('')
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
        _this.todoManager.add(_this.$addInput.value)
        _this.$addInput.value = ''
        _this.render()
    }

    function onTodoClick (event) {
        var action = event.target.getAttribute('data-action')
        if(action !== null) {
            var id = event.target.getAttribute('id')

            switch (action) {

                case 'remove':
                    _this.todoManager.remove(id)
                    _this.render()
                    break

                case 'edit':
                    _this.todoManager.editTask(id, 'derp')
                    _this.render()
                    break

                case 'toggle':
                    _this.todoManager.toggle(id)
                    _this.render()
                    break
            }
        }
    }
}

/*
 * @method
 */
App.prototype.save = function () {
    // body...
}

/*
 * @method
 */
App.prototype.load = function () {
    // body...
}