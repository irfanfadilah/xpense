const Index = {
  data() {
    return {
      name: null,
      detail: null,
      amount: null,
      time: dateISO()
    }
  },
  created() {
    getSettings("name").then(data => this.name = data.value);
  },
  methods: {
    submit() {
      time = new Date(this.time)
      data = {
        amount: this.amount,
        detail: this.detail,
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
        time: time.getTime()
      };
      db.expenses.add(data)
        .then(() => {
          this.amount = null
          this.detail = null
          this.time = dateISO()
          Swal.fire("Success", "The data has been saved.")
        })
        .catch(error => Swal.fire("Ooops", error))
    }
  }
};
