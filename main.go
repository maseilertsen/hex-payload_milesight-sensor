package main

import (
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"time"
)

/*
From documentation: https://github.com/Milesight-IoT/SensorDecoders/tree/main/ct-series/ct101

+-------------------------------------------------------+
|           DEVICE UPLINK / DOWNLINK PAYLOAD            |
+---------------------------+---------------------------+
|          DATA 1           |          DATA 2           |
+--------+--------+---------+--------+--------+---------+
|   ID   |  TYPE  |  DATA   |   ID   |  TYPE  |  DATA   |
+--------+--------+---------+--------+--------+---------+
| 1 Byte | 1 Byte | N Bytes | 1 Byte | 1 Byte | N Bytes |
|--------+--------+---------+--------+--------+---------+

+------------------Telemetry-----------------------------------------------------+
CHANNEL | ID   | TYPE | LENGTH |                   DESCRIPTION 					 |
+-------+------+---------------+-------------------------------------------------+
Current | 0x04 | 0x98 |   2    | Current(2B) current, unit: A , read: uint16/100 |
+-------+------+---------------+-------------------------------------------------+
*/

func decodePayloads(list []string) {
	for _, p := range list {
		// Decode hex to bytes
		b, err := hex.DecodeString(p)
		if err != nil {
			continue
		}

		// Bytes 2..4 is the uint16 current (little-endian)
		raw := binary.LittleEndian.Uint16(b[2:4])
		_ = float64(raw) / 100.0
	}
}

func main() {
	// Example-data from Milesight sensor ct101
	list := []string{"FF166746D38802580000", "0498B80B00000000"}

	const iterations = 1000000

	start := time.Now()
	for i := 0; i < iterations; i++ {
		decodePayloads(list)
	}
	elapsed := time.Since(start)

	fmt.Printf("Ran %d iterations\n", iterations)
	fmt.Printf("Total time: %v\n", elapsed)
	fmt.Printf("Average time per iteration: %v\n", elapsed/time.Duration(iterations))
}
