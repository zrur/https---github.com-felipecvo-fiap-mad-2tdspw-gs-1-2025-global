import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiService, { Sensor } from '../services/api';

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

export default function SensorsScreen() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    zoneId: '',
    battery: '100',
  });

  useEffect(() => {
    loadSensors();
  }, []);

  const loadSensors = async () => {
    try {
      setLoading(true);
      const data = await apiService.sensors.getAll();
      setSensors(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os sensores');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadSensors();
  };

  const handleAddSensor = () => {
    setEditingSensor(null);
    setFormData({ name: '', zoneId: '', battery: '100' });
    setModalVisible(true);
  };

  const handleEditSensor = (sensor: Sensor) => {
    setEditingSensor(sensor);
    setFormData({
      name: sensor.name,
      zoneId: sensor.zoneId.toString(),
      battery: sensor.battery.toString(),
    });
    setModalVisible(true);
  };

  const handleDeleteSensor = (sensor: Sensor) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir o sensor ${sensor.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiService.sensors.delete(sensor.id);
              Alert.alert('Sucesso', 'Sensor excluído com sucesso');
              loadSensors();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o sensor');
            }
          },
        },
      ]
    );
  };

  const handleSaveSensor = async () => {
    try {
      const sensorData = {
        name: formData.name,
        zoneId: parseInt(formData.zoneId),
        battery: parseInt(formData.battery),
        humidity: 0,
        status: 'online' as const,
        lastReading: new Date().toISOString(),
      };

      if (editingSensor) {
        await apiService.sensors.update(editingSensor.id, sensorData);
        Alert.alert('Sucesso', 'Sensor atualizado com sucesso');
      } else {
        await apiService.sensors.create(sensorData);
        Alert.alert('Sucesso', 'Sensor criado com sucesso');
      }

      setModalVisible(false);
      loadSensors();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o sensor');
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? colors.success : colors.textLight;
  };

  const getBatteryIcon = (battery: number) => {
    if (battery > 60) return 'battery-full';
    if (battery > 30) return 'battery-half';
    return 'battery-dead';
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return colors.success;
    if (battery > 30) return colors.warning;
    return colors.danger;
  };

  const renderSensor = ({ item }: { item: Sensor }) => (
    <View style={styles.sensorCard}>
      <View style={styles.sensorHeader}>
        <View style={styles.sensorInfo}>
          <Text style={styles.sensorName}>{item.name}</Text>
          <Text style={styles.sensorZone}>{item.zoneName || `Zona ${item.zoneId}`}</Text>
        </View>
        <View style={styles.sensorStatus}>
          <Ionicons
            name="ellipse"
            size={12}
            color={getStatusColor(item.status)}
            style={styles.statusIcon}
          />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status === 'online' ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      <View style={styles.sensorMetrics}>
        <View style={styles.metric}>
          <Ionicons name="water" size={24} color={colors.primary} />
          <Text style={styles.metricValue}>{item.humidity}%</Text>
          <Text style={styles.metricLabel}>Umidade</Text>
        </View>
        <View style={styles.metric}>
          <Ionicons
            name={getBatteryIcon(item.battery)}
            size={24}
            color={getBatteryColor(item.battery)}
          />
          <Text style={styles.metricValue}>{item.battery}%</Text>
          <Text style={styles.metricLabel}>Bateria</Text>
        </View>
        {item.temperature !== undefined && (
          <View style={styles.metric}>
            <Ionicons name="thermometer" size={24} color={colors.warning} />
            <Text style={styles.metricValue}>{item.temperature}°C</Text>
            <Text style={styles.metricLabel}>Temp.</Text>
          </View>
        )}
      </View>

      <View style={styles.sensorActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditSensor(item)}>
          <Ionicons name="pencil" size={18} color={colors.primary} />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteSensor(item)}>
          <Ionicons name="trash" size={18} color={colors.danger} />
          <Text style={[styles.actionButtonText, { color: colors.danger }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensores</Text>
        <Text style={styles.subtitle}>{sensors.length} sensores cadastrados</Text>
      </View>

      <FlatList
        data={sensors}
        renderItem={renderSensor}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="analytics-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyText}>Nenhum sensor cadastrado</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddSensor}>
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingSensor ? 'Editar Sensor' : 'Novo Sensor'}
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome do Sensor</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Ex: Sensor Horta Principal"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ID da Zona</Text>
                <TextInput
                  style={styles.input}
                  value={formData.zoneId}
                  onChangeText={(text) => setFormData({ ...formData, zoneId: text })}
                  placeholder="Ex: 1"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Bateria (%)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.battery}
                  onChangeText={(text) => setFormData({ ...formData, battery: text })}
                  placeholder="Ex: 100"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveSensor}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  sensorCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sensorInfo: {
    flex: 1,
  },
  sensorName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  sensorZone: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  sensorStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sensorMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  sensorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  editButton: {
    backgroundColor: colors.primary + '20',
  },
  deleteButton: {
    backgroundColor: colors.danger + '20',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textLight + '30',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.textLight + '20',
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});