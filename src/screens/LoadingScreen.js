import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors } from '../styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>IrrigaFácil</Text>
      <Text style={styles.subtitle}>Sistema de Irrigação Inteligente</Text>
      
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loader}
      />
      
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 40,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
  },
});

export default LoadingScreen;
