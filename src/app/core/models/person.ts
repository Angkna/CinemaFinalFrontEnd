export class Person {


    public idPerson: number;
    public name: string;
    // public birthdate?: number;
    
    public animationState: String= "base";

    public deserialize(datas: any): Person {
        Object.assign(this, datas);
        return this;
    }
}