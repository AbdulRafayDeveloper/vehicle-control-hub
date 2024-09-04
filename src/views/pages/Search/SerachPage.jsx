import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Helmet } from 'react-helmet';
import SearchBar from '../../components/GenericSearchBar/SearchBar';

const SearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    // Replace with actual search logic
    const sampleData = [
      { id: 1, name: 'Vehicle 1' },
      { id: 2, name: 'Spare Part 1' },
      { id: 3, name: 'Vehicle 2' },
      { id: 4, name: 'Spare Part 2' },
    ];

    const filteredResults = sampleData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <Container>
      <Helmet>
        <title>Search Vehicles and Spare Parts - Your Website Name</title>
        <meta
          name="description"
          content="Search for vehicles and spare parts on our website. Find the parts and vehicles you need with our search feature."
        />
        <link rel="canonical" href="https://www.yourwebsite.com/search" />
        {/* Add other SEO-related meta tags as needed */}
      </Helmet>
      <Typography variant="h4" sx={{ my: 4 }}>
        Search Vehicles and Spare Parts
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <List>
        {results.map((result) => (
          <ListItem key={result.id}>
            <ListItemText primary={result.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default SearchPage;
