const express = require('express')
const Tasks = require('../models/tasks')
require('../public/autocomplete')
const router = new express.Router() 

//create new task
router.post('/tasks',  async (req, res) => {
    const task = new Tasks({
        ...req.body
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

//return the task
router.get('/tasks', (req, res) => {
    Tasks.find((err, tasks) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(200).send(tasks);
    });
})

//delete completed task
router.delete('/tasks/:id', async (req, res)=>{
    try {
        // const tasks = await Tasks.findByIdAndDelete(req.params.id)
        if(req.query.completed === 'true') {
            await Tasks.findOneAndDelete({ _id: req.params.id})
            return res.status(404).send()
        }

        res.send({
            "error": "cannot delete incomplete tast, mark as completed to delete tast"
        })
    } catch (error) {
        res.status(500).send(e)
    }
})

//update task from uncompleted to completed
router.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send( { error: 'invalid updates!'} )
    }
    try {
        const task = await Task.findOne({ _id: req.params.id})

       if(!task) {
           return res.status(404).send()
       }

       updates.forEach((update) => task[update] = req.body[update])
       await task.save()

       res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//applying filter on search box
router.get('/tasks/search/', (req, res, next) => {
    var regex = new RegExp(req.query["term"],'i');
    var tasksFilter = Tasks.find({description:regex},{'description':3}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(10);

    tasksFilter.exec(function(err, data){
        console.log(data)
        var result = [];
        if(!err) {
            if(data && data.length && data.length>3){
                data.forEach(user=>{
                    let obj={
                        id:user._id,
                        label:user.name
                    };
                    result.push(obj);
                });
            }
            console.log(result);
            res.jsonp(result);
        }

    });
})

module.exports = router