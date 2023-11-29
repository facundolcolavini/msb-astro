export interface APIResponseSelects {
    resultado: Results;
}

export interface Results {
    barrio:       Neighborhood[];
    operacion:    Option[];
    tipo:         Option[];
    paises:       Option[];
    ambientes:    Option[];
    edificios:    Option[];
    localidades:  Option[];
    partidos:     Option[];
    rio:          Option[];
    regiones:     Option[];
    ocupacion:    Option[];
    select_calle: string;
    calles:       Option[];
    provincia:    Option[];
    valor:        ValueRange;
    codsuc:       Option[];
}

export interface Option {
    value:       string;
    descripcion: string;
}

export interface Neighborhood {
    value:       string;
    descripcion: string;
    data?:       string;
}

export interface ValueRange {
    desde: Value[];
    hasta: Value[];
}

export interface Value {
    val:         string;
    descripcion: string;
}
