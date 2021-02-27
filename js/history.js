const History = {
  data() {
    return {
      years: listOfYears(),
      months: listOfMonths(),
      selectedYear: current("year"),
      selectedMonth: current("month"),
      expensesByDates: null,
      totalExpense: null,
      separator: null,
      currency: null
    }
  },
  created() {
    getSettings("separator").then(data => this.separator = data.value);
    getSettings("currency").then(data => this.currency = data.value);
    getExpenses(current("month"), current("year"))
      .then(data => {
        this.expensesByDates = groupBy(data, "date")
        this.totalExpense = this.calculateTotal(data)
      })
  },
  methods: {
    filter() {
      getExpenses(this.selectedMonth, this.selectedYear)
        .then(data => {
          this.expensesByDates = groupBy(data, "date")
          this.totalExpense = this.calculateTotal(data)
        })
    },
    formatTime(time) {
      return ("0" + new Date(time).getHours()).slice(-2) + ":" + ("0" + new Date(time).getMinutes()).slice(-2)
    },
    formatAmount(amount) {
      return (this.currency + new Intl.NumberFormat(this.separator).format(amount))
    },
    formatDate(time) {
      return new Date(time).toDateString()
    },
    calculateTotal(data) {
      total = 0
      if (data.length == 0) { return total }
      data.forEach(function(expense) {
        total += parseInt(expense.amount)
      })
      return this.formatAmount(total)
    }
  }
};
