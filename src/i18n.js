import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  pl: {
    translation: {
      //overview
      overview: "Przegląd",
      //elevation
      elevation: "Elewacja",
      elevationClosedShort: "Zał.",
      elevationClosedLong: "Załączony",
      elevationOpenShort: "Wył.",
      elevationOpenLong: "Wyłączony",
      elevationTrippedShort: "Wyzw.",
      elevationTrippedLong: "Wyzwolony",
      //events
      events: "Zdarzenia",
      event: "Zdarzenie",
      eventsDevice: "Urządzenie",
      eventsTime: "Czas",
      eventsSearch: "Szukaj",
      eventsRows: "wierszy",
      eventsFrom: "z",
      eventsFirstPage: "Pierwsza strona",
      eventsLastPage: "Ostatnia strona",
      eventsNextPage: "Następna strona",
      eventsPreviousPage: "Poprzednia strona",
      eventsNoData: "Brak danych",
      //powermonitor
      powermonitor: "Strażnik mocy",
      powermonitorAlarmLabel: "Granica alarmu",
      powermonitorWarningLabel: "Granica ostrzeżenia",
      powermonitorStepsLabel: "Zużycie energii",
      powermonitorPredictedStepsLabel: "Przewidywane zużycie",
      powermonitorEnergyTrendYAxisLabel: "Zużycie energii [kWh]",
      powermonitorEnergyTrendXAxisLabel: "Czas",
      powermonitorBottomNavigationOverview: "Strażnik mocy",
      powermonitorBottomNavigationPowerTrend: "Moc 15-min",
      powermonitorBottomNavigationSettings: "Ustawienia",
      powermonitorDetailsCurrentInterval: "Aktualny okres 15-minutowy",
      powermonitorDetailsMeteredPower: "Zarejestrowane moce średnie",
      powermonitorDetailsMinute: "Minuta",
      powermonitorDetailsTotalPredictedPower: "Przewidywana moc ",
      powermonitorDetailsWarningLimit: "Próg ostrzeżenia ",
      powermonitorDetailsAlarmLimit: "Próg alamowy ",
      powermonitorSettingsTitle: "Ustawienia",
      powermonitorSettingsAlarmLimit: "Próg alamowy [kW]",
      powermonitorSettingsWarningLimit: "Próg ostrzeżenia [kW]",
      powermonitorSettingsTrafoLossesLimit:
        "Straty mocy na transformatorach [kW]",
      powermonitorSettingsActive: "Strażnik mocy włączony",
      powermonitorSettingsSendingEventsEnabled: "Wysyłanie zdarzeń włączone",
      powermonitorSettingsSendingEmailsEnabled: "Wysyłanie email włączone",
      powermonitorSettingsConfirmButton: "ZAPISZ",
      powermonitorSettingsResetButton: "RESETUJ",
      powermonitorSettingsEmailListTitle: "Lista mailowa",
      powermonitorSettingsAddRecipientButton: "DODAJ ADRES",
      powermonitorNewRecipientDialogTitle: "Dodaj nowy adres",
      powermonitorNewRecipientDialogLabel: "Adres email",
      powermonitorNewRecipientDialogAddButton: "DODAJ ADRES",
      powermonitorNewRecipientDialogCancelButton: "ANULUJ",
      powermonitorPower15TrendTitle:
        "Przebieg średnich wartości mocy czynnej 15-min",
      powermonitorPower15TrendYAxis: "Średnia moc czynna [kW]",
      powermonitorPower15AlarmLineLabel: "Próg alarmowy [kW]",
      powermonitorPower15WarningLineLabel: "Próg ostrzeżenia [kW]",
      powermonitorPower15ValidPointsLabel: "Moc czynna 15-min [kW]",
      powermonitorPower15WarningPointsLabel:
        "Moc czynna 15-min [kW] - ostrzezenie",
      powermonitorPower15AlarmPointsLabel: "Moc czynna 15-min [kW] - alarm",
      powermonitorPower15MonthLabel: "Miesiąc",
      powermonitorPower15YearLabel: "Rok",
      powermonitorPower15MaxValueLabel: "Wartość maksymalna",

      powermonitorPower15TableTitle: "Przekroczenia mocy",
      powermonitorPower15TableDateColumn: "Data i czas",
      powermonitorPower15TableValueColumn: "Moc [kW]",
      powermonitorPower15TableTransgressionColumn: "Przekroczenie [kW]",
      powermonitorPower15TableSeverityColumn: "Alarm/ostrzeżenie",
      powermonitorPower15TablePaginationFrom: "z",
      powermonitorPower15TablePaginationRows: "wierszy",
      powermonitorPower15TablePaginationPreviousPage: "Poprzednia strona",
      powermonitorPower15TablePaginationNextPage: "Następna strona",
      powermonitorPower15TablePaginationFirstPage: "Pierwsza strona",
      powermonitorPower15TablePaginationLastPage: "Ostatnia strona",
      powermonitorPower15TableExportTitle: "Eksportuj",
      powermonitorPower15TableExportAriaLabel: "Eksportuj",
      powermonitorPower15TableExportName: "Eksportuj do CSV",
      powermonitorPower15TableDataEmpty: "Brak danych",
      powermonitorPower15TableSeverityAlert: "Alarm",
      powermonitorPower15TableSeverityWarning: "Ostrzeżenie",
      powermonitorNotReadyLabel:
        "Strażnik mocy nie jest gotowy! Zaczekaj do zakończenia aktualnego okresu 15-minutowego",

      //slideUpDialog
      slideUpDialogTabOverview: "Przegląd",
      slideUpDialogTabVoltage: "Napięcie",
      slideUpDialogTabCurrent: "Prąd",
      slideUpDialogTabPower: "Moc",
      slideUpDialogBreakerStateTitle: "Stan wyłącznika",
      slideUpDialogBreakerStateClosed: "Załączony",
      slideUpDialogBreakerStateOpen: "Wyłączony",
      slideUpDialogLastTripTitle: "Ostatnie wyzwolenie",
      slideUpDialogLastTripReason: "Przyczyna ostatniego wyzwolenia",
      slideUpDialogActivePower: "Moc czynna",
      slideUpDialogReactivePower: "Moc bierna",
      slideUpDialogApparentPower: "Moc pozorna",
      slideUpDialogCosTotal: "Cos Total",
      slideUpDialogTitlebarBreaker: "Wyłącznik",
      slideUpDialogTooltipShowCurrentChart: "Pokaż wykres prądów",
      slideUpDialogTooltipShowPowerChart: "Pokaż wykres mocy",
      slideUpDialogTooltipBackToPreview: "Powrót",
      slideUpDialogTooltipRewindLeft: "Przewiń w lewo",
      slideUpDialogTooltipRewindRight: "Przewiń w prawo",
      slideUpDialogTooltipZoomIn: "Przybliż",
      slideUpDialogTooltipZoomOut: "Oddal",
      slideUpDialogCircuitSection: "Sekcja",
      slideUpDialogCircuitTransformer: "Transformator",
      //languageDialog
      languageDialogTitle: "Zmiana języka aplikacji",
      languageDialogText:
        "Aplikacja na podstawie różnych ustawień przeglądarki automatycznie dopasowuje język. Za pomocą przycisków można te ustawienia nadpisać.",
      languageDialogPolishLanguage: "Polski",
      languageDialogEnglishLanguage: "Angielski",
      //sidebar
      language: "Język",
      //chart labels and settings,
      chartYaxis: "Wartości",
      chartXaxis: "Czas",
      chartSettings: "Ustawienia",
      chartDataPickerTitle: "Data",
      chartRealtimeUpdate: "Odświeżanie na żywo",
      //chart variable names
      voltageL1L2: "Napięcie L1-L2",
      voltageL1N: "Napięcie L1-N",
      voltageL2L3: "Napięcie L2-L3",
      voltageL2N: "Napięcie L2-N",
      voltageL3L1: "Napięcie L3-L1",
      voltageL3N: "Napięcie L3-N",
      currentL1: "Prąd L1",
      currentL2: "Prąd L2",
      currentL3: "Prąd L3"
    }
  },
  en: {
    translation: {
      //overview
      overview: "Overview",
      //elevation
      elevation: "Elevation",
      elevationClosedShort: "Clsd.",
      elevationClosedLong: "Closed",
      elevationOpenShort: "Open",
      elevationOpenLong: "Open",
      elevationTrippedShort: "Trpd.",
      elevationTrippedLong: "Tripped",
      //powermonitor
      powermonitor: "Load monitoring",
      powermonitorAlarmLabel: "Alarm limit",
      powermonitorWarningLabel: "Warning limit",
      powermonitorStepsLabel: "Energy cunsumption",
      powermonitorPredictedStepsLabel: "Predicted consumption",
      powermonitorEnergyTrendYAxisLabel: "Energy consumption [kWh]",
      powermonitorEnergyTrendXAxisLabel: "Time",
      powermonitorBottomNavigationOverview: "Load monitoring",
      powermonitorBottomNavigationPowerTrend: "Power 15-min",
      powermonitorBottomNavigationSettings: "Settings",
      powermonitorDetailsCurrentInterval: "Current 15-minute interval",
      powermonitorDetailsMinute: "Minute",
      powermonitorDetailsMeteredPower: "Registered 15-minute powers",
      powermonitorDetailsTotalPredictedPower: "Predicted power",
      powermonitorDetailsWarningLimit: "Warning limit ",
      powermonitorDetailsAlarmLimit: "Alarm limit ",
      powermonitorSettingsTitle: "Settings",
      powermonitorSettingsAlarmLimit: "Alarm limit [kW]",
      powermonitorSettingsWarningLimit: "Warning limit [kW]",
      powermonitorSettingsTrafoLossesLimit: "Transformers power loss [kW]",
      powermonitorSettingsActive: "Load monitoring enabled",
      powermonitorSettingsSendingEventsEnabled: "Sending events enabled",
      powermonitorSettingsSendingEmailsEnabled: "Sending emails enabled",
      powermonitorSettingsConfirmButton: "CONFIRM",
      powermonitorSettingsResetButton: "RESET",
      powermonitorSettingsEmailListTitle: "Mailing list",
      powermonitorSettingsAddRecipientButton: "ADD RECIPIENT",
      powermonitorNewRecipientDialogTitle: "Add new recipient",
      powermonitorNewRecipientDialogLabel: "Email adress",
      powermonitorNewRecipientDialogAddButton: "ADD RECIPIENT",
      powermonitorNewRecipientDialogCancelButton: "CANCEL",
      powermonitorPower15TrendTitle: "Average active power 15-min",
      powermonitorPower15TrendYAxis: "Average active power [kW]",
      powermonitorPower15AlarmLineLabel: "Alert limit [kW]",
      powermonitorPower15WarningLineLabel: "Warning limit [kW]",
      powermonitorPower15ValidPointsLabel: "Active power 15-min [kW]",
      powermonitorPower15WarningPointsLabel:
        "Active power 15-min [kW] - above warning",
      powermonitorPower15AlarmPointsLabel:
        "Active power 15-min [kW] - above alarm",
      powermonitorPower15MonthLabel: "Month",
      powermonitorPower15YearLabel: "Year",
      powermonitorPower15MaxValueLabel: "Maximum value",

      powermonitorPower15TableTitle: "Power transgressions",
      powermonitorPower15TableDateColumn: "Date and time",
      powermonitorPower15TableValueColumn: "Power [kW]",
      powermonitorPower15TableTransgressionColumn: "Transgression [kW]",
      powermonitorPower15TableSeverityColumn: "Alarm/warining",
      powermonitorPower15TablePaginationFrom: "of",
      powermonitorPower15TablePaginationRows: "rows",
      powermonitorPower15TablePaginationPreviousPage: "Previous page",
      powermonitorPower15TablePaginationNextPage: "Next page",
      powermonitorPower15TablePaginationFirstPage: "First page",
      powermonitorPower15TablePaginationLastPage: "Last page",
      powermonitorPower15TableExportTitle: "Export",
      powermonitorPower15TableExportAriaLabel: "Export",
      powermonitorPower15TableExportName: "Export as CSV",
      powermonitorPower15TableDataEmpty: "No data",
      powermonitorPower15TableSeverityAlert: "Alarm",
      powermonitorPower15TableSeverityWarning: "Warninig",

      powermonitorNotReadyLabel:
        "Load monitoring is not ready! Wait for the next 15-minute interval...",
      //events
      events: "Events",
      event: "Event",
      eventsDevice: "Device",
      eventsTime: "Time",
      eventsSearch: "Search",
      eventsRows: "Rows",
      eventsFrom: "from",
      eventsFirstPage: "First page",
      eventsLastPage: "Last page",
      eventsNextPage: "Next page",
      eventsPreviousPage: "Previous page",
      eventsNoData: "No data",
      //slideUpDialog
      slideUpDialogTabOverview: "Overview",
      slideUpDialogTabVoltage: "Voltage",
      slideUpDialogTabCurrent: "Current",
      slideUpDialogTabPower: "Power",
      slideUpDialogBreakerStateTitle: "Switching device state",
      slideUpDialogBreakerStateClosed: "Closed",
      slideUpDialogBreakerStateOpen: "Open",
      slideUpDialogLastTripTitle: "Last trip",
      slideUpDialogLastTripReason: "Last trip reason",
      slideUpDialogActivePower: "Active power",
      slideUpDialogReactivePower: "Reactive power",
      slideUpDialogApparentPower: "Apparent power",
      slideUpDialogCosTotal: "Cos Total",
      slideUpDialogTitlebarBreaker: "Circuit breaker",
      slideUpDialogTooltipShowCurrentChart: "Show current chart",
      slideUpDialogTooltipShowPowerChart: "Show power chart",
      slideUpDialogTooltipBackToPreview: "Back",
      slideUpDialogTooltipRewindLeft: "Rewind left",
      slideUpDialogTooltipRewindRight: "Rewind right",
      slideUpDialogTooltipZoomIn: "Zoom in",
      slideUpDialogTooltipZoomOut: "Zoom out",
      slideUpDialogCircuitSection: "Section",
      slideUpDialogCircuitTransformer: "Transformer",
      //languageDialog
      languageDialogTitle: "Change application language",
      languageDialogText:
        "Based on various browser's settings, application automatically sets language. You can override this setting using buttons below.",
      languageDialogPolishLanguage: "Polish",
      languageDialogEnglishLanguage: "English",
      //sidebar
      language: "Language",
      //chart labels and settings,
      chartYaxis: "Values",
      chartXaxis: "Time",
      chartSettings: "Settings",
      chartDataPickerTitle: "Date",
      chartRealtimeUpdate: "Live updating",
      //chart variable names
      voltageL1L2: "Voltage L1-L2",
      voltageL1N: "Voltage L1-N",
      voltageL2L3: "Voltage L2-L3",
      voltageL2N: "Voltage L2-N",
      voltageL3L1: "Voltage L3-L1",
      voltageL3N: "Voltage L3-N",
      currentL1: "Prąd L1",
      currentL2: "Prąd L2",
      currentL3: "Prąd L3"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      // order and from where user language should be detected
      order: [
        "navigator",
        "cookie",
        "querystring",
        "localStorage",
        "htmlTag",
        "path",
        "subdomain"
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: "myDomain",

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement
    },
    resources,
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
