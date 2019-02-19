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

    console.log(currentDate);
    console.log(tasksLength);
    console.log(taskData);

    var datu = db.get('Date')
              .find({date : date})
              .value();

    datu.tasks[datu.tasks["length"]] = {"id": tasksLength, "taskID": taskData.id};

    datu = db.get('Date').find({date : date}).write();

    // db.get('Date')
    // .find({date : date})
    // .push({tasks: {"id": tasksLength, "taskID": taskData.id}})
    // .write();
    //
    // db.get('Date[8].tasks').push({"id": 5,"taskID": 10}).write()
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

  updateDate() {

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
