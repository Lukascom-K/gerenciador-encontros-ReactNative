import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native'; 
import { Picker } from '@react-native-picker/picker'; 

import { API_BASE_URL } from '../config.js'; 
import { GlobalStyles, ScreenStyles, ComponentStyles, ThemeColors } from '../styles/AppStyles'; 

const API_URL = `${API_BASE_URL}/servicos`;

const OPCOES_FILTRO = [
    { label: 'Todos os Tipos', value: 'Todos' },
    { label: 'Bar', value: 'Bar' },
    { label: 'Restaurante', value: 'Restaurante' },
    { label: 'Parque', value: 'Parque' },
    { label: 'Museu', value: 'Museu' },
    { label: 'Outro', value: 'Outro' },
];

const Listagem = ({ navigation }) => {
    const [locais, setLocais] = useState([]); 
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoSelecionado, setTipoSelecionado] = useState('Todos'); 

    useEffect(() => {
        buscarLocais();
    }, []);

    const buscarLocais = async () => {
        setCarregando(true);
        setErro(null);
        try {
            const response = await axios.get(API_URL);
            setLocais(response.data);
        } catch (err) {
            console.error("Erro ao buscar locais:", err);
            setErro("Não foi possível carregar os dados. Verifique a URL e o backend.");
        } finally {
            setCarregando(false);
        }
    };

    const locaisFiltrados = useMemo(() => {
        if (tipoSelecionado === 'Todos') {
            return locais;
        }
        return locais.filter(local => local.tipo === tipoSelecionado);
    }, [locais, tipoSelecionado]);

    const renderItem = ({ item }) => (
        <View style={ComponentStyles.listagemItemCard}>
            <Text style={ComponentStyles.listagemItemTitle}>{item.nome}</Text>
            <Text style={ComponentStyles.listagemItemDetail}>Tipo: {item.tipo}</Text>
            <View style={ComponentStyles.listagemButtonRow}>
                <Button 
                    title="Detalhes" 
                    onPress={() => navigation.navigate('Detalhes', { localId: item.id })}
                    color={ThemeColors.ACCENT_PURPLE}
                />
                <Button 
                    title="Editar" 
                    onPress={() => navigation.navigate('Edicao', { localId: item.id })}
                    color={ThemeColors.ACCENT_PURPLE}
                />
            </View>
        </View>
    );

    if (carregando) {
        return (
            <View style={GlobalStyles.container}>
                <ActivityIndicator size="large" color={ThemeColors.ACCENT_PURPLE} />
                <Text style={ScreenStyles.listSubtitle}>Buscando dados...</Text>
            </View>
        );
    }

    if (erro) {
        return (
            <View style={GlobalStyles.container}>
                <Text style={ComponentStyles.errorText}>Erro: {erro}</Text>
                <Button title="Tentar Novamente" onPress={buscarLocais} color={ThemeColors.ERROR} />
            </View>
        );
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={ScreenStyles.listTitle}>Locais Sugeridos</Text>

            <View style={ComponentStyles.pickerContainer}>
                <Picker
                    selectedValue={tipoSelecionado}
                    onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
                    style={ComponentStyles.picker}
                >
                    {OPCOES_FILTRO.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
            
            <Button 
                title="Cadastrar Novo Local ➕" 
                onPress={() => navigation.navigate('Cadastro')}
                color={ThemeColors.ACCENT_PURPLE}
            />
            
            <FlatList
                data={locaisFiltrados} 
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                style={ComponentStyles.listagemList}
                ListEmptyComponent={() => (
                    <Text style={ComponentStyles.listagemEmptyText}>
                        Nenhum local encontrado para o tipo "{tipoSelecionado}".
                    </Text>
                )}
            />
        </View>
    );
};

export default Listagem;