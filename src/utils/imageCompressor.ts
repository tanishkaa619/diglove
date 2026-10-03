// Downscales and compresses uploaded images so they load instantly and persist safely

export async function compressImageFile(file: File, maxDim = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

// Specifically for Bouquets: Creates an authentic TRANSPARENT CUTOUT PNG (removes square white background)
export async function processBouquetCutout(file: File, maxDim = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read bouquet file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid bouquet image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Draw image onto clean transparent canvas (NO white background filling!)
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Analyze image data to remove white / light background if present
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample corner pixels to determine background color
        const corners = [
          [0, 0],
          [width - 1, 0],
          [0, height - 1],
          [width - 1, height - 1],
        ];

        let bgR = 255;
        let bgG = 255;
        let bgB = 255;

        // Average corners
        let validCorners = 0;
        let sumR = 0, sumG = 0, sumB = 0;
        for (const [cx, cy] of corners) {
          const idx = (cy * width + cx) * 4;
          if (data[idx + 3] > 10) { // not already transparent
            sumR += data[idx];
            sumG += data[idx + 1];
            sumB += data[idx + 2];
            validCorners++;
          }
        }

        if (validCorners > 0) {
          bgR = sumR / validCorners;
          bgG = sumG / validCorners;
          bgB = sumB / validCorners;
        }

        const isLightBg = bgR > 215 && bgG > 215 && bgB > 215;

        // Make background transparent if it's light/white
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a === 0) continue;

          // If light background, calculate color distance
          if (isLightBg) {
            const dist = Math.sqrt(
              (r - bgR) ** 2 +
              (g - bgG) ** 2 +
              (b - bgB) ** 2
            );

            // Also check pure brightness
            const isNearWhite = r > 230 && g > 230 && b > 230;

            if (dist < 38 || isNearWhite) {
              data[i + 3] = 0; // 100% transparent cutout!
            } else if (dist < 60) {
              // Smooth anti-aliased edge feathering
              data[i + 3] = Math.min(a, Math.round(((dist - 38) / 22) * 255));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // Export as TRANSPARENT PNG (Preserves transparency, zero square box!)
        const cutoutPngUrl = canvas.toDataURL('image/png');
        resolve(cutoutPngUrl);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
