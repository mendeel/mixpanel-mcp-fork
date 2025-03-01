declare const ActivityStreamQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly distinct_ids: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A JSON array as a string representing the `distinct_ids` to return activity feeds for. For example: `[\"12a34aa567eb8d-9ab1c26f345b67-89123c45-6aeaa7-89f12af345f678\"]`";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
            };
            readonly required: readonly ["project_id", "distinct_ids", "from_date", "to_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly events: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly event: {
                                        readonly type: "string";
                                    };
                                    readonly properties: {
                                        readonly type: "object";
                                        readonly additionalProperties: true;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CohortsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly count: {
                        readonly type: "integer";
                    };
                    readonly is_visible: {
                        readonly type: "integer";
                        readonly description: "0 if not visible. 1 if visible";
                    };
                    readonly description: {
                        readonly type: "string";
                    };
                    readonly created: {
                        readonly type: "string";
                    };
                    readonly project_id: {
                        readonly type: "integer";
                    };
                    readonly id: {
                        readonly type: "integer";
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EngageQuery: {
    readonly formData: {
        readonly properties: {
            readonly distinct_id: {
                readonly type: "string";
                readonly description: "A unique identifier used to distinguish an individual profile.";
            };
            readonly distinct_ids: {
                readonly type: "string";
                readonly description: "A JSON array of distinct_ids to retrieve profiles for.\nExample: `distinct_ids=[\"id1\", \"id2\"]`\n";
            };
            readonly data_group_id: {
                readonly type: "string";
                readonly description: "The ID of the group key, used when querying group profiles, click [here](https://docs.mixpanel.com/docs/data-structure/group-analytics#exporting-group-profiles-via-api) for more info.";
            };
            readonly where: {
                readonly type: "string";
                readonly description: "An expression to filter users (or groups) by. See the [expressions section](ref:segmentation-expressions) above.";
            };
            readonly output_properties: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "A JSON array of names of properties you want returned.\nExample: `output_properties=[\"$last_name\", \"$email\", \"Total Spent\"]`\n\nThis parameter can drastically reduce the amount of data returned by the API when you're not interested in all properties and can speed up queries significantly.\n";
            };
            readonly session_id: {
                readonly type: "string";
                readonly description: "A string id provided in the results of a previous query. Using a session_id speeds up api response, and allows paging through results.";
            };
            readonly page: {
                readonly type: "integer";
                readonly description: "Which page of the results to retrieve. Pages start at zero. If the \"page\" parameter is provided, the session_id parameter must also be provided.";
            };
            readonly behaviors: {
                readonly type: "integer";
                readonly description: "If you are exporting user profiles using an event selector, you use a `behaviors` parameter in your request. `behaviors` and `filter_by_cohort` are mutually exclusive.";
            };
            readonly as_of_timestamp: {
                readonly type: "integer";
                readonly description: "This parameter is only useful when also using `behaviors`.\nIf you try to export more than 1k profiles using a `behaviors` parameter and you don't included the parameter `as_of_timestamp`, you'll see the following error:\n\n`request for page in uncached query for params`\n";
            };
            readonly filter_by_cohort: {
                readonly type: "string";
                readonly description: "Takes a JSON object with a single key called `id` whose value is the cohort ID. `behaviors` and `filter_by_cohort` are mutually exclusive.\n\nExample: `filter_by_cohort='{\"id\":12345}'`\n";
            };
            readonly include_all_users: {
                readonly type: "boolean";
                readonly description: "*\\*only applicable with `filter_by_cohort` parameter*\n\n`include_all_users=true` (default) include all distinct_ids even if they don’t have a user (or group) profile.\n\n`include_all_users=false` include only distinct_ids with user (or group) profile.\n";
            };
        };
        readonly type: "object";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly description: "The page number of the results";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly description: "The max number of results in a single page.";
                };
                readonly session_id: {
                    readonly type: "string";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Indicates whether the request was successful";
                };
                readonly total: {
                    readonly type: "integer";
                    readonly description: "The number of users in the results payload.";
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly $distinct_id: {
                                readonly type: "integer";
                                readonly description: "The ID of the user";
                            };
                            readonly $properties: {
                                readonly type: "object";
                                readonly description: "The properties associated with the user";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const FunnelsListSaved: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly funnel_id: {
                        readonly type: "integer";
                        readonly description: "The id of the funnel.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the funnel";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const FunnelsQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly funnel_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The funnel that you wish to get data for.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly length: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of units (defined by length_unit) each user has to complete the funnel, starting from the time they triggered the first step in the funnel. May not be greater than 90 days. Note that we will query for events past the end of to_date to look for funnel completions. This defaults to the value that was previously saved in the UI for this funnel.";
                };
                readonly length_unit: {
                    readonly type: "string";
                    readonly enum: readonly ["day", "hour", "minute", "second"];
                    readonly description: "The unit applied to the length parameter can be \"second\", \"minute\", \"hour\", or \"day\". Defaults to the value that was previously saved in the UI for this funnel.";
                    readonly examples: readonly ["day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly interval: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of days you want each bucket to contain. The default value is 1.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["day", "week", "month"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This is an alternate way of specifying interval and can be \"day\", \"week\", or \"month\".";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The property expression to segment the event on. See the [expression to segment](ref:segmentation-expressions) below.";
                };
                readonly where: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter events by. See the [expression to segment](ref:segmentation-expressions) below.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Return the top property values. Defaults to 255 if not explicitly included. Maximum value 10,000. This parameter does nothing if \\\"on\\\" is not specified.";
                };
            };
            readonly required: readonly ["project_id", "funnel_id", "from_date", "to_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly dates: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "Date in YYYY-mm-dd format";
                            };
                        };
                    };
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly properties: {
                            readonly steps: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly count: {
                                            readonly type: "integer";
                                            readonly description: "Number of conversions.";
                                        };
                                        readonly goal: {
                                            readonly type: "string";
                                            readonly description: "The name of the event";
                                        };
                                        readonly step_conv_ratio: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "Conversion from previous step";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly overall_conv_ratio: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "Conversion from start of funnel";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly avg_time: {
                                            readonly type: "integer";
                                            readonly description: "mean time to convert; null for step 0.";
                                        };
                                        readonly avg_time_from_start: {
                                            readonly type: "integer";
                                            readonly description: "time to convert from first step.";
                                        };
                                        readonly event: {
                                            readonly type: "string";
                                            readonly description: "The name of the event";
                                        };
                                        readonly step_label: {
                                            readonly type: "string";
                                            readonly description: "same as event OR custom event name";
                                        };
                                        readonly custom_event: {
                                            readonly type: "boolean";
                                            readonly description: "`true` if the event is a custom event, otherwise key is not present";
                                        };
                                        readonly custom_event_id: {
                                            readonly type: "integer";
                                            readonly description: "Only present if the event is a custom event.";
                                        };
                                    };
                                };
                            };
                            readonly analysis: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly completion: {
                                        readonly type: "integer";
                                        readonly description: "Count in final step";
                                    };
                                    readonly starting_amount: {
                                        readonly type: "integer";
                                        readonly description: "Count in first step";
                                    };
                                    readonly steps: {
                                        readonly type: "integer";
                                        readonly description: "Number of steps";
                                    };
                                    readonly worst: {
                                        readonly type: "integer";
                                        readonly description: "Step with highest drop off";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const InsightsQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly bookmark_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of your Insights report can be found from the url: `https://mixpanel.com/project/<YOUR_PROJECT_ID>/view/<YOUR_WORKSPACE_ID>/app/boards#id=12345&editor-card-id=%22report-<YOUR_BOOKMARK_ID>%22`";
                };
            };
            readonly required: readonly ["project_id", "bookmark_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly computed_at: {
                    readonly type: "string";
                };
                readonly date_range: {
                    readonly type: "object";
                    readonly properties: {
                        readonly from_date: {
                            readonly type: "string";
                        };
                        readonly to_date: {
                            readonly type: "string";
                        };
                    };
                };
                readonly headers: {
                    readonly type: "array";
                    readonly description: "Explanation of what the nested keys mean in `series`.";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly series: {
                    readonly type: "object";
                    readonly description: "Maps event name of event to an object with dates as keys and number of instances as values. For example:\n\n```json\n{\n  'Viewed page': {\n    '2020-08-17T00:00:00-07:00': 7832,\n    '2020-08-24T00:00:00-07:00': 6234,\n  }\n}\n```\n";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListRecentEvents: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event or events that you wish to get data for, encoded as a JSON array. Example format: \"[\"play song\", \"log in\", \"add playlist\"]\".";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["general", "unique", "average"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The analysis type you would like to get data for - such as general, unique, or average events. Valid values: \"general\", \"unique\", or \"average\".";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["minute", "hour", "day", "week", "month"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"minute\", \"hour\", \"day\", \"week\", or \"month\". It determines the level of granularity of the data you get back. Note that you cannot get hourly uniques.";
                };
                readonly interval: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of \"units\" to return data for - minutes, hours, days, weeks, or months. 1 will return data for the current unit (minute, hour, day, week or month). 2 will return the current and previous units, and so on. Specify either interval or from_date and to_date.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The data return format, such as JSON or CSV. Options: \"json\" (default), \"csv\".";
                };
            };
            readonly required: readonly ["project_id", "event", "type", "unit", "from_date", "to_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly series: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "All dates included in `values`";
                            };
                        };
                        readonly values: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly description: "A mapping of the date of each unit to the number of events. (ex. {\"2010-05-30\": 6})";
                                readonly additionalProperties: true;
                            };
                            readonly description: "Keys are the names of events";
                        };
                    };
                };
                readonly legend_size: {
                    readonly type: "integer";
                    readonly description: "The number of events defined in `values`";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const QueryEventProperties: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The name of the property you would like to get data for.";
                };
                readonly values: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The specific property values that you would like to get data for, encoded as a JSON array. Example: If you have a property \"gender\" you may have values \"male\", \"female\" and \"unknown\". If you just want data for female and unknown users, you can include a values property that looks like \"[\"female\", \"unknown\"]\".";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["general", "unique", "average"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The analysis type you would like to get data for - such as general, unique, or average events. Valid values: \"general\", \"unique\", or \"average\".";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["minute", "hour", "day", "week", "month"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"minute\", \"hour\", \"day\", \"week\", or \"month\". It determines the level of granularity of the data you get back. Note that you cannot get hourly uniques.";
                };
                readonly interval: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of \"units\" to return data for - minutes, hours, days, weeks, or months. 1 will return data for the current unit (minute, hour, day, week or month). 2 will return the current and previous units, and so on. Specify either interval or from_date and to_date.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The data return format, such as JSON or CSV. Options: \"json\" (default), \"csv\".";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of values to return. Defaults to 255.";
                };
            };
            readonly required: readonly ["project_id", "event", "name", "type", "unit", "from_date", "to_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly series: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "All dates we have data for in the response.";
                            };
                        };
                        readonly values: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                };
                readonly legend_size: {
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const QueryEventsTopProperties: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of properties to return. Defaults to 10.";
                };
            };
            readonly required: readonly ["project_id", "event"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly description: "The keys are the name of the properties";
            readonly additionalProperties: {
                readonly type: "object";
                readonly properties: {
                    readonly count: {
                        readonly type: "integer";
                        readonly description: "The number of events with that property";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const QueryEventsTopPropertyValues: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The name of the property you would like to get data for.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of values to return. Defaults to 255.";
                };
            };
            readonly required: readonly ["project_id", "event", "name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly description: "Property values for the specified event property";
            readonly items: {
                readonly type: "string";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const QueryJql: {
    readonly formData: {
        readonly required: readonly ["script"];
        readonly properties: {
            readonly script: {
                readonly type: "string";
                readonly default: "function main(){\n  return Events(params)\n    .groupBy(\n      [\"name\"],\n      mixpanel.reducer.count()\n    )\n}\n";
                readonly description: "The script to run.";
                readonly examples: readonly ["function main(){\n  return Events(params)\n    .groupBy(\n      [\"name\"],\n      mixpanel.reducer.count()\n    )\n}\n"];
            };
            readonly params: {
                readonly type: "string";
                readonly format: "blob";
                readonly default: "{\n  \"scriptParam\": \"paramValue\"\n}\n";
                readonly description: "A JSON-encoded object that will be made available to the script as the params global variable.";
                readonly examples: readonly ["{\n  \"from_date\": 2016-01-01T00:00:00.000Z,\n  \"to_date\": 2016-01-07T00:00:00.000Z\n}\n"];
            };
        };
        readonly type: "object";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
            };
            readonly required: readonly ["project_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: true;
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const QueryMonthsTopEventNames: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["general", "unique", "average"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The analysis type you would like to get data for - such as general, unique, or average events. Valid values: \"general\", \"unique\", or \"average\".";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of values to return. Defaults to 255.";
                };
            };
            readonly required: readonly ["project_id", "type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly description: "List of names in descending alphabetical order.";
            readonly items: {
                readonly type: "string";
                readonly description: "Event name";
                readonly examples: readonly ["Viewed page"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const QueryTopEvents: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["general", "unique", "average"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The analysis type you would like to get data for - such as general, unique, or average events. Valid values: \"general\", \"unique\", or \"average\".";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of events to return. Defaults to 100.";
                };
            };
            readonly required: readonly ["project_id", "type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly events: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly amount: {
                                readonly type: "integer";
                                readonly description: "Number of events";
                            };
                            readonly event: {
                                readonly type: "string";
                                readonly description: "The name of the event";
                            };
                            readonly percent_change: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The percent change from yesterday";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                    };
                };
                readonly type: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RetentionFrequencyQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["day", "week", "month"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The overall time period to return frequency of actions for can be \"day\", \"week\", or \"month\".";
                };
                readonly addiction_unit: {
                    readonly type: "string";
                    readonly enum: readonly ["hour", "day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The granularity to return frequency of actions at can be \"hour\" or \"day\".";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event to generate returning counts for.";
                };
                readonly where: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter the returning events by. See the [expressions section](ref:segmentation-expressions) above.";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The property expression to segment the second event on. See the [expressions section](ref:segmentation-expressions) above.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Return the top limit segmentation values. This parameter does nothing if \"on\" is not specified.";
                };
            };
            readonly required: readonly ["project_id", "from_date", "to_date", "unit", "addiction_unit"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "integer";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RetentionQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly retention_type: {
                    readonly type: "string";
                    readonly enum: readonly ["birth", "compounded"];
                    readonly examples: readonly ["birth"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Must be either \"birth\" or \"compounded\". Defaults to \"birth\". The “birth” retention type corresponds to first time retention. The “compounded” retention type corresponds to recurring retention. See the [Types of Retention](https://help.mixpanel.com/hc/en-us/articles/360001370146) article for more information.";
                };
                readonly born_event: {
                    readonly type: "string";
                    readonly examples: readonly ["Added to cart"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The first event a user must do to be counted in a birth retention cohort. Required when retention_type is \"birth\"; ignored otherwise.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly examples: readonly ["Viewed report"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event to generate returning counts for. Applies to both birth and compounded retention. If not specified, we look across all events.";
                };
                readonly born_where: {
                    readonly type: "string";
                    readonly examples: readonly ["properties[\"$os\"]==\"Linux\""];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter born_events by. See the [expressions section](ref:segmentation-expressions) above.";
                };
                readonly where: {
                    readonly type: "string";
                    readonly examples: readonly ["properties[\"$os\"]==\"Linux\""];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter born_events by. See the [expressions section](ref:segmentation-expressions) above.";
                };
                readonly interval: {
                    readonly type: "integer";
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of units (can be specified in either days, weeks, or months) that you want per individual bucketed interval. May not be greater than 90 days if days is the specified unit. The default value is 1.";
                };
                readonly interval_count: {
                    readonly type: "integer";
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of individual buckets, or intervals, that are returned; defaults to 1. Note that we include a \"0th\" interval for events that take place less than one interval after the initial event.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["day", "week", "month"];
                    readonly examples: readonly ["day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The interval unit. It can be \"day\", \"week\", or \"month\". Default is \"day\".";
                };
                readonly unbounded_retention: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly examples: readonly [false];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A counting method for retention queries where retention values accumulate from right to left, i.e. day N is equal to users who retained on day N and any day after. The default value of false does not perform this accumulation. [Learn more about Counting Method](https://help.mixpanel.com/hc/en-us/articles/360045484191).";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The property expression to segment the second event on. See the [expressions section](ref:segmentation-expressions) above.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Return the top limit segmentation values. This parameter does nothing if \"on\" is not specified.";
                };
            };
            readonly required: readonly ["project_id", "from_date", "to_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "object";
                readonly properties: {
                    readonly counts: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "integer";
                        };
                    };
                    readonly first: {
                        readonly type: "integer";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SegmentationNumericQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The property expression to segment the event on. This expression must be a numeric property. See the [expressions section](ref:segmentation-expressions) below.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["hour", "day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"hour\" or \"day\". This determines the buckets into which the property values that you segment on are placed. The default value is \"day\".";
                };
                readonly where: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter events by. See the [expression to segment](ref:segmentation-expressions) below.";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["general", "unique", "average"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"hour\" or \"day\". This determines the buckets into which the property values that you segment on are placed. The default value is \"day\".";
                };
            };
            readonly required: readonly ["project_id", "event", "from_date", "to_date", "on"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly series: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "All dates we have data for in the response.";
                            };
                        };
                        readonly values: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly description: "The range of the bucket";
                                readonly additionalProperties: {
                                    readonly type: "integer";
                                    readonly description: "A mapping of the date of each unit to the number of specified events that took place. (ex. {\"2010-05-30\": 6})";
                                };
                            };
                        };
                    };
                };
                readonly legend_size: {
                    readonly type: "integer";
                    readonly description: "List of all dates.";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SegmentationQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The property expression to segment the event on. See the [expression to segment](ref:segmentation-expressions) below.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["minute", "hour", "day", "month"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"minute\", \"hour\", \"day\", or \"month\". This determines the buckets into which the property values that you segment on are placed. The default value is \"day\".";
                };
                readonly interval: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional parameter in lieu of 'unit' when 'type' is not 'general'. Determines the number of days your results are bucketed into can be used with or without 'from_date' and 'to_date' parameters.";
                };
                readonly where: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter events by. See the [expression to segment](ref:segmentation-expressions) below.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Return the top property values. Defaults to 60. Maximum value 10,000. This parameter does nothing if \"on\" is not specified.";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["general", "unique", "average"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"general\", \"unique\", or \"average\". If this is set to \"unique\", we return the unique count of events or property values. If set to \"general\", we return the total, including repeats. If set to \"average\", we return the average count. The default value is \"general\".";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["csv"];
                    readonly description: "Can be set to \"csv\".";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["project_id", "event", "from_date", "to_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly series: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "All dates we have data for in the response.";
                            };
                        };
                        readonly values: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                };
                readonly legend_size: {
                    readonly type: "integer";
                    readonly description: "List of all dates.";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SegmentationQueryAverage: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The expression to sum per unit time. The result of the expression should be a numeric value. If the expression is not numeric, a value of 0.0 is assumed. See the [expressions section](ref:segmentation-expressions) below.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["hour", "day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"hour\" or \"day\". This determines the buckets into which the property values that you segment on are placed. The default value is \"day\".";
                };
                readonly where: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter events by. See the [expression to segment](ref:segmentation-expressions) below.";
                };
            };
            readonly required: readonly ["project_id", "event", "from_date", "to_date", "on"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                };
                readonly status: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SegmentationSumQuery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly project_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Required if using service account to authenticate request.";
                };
                readonly workspace_id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The id of the workspace if applicable.";
                };
                readonly event: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The event that you wish to get data for. Note: this is a single event name, not an array.";
                };
                readonly from_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to begin querying from. This date is inclusive.";
                };
                readonly to_date: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The date in yyyy-mm-dd format to query to. This date is inclusive.";
                };
                readonly on: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The expression to sum per unit time. The result of the expression should be a numeric value. If the expression is not numeric, a value of 0.0 is assumed. See the [expressions section](ref:segmentation-expressions) below.";
                };
                readonly unit: {
                    readonly type: "string";
                    readonly enum: readonly ["hour", "day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This can be \"hour\" or \"day\". This determines the buckets into which the property values that you segment on are placed. The default value is \"day\".";
                };
                readonly where: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An expression to filter events by. See the [expression to segment](ref:segmentation-expressions) below.";
                };
            };
            readonly required: readonly ["project_id", "event", "from_date", "to_date", "on"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                };
                readonly computed_at: {
                    readonly type: "string";
                };
                readonly results: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "integer";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { ActivityStreamQuery, CohortsList, EngageQuery, FunnelsListSaved, FunnelsQuery, InsightsQuery, ListRecentEvents, QueryEventProperties, QueryEventsTopProperties, QueryEventsTopPropertyValues, QueryJql, QueryMonthsTopEventNames, QueryTopEvents, RetentionFrequencyQuery, RetentionQuery, SegmentationNumericQuery, SegmentationQuery, SegmentationQueryAverage, SegmentationSumQuery };
