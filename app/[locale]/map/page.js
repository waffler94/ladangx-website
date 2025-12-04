'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { farmData } from '@/data/farmLocations';

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export default function AdventureMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Flatten data for easier searching
  const allLocations = useMemo(() => {
    return farmData.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));
  }, []);

  // Filter logic
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return allLocations.filter(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
  }, [searchQuery, allLocations]);

  // Handle Selection
  const handleSelect = (location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name); // Fill input
    setIsDropdownOpen(false); // Close dropdown
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    if(e.target.value === "") setSelectedLocation(null); // Reset map if cleared
  };

  return (
    <div className="min-h-screen bg-[#d0f0eb] font-sans pb-12">
      
      {/* --- 1. TOP SEARCH BAR --- */}
      <div className="sticky top-0 z-50 p-4 bg-[#d0f0eb]/90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-500">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Search where you wanna go..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-[#cadfc9] border-2 border-[#b5cbb4] text-slate-700 placeholder-slate-500 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all font-bold text-lg shadow-sm"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border-2 border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              {filteredSuggestions.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className="w-full text-left px-6 py-3 hover:bg-green-50 flex justify-between items-center group transition-colors"
                >
                  <span className="font-bold text-slate-700">{loc.name}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md group-hover:bg-green-200 group-hover:text-green-800 transition-colors">
                    {loc.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- 2. MAP DISPLAY AREA --- */}
      <div className="px-4 mb-8">
        <div className="max-w-4xl mx-auto bg-[#fdf6e3] rounded-[2rem] border-[6px] border-[#8b7355] shadow-[8px_8px_0px_0px_rgba(60,50,40,0.2)] overflow-hidden relative min-h-[400px] flex items-center justify-center p-4">
          
          {/* 
             NOTE: Replace '/images/main-map.jpg' with your actual full map image.
             The 'selectedLocation.image' should be a zoomed-in version or the same map with a highlight.
          */}
          
          {selectedLocation ? (
            <div className="text-center animate-in zoom-in-95 duration-300">
                <Image 
                    src={selectedLocation.image} 
                    alt={selectedLocation.name} 
                    className="object-cover"
                    width={800}
                    height={800}
                />
            </div>
          ) : (
            // DEFAULT FULL MAP
            <Image 
                src={'/maps/dragon-fruit.png'} 
                alt={'default map'} 
                className="object-cover"
                width={800}
                height={800}
            />
          )}

        </div>
      </div>

      {/* --- 3. CATEGORIZED LIST --- */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#fdfbe7] rounded-3xl p-4 border-4 border-[#5c4a35] shadow-lg relative">
          
          {/* Decorative Corner */}
          <div className="absolute top-4 left-4 text-[#5c4a35] opacity-20 text-4xl">🌿</div>
          <div className="absolute bottom-4 right-4 text-[#5c4a35] opacity-20 text-4xl">🐇</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {farmData.map((category) => (
              <div key={category.category} className="flex flex-col gap-2">
                {/* Category Header (Thick Label) */}
                <h3 className="text-2xl font-black text-[#2f3e2e] pb-1 inline-block self-start">
                  {category.category}
                </h3>
                
                {/* List Items */}
                <ul className="space-y-2">
                  {category.items.map((item) => {
                    const isSelected = selectedLocation?.id === item.id;
                    
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleSelect(item)}
                          className={`
                            text-left text-sm md:text-base transition-all duration-200
                            ${isSelected 
                              ? 'font-black text-green-700 bg-green-200 px-3 py-1 rounded-lg scale-105 shadow-sm translate-x-2' 
                              : 'font-medium text-[#5c4a35] hover:text-green-700 hover:translate-x-1'
                            }
                          `}
                        >
                          {item.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}