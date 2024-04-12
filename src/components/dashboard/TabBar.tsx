"use client"

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ currentTab = 1, tabOptions = [1,2,3,4,5] }: Props) => {

  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(currentTab)

  const onSelectedTab = (tab: number) => {
    setSelectedTab(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }


  return (
    <div 
      className={`grid w-full grid-cols-${tabOptions.length.toString()} space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {
        tabOptions.map((tab) => (
          <div key={tab} className="col-span-1">
            <input 
              type="radio" 
              onChange={() => {}}
              id={tab.toString()} 
              className="peer hidden"
              checked={tab === selectedTab} 
            />
            <label 
              onClick={() => onSelectedTab(tab)}
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-all duration-300 ease-in-out hover:font-bold"
            >
              {tab}
            </label>
          </div>
        ))
      }
    </div>
  );
};
