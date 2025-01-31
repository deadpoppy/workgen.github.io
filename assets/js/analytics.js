import {getCLS, getFID, getLCP} from 'web-vitals';

const reportWebVitals = (metric) => {
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/api/web-vitals', body);
};

getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals); 