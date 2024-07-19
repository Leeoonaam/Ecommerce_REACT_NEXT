'use client' // Isso indica que o código deve ser executado no cliente, não no servidor
import { useCallback } from 'react' 

// Define um hook customizado chamado useLocalStorage
export default function useLocalStorage() { 
    // Função para obter um valor do localStorage
    const get = useCallback((chave: string) => {
        const valor = localStorage.getItem(chave) // Obtém o item do localStorage pela chave
        return valor ? JSON.parse(valor) : null // Se o valor existir, parseia-o como JSON, caso contrário retorna null
    }, []) // useCallback com dependências vazias, garante que a função não será recriada a menos que as dependências mudem

    // Função para definir um valor no localStorage
    const set = useCallback((chave: string, valor: any) => {
        localStorage.setItem(chave, JSON.stringify(valor)) // Converte o valor para string JSON e armazena no localStorage
    }, []) // useCallback com dependências vazias, garante que a função não será recriada a menos que as dependências mudem

    // Função para remover um item do localStorage
    const remove = useCallback((chave: string) => {
        localStorage.removeItem(chave) // Remove o item do localStorage pela chave
    }, []) // useCallback com dependências vazias, garante que a função não será recriada a menos que as dependências mudem

    // Retorna as funções get, set e remove para serem usadas em outros componentes
    return { get, set, remove }
}
