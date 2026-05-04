import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

async function compressImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await compressImages(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    
    // Skip if not an image or if it's already an original backup
    if (!ALLOWED_EXTENSIONS.includes(ext) || file.endsWith('.old')) {
      continue;
    }

    const backupPath = `${fullPath}.old`;

    // Skip if already compressed (backup exists)
    if (fs.existsSync(backupPath)) {
      console.log(`Skipping already compressed: ${file}`);
      continue;
    }

    console.log(`Compressing: ${file}...`);

    try {
      // Create backup of original
      fs.copyFileSync(fullPath, backupPath);

      // Compress and overwrite original
      const image = sharp(backupPath);
      const metadata = await image.metadata();

      let pipeline = image;

      // Basic compression parameters
      if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: 80 });
      } else {
        pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
      }

      await pipeline.toFile(fullPath);
      
      const newStats = fs.statSync(fullPath);
      const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(2);
      console.log(`Successfully compressed ${file}. Savings: ${savings}%`);
    } catch (error) {
      console.error(`Error compressing ${file}:`, error);
      // Clean up backup if compression failed
      if (fs.existsSync(backupPath) && !fs.existsSync(fullPath)) {
          fs.renameSync(backupPath, fullPath);
      }
    }
  }
}

console.log('Starting image compression...');
compressImages(PUBLIC_DIR)
  .then(() => console.log('Image compression complete!'))
  .catch(err => console.error('Image compression failed:', err));
