import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Text } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery, gql } from '@apollo/client';
import useSignOut from '../hooks/useSignOut';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: theme.colors.appBarBackground,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

import PropTypes from 'prop-types';

const AppBarTab = ({ to, onPress, children }) => (
  <Pressable onPress={onPress}>
    {to ? (
      <Link to={to}>
        <Text style={styles.tab}>{children}</Text>
      </Link>
    ) : (
      <Text style={styles.tab}>{children}</Text>
    )}
  </Pressable>
);

AppBarTab.propTypes = {
  to: PropTypes.string, 
  onPress: PropTypes.func, 
  children: PropTypes.node.isRequired, 
};

const AppBar = () => {
  const { data } = useQuery(ME); 
  const signOut = useSignOut();
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <AppBarTab onPress={signOut}>Sign Out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign In</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
