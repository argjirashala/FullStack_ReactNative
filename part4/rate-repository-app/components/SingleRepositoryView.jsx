import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-native';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { format } from 'date-fns';
import PropTypes from 'prop-types';


const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
  },
  separator: {
    height: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewDetails: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: '#586069',
    marginBottom: 5,
  },
  reviewText: {
    color: '#333',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem {...repository} showGitHubButton />
);

RepositoryInfo.propTypes = {
    repository: PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      description: PropTypes.string,
      language: PropTypes.string.isRequired,
      forksCount: PropTypes.number.isRequired,
      stargazersCount: PropTypes.number.isRequired,
      ratingAverage: PropTypes.number.isRequired,
      reviewCount: PropTypes.number.isRequired,
      ownerAvatarUrl: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
  };

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.rating}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewDetails}>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

ReviewItem.propTypes = {
    review: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.loadingText}>Error: {error.message}</Text>;
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SingleRepositoryView;
