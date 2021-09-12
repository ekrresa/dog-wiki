import { useCombobox } from 'downshift';
import { IoClose } from 'react-icons/io5';

import { Breed } from '../lib/types';
import Search from '../public/search.svg';

type ComboBoxProps = {
  data: Breed[] | undefined;
  isError: boolean;
  loading: boolean;
  onChange: (item: string) => void;
  selectItem: (item: Breed | null | undefined) => void;
};

export function ComboBox({
  data,
  isError,
  loading,
  onChange,
  selectItem,
}: ComboBoxProps) {
  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    isOpen,
    reset,
    selectedItem,
  } = useCombobox({
    items: data || [],
    itemToString: breed => (breed ? breed.name : ''),
    onInputValueChange: ({ inputValue }) => {
      onChange(inputValue as string);
    },
    onStateChange: ({ selectedItem }) => {
      if (selectedItem) {
        selectItem(selectedItem);
      } else {
        selectItem(selectedItem);
      }
    },
  });

  return (
    <div className="flex flex-col flex-1 relative">
      <div
        className="flex flex-1 border-2 border-black items-center rounded-[2.5rem]"
        {...getComboboxProps()}
      >
        <input
          className="focus:outline-none flex-1 min-w-[8rem] px-4 py-1 rounded-inherit text-black"
          placeholder="Search"
          {...getInputProps()}
        />
        {selectedItem ? (
          <span className="mr-1" onClick={reset}>
            <IoClose className="cursor-pointer text-2xl" />
          </span>
        ) : (
          <Search className="mr-1 w-6" />
        )}
      </div>

      <ul
        className={`bg-white border absolute max-h-96 overflow-auto p-1 rounded-[1rem] shadow-md w-full top-[110%] ${
          isOpen ? 'visible' : 'invisible'
        }`}
        {...getMenuProps()}
      >
        {isOpen ? (
          loading ? (
            <li className="p-2 rounded-xl">Loading...</li>
          ) : isError ? (
            <li className="p-2 rounded-xl">Error...</li>
          ) : data && data.length > 0 ? (
            data.map((breed, index) => (
              <li
                className={`p-2 rounded-xl ${
                  highlightedIndex === index && 'bg-[#9CA3AF] text-gray-100'
                }`}
                key={breed.id}
                {...getItemProps({ item: breed, index })}
              >
                {breed.name}
              </li>
            ))
          ) : (
            <li className="p-2 rounded-xl">No results found</li>
          )
        ) : null}
      </ul>
    </div>
  );
}
