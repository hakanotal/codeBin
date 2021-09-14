const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// DB Model
const File = require('./models/File');

// Express config
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// GET Requests
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.get('/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        const code = file.codeFile;
        const type = file.codeType;
        res.render('display', { code, type });
    } catch (e) {
        res.redirect('new');
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.render('new', { code: file.codeFile });
    } catch (e) {
        res.redirect('new');
    }
});

app.get('/download/:id', async (req, res) => {
    const fileExt = {
        plaintext: '.txt',
        javascript: '.js',
        html: '.html',
        python: '.py',
        cpp: '.cpp',
    };

    try {
        const file = await File.findById(req.params.id);
        const code = file.codeFile;
        const type = file.codeType;
        res.attachment(req.params.id + fileExt[type]);
        res.send(code);
    } catch (e) {
        res.redirect('new');
    }
});

// POST Requests
app.post('/', (req, res) => {
    res.redirect('/');
});

app.post('/new', (req, res) => {
    res.redirect('/new');
});

app.post('/save', async (req, res) => {
    try {
        const file = await File.create({
            codeFile: req.body.codeFile,
            codeType: req.body.codeType,
        });
        res.redirect(`/${file.id}`);
    } catch (e) {
        res.render('new', { code: req.body.codeFile });
    }
});

app.post('/edit/:id', (req, res) => {
    res.redirect(req.path);
});

module.exports = app;
