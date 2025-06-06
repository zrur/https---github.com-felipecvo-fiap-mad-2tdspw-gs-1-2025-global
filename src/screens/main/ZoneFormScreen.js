import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles';

const ZoneFormScreen = ({ route, navigation }) => {
  const { zoneId } = route.params || {};
  const isEditing = !!zoneId;

  const [formData, setFormData] = useState({
    name: '',
    area: '',
    cropType: '',
    description: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.area) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    Alert.alert(
      'Sucesso',
      `Zona ${isEditing ? 'atualizada' : 'criada'} com sucesso!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome da Zona *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => updateField('name', value)}
          placeholder="Ex: Horta Principal"
        />

        <Text style={styles.label}>Área (m²) *</Text>
        <TextInput
          style={styles.input}
          value={formData.area}
          onChangeText={(value) => updateField('area', value)}
          placeholder="Ex: 100"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tipo de Cultura</Text>
        <TextInput
          style={styles.input}
          value={formData.cropType}
          onChangeText={(value) => updateField('cropType', value)}
          placeholder="Ex: Tomate"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(value) => updateField('description', value)}
          placeholder="Descrição da zona..."
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Atualizar Zona' : 'Criar Zona'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ZoneFormScreen;
