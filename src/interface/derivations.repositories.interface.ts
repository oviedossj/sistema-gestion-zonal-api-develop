
export interface IDerivations_Repository<T> {
  crearte_area( data:object ): Promise<T>
  find_one_area( area_id: string): Promise< T | null> ;
  find_all_areas(): Promise< T[] | null> 
  update_area(area_id:number): Promise< T[] | null> 

}

