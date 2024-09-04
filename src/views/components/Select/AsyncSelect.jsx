import React, { useEffect, useMemo, useState } from 'react';
import AsyncSelect from 'react-select';
import { Option, Menu } from './Select';
import useGenerateStyles from './useStyles';
import { Box, Typography } from '@mui/material';
import usePaginatedSearch from './usePaginatedSearch';

const SelectAsync = ({
  editClick,
  api, // Function to call API
  isTouched, // Boolean indicating if the field has been touched
  error, // Error message to display
  onChange, // Function to call when selection changes
  creatable = false, // Prop to toggle between AsyncSelect and AsyncCreatableSelect
  optionLabelKey = 'name',
  labelValuekey = 'name',
  optionValueKey = 'id',
  filterOptions, // Function to filter options if needed
  onAddOptions, // Function to handle adding new options
  value, // select value
  initialOptions, // options coming from parent
  setOptionsCallback, // Callback function to set options
  onSelect, // Callback function that runs when selection changes
  isSearchable, // Boolean To determine if select is searchable or not
  loading, // Boolean To determine loading state of select
  onSearchChange, // Callback that runs on search change,
  onMenuScrollToBottom, // Callback that runs when scroll to bottom event is fired
  searchText,
  selectGroup = false, // Boolean To determine if this is single select or group of selects that share state
  extraParams, // Additional query parameters to pass to the api
  refresh,
  ...rest // Rest of the props
}) => {
  const [addedOptions, setAddedOptions] = useState([]);



  let object = {};
  if (!initialOptions) {
    object = usePaginatedSearch(
      api, // Function to call API
      value, // Initial value for the select
      optionLabelKey,
      labelValuekey,
      setOptionsCallback,
      refresh,
      selectGroup,
      optionValueKey,
      extraParams,
     
    );
  }
  const {
    options,
    search,
    isLoading,
    selectedValue,
    handleInputChange,
    handleSelectChange,
    handleMenuScrollToBottom,
  } = object;

  let filteredOptions = [];
  const styles = useGenerateStyles();
  const onSelectChange = selected => {
    typeof onChange === 'function' && onChange(selected);
    handleSelectChange(selected);
  };

  filteredOptions = useMemo(() => {
    let optionsToFilter = initialOptions || options;
    let result =
      typeof filterOptions === 'function'
        ? filterOptions(optionsToFilter?.data)
        : optionsToFilter?.data;
    // Automatically fetch more options if the filtered list is shorter than 10
    if (
      optionsToFilter?.data?.length > 0 &&
      result.length < 10 &&
      !optionsToFilter?.last_page
    ) {
      //if the options list is shorter than 10, automatically call the scroll to bottom function to fetch more items
      const scrollFunction = onMenuScrollToBottom || handleMenuScrollToBottom;
      scrollFunction(0);
    }
    return result;
  }, [JSON.stringify(initialOptions?.data), JSON.stringify(options?.data)]);

function handleCreateOption(inputValue) {
  // Check if the inputValue already exists in the options or addedOptions
  const isOptionExists = [...filteredOptions, ...addedOptions].some(
    option => option[optionLabelKey] === inputValue
  );

  if (!isOptionExists) {
    // If the option doesn't already exist, create a new option
    const newOption = { [optionLabelKey]: inputValue };
    setAddedOptions(prevOptions => [...prevOptions, newOption]);
    if (typeof onAddOptions === 'function') {
      

        onAddOptions(inputValue); // Call the callback function from the parent component
      
    }
  } else {
    console.log(`Option "${inputValue}" already exists.`);
  }
}



  // Prepare props for Select component
  const selectProps = {
    // isClearable: true,
    // isMulti: true,
    isClearable: optionLabelKey === "mpn" ? false :  (value?.label !== 'Type or click to select an item' && (value?.label) ) ?  true : false,
    isSearchable: isSearchable || true,
    value: value || selectedValue,
    loading: loading || isLoading,
    onInputChange: onSearchChange || handleInputChange,
    components: { Menu,  Option: props => <Option {...props} editClick={editClick} /> }, 
    options: [...addedOptions, ...filteredOptions],
    onChange: onSelect || onSelectChange,
    inputValue: searchText || search || '',
    creatable,
    onCreateOption: handleCreateOption,
    onMenuScrollToBottom: onMenuScrollToBottom || handleMenuScrollToBottom,
    styles,
    ...rest,
  };

  selectProps.getOptionLabel = option => option[optionLabelKey] || '';

  return (
    <>
      <AsyncSelect 
       onKeyDown={(e) => {
        if(e.key === 'Enter') {
          e.preventDefault()
          e.stopPropagation()
        }
      }} {...selectProps} />
      {error && isTouched && (
        <Box mt={'4px'}>
          <Typography color='error' variant='caption' className='Mui-error'>
            {error}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SelectAsync;
