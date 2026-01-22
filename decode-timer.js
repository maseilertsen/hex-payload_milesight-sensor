// Timer test for ct101 decoder - similar to main.go benchmark

// Import the decoder (need to load the file since it uses var declarations)
const fs = await import('fs');
const vm = await import('vm');

// Load and execute the decoder script to get the functions
const decoderCode = fs.readFileSync('./ct101_decoder.js', 'utf8');
const context = { Object, Array, Math, TypeError, Error };
vm.createContext(context);
vm.runInContext(decoderCode, context);

const { milesightDeviceDecode } = context;

// Helper to convert hex string to byte array
function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

// Example data from Milesight sensor ct101 (same as main.go)
const payloads = [
    "FF166746D38802580000",
    "0498B80B00000000"
];

// Convert hex strings to byte arrays
const byteArrays = payloads.map(hexToBytes);

function decodePayloads() {
    for (const bytes of byteArrays) {
        milesightDeviceDecode(bytes);
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
