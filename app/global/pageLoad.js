class PageLoad {
  constructor() {
    this;
  }

  getDate() {
    var currentDate = helper.getCurrentDate();
    var workingDate = database.dateGetByDate(currentDate);
    if (workingDate == undefined) {
      return createDate();
    } else {
      return workingDate;
    }
  }
}

module.exports = new PageLoad()
