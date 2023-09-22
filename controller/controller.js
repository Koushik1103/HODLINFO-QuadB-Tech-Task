const axios = require("axios");
const moment = require("moment");
const schema_data = require("../schema/schema.js");
require("moment-timezone");

const page = async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const response_data = await response.data;
    const data_result = Object.values(response_data).slice(0, 10);
    const data_arr = data_result.map((d) => new schema_data(d));
    await schema_data.insertMany(data_arr);

    var data_stored = await schema_data.find().sort({ _id: -1 }).limit(10);

    data_stored.reverse();

    const data_final = [];

    data_stored.forEach((d) => {
      var { base_unit, name, buy, sell, volume, open, low, high, last } = d;
      base_unit = base_unit.toUpperCase();

      const timestamp = moment.utc(d.at * 1000);
      const tradeTime = timestamp
        .tz("Asia/Kolkata")
        .format("DD/MM/YYYY [at] h:mm A");

      const final = {
        baseUnit: base_unit,
        name: name,
        tradeTime: tradeTime,
        buy: buy,
        high: high,
        sell: sell,
        volume: volume,
        last: last,
        open: open,
        low: low,
      };

      data_final.push(final);
    });

    schema_data.deleteMany({});

    res.render("index", { data: data_final });
  } catch (err) {
    res.status(500).send("Error in fetching and storing");
    console.log(err.message);
  }
};

module.exports = { page };
