import { useContext } from "react";
import ContextoCarrinho from "../constants/contextoCarrinho";

const useCarrinho = () => useContext(ContextoCarrinho)

export default useCarrinho