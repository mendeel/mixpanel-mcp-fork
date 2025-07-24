# Aria Internal Chatbot: First Two Weeks Analysis (July 1st - July 15th)

## Executive Summary

This report provides a comprehensive analysis of the first two weeks of usage for the internal AI chatbot, Aria. The analysis is based on Mixpanel data from July 1st to July 15th, focusing on the production environment (`aria.arrive.com`).

Overall, the initial data shows a healthy level of engagement with Aria, with a consistent number of daily active users. However, the lack of specific feedback events (e.g., thumbs up/down) and detailed conversation metrics limits a deeper understanding of user satisfaction and interaction quality.

This report recommends the implementation of more granular event tracking to enable a more in-depth analysis of user behavior and sentiment.

## KPIs Analysis

### 1. Daily Active Users (DAU)

The DAU is measured by the number of unique users who have viewed a page on the Aria website each day.

| Date       | Daily Active Users |
|------------|--------------------|
| 2025-07-01 | 23                 |
| 2025-07-02 | 24                 |
| 2025-07-03 | 28                 |
| 2025-07-04 | 20                 |
| 2025-07-05 | 2                  |
| 2025-07-06 | 1                  |
| 2025-07-07 | 28                 |
| 2025-07-08 | 28                 |
| 2025-07-09 | 25                 |
| 2025-07-10 | 25                 |
| 2025-07-11 | 18                 |
| 2025-07-12 | 1                  |
| 2025-07-13 | 2                  |
| 2025-07-14 | 18                 |
| 2025-07-15 | 18                 |

**Observations:**

*   There is a consistent number of daily active users during the weekdays, with an average of **23 unique users per day**.
*   As expected, there is a significant drop in usage during the weekends.
*   The DAU has remained relatively stable over the two-week period.

### 2. User Feedback

There is currently no data available for user feedback events such as "Aria: Thumbs Up" or "Aria: Thumbs Down". This is a critical gap in our analytics, as it prevents us from measuring user satisfaction with the chatbot's responses.

### 3. Conversation Metrics

Similarly, there is no data available for conversation-specific events such as "Aria: Conversation Started" or "Aria: Message Sent". This limits our ability to analyze how users are interacting with the chatbot, including:

*   The number of conversations initiated.
*   The average number of messages per conversation.
*   The most common queries.

## Actionable Insights

*   **Consistent Weekday Usage:** The stable DAU during weekdays indicates that employees are incorporating Aria into their regular workflow.
*   **Lack of Granular Data:** The absence of specific feedback and conversation events is a major blind spot. We cannot currently assess the quality of the user experience or identify areas for improvement.
*   **Untracked Clicks:** The lack of `$mp_click` data suggests that we are not tracking user interactions with UI elements within the application.

## Recommendations

1.  **Implement Granular Event Tracking:** To gain a deeper understanding of user behavior and satisfaction, it is crucial to implement the following Mixpanel events:
    *   `Aria: Thumbs Up`: To measure positive feedback.
    *   `Aria: Thumbs Down`: To measure negative feedback.
    *   `Aria: Conversation Started`: To track the number of conversations initiated.
    *   `Aria: Message Sent`: To track the number of messages sent.
    *   `Aria: Query Sent`: To analyze the types of questions users are asking.
    *   `Aria: Contact Details`: To track when users request contact information.

2.  **Enable Autocapture or Manual Click Tracking:** To understand how users are interacting with the UI, we should either enable Mixpanel's autocapture feature or manually track clicks on key UI elements.

3.  **Conduct a Follow-up Analysis:** Once the new events are implemented, a follow-up analysis should be conducted to measure the impact of these changes and gain a more comprehensive understanding of user engagement with Aria.
