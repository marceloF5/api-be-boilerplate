import { testDouble, expect } from './config/helpers';

import User from '../../server/modules/User/service';
const model = require('../../server/models');

describe('Unit Tests', () => {

    let email;
    let _id;

    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
    }

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
        .then(() => {
            model.User.create(defaultUser).then(() => {
                console.log('Default User Created');
                done();
            })
        })
    })

    describe('Create Method', () => {
        it('Should be create new user', () => {
            const newUser = {
                id: 2,
                name: 'New User',
                email: 'newUser@email.com',
                password: '1234'
            }

            const user = User;

            return user.create(newUser)
                .then(data => {                    
                    expect(data.dataValues).to.have.all.keys(
                        ['id', 'name', 'email', 'password', 'updatedAt', 'createdAt']
                    )
                });
        });
    });

    describe('Get All Method', () => {
        it('Should be return all users', () => {

            return User.getAll().then(data => {
                expect(data).to.be.an('array');                
            })

        });
    });

    describe('Get By ID Method', () => {
        it('Should be return an user', () => {

            return User.getById(defaultUser.id).then(data => {
                expect(data).to.have.all.keys(
                    ['id', 'name', 'email', 'password']
                );
            })

        });
    });

    describe('Get By Email Method', () => {
        it('Should be return an user', () => {

            return User.getByEmail(defaultUser.email).then(data => {
                expect(data).to.have.all.keys(
                    ['id', 'name', 'email', 'password']
                );
            })

        });
    });

    describe('Update Method', () => {
        it('Should be update a user', () => {
            const userUpdated = {
                name: 'User Updated',
                email: 'user@updated'
            }

            return User.update(defaultUser.id, userUpdated).then(data => {
                expect(data[0]).to.be.equal(1)
            })
        });
    });

    describe('Delete Method', () => {
        it('Should be delete a user', () => {

            return User.delete(defaultUser.id).then(data => {
                expect(data).to.be.equal(1);
            })
        });
    });
});