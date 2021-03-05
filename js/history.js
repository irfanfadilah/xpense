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
      currency: null,
      expenseId: null,
      expenseDetail: null,
      expenseAmount: null
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
    },
    toggleActions(id) {
      document.querySelector("#actions-"+id).classList.toggle("d-none")
    },
    editExpense(id, detail, amount) {
      this.expenseId = id
      this.expenseDetail = detail
      this.expenseAmount = amount
      editModal.show()
    },
    updateExpense() {
      db.expenses.update(this.expenseId, {
        detail: this.expenseDetail,
        amount: this.expenseAmount
      }).then(() => {
        this.filter()
        editModal.hide()
      })
    },
    deleteExpense(id) {
      Swal.fire({
        title: 'Confirm',
        text: "Do you want to delete this entry?",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          db.expenses.delete(id).then(() => this.filter())
        }
      })
    }
  }
};
