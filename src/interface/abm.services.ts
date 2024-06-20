
export interface IABM_Service<T> {
// ---------------- permission center--------------------------

update_Citizen(user_id: string): Promise<T | null>;

grant_permissions(user_id:string):Promise <void>


}
