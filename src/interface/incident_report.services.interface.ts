import { Query } from "@src/models";

export interface IIncident_Report_Service<T> {
// ------------------- Case management --------------

search_case(query: Query): Promise<T[]>;
create_case(Body_case: object): Promise<T>;
update_case(case_id: string, changes : object): Promise<boolean>;

// ---------------------- Reusable -----------------------------

// exportar_Csv(query:Query): Promise<void>  
// verify_direction(direction: string): Promise<void>

}

// // ---------------- Derivaciones center--------------------------
// create_area( Body_area: object ) :Promise<void>
// list_area():Promise <K>
// update( area_id: string ):Promise<void>