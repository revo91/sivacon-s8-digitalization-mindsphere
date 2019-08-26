import { getAggregateData, getDataFromRange } from "./mindsphereService";
import { exists, existsAndIsNotEmpty } from "../utils/utilities";

const assetIdRGPZO = "a5eebd59cd1348c5b38f8d74ab432780";

const breakerActiveEnergyImportVariableName = "Active_energy_import";
const breakerActiveEnergyExportVariableName = "Active_energy_export";
const breakerReactiveEnergyImportVariableName = "Reactive_energy_import";
const breakerReactiveEnergyExportVariableName = "Reactive_energy_export";

const breakerActivePowerImportVariableName = "Active_power_import_15_min";

const pacActiveEnergyImportVariableName = "Active_energy_import";
const pacActiveEnergyExportVariableName = "Active_energy_export";
const pacReactiveEnergyImportVariableName = "Reactive_energy_import";
const pacReactiveEnergyExportVariableName = "Reactive_energy_export";

const pacActivePowerImportVariableName = "Total_active_power_import";

const pacVoltageL1NVariableName = "Voltage_L1_N";
const pacVoltageL2NVariableName = "Voltage_L2_N";
const pacVoltageL3NVariableName = "Voltage_L3_N";
const pacVoltageL1L2VariableName = "Voltage_L1_L2";
const pacVoltageL2L3VariableName = "Voltage_L2_L3";
const pacVoltageL3L1VariableName = "Voltage_L3_L1";
const pacCurrentL1VariableName = "Current_L1";
const pacCurrentL2VariableName = "Current_L2";
const pacCurrentL3VariableName = "Current_L3";
const pacTHDIL1VariableName = "THD_current_L1";
const pacTHDIL2VariableName = "THD_current_L2";
const pacTHDIL3VariableName = "THD_current_L3";
const pacTHDUL1VariableName = "THD_voltage_L1";
const pacTHDUL2VariableName = "THD_voltage_L2";
const pacTHDUL3VariableName = "THD_voltage_L3";
const pacUnbalanceVoltageVariableName = "Unbalance_voltage";
const pacUnbalanceCurrentVariableName = "Unbalance_current";

const breakerCurrentL1VariableName = "Current_L1";
const breakerCurrentL2VariableName = "Current_L2";
const breakerCurrentL3VariableName = "Current_L3";
const breakerTHDIL1VariableName = "THD_Current_L1";
const breakerTHDIL2VariableName = "THD_Current_L2";
const breakerTHDIL3VariableName = "THD_Current_L3";

let addDaysToDate = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

let addMonthsToDate = (date, months) => {
  var result = new Date(date);
  return new Date(result.setMonth(result.getMonth() + months));
};

const numberOfDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getElement1minAspectName = elementName => {
  return elementName + "_1_min";
};

const getElement15minAspectName = elementName => {
  return elementName + "_15_min";
};

const getElement1sAspectName = elementName => {
  return elementName + "_1_s";
};

const isAggregatedBreakerDataValid = data => {
  if (!existsAndIsNotEmpty(data)) return false;

  if (!exists(data[breakerActiveEnergyImportVariableName])) return false;
  if (!exists(data[breakerActiveEnergyExportVariableName])) return false;
  if (!exists(data[breakerReactiveEnergyImportVariableName])) return false;
  if (!exists(data[breakerReactiveEnergyExportVariableName])) return false;

  if (!exists(data[breakerActiveEnergyImportVariableName]["lasttime"]))
    return false;
  if (!exists(data[breakerActiveEnergyExportVariableName]["lasttime"]))
    return false;
  if (!exists(data[breakerReactiveEnergyImportVariableName]["lasttime"]))
    return false;
  if (!exists(data[breakerReactiveEnergyExportVariableName]["lasttime"]))
    return false;

  if (
    data[breakerActiveEnergyImportVariableName]["lasttime"] !==
    data[breakerActiveEnergyExportVariableName]["lasttime"]
  )
    return false;

  if (
    data[breakerActiveEnergyImportVariableName]["lasttime"] !==
    data[breakerReactiveEnergyImportVariableName]["lasttime"]
  )
    return false;

  if (
    data[breakerActiveEnergyImportVariableName]["lasttime"] !==
    data[breakerReactiveEnergyExportVariableName]["lasttime"]
  )
    return false;

  return true;
};

const convertAggregatedDataToBreakerData = aggregatedData => {
  let dataToReturn = {};

  for (let data of aggregatedData) {
    if (isAggregatedBreakerDataValid(data)) {
      let date = new Date(
        data[breakerActiveEnergyImportVariableName]["lasttime"]
      ).getTime();

      dataToReturn[date] = {
        activeEnergyImport:
          data[breakerActiveEnergyImportVariableName]["lastvalue"] * 1000,
        activeEnergyExport:
          data[breakerActiveEnergyExportVariableName]["lastvalue"] * 1000,
        reactiveEnergyImport:
          data[breakerReactiveEnergyImportVariableName]["lastvalue"] * 1000,
        reactiveEnergyExport:
          data[breakerReactiveEnergyExportVariableName]["lastvalue"] * 1000
      };
    }
  }

  return dataToReturn;
};

const convertAggregatedDataToPACData = aggregatedData => {
  let dataToReturn = {};

  for (let data of aggregatedData) {
    if (isAggregatedBreakerDataValid(data)) {
      let date = new Date(
        data[pacActiveEnergyImportVariableName]["lasttime"]
      ).getTime();

      dataToReturn[date] = {
        activeEnergyImport:
          data[pacActiveEnergyImportVariableName]["lastvalue"],
        activeEnergyExport:
          data[pacActiveEnergyExportVariableName]["lastvalue"],
        reactiveEnergyImport:
          data[pacReactiveEnergyImportVariableName]["lastvalue"],
        reactiveEnergyExport:
          data[pacReactiveEnergyExportVariableName]["lastvalue"]
      };
    }
  }

  return dataToReturn;
};

const getBreakerEnergyMonthly = (breakerName, year, month) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fromDate = new Date(year, month, 0);
      let numberOfDays = numberOfDaysInMonth(month, year);
      let toDate = new Date(
        fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
      );

      let agregatedData = await getAggregateData(
        assetIdRGPZO,
        getElement1minAspectName(breakerName),
        [
          breakerActiveEnergyImportVariableName,
          breakerActiveEnergyExportVariableName,
          breakerReactiveEnergyImportVariableName,
          breakerReactiveEnergyExportVariableName
        ],
        fromDate.toISOString(),
        toDate.toISOString(),
        1,
        "day"
      );

      let data = convertAggregatedDataToBreakerData(agregatedData);

      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });
};

const getPACEnergyMonthly = (pacName, year, month) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fromDate = new Date(year, month, 0);
      let numberOfDays = numberOfDaysInMonth(month, year);
      let toDate = new Date(
        fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
      );

      let agregatedData = await getAggregateData(
        assetIdRGPZO,
        getElement1minAspectName(pacName),
        [
          pacActiveEnergyImportVariableName,
          pacActiveEnergyExportVariableName,
          pacReactiveEnergyImportVariableName,
          pacReactiveEnergyExportVariableName
        ],
        fromDate.toISOString(),
        toDate.toISOString(),
        1,
        "day"
      );

      let data = convertAggregatedDataToPACData(agregatedData);

      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });
};

export async function getEnergyMonthly(year, month) {
  const getBreakerEnergyAction = (breakerName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await getBreakerEnergyMonthly(breakerName, year, month));
      } catch (err) {
        return reject(err);
      }
    });
  };

  const getPACEnergyAction = (PACName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await getPACEnergyMonthly(PACName, year, month));
      } catch (err) {
        return reject(err);
      }
    });
  };

  let elementNames = [
    "1F1",
    "1F2",
    "1F3",
    "1F4",
    "1F5",
    "1F6",
    "1F7",
    "1FP1",
    "1FP2",
    "2F1",
    "2F2",
    "2F3",
    "2F4",
    "2F5",
    "2F6",
    "2FP1",
    "2FP2",
    "3F1",
    "3F2",
    "TR1",
    "TR2",
    "GEN"
  ];

  let allActions = [
    getBreakerEnergyAction(elementNames[0], year, month),
    getBreakerEnergyAction(elementNames[1], year, month),
    getBreakerEnergyAction(elementNames[2], year, month),
    getBreakerEnergyAction(elementNames[3], year, month),
    getBreakerEnergyAction(elementNames[4], year, month),
    getBreakerEnergyAction(elementNames[5], year, month),
    getBreakerEnergyAction(elementNames[6], year, month),
    getBreakerEnergyAction(elementNames[7], year, month),
    getBreakerEnergyAction(elementNames[8], year, month),
    getBreakerEnergyAction(elementNames[9], year, month),
    getBreakerEnergyAction(elementNames[10], year, month),
    getBreakerEnergyAction(elementNames[11], year, month),
    getBreakerEnergyAction(elementNames[12], year, month),
    getBreakerEnergyAction(elementNames[13], year, month),
    getBreakerEnergyAction(elementNames[14], year, month),
    getBreakerEnergyAction(elementNames[15], year, month),
    getBreakerEnergyAction(elementNames[16], year, month),
    getBreakerEnergyAction(elementNames[17], year, month),
    getBreakerEnergyAction(elementNames[18], year, month),
    getPACEnergyAction(elementNames[19], year, month),
    getPACEnergyAction(elementNames[20], year, month),
    getPACEnergyAction(elementNames[21], year, month)
  ];

  let allData = await Promise.all(allActions);

  let dataToReturn = {};

  for (let i = 0; i < elementNames.length; i++) {
    let elementName = elementNames[i];
    let elementData = allData[i];
    dataToReturn[elementName] = elementData;
  }

  return dataToReturn;
}

const getBreakerActivePower = async (breakerName, fromDate, toDate) => {
  let powerData = await getDataFromRange(
    assetIdRGPZO,
    getElement15minAspectName(breakerName),
    [breakerActivePowerImportVariableName],
    fromDate.toISOString(),
    toDate.toISOString(),
    2000
  );

  return powerData;
};

const getPACActivePower = async (PACName, fromDate, toDate) => {
  let powerData = await getDataFromRange(
    assetIdRGPZO,
    getElement15minAspectName(PACName),
    [pacActivePowerImportVariableName],
    fromDate.toISOString(),
    toDate.toISOString(),
    2000
  );

  return powerData;
};

export async function getBreakerActivePowerMonthData(
  breakerName,
  yearNumber,
  monthNumber
) {
  let startDate = new Date(yearNumber, monthNumber, 1);
  let endDate = addMonthsToDate(startDate, 1);
  let firstQueryEnd = addDaysToDate(startDate, 16);

  let result = await Promise.all([
    new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await getBreakerActivePower(breakerName, startDate, firstQueryEnd)
        );
      } catch (err) {
        return reject(err);
      }
    }),
    new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await getBreakerActivePower(breakerName, firstQueryEnd, endDate)
        );
      } catch (err) {
        return reject(err);
      }
    })
  ]);
  let dataArray = [...result[0], ...result[1]];

  return dataArray;
}

export async function getPACActivePowerMonthData(
  PACName,
  yearNumber,
  monthNumber
) {
  let startDate = new Date(yearNumber, monthNumber, 1);
  let endDate = addMonthsToDate(startDate, 1);
  let firstQueryEnd = addDaysToDate(startDate, 16);

  let result = await Promise.all([
    new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await getPACActivePower(PACName, startDate, firstQueryEnd)
        );
      } catch (err) {
        return reject(err);
      }
    }),
    new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await getPACActivePower(PACName, firstQueryEnd, endDate)
        );
      } catch (err) {
        return reject(err);
      }
    })
  ]);
  let dataArray = [...result[0], ...result[1]];

  return dataArray;
}

export async function getPowerMonthly(year, month) {
  const getBreakerPowerAction = (breakerName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await getBreakerActivePowerMonthData(breakerName, year, month)
        );
      } catch (err) {
        return reject(err);
      }
    });
  };

  const getPACPowerAction = (PACName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await getPACActivePowerMonthData(PACName, year, month));
      } catch (err) {
        return reject(err);
      }
    });
  };

  let elementNames = [
    "1F1",
    "1F2",
    "1F3",
    "1F4",
    "1F5",
    "1F6",
    "1F7",
    "1FP1",
    "1FP2",
    "2F1",
    "2F2",
    "2F3",
    "2F4",
    "2F5",
    "2F6",
    "2FP1",
    "2FP2",
    "3F1",
    "3F2",
    "TR1",
    "TR2",
    "GEN"
  ];

  let allActions = [
    getBreakerPowerAction(elementNames[0], year, month),
    getBreakerPowerAction(elementNames[1], year, month),
    getBreakerPowerAction(elementNames[2], year, month),
    getBreakerPowerAction(elementNames[3], year, month),
    getBreakerPowerAction(elementNames[4], year, month),
    getBreakerPowerAction(elementNames[5], year, month),
    getBreakerPowerAction(elementNames[6], year, month),
    getBreakerPowerAction(elementNames[7], year, month),
    getBreakerPowerAction(elementNames[8], year, month),
    getBreakerPowerAction(elementNames[9], year, month),
    getBreakerPowerAction(elementNames[10], year, month),
    getBreakerPowerAction(elementNames[11], year, month),
    getBreakerPowerAction(elementNames[12], year, month),
    getBreakerPowerAction(elementNames[13], year, month),
    getBreakerPowerAction(elementNames[14], year, month),
    getBreakerPowerAction(elementNames[15], year, month),
    getBreakerPowerAction(elementNames[16], year, month),
    getBreakerPowerAction(elementNames[17], year, month),
    getBreakerPowerAction(elementNames[18], year, month),
    getPACPowerAction(elementNames[19], year, month),
    getPACPowerAction(elementNames[20], year, month),
    getPACPowerAction(elementNames[21], year, month)
  ];

  let allData = await Promise.all(allActions);

  let dataToReturn = {};

  //inserting breakers data - element 0 - 18
  for (let i = 0; i <= 18; i++) {
    let elementName = elementNames[i];
    let elementData = allData[i];
    dataToReturn[elementName] = {};

    for (let row of elementData) {
      let timestamp = row["_time"];
      let value = row[breakerActivePowerImportVariableName];
      if (exists(timestamp) && exists(value)) {
        let date = new Date(timestamp);
        dataToReturn[elementName][date.getTime()] = {
          date,
          value
        };
      }
    }
  }

  //inserting pac data - element 19 - 21
  for (let i = 19; i <= 21; i++) {
    let elementName = elementNames[i];
    let elementData = allData[i];
    dataToReturn[elementName] = {};

    for (let row of elementData) {
      let timestamp = row["_time"];
      let value = row[pacActivePowerImportVariableName];
      if (exists(timestamp) && exists(value)) {
        let date = new Date(timestamp);
        dataToReturn[elementName][date.getTime()] = {
          date,
          value
        };
      }
    }
  }

  return dataToReturn;
}

const convertPACBasicQualityData = aggregatedData => {
  let dailyData = {};

  let monthlyData = {
    CurrentL1: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    CurrentL2: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    CurrentL3: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    VoltageL1N: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    VoltageL2N: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    VoltageL3N: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    VoltageL1L2: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    VoltageL2L3: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    VoltageL3L1: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    }
  };

  let numberOfData = {
    CurrentL1: 0,
    CurrentL2: 0,
    CurrentL3: 0,
    VoltageL1N: 0,
    VoltageL2N: 0,
    VoltageL3N: 0,
    VoltageL1L2: 0,
    VoltageL2L3: 0,
    VoltageL3L1: 0
  };

  let sumOfData = {
    CurrentL1: 0,
    CurrentL2: 0,
    CurrentL3: 0,
    VoltageL1N: 0,
    VoltageL2N: 0,
    VoltageL3N: 0,
    VoltageL1L2: 0,
    VoltageL2L3: 0,
    VoltageL3L1: 0
  };

  let checkAndAssignData = (
    elementData,
    elementDate,
    elementNameInObjectToReturn
  ) => {
    if (exists(elementData)) {
      if (!exists(dailyData[elementDate]))
        dailyData[elementDate] = { time: new Date(elementDate) };

      dailyData[elementDate][elementNameInObjectToReturn] = {
        average: elementData.average,
        max: elementData.maxvalue,
        maxTime: new Date(elementData.maxtime),
        min: elementData.minvalue,
        minTime: new Date(elementData.mintime)
      };

      //Updating total calculations
      sumOfData[elementNameInObjectToReturn] += elementData.average;
      numberOfData[elementNameInObjectToReturn]++;

      if (
        !exists(monthlyData[elementNameInObjectToReturn].max) ||
        elementData.maxvalue > monthlyData[elementNameInObjectToReturn].max
      ) {
        monthlyData[elementNameInObjectToReturn].max = elementData.maxvalue;
        monthlyData[elementNameInObjectToReturn].maxTime = new Date(
          elementData.maxtime
        );
      }

      if (
        !exists(monthlyData[elementNameInObjectToReturn].min) ||
        elementData.minvalue < monthlyData[elementNameInObjectToReturn].min
      ) {
        monthlyData[elementNameInObjectToReturn].min = elementData.minvalue;
        monthlyData[elementNameInObjectToReturn].minTime = new Date(
          elementData.mintime
        );
      }
    }
  };

  let calculateAverage = elementNameToReturn => {
    if (numberOfData[elementNameToReturn] > 0)
      monthlyData[elementNameToReturn].average =
        sumOfData[elementNameToReturn] / numberOfData[elementNameToReturn];
  };

  for (let dayData of aggregatedData) {
    let startDate = new Date(dayData["starttime"]).getTime();

    let currentL1Data = dayData[pacCurrentL1VariableName];
    let currentL2Data = dayData[pacCurrentL2VariableName];
    let currentL3Data = dayData[pacCurrentL3VariableName];
    let voltageL1NData = dayData[pacVoltageL1NVariableName];
    let voltageL2NData = dayData[pacVoltageL2NVariableName];
    let voltageL3NData = dayData[pacVoltageL3NVariableName];
    let voltageL1L2Data = dayData[pacVoltageL1L2VariableName];
    let voltageL2L3Data = dayData[pacVoltageL2L3VariableName];
    let voltageL3L1Data = dayData[pacVoltageL3L1VariableName];

    checkAndAssignData(currentL1Data, startDate, "CurrentL1");
    checkAndAssignData(currentL2Data, startDate, "CurrentL2");
    checkAndAssignData(currentL3Data, startDate, "CurrentL3");
    checkAndAssignData(voltageL1NData, startDate, "VoltageL1N");
    checkAndAssignData(voltageL2NData, startDate, "VoltageL2N");
    checkAndAssignData(voltageL3NData, startDate, "VoltageL3N");
    checkAndAssignData(voltageL1L2Data, startDate, "VoltageL1L2");
    checkAndAssignData(voltageL2L3Data, startDate, "VoltageL2L3");
    checkAndAssignData(voltageL3L1Data, startDate, "VoltageL3L1");
  }

  calculateAverage("CurrentL1");
  calculateAverage("CurrentL2");
  calculateAverage("CurrentL3");
  calculateAverage("VoltageL1N");
  calculateAverage("VoltageL2N");
  calculateAverage("VoltageL3N");
  calculateAverage("VoltageL1L2");
  calculateAverage("VoltageL2L3");
  calculateAverage("VoltageL3L1");

  return { dailyData, monthlyData };
};

const convertPACAdvancedQualityData = aggregatedData => {
  let dailyData = {};

  let monthlyData = {
    THDCurrentL1: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDCurrentL2: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDCurrentL3: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDVoltageL1: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDVoltageL2: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDVoltageL3: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    UnbalanceVoltage: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    UnbalanceCurrent: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    }
  };

  let numberOfData = {
    THDCurrentL1: 0,
    THDCurrentL2: 0,
    THDCurrentL3: 0,
    THDVoltageL1: 0,
    THDVoltageL2: 0,
    THDVoltageL3: 0,
    UnbalanceVoltage: 0,
    UnbalanceCurrent: 0
  };

  let sumOfData = {
    THDCurrentL1: 0,
    THDCurrentL2: 0,
    THDCurrentL3: 0,
    THDVoltageL1: 0,
    THDVoltageL2: 0,
    THDVoltageL3: 0,
    UnbalanceVoltage: 0,
    UnbalanceCurrent: 0
  };

  let checkAndAssignData = (
    elementData,
    elementDate,
    elementNameInObjectToReturn
  ) => {
    if (exists(elementData)) {
      if (!exists(dailyData[elementDate]))
        dailyData[elementDate] = { time: new Date(elementDate) };

      dailyData[elementDate][elementNameInObjectToReturn] = {
        average: elementData.average,
        max: elementData.maxvalue,
        maxTime: new Date(elementData.maxtime),
        min: elementData.minvalue,
        minTime: new Date(elementData.mintime)
      };

      //Updating total calculations
      sumOfData[elementNameInObjectToReturn] += elementData.average;
      numberOfData[elementNameInObjectToReturn]++;

      if (
        !exists(monthlyData[elementNameInObjectToReturn].max) ||
        elementData.maxvalue > monthlyData[elementNameInObjectToReturn].max
      ) {
        monthlyData[elementNameInObjectToReturn].max = elementData.maxvalue;
        monthlyData[elementNameInObjectToReturn].maxTime = new Date(
          elementData.maxtime
        );
      }

      if (
        !exists(monthlyData[elementNameInObjectToReturn].min) ||
        elementData.minvalue < monthlyData[elementNameInObjectToReturn].min
      ) {
        monthlyData[elementNameInObjectToReturn].min = elementData.minvalue;
        monthlyData[elementNameInObjectToReturn].minTime = new Date(
          elementData.mintime
        );
      }
    }
  };

  let calculateAverage = elementNameToReturn => {
    if (numberOfData[elementNameToReturn] > 0)
      monthlyData[elementNameToReturn].average =
        sumOfData[elementNameToReturn] / numberOfData[elementNameToReturn];
  };

  for (let dayData of aggregatedData) {
    let startDate = new Date(dayData["starttime"]).getTime();

    let currentTHDL1Data = dayData[pacTHDIL1VariableName];
    let currentTHDL2Data = dayData[pacTHDIL2VariableName];
    let currentTHDL3Data = dayData[pacTHDIL3VariableName];
    let voltageTHDL1Data = dayData[pacTHDUL1VariableName];
    let voltageTHDL2Data = dayData[pacTHDUL2VariableName];
    let voltageTHDL3Data = dayData[pacTHDUL3VariableName];
    let unbalanceVoltageData = dayData[pacUnbalanceVoltageVariableName];
    let unbalanceCurrentData = dayData[pacUnbalanceCurrentVariableName];

    checkAndAssignData(currentTHDL1Data, startDate, "THDCurrentL1");
    checkAndAssignData(currentTHDL2Data, startDate, "THDCurrentL2");
    checkAndAssignData(currentTHDL3Data, startDate, "THDCurrentL3");
    checkAndAssignData(voltageTHDL1Data, startDate, "THDVoltageL1");
    checkAndAssignData(voltageTHDL2Data, startDate, "THDVoltageL2");
    checkAndAssignData(voltageTHDL3Data, startDate, "THDVoltageL3");
    checkAndAssignData(unbalanceVoltageData, startDate, "UnbalanceVoltage");
    checkAndAssignData(unbalanceCurrentData, startDate, "UnbalanceCurrent");
  }

  calculateAverage("THDCurrentL1");
  calculateAverage("THDCurrentL2");
  calculateAverage("THDCurrentL3");
  calculateAverage("THDVoltageL1");
  calculateAverage("THDVoltageL2");
  calculateAverage("THDVoltageL3");
  calculateAverage("UnbalanceVoltage");
  calculateAverage("UnbalanceCurrent");

  return { dailyData, monthlyData };
};

export async function getPACSupplyQualityMonthlyBasic(pacName, year, month) {
  let fromDate = new Date(year, month, 0);
  let numberOfDays = numberOfDaysInMonth(month, year);
  let toDate = new Date(
    fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
  );

  let agregatedData = await getAggregateData(
    assetIdRGPZO,
    getElement1sAspectName(pacName),
    [
      pacVoltageL1NVariableName,
      pacVoltageL2NVariableName,
      pacVoltageL3NVariableName,
      pacVoltageL1L2VariableName,
      pacVoltageL2L3VariableName,
      pacVoltageL3L1VariableName,
      pacCurrentL1VariableName,
      pacCurrentL2VariableName,
      pacCurrentL3VariableName
    ],
    fromDate.toISOString(),
    toDate.toISOString(),
    1,
    "day"
  );

  return convertPACBasicQualityData(agregatedData);
}

export async function getPACSupplyQualityMonthlyAdvanced(pacName, year, month) {
  let fromDate = new Date(year, month, 0);
  let numberOfDays = numberOfDaysInMonth(month, year);
  let toDate = new Date(
    fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
  );

  let agregatedData = await getAggregateData(
    assetIdRGPZO,
    getElement1minAspectName(pacName),
    [
      pacTHDIL1VariableName,
      pacTHDIL2VariableName,
      pacTHDIL3VariableName,
      pacTHDUL1VariableName,
      pacTHDUL2VariableName,
      pacTHDUL3VariableName,
      pacUnbalanceVoltageVariableName,
      pacUnbalanceCurrentVariableName
    ],
    fromDate.toISOString(),
    toDate.toISOString(),
    1,
    "day"
  );

  return convertPACAdvancedQualityData(agregatedData);
}

export async function getPACSupplyQualityMonthly(pacName, year, month) {
  let getBasicDataPromise = new Promise(async (resolve, reject) => {
    try {
      return resolve(
        await getPACSupplyQualityMonthlyBasic(pacName, year, month)
      );
    } catch (err) {
      return reject(err);
    }
  });

  let getAdvancedDataPromise = new Promise(async (resolve, reject) => {
    try {
      return resolve(
        await getPACSupplyQualityMonthlyAdvanced(pacName, year, month)
      );
    } catch (err) {
      return reject(err);
    }
  });

  let dataFromMS = await Promise.all([
    getBasicDataPromise,
    getAdvancedDataPromise
  ]);

  //Merging to datas into one
  let basicDataFromMS = dataFromMS[0];
  let advancedDataFromMS = dataFromMS[1];

  let dataToReturn = { dailyData: {}, monthlyData: {} };

  if (exists(basicDataFromMS.monthlyData)) {
    dataToReturn.monthlyData = {
      ...dataToReturn.monthlyData,
      ...basicDataFromMS.monthlyData
    };
  }

  if (exists(advancedDataFromMS.monthlyData)) {
    dataToReturn.monthlyData = {
      ...dataToReturn.monthlyData,
      ...advancedDataFromMS.monthlyData
    };
  }

  if (exists(basicDataFromMS.dailyData)) {
    let allTimes = Object.keys(basicDataFromMS.dailyData);

    for (let time of allTimes) {
      let dailyData = basicDataFromMS.dailyData[time];

      if (!exists(dataToReturn.dailyData[time]))
        dataToReturn.dailyData[time] = {};
      dataToReturn.dailyData[time] = {
        ...dataToReturn.dailyData[time],
        ...dailyData
      };
    }
  }

  if (exists(advancedDataFromMS.dailyData)) {
    let allTimes = Object.keys(advancedDataFromMS.dailyData);

    for (let time of allTimes) {
      let dailyData = advancedDataFromMS.dailyData[time];

      if (!exists(dataToReturn.dailyData[time]))
        dataToReturn.dailyData[time] = {};
      dataToReturn.dailyData[time] = {
        ...dataToReturn.dailyData[time],
        ...dailyData
      };
    }
  }

  return dataToReturn;
}

const convertBreakerBasicQualityData = aggregatedData => {
  let dailyData = {};

  let monthlyData = {
    CurrentL1: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    CurrentL2: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    CurrentL3: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    }
  };

  let numberOfData = {
    CurrentL1: 0,
    CurrentL2: 0,
    CurrentL3: 0
  };

  let sumOfData = {
    CurrentL1: 0,
    CurrentL2: 0,
    CurrentL3: 0
  };

  let checkAndAssignData = (
    elementData,
    elementDate,
    elementNameInObjectToReturn
  ) => {
    if (exists(elementData)) {
      if (!exists(dailyData[elementDate]))
        dailyData[elementDate] = { time: new Date(elementDate) };

      dailyData[elementDate][elementNameInObjectToReturn] = {
        average: elementData.average,
        max: elementData.maxvalue,
        maxTime: new Date(elementData.maxtime),
        min: elementData.minvalue,
        minTime: new Date(elementData.mintime)
      };

      //Updating total calculations
      sumOfData[elementNameInObjectToReturn] += elementData.average;
      numberOfData[elementNameInObjectToReturn]++;

      if (
        !exists(monthlyData[elementNameInObjectToReturn].max) ||
        elementData.maxvalue > monthlyData[elementNameInObjectToReturn].max
      ) {
        monthlyData[elementNameInObjectToReturn].max = elementData.maxvalue;
        monthlyData[elementNameInObjectToReturn].maxTime = new Date(
          elementData.maxtime
        );
      }

      if (
        !exists(monthlyData[elementNameInObjectToReturn].min) ||
        elementData.minvalue < monthlyData[elementNameInObjectToReturn].min
      ) {
        monthlyData[elementNameInObjectToReturn].min = elementData.minvalue;
        monthlyData[elementNameInObjectToReturn].minTime = new Date(
          elementData.mintime
        );
      }
    }
  };

  let calculateAverage = elementNameToReturn => {
    if (numberOfData[elementNameToReturn] > 0)
      monthlyData[elementNameToReturn].average =
        sumOfData[elementNameToReturn] / numberOfData[elementNameToReturn];
  };

  for (let dayData of aggregatedData) {
    let startDate = new Date(dayData["starttime"]).getTime();

    let currentL1Data = dayData[breakerCurrentL1VariableName];
    let currentL2Data = dayData[breakerCurrentL2VariableName];
    let currentL3Data = dayData[breakerCurrentL3VariableName];

    checkAndAssignData(currentL1Data, startDate, "CurrentL1");
    checkAndAssignData(currentL2Data, startDate, "CurrentL2");
    checkAndAssignData(currentL3Data, startDate, "CurrentL3");
  }

  calculateAverage("CurrentL1");
  calculateAverage("CurrentL2");
  calculateAverage("CurrentL3");

  return { dailyData, monthlyData };
};

const convertBreakerAdvancedQualityData = aggregatedData => {
  let dailyData = {};

  let monthlyData = {
    THDCurrentL1: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDCurrentL2: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    },
    THDCurrentL3: {
      average: null,
      max: null,
      maxTime: null,
      min: null,
      minTime: null
    }
  };

  let numberOfData = {
    THDCurrentL1: 0,
    THDCurrentL2: 0,
    THDCurrentL3: 0
  };

  let sumOfData = {
    THDCurrentL1: 0,
    THDCurrentL2: 0,
    THDCurrentL3: 0
  };

  let checkAndAssignData = (
    elementData,
    elementDate,
    elementNameInObjectToReturn
  ) => {
    if (exists(elementData)) {
      if (!exists(dailyData[elementDate]))
        dailyData[elementDate] = { time: new Date(elementDate) };

      dailyData[elementDate][elementNameInObjectToReturn] = {
        average: elementData.average,
        max: elementData.maxvalue,
        maxTime: new Date(elementData.maxtime),
        min: elementData.minvalue,
        minTime: new Date(elementData.mintime)
      };

      //Updating total calculations
      sumOfData[elementNameInObjectToReturn] += elementData.average;
      numberOfData[elementNameInObjectToReturn]++;

      if (
        !exists(monthlyData[elementNameInObjectToReturn].max) ||
        elementData.maxvalue > monthlyData[elementNameInObjectToReturn].max
      ) {
        monthlyData[elementNameInObjectToReturn].max = elementData.maxvalue;
        monthlyData[elementNameInObjectToReturn].maxTime = new Date(
          elementData.maxtime
        );
      }

      if (
        !exists(monthlyData[elementNameInObjectToReturn].min) ||
        elementData.minvalue < monthlyData[elementNameInObjectToReturn].min
      ) {
        monthlyData[elementNameInObjectToReturn].min = elementData.minvalue;
        monthlyData[elementNameInObjectToReturn].minTime = new Date(
          elementData.mintime
        );
      }
    }
  };

  let calculateAverage = elementNameToReturn => {
    if (numberOfData[elementNameToReturn] > 0)
      monthlyData[elementNameToReturn].average =
        sumOfData[elementNameToReturn] / numberOfData[elementNameToReturn];
  };

  for (let dayData of aggregatedData) {
    let startDate = new Date(dayData["starttime"]).getTime();

    let thdCurrentL1Data = dayData[breakerTHDIL1VariableName];
    let thdCurrentL2Data = dayData[breakerTHDIL2VariableName];
    let thdCurrentL3Data = dayData[breakerTHDIL3VariableName];

    checkAndAssignData(thdCurrentL1Data, startDate, "THDCurrentL1");
    checkAndAssignData(thdCurrentL2Data, startDate, "THDCurrentL2");
    checkAndAssignData(thdCurrentL3Data, startDate, "THDCurrentL3");
  }

  calculateAverage("THDCurrentL1");
  calculateAverage("THDCurrentL2");
  calculateAverage("THDCurrentL3");

  return { dailyData, monthlyData };
};

export async function getBreakerSupplyQualityMonthlyBasic(
  breakerName,
  year,
  month
) {
  let fromDate = new Date(year, month, 0);
  let numberOfDays = numberOfDaysInMonth(month, year);
  let toDate = new Date(
    fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
  );

  let agregatedData = await getAggregateData(
    assetIdRGPZO,
    getElement1sAspectName(breakerName),
    [
      breakerCurrentL1VariableName,
      breakerCurrentL2VariableName,
      breakerCurrentL3VariableName
    ],
    fromDate.toISOString(),
    toDate.toISOString(),
    1,
    "day"
  );

  return convertBreakerBasicQualityData(agregatedData);
}

export async function getBreakerSupplyQualityMonthlyAdvanced(
  breakerName,
  year,
  month
) {
  let fromDate = new Date(year, month, 0);
  let numberOfDays = numberOfDaysInMonth(month, year);
  let toDate = new Date(
    fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
  );

  let agregatedData = await getAggregateData(
    assetIdRGPZO,
    getElement1minAspectName(breakerName),
    [
      breakerTHDIL1VariableName,
      breakerTHDIL2VariableName,
      breakerTHDIL3VariableName
    ],
    fromDate.toISOString(),
    toDate.toISOString(),
    1,
    "day"
  );

  return convertBreakerAdvancedQualityData(agregatedData);
}

export async function getBreakerSupplyQualityMonthly(breakerName, year, month) {
  let getBasicDataPromise = new Promise(async (resolve, reject) => {
    try {
      return resolve(
        await getBreakerSupplyQualityMonthlyBasic(breakerName, year, month)
      );
    } catch (err) {
      return reject(err);
    }
  });

  let getAdvancedDataPromise = new Promise(async (resolve, reject) => {
    try {
      return resolve(
        await getBreakerSupplyQualityMonthlyAdvanced(breakerName, year, month)
      );
    } catch (err) {
      return reject(err);
    }
  });

  let dataFromMS = await Promise.all([
    getBasicDataPromise,
    getAdvancedDataPromise
  ]);

  //Merging to datas into one
  let basicDataFromMS = dataFromMS[0];
  let advancedDataFromMS = dataFromMS[1];

  let dataToReturn = { dailyData: {}, monthlyData: {} };

  if (exists(basicDataFromMS.monthlyData)) {
    dataToReturn.monthlyData = {
      ...dataToReturn.monthlyData,
      ...basicDataFromMS.monthlyData
    };
  }

  if (exists(advancedDataFromMS.monthlyData)) {
    dataToReturn.monthlyData = {
      ...dataToReturn.monthlyData,
      ...advancedDataFromMS.monthlyData
    };
  }

  if (exists(basicDataFromMS.dailyData)) {
    let allTimes = Object.keys(basicDataFromMS.dailyData);

    for (let time of allTimes) {
      let dailyData = basicDataFromMS.dailyData[time];

      if (!exists(dataToReturn.dailyData[time]))
        dataToReturn.dailyData[time] = {};
      dataToReturn.dailyData[time] = {
        ...dataToReturn.dailyData[time],
        ...dailyData
      };
    }
  }

  if (exists(advancedDataFromMS.dailyData)) {
    let allTimes = Object.keys(advancedDataFromMS.dailyData);

    for (let time of allTimes) {
      let dailyData = advancedDataFromMS.dailyData[time];

      if (!exists(dataToReturn.dailyData[time]))
        dataToReturn.dailyData[time] = {};
      dataToReturn.dailyData[time] = {
        ...dataToReturn.dailyData[time],
        ...dailyData
      };
    }
  }

  return dataToReturn;
}

export async function getSupplyQualityMonthly(year, month) {
  const getBreakerSupplyQuality = (breakerName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await getBreakerSupplyQualityMonthly(breakerName, year, month)
        );
      } catch (err) {
        return reject(err);
      }
    });
  };

  const getPACSupplyQuality = (PACName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await getPACSupplyQualityMonthly(PACName, year, month));
      } catch (err) {
        return reject(err);
      }
    });
  };

  let elementNames = [
    "1F1",
    "1F2",
    "1F3",
    "1F4",
    "1F5",
    "1F6",
    "1F7",
    "1FP1",
    "1FP2",
    "2F1",
    "2F2",
    "2F3",
    "2F4",
    "2F5",
    "2F6",
    "2FP1",
    "2FP2",
    "3F1",
    "3F2",
    "TR1",
    "TR2",
    "GEN"
  ];

  let allActions = [
    getBreakerSupplyQuality(elementNames[0], year, month),
    getBreakerSupplyQuality(elementNames[1], year, month),
    getBreakerSupplyQuality(elementNames[2], year, month),
    getBreakerSupplyQuality(elementNames[3], year, month),
    getBreakerSupplyQuality(elementNames[4], year, month),
    getBreakerSupplyQuality(elementNames[5], year, month),
    getBreakerSupplyQuality(elementNames[6], year, month),
    getBreakerSupplyQuality(elementNames[7], year, month),
    getBreakerSupplyQuality(elementNames[8], year, month),
    getBreakerSupplyQuality(elementNames[9], year, month),
    getBreakerSupplyQuality(elementNames[10], year, month),
    getBreakerSupplyQuality(elementNames[11], year, month),
    getBreakerSupplyQuality(elementNames[12], year, month),
    getBreakerSupplyQuality(elementNames[13], year, month),
    getBreakerSupplyQuality(elementNames[14], year, month),
    getBreakerSupplyQuality(elementNames[15], year, month),
    getBreakerSupplyQuality(elementNames[16], year, month),
    getBreakerSupplyQuality(elementNames[17], year, month),
    getBreakerSupplyQuality(elementNames[18], year, month),
    getPACSupplyQuality(elementNames[19], year, month),
    getPACSupplyQuality(elementNames[20], year, month),
    getPACSupplyQuality(elementNames[21], year, month)
  ];

  let allData = await Promise.all(allActions);

  let dataToReturn = {};

  //inserting elements data
  for (let i = 0; i < elementNames.length; i++) {
    let elementName = elementNames[i];
    let elementData = allData[i];
    dataToReturn[elementName] = elementData;
  }

  return dataToReturn;
}
