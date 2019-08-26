import axios from "axios";

const msIOTTimeSeriesRoute = "/api/iottimeseries/v3/timeseries";
const msIOTAggregatesRoute = "/api/iottimeseries/v3/aggregates";

const prepareVariables = variables => {
  let stringToReturn = "";

  for (let i = 0; i < variables.length; i++) {
    if (i === 0) {
      stringToReturn += variables[i];
    } else {
      stringToReturn += `,${variables[i]}`;
    }
  }

  return stringToReturn;
};

export async function getDataFromRange(
  assetId,
  aspectName,
  variableNames,
  dateStringFrom,
  dateStringTo,
  limit = 2000
) {
  let variablesString = prepareVariables(variableNames);
  let result = await axios({
    url: encodeURI(
      `${msIOTTimeSeriesRoute}/${assetId}/${aspectName}?select=${variablesString}&from=${dateStringFrom}&to=${dateStringTo}&limit=${limit}`
    ),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}

export async function getAggregateData(
  assetId,
  aspectName,
  variableNames,
  dateStringFrom,
  dateStringTo,
  intervalValue,
  intervalUnit
) {
  let variablesString = prepareVariables(variableNames);
  let result = await axios({
    url: encodeURI(
      `${msIOTAggregatesRoute}/${assetId}/${aspectName}?select=${variablesString}&from=${dateStringFrom}&to=${dateStringTo}&intervalValue=${intervalValue}&intervalUnit=${intervalUnit}`
    ),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}
