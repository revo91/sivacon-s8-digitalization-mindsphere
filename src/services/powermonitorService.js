import axios from "axios";

const powermonitorRoute = "customApi/powermonitor";
const powermonitorTotalActivePowerRoute =
  "customApi/powermonitor/totalActivePower";

let addDaysToDate = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

let addMonthsToDate = (date, months) => {
  var result = new Date(date);
  return new Date(result.setMonth(result.getMonth() + months));
};

export async function getPowermonitorData() {
  let result = await axios({
    url: encodeURI(powermonitorRoute),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}

export async function changePowermonitorSettings(data) {
  let result = await axios({
    url: encodeURI(powermonitorRoute),
    method: "PUT",
    headers: { "Content-type": "application/json" },
    data: data,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}

export async function getTotalActivePowerData(fromDate, toDate) {
  let fromDateString = fromDate.toISOString();
  let toDateString = toDate.toISOString();

  let result = await axios({
    url: `${encodeURI(
      powermonitorTotalActivePowerRoute
    )}?from=${fromDateString}&to=${toDateString}`,
    method: "GET",
    data: {},
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}

export async function getTotalActivePowerMonthData(yearNumber, monthNumber) {
  let startDate = new Date(yearNumber, monthNumber, 1);
  let endDate = addMonthsToDate(startDate, 1);
  let firstQueryEnd = addDaysToDate(startDate, 16);

  let result = await Promise.all([
    new Promise(async (resolve, reject) => {
      try {
        return resolve(await getTotalActivePowerData(startDate, firstQueryEnd));
      } catch (err) {
        return reject(err);
      }
    }),
    new Promise(async (resolve, reject) => {
      try {
        return resolve(await getTotalActivePowerData(firstQueryEnd, endDate));
      } catch (err) {
        return reject(err);
      }
    })
  ]);
  let dataArray = [...result[0], ...result[1]];

  return dataArray;
}
