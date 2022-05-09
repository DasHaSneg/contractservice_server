"use strict";
// class HttpClient {
//     baseUrl = "";
//     securityData = null;
//     securityWorker = null;
//     bortControllers = new Map();
//     baseApiParams = {
//         credentials: "same-origin",
//         headers: {},
//         redirect: "follow",
//         referrerPolicy: "no-referrer",
//     };
//     constructor(apiConfig) {
//         Object.assign(this, apiConfig);
//     };
//     setSecurityData = (data) => {
//         this.securityData = data;
//     };
//     addQueryParam(query, key) {
//         const value = query[key];
//         return (
//           encodeURIComponent(key) +
//           "=" +
//           encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
//         );
//     };
//     toQueryString(rawQuery) {
//         const query = rawQuery || {};
//         const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
//         return keys
//           .map((key) =>
//             typeof query[key] === "object" && !Array.isArray(query[key])
//               ? this.toQueryString(query[key])
//               : this.addQueryParam(query, key),
//           )
//           .join("&");
//     };
//     addQueryParams(rawQuery) {
//         const queryString = this.toQueryString(rawQuery);
//         return queryString ? `?${queryString}` : "";
//     };
//     // contentFormatters(input: any) {
//     //     [ContentType.Json]: (input: any) =>
//     //       input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
//     //     [ContentType.FormData]: (input: any) =>
//     //       Object.keys(input || {}).reduce((data, key) => {
//     //         data.append(key, input[key]);
//     //         return data;
//     //       }, new FormData()),
//     //     [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
//     //   };
//     mergeRequestParams(params1, params2) {
//         return {
//           ...this.baseApiParams,
//           ...params1,
//           ...(params2 || {}),
//           headers: {
//             ...(this.baseApiParams.headers || {}),
//             ...(params1.headers || {}),
//             ...((params2 && params2.headers) || {}),
//           },
//         };
//     }
//     createAbortSignal = (cancelToken) => {
//         if (this.abortControllers.has(cancelToken)) {
//           const abortController = this.abortControllers.get(cancelToken);
//           if (abortController) {
//             return abortController.signal;
//           }
//           return void 0;
//         }
//         const abortController = new AbortController();
//         this.abortControllers.set(cancelToken, abortController);
//         return abortController.signal;
//     };
//     abortRequest = (cancelToken) => {
//         const abortController = this.abortControllers.get(cancelToken);
//         if (abortController) {
//             abortController.abort();
//             this.abortControllers.delete(cancelToken);
//         }
//     };
//     request = ({
//         body,
//         secure,
//         path,
//         type,
//         query,
//         format = "json",
//         baseUrl,
//         cancelToken,
//         ...params
//       }) => {
//         const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
//         const requestParams = this.mergeRequestParams(params, secureParams);
//         const queryString = query && this.toQueryString(query);
//         const payloadFormatter = this.contentFormatters[type || ContentType.Json];
//         return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
//           ...requestParams,
//           headers: {
//             ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
//             ...(requestParams.headers || {}),
//           },
//           signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
//           body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
//         }).then(async (response) => {
//           const r = response;
//           r.data = null;
//           r.error = null;
//           const data = await response[format]()
//             .then((data) => {
//               if (r.ok) {
//                 r.data = data;
//               } else {
//                 r.error = data;
//               }
//               return r;
//             })
//             .catch((e) => {
//               r.error = e;
//               return r;
//             });
//           if (cancelToken) {
//             this.abortControllers.delete(cancelToken);
//           }
//           if (!response.ok) throw data;
//           return data;
//         });
//     };
// }
// class Api extends HttpClient {
//     /**
//    * No description
//    *
//    * @tags Query
//    * @name QueryAnnexAll
//    * @summary Queries a list of Annex items.
//    * @request GET:/cosmonaut/documentservice/documentservice/annex
//    */
//   queryAnnexAll = (
//     query,
//     params = {},
//   ) =>
//     this.request({
//       path: `/cosmonaut/documentservice/documentservice/annex`,
//       method: "GET",
//       query: query,
//       format: "json",
//       ...params,
//     });
//   /**
//    * No description
//    *
//    * @tags Query
//    * @name QueryAnnex
//    * @summary Queries a Annex by id.
//    * @request GET:/cosmonaut/documentservice/documentservice/annex/{id}
//    */
//   queryAnnex = (id, params) =>
//     this.request({
//       path: `/cosmonaut/documentservice/documentservice/annex/${id}`,
//       method: "GET",
//       format: "json",
//       ...params,
//     });
//   /**
//    * No description
//    *
//    * @tags Query
//    * @name QueryContractAll
//    * @summary Queries a list of Contract items.
//    * @request GET:/cosmonaut/documentservice/documentservice/contract
//    */
//   queryContractAll = (
//     query,
//     params,
//   ) =>
//     this.request({
//       path: `/cosmonaut/documentservice/documentservice/contract`,
//       method: "GET",
//       query: query,
//       format: "json",
//       ...params,
//     });
//   /**
//    * No description
//    *
//    * @tags Query
//    * @name QueryContract
//    * @summary Queries a Contract by id.
//    * @request GET:/cosmonaut/documentservice/documentservice/contract/{id}
//    */
//   queryContract = (id, params) =>
//     this.request({
//       path: `/cosmonaut/documentservice/documentservice/contract/${id}`,
//       method: "GET",
//       format: "json",
//       ...params,
//     });
// }
// module.exports = Api;
//# sourceMappingURL=api.js.map