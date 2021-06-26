const assert = require('assert');
describe("UserController",function(){
    describe("register",function(){
        it("last name should not be blank",function(){
            const lastName = req.body.lastName;
            assert.notStrictEqual(lastName.length,0);
        });
        it("last name should not contains only spaces",function(){
            const lastName = req.body.lastName;
            /^\s*$/.test(lastName).should.equal(false);
        });
        it("last name should not contain only numbers",function(){
            const lastName = req.body.lastName;
            /^\d*$/.test(lastName).should.equal(false);
        });
        it("email id should not be blank",function(){
            const email = req.body.email;
            assert.notStrictEqual(email.length,0);
        });
        it("email id should not contain only spaces",function(){
            const email = req.body.email;
            /^\s*$/.test(email).should.equal(false);
        });
        it("email id should be valid",function(){
            const email = req.body.email;
            let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            emailRegex.test(email).should.equal(true);
        });
        it("password should not be blank",function(){
            const password = req.body.password;
            assert.notStrictEqual(password.length,0)
        });
    });

    describe("getUser",function(){
        it("email id should not be blank",function(){
            const email = req.body.email;
            assert.notStrictEqual(email.length,0);
        });
        it("email id should be valid",function(){
            const email = req.body.email;
            let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            emailRegex.test(email).should.equal(true);
        });
    });
})