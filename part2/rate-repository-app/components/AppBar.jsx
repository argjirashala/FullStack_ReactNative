import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Text } from 'react-native';
import { Link } from 'react-router-native';
import PropTypes from 'prop-types'; 
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

const AppBarTab = ({ to, children }) => (
  <Link to={to} component={Pressable}>
    <Text style={styles.tab}>{children}</Text>
  </Link>
);


AppBarTab.propTypes = {
  to: PropTypes.string.isRequired, 
  children: PropTypes.node.isRequired, 
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
