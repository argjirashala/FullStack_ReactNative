import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries/queries";
import { format } from "date-fns";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
    padding: 10,
  },
  reviewItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
    fontSize: 16,
  },
  repositoryName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "#586069",
    fontSize: 14,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    marginTop: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

ReviewItem.propTypes = {
    review: PropTypes.shape({
      rating: PropTypes.number.isRequired,
      text: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      repository: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      style={styles.container}
    />
  );
};

export default MyReviews;
