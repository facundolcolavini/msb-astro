import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

interface MenuItem {
  label: string;
  link: string;
}

interface DropdownProps {
  id: string;
  buttonContent: string;
  menuItems: MenuItem[];
  defaultOption?: string;
}

const Dropdown = ({ id, buttonContent, menuItems, defaultOption }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || '');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    setSelectedOption(item.label);
    toggleDropdown();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return  (
    <div ref={dropdownRef} class="relative inline-block m-1">
      <button
        id={id}
        onClick={toggleDropdown}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform duration-500 ease-in-out"
        type="button"
      >
        {selectedOption || buttonContent}
        <svg
          class={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 animate-dropDown">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={id}>
            {menuItems.map((item, index) => (
              <li key={index}   onClick={() => handleMenuItemClick(item)}  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                  {item.label}
              
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
