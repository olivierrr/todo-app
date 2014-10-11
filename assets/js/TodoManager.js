
/*
 * @constructor
 */
function TodoManager () {

    /*
     * contains todo objects
     *
     * @property {Array}
     */
    this.todos = []
}

/*
 * @method
 * @param {String}
 */
TodoManager.prototype.add = function (task) {
    this.todos.push({
        isCompleted : false,
        task : task || 'todo task',
        id : Math.random()
    })
}

/*
 * @method
 * @param {Number|String}
 */
TodoManager.prototype.remove = function (id) {
    var index = this.findById(id)
    this.todos.splice(index, 1)
}

/*
 * @method
 * @param {Number|String}
 */
TodoManager.prototype.toggleCompleted = function (id) {
    var index = this.findById(id)
    ,   todo = this.todos[index]
    todo && todo.isCompleted === true ? todo.isCompleted = false : todo.isCompleted = true
}

/*
 * @method
 * @param {Number|String}
 * @param {String}
 */
TodoManager.prototype.editTask = function (id, newTask) {
    var index = this.findById(id)
    ,   todo = this.todos[index]
    todo.task = newTask
}

/*
 * @method
 * @param {Number|String}
 * @return {Number} i
 */
TodoManager.prototype.findById  = function (id) {
    for(var i=0; i<this.todos.length; i++) {
        if(this.todos[i].id === +id) return i
    }
}