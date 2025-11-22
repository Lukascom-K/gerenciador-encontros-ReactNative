import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cadastro from './src/screens/Cadastro';
import Detalhes from './src/screens/Detalhes';
import Edicao from './src/screens/Edicao';
import Home from './src/screens/Home';
import Listagem from './src/screens/Listagem';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ListagemStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Listagem"
            screenOptions={{
                headerStyle: { backgroundColor: '#007bff' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen name="Listagem" component={Listagem} options={{ title: 'Meus Encontros' }} />
            <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: 'Detalhes do Local' }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Novo Local' }} />
            <Stack.Screen name="Edicao" component={Edicao} options={{ title: 'Editar Local' }} />
        </Stack.Navigator>
    );
}

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'StackListagem') {
                        iconName = focused ? 'list' : 'list-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="StackListagem" 
                component={ListagemStack} 
                options={{ headerShown: false, title: 'Locais' }} 
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MainTabNavigator />
        </NavigationContainer>
    );
}