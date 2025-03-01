import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Get data from your Insights reports. The Query API has a rate limit of 60 queries per
     * hour and a maximum of 5 concurrent queries.
     *
     * @summary Query Saved Report
     */
    insightsQuery(metadata: types.InsightsQueryMetadataParam): Promise<FetchResponse<200, types.InsightsQueryResponse200>>;
    /**
     * Get data for a funnel. The Query API has a rate limit of 60 queries per hour and a
     * maximum of 5 concurrent queries.
     *
     * @summary Query Saved Report
     */
    funnelsQuery(metadata: types.FunnelsQueryMetadataParam): Promise<FetchResponse<200, types.FunnelsQueryResponse200>>;
    /**
     * Get the names and funnel_ids of your funnels.
     *
     * @summary List Saved Funnels
     */
    funnelsListSaved(metadata: types.FunnelsListSavedMetadataParam): Promise<FetchResponse<200, types.FunnelsListSavedResponse200>>;
    /**
     * Query Retention Report
     *
     */
    retentionQuery(metadata: types.RetentionQueryMetadataParam): Promise<FetchResponse<200, types.RetentionQueryResponse200>>;
    /**
     * Query Frequency Report
     *
     */
    retentionFrequencyQuery(metadata: types.RetentionFrequencyQueryMetadataParam): Promise<FetchResponse<200, types.RetentionFrequencyQueryResponse200>>;
    /**
     * Get data for an event, segmented and filtered by properties. The Query API has a rate
     * limit of 60 queries per hour and a maximum of 5 concurrent queries.
     *
     * @summary Query Segmentation Report
     */
    segmentationQuery(metadata: types.SegmentationQueryMetadataParam): Promise<FetchResponse<200, types.SegmentationQueryResponse200>>;
    /**
     * Get data for an event, segmented and filtered by properties, with values placed into
     * numeric buckets.
     * The Query API has a rate limit of 60 queries per hour and a maximum of 5 concurrent
     * queries.
     *
     * @summary Numerically Bucket
     */
    segmentationNumericQuery(metadata: types.SegmentationNumericQueryMetadataParam): Promise<FetchResponse<200, types.SegmentationNumericQueryResponse200>>;
    /**
     * Sums an expression for events per unit time. The Query API has a rate limit of 60
     * queries per hour and a maximum of 5 concurrent queries.
     *
     * @summary Numerically Sum
     */
    segmentationSumQuery(metadata: types.SegmentationSumQueryMetadataParam): Promise<FetchResponse<200, types.SegmentationSumQueryResponse200>>;
    /**
     * Averages an expression for events per unit time. The Query API has a rate limit of 60
     * queries per hour and a maximum of 5 concurrent queries.
     *
     * @summary Numerically Average
     */
    segmentationQueryAverage(metadata: types.SegmentationQueryAverageMetadataParam): Promise<FetchResponse<200, types.SegmentationQueryAverageResponse200>>;
    /**
     * This endpoint returns the activity feed for specified users. The Query API has a rate
     * limit of 60 queries per hour and a maximum of 5 concurrent queries.
     *
     * @summary Profile Event Activity
     */
    activityStreamQuery(metadata: types.ActivityStreamQueryMetadataParam): Promise<FetchResponse<200, types.ActivityStreamQueryResponse200>>;
    /**
     * The list endpoint returns all of the cohorts in a given project. The JSON formatted
     * return contains the cohort name, id, count, description, creation date, and visibility
     * for every cohort in the project.
     *
     * If you're trying to get a list of users in a cohort, you can use the [`/engage` endpoint
     * with the `filter_by_cohort` parameter](ref:engage#engage-query).
     * The Query API has a rate limit of 60 queries per hour and a maximum of 5 concurrent
     * queries.
     *
     * @summary List Saved Cohorts
     */
    cohortsList(metadata: types.CohortsListMetadataParam): Promise<FetchResponse<200, types.CohortsListResponse200>>;
    /**
     * Query Profiles
     *
     */
    engageQuery(body: types.EngageQueryFormDataParam, metadata: types.EngageQueryMetadataParam): Promise<FetchResponse<200, types.EngageQueryResponse200>>;
    engageQuery(metadata: types.EngageQueryMetadataParam): Promise<FetchResponse<200, types.EngageQueryResponse200>>;
    /**
     * Get unique, total, or average data for a set of events over N days, weeks, or months.
     * The Query API has a rate limit of 60 queries per hour and a maximum of 5 concurrent
     * queries.
     *
     * @summary Aggregate Event Counts
     */
    listRecentEvents(metadata: types.ListRecentEventsMetadataParam): Promise<FetchResponse<200, types.ListRecentEventsResponse200>>;
    /**
     * Get the top events for today, with their counts and the normalized percent change from
     * yesterday.
     * The Query API has a rate limit of 60 queries per hour and a maximum of 5 concurrent
     * queries.
     *
     * @summary Today's Top Events
     */
    queryTopEvents(metadata: types.QueryTopEventsMetadataParam): Promise<FetchResponse<200, types.QueryTopEventsResponse200>>;
    /**
     * Get a list of the most common events over the last 31 days. The Query API has a rate
     * limit of 60 queries per hour and a maximum of 5 concurrent queries.
     *
     * @summary Top Events
     */
    queryMonthsTopEventNames(metadata: types.QueryMonthsTopEventNamesMetadataParam): Promise<FetchResponse<200, types.QueryMonthsTopEventNamesResponse200>>;
    /**
     * Get unique, total, or average data for of a single event and property over days, weeks,
     * or months.
     * The Query API has a rate limit of 60 queries per hour and a maximum of 5 concurrent
     * queries.
     *
     * @summary Aggregrated Event Property Values
     */
    queryEventProperties(metadata: types.QueryEventPropertiesMetadataParam): Promise<FetchResponse<200, types.QueryEventPropertiesResponse200>>;
    /**
     * Get the top property names for an event. The Query API has a rate limit of 60 queries
     * per hour and a maximum of 5 concurrent queries.
     *
     * @summary Top Event Properties
     */
    queryEventsTopProperties(metadata: types.QueryEventsTopPropertiesMetadataParam): Promise<FetchResponse<200, types.QueryEventsTopPropertiesResponse200>>;
    /**
     * Get the top values for a property. The Query API has a rate limit of 60 queries per hour
     * and a maximum of 5 concurrent queries.
     *
     * @summary Top Event Property Values
     */
    queryEventsTopPropertyValues(metadata: types.QueryEventsTopPropertyValuesMetadataParam): Promise<FetchResponse<200, types.QueryEventsTopPropertyValuesResponse200>>;
    /**
     * Custom JQL Query
     *
     */
    queryJql(body: types.QueryJqlFormDataParam, metadata: types.QueryJqlMetadataParam): Promise<FetchResponse<200, types.QueryJqlResponse200>>;
}
declare const createSDK: SDK;
export default createSDK;
