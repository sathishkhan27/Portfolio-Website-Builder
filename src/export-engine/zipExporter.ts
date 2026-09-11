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

  // Include logo in exported project's public directory
  try {
    const logoRes = await fetch('/logo.png');
    if (logoRes.ok) {
      const logoBlob = await logoRes.blob();
      zip.file('public/logo.png', logoBlob);
      zip.file('public/favicon.png', logoBlob);
    }
  } catch {
    // Fallback gracefully if running in environment without network/fetch
  }

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
