const fs = require("fs");

const path = `./output/wrong`;
const fileList = fs.readdirSync(path).filter((file) => file.startsWith("o"));
let all = [];

fileList.map((file) => {
  let content = fs.readFileSync(`${path}/${file}`);

  content = JSON.parse(content);

  content = content.map((record) => {
    const address = [
      record.neighborhood.replace("MAH.", "").trim(),
      record.district,
      record.city,
      "Turkey",
    ].join(", ");

    return { ...record, address };
  });

  all = [...all, ...content];
});

console.log({ total: all.length });
fs.writeFileSync("./output/wrong/all.json", JSON.stringify(all, null, 1));
