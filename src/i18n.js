import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
    pl: {
        translation: {
            //overview
            "overview": "Przegląd",
            //elevation
            "elevation": "Elewacja",
            "elevationClosedShort": "Zał.",
            "elevationClosedLong": "Załączony",
            "elevationOpenShort": "Wył.",
            "elevationOpenLong": "Wyłączony",
            //events
            "events": "Zdarzenia",
            "event": "Zdarzenie",
            "eventsDevice": "Urządzenie",
            "eventsTime": "Czas",
            "eventsSearch": "Szukaj",
            "eventsRows": "wierszy",
            "eventsFrom": "z",
            "eventsFirstPage": "Pierwsza strona",
            "eventsLastPage": "Ostatnia strona",
            "eventsNextPage": "Następna strona",
            "eventsPreviousPage": "Poprzednia strona",
            "eventsNoData": "Brak danych",
            //slideUpDialog
            "slideUpDialogTabOverview": "Przegląd",
            "slideUpDialogTabVoltage": "Napięcie",
            "slideUpDialogTabCurrent": "Prąd",
            "slideUpDialogTabPower": "Moc",
            "slideUpDialogBreakerStateTitle": "Stan wyłącznika",
            "slideUpDialogBreakerStateClosed": "Załączony",
            "slideUpDialogBreakerStateOpen": "Wyłączony",
            "slideUpDialogLastTripTitle": "Ostatnie wyzwolenie",
            "slideUpDialogLastTripReason": "Przyczyna ostatniego wyzwolenia",
            "slideUpDialogActivePower": "Moc czynna",
            "slideUpDialogReactivePower": "Moc bierna",
            "slideUpDialogApparentPower": "Moc pozorna",
            "slideUpDialogCosTotal": "Cos Total",
            "slideUpDialogTitlebarBreaker": "Wyłącznik",
            "slideUpDialogTooltipShowCurrentChart": "Pokaż wykres prądów",
            "slideUpDialogTooltipShowPowerChart": "Pokaż wykres mocy",
            "slideUpDialogTooltipBackToPreview": "Powrót",
            "slideUpDialogTooltipRewindLeft": "Przewiń w lewo",
            "slideUpDialogTooltipRewindRight": "Przewiń w prawo",
            "slideUpDialogTooltipZoomIn": "Przybliż",
            "slideUpDialogTooltipZoomOut": "Oddal",
            "slideUpDialogCircuitSection": "Sekcja",
            "slideUpDialogCircuitTransformer": "Transformator",
            //languageDialog
            "languageDialogTitle": "Zmiana języka aplikacji",
            "languageDialogText": "Aplikacja na podstawie różnych ustawień przeglądarki automatycznie dopasowuje język. Za pomocą przycisków można te ustawienia nadpisać.",
            "languageDialogPolishLanguage": "Polski",
            "languageDialogEnglishLanguage": "Angielski",
            //sidebar
            "language": "Język",

        }
    },
    en: {
        translation: {
            //overview
            "overview": "Overview",
            //elevation
            "elevation": "Elevation",
            "elevationClosedShort": "Clsd.",
            "elevationClosedLong": "Closed",
            "elevationOpenShort": "Open",
            "elevationOpenLong": "Open",
            //events
            "events": "Events",
            "event": "Event",
            "eventsDevice": "Device",
            "eventsTime": "Time",
            "eventsSearch": "Search",
            "eventsRows": "Rows",
            "eventsFrom": "from",
            "eventsFirstPage": "First page",
            "eventsLastPage": "Last page",
            "eventsNextPage": "Next page",
            "eventsPreviousPage": "Previous page",
            "eventsNoData": "No data",
            //slideUpDialog
            "slideUpDialogTabOverview": "Overview",
            "slideUpDialogTabVoltage": "Voltage",
            "slideUpDialogTabCurrent": "Current",
            "slideUpDialogTabPower": "Power",
            "slideUpDialogBreakerStateTitle": "Switching device state",
            "slideUpDialogBreakerStateClosed": "Closed",
            "slideUpDialogBreakerStateOpen": "Open",
            "slideUpDialogLastTripTitle": "Last trip",
            "slideUpDialogLastTripReason": "Last trip reason",
            "slideUpDialogActivePower": "Active power",
            "slideUpDialogReactivePower": "Reactive power",
            "slideUpDialogApparentPower": "Apparent power",
            "slideUpDialogCosTotal": "Cos Total",
            "slideUpDialogTitlebarBreaker": "Circuit breaker",
            "slideUpDialogTooltipShowCurrentChart": "Show current chart",
            "slideUpDialogTooltipShowPowerChart": "Show power chart",
            "slideUpDialogTooltipBackToPreview": "Back",
            "slideUpDialogTooltipRewindLeft": "Rewind left",
            "slideUpDialogTooltipRewindRight": "Rewind right",
            "slideUpDialogTooltipZoomIn": "Zoom in",
            "slideUpDialogTooltipZoomOut": "Zoom out",
            "slideUpDialogCircuitSection": "Section",
            "slideUpDialogCircuitTransformer": "Transformer",
            //languageDialog
            "languageDialogTitle": "Change application language",
            "languageDialogText": "Based on various browser's settings, application automatically sets language. You can override this setting using buttons below.",
            "languageDialogPolishLanguage": "Polish",
            "languageDialogEnglishLanguage": "English",
            //sidebar
            "language": "Language",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        detection: {
            // order and from where user language should be detected
            order: ['navigator', 'cookie', 'querystring', 'localStorage', 'htmlTag', 'path', 'subdomain'],

            // keys or params to lookup language from
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,

            // cache user language on
            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

            // optional expire and domain for set cookie
            cookieMinutes: 10,
            cookieDomain: 'myDomain',

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