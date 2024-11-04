import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface TabTogglerProps {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  randomId?: string;
}

export const TabToggler = ({
  tabs,
  selectedTab,
  onSelectTab,
  randomId = 'bla-bla-bla',
}: TabTogglerProps) => {
  const [sliderPosition, setSliderPosition] = useState({
    width: 0,
    left: 0,
  });

  const onTabChange = (tab: string, index: number) => {
    const tabId = randomId + index + tab;
    const tabElement = document.getElementById(tabId);

    if (tabElement) {
      setSliderPosition({
        width: tabElement.offsetWidth,
        left: tabElement.offsetLeft,
      });
    }

    onSelectTab(tab);
  };

  useEffect(() => {
    const selectedTabIndex = tabs.findIndex((tab) => tab === selectedTab);
    onTabChange(selectedTab, selectedTabIndex);
  }, []);

  return (
    <div className={classNames('flex flex-col relative')}>
      <div className={'flex flex-row'}>
        {tabs.map((tab, index) => (
          <div
            className={classNames(
              'flex px-4 py-2 transition-all cursor-pointer',
              'font-[400] text-base font-geist text-[#98A2B3]',
              tab === selectedTab ? 'font-[600] text-[#1D2739]' : '',
            )}
            key={index}
            id={randomId + index + tab}
            onClick={() => onTabChange(tab, index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div
        className={'h-[100%] border-[0.5px] border-[#D0D5DD] absolute rounded transition-all'}
        style={{
          width: sliderPosition.width,
          left: sliderPosition.left,
          boxShadow: '0px 1.5px 4px -1px #10192812',
        }}
      ></div>
    </div>
  );
};
