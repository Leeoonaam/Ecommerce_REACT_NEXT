'use client' // Indica que este código deve ser executado no cliente, não no servidor

import AreaItemCarrinho from "@/components/carrinho/areaItemCarrinho"; 
import CarrinhoVazio from "@/components/carrinho/CarrinhoVazio"; 
import TotalCarrinho from "@/components/carrinho/Total"; 
import Pagina from "@/components/template/Pagina"; 
import useCarrinho from "@/data/hooks/useCarrinho";

// Define o componente funcional PaginaCarrinho
export default function PaginaCarrinho() { 

    // Acessando o valor compartilhado no contexto
    // const { numero} = useContext(ContextoCarrinho) // Comentado: exemplo de como acessar o valor do contexto
    // const { numero} = useCarrinho() // Comentado: exemplo de como acessar o valor do hook useCarrinho

    // return <Pagina>carrinho: {numero}</Pagina> // Comentado: exemplo de como renderizar o valor do carrinho

    const { itens, adicionar, remover } = useCarrinho(); // Usa o hook useCarrinho para obter itens, adicionar e remover funções

    return (
        <Pagina className="flex flex-col gap-10">

            {itens.length === 0 ? ( // Verifica se o carrinho está vazio
                <CarrinhoVazio /> // Renderiza o componente CarrinhoVazio se não houver itens
            ) : ( // Caso contrário, renderiza os itens do carrinho
                <>
                    
                    <div className="flex flex-col gap-5"> 
                        {itens.map((item) => ( // Itera sobre os itens do carrinho
                            <AreaItemCarrinho
                                key={item.produto.id} // Define a chave única para cada item
                                item={item} // Passa o item como prop para o componente AreaItemCarrinho
                                adicionar={() => adicionar(item.produto)} // Passa a função adicionar como prop
                                remover={() => remover(item.produto)} // Passa a função remover como prop
                            />
                        ))}
                    </div>
                    
                    <TotalCarrinho itens={itens} /> 
                </>
            )}
        </Pagina>
    );
}
