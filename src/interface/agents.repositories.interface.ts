
export interface IAgent_Repository<> {
 
  assignZone(user_id:number, zone_id:number ): Promise<void>
  assignPermissions(user_id:number,permissions: object[]): Promise <void>

// ------------------------ Edicion del ciudadano  -------------------

  update_Citizen( user_id : number , change : object) : Promise< void >
// -------------------------
}
