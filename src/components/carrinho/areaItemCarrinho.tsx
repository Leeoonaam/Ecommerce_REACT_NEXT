import ItemCarrinho from '@/data/model/itemCarrinho' 
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react' 
import Image from 'next/image' 

// Define a interface para as propriedades do componente AreaItemCarrinho
export interface AreaItemCarrinhoProps {
    item: ItemCarrinho // Propriedade obrigatória do tipo ItemCarrinho
    adicionar?: (item: ItemCarrinho) => void // Função opcional para adicionar um item
    remover?: (item: ItemCarrinho) => void // Função opcional para remover um item
}

// Define o componente funcional AreaItemCarrinho
export default function AreaItemCarrinho(props: AreaItemCarrinhoProps) {
    return (
        <div className="flex items-center gap-5 bg-zinc-900 rounded-md overflow-hidden"> 
            <div className="relative w-28 h-28"> 
                <Image
                    src={props.item.produto.imagem} // URL da imagem do produto
                    alt={props.item.produto.nome} // Texto alternativo da imagem
                    fill // Ajusta a imagem para preencher o contêiner
                    className="object-cover" // Define o estilo da imagem como cover
                />
            </div>
            <div className="flex flex-col justify-center flex-1"> 
                <span className="text-xl font-bold">{props.item.produto.nome}</span> 
                <span className="text-sm text-zinc-400">{props.item.produto.descricao}</span>
                <div className="flex items-center gap-2 mt-2 text-zinc-400 text-lg font-bold"> 
                    <span>R$ {props.item.produto.preco.toFixed(2)}</span> 
                    <IconX size={20} /> 
                    <span>{props.item.quantidade}</span>
                    <span>=</span> 
                    <span className="text-yellow-500">
                        R$ {(props.item.produto.preco * props.item.quantidade).toFixed(2)} 
                    </span>
                </div>
            </div>
            <div className="flex gap-2 items-center px-5"> 
                <button onClick={() => props.remover?.(props.item)}> 
                    <IconMinus /> //
                </button>
                <span className="flex px-4 py-2 rounded-md bg-black">{props.item.quantidade}</span> 
                <button onClick={() => props.adicionar?.(props.item)}> 
                    <IconPlus /> 
                </button>
            </div>
        </div>
    )
}
