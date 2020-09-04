const express = require('express');
const app = express();
const cors = require('cors');

const connection = require('./connection');
const bodyParser = require('body-parser');
const {
    text
} = require('body-parser');
const {
    application
} = require('express');

app.use(cors());


app.use(bodyParser.json());

app.get('/', async (req, res) => {

    const query = "select * from user";
    try {
        const conn = await connection;

        const result = await conn.queryAsync(query);
        res.send(result);
        res.end();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
});


//=========================================================================================
//=========================================================================================


app.get('/inventory', async (req, res) => {
    console.log(34567890);
    const query = "select * from inventory";
    try {
        const conn = await connection;
        const result = await conn.queryAsync(query);
        res.send(result);
        res.end();
    } catch (err) {
        console.log(err);
    }
})


//=========================================================================================
//=========================================================================================
app.post('/signup', async (req, res) => {

    console.log(4);
    try {
        const singUpData = req.body;
        const conn = await connection;
        console.log(5);
        const checkQuery = "select * from user where email = ?";
        console.log(6);
        const result = await conn.queryAsync(checkQuery, [singUpData.email]);
        console.log(7);
        if (result == "") {
            console.log(8);
            const query = "INSERT INTO USER (fName,lName,userName,email,mobile,password) values(?,?,?,?,?,?);";

            await conn.queryAsync(query, [singUpData.fName, singUpData.lName, singUpData.userName, singUpData.email, singUpData.mobileNumber, singUpData.password]);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "success"
            }));
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
        }
        res.end();
    } catch (err) {

    }
})

//=========================================================================================
//=========================================================================================


app.post('/signin', async (req, res) => {

    console.log("signInCalled");
    try {
        const singInData = req.body;
        console.log(req.body);
        const conn = await connection;
        const query = "select * from user where email = ?";
        const result = await conn.queryAsync(query, [singInData.email]);

        console.log(result);

        if (result == '') {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
            console.log("f1")
        }

        if (result[0].password === singInData.password && result[0].roleid == 1) {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                fname: result[0].fName,
                lName: result[0].lName,
                userName: result[0].userName,
                email: result[0].email,
                mobileNumber: result[0].mobile,
                roleid: result[0].roleid
            }));

            console.log("succes");
        } else if (result[0].password === singInData.password && result[0].roleid == 0) {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                fname: result[0].fName,
                lName: result[0].lName,
                userName: result[0].userName,
                email: result[0].email,
                mobileNumber: result[0].mobile,
                roleid: result[0].roleid
            }));
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
            console.log("f2")
        }
        res.end();
    } catch (err) {

    }
})



//=========================================================================================
//=========================================================================================
app.put('/forgot', async (req, res) => {
    console.log("forogt");
    try {
        const forgotData = req.body;
        const query = "SELECT * FROM user WHERE email =?";
        const conn = await connection;
        const result = await conn.queryAsync(query, [forgotData.email]);
        if (forgotData.email === result[0].email && forgotData.mobileNumber === result[0].mobile) {
            const queryUpdate = "UPDATE user SET password = ? WHERE email = ?";
            await conn.queryAsync(queryUpdate, [forgotData.password, forgotData.email]);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "success"
            }));
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
        }
        res.end();
    } catch (err) {}
})

//=========================================================================================
//=========================================================================================

app.post('/addItems', async (req, res) => {

    console.log("itemadding22");
    try {
        const itemsData = req.body;
        console.log(itemsData);
        const query = "INSERT INTO inventory (pName,pPrice,pQty) values(?,?,?)";
        const conn = await connection;

        const checkQuery = "select * from inventory where Pname = ?";
        const resultCheck = await conn.queryAsync(checkQuery, [itemsData.pName]);
        if (resultCheck == "") {

            await conn.queryAsync(query, [itemsData.pName, itemsData.pPrice, itemsData.pQuantity]);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "success"
            }));
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
        }

        res.end();
    } catch (err) {

    }
})





//=========================================================================================
//=========================================================================================

app.put('/removeItems', async (req, res) => {

    console.log("removing22");
    try {
        const itemsData = req.body;
        //console.log(itemsData);

        const query = "select * from inventory where pName = ?";
        const conn = await connection;
        const result = await conn.queryAsync(query, [itemsData.pName]);
        console.log(result);
        if (result == "") {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
        } else {
            const query = "delete from inventory where pName = ?";
            const conn = await connection;
            const result = await conn.queryAsync(query, [itemsData.pName]);

            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "success"
            }));
        }
        res.end();
    } catch (err) {

    }
})

//=========================================================================================
//=========================================================================================

app.put('/increaseItems', async (req, res) => {

    console.log("increasing22");
    try {
        const itemsData = req.body;
        console.log(itemsData);


        const query = "select pQty from inventory where pName = ?";
        const conn = await connection;
        const result = await conn.queryAsync(query, [itemsData.pName]);
        console.log(result);

        if (result == "") {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));
        } else {
            const newQty = result[0].pQty + itemsData.pQuantity;

            const queryUpdated = "UPDATE inventory SET pQty = ?  WHERE pName = ?";
            const newResult = await conn.queryAsync(queryUpdated, [newQty, itemsData.pName]);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "success"
            }));
        }




        res.end();
    } catch (err) {

    }
})



//=========================================================================================
//=========================================================================================

app.put('/decreaseItems', async (req, res) => {

    console.log("decreaseing22");
    try {
        const itemsData = req.body;
        console.log(itemsData);



        const query = "select pQty from inventory where pName = ?";
        const conn = await connection;
        const result = await conn.queryAsync(query, [itemsData.pName]);
        console.log(result);
        if (result == "") {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "failed"
            }));

        } else if (result[0].pQty < itemsData.pQuantity) {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "Not possible"
            }));
        } else {

            const newQty = result[0].pQty - itemsData.pQuantity;

            const queryUpdated = "UPDATE inventory SET pQty = ?  WHERE pName = ?";
            const newResult = await conn.queryAsync(queryUpdated, [newQty, itemsData.pName]);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({
                message: "success"
            }));
        }

        res.end();
    } catch (err) {

    }
})




app.listen(8080, () => {
    console.log('server running');
});