const expect = require('expect');

const {Users} = require ('./users');

describe(' Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node course'
        }]
    });
 
    it('should add new User', () => {
        var users = new Users ();
        var user = {
            id: '123',
            name: 'Katerina',
            room: 'The office fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        // var userList = users.removeUser('1');
        // expect(userList).toEqual(['Jen', 'Julie']);

        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    }); 

    it('should not remove user', () => {
        // var userList = users.removeUser('135');
        // expect(userList).toEqual(['Mike', 'Jen', 'Julie']);
        
        var userId = '65';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    
    }); 

    it('should find user', () => {
        // var userList = users.getUser('1');

        // expect(userList).toEqual(['Mike']);

        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        // var userList = users.getUser('531512');

        // expect(userList).toEqual([]);

        var userId = '23156';
        var user = users.getUser(userId);

        expect(user).toNotExist();

    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React course');

        expect(userList).toEqual(['Jen']);
    });
});