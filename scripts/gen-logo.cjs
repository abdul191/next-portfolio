const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])) >>> 0);
  return Buffer.concat([len, t, data, crcBuf]);
}

function crc32(buf) {
  let c = ~0;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c;
}

const w = 96, h = 96;
const raw = Buffer.alloc((w * 4 + 1) * h);
for (let y = 0; y < h; y++) {
  const rowStart = y * (w * 4 + 1);
  raw[rowStart] = 0;
  for (let x = 0; x < w; x++) {
    const i = rowStart + 1 + x * 4;
    raw[i] = 24;   // R
    raw[i + 1] = 144; // G
    raw[i + 2] = 255; // B
    raw[i + 3] = 255; // A
  }
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(w, 0);
ihdr.writeUInt32BE(h, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 6;  // color type RGBA

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0))
]);

const outDir = path.join(__dirname, "src", "assets");
fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(outDir, "logo.png"), png);
console.log("wrote", path.join(outDir, "logo.png"), png.length, "bytes");
