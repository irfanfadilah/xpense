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
    this.getSettingsData()
  },
  methods: {
    getSettingsData() {
      getSettings("name").then(data => this.name = data.value);
      getSettings("currency").then(data => this.currency = data.value);
      getSettings("separator").then(data => this.separator = data.value);
      getSettings("budget").then(data => this.budget = data.value);
    },
    submit() {
      data = [
        { key: "name", value: this.name },
        { key: "currency", value: this.currency },
        { key: "separator", value: this.separator },
        { key: "budget", value: this.budget }
      ];
      updateSettings(data)
        .then(() => Swal.fire("Success", "The settings has been saved."))
    },
    exportData() {
      db.open().then(() => {
        exportToJsonString(db.backendDB(), (error, jsonString) => {
          if (!error) {
            fileName = "xPense_" + current().toJSON().split("T")[0] + "_" + current("time").toString().slice(-5) + ".json"
            download(jsonString, fileName, "application/json")
            Swal.fire("Exported", fileName)
          }
        });
      })
    },
    importData(event) {
      file = event.target.files[0]
      if (file) {
        file.text().then(jsonString => {
          db.open().then(() => {
            clearDatabase(db.backendDB(), () => {
              importFromJsonString(db.backendDB(), jsonString, error => {
                if (error) {
                  Swal.fire("Ooops", "Failed to import the data.")
                } else {
                  this.getSettingsData()
                  Swal.fire("Success", "Data imported successfully.")
                }
              })
            })
          })
        })
      }
    }
  }
};
