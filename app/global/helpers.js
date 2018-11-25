class Helpers {
  constructor() {
    this;
  }

  getCurrentDate() {
    var date = moment();
    return date.format('MM/DD/YYYY');
  }
}

module.exports = new Helpers()
