import axis from 'axios';

export const getOrders = () => {
      return axis('http://a656a7f1c222411e8b7720ada5fa8115-1893598199.us-west-2.elb.amazonaws.com/customers/8844389/orders?language_code=en&page=0')
            .then(function (response: any) {
                return response.data;
            })
            .catch(function (error: any) {
                return error;
            });
    };


export const getOrdersNegative = () => {
    return axis('http://a656a7f1c222411e8b7720ada5fa8115-1893598199.us-west-2.elb.amazonaws.com/customers/8844389/orders?page=0')
        .then(function (response: any) {
            return response.data;
        })
        .catch(function (error: any) {
            return error;
        });
};



