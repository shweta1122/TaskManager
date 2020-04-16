const Sequelize = require('sequelize')
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/taskmanager.db'
})


var Todo = sequelize.define('todo', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  priority: {
    type: Sequelize.STRING
  },
  duedate: {
    type: Sequelize.DATE
  }
});

var Notes = sequelize.define('notes', {
  notes: {
    type: Sequelize.STRING
  }

})
Todo.hasMany(Notes, {
  foreignKey: {
    todoId: 'id',
    allowNull: false
  }
})
Notes.belongsTo(Todo)

// const task = async () => {

//   await Todo.sync()
//   const todoDetails = await Todo.findAll()

//   // todoDetails.forEach(todo => console.log(todo.dataValues))
//   return todoDetails
//}

const findById = async (id) => {

  await Todo.sync()

  return await Todo.findAll({
    where: {
      id
    }
  })
}


module.exports = { sequelize, Todo, Notes }
