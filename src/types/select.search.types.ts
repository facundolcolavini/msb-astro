export interface APIResponseEntrepreneurship {
    resultado: Results;
}

export interface Results {
    barrio:       Barrio[];
    operacion:    Ambiente[];
    tipo:         Ambiente[];
    paises:       Ambiente[];
    ambientes:    Ambiente[];
    edificios:    Ambiente[];
    localidades:  Ambiente[];
    partidos:     Ambiente[];
    rio:          Ambiente[];
    regiones:     Ambiente[];
    ocupacion:    Ambiente[];
    select_calle: string;
    calles:       Ambiente[];
    provincia:    Ambiente[];
    valor:        Valor;
    codsuc:       Ambiente[];
}

export interface Ambiente {
    value:       string;
    descripcion: string;
}

export interface Barrio {
    value:       string;
    descripcion: string;
    data?:       string;
}

export interface Valor {
    desde: Desde[];
    hasta: Desde[];
}

export interface Desde {
    val:         string;
    descripcion: string;
}
