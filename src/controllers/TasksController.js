import {Task} from '../../models';


class Tasks {
  // create tasks function
  static create (req, res){
    const { task } = req.body;
    if (task === ''){
      return res.status(400).json({
        message: 'The task can not be empty!'
      });
    }

    return Task
    .create({
      task
    })
    .then(data => {
      res.status(200).json({
        message: 'Task successfully added',
        data
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Sorry, the task was not create',
        err
      });
    });

  };

  // get all tasks function
  static allTasks (req, res){
    return Task
      .findAll()
      .then(data => {
        if (data.length === 0) {
          return res.status(500).json({
            message: 'Currently, there are no tasks recorded'
          });
        }
        return res.status(200).json({
          data
        });
      })
      .catch((err) => {
         res.status(404).json({
           err
         });
      });
  };

  // update task by id function
  static update (req, res){
    const {task} = req.body;
    const { id } = req.params;

    return Task
    .findByPk(id)
    .then(data => {
      data.update({
      task: task || data.task
    })
    .then(updatedTask => {
      res.status(200).json({
        message: 'Successfully updated',
        updatedTask:task || updatedTask.data.task
      });
    });
  })
  .catch(err => {
    res.status(400).json({
      error: 'Something did not go right, your task was not updated',
      err
    });
  });
  }

  // delete task by id function
  static delete (req, res){
    const { id } = req.params;
    return Task
    .findByPk(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: 'No data to be deleted matching the id'
        });
      }
      return data
      .destroy()
      .then(() => {
        res.status(200).json({
          message: 'Task successfull deleted'
        });
      });
    })
    .catch(err => {
      res.status.json({
        err
      });
    });

  }
  
}

export default Tasks;