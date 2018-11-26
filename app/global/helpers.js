class Helpers {
  constructor() {
    this;
  }

  getCurrentDate() {
    var date = moment();
    return date.format('MM/DD/YYYY');
  }

  getLastTask() {
    return db.get('Tasks')
             .last()
             .value()
  }
}

module.exports = new Helpers()
