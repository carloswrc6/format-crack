import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const CustomSelect = ({ options, onChange }) => {
  const [selected, setSelected] = useState(options[0]); // Se usa el primer elemento de options

  const handleChange = (newSelection) => {
    setSelected(newSelection);
    if (onChange) {
      onChange(newSelection);
    }
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative">
        <ListboxButton className="relative w-40 cursor-default rounded-md bg-gray-50 py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-40 overflow-auto rounded-md bg-gray-50 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-700 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="mr-3 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="block font-normal group-data-[selected]:font-semibold">
                  {person.name}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default CustomSelect;
