using { qintess.firelat as firelat } from '../db/schema';


service FiRelatService {

    entity Diario as projection on firelat.Diario;

}