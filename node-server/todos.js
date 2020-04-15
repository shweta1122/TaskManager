const route = require('express').Router()
const { Todo } = require('./db')
const { Notes } = require('./db')



route.get('/', async (req, res) => {



    await Todo.sync()
    const todoDetails = await Todo.findAll()
    res.send(await todoDetails)
    // todoDetails.forEach(todo => console.log(todo.dataValues))

})
route.get('/:id', async (req, res) => {
    id = req.params.id
    const todoDetailsById = Todo.findAll({
        where: {
            id
        }
    })
    res.send(await todoDetailsById)
})
route.get('/:id/notes', async (req, res) => {
    id = req.params.id
    const notesById = Notes.findAll({
        where: {
            todoId: id
        }
    })

    res.send(await notesById)
})
route.post('/:id/notes', async (req, res) => {

    await Notes.create({
        notes: req.body.notes,
        todoId: req.params.id

    })
    res.send("sucessfully")
})

route.post('/', async (req, res) => {

    let title = req.body.title
    let description = req.body.description
    let duedate = req.body.duedate
    let status = req.body.status
    let priority = req.body.priority

    // Todo.sync({ force: false }).then(function () {
    console.log("table created")
    await Todo.create({
        title: title,
        description: description,
        status: status,
        priority: priority,
        duedate: duedate



    })
    res.status(201).send("sucessfully done")

})


route.patch('/:id', (req, res) => {
    id = req.params.id

    let title = req.body.title
    let description = req.body.description
    let duedate = req.body.duedate
    let status = req.body.status
    let priority = req.body.priority

    Todo.sync({ force: false }).then(function () {
        console.log("table created")
        Todo.update({
            title: title,
            description: description,
            status: status,
            priority: priority,
            duedate: duedate
        },
            {
                where: { id: id }
            })



    })
    res.send("sucessfully done")
})

module.exports = route