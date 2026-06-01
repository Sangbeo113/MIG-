#!/usr/bin/env node
/**
 * MIG Technology – Base64 Image Extractor
 * ==========================================
 * Scans HTML files for embedded base64 images, extracts them as real
 * .jpg/.png/.webp files, and replaces the src attribute with the file path.
 *
 * Usage:
 *   node extract-base64-images.js <input.html> <output-dir> [output.html]
 *
 * Example:
 *   node extract-base64-images.js migtech.vn/du-an.html migtech.vn/images/projects migtech.vn/du-an.html
 */

const fs = require('fs');
const path = require('path');

const [,, inputFile, outputDir, outputFile] = process.argv;

if (!inputFile || !outputDir) {
    console.error('Usage: node extract-base64-images.js <input.html> <output-dir> [output.html]');
    process.exit(1);
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
}

let html = fs.readFileSync(inputFile, 'utf8');
let count = 0;

// Match base64 data URIs in src and url() attributes
const base64Regex = /src="(data:image\/(png|jpg|jpeg|webp|gif|svg\+xml);base64,([^"]+))"/g;

html = html.replace(base64Regex, (match, fullDataUri, mimeType, b64Data) => {
    count++;
    const ext = mimeType === 'svg+xml' ? 'svg' : mimeType.replace('jpeg', 'jpg');
    const filename = `extracted-image-${String(count).padStart(3, '0')}.${ext}`;
    const filePath = path.join(outputDir, filename);

    // Write binary file
    const buffer = Buffer.from(b64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    // Build relative path from the HTML file's directory to the image
    const htmlDir = path.dirname(path.resolve(inputFile));
    const absImgPath = path.resolve(filePath);
    const relPath = path.relative(htmlDir, absImgPath).replace(/\\/g, '/');

    console.log(`  ✓ Extracted: ${filename} (${(buffer.length / 1024).toFixed(1)} KB) → ${relPath}`);
    return `src="${relPath}" loading="lazy"`;
});

const finalOutput = outputFile || inputFile;
fs.writeFileSync(finalOutput, html, 'utf8');

console.log(`\n✅ Done! Extracted ${count} base64 images.`);
console.log(`   Saved HTML to: ${finalOutput}`);
console.log(`   Image files in: ${outputDir}`);
