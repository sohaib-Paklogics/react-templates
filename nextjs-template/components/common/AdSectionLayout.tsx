import React, { ReactNode } from "react";

interface AdSectionLayoutProps {
  leftAd?: ReactNode;
  rightAd?: ReactNode;
  children: ReactNode;
}

const AdSectionLayout: React.FC<AdSectionLayoutProps> = ({
  leftAd,
  rightAd,
  children,
}) => {
  return (
    <div className="w-full bg-transparent">
      <div className="flex flex-col md:flex-row">
        {/* Left Ad (desktop & tablet: left side | mobile: top) */}
        {leftAd && (
          <aside className="flex justify-center items-start m-4 order-1 md:order-none">
            <div className="w-full md:w-[160px] lg:w-[200px] h-[120px] md:h-[600px] bg-gray-200 shadow rounded-lg flex items-center justify-center text-gray-500 text-sm">
              {leftAd}
            </div>
          </aside>
        )}

        {/* Main Content (centered, max width) */}
        <main className="flex-1 max-w-7xl mx-auto bg-transparent p-4 min-h-[500px] order-2">
          {children}
        </main>

        {/* Right Ad (desktop & tablet: right side | mobile: bottom) */}
        {rightAd && (
          <aside className="flex justify-center items-start m-4 order-3">
            <div className="w-full md:w-[160px] lg:w-[200px] h-[120px] md:h-[600px] bg-gray-200 shadow rounded-lg flex items-center justify-center text-gray-500 text-sm">
              {rightAd}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdSectionLayout;
