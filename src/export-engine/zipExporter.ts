import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PortfolioData } from '../types/portfolio';
import { ThemeConfig } from '../types/theme';
import { generateStandaloneProject } from './projectGenerator';

export async function exportPortfolioAsZip(
  portfolio: PortfolioData,
  theme: ThemeConfig,
  templateId: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const zip = new JSZip();
  const files = generateStandaloneProject(portfolio, theme, templateId);

  // Add all files to the ZIP
  Object.entries(files).forEach(([filePath, content]) => {
    zip.file(filePath, content);
  });

  // Generate ZIP blob
  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    },
    (metadata) => {
      if (onProgress) {
        onProgress(metadata.percent);
      }
    }
  );

  const cleanName = portfolio.personal.fullName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
  const fileName = `${cleanName}-portfolio-source.zip`;

  // Trigger browser download
  saveAs(zipBlob, fileName);

  return zipBlob;
}
