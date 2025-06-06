import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
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

interface IrrigationZone {
  id: number;
  zoneName: string;
  isActive: boolean;
  duration: number;
  schedule: string;
  autoMode: boolean;
}

export default function IrrigationScreen() {
  const [irrigationData, setIrrigationData] = useState<IrrigationZone[]>([
    { id: 1, zoneName: 'Horta Principal', isActive: false, duration: 10, schedule: '06:00', autoMode: true },
    { id: 2, zoneName: 'Zona Norte', isActive: true, duration: 15, schedule: '07:00', autoMode: false },
    { id: 3, zoneName: 'Estufa 1', isActive: false, duration: 8, schedule: '18:00', autoMode: true },
  ]);

  const toggleIrrigation = (zoneId: number) => {
    setIrrigationData(data =>
      data.map(zone =>
        zone.id === zoneId ? { ...zone, isActive: !zone.isActive } : zone
      )
    );
    
    const zone = irrigationData.find(z => z.id === zoneId);
    Alert.alert(
      'Irrigação',
      `Irrigação ${zone?.isActive ? 'desativada' : 'ativada'} para ${zone?.zoneName}`
    );
  };

  const toggleAutoMode = (zoneId: number) => {
    setIrrigationData(data =>
      data.map(zone =>
        zone.id === zoneId ? { ...zone, autoMode: !zone.autoMode } : zone
      )
    );
  };

  const IrrigationCard = ({ zone }: { zone: IrrigationZone }) => (
    <View style={styles.irrigationCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.zoneName}>{zone.zoneName}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: zone.isActive ? colors.success : colors.textLight }
        ]}>
          <Text style={styles.statusText}>
            {zone.isActive ? 'Irrigando' : 'Parado'}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="time" size={16} color={colors.textLight} />
          <Text style={styles.infoText}>Duração: {zone.duration} min</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="alarm" size={16} color={colors.textLight} />
          <Text style={styles.infoText}>Agendado: {zone.schedule}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Modo Automático</Text>
          <Switch
            value={zone.autoMode}
            onValueChange={() => toggleAutoMode(zone.id)}
            trackColor={{ false: colors.textLight, true: colors.primary }}
            thumbColor={zone.autoMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.irrigationButton,
            { backgroundColor: zone.isActive ? colors.danger : colors.primary }
          ]}
          onPress={() => toggleIrrigation(zone.id)}
        >
          <Ionicons
            name={zone.isActive ? "stop" : "play"}
            size={20}
            color="#fff"
          />
          <Text style={styles.irrigationButtonText}>
            {zone.isActive ? 'Parar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Controle de Irrigação</Text>
        <Text style={styles.headerSubtitle}>
          {irrigationData.filter(z => z.isActive).length} zona(s) irrigando
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="play" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Irrigar Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.danger }]}>
            <Ionicons name="stop" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Parar Todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.zonesContainer}>
          {irrigationData.map((zone) => (
            <IrrigationCard key={zone.id} zone={zone} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  zonesContainer: {
    gap: 12,
  },
  irrigationCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
  },
  controls: {
    gap: 12,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  irrigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  irrigationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
