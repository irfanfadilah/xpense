const Index = {
  data() {
    return {
      name: null,
      detail: null,
      amount: null
    }
  },
  created() {
    getSettings("name").then(data => this.name = data.value);
  },
  methods: {
    submit() {
      data = {
        amount: this.amount,
        detail: this.detail,
        year: current("year"),
        month: current("month"),
        date: current("date"),
        time: current("time")
      };
      db.expenses.add(data)
        .then(() => {
          this.amount = null
          this.detail = null
          Swal.fire("Success", "The data has been saved.")
        })
        .catch(error => Swal.fire("Ooops", error))
    }
  }
};
