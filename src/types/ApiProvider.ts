export interface ApiProvider {
    name: string;
    category: string;
    description: string;
    is_visible: boolean;
    functionalities:Functionality[];
  }

export interface Functionality{
  functionality_id:number;
  name: string;
  description: string;
}
