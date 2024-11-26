import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: '#586069',
    marginBottom: 5,
  },
  language: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#0366d6',
    color: '#fff',
    borderRadius: 4,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  statLabel: {
    color: '#586069',
  },
  text: {
    fontFamily: theme.fontFamily, 
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  githubButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  showGitHubButton,
  url,
}) => {
  const handleOpenGitHub = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.details}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description || 'No description available'}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatCount(stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatCount(forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={handleOpenGitHub}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

RepositoryItem.propTypes = {
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string,
  language: PropTypes.string.isRequired,
  forksCount: PropTypes.number.isRequired,
  stargazersCount: PropTypes.number.isRequired,
  ratingAverage: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  ownerAvatarUrl: PropTypes.string.isRequired,
  showGitHubButton: PropTypes.bool,
  url: PropTypes.string,
};

export default RepositoryItem;