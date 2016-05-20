/* globals Raven */
Raven.config('https://7562be28894b443a89f16d2b8fe5c209@app.getsentry.com/78897', {
  release: process.env.APP_VERSION,
}).install();

// const handleError = (e) => {
//   e.preventDefault();
//   if (process.env.NODE_ENV === 'production') {
//     //Do Real Error Reporting
//     console.error('[LOGGING_TO_SENTRY]', e);
//   } else {
//     alert('[Uncaught Error] Fix or it will be reported.', e.error);
//   }
// }
//
// window.onerror = () => {};
// window.addEventListener('error', handleError);

// // NOTE: event name is all lower case as per DOM convention
window.addEventListener('unhandledrejection', (e) => {
  // "unhandledrejection": http://bluebirdjs.com/docs/api/promise.onpossiblyunhandledrejection.html
  // NOTE: e.preventDefault() must be manually called to prevent the default
  // action which is currently to log the stack trace to console.warn
  e.preventDefault();

  // NOTE: parameters are properties of the event detail property
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
  const reason = e.detail.reason;
  const promise = e.detail.promise;

  promise.catch((e) => {
    throw e;
  }).done();
  if (process.env.NODE_ENV === 'production') {
    // Do Real Error Reporting.
  } else {
    //console.error('[unhandledrejection] UNCAUGHT_ERROR! Fix or it will be reported.', reason, reason.stack);
  }
});

//NOTE: event name is all lower case as per DOM convention
// window.addEventListener('rejectionhandled', (e) => {
//   // "rejectionhandled" (corresponds to the local Promise.onUnhandledRejectionHandled)
//   // NOTE: e.preventDefault() must be manually called prevent the default
//   // action which is currently unset (but might be set to something in the future)
//   e.preventDefault();
//
//   // NOTE: parameters are properties of the event detail property
//   // See Promise.onUnhandledRejectionHandled for parameter documentation
//   const promise = e.detail.promise;
//   if (process.env.NODE_ENV === 'production') {
//     // Do Real Error Reporting
//   } else {
//     console.error('[rejectionhandled] UNCAUGHT_ERROR! Fix or it will be reported.', e.stack);
//   }
// });