import { ArrowUpAZ } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
    AUTH:{
        LOGIN:`${API_URL}/auth/login`,
        LOGOUT:`${API_URL}/auth/logout`,
        ME:`${API_URL}/auth/me`,
    },
    USUARIO:{
        CREATE:`${API_URL}/usuario/`,
        UPDATE:`${API_URL}/usuario/`
    },
    CIDADE:{

    },
    DOACAO:{
        GET:(doacao_id)=>`${API_URL}/doacao/${doacao_id}`,
        UPDATE:(doacao_id)=>`${API_URL}/doacao/${doacao_id}`,
        LISTAR:(param)=>`${API_URL}/doacao/?${param}`,
        ACOMPANHAR:`${API_URL}/doacao/acompanhar`,
    },
    ENDERECO:{

    },
    ESTADO:{

    },
    NOTIFICACAO:{
        PAGINA:`${API_URL}/notificacao/pagina_notificacoes`,
        UPDATE:(notificacao_id)=>`${API_URL}/notificacao/${notificacao_id}`
    },
    UNIDADE:{

    }
}