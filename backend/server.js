const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require("bcrypt");
const someRoutes = express.Router();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());

//mongoose
const { mongoose } = require("./db/mongoose");
const { Company } = require("./db/models/company");
const { ExchangeRate } = require("./db/models/exchangerate");
const { Asset } = require("./db/models/asset");

// companies
someRoutes.route('/companies').get(function (req, res) {
    Company.find(function (err, companies) {
        if (err) {
            console.log(err);
        } else {
            res.json(companies);
        }
    });
});

someRoutes.route('/company/:id').get(function (req, res) {
    let id = req.params.id;
    Company.findById(id, function (err, company) {
        res.json(company);
    });
});

someRoutes.route('/company/update/:id').post(function (req, res) {
    Company.findById(req.params.id, function (err, company) {
        if (!company)
            res.status(404).send("data is not found");
        else
            company.id = req.body.company_id;
        company.name = req.body.company_name;
        company.tier = req.body.company_tier;

        company.save().then(todo => {
            res.json('Company updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

someRoutes.route('/company/add').post(function (req, res) {
    let company = new Company(req.body);
    company.save()
        .then(company => {
            res.status(200).json({ 'company': 'company added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new company failed');
        });
});

// exchange rates
someRoutes.route('/rates').get(function (req, res) {
    ExchangeRate.find(function (err, rates) {
        if (err) {
            console.log(err);
        } else {
            res.json(rates);
        }
    });
});

// ASSETS API

//add an asset
someRoutes.route('/addasset').post(function (req, res) {

    // const encrypted_key = bcrypt.hashSync(req.body.key, bcrypt.genSaltSync(10));

    // let asset = new Asset({
    //     key: encrypted_key,
    //     denomination_type: req.body.denomination_type,
    //     denomination_amount: req.body.denomination_amount
    // });
    let asset = new Asset(req.body);

    console.log("Adding asset :" + asset);
    asset.save()
        .then(asset => {
            res.status(200).json({ 'asset': 'asset added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new asset failed');
        });
});

// get all assets
someRoutes.route('/allassets').get(function (req, res) {
    Asset.find(function (err, assets) {
        if (err) {
            console.log(err);
        } else {
            res.json(assets);
        }
    });
});

// get asset details by account_id
someRoutes.route('/getassetdetails').get(function (req, res) {

    // const encrypted_key = bcrypt.hashSync(req.body.key, bcrypt.genSaltSync(10));

    Asset.find({ key: req.body.key }, function (err, assets) {
        if (err) {
            console.log(err);
        } else {
            res.json(assets);
        }
    });

    // bcrypt.compare(req.body.key, encrypted_key, function (err, result) {
    //     if (result == true) {
    //         console.log("Key matched in Database");

    //         res.status = 200;
    //         res.end();
    //     } else {
    //         res.send('Incorrect Key');
    //         res.status = 203;
    //         res.end();
    //     }
    // });

});

// update asset amount based on account_id and denomination_type
someRoutes.route('/setassetamount').post(function (req, res) {

    Asset.findOneAndUpdate({ key: req.body.key, denomination_type: req.body.denomination_type }, { $set: { denomination_amount: req.body.denomination_amount } }, { new: true }, (err, results) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        else if (results == null) {
            console.log("Account or Denomination type does not exist");
            res.send("Account or Denomination type does not exist");
            res.staus = 404
            res.end();
        } else {
            console.log("Account amount updated for key " + results.key);
            console.log(results);
            res.send("Account amount updated for key " + results.key);
            res.status = 200;
            res.end();
        }
    });
});


app.use('/bidding', someRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});