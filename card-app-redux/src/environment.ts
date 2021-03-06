const dev = {
    context: 'http://localhost:8012'
}

const prod = {
    context: 'http://reimbursement-api.wppa5hnd3n.us-east-2.elasticbeanstalk.com/'
}

export let environment = dev;

if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
    environment = prod;
}