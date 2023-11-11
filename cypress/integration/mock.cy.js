//Global declarations for API endpoints
const baseUrl = 'http://localhost:3001';
let accessToken = '';
let id = '';

//Login API call to Real World application to get Authentication token
describe('Login to real world application',()=>{
    it('Login to application',()=>{
        cy.fixture('logindetails').then((login)=>{
        cy.request({
        method : 'POST',    
        url : baseUrl + '/login',
        headers : {
            'Accept' : "*/*, application/json",
            'Content-Type' : "application/json",
        },
        body: {
            "type" : login.type,
            "username" : login.username,
            "password" : login.password
        }
       }).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res));
            accessToken = res.headers['set-cookie'];
     })
    })
})
})

//Mock the fetch user transaction response
describe('Mock the API response of user transactions',()=>{
    it('retrieve user transactions',()=>{
    cy.intercept({
    method : 'GET',
    url : baseUrl + '/transactions',
    },
    {
       statusCode : 201,
       body : [
        {
           "mockResponse" : "mockvalue",
           "pid" : "12"
        }]
    })
})
})