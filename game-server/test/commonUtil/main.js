/**
 * Created by star on 2017/6/30.
 */

const util = require('util');

/**
 * util.inherits
 * JavaScript面向对象特性，基于原型
 */

// function Base(){
//     this.name = 'base';
//     this.base = 1991;
//     this.sayHello = function(){
//         console.info('Hello ' + this.name);
//     }
// }
//
// Base.prototype.showName = () => {
//     console.error(this.name);
// };
//
// function Sub() {
//     this.name = 'sub';
// }
//
// util.inherits(Sub, Base);
// let objBase = new Base();
// objBase.showName();
// objBase.sayHello();
// console.info('objBase : ', objBase);
//
// let objSub = new Sub();
// objSub.showName();
// //objSub.sayHello();
// console.info('objSub : ', objSub);


/**
 * util.inspect
 * JavaScript面向对象特性，基于原型
 */

// function Person() {
//     this.name = 'byvoid';
//     this.toString = function () {
//         return this.name;
//     }
// }
//
// let obj = new Person();
// console.info(util.inspect());
// console.info(util.inspect(obj, true, null, true));


/**
 * util.isArray(object)
 * JavaScript面向对象特性，基于原型
 */

// console.info(util.isArray([]), util.isArray(new Array), util.isArray({}));


/**
 * util.isRegExp(object), isDate(object), isError(object)
 * JavaScript面向对象特性，基于原型
 */















































