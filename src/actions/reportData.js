export const CHANGE_REPORT_PAGE = "CHANGE_REPORT_PAGE";

export const changeReportPageActionCreator = function(pageNumber) {
  return {
    type: CHANGE_REPORT_PAGE,
    payload: {
      pageNumber
    }
  };
};
