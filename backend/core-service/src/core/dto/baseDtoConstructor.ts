// export interface BaseDtoConstructor {
//   new(obj: string): BaseDto;
//   key: string; // static
// }
//
// export class BaseDto {
//   constructor(private obj: string) {
//   }
//
//   static key: string;
// }
//
// // function BaseDto (obj) { //... }
//
// const map: Map<string, BaseDtoConstructor> = new Map();
//
// map.set('1', BaseDto);
//
// const constructorForBaseDto = map.get('1');
//
// if (constructorForBaseDto) {
//   new constructorForBaseDto('');
// }
