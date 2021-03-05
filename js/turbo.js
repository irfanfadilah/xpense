document.querySelector('html').addEventListener('turbo:load', function () {
  switch(window.location.pathname) {
    case "/":
      IndexInstance = Vue.createApp(Index).mount("#index"); break
    case "/history":
      HistoryInstance = Vue.createApp(History).mount("#history")
      editModal = new bootstrap.Modal(document.getElementById('edit-modal')); break
    case "/settings":
      SettingsInstance = Vue.createApp(Settings).mount("#settings"); break
    default:
      Swal.fire("Ooops", "404: Not Found.")
  }
});
