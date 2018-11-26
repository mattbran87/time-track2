class DatabaseFunctions {
  constructor() {
    this;
  }

  // get all
  dateGetAll() {
    var date = db.get('Date').value();
    return date;
  }

  tagsGetAll() {
    var tags = db.get('Tags').value();
    return tags;
  }

  userSettingsGetAll() {
    var userSettings = db.get('UserSettings').value();
    return userSettings;
  }

  // get specific record(s)
  dateGetByDate(date) {
    var date = db.get('Date')
    .find({date : date})
    .value();
    return date;
  }

  createDate() {
    // get last entry to write to next position
    var lastEntry = db.get('Date')
    .last()
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

  createDateTaskRecord(date) {
    var currentDate = this.dateGetByDate(date);
    var tasksLength = currentDate.tasks.length;
    var logu = db.get('Date')
    .find({date : date})
    .get('tasks')
    .push({
      "id": tasksLength,
      "taskID": currentDate.id // TODO: fix this value. Not correct value.
    })
    .write();
  }

  createTasks() {

  }

  getTasks() {

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
