import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Search } from "lucide-react";
// @ts-expect-error
import {debounce} from "lodash";
import { router } from "@inertiajs/react";

// Define the shape of a suggestion item
interface Suggestion {
  id?: string | number;
  title?: string;
  name?: string;
  text?: string;
  [key: string]: any; // Allow for additional properties
}

export function HeaderSearch(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // Create a debounced search function
  const debouncedSearch = useRef(
     debounce(async (searchTerm: string) => {
      if (!searchTerm || searchTerm.trim().length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/events/header-search?search=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
          throw new Error("Search request failed");
        }
        
        const data: Suggestion[] = await response.json();
        setSuggestions(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSuggestions([]);
      } finally {
      setIsLoading(false);
      }
    }, 300) // 300ms delay
  ).current;

  // Call the debounced function when query changes
  useEffect(() => {
    debouncedSearch(query);
    
    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Suggestion): void => {
    setQuery(suggestion.title || suggestion.name || suggestion.text || "");
    setSuggestions([]);
    setShowDropdown(false);
    router.get(route('event.edit', suggestion.slug));
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Display title in suggestion item
  const getSuggestionText = (suggestion: Suggestion): string => {
    return suggestion.title || suggestion.name || suggestion.text || "Unnamed item";
  };

  return (
    <div className="ml-2 header-element header-search md:!block !hidden my-auto auto-complete-search">
      <div 
        className="autoComplete_wrapper relative" 
        role="combobox" 
        aria-owns="autoComplete_list_1" 
        aria-haspopup="true" 
        aria-expanded={showDropdown} 
        ref={inputRef}
      >
        <input
          type="search"
          className="header-search-bar form-control"
          id="header-search"
          placeholder="Search event ..."
          autoComplete="off"
          value={query}
          onChange={handleInputChange}
        />
        
        {showDropdown && suggestions.length > 0 && (
          <ul 
            id="autoComplete_list_1" 
            role="listbox" 
            className="absolute w-full bg-white shadow-md rounded-md mt-1 max-h-60 overflow-auto z-10"
          >
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                role="option"
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {getSuggestionText(suggestion)}
              </li>
            ))}
          </ul>
        )}
        
        {isLoading && (
          <div className="absolute right-10 top-3">
            <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <button aria-label="search" className="header-search-icon border-0">
        <Search size={16} />
      </button>
    </div>
  );
}