import React, { useCallback, useEffect, useRef, useState } from 'react';
import AsyncCreatableSelect from 'react-select/creatable';
import { Option, Menu } from './Select';
import useGenerateStyles from './useStyles';
import { Box, Typography } from '@mui/material';
import debounce from 'lodash/debounce'; // Assuming lodash is installed for debouncing

const SelectAsync = ({
  api,
  touched,
  error,
  onChange,
  configure,
  setOptionsCallback,
  ...rest
}) => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page for pagination
  const lastPage = useRef(false);
  const allOptionsPage = useRef(1);
  const allOptions = useRef([]); // Store all options loaded
  const memorizedResults = useRef(new Map()); // Memorization of search and their results
  const styles = useGenerateStyles(touched, error);

  // Wrap debouncedFetchOptions in useCallback to prevent it from being recreated on every render
  const debouncedFetchOptions = useCallback(
    // Debounced function to fetch options
    debounce(async inputValue => {
      // Show all options if search input is cleared or empty

      // Use memorized results if available
      if (memorizedResults.current.has(inputValue)) {
        setOptions(memorizedResults.current.get(inputValue));
        return;
      }

      // Reset pagination and last page tracking on new search
      setPage(1);
      lastPage.current = false;
      await fetchOptions(inputValue, 1);
    }, 500),
    [] // Dependencies array is empty, indicating this callback will only be created once
  );

  async function fetchOptions(inputValue = '', pageNum = 1) {
    // Avoid refetching if last page is reached or the current page is already fetched
    if (lastPage.current && pageNum <= page) return;

    try {
      setIsLoading(true);
      const response = await api(inputValue, pageNum, inputValue ? 100 : 30);
      const data = response.data;
      if (data.current_page === data.last_page && !inputValue)
        lastPage.current = true;
      typeof setOptionsCallback === 'function' &&
        setOptionsCallback(data?.data);
      const newOptions = data?.data.map(item => ({
        label: item.name,
        value: item.id
      }));

      // Update options based on pagination
      if (pageNum === 1) {
        allOptions.current = newOptions;
      } else {
        if (memorizedResults.current.get('')?.length && inputValue === '') {
          allOptions.current = [
            ...memorizedResults.current.get(''),
            ...newOptions
          ];
        } else allOptions.current = [...allOptions.current, ...newOptions];
      }
      // Update memorized results for new searches and ensure it doesn't exceed 10 entries
      if (inputValue) {
        if (memorizedResults.current.size >= 10) {
          // Remove the oldest entry if the limit is reached
          const firstKey = memorizedResults.current.keys().next().value;
          memorizedResults.current.delete(firstKey);
        }
        if (inputValue === '') {
          allOptionsPage.current = page;
        } else memorizedResults.current.set(inputValue, allOptions.current);
      } else {
        // Memorize the initial load separately if no search term
        memorizedResults.current.set('', allOptions.current);
      }

      setOptions(allOptions.current);
      setPage(pageNum);
    } catch (error) {
      console.error('error', error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // Ensure initial data load is memorized
    if (!memorizedResults.current.has('')) {
      fetchOptions();
    } else {
      setOptions(memorizedResults.current.get(''));
      setPage(allOptionsPage.current);
    }
  }, []);

  const handleInputChange = (newValue, actionMeta) => {
    // Prevent fetching options on select (actionMeta.action === 'set-value')
    if (
      actionMeta.action === 'input-change' &&
      actionMeta.prevInputValue !== newValue
    ) {
      setSearch(newValue);
      debouncedFetchOptions(newValue);
    }
  };

  const handleMenuScrollToBottom = () => {
    if (!lastPage.current) {
      fetchOptions(search, page + 1);
    }
  };

  function handleSelectChange(selected) {
    onChange(selected);
    setSearch('');
    setOptions(memorizedResults.current.get(''));
  }

  return (
    <>
      <AsyncCreatableSelect
        isClearable={true}
        isSearchable={true}
        filterOption={() => true}
        onInputChange={handleInputChange}
        options={options}
        onChange={handleSelectChange}
        inputValue={search}
        components={configure ? { Option, Menu } : undefined}
        onMenuScrollToBottom={handleMenuScrollToBottom}
        styles={styles}
        {...rest}
      />
      {error && (
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
