import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

const usePaginatedSearch = (
  api, // Function to call API
  initialValue, // Initial value for the select
  optionLabelKey = 'name',
  labelValueKey = 'name',
  setOptionsCallback, 
  refresh, // force refetching of data
  selectGroup, // Boolean To determine if this is single select or group of selects that share state
  optionValueKey = 'id',
  extraParams // Additional query parameters to pass to the api
) => {
  const [options, setOptions] = useState({ data: [] });
  const [search, setSearch] = useState(selectGroup ? [] : ''); // in case of grouped selects search state will be stored in array so that search string of each select can be stored separately
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const memorizedResults = useRef(new Map());
  const apiAlreadyCalling = useRef(false); // setting a flag to avoid multiple api calls

  const fetchOptions = useCallback(
    async (inputValue = '', pageNum = 1, type, go, cb, fresh = "") => {
      
      
      if (cb &&  apiAlreadyCalling.current === false) {
        try {
          apiAlreadyCalling.current = true;
          const response = await api({
          search: inputValue,
          page: pageNum,
          per_page: 30,
          ...extraParams,
          });
        return response.data;
        } catch (error) {
          console.log(error)
          return
        }
        finally {
          apiAlreadyCalling.current = false;
        }
        return
      }
      
      const isLoading = apiAlreadyCalling.current;
      let searchData = memorizedResults.current.get(inputValue) || {};
      if ((searchData?.lastPage && !type && fresh !== "mpn") || isLoading) return;

      try {
        setIsLoading(true);
        apiAlreadyCalling.current = true;
        console.log(optionLabelKey)
        
        const response = await api(
          optionLabelKey === 'mpn' ||   fresh === 'mpn'
            ? {
                search: inputValue,
                search_column: 'mpn',
                page: pageNum,
                per_page: 30,
                ...extraParams,
              }
            : {
                search: inputValue,
                page: pageNum,
                per_page: 30,
                ...extraParams,
              }
        );
        const data = response.data;
        
        if (
          data.current_page === searchData.page &&
          data.current_page !== undefined && !type && fresh !== "mpn"
        )
          return;
        searchData.page = data.current_page;
        searchData.lastPage = data?.current_page === data?.last_page;

        
       
        const newOptions = data?.data.map(item => ({
          ...item,
          [optionLabelKey]: item[labelValueKey],
          value: item[optionValueKey],
        }));

        // newOptions

        if (typeof setOptionsCallback === 'function') {
          setOptionsCallback(newOptions);
        }

        if (searchData?.page > 1) {
          searchData.data = [...searchData.data, ...newOptions]; // append the options if page is greater than one to show all fetched items
        } else {
          searchData.data = newOptions;
        }

        memorizedResults.current.set(inputValue, searchData);
        setOptions(searchData);
      } catch (error) {
        console.error('error fetching options', error);
      } finally {
        apiAlreadyCalling.current = false;
        setIsLoading(false);
      }
    },
    [api]
  );

  

  const debouncedFetchOptions = useCallback(
    debounce(async (inputValue, page, type, fresh) => {

      if (fresh !== 'mpn') {
      
        const data = memorizedResults.current.get(inputValue);
        if (data?.data?.length > 0) {
          setOptions(data);
          return;
        }
      }
      await fetchOptions(inputValue, 1, type, "", "", fresh);
    }, 500),
    [fetchOptions]
  );

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions, refresh]);

  const handleInputChange = useCallback(
    (newValue, actionMeta, index) => {
      if (actionMeta.prevInputValue !== newValue) {
        let searchData = memorizedResults.current.get(newValue);
        selectGroup
          ? setSearch(prev => {
              let searchResult = [...prev];
              searchResult[index] = newValue;
              return [...searchResult];
            })
          : setSearch(newValue);
          
        debouncedFetchOptions(newValue, searchData?.page);
      }
    },
    [debouncedFetchOptions]
  );

  const handleInputChangeNew = useCallback(
    (newValue, index, type ) => {
        let searchData = memorizedResults.current.get(newValue);
        selectGroup
          ? setSearch(prev => {
              let searchResult = [...prev];
              searchResult[index] = newValue;
              return [...searchResult];
            })
          : setSearch(newValue);
          
        debouncedFetchOptions(newValue, searchData?.page, type);
    },
    [debouncedFetchOptions]
  );

  const handleInputChangeNew1 = useCallback(
    (newValue, index, type, fresh) => {
      
        let searchData = memorizedResults.current.get(newValue);
        selectGroup
          ? setSearch(prev => {
            let searchResult = [...prev];
            searchResult[index] = newValue;
            return [...searchResult];
          })
          : setSearch(newValue);
        
        debouncedFetchOptions(newValue, searchData?.page, type, fresh);
    },
    [debouncedFetchOptions]
  );

  const handleSelectChange = useCallback(
    (selected, index, source) => {
      if(selected !== null){
        if(Object.keys(selected).length === 1 || source === "edit"){
          selected.custom_item = true
          selected.index = index
        }
      }
     
      setSelectedValue(selected);
      setSearch(selectGroup ? [] : ''); //clear the search on option select
      handleInputChange('', { prevInputValue: null }); // call the input change function to reset the options with empty search
      let searchData = memorizedResults.current.get('');

     
      if (searchData?.data?.length > 0) {
        // check if length of options greater is than 0 then set the options else fetch more options
        setOptions(searchData);
      } else {
        fetchOptions('', searchData?.page || 1);
      }
    },
    [fetchOptions]
  );
  const handleMenuScrollToBottom = useCallback( async (index, go, pageNumber, cb) => {

    if (pageNumber) {
      const res = await fetchOptions('', pageNumber, undefined, go, true);
      if (cb && typeof cb === 'function') { 
        cb(res)
      }
      
    }
    const searchedText = selectGroup ? search[index] || '' : search;
    let searchData = memorizedResults.current.get(searchedText);

    if (!searchData?.lastPage) {

      if( !searchedText && !go) return
    
      fetchOptions(searchedText, (searchData?.page || 0) + 1, undefined, go); // fetch options for next page when scroll to bottom
    }
  });
  return {
    options,
    search,
    isLoading,
    selectedValue,
    handleInputChange,
    handleSelectChange,
    handleMenuScrollToBottom,
    setSearch,
    setOptions,
    setSelectedValue,
    setIsLoading,
    handleInputChangeNew,
    handleInputChangeNew1,
  };
};

export default usePaginatedSearch;
