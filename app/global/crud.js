class DatabaseFunctions {
  constructor() {
    this;
  }

  // get all
  dateGetAll() {
    var date = db.get('Date').cloneDeep().value();
    return date;
  }

  tagsGetAll() {
    var tags = db.get('Tags').cloneDeep().value();
    return tags;
  }

  userSettingsGetAll() {
    var userSettings = db.get('UserSettings').cloneDeep().value();
    return userSettings;
  }

  // get specific record(s)
  dateGetByDate(date) {
    var date = db.get('Date')
    .find({date : date})
    .cloneDeep()
    .value();
    return date;
  }

  dateGetByID(id) {
    var date = db.get('Date')
    .find({id : id})
    .cloneDeep()
    .value();
    return date;
  }

  createDate() {
    // get last entry to write to next position
    var lastEntry = db.get('Date')
    .last()
    .cloneDeep()
    .value()

    // construct new entry
    var id = lastEntry.id + 1;
    var currentDate = helper.getCurrentDate();
    var tasks = [];

    // write new date to db
    db.get('Date')
    .push({ id: id, date: currentDate, tasks : tasks})
    .write()
  }

  createDateTaskRecord(date, taskData) {
    var currentDate = this.dateGetByDate(date);
    var tasksLength = currentDate.tasks.length;

    var datu = db.get('Date')
              .find({date : date})
              .value();
    var lastEntryID = datu.tasks[datu.tasks["length"]-1].id
    datu.tasks[datu.tasks["length"]] = {"id": lastEntryID+1, "taskID": taskData.id};

    return datu = db.get('Date').find({date : date}).write();
  }

  createTask(submissionObject) {
    db.get('Tasks')
      .push(submissionObject)
      .write()
  }

  getTasksOnDate(date) {
    var task = db.get('Date')
    .find({date : date})
    .cloneDeep()
    .value();
    return task.tasks;
  }

  getTaskByID(id) {
    var task = db.get('Tasks')
    .find({id : id})
    .cloneDeep()
    .value();
    return task;
  }

  updateDate(submissionObject) {
    console.log(submissionObject);
    console.log(submissionObject.id);
    var task = db.get('Tasks')
        .find({id : parseInt(submissionObject.id)})
        .value();

    console.log(task);

    task.description = submissionObject.description
    task.tags = submissionObject.tags
    task.taskName = submissionObject.taskName
    task.timeIn = submissionObject.timeIn
    task.timeOut = submissionObject.timeOut

    var task = db.get('Tasks')
          .find({id : parseInt(submissionObject.id)})
          .assign({
            description: submissionObject.description,
            tags: submissionObject.tags,
            taskName: submissionObject.taskName,
            timeIn: submissionObject.timeIn,
            timeOut: submissionObject.timeOut
          })
          .write();

    // task = db.get('Tasks').find({id : parseInt(submissionObject.id)}).write();
    console.log(task);
  }

  updateTask() {

  }

  deleteDate() {

  }

  deleteTask() {

  }

  deleteTasks() {

  }
}

module.exports = new DatabaseFunctions()
