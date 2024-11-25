import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Navigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

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
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading: repositoriesLoading } = useRepositories();

  const { data: meData, loading: meLoading } = useQuery(ME);

  if (meLoading || repositoriesLoading) {
    return <Text>Loading...</Text>;
  }

  if (!meData?.me) {
    return <Navigate to="/signin" replace />;
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RepositoryList;
