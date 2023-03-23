import axios from 'axios';
import { expect } from 'chai';

let headers;

describe('Country population api test', () => {
    before('generate basic auth from user credential', async () => {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        const auth = `Basic ${Buffer.from(`${username}:${password}`).toString(
            'base64' // base64 encoded credentials
        )}`;
        headers = {
            'Content-Type': 'application/json',
            Authorization: auth,
        };
    });

    it('As a user, I want to be able to fetch a list of countries,', async () => {
        let response = await axios.get(
            'http://localhost:8080/countries?order=asc',
            {
                headers,
            }
        );
        expect(response.status).to.equal(200);
        expect(response.data[1]).to.have.all.keys('name', 'code', 'population');
    });

    it('As an admin, I want to be able to update a countries population', async () => {
        const data = { name: 'Albania', population: 3 };
        const countryID = 'alb';

        let response = await axios.patch(
            'http://localhost:8080/countries/' + countryID,
            data,
            {
                headers,
            }
        );
        expect(response.status).to.equal(202);
        expect(response.data.name).to.equal('Albania');
        expect(response.data.code).to.equal('alb');
        expect(response.data.population).to.equal(3);
    });

    it('Negative - admin update country with invalid country code', async () => {
        const data = { name: 'Albania', population: 3 };
        const countryId = 'alzz';

        let response = await axios.patch(
            'http://localhost:8080/countries/' + countryId,
            data,
            {
                headers,
                validateStatus: function (status) {
                    return status >= 200 && status < 500; // Accept only status codes in the 2xx and 4xx range
                },
            }
        );
        expect(response.status).to.equal(404);
    });

    it('As an admin, I want to be able to reset the database back to original state,', async () => {
        let response = await axios.get(
            'http://localhost:8080/countries/reset',
            {
                headers,
            }
        );
        expect(response.status).to.equal(204);
    });

    it('As an admin, I want to be able to remove a country from the list', async () => {
        const countryId = 'afg';

        let res = await axios.delete(
            'http://localhost:8080/countries/' + countryId,
            {
                headers,
            }
        );
        expect(response.status).to.equal(204);
    });
});
