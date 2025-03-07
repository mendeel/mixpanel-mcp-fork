import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "mixpanel",
    version: "1.0.0"
})

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a Mixpanel service account username and password and a project ID");
  process.exit(1);
}

const SERVICE_ACCOUNT_USER_NAME = process.env.SERVICE_ACCOUNT_USER_NAME || args[0] || "YOUR SERVICE ACCOUNT USERNAME";
const SERVICE_ACCOUNT_PASSWORD = process.env.SERVICE_ACCOUNT_PASSWORD || args[1] || "YOUR SERVICE ACCOUNT PASSWORD";
const DEFAULT_PROJECT_ID = process.env.DEFAULT_PROJECT_ID || args[2] || "YOUR PROJECT ID";

server.tool(
  "get_today_top_events",
  "Get today's top events from Mixpanel",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    type: z.enum(["general", "total", "unique"]).describe("The type of events to fetch").optional(),
    limit: z.number().optional().describe("Maximum number of events to return"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, type = "general", limit = 10 }) => {
    try {
      // Create authorization header using base64 encoding of credentials
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      // Construct URL with query parameters
      const url = `https://mixpanel.com/api/query/events/top?project_id=${project_id}&type=${type}${limit ? `&limit=${limit}` : ''}`;
      
      // Set up request options
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      // Make the API request
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Define interface for event data
      interface MixpanelEvent {
        event: string;
        amount: number;
        percent_change: number;
      }
      
      // Format the results with proper typing
      const events = data.events.map((event: MixpanelEvent) => ({
        name: event.event,
        count: event.amount,
        percent_change: (event.percent_change * 100).toFixed(2) + '%'
      }));
      
      return {
        content: [
          {
            type: "text",
            text: `# Top ${events.length} Events (${type}) in Mixpanel (Project ID: ${project_id})\n\n` +
                  `${events.map((e: {name: string, count: number, percent_change: string}) => 
                    `- **${e.name}**: ${e.count} events (${e.percent_change} change)`).join('\n')}`
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel events:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel events: ${errorMessage}`
          }
        ]
      };
    }
  }
)

server.tool(
  "get_top_events",
  "Get a list of the most common events over the last 31 days",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    type: z.enum(["general", "total", "unique"]).describe("The type of events to fetch").optional(),
    limit: z.number().optional().describe("Maximum number of events to return"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, type = "general", limit = 10 }) => {
    try {
      // Create authorization header using base64 encoding of credentials
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      // Construct URL with query parameters
      const url = `https://mixpanel.com/api/query/events/names?project_id=${project_id}&type=${type}${limit ? `&limit=${limit}` : ''}`;
      
      // Set up request options
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      // Make the API request
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Format the results
      const events = data.slice(0, limit);
      
      return {
        content: [
          {
            type: "text",
            text: `# Top ${events.length} Event Names Over Last 31 Days (Project ID: ${project_id})\n\n` +
                  `${events.map((event: string, index: number) => 
                    `${index + 1}. **${event}**`).join('\n')}`
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel events:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel events: ${errorMessage}`
          }
        ]
      };
    }
  }
)

server.tool(
  "aggregate_event_counts",
  "Get unique, total, or average data for a set of events over N days, weeks, or months",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    events: z.string().describe("The event or events that you wish to get data for, encoded as a JSON array. Example format: \"[\"play song\", \"log in\", \"add playlist\"]\""),
    type: z.enum(["general", "total", "unique", "average"]).describe("The type of data to fetch").optional(),
    unit: z.enum(["minute", "hour", "day", "week", "month"]).describe("The level of granularity of the data you get back"),
    interval: z.number().optional().describe("The number of units to return data for. Specify either interval or from_date and to_date"),
    from_date: z.string().optional().describe("The date in yyyy-mm-dd format to begin querying from (inclusive)"),
    to_date: z.string().optional().describe("The date in yyyy-mm-dd format to query to (inclusive)"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, events, type = "general", unit, interval, from_date, to_date }) => {
    try {
      // Create authorization header using base64 encoding of credentials
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      // Validate parameters
      if (!interval && (!from_date || !to_date)) {
        throw new Error("You must specify either interval or both from_date and to_date");
      }
      
      // Parse events to ensure it's a valid JSON array
      let parsedEvents;
      try {
        parsedEvents = JSON.parse(events);
        if (!Array.isArray(parsedEvents)) {
          throw new Error("Events must be a JSON array");
        }
      } catch (e: any) {
        throw new Error(`Invalid events format: ${e.message}`);
      }
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        project_id: project_id || '',
        type: type,
        unit: unit
      });
      
      // Add either interval or date range
      if (interval) {
        queryParams.append('interval', interval.toString());
      } else {
        queryParams.append('from_date', from_date || '');
        queryParams.append('to_date', to_date || '');
      }
      
      // Add events parameter
      queryParams.append('event', events);
      
      // Construct URL with query parameters
      const url = `https://mixpanel.com/api/query/events?${queryParams.toString()}`;
      
      // Set up request options
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      // Make the API request
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Format the results
      let resultText = `# Aggregate Event Counts (${type})\n\n`;
      resultText += `**Project ID:** ${project_id}\n`;
      resultText += `**Unit:** ${unit}\n`;
      resultText += interval ? `**Interval:** ${interval} ${unit}s\n` : 
                             `**Date Range:** ${from_date} to ${to_date}\n`;
      resultText += `**Events:** ${parsedEvents.join(", ")}\n\n`;
      
      // Format the data based on structure
      if (data.data && data.data.series && data.data.values) {
        resultText += "## Results\n\n";
        
        // Get series (dates/times)
        const series = data.data.series;
        
        // For each event, show the values across the series
        for (const eventName in data.data.values) {
          resultText += `### ${eventName}\n\n`;
          
          const values = data.data.values[eventName];
          
          // Create a table header
          resultText += "| Date/Time | Count |\n";
          resultText += "|-----------|-------|\n";
          
          // Add rows for each data point
          series.forEach((date: string) => {
            resultText += `| ${date} | ${values[date]} |\n`;
          });
          
          resultText += "\n";
        }
      } else {
        // Fallback for unexpected data structure
        resultText += "```json\n" + JSON.stringify(data, null, 2) + "\n```\n";
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel event counts:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel event counts: ${errorMessage}`
          }
        ]
      };
    }
  }
)

server.tool(
  "aggregated_event_property_values",
  "Get unique, total, or average data for a single event and property over days, weeks, or months",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    event: z.string().describe("The event that you wish to get data for (a single event name, not an array)"),
    name: z.string().describe("The name of the property you would like to get data for"),
    values: z.string().optional().describe("The specific property values to get data for, encoded as a JSON array. Example: \"[\"female\", \"unknown\"]\""),
    type: z.enum(["general", "unique", "average"]).describe("The analysis type - general, unique, or average events"),
    unit: z.enum(["minute", "hour", "day", "week", "month"]).describe("The level of granularity of the data (minute, hour, day, week, or month)"),
    interval: z.number().optional().describe("The number of units to return data for. Specify either interval or from_date and to_date"),
    from_date: z.string().optional().describe("The date in yyyy-mm-dd format to begin querying from (inclusive)"),
    to_date: z.string().optional().describe("The date in yyyy-mm-dd format to query to (inclusive)"),
    limit: z.number().optional().describe("The maximum number of values to return (default: 255)"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, event, name, values, type, unit, interval, from_date, to_date, limit }) => {
    try {
      // Create authorization header using base64 encoding of credentials
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      // Validate parameters
      if (!interval && (!from_date || !to_date)) {
        throw new Error("You must specify either interval or both from_date and to_date");
      }
      
      // Parse values if provided
      let parsedValues;
      if (values) {
        try {
          parsedValues = JSON.parse(values);
          if (!Array.isArray(parsedValues)) {
            throw new Error("Values must be a JSON array");
          }
        } catch (e) {
          throw new Error(`Invalid values format: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        project_id: project_id || '',
        event: event,
        name: name,
        type: type,
        unit: unit
      });
      
      // Add values if provided
      if (values) {
        queryParams.append('values', values);
      }
      
      // Add either interval or date range
      if (interval) {
        queryParams.append('interval', interval.toString());
      } else {
        queryParams.append('from_date', from_date || '');
        queryParams.append('to_date', to_date || '');
      }
      
      // Add limit if provided
      if (limit) {
        queryParams.append('limit', limit.toString());
      }
      
      // Construct URL with query parameters
      const url = `https://mixpanel.com/api/query/events/properties?${queryParams.toString()}`;
      
      // Set up request options
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      // Make the API request
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Format the results
      let resultText = `# Aggregated Event Property Values (${type})\n\n`;
      resultText += `**Project ID:** ${project_id}\n`;
      resultText += `**Event:** ${event}\n`;
      resultText += `**Property:** ${name}\n`;
      resultText += `**Unit:** ${unit}\n`;
      resultText += interval ? `**Interval:** ${interval} ${unit}s\n` : 
                             `**Date Range:** ${from_date} to ${to_date}\n`;
      if (parsedValues) {
        resultText += `**Values:** ${parsedValues.join(", ")}\n`;
      }
      resultText += "\n";
      
      // Format the data based on structure
      if (data.data && data.data.series && data.data.values) {
        resultText += "## Results\n\n";
        
        // Get series (dates/times)
        const series = data.data.series;
        
        // For each property value, show the values across the series
        for (const propValue in data.data.values) {
          resultText += `### "${propValue}"\n\n`;
          
          const values = data.data.values[propValue];
          
          // Create a table header
          resultText += "| Date/Time | Count |\n";
          resultText += "|-----------|-------|\n";
          
          // Add rows for each data point
          series.forEach((date: string) => {
            resultText += `| ${date} | ${values[date]} |\n`;
          });
          
          resultText += "\n";
        }
      } else {
        // Fallback for unexpected data structure
        resultText += "```json\n" + JSON.stringify(data, null, 2) + "\n```\n";
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel event property values:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel event property values: ${errorMessage}`
          }
        ]
      };
    }
  }
)

server.tool(
  "query_insights_report",
  "Get data from your Insights reports",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
    bookmark_id: z.string().describe("The ID of your Insights report"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id, bookmark_id }) => {
    try {
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      const queryParams = new URLSearchParams({
        project_id: project_id || '',
        bookmark_id: bookmark_id
      });
      
      if (workspace_id) {
        queryParams.append('workspace_id', workspace_id);
      }
      
      const url = `https://mixpanel.com/api/query/insights?${queryParams.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      return {
        content: [
          {
            type: "text",
            text: `# Insights Report Data\n\n` +
                  `**Project ID:** ${project_id}\n` +
                  `**Bookmark ID:** ${bookmark_id}\n\n` +
                  `## Results\n\n` +
                  "```json\n" + JSON.stringify(data, null, 2) + "\n```\n"
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel insights:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel insights: ${errorMessage}`
          }
        ]
      };
    }
  }
);

server.tool(
  "query_funnel_report",
  "Get data for a funnel based on a funnel_id. Funnel IDs should be retrieved using the list_saved_funnels tool.",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
    funnel_id: z.string().describe("The Mixpanel funnel ID that you wish to get data for"),
    from_date: z.string().describe("The date in yyyy-mm-dd format to begin querying from (inclusive)"),
    to_date: z.string().describe("The date in yyyy-mm-dd format to query to (inclusive)"),
    length: z.number().optional().describe("The number of units each user has to complete the funnel"),
    length_unit: z.enum(["day", "hour", "minute", "second"]).optional().describe("The unit applied to the length parameter"),
    interval: z.number().optional().describe("The number of days you want each bucket to contain"),
    unit: z.enum(["day", "week", "month"]).optional().describe("Alternate way of specifying interval"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id, funnel_id, from_date, to_date, length, length_unit, interval, unit }) => {
    try {
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      const queryParams = new URLSearchParams({
        project_id: project_id || '',
        funnel_id: funnel_id,
        from_date: from_date,
        to_date: to_date
      });
      
      if (workspace_id) queryParams.append('workspace_id', workspace_id);
      if (length) queryParams.append('length', length.toString());
      if (length_unit) queryParams.append('length_unit', length_unit);
      if (interval) queryParams.append('interval', interval.toString());
      if (unit) queryParams.append('unit', unit);
      
      const url = `https://mixpanel.com/api/query/funnels?${queryParams.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();

      // Format the results
      let resultText = `# Funnel Report\n\n`;
      resultText += `**Project ID:** ${project_id}\n`;
      resultText += `**Funnel ID:** ${funnel_id}\n`;
      resultText += `**Date Range:** ${from_date} to ${to_date}\n\n`;
      
      if (data.meta && data.data) {
        resultText += "## Results by Date\n\n";
        
        for (const date of data.meta.dates) {
          const dateData = data.data[date];
          resultText += `### ${date}\n\n`;
          
          if (dateData.steps && dateData.steps.length > 0) {
            // Create a table for steps
            resultText += "| Step | Event | Count | Conversion Rate | Overall Rate |\n";
            resultText += "|------|-------|-------|----------------|-------------|\n";
            
            dateData.steps.forEach((step: any, index: number) => {
              resultText += `| ${index + 1} | ${step.goal || step.event} | ${step.count} | ${(step.step_conv_ratio * 100).toFixed(2)}% | ${(step.overall_conv_ratio * 100).toFixed(2)}% |\n`;
            });
            
            resultText += "\n";
            
            // Add analysis
            if (dateData.analysis) {
              resultText += `**Starting Users:** ${dateData.analysis.starting_amount}\n`;
              resultText += `**Completed Funnel:** ${dateData.analysis.completion}\n`;
              resultText += `**Completion Rate:** ${((dateData.analysis.completion / dateData.analysis.starting_amount) * 100).toFixed(2)}%\n\n`;
            }
          }
        }
      } else {
        resultText += "```json\n" + JSON.stringify(data, null, 2) + "\n```\n";
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel funnel data:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel funnel data: ${errorMessage}`
          }
        ]
      };
    }
  }
);

server.tool(
  "list_saved_funnels",
  "Get the names and IDs of your saved funnels. This tool is useful for getting a funnel_id for the query_funnel_report tool.",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id }) => {
    try {
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      const queryParams = new URLSearchParams({
        project_id: project_id || ''
      });
      
      if (workspace_id) {
        queryParams.append('workspace_id', workspace_id);
      }
      
      const url = `https://mixpanel.com/api/query/funnels/list?${queryParams.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      let resultText = `# Saved Funnels in Project ${project_id}\n\n`;
      
      if (Array.isArray(data) && data.length > 0) {
        resultText += "| Funnel ID | Name |\n";
        resultText += "|-----------|------|\n";
        
        data.forEach(funnel => {
          resultText += `| ${funnel.funnel_id} | ${funnel.name} |\n`;
        });
      } else {
        resultText += "No saved funnels found.";
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel funnels list:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel funnels list: ${errorMessage}`
          }
        ]
      };
    }
  }
);

server.tool(
  "list_saved_cohorts",
  "Get all cohorts in a given project",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id }) => {
    try {
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      const queryParams = new URLSearchParams({
        project_id: project_id || ''
      });
      
      if (workspace_id) {
        queryParams.append('workspace_id', workspace_id);
      }
      
      const url = `https://mixpanel.com/api/query/cohorts/list?${queryParams.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      let resultText = `# Saved Cohorts in Project ${project_id}\n\n`;
      
      if (Array.isArray(data) && data.length > 0) {
        resultText += "| Cohort ID | Name | Count | Created | Visible |\n";
        resultText += "|-----------|------|-------|---------|--------|\n";
        
        data.forEach(cohort => {
          resultText += `| ${cohort.id} | ${cohort.name} | ${cohort.count} | ${cohort.created} | ${cohort.is_visible ? 'Yes' : 'No'} |\n`;
        });
        
        resultText += "\n**Description of first cohort:** " + (data[0].description || "No description");
      } else {
        resultText += "No saved cohorts found.";
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel cohorts list:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel cohorts list: ${errorMessage}`
          }
        ]
      };
    }
  }
);

server.tool(
  "query_retention_report",
  "Get data from your Retention reports",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
    from_date: z.string().describe("The date in yyyy-mm-dd format to begin querying from (inclusive)"),
    to_date: z.string().describe("The date in yyyy-mm-dd format to query to (inclusive)"),
    retention_type: z.enum(["birth", "compounded"]).optional().describe("Type of retention: 'birth' (first time) or 'compounded' (recurring). Defaults to 'birth'"),
    born_event: z.string().optional().describe("The first event a user must do to be counted in a birth retention cohort"),
    return_event: z.string().optional().describe("The event to generate returning counts for. If not specified, looks across all events"),
    born_where: z.string().optional().describe("An expression to filter born_events by"),
    return_where: z.string().optional().describe("An expression to filter return events by"),
    interval: z.number().optional().describe("The number of units per individual bucketed interval. Default is 1"),
    interval_count: z.number().optional().describe("The number of individual buckets/intervals to return. Default is 1"),
    unit: z.enum(["day", "week", "month"]).optional().describe("The interval unit: 'day', 'week', or 'month'. Default is 'day'"),
    on: z.string().optional().describe("The property expression to segment the second event on"),
    limit: z.number().optional().describe("Return the top limit segmentation values. Only applies when 'on' is specified")
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id, from_date, to_date, retention_type, born_event, return_event, born_where, return_where, interval, interval_count, unit, on, limit }) => {
    try {
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      const queryParams = new URLSearchParams({
        project_id: project_id || '',
        from_date: from_date,
        to_date: to_date
      });
      
      if (workspace_id) queryParams.append('workspace_id', workspace_id);
      if (retention_type) queryParams.append('retention_type', retention_type);
      if (born_event) queryParams.append('born_event', born_event);
      if (return_event) queryParams.append('event', return_event);
      if (born_where) queryParams.append('born_where', born_where);
      if (return_where) queryParams.append('where', return_where);
      if (interval) queryParams.append('interval', interval.toString());
      if (interval_count) queryParams.append('interval_count', interval_count.toString());
      if (unit) queryParams.append('unit', unit);
      if (on) queryParams.append('on', on);
      if (limit) queryParams.append('limit', limit.toString());
      
      const url = `https://mixpanel.com/api/query/retention?${queryParams.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Format the results
      let resultText = `# Retention Report\n\n`;
      resultText += `**Project ID:** ${project_id}\n`;
      resultText += `**Date Range:** ${from_date} to ${to_date}\n`;
      if (retention_type) resultText += `**Retention Type:** ${retention_type}\n`;
      if (born_event) resultText += `**Born Event:** ${born_event}\n`;
      if (return_event) resultText += `**Return Event:** ${return_event}\n`;
      if (unit) resultText += `**Unit:** ${unit}\n`;
      resultText += "\n";
      
      // Format the cohort data
      resultText += "## Cohort Data\n\n";
      
      // Create a table for each cohort date
      for (const date in data) {
        if (date !== "status" && data[date]) {
          resultText += `### Cohort: ${date}\n\n`;
          
          // Show first day count
          resultText += `**First Day Count:** ${data[date].first}\n\n`;
          
          // Create a table for retention data
          resultText += "| Period | Count | Retention Rate |\n";
          resultText += "|--------|-------|---------------|\n";
          
          // Add rows for each retention period
          data[date].counts.forEach((count: number, index: number) => {
            const retentionRate = ((count / data[date].first) * 100).toFixed(2);
            resultText += `| ${index + 1} | ${count} | ${retentionRate}% |\n`;
          });
          
          resultText += "\n";
        }
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel retention data:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel retention data: ${errorMessage}`
          }
        ]
      };
    }
  }
);

server.tool(
  "custom_jql",
  "Run a custom JQL (JSON Query Language) script against your Mixpanel data",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
    script: z.string().describe("The JQL script to run (JavaScript code that uses Mixpanel's JQL functions)"),
    params: z.string().optional().describe("A JSON string containing parameters to pass to the script (will be available as the 'params' variable)")
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id, script, params }) => {
    try {
      // Create authorization header using base64 encoding of credentials
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      // Construct URL with query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('project_id', project_id);
      if (workspace_id) queryParams.append('workspace_id', workspace_id);
      
      const url = `https://mixpanel.com/api/query/jql?${queryParams.toString()}`;
      
      // Prepare form data for POST request
      const formData = new URLSearchParams();
      formData.append('script', script);
      if (params) formData.append('params', params);
      
      // Set up request options
      const options = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: formData
      };
      
      // Make the API request
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Format the results
      let resultText = `# JQL Query [Mixpanel JQL is deprecated] Results\n\n`;
      resultText += `**Project ID:** ${project_id}\n`;
      if (workspace_id) resultText += `**Workspace ID:** ${workspace_id}\n`;
      resultText += `\n## Script\n\n\`\`\`javascript\n${script}\n\`\`\`\n\n`;
      
      if (params) {
        resultText += `## Parameters\n\n\`\`\`json\n${params}\n\`\`\`\n\n`;
      }
      
      resultText += `## Results\n\n`;
      
      // Format the results based on the structure
      if (Array.isArray(data)) {
        if (data.length === 0) {
          resultText += "No results returned.";
        } else {
          // Check if the results are simple key-value pairs that can be displayed in a table
          const firstItem = data[0];
          const isSimpleObject = typeof firstItem === 'object' && 
                                !Array.isArray(firstItem) && 
                                Object.keys(firstItem).length <= 5;
          
          if (isSimpleObject) {
            // Create a table header with all keys from the first item
            const keys = Object.keys(firstItem);
            resultText += "| " + keys.join(" | ") + " |\n";
            resultText += "| " + keys.map(() => "---").join(" | ") + " |\n";
            
            // Add a row for each item
            data.forEach(item => {
              resultText += "| " + keys.map(key => {
                const value = item[key];
                return typeof value === 'object' ? JSON.stringify(value) : String(value);
              }).join(" | ") + " |\n";
            });
          } else {
            // For complex results, just show the JSON
            resultText += "```json\n" + JSON.stringify(data, null, 2) + "\n```";
          }
        }
      } else {
        // For non-array results, just show the JSON
        resultText += "```json\n" + JSON.stringify(data, null, 2) + "\n```";
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error executing JQL query:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error executing JQL query: ${errorMessage}`
          }
        ]
      };
    }
  }
);

server.tool(
  "query_segmentation_sum",
  "Sum a numeric expression for events over time",
  {
    project_id: z.string().describe("The Mixpanel project ID").optional(),
    workspace_id: z.string().optional().describe("The ID of the workspace if applicable"),
    event: z.string().describe("The event that you wish to get data for (single event name, not an array)"),
    from_date: z.string().describe("The date in yyyy-mm-dd format to begin querying from (inclusive)"),
    to_date: z.string().describe("The date in yyyy-mm-dd format to query to (inclusive)"),
    on: z.string().describe("The expression to sum per unit time (should result in a numeric value)"),
    unit: z.enum(["hour", "day"]).optional().describe("Time bucket size: 'hour' or 'day'. Default is 'day'"),
    where: z.string().optional().describe("An expression to filter events by")
  },
  async ({ project_id = DEFAULT_PROJECT_ID, workspace_id, event, from_date, to_date, on, unit, where }) => {
    try {
      const credentials = `${SERVICE_ACCOUNT_USER_NAME}:${SERVICE_ACCOUNT_PASSWORD}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      
      const queryParams = new URLSearchParams({
        project_id: project_id || '',
        event: event,
        from_date: from_date,
        to_date: to_date,
        on: on
      });
      
      if (workspace_id) queryParams.append('workspace_id', workspace_id);
      if (unit) queryParams.append('unit', unit);
      if (where) queryParams.append('where', where);
      
      const url = `https://mixpanel.com/api/query/segmentation/sum?${queryParams.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Basic ${encodedCredentials}`
        }
      };
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Format the results
      let resultText = `# Segmentation Sum Report\n\n`;
      resultText += `**Project ID:** ${project_id}\n`;
      resultText += `**Event:** ${event}\n`;
      resultText += `**Date Range:** ${from_date} to ${to_date}\n`;
      resultText += `**Expression Summed:** ${on}\n`;
      if (unit) resultText += `**Unit:** ${unit}\n`;
      if (where) resultText += `**Filter:** ${where}\n`;
      resultText += `**Computed At:** ${data.computed_at || 'Not provided'}\n\n`;
      
      // Create a table for the results
      resultText += "## Results\n\n";
      resultText += "| Date | Sum |\n";
      resultText += "|------|-----|\n";
      
      // Sort dates in chronological order
      const dates = Object.keys(data.results).sort();
      
      // Add rows for each date
      for (const date of dates) {
        resultText += `| ${date} | ${data.results[date]} |\n`;
      }
      
      return {
        content: [
          {
            type: "text",
            text: resultText
          }
        ]
      };
    } catch (error: unknown) {
      console.error("Error fetching Mixpanel segmentation sum data:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching Mixpanel segmentation sum data: ${errorMessage}`
          }
        ]
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MIXPANEL MCP SERVER RUNNING ON STDIO")
}

main().catch((error) => {
  console.error("Fatal error in main(): ", error);
  process.exit(1);
})