import {Api} from "./metrics-api";

export const metricApiClient = new Api({
    baseUrl: "http://localhost:7070",
});