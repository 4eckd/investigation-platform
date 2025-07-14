/**
 * Timeline Parser Utility
 * Provides functionality to parse and process timeline data
 */

export interface TimelineEvent {
  timestamp: Date;
  event: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface TimelineData {
  events: TimelineEvent[];
  startTime: Date;
  endTime: Date;
  duration: number;
}

export class TimelineParser {
  /**
   * Parse timeline data from various formats
   */
  static parseFromJSON(jsonData: string): TimelineData {
    try {
      const data = JSON.parse(jsonData);
      return this.processTimelineData(data);
    } catch (error) {
      throw new Error(`Failed to parse timeline JSON: ${error}`);
    }
  }

  /**
   * Parse timeline data from markdown format
   */
  static parseFromMarkdown(markdownData: string): TimelineData {
    const lines = markdownData.split('\n');
    const events: TimelineEvent[] = [];
    
    for (const line of lines) {
      // Simple markdown timeline format: "- [timestamp] event: description"
      const match = line.match(/^-\s*\[(.*?)\]\s*(.*?):\s*(.*)/);
      if (match) {
        const [, timestamp, event, description] = match;
        events.push({
          timestamp: new Date(timestamp),
          event: event.trim(),
          description: description.trim()
        });
      }
    }

    return this.processTimelineData({ events });
  }

  /**
   * Process and validate timeline data
   */
  private static processTimelineData(data: any): TimelineData {
    if (!data.events || !Array.isArray(data.events)) {
      throw new Error('Invalid timeline data: events array is required');
    }

    const events: TimelineEvent[] = data.events.map((event: any) => ({
      timestamp: new Date(event.timestamp),
      event: event.event,
      description: event.description,
      metadata: event.metadata
    }));

    // Sort events by timestamp
    events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const startTime = events[0]?.timestamp || new Date();
    const endTime = events[events.length - 1]?.timestamp || new Date();
    const duration = endTime.getTime() - startTime.getTime();

    return {
      events,
      startTime,
      endTime,
      duration
    };
  }

  /**
   * Filter events by date range
   */
  static filterByDateRange(timeline: TimelineData, startDate: Date, endDate: Date): TimelineData {
    const filteredEvents = timeline.events.filter(event => 
      event.timestamp >= startDate && event.timestamp <= endDate
    );

    return this.processTimelineData({ events: filteredEvents });
  }

  /**
   * Export timeline to JSON format
   */
  static exportToJSON(timeline: TimelineData): string {
    return JSON.stringify(timeline, null, 2);
  }

  /**
   * Export timeline to markdown format
   */
  static exportToMarkdown(timeline: TimelineData): string {
    let markdown = `# Timeline\n\n`;
    markdown += `**Duration:** ${timeline.duration}ms\n`;
    markdown += `**Start:** ${timeline.startTime.toISOString()}\n`;
    markdown += `**End:** ${timeline.endTime.toISOString()}\n\n`;
    markdown += `## Events\n\n`;

    for (const event of timeline.events) {
      markdown += `- [${event.timestamp.toISOString()}] ${event.event}`;
      if (event.description) {
        markdown += `: ${event.description}`;
      }
      markdown += '\n';
    }

    return markdown;
  }
}
