import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  primary: '#2E8B57',
  secondary: '#87CEEB',
  success: '#32CD32',
  warning: '#FFA500',
  danger: '#DC143C',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#2F4F4F',
  textLight: '#708090',
};

interface Sensor {
  id: number;
  name: string;
  zoneId: number;
  zoneName: string;
  humidity: number;
  status: 'online' | 'offline';
  battery: number;
} // Adicionado o fechamento da interface

// Resto do código do componente sensors.tsx continua aqui...