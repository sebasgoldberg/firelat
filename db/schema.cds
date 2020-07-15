using { cuid, managed } from '@sap/cds/common';
namespace qintess.firelat;

aspect firelat: cuid, managed {
    descricao: String(100);
    ano_de: Integer not null @assert.range: [ 1900, 9999 ];
    periodo_de: Integer not null @assert.range: [ 0, 12 ];
    ano_ate: Integer not null @assert.range: [ 1900, 9999 ];
    periodo_ate: Integer not null @assert.range: [ 0, 12 ];
    virtual pdf: LargeBinary @Core.MediaType: 'application/pdf';
}

entity Diario: firelat{
}

type ContaFachesf: String(12);

entity Razao: firelat{
    conta_de: ContaFachesf;
    conta_ate: ContaFachesf;
}
