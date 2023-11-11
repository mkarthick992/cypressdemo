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

//POST API call to create transactions
describe('Create user transactions',()=>{
    it('create transactions',()=>{
        cy.fixture('createtransaction').then((payload)=>{
        cy.request({
        method : 'POST',    
        url : baseUrl + '/transactions',
        headers : {
            'Accept' : "*/*, application/json",
            'Content-Type' : "application/json",
            'Cookie' : accessToken
        },
        body: {
            "transactionType" : payload.transactionType,
            "amount" : payload.amount,
            "description" : payload.description,
            "senderId" : payload.senderId,
            "receiverId" : payload.receiverId,
        }
       }).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res));
            expect(res.body.transaction).has.property("description","Payment request");
            expect(res.body.transaction).has.property("status","pending");
            expect(res.body.transaction).has.property("requestStatus","pending");
            id = res.body.transaction.id;
            cy.log("Transaction created with id"+id);
     })
    })
})
})

//GET API call to fetch user transactions
describe('Fetch and validate the above created user transactions',()=>{
    it('retrieve user transactions',()=>{
        cy.request({
        method : 'GET',    
        url : baseUrl + '/transactions/'+id,
        headers : {
            'Accept' : "*/*, application/json",
            'Content-Type' : "application/json",
            'Cookie' : accessToken
        }
        }).then((res)=>{
           expect(res.status).to.eq(200)
           cy.log(JSON.stringify(res));
           expect(res.body.transaction).has.property("id",id);
           expect(res.body.transaction).has.property("description","Payment request");
           expect(res.body.transaction).has.property("status","pending");
           expect(res.body.transaction).has.property("requestStatus","pending");
    })
    })
    })

    //GET API call to fetch user transactions contacts
    describe('Gets list of transactions for users list of contacts',()=>{
    it('retrieves user transaction contacts',()=>{
        cy.request({
        method : 'GET',    
        url : baseUrl + '/transactions/contacts',
        headers : {
            'Accept' : "*/*, application/json",
            'Content-Type' : "application/json",
            'Cookie' : accessToken
        }
        }).then((res)=>{
           expect(res.status).to.eq(200)
           cy.log(JSON.stringify(res));
           expect(res.body.pageData).has.property("page");
           expect(res.body.pageData).has.property("limit");
           expect(res.body.pageData).has.property("hasNextPages");
           expect(res.body.pageData).has.property("totalPages");
    })
    })
    })
