import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
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

interface UserData {
  name: string;
  email: string;
  phone: string;
  property: string;
}

interface Settings {
  notifications: boolean;
  autoIrrigation: boolean;
  weatherAlerts: boolean;
}

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
}

export default function ProfileScreen() {
  const [userData] = useState<UserData>({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    property: 'Fazenda São José',
  });

  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    autoIrrigation: true,
    weatherAlerts: false,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const MenuSection = ({ title, children }: MenuSectionProps) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({ icon, title, subtitle, onPress, rightComponent }: MenuItemProps) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color={colors.primary} />
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || <Ionicons name="chevron-forward" size={20} color={colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      <MenuSection title="Informações Pessoais">
        <MenuItem
          icon="person-outline"
          title="Dados Pessoais"
          subtitle="Nome, email, telefone"
          onPress={() => console.log('Editar perfil')}
        />
        <MenuItem
          icon="home-outline"
          title="Propriedade"
          subtitle={userData.property}
          onPress={() => console.log('Editar propriedade')}
        />
      </MenuSection>

      <MenuSection title="Configurações">
        <MenuItem
          icon="notifications-outline"
          title="Notificações"
          subtitle="Alertas e lembretes"
          rightComponent={
            <Switch
              value={settings.notifications}
              onValueChange={(value) => setSettings({...settings, notifications: value})}
              trackColor={{ false: colors.textLight, true: colors.primary }}
            />
          }
        />
        <MenuItem
          icon="water-outline"
          title="Irrigação Automática"
          subtitle="Ativar modo automático"
          rightComponent={
            <Switch
              value={settings.autoIrrigation}
              onValueChange={(value) => setSettings({...settings, autoIrrigation: value})}
              trackColor={{ false: colors.textLight, true: colors.primary }}
            />
          }
        />
        <MenuItem
          icon="cloud-outline"
          title="Alertas Meteorológicos"
          subtitle="Previsão do tempo"
          rightComponent={
            <Switch
              value={settings.weatherAlerts}
              onValueChange={(value) => setSettings({...settings, weatherAlerts: value})}
              trackColor={{ false: colors.textLight, true: colors.primary }}
            />
          }
        />
      </MenuSection>

      <MenuSection title="Suporte">
        <MenuItem
          icon="help-circle-outline"
          title="Ajuda"
          subtitle="FAQ e tutoriais"
          onPress={() => console.log('Ajuda')}
        />
        <MenuItem
          icon="mail-outline"
          title="Contato"
          subtitle="Fale conosco"
          onPress={() => console.log('Contato')}
        />
        <MenuItem
          icon="information-circle-outline"
          title="Sobre o App"
          subtitle="Versão 1.0.0"
          onPress={() => console.log('Sobre')}
        />
      </MenuSection>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={colors.danger} />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
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
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 20,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 1,
  },
  menuItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
  },
});
