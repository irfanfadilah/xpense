window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

function listOfYears() {
  step = (new Date).getFullYear() - 2020;
  return Array.from({ length: step }, (v, i) => 2021 + i);
}

function listOfMonths() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}

function current(name) {
  now = new Date;

  switch(name) {
    case "year":
      return now.getFullYear()
    case "month":
      return now.getMonth()
    case "date":
      return now.getDate()
    case "time":
      return now.getTime()
    default:
      return now
  }
}

function dateISO(time=null) {
  if (time == null) {
    return new Date().toISOString().split("T")[0]
  } else {
    return new Date(time).toISOString().split("T")[0]
  }
}

function displayMode() {
  isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  if (document.referrer.startsWith("android-app://")) {
    return "application"
  } else if (navigator.standalone || isStandalone) {
    return "standalone"
  } else {
    return "browser"
  }
}

let installPWA;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  installPWA = e;
  if (displayMode() == "browser") {
    document.getElementById("pwa-prompt").classList.remove("d-none")
  }
});

function promptPWA() {
  installPWA.prompt().then((e) => {
    if (e.outcome == "accepted") {
      document.getElementById("pwa-prompt").classList.add("d-none")
    }
  })
}
