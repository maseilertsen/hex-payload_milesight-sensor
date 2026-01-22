# hex-payload_milesight-sensor
Test for converting Milesight sensor hex-payloads to human readable values.

https://github.com/Milesight-IoT/SensorDecoders/tree/main/ct-series/ct101
## Tables from Milesight ct101 documentation
```
+-------------------------------------------------------+
|           DEVICE UPLINK / DOWNLINK PAYLOAD            |
+---------------------------+---------------------------+
|          DATA 1           |          DATA 2           |
+--------+--------+---------+--------+--------+---------+
|   ID   |  TYPE  |  DATA   |   ID   |  TYPE  |  DATA   |
+--------+--------+---------+--------+--------+---------+
| 1 Byte | 1 Byte | N Bytes | 1 Byte | 1 Byte | N Bytes |
|--------+--------+---------+--------+--------+---------+
```
```
+------------------Telemetry-----------------------------------------------------+
CHANNEL | ID   | TYPE | LENGTH |                   DESCRIPTION                                   |
+-------+------+---------------+-------------------------------------------------+
Current | 0x04 | 0x98 |   2    | Current(2B) current, unit: A , read: uint16/100 |
+-------+------+---------------+-------------------------------------------------+
```

## Benchmark

Run the benchmark to compare Go and JavaScript decoder performance:

```bash
./benchmark.sh
```