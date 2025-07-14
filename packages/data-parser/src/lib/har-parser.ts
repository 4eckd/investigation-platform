/**
 * HAR (HTTP Archive) Parser Utility
 * Provides functionality to parse and analyze HAR files
 */

export interface HAREntry {
  startedDateTime: string;
  time: number;
  request: {
    method: string;
    url: string;
    httpVersion: string;
    headers: Array<{ name: string; value: string }>;
    queryString: Array<{ name: string; value: string }>;
    postData?: {
      mimeType: string;
      text: string;
    };
  };
  response: {
    status: number;
    statusText: string;
    httpVersion: string;
    headers: Array<{ name: string; value: string }>;
    content: {
      size: number;
      mimeType: string;
      text?: string;
    };
  };
  cache: any;
  timings: {
    blocked: number;
    dns: number;
    connect: number;
    send: number;
    wait: number;
    receive: number;
    ssl: number;
  };
}

export interface HARData {
  log: {
    version: string;
    creator: {
      name: string;
      version: string;
    };
    entries: HAREntry[];
  };
}

export interface ParsedHARData {
  totalRequests: number;
  totalSize: number;
  averageResponseTime: number;
  domains: string[];
  requests: HAREntry[];
  errorRequests: HAREntry[];
  slowRequests: HAREntry[];
}

export class HARParser {
  /**
   * Parse HAR file from JSON string
   */
  static parseFromJSON(harData: string): ParsedHARData {
    try {
      const data: HARData = JSON.parse(harData);
      return this.processHARData(data);
    } catch (error) {
      throw new Error(`Failed to parse HAR JSON: ${error}`);
    }
  }

  /**
   * Process and analyze HAR data
   */
  private static processHARData(harData: HARData): ParsedHARData {
    const entries = harData.log.entries;
    
    if (!entries || !Array.isArray(entries)) {
      throw new Error('Invalid HAR data: entries array is required');
    }

    const totalRequests = entries.length;
    const totalSize = entries.reduce((sum, entry) => sum + entry.response.content.size, 0);
    const averageResponseTime = entries.reduce((sum, entry) => sum + entry.time, 0) / totalRequests;
    
    const domains = [...new Set(entries.map(entry => new URL(entry.request.url).hostname))];
    
    const errorRequests = entries.filter(entry => entry.response.status >= 400);
    const slowRequests = entries.filter(entry => entry.time > 1000); // > 1 second

    return {
      totalRequests,
      totalSize,
      averageResponseTime,
      domains,
      requests: entries,
      errorRequests,
      slowRequests
    };
  }

  /**
   * Filter requests by domain
   */
  static filterByDomain(harData: ParsedHARData, domain: string): HAREntry[] {
    return harData.requests.filter(entry => 
      new URL(entry.request.url).hostname === domain
    );
  }

  /**
   * Filter requests by status code
   */
  static filterByStatusCode(harData: ParsedHARData, statusCode: number): HAREntry[] {
    return harData.requests.filter(entry => entry.response.status === statusCode);
  }

  /**
   * Filter requests by content type
   */
  static filterByContentType(harData: ParsedHARData, contentType: string): HAREntry[] {
    return harData.requests.filter(entry => 
      entry.response.content.mimeType.includes(contentType)
    );
  }

  /**
   * Get performance metrics
   */
  static getPerformanceMetrics(harData: ParsedHARData): {
    totalTime: number;
    dnsTime: number;
    connectTime: number;
    sendTime: number;
    waitTime: number;
    receiveTime: number;
  } {
    const totals = harData.requests.reduce((acc, entry) => {
      acc.totalTime += entry.time;
      acc.dnsTime += entry.timings.dns;
      acc.connectTime += entry.timings.connect;
      acc.sendTime += entry.timings.send;
      acc.waitTime += entry.timings.wait;
      acc.receiveTime += entry.timings.receive;
      return acc;
    }, {
      totalTime: 0,
      dnsTime: 0,
      connectTime: 0,
      sendTime: 0,
      waitTime: 0,
      receiveTime: 0
    });

    return totals;
  }

  /**
   * Export analysis to JSON
   */
  static exportAnalysis(harData: ParsedHARData): string {
    const analysis = {
      summary: {
        totalRequests: harData.totalRequests,
        totalSize: harData.totalSize,
        averageResponseTime: harData.averageResponseTime,
        domains: harData.domains,
        errorCount: harData.errorRequests.length,
        slowRequestCount: harData.slowRequests.length
      },
      performanceMetrics: this.getPerformanceMetrics(harData),
      errors: harData.errorRequests.map(entry => ({
        url: entry.request.url,
        status: entry.response.status,
        statusText: entry.response.statusText,
        time: entry.time
      })),
      slowRequests: harData.slowRequests.map(entry => ({
        url: entry.request.url,
        time: entry.time,
        size: entry.response.content.size
      }))
    };

    return JSON.stringify(analysis, null, 2);
  }

  /**
   * Export to CSV format
   */
  static exportToCSV(harData: ParsedHARData): string {
    const headers = [
      'URL',
      'Method',
      'Status',
      'Status Text',
      'Content Type',
      'Size',
      'Time',
      'DNS Time',
      'Connect Time',
      'Send Time',
      'Wait Time',
      'Receive Time'
    ];

    const rows = harData.requests.map(entry => [
      entry.request.url,
      entry.request.method,
      entry.response.status,
      entry.response.statusText,
      entry.response.content.mimeType,
      entry.response.content.size,
      entry.time,
      entry.timings.dns,
      entry.timings.connect,
      entry.timings.send,
      entry.timings.wait,
      entry.timings.receive
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}
