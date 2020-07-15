using { YY1_BALANCE_A2P_API_CDS } from '../srv/external/YY1_BALANCE_A2P_API_CDS';
using { qintess.firelat as firelat } from '../db/schema';


service FiRelatService {

    entity Diario as projection on firelat.Diario;

    @readonly
    entity YY1_Balance_A2P_API as projection on YY1_BALANCE_A2P_API_CDS.YY1_Balance_A2P_API;

    @readonly
    entity YY1_Balance_A2P_APIResults as projection on YY1_BALANCE_A2P_API_CDS.YY1_Balance_A2P_APIResults;

}