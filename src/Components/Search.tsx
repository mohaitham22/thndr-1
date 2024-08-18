import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

// Define props type using 'type'
type SearchComponentProps = {
  onSearch: (value: string) => void;
  loading: boolean;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, loading }) => {
  return (
    <Search
      placeholder="Search for movies"
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      loading={loading}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchComponent;

