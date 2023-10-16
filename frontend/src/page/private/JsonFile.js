export const jsonValue = (uuid) => {
    return `{
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": 7,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 17,
      "panels": [],
      "title": "First Page",
      "type": "row"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "gridPos": {
        "h": 19,
        "w": 24,
        "x": 0,
        "y": 1
      },
      "id": 10,
      "options": {
        "nodes": {
          "arcs": [
            {
              "color": "#73BF69",
              "field": "arc__ok_rate"
            },
            {
              "color": "#F2495C",
              "field": "arc__error_rate"
            }
          ],
          "mainStatUnit": "ms"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     ServiceName as id,     ServiceName as title,     AVG(Duration) / 1000000 as mainstat,    CONCAT(CAST(ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS CHAR), '%') AS detail__ERROR_RATE,    ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_OK' or StatusCode = 'STATUS_CODE_UNSET' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 2) AS arc__ok_rate,   ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 2) AS arc__error_rate FROM     otel_traces WHERE ResourceAttributes['user_id'] = '${uuid}' GROUP BY ServiceName;",
          "refId": "A",
          "selectedFormat": 4
        },
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "hide": false,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     CONCAT(s.ServiceName, '_', t.ServiceName) as id,    s.ServiceName as source,    t.ServiceName as target,    AVG(t.Duration) / 1000 as detail__RESPONSE_TIME,    CAST(COUNT(*) AS CHAR) as detail__REQUEST_COUNT,    CONCAT(CAST(ROUND(SUM(CASE WHEN t.StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS CHAR), '%') AS detail__ERROR_RATE FROM  otel_traces s JOIN  otel_traces t ON s.SpanId = t.ParentSpanId AND s.TraceId = t.TraceId  GROUP BY  s.ServiceName, t.ServiceName;",
          "refId": "B",
          "selectedFormat": 4
        }
      ],
      "title": "Service Map",
      "type": "nodeGraph"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "custom": {
            "align": "auto",
            "cellOptions": {
              "type": "auto"
            },
            "inspect": false
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 11,
        "w": 24,
        "x": 0,
        "y": 20
      },
      "id": 11,
      "options": {
        "cellHeight": "sm",
        "footer": {
          "countRows": false,
          "fields": "",
          "reducer": [
            "sum"
          ],
          "show": false
        },
        "showHeader": true
      },
      "pluginVersion": "10.1.4",
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "WITH TotalCount AS (     SELECT COUNT(*) as AllRows         FROM otel_traces ) SELECT     ServiceName,    CONCAT(CAST(ROUND(AVG(Duration) / 1000,2) AS VARCHAR), 'ms') as Response_Times,    CONCAT(CAST(ROUND((COUNT(*) * 100.0 / (SELECT AllRows FROM TotalCount)), 2) AS VARCHAR), '%') AS Request_Rates,    CONCAT(CAST(ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS VARCHAR), '%') AS Error_Rates FROM     otel_traces WHERE      ResourceAttributes['user_id'] = '${uuid}'  AND \$__conditionalAll(TraceId IN (\${trace_id:singlequote}),  \$trace_id) AND     \$__timeFilter(Timestamp) GROUP BY     ServiceName;",
          "refId": "A",
          "selectedFormat": 4
        }
      ],
      "title": "Service OverView",
      "type": "table"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 100,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 0,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "normal"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "percent"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 10,
        "w": 24,
        "x": 0,
        "y": 31
      },
      "id": 2,
      "maxDataPoints": 50,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "builderOptions": {
            "database": "default",
            "fields": [],
            "filters": [
              {
                "condition": "AND",
                "filterType": "custom",
                "key": "Timestamp",
                "operator": "WITH IN DASHBOARD TIME RANGE",
                "restrictToFields": [
                  {
                    "label": "Timestamp",
                    "name": "Timestamp",
                    "picklistValues": [],
                    "type": "DateTime64(9)"
                  }
                ],
                "type": "datetime"
              }
            ],
            "groupBy": [
              "ServiceName"
            ],
            "limit": 10000,
            "metrics": [
              {
                "aggregation": "count",
                "field": ""
              }
            ],
            "mode": "trend",
            "orderBy": [],
            "table": "otel_traces",
            "timeField": "Timestamp",
            "timeFieldType": "DateTime64(9)"
          },
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "database": "default",
              "fields": [],
              "filters": [
                {
                  "condition": "AND",
                  "filterType": "custom",
                  "key": "Timestamp",
                  "operator": "WITH IN DASHBOARD TIME RANGE",
                  "restrictToFields": [
                    {
                      "label": "Timestamp",
                      "name": "Timestamp",
                      "picklistValues": [],
                      "type": "DateTime64(9)"
                    }
                  ],
                  "type": "datetime"
                }
              ],
              "groupBy": [
                "ServiceName"
              ],
              "limit": 10000,
              "metrics": [
                {
                  "aggregation": "count",
                  "field": ""
                }
              ],
              "mode": "trend",
              "orderBy": [],
              "table": "otel_traces",
              "timeField": "Timestamp",
              "timeFieldType": "DateTime64(9)"
            }
          },
          "queryType": "sql",
          "rawSql": "WITH RequestCounts AS (    SELECT             toStartOfMinute(\`Timestamp\`) AS time,             ServiceName,             COUNT(*) AS RequestCount       FROM otel_traces       WHERE             ResourceAttributes['user_id'] = '${uuid}' AND             \$__conditionalAll(TraceId IN (\${trace_id:singlequote}), \$trace_id) AND             \$__timeFilter(Timestamp)     GROUP BY ServiceName, time), TotalRequestCounts AS (    SELECT             toStartOfMinute(\`Timestamp\`) AS time,             COUNT(*) AS TotalRequestCount       FROM otel_traces        GROUP BY time ) SELECT       rc.time,       rc.ServiceName,       ROUND((rc.RequestCount * 100.0 / trc.TotalRequestCount), 5) AS RequestPercentage FROM RequestCounts rc  JOIN TotalRequestCounts trc ON rc.time = trc.time ORDER BY rc.time ASC, rc.ServiceName LIMIT 100000   ",
          "refId": "A",
          "selectedFormat": 0
        }
      ],
      "title": "Request Rates",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "description": "",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 28,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 6,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "normal"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "ns"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 24,
        "x": 0,
        "y": 41
      },
      "id": 7,
      "maxDataPoints": 50,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "builderOptions": {
            "database": "default",
            "fields": [],
            "filters": [
              {
                "condition": "AND",
                "filterType": "custom",
                "key": "Timestamp",
                "operator": "WITH IN DASHBOARD TIME RANGE",
                "restrictToFields": [
                  {
                    "label": "Timestamp",
                    "name": "Timestamp",
                    "picklistValues": [],
                    "type": "DateTime64(9)"
                  }
                ],
                "type": "datetime"
              }
            ],
            "groupBy": [
              "ServiceName"
            ],
            "limit": 10000,
            "metrics": [
              {
                "aggregation": "count",
                "field": ""
              }
            ],
            "mode": "trend",
            "orderBy": [],
            "table": "otel_traces",
            "timeField": "Timestamp",
            "timeFieldType": "DateTime64(9)"
          },
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "database": "default",
              "fields": [],
              "filters": [
                {
                  "condition": "AND",
                  "filterType": "custom",
                  "key": "Timestamp",
                  "operator": "WITH IN DASHBOARD TIME RANGE",
                  "restrictToFields": [
                    {
                      "label": "Timestamp",
                      "name": "Timestamp",
                      "picklistValues": [],
                      "type": "DateTime64(9)"
                    }
                  ],
                  "type": "datetime"
                }
              ],
              "groupBy": [
                "ServiceName"
              ],
              "limit": 10000,
              "metrics": [
                {
                  "aggregation": "count",
                  "field": ""
                }
              ],
              "mode": "trend",
              "orderBy": [],
              "table": "otel_traces",
              "timeField": "Timestamp",
              "timeFieldType": "DateTime64(9)"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     $__timeInterval(Timestamp) as time, ServiceName,     AVG(Duration) /10 as \` \` FROM     otel_traces WHERE     ResourceAttributes['user_id'] = '${uuid}' AND    ServiceName != 'loadgenerator' GROUP BY     time, ServiceName ORDER BY     time ASC LIMIT 100000",
          "refId": "A",
          "selectedFormat": 0
        }
      ],
      "title": "Response Times",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "description": "",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "bars",
            "fillOpacity": 24,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "decbytes"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 24,
        "x": 0,
        "y": 50
      },
      "id": 8,
      "maxDataPoints": 50,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "9.4.1",
      "targets": [
        {
          "builderOptions": {
            "database": "default",
            "fields": [],
            "filters": [
              {
                "condition": "AND",
                "filterType": "custom",
                "key": "Timestamp",
                "operator": "WITH IN DASHBOARD TIME RANGE",
                "restrictToFields": [
                  {
                    "label": "Timestamp",
                    "name": "Timestamp",
                    "picklistValues": [],
                    "type": "DateTime64(9)"
                  }
                ],
                "type": "datetime"
              }
            ],
            "groupBy": [
              "ServiceName"
            ],
            "limit": 10000,
            "metrics": [
              {
                "aggregation": "count",
                "field": ""
              }
            ],
            "mode": "trend",
            "orderBy": [],
            "table": "otel_traces",
            "timeField": "Timestamp",
            "timeFieldType": "DateTime64(9)"
          },
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "database": "default",
              "fields": [],
              "filters": [
                {
                  "condition": "AND",
                  "filterType": "custom",
                  "key": "Timestamp",
                  "operator": "WITH IN DASHBOARD TIME RANGE",
                  "restrictToFields": [
                    {
                      "label": "Timestamp",
                      "name": "Timestamp",
                      "picklistValues": [],
                      "type": "DateTime64(9)"
                    }
                  ],
                  "type": "datetime"
                }
              ],
              "groupBy": [
                "ServiceName"
              ],
              "limit": 10000,
              "metrics": [
                {
                  "aggregation": "count",
                  "field": ""
                }
              ],
              "mode": "trend",
              "orderBy": [],
              "table": "otel_traces",
              "timeField": "Timestamp",
              "timeFieldType": "DateTime64(9)"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     \$__timeInterval(Timestamp) as time,     ServiceName,     AVG(Duration) as \` \` FROM     otel_traces WHERE     ResourceAttributes['user_id'] = '${uuid}' AND     \$__conditionalAll(TraceId IN (\${trace_id:singlequote}),  \$trace_id) AND     \$__timeFilter(Timestamp) AND      Timestamp >= \$__fromTime AND     Timestamp <= \$__toTime AND     ServiceName != 'loadgenerator' GROUP BY     time, ServiceName ORDER BY     time ASC LIMIT 100000",
          "refId": "A",
          "selectedFormat": 0
        }
      ],
      "title": "Error rates",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "percent"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 10,
        "w": 24,
        "x": 0,
        "y": 59
      },
      "id": 21,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     toStartOfMinute(TimeUnix) AS Time,     concat(MetricName, ' (', ResourceAttributes['service.name'], ')') AS Metric,     avg(Value) AS Avg_CPU_Usage FROM     otel_metrics_gauge WHERE     MetricName LIKE '%cpu%' AND     ResourceAttributes['user_id'] = '${uuid}' GROUP BY     Time, Metric ORDER BY     Time, Metric;",
          "refId": "A",
          "selectedFormat": 4
        },
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "hide": false,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "WITH TotalCount AS ( SELECT   toStartOfMinute(TimeUnix) as avg_time,   AVG(Value) AS Avg_CPU_Usage,   concat(MetricName, ' (', ResourceAttributes['service.name'], ')') AS Metric FROM   otel_metrics_gauge WHERE   MetricName LIKE '%cpu%' GROUP BY   avg_time, Metric ORDER BY   avg_time, Metric   )   SELECT sum(Avg_CPU_Usage) as Total_CPU_USage, avg_time FROM TotalCount Group By avg_time   ",
          "refId": "B",
          "selectedFormat": 4
        }
      ],
      "title": "CPU Usage",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "decbytes"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 7,
        "w": 24,
        "x": 0,
        "y": 69
      },
      "id": 22,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     toStartOfMinute(TimeUnix) AS Time,     concat(MetricName, ' (', COALESCE(ResourceAttributes['service.name'], 'Unknown'), ')') AS Metric,     avg(Value) AS Avg_MEMORY_Usage FROM otel_metrics_sum WHERE     MetricName LIKE '%memory%' AND     ResourceAttributes['user_id'] = '${uuid}' GROUP BY     Time, Metric ORDER BY     Time, Metric;",
          "refId": "A",
          "selectedFormat": 4
        },
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "hide": false,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "WITH TotalCount AS ( SELECT   toStartOfMinute(TimeUnix) as avg_time,   AVG(Value) AS Avg_MEMORY_Usage,   concat(MetricName, ' (', ResourceAttributes['service.name'], ')') AS Metric FROM   otel_metrics_sum WHERE   MetricName LIKE '%memory%' GROUP BY   avg_time, Metric ORDER BY   avg_time, Metric   )  SELECT sum(Avg_MEMORY_Usage) as Total_MEMORY_USage, avg_time FROM TotalCount Group By avg_time   ",
          "refId": "B",
          "selectedFormat": 4
        }
      ],
      "title": "Memory Usage",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "decbytes"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 7,
        "w": 24,
        "x": 0,
        "y": 76
      },
      "id": 23,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     toStartOfMinute(TimeUnix) AS Time,     concat(MetricName, ' (', COALESCE(ResourceAttributes['service.name'], 'Unknown'), ')') AS Metric,     avg(Value) AS Avg_CPU_Usage FROM     otel_metrics_sum WHERE     MetricName LIKE '%disk%' AND     ResourceAttributes['user_id'] = '${uuid}' GROUP BY     Time, Metric ORDER BY     Time, Metric;",
          "refId": "A",
          "selectedFormat": 4
        },
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "hide": false,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "WITH TotalCount AS ( SELECT   toStartOfMinute(TimeUnix) as avg_time,   AVG(Value) AS Avg_CPU_Usage,   concat(MetricName, ' (', ResourceAttributes['service.name'], ')') AS Metric FROM   otel_metrics_sum WHERE   MetricName LIKE '%disk%' GROUP BY   avg_time, Metric ORDER BY   avg_time, Metric   )   SELECT sum(Avg_CPU_Usage) as Total_CPU_USage, avg_time FROM TotalCount Group By avg_time   ",
          "refId": "B",
          "selectedFormat": 4
        }
      ],
      "title": "Disk Usage",
      "type": "timeseries"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 83
      },
      "id": 15,
      "panels": [],
      "title": "Second Page",
      "type": "row"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "gridPos": {
        "h": 22,
        "w": 24,
        "x": 0,
        "y": 84
      },
      "id": 26,
      "options": {
        "nodes": {
          "arcs": [
            {
              "color": "#73BF69",
              "field": "arc__ok_rate"
            },
            {
              "color": "#F2495C",
              "field": "arc__error_rate"
            }
          ],
          "mainStatUnit": "ms"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     ServiceName as id,     ServiceName as title,     AVG(Duration) / 1000000 as mainstat,    CONCAT(CAST(ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS CHAR), '%') AS detail__ERROR_RATE,    ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_OK' or StatusCode = 'STATUS_CODE_UNSET' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 2) AS arc__ok_rate,   ROUND(SUM(CASE WHEN StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 2) AS arc__error_rate FROM     otel_traces WHERE ResourceAttributes['user_id'] = '${uuid}' GROUP BY ServiceName;",
          "refId": "A",
          "selectedFormat": 4
        },
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "hide": false,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     CONCAT(s.ServiceName, '_', t.ServiceName) as id,    s.ServiceName as source,    t.ServiceName as target,    AVG(t.Duration) / 1000 as detail__RESPONSE_TIME,    CAST(COUNT(*) AS CHAR) as detail__REQUEST_COUNT,    CONCAT(CAST(ROUND(SUM(CASE WHEN t.StatusCode = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS CHAR), '%') AS detail__ERROR_RATE FROM  otel_traces s JOIN  otel_traces t ON s.SpanId = t.ParentSpanId AND s.TraceId = t.TraceId  GROUP BY  s.ServiceName, t.ServiceName;",
          "refId": "B",
          "selectedFormat": 4
        }
      ],
      "title": "Service Map",
      "type": "nodeGraph"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "custom": {
            "align": "auto",
            "cellOptions": {
              "type": "auto"
            },
            "inspect": false
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": [
          {
            "matcher": {
              "id": "byName",
              "options": "Trace Id"
            },
            "properties": [
              {
                "id": "custom.width",
                "value": 207
              },
              {
                "id": "links",
                "value": [
                  {
                    "title": "__value.raw",
                    "url": "/d/8klBUGfVk/otel-traces?\${__url_time_range}﻿&﻿\${serviceName:queryparam}﻿&var-trace_id=\${__value.raw}"
                  }
                ]
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "Service Name"
            },
            "properties": [
              {
                "id": "custom.width",
                "value": 184
              },
              {
                "id": "links",
                "value": [
                  {
                    "title": "__value.raw",
                    "url": "/d/8klBUGfVk/otel-traces?\${__url_time_range}﻿&﻿\${trace_id:queryparam}﻿&var-serviceName=\${__value.raw}"
                  }
                ]
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "Duration"
            },
            "properties": [
              {
                "id": "custom.width",
                "value": 363
              },
              {
                "id": "unit",
                "value": "ms"
              },
              {
                "id": "custom.cellOptions",
                "value": {
                  "mode": "basic",
                  "type": "gauge"
                }
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "Timestamp"
            },
            "properties": [
              {
                "id": "custom.width",
                "value": 216
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "Service Tags"
            },
            "properties": [
              {
                "id": "custom.inspect",
                "value": true
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "min(Timestamp)"
            },
            "properties": [
              {
                "id": "custom.width",
                "value": 248
              }
            ]
          },
          {
            "matcher": {
              "id": "byName",
              "options": "timestamp"
            },
            "properties": [
              {
                "id": "custom.width",
                "value": 234
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 15,
        "w": 12,
        "x": 0,
        "y": 106
      },
      "id": 4,
      "options": {
        "cellHeight": "sm",
        "footer": {
          "countRows": false,
          "fields": "",
          "reducer": [
            "sum"
          ],
          "show": false
        },
        "showHeader": true,
        "sortBy": [
          {
            "desc": true,
            "displayName": "timestamp"
          }
        ]
      },
      "pluginVersion": "10.1.4",
      "targets": [
        {
          "builderOptions": {
            "database": "default",
            "fields": [],
            "filters": [
              {
                "condition": "AND",
                "filterType": "custom",
                "key": "Timestamp",
                "operator": "WITH IN DASHBOARD TIME RANGE",
                "restrictToFields": [
                  {
                    "label": "Timestamp",
                    "name": "Timestamp",
                    "picklistValues": [],
                    "type": "DateTime64(9)"
                  }
                ],
                "type": "datetime"
              }
            ],
            "limit": 100,
            "mode": "list",
            "orderBy": [],
            "table": "otel_traces"
          },
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "meta": {
            "builderOptions": {
              "database": "default",
              "fields": [],
              "filters": [
                {
                  "condition": "AND",
                  "filterType": "custom",
                  "key": "Timestamp",
                  "operator": "WITH IN DASHBOARD TIME RANGE",
                  "restrictToFields": [
                    {
                      "label": "Timestamp",
                      "name": "Timestamp",
                      "picklistValues": [],
                      "type": "DateTime64(9)"
                    }
                  ],
                  "type": "datetime"
                }
              ],
              "limit": 100,
              "mode": "list",
              "orderBy": [],
              "table": "otel_traces"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT    min(Timestamp) as timestamp,     TraceId as \`Trace Id\`,     argMin(ServiceName, Timestamp) as \`Service Name\`,     sum(Duration)/1000000 as Duration  FROM     otel_traces WHERE     ResourceAttributes['user_id'] = '${uuid}' AND     \$__conditionalAll(TraceId IN (\${trace_id:singlequote}),  \$trace_id) AND     (\$__timeFilter(Timestamp)) AND     ServiceName != 'loadgenerator' GROUP BY     TraceId ORDER BY     Duration DESC LIMIT 100",
          "refId": "A",
          "selectedFormat": 1
        }
      ],
      "title": "Traces",
      "type": "table"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "gridPos": {
        "h": 15,
        "w": 12,
        "x": 12,
        "y": 106
      },
      "id": 6,
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 3,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     TraceId as traceID,     SpanId as spanID,     SpanName as operationName,     ParentSpanId as parentSpanID,     ServiceName as serviceName,     Duration/1000000 as duration,     Timestamp as startTime,     arrayMap(key -> map('key', key, 'value',SpanAttributes[key]), mapKeys(SpanAttributes)) as tags,     arrayMap(key -> map('key', key, 'value',ResourceAttributes[key]), mapKeys(ResourceAttributes)) as serviceTags FROM     otel_traces WHERE     TraceId = '\${trace_id}' ORDER BY     startTime ASC",
          "refId": "A",
          "selectedFormat": 3
        }
      ],
      "title": "Trace Details",
      "type": "traces"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "description": "",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "pointSize": {
              "fixed": 5
            },
            "scaleDistribution": {
              "type": "linear"
            },
            "show": "points"
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "ns"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 24,
        "x": 0,
        "y": 121
      },
      "id": 19,
      "maxDataPoints": 50,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "series": [],
        "seriesMapping": "auto",
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "builderOptions": {
            "database": "default",
            "fields": [],
            "filters": [
              {
                "condition": "AND",
                "filterType": "custom",
                "key": "Timestamp",
                "operator": "WITH IN DASHBOARD TIME RANGE",
                "restrictToFields": [
                  {
                    "label": "Timestamp",
                    "name": "Timestamp",
                    "picklistValues": [],
                    "type": "DateTime64(9)"
                  }
                ],
                "type": "datetime"
              }
            ],
            "groupBy": [
              "ServiceName"
            ],
            "limit": 10000,
            "metrics": [
              {
                "aggregation": "count",
                "field": ""
              }
            ],
            "mode": "trend",
            "orderBy": [],
            "table": "otel_traces",
            "timeField": "Timestamp",
            "timeFieldType": "DateTime64(9)"
          },
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 0,
          "meta": {
            "builderOptions": {
              "database": "default",
              "fields": [],
              "filters": [
                {
                  "condition": "AND",
                  "filterType": "custom",
                  "key": "Timestamp",
                  "operator": "WITH IN DASHBOARD TIME RANGE",
                  "restrictToFields": [
                    {
                      "label": "Timestamp",
                      "name": "Timestamp",
                      "picklistValues": [],
                      "type": "DateTime64(9)"
                    }
                  ],
                  "type": "datetime"
                }
              ],
              "groupBy": [
                "ServiceName"
              ],
              "limit": 10000,
              "metrics": [
                {
                  "aggregation": "count",
                  "field": ""
                }
              ],
              "mode": "trend",
              "orderBy": [],
              "table": "otel_traces",
              "timeField": "Timestamp",
              "timeFieldType": "DateTime64(9)"
            }
          },
          "queryType": "sql",
          "rawSql": "SELECT     \$__timeInterval(Timestamp) as time,     ServiceName,     AVG(Duration) AS \` \` FROM     otel_traces WHERE \$__conditionalAll(TraceId IN (\${trace_id:singlequote}), \$trace_id) AND \$__timeFilter(Timestamp) AND      Timestamp >= \$__fromTime AND     Timestamp <= \$__toTime AND     ServiceName != 'loadgenerator'GROUP BY     time, ServiceName ORDER BY     time ASC LIMIT 100000",
          "refId": "A",
          "selectedFormat": 0
        }
      ],
      "title": "Response Times",
      "type": "xychart"
    },
    {
      "datasource": {
        "type": "grafana-clickhouse-datasource",
        "uid": "ad81414b-f4e6-440f-a603-ba68575d741d"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "thresholds"
          },
          "custom": {
            "fillOpacity": 73,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineWidth": 1
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "ns"
        },
        "overrides": [
          {
            "__systemRef": "hideSeriesFrom",
            "matcher": {
              "id": "byNames",
              "options": {
                "mode": "exclude",
                "names": [
                  "Avg_Duration"
                ],
                "prefix": "All except:",
                "readOnly": true
              }
            },
            "properties": [
              {
                "id": "custom.hideFrom",
                "value": {
                  "legend": false,
                  "tooltip": false,
                  "viz": true
                }
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 8,
        "w": 24,
        "x": 0,
        "y": 130
      },
      "id": 25,
      "options": {
        "bucketOffset": 0,
        "combine": false,
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        }
      },
      "pluginVersion": "9.4.3",
      "targets": [
        {
          "datasource": {
            "type": "grafana-clickhouse-datasource",
            "uid": "clickhouse-traces"
          },
          "format": 1,
          "meta": {
            "builderOptions": {
              "fields": [],
              "limit": 100,
              "mode": "list"
            }
          },
          "queryType": "sql",
          "rawSql": "WITH ServiceDurations AS ( SELECT        ServiceName,        Duration    FROM        otel_traces),ServiceStats AS (    SELECT        ServiceName,        AVG(Duration) AS Avg_Duration    FROM        ServiceDurations    GROUP BY        ServiceName) SELECT    s.ServiceName as ServiceName,    Avg_Duration,    SQRT(SUM(POW(d.Duration - Avg_Duration, 2)) / COUNT(*)) AS StdDev_Duration FROM    ServiceDurations d JOIN    ServiceStats s ON d.ServiceName = s.ServiceName GROUP BY    s.ServiceName, Avg_Duration ORDER BY    s.ServiceName;",
          "refId": "A",
          "selectedFormat": 4
        }
      ],
      "title": "Summary",
      "type": "histogram"
    }
  ],
  "refresh": false,
  "revision": 1,
  "schemaVersion": 38,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": [
      {
        "current": {
          "selected": false,
          "text": "All",
          "value": "\$__all"
        },
        "datasource": {
          "type": "grafana-clickhouse-datasource",
          "uid": "clickhouse-traces"
        },
        "definition": "SELECT DISTINCT ServiceName FROM otel_traces",
        "hide": 0,
        "includeAll": true,
        "label": "Service Name",
        "multi": true,
        "name": "serviceName",
        "options": [],
        "query": "SELECT DISTINCT ServiceName FROM otel_traces",
        "refresh": 1,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "type": "query"
      },
      {
        "allValue": "empty",
        "current": {
          "selected": false,
          "text": "All",
          "value": "\$__all"
        },
        "datasource": {
          "type": "grafana-clickhouse-datasource",
          "uid": "clickhouse-traces"
        },
        "definition": "SELECT DISTINCT TraceId FROM otel_traces WHERE ParentSpanId = '' LIMIT 100",
        "hide": 0,
        "includeAll": true,
        "label": "Trace Id",
        "multi": false,
        "name": "trace_id",
        "options": [],
        "query": "SELECT DISTINCT TraceId FROM otel_traces WHERE ParentSpanId = '' LIMIT 100",
        "refresh": 1,
        "regex": "",
        "skipUrlSync": false,
        "sort": 0,
        "type": "query"
      }
    ]
  },
  "time": {
    "from": "now-15m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "BasicDashBoard-${uuid}",
  "uid": "${uuid}",
  "version": 4,
  "weekStart": ""
}`
}