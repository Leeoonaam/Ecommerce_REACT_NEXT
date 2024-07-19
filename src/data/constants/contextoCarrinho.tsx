import { createContext, useEffect, useState } from "react"
import ItemCarrinho from "../model/itemCarrinho" 
import Produto from "../model/produto" 
import useLocalStorage from "../hooks/useLocalStorage" 

// Interface antiga para o contexto do carrinho
interface ContextoCarrinhoProps_old {
    numero: number
    incrementar?: () => void
    decrementar?: () => void
}

// Interface atual para o contexto do carrinho
interface ContextoCarrinhoProps {
    itens: ItemCarrinho[]
    qtdItens: number
    adicionar: (item: Produto) => void
    remover: (item: Produto) => void
}

// Cria o contexto do carrinho com um valor padrão
const ContextoCarrinho = createContext<ContextoCarrinhoProps>({} as any)

// Função ProvedorCarrinho que provê o contexto para seus filhos
export function ProvedorCarrinho(props: any) {

    // const [numero, setNumero] = useState(1000)
    const [itens, setItens] = useState<ItemCarrinho[]>([]) // Estado para os itens do carrinho
    const { set, get } = useLocalStorage() // Usa o hook useLocalStorage para obter e definir itens no localStorage

    // Usa useEffect para carregar os itens do carrinho do localStorage quando o componente é montado
    useEffect(() => {
        const carrinho = get('carrinho')
        if (carrinho) {
            setItens(carrinho)
        }
    }, [get])

    // Função para adicionar um produto ao carrinho
    function adicionar(produto: Produto) {
        // Verifica se o produto já está no carrinho
        const indice = itens.findIndex((i) => i.produto.id === produto.id)

        if (indice === -1) {
            // Se não estiver, adiciona o produto ao carrinho
            setItens([...itens, { produto, quantidade: 1 }])
        } else {
            // Se estiver, incrementa a quantidade do produto
            const novoItens = [...itens]
            novoItens[indice].quantidade++
            alterarItens(novoItens)
        }
    }

    // Função para remover um produto do carrinho
    function remover(produto: Produto) {
        // Atualiza a quantidade do produto no carrinho
        const novosItens = itens.map((i) => {
            if (i.produto.id === produto.id) {
                i.quantidade--
            }
            return i
        }).filter((i) => i.quantidade > 0) // Remove itens com quantidade zero
        alterarItens(novosItens)
    }

    // Função para alterar os itens do carrinho e atualizar o localStorage
    function alterarItens(novosItens: ItemCarrinho[]) {
        setItens(novosItens) // Corrigido para setItens em vez de alterarItens
        set('carrinho', novosItens) // Atualiza o localStorage
    }

    // Retorna o provedor do contexto do carrinho
    return (
        <ContextoCarrinho.Provider
            value={{
                itens,
                // Getter para a quantidade total de itens no carrinho
                get qtdItens() { return itens.reduce((total, item) => total + item.quantidade, 0) },
                adicionar,
                remover
            }}>
            {props.children} // Renderiza os componentes filhos que usam este provedor
        </ContextoCarrinho.Provider>
    )
}

export default ContextoCarrinho // Exporta o contexto do carrinho
