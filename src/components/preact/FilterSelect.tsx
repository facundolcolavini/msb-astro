import type { h, JSX } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { capitalize } from '../../utils/formats';

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  opts: Option[];
  id: string;
  onChange: JSX.GenericEventHandler<HTMLElement>;
  defaultOption?: Option; // Added prop for default option
}

const FilterSelect = ({ opts, id, onChange, defaultOption }: FilterSelectProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(defaultOption ? defaultOption.label : ''); // Set initial state to default label
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.label);
    toggleDropdown();
    onChange({ target: { id, value: option.value } } as any);
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

  return (
    <div ref={dropdownRef} class="relative w-100 m-1">
      <button
        id={id}
        onClick={toggleDropdown}
        class="w-full p-2 rounded text-white flex bg-gray-600 justify-between items-center"
        type="button"
      >
        {selectedOption || 'Select Option'}
        <svg
          class={`w-4 h-4 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div class="w-full block absolute z-10 bg-white rounded-lg shadow max-h-32 overflow-y-auto">
          {opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              class="w-full  text-left p-2 hover:bg-gray-100 animate-fadeIn"
            > 
              {option.label }
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
