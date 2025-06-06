import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { zonesService } from '../../services/zonesService';
import { colors } from '../../styles';

const ZonesScreen = ({ navigation }) => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      setLoading(true);
      // Dados simulados - substitua pela sua API
      const mockZones = [
        { id: 1, name: 'Horta Principal', area: 100, cropType: 'Tomate', active: true },
        { id: 2, name: 'Zona Norte', area: 75, cropType: 'Alface', active: true },
        { id: 3, name: 'Estufa 1', area: 50, cropType: 'Pepino', active: false },
      ];
      setZones(mockZones);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as zonas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchZones();
  };

  const renderZone = ({ item }) => (
    <TouchableOpacity
      style={styles.zoneCard}
      onPress={() => navigation.navigate('ZoneForm', { zoneId: item.id })}
    >
      <View style={styles.zoneHeader}>
        <Text style={styles.zoneName}>{item.name}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.active ? colors.success : colors.textLight }
        ]}>
          <Text style={styles.statusText}>
            {item.active ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.zoneDetails}>Área: {item.area}m²</Text>
      <Text style={styles.zoneDetails}>Cultura: {item.cropType}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={zones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderZone}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma zona cadastrada</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ZoneForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  zoneCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
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
  zoneDetails: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ZonesScreen;
