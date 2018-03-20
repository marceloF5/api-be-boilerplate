import * as mocha from 'mocha';
import * as Chai from 'chai';
import * as td from 'testdouble';
const supertes = require('supertest');
import App from '../../../server/api/api';

const app = App;
const request = supertes;
const expect = Chai.expect;
const testDouble = td;

export { app, request, expect, testDouble };