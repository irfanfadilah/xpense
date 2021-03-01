const Settings = {
  data() {
    return {
      name: null,
      currency: null,
      separator: null,
      budget: null
    }
  },
  created() {
    getSettings("name").then(data => this.name = data.value);
    getSettings("currency").then(data => this.currency = data.value);
    getSettings("separator").then(data => this.separator = data.value);
    getSettings("budget").then(data => this.budget = data.value);
  },
  methods: {
    submit() {
      data = [
        { key: "name", value: this.name },
        { key: "currency", value: this.currency },
        { key: "separator", value: this.separator },
        { key: "budget", value: this.budget }
      ];
      updateSettings(data)
        .then(() => Swal.fire("Success", "The settings has been saved."))
        .catch(error => Swal.fire("Ooops", error));
    },
    exportData() {
      db.open().then(() => {
        exportToJsonString(db.backendDB(), (error, jsonString) => {
          if (!error) {
            download(jsonString, "xPense_v"+ (new Date).getTime() +".json", "application/json");
          }
        });
      })
    },
    importData(event) {
      event.target.files[0].text().then(jsonString => {
        db.open().then(() => {
          clearDatabase(db.backendDB(), () => {
            importFromJsonString(db.backendDB(), jsonString, error => {
              if (error) {
                Swal.fire("Ooops", "Failed to import the data.")
              } else {
                Swal.fire({
                  title: "Success",
                  text: "Data imported successfully.",
                  confirmButtonText: "Reload"
                })
                .then(() => location.reload())
              }
            })
          })
        })
      })
    }
  }
};
