import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View, ScrollView, Alert } from 'react-native';
import { API_BASE_URL } from '../config.js'; 
import { GlobalStyles, ScreenStyles, ComponentStyles, ThemeColors } from '../styles/AppStyles'; 

const formatarData = (dataString) => {
    if (!dataString) return 'Não agendada';
    try {
        const date = new Date(dataString + 'T00:00:00'); 
        if (isNaN(date)) return 'Data Inválida';
        return date.toLocaleDateString('pt-BR');
    } catch (e) {
        return 'Data Inválida';
    }
};

const Detalhes = ({ route, navigation }) => {
    const localId = route.params?.localId; 
    const API_URL = localId ? `${API_BASE_URL}/servicos/${Number(localId)}` : null; 

    const [local, setLocal] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(localId ? null : "ID do local não fornecido.");
    const [carregandoExclusao, setCarregandoExclusao] = useState(false);

    useEffect(() => {
        if (localId) {
            buscarDetalhes();
        } else {
            setCarregando(false);
        }
    }, [localId]);

    const buscarDetalhes = async () => {
        setCarregando(true);
        setErro(null);
        try {
            const response = await axios.get(API_URL);
            setLocal(response.data);
        } catch (err) {
            console.error("Erro ao buscar detalhes:", err);
            setErro(`Não foi possível carregar os detalhes do local. Erro: ${err.message}`);
        } finally {
            setCarregando(false);
        }
    };
    
    const confirmarExclusao = async () => {
        if (!localId || !API_URL) {
            Alert.alert('Falha', 'ID de exclusão não encontrado.');
            return;
        }

        setCarregandoExclusao(true);
        try {
            console.log("URL de EXCLUSÃO sendo usada:", API_URL); 
            
            await axios.delete(API_URL); 
            
            Alert.alert('Sucesso', 'Local excluído com sucesso!');
            navigation.navigate('Listagem'); 
        } catch (error) {
            console.error("ERRO CRÍTICO NA EXCLUSÃO:", error);
            Alert.alert('Falha na Exclusão', `Erro: ${error.message} (Status: ${error.response?.status})`);
        } finally {
            setCarregandoExclusao(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir permanentemente este local?")) {
            confirmarExclusao();
        } else {
            console.log("Exclusão cancelada pelo usuário.");
        }
    };


    if (carregando) {
        return (
            <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={ThemeColors.ACCENT_PURPLE} />
                <Text style={ScreenStyles.listSubtitle}>Carregando detalhes...</Text>
            </View>
        );
    }

    if (erro || !local) {
        return (
            <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
                <Text style={ComponentStyles.errorText}>Erro: {erro || "Local não encontrado ou ID inválido."}</Text>
                <Button title="Voltar" onPress={() => navigation.goBack()} color={ThemeColors.ACCENT_PURPLE} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.containerScroll}>
            <Text style={ScreenStyles.detailTitle}>{local.nome}</Text>
            <Text style={ComponentStyles.detalhesSubtitle}>Tipo: {local.tipo}</Text>
            
            <View style={ComponentStyles.detalhesCard}>
                
                <Text style={ComponentStyles.detalhesLabel}>Data do Evento:</Text>
                <Text style={ComponentStyles.detalhesText}>
                    {formatarData(local.data)}
                </Text>
                
                <Text style={ComponentStyles.detalhesLabel}>Endereço:</Text>
                <Text style={ComponentStyles.detalhesText}>{local.endereco || 'Não informado'}</Text>
                
                <Text style={ComponentStyles.detalhesLabel}>Acompanhantes Sugeridos:</Text>
                <Text style={ComponentStyles.detalhesText}>{local.acompanhantes || 'Não informado'}</Text>

                <Text style={ComponentStyles.detalhesLabel}>Descrição:</Text>
                <Text style={ComponentStyles.detalhesText}>{local.descricao}</Text>

                <Text style={ComponentStyles.detalhesLabel}>ID (Debug):</Text>
                <Text style={ComponentStyles.detalhesText}>{local.id}</Text>
            </View>

            <View style={ComponentStyles.listagemButtonRow}>
                <Button 
                    title="Editar" 
                    onPress={() => navigation.navigate('Edicao', { localId: local.id })}
                    color={ThemeColors.ACCENT_PURPLE}
                />
                <Button 
                    title={carregandoExclusao ? "Excluindo..." : "Excluir"} 
                    onPress={handleDelete}
                    disabled={carregandoExclusao}
                    color={ThemeColors.ERROR}
                />
            </View>
            <View style={ComponentStyles.detalhesButtonContainer}>
                <Button title="Voltar para Listagem" onPress={() => navigation.navigate('Listagem')} color={ThemeColors.ACCENT_PURPLE} />
            </View>
        </ScrollView>
    );
};

export default Detalhes;