import React, { useState } from 'react';

const types = [
  { value: 'type1', label: 'Type 1', selected: false },
  { value: 'type2', label: 'Type2', selected: false },
];

const industries = [
  { value: 'foundations', label: 'Foundations', selected: false },
  { value: 'accelerators', label: 'Accelerators/Incubators', selected: false },
];

const locations = [
  { value: 'location1', label: 'Location 1', selected: false },
  { value: 'location2', label: 'Location 2', selected: false },
];

const stageFocus = [
  { value: 'stage1', label: 'Stage Focus 1', selected: false },
  { value: 'stage2', label: 'Stage Focus 2', selected: false },
];

const Investment_Discovery_Filters = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStageFocus, setSelectedStageFocus] = useState("");

  let selected = [];
  const addSelectedFilters = () => {
    if(selectedType!==""){
      selected.push(selectedType);
    }
    if(selectedIndustry!==""){
      selected.push(selectedIndustry);
    }
    if(selectedLocation!==""){
      selected.push(selectedLocation);
    }
    if(selectedStageFocus!==""){
      selected.push(selectedStageFocus);
    }
  }

  addSelectedFilters();
  console.log(selected);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const clearAllFilters = () => {
    setSelectedType("");
    setSelectedIndustry("");
    setSelectedLocation("");
    setSelectedStageFocus("");
  }

  const removeFilter = (value) => {
    if(selectedType===value){
      setSelectedType("");
    }
    if(selectedIndustry===value){
      setSelectedIndustry("");
    }
    if(selectedLocation===value){
      setSelectedLocation("");
    }
    if(selectedStageFocus===value){
      setSelectedStageFocus("");
    }

  }

  return (
    <div className=" mb-2">
      <div className="flex sm:flex-row flex-col mb-8">
        <h2 className="bg-gray-400 text-center w-40 py-2 rounded-sm text-base font-medium text-black sm:mr-4">Filters</h2>
        <button className=" w-40 py-2 mt-3 sm:mt-0 bg-bg-brown2 rounded-sm text-base font-medium text-white bg-txt-neavy" onClick={clearAllFilters}>
          Clear filters
        </button>
      </div>

      <div className='grid grid-cols-2 gap-3 sm:gap-0 sm:flex sm:justify-between'>
        <div className="mb-4 w-full mr-4">
          <label htmlFor="type" className="block text-sm text-txt-neavy font-poppins">
            Type
          </label>
          <select
            id="type"
            className="w-full mt-1 p-1 text-sm bg-white border-2 border-solid text-gray-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            value={selectedType}
            onChange={(e) => handleChange(e, setSelectedType)}
          >
            <option value="">Choose or type...</option>
            {types?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>

        </div>
        <div className="mb-4 w-full mr-4">
          <label htmlFor="industry" className="block text-sm text-txt-neavy font-poppins">
            Industry
          </label>
          <select
            id="industry"
            className="w-full mt-1 p-1 text-sm bg-white border-2 border-solid text-gray-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            value={selectedIndustry}
            onChange={(e) => handleChange(e, setSelectedIndustry)}
          >
            <option value="">Choose or type...</option>
            {industries.map((industry) => (
              <option key={industry?.value} value={industry?.value}>
                {industry?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full mr-4">
          <label htmlFor="location" className="block text-sm text-txt-neavy font-poppins">
            Location
          </label>
          <select
            id="location"
            className="w-full mt-1 p-1 text-sm bg-white border-2 border-solid text-gray-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            value={selectedLocation}
            onChange={(e) => handleChange(e, setSelectedLocation)}
          >
            <option value="">Choose or type...</option>
            {locations?.map((location) => (
              <option key={location?.value} value={location?.value}>
                {location?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="stage-focus" className="block text-sm text-txt-neavy font-poppins overflow-hidden text-ellipsis whitespace-nowrap ">
            Stage Focus
          </label>
          <select
            id="stage-focus"
            className="w-full mt-1 p-1 text-sm bg-white border-2 border-solid text-gray-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            value={selectedStageFocus}
            onChange={(e) => handleChange(e, setSelectedStageFocus)}
          >
            <option value="">Choose or type...</option>
            {stageFocus?.map((focus) => (
              <option key={focus?.value} value={focus?.value}>
                {focus?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='text-white mb-2 flex'>
        {selected?.map((item, index) => {
          return (
          <div key={index} className='flex justify-center items-center mr-3 bg-txt-neavy px-1.5 py-0.5 rounded-sm'>
            <div className='text-xs mr-1 text-white'>{item}</div>
            <button className='text-xs h-4 text-center rounded-full bg-white text-bg-brown w-4' onClick={() => removeFilter(item)}>X</button>
          </div>
        )})}
      </div>
      </div>
      )
}

export default Investment_Discovery_Filters;