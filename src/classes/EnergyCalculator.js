import { exists } from "../utils/utilities";
import _ from "lodash";

const consumptionMinDelta = 1;

const energyGroups = {
  total: ["TR1", "TR2", "GEN"],
  building01: ["1F1", "2F3", "3F2", "1FP1", "2FP1"],
  building1: ["1F3", "1F4", "1F7", "2F1", "2F5", "1FP2", "2FP2"],
  building2: ["1F6", "2F2", "2F4", "3F1"],
  building3: ["1F2", "1F5"],
  parking: ["2F6"]
};

class EnergyCalculator {
  constructor() {
    this._data = null;
    this._transformersLosses = 0;
  }

  get Data() {
    return this._data;
  }

  init(data, transformersLosses) {
    this._data = data;
    this._transformersLosses = transformersLosses;
  }

  _getEnergyObjectsOfGroup(group) {
    return energyGroups[group];
  }

  get TransformersLosses() {
    return this._transformersLosses;
  }

  get AllEnergyGroups() {
    let allGroups = Object.keys(energyGroups);

    return allGroups;
  }

  get AllEnergyObjects() {
    let allEnergyObjects = [];

    for (let groupObjects of Object.values(energyGroups)) {
      allEnergyObjects = [...allEnergyObjects, ...groupObjects];
    }

    return allEnergyObjects;
  }

  getAllTimes() {
    let allTimes = [];

    for (let energyObject of this.AllEnergyObjects) {
      allTimes.push(Object.keys(this.Data[energyObject]));
    }

    let mergedTimes = _.merge(...allTimes);

    let intFilteredTimes = [];

    for (let time of mergedTimes) {
      let intTime = parseInt(time);
      if (this._validateDataPoint(time)) intFilteredTimes.push(intTime);
    }

    return intFilteredTimes.sort((a, b) => a - b);
  }

  _getDataPoint(time) {
    if (!this._validateDataPoint(time)) return null;

    let dataPointToReturn = {};

    for (let energyObject of this.AllEnergyObjects) {
      let dataPoints = this.Data[energyObject];

      dataPointToReturn[energyObject] = dataPoints[time];
    }

    return dataPointToReturn;
  }

  _validateDataPoint(time) {
    for (let energyObject of this.AllEnergyObjects) {
      let dataPoints = this.Data[energyObject];

      if (!exists(dataPoints)) return false;

      let dataPoint = dataPoints[time];

      if (!exists(dataPoint)) return false;
      if (!exists(dataPoint.activeEnergyExport)) return false;
      if (!exists(dataPoint.activeEnergyImport)) return false;
      if (!exists(dataPoint.reactiveEnergyExport)) return false;
      if (!exists(dataPoint.reactiveEnergyImport)) return false;
    }
    return true;
  }

  _calculateTrafoLosses = (fromDate, toDate) => {
    let timeDiff = toDate - fromDate;

    return 1000 * (timeDiff / (1000 * 60 * 60)) * this.TransformersLosses;
  };

  getEnergyGroupCounters = time => {
    let point = this._getDataPoint(time);
    if (!exists(point)) return null;
    let pointToReturn = {};

    for (let group of this.AllEnergyGroups) {
      let counterValue = {
        activeEnergyExport: 0,
        activeEnergyImport: 0,
        reactiveEnergyExport: 0,
        reactiveEnergyImport: 0
      };

      for (let energyObject of this._getEnergyObjectsOfGroup(group)) {
        counterValue.activeEnergyExport +=
          point[energyObject].activeEnergyExport;
        counterValue.activeEnergyImport +=
          point[energyObject].activeEnergyImport;
        counterValue.reactiveEnergyExport +=
          point[energyObject].reactiveEnergyExport;
        counterValue.reactiveEnergyImport +=
          point[energyObject].reactiveEnergyImport;
      }

      pointToReturn[group] = counterValue;
    }

    return pointToReturn;
  };

  getTotalConsumption = () => {
    let allTimes = this.getAllTimes();
    return this.getConsumption(allTimes[0], allTimes[allTimes.length - 1]);
  };

  getConsumption = (fromDate, toDate) => {
    let allTimes = this.getAllTimes();
    let filteredTime = allTimes.filter(
      time => time >= fromDate && time <= toDate
    );
    if (filteredTime.length <= 1) return {};

    let initialCounters = this.getEnergyGroupCounters(filteredTime[0]);
    let endCounters = this.getEnergyGroupCounters(
      filteredTime[filteredTime.length - 1]
    );

    let countersToReturn = {};

    let calculatedTotalConsumption = {
      activeEnergyImport: 0,
      activeEnergyExport: 0,
      reactiveEnergyImport: 0,
      reactiveEnergyExport: 0,
      powerFactorImport: 0,
      powerFactorExport: 0
    };

    for (let group of this.AllEnergyGroups) {
      let groupInitialCounter = initialCounters[group];
      let groupEndCounter = endCounters[group];

      let groupConsumption = {
        activeEnergyImport:
          groupEndCounter.activeEnergyImport -
          groupInitialCounter.activeEnergyImport,
        activeEnergyExport:
          groupEndCounter.activeEnergyExport -
          groupInitialCounter.activeEnergyExport,
        reactiveEnergyImport:
          groupEndCounter.reactiveEnergyImport -
          groupInitialCounter.reactiveEnergyImport,
        reactiveEnergyExport:
          groupEndCounter.reactiveEnergyExport -
          groupInitialCounter.reactiveEnergyExport,
        powerFactorImport: 0,
        powerFactorExport: 0
      };

      if (Math.abs(groupConsumption.activeEnergyImport) < consumptionMinDelta)
        groupConsumption.activeEnergyImport = 0;

      if (Math.abs(groupConsumption.activeEnergyExport) < consumptionMinDelta)
        groupConsumption.activeEnergyExport = 0;

      if (Math.abs(groupConsumption.reactiveEnergyImport) < consumptionMinDelta)
        groupConsumption.reactiveEnergyImport = 0;

      if (Math.abs(groupConsumption.reactiveEnergyExport) < consumptionMinDelta)
        groupConsumption.reactiveEnergyExport = 0;

      if (Math.abs(groupConsumption.reactiveEnergyExport) < consumptionMinDelta)
        groupConsumption.reactiveEnergyExport = 0;

      countersToReturn[group] = groupConsumption;

      let apparentEnergyConsumptionImport = Math.sqrt(
        groupConsumption.activeEnergyImport *
          groupConsumption.activeEnergyImport +
          groupConsumption.reactiveEnergyImport *
            groupConsumption.reactiveEnergyImport
      );
      let apparentEnergyConsumptionExport = Math.sqrt(
        groupConsumption.activeEnergyImport *
          groupConsumption.activeEnergyImport +
          groupConsumption.reactiveEnergyExport *
            groupConsumption.reactiveEnergyExport
      );

      if (apparentEnergyConsumptionImport !== 0)
        groupConsumption.powerFactorImport =
          groupConsumption.activeEnergyImport / apparentEnergyConsumptionImport;

      if (apparentEnergyConsumptionExport !== 0)
        groupConsumption.powerFactorExport =
          groupConsumption.activeEnergyImport / apparentEnergyConsumptionExport;

      if (group !== "total") {
        calculatedTotalConsumption.activeEnergyImport +=
          groupConsumption.activeEnergyImport;
        calculatedTotalConsumption.activeEnergyExport +=
          groupConsumption.activeEnergyExport;
        calculatedTotalConsumption.reactiveEnergyImport +=
          groupConsumption.reactiveEnergyImport;
        calculatedTotalConsumption.reactiveEnergyExport +=
          groupConsumption.reactiveEnergyExport;
      }
    }

    countersToReturn["rest"] = {
      activeEnergyImport:
        countersToReturn.total.activeEnergyImport -
        calculatedTotalConsumption.activeEnergyImport,
      activeEnergyExport:
        countersToReturn.total.activeEnergyExport -
        calculatedTotalConsumption.activeEnergyExport,
      reactiveEnergyImport:
        countersToReturn.total.reactiveEnergyImport -
        calculatedTotalConsumption.reactiveEnergyImport,
      reactiveEnergyExport:
        countersToReturn.total.reactiveEnergyExport -
        calculatedTotalConsumption.reactiveEnergyExport,
      powerFactorImport: 0,
      powerFactorExport: 0
    };

    let apparentEnergyConsumptionImport = Math.sqrt(
      countersToReturn["rest"].activeEnergyImport *
        countersToReturn["rest"].activeEnergyImport +
        countersToReturn["rest"].reactiveEnergyImport *
          countersToReturn["rest"].reactiveEnergyImport
    );
    let apparentEnergyConsumptionExport = Math.sqrt(
      countersToReturn["rest"].activeEnergyImport *
        countersToReturn["rest"].activeEnergyImport +
        countersToReturn["rest"].reactiveEnergyExport *
          countersToReturn["rest"].reactiveEnergyExport
    );

    if (apparentEnergyConsumptionImport !== 0)
      countersToReturn["rest"].powerFactorImport =
        countersToReturn["rest"].activeEnergyImport /
        apparentEnergyConsumptionImport;

    if (apparentEnergyConsumptionExport !== 0)
      countersToReturn["rest"].powerFactorExport =
        countersToReturn["rest"].activeEnergyImport /
        apparentEnergyConsumptionExport;

    let trafoConsumption = this._calculateTrafoLosses(
      filteredTime[0],
      filteredTime[filteredTime.length - 1]
    );

    countersToReturn["total"].activeEnergyImport += trafoConsumption;
    countersToReturn["transformers"] = {
      activeEnergyImport: trafoConsumption
    };

    let trafoApparentEnergyConsumptionImport = Math.sqrt(
      countersToReturn["total"].activeEnergyImport *
        countersToReturn["total"].activeEnergyImport +
        countersToReturn["total"].reactiveEnergyImport *
          countersToReturn["total"].reactiveEnergyImport
    );
    let trafoApparentEnergyConsumptionExport = Math.sqrt(
      countersToReturn["total"].activeEnergyImport *
        countersToReturn["total"].activeEnergyImport +
        countersToReturn["total"].reactiveEnergyExport *
          countersToReturn["total"].reactiveEnergyExport
    );

    if (trafoApparentEnergyConsumptionImport !== 0)
      countersToReturn["total"].powerFactorImport =
        countersToReturn["total"].activeEnergyImport /
        trafoApparentEnergyConsumptionImport;

    if (trafoApparentEnergyConsumptionExport !== 0)
      countersToReturn["total"].powerFactorExport =
        countersToReturn["total"].activeEnergyImport /
        trafoApparentEnergyConsumptionExport;

    return countersToReturn;
  };

  getConsumptionsPerDay() {
    let allTimes = this.getAllTimes();

    let valuesToReturn = {};

    for (let i = 0; i < allTimes.length - 1; i++) {
      let currentTime = allTimes[i];
      let nextTime = allTimes[i + 1];

      if (nextTime - currentTime === 24 * 60 * 60 * 1000)
        valuesToReturn[currentTime] = this.getConsumption(
          currentTime,
          nextTime
        );
    }

    return valuesToReturn;
  }
}

export default EnergyCalculator;
