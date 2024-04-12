import React from 'react'

interface Props {
  title: string;
  amount: string;
  percentage?: number;
  compared: string;
}

export const WidgetItem = ({ title, amount, percentage, compared }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
          <div>
            <h5 className="text-xl text-gray-600 text-center">
              {title}
            </h5>
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">{amount}</h3>
              {
                percentage && (
                  <div className="flex items-end gap-1 text-green-500 relative">
                    <svg
                      className={`w-3 ${percentage < 0 ? 'text-red-500 rotate-180 absolute top-[13px]' : 'text-green-500'}`}
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span 
                      className={`${percentage < 0 ? 'ml-4 text-red-500' : 'text-green-500'}`}
                    >{percentage}%</span>
                  </div>
                )
              }
            </div>
            <span className="block text-center text-gray-500">
              {compared}
            </span>
          </div>
        </div>
      </div>
  )
}
