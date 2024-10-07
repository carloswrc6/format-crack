import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const CustomFlyoutMenu = ({ title, options, tabOptions, className = "" }) => {
  return (
    <Popover className="relative inline-block ">
      {/* <Popover className="relative"> */}
      <PopoverButton className="bg-gray-700 hover:bg-gray-800 rounded-sm inline-flex items-center px-1.5 gap-x-2 text-sm leading-8 text-white-900">
        <span>{title}</span>
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className={`bg-sky-700 absolute left-0 z-10 mt-2 w-screen max-w-40 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in ${className}`}
      >
        <div
          className={`w-screen max-w-40 flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 ${className}`}
        >
          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            {tabOptions &&
              tabOptions.length > 0 &&
              tabOptions.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2 p-1.5 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  {item.name}
                </a>
              ))}
          </div>

          <div className="p-2">
            {options.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg hover:bg-gray-50"
              >
                <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div>
                  <a href={item.href} className="text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default CustomFlyoutMenu;
