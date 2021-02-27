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
    { key: "budget", value: "" }
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
    .toArray();
};

function groupBy(data, key) {
  return data.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
