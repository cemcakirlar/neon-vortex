import ReactGA from "react-ga4";
import { runtimeConfig } from "../config/runtime";

let initialized = false;

const canSend = (): boolean => runtimeConfig.analyticsEnabled && runtimeConfig.measurementId.length > 0;

export const initTelemetry = () => {
  if (!canSend() || initialized) return;
  ReactGA.initialize(runtimeConfig.measurementId);
  initialized = true;
};

export const trackPageView = (page: string, title?: string) => {
  if (!canSend() || !initialized) return;
  ReactGA.send({ hitType: "pageview", page, title });
};

export const trackEvent = (eventName: string, params?: Record<string, string | number | boolean>) => {
  if (!canSend() || !initialized) return;
  ReactGA.event(eventName, params);
};
