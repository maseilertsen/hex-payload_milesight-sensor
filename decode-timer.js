// Timer test for ct101 decoder - minimal version matching main.go

// Helper to convert hex string to byte array
function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

// Read uint16 little-endian (same as Go's binary.LittleEndian.Uint16)
function readUInt16LE(bytes, offset) {
    return (bytes[offset + 1] << 8) + bytes[offset];
}

// Example data from Milesight sensor ct101 (same as main.go)
const payloads = [
    "FF166746D38802580000",
    "0498B80B00000000"
];

function decodePayloads() {
    for (const p of payloads) {
        // Decode hex to bytes
        const b = hexToBytes(p);

        // Bytes 2..4 is the uint16 current (little-endian)
        const raw = readUInt16LE(b, 2);
        const _ = raw / 100.0;
    }
}

const iterations = 1000000;

console.log(`Starting benchmark with ${iterations} iterations...`);

const start = performance.now();
for (let i = 0; i < iterations; i++) {
    decodePayloads();
}
const elapsed = performance.now() - start;

console.log(`Ran ${iterations} iterations`);
console.log(`Total time: ${elapsed.toFixed(2)}ms`);
console.log(`Average time per iteration: ${(elapsed / iterations * 1000).toFixed(2)}µs`);
