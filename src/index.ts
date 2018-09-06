import { expect } from 'chai'
import * as nock from 'nock';
import { getOrders, getOrdersNegative } from "./MockContext";


describe('Test of the orders handler', () => {


    before(() => {
        const response = {
            "orders": [
                {
                    "id": 1234,
                    "invoice_id": 1234,
                    "item_names": [
                        "Gucci Shoes",
                        "Prada Gloves"
                    ],
                    "gift_item_names": [
                        "Gucci Scarf",
                        "Nike Shoes"
                    ],
                    "total_formatted": "$999.99 CAD",
                    "status": "shipped",
                    "is_returnable": true,
                    "is_on_hold_allowed": false,
                    "is_disabled": false,
                    "order_date": "2018-04-08 18:24:14",
                    "shipment": {
                        "tracking_url": "http://canadapost.com/orderid"
                    },
                    "error": false
                }
            ],
            "total": 1,
            "per_page": 10,
            "page": 0
        };

        const negativeResponse = {
            "code": 'BadRequestError',
            "message": '{reason for bad request}',
        };

        nock('http://a656a7f1c222411e8b7720ada5fa8115-1893598199.us-west-2.elb.amazonaws.com')
            .get('/customers/8844389/orders')
            .query({page: '0', language_code: 'en'})
            .reply(200, response);

        nock('http://a656a7f1c222411e8b7720ada5fa8115-1893598199.us-west-2.elb.amazonaws.com')
            .get('/customers/8844389/orders')
            .query({page: '0'})
            .reply(200, negativeResponse);

    });


    it('Should return an appropriate positive response', async () => {
        const response = await getOrders();
        expect(response).to.be.have.property('orders').to.be.a('array');
        expect(response).to.be.have.property('per_page').to.be.a('number');
        expect(response).to.be.have.property('total').to.be.a('number');
        expect(response).to.be.have.property('page').to.be.a('number');
    });

    it('Should return an appropriate negative response', async () => {
        const response = await getOrdersNegative();
        expect(response).to.be.have.property('code').to.be.a('string').equal('BadRequestError');
        expect(response).to.be.have.property('message').to.be.a('string');
    });
});