import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';


const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

const RepositoryListHeader = ({ searchKeyword, setSearchKeyword, selectedOrder, onSortingChange }) => (
  <View style={styles.header}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories..."
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
    <Picker
      selectedValue={selectedOrder}
      onValueChange={onSortingChange}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

RepositoryListHeader.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
  selectedOrder: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired,
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  onSortingChange,
  searchKeyword,
  setSearchKeyword,
  navigate,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          selectedOrder={selectedOrder}
          onSortingChange={onSortingChange}
        />
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

RepositoryListContainer.propTypes = {
  repositories: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.object.isRequired,
      })
    ),
  }),
  selectedOrder: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const getSortVariables = (sortOption) => {
    switch (sortOption) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'latest':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const variables = {
    ...getSortVariables(sortOption),
    searchKeyword: debouncedSearchKeyword,
  };

  console.log('Query Variables:', variables);

  const { repositories, loading: repositoriesLoading } = useRepositories(variables);

  const { data: meData, loading: meLoading } = useQuery(ME);

  if (meLoading || repositoriesLoading) {
    return <Text>Loading...</Text>;
  }

  if (!meData?.me) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={sortOption}
      onSortingChange={setSortOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
