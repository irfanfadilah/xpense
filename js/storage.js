const db = new Dexie("xpense");

db.version(3).stores({
  expenses: "++id, amount, detail, [year+month+date], time",
  settings: "&key, value"
});

db.on("populate", function() {
  db.settings.bulkAdd([
    { key: "name", value: "Stranger" },
    { key: "currency", value: "Rp" },
    { key: "separator", value: "id" },
    { key: "budget", value: "" },
    { key: "donated", value: false },
    { key: "sort", value: "oldest" }
  ]);
});

async function getSettings(key) {
  return await db.settings.get({ key: key })
};

async function updateSettings(data) {
  return await db.settings.bulkPut(data, { allKeys: true });
};

async function getExpenses(month, year) {
  return await db.expenses
    .where("[year+month]")
    .equals([parseInt(year), parseInt(month)])
    .sortBy("time")
};

function groupBy(data, key) {
  keys = [...new Set(data.map(x => x[key]))]

  if (!true) {
    keys = keys.sort((a, b) => a - b)
  } else {
    keys = keys.sort((a, b) => b - a)
  }

  aaa = keys.map(item => {
    return {
      key: item,
      data: data.filter(x => x[key] == item)
    }
  })

  console.log(aaa)

  return aaa
};
