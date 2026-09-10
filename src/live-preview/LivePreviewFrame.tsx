import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ThemeProvider } from '../theme-engine/ThemeProvider';
import { getTemplateComponent } from '../template-engine/registry';

export const LivePreviewFrame: React.FC = () => {
  const {
    portfolio,
    theme,
    selectedTemplateId,
    previewDevice,
    previewScale
  } = usePortfolioStore();

  const TemplateComponent = getTemplateComponent(selectedTemplateId);

  const deviceWidthMap = {
    desktop: 'w-full',
    tablet: 'w-[768px] min-h-[1024px] shadow-2xl rounded-2xl border border-slate-700 my-6',
    mobile: 'w-[375px] min-h-[667px] shadow-2xl rounded-[32px] border-4 border-slate-700 my-6',
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-950 flex justify-center items-start p-0">
      <div
        className={`transition-all duration-300 origin-top overflow-hidden bg-slate-950 ${deviceWidthMap[previewDevice]}`}
        style={{
          transform: previewScale !== 1 ? `scale(${previewScale})` : undefined,
        }}
      >
        <ThemeProvider theme={theme}>
          <TemplateComponent
            data={portfolio}
            theme={theme}
            previewMode={true}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};
