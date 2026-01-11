
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
    AUTH:{
        LOGIN:`${API_URL}/auth/login`,
        LOGOUT:`${API_URL}/auth/logout`,
        ME:`${API_URL}/auth/me`,
    },
    USUARIO:{

    },
    CIDADE:{

    },
    DOACAO:{

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