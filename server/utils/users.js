// class Person {
//     constructor (name, age) {
//         console.log(name, age);
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// };

// //me is equal to the this variable
// var me = new Person('Andrew', 25);

// var description = me.getUserDescription();
// console.log(description)

// // console.log('this.name', me.name);
// // console.log('this.age', me.age);

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        //return user that was removed

        // var users = this.users.filter((user) => user.id !== id);
        // var usersArray = users.map((user) => user.name);
        // return usersArray;
        var user = this.getUser(id);

        if (user){
            this.users = this.users.filter((user) => user.id !==id);
        }

        return user;
    }

    getUser (id) {
        // var users = this.users.filter((user) => user.id === id);
        // var usersArray = users.map((user) => user.name);
        // return usersArray;

        return this.users.filter((user) => user.id === id)[0];

    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        
        //map lets to return value that we need to use
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};