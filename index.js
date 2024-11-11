import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors"
import fs from 'fs'

import {
    loginValidation,
    postCreateValidation,
    registerValidation
} from "./validations.js";

import {handleValidationErrors , checkAuth} from "./utils/index.js"
import {UserController, PostController} from "./controllers/index.js";

mongoose.connect("mongodb+srv://admin:admin@cluster0.wakcld8.mongodb.net/blog")
    .then(() => console.log("db ok"))
    .catch((err) => {
        console.log("DB not working", err);
    });

const app = express();
app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
    destination: (_ , __ ,cb) =>{
        if (!fs.existsSync('uploads')){
            fs.mkdirSync('uploads')
        }
        cb(null,"uploads")
    },
    filename:(_ , file ,cb) =>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage});

app.use("/uploads", express.static("uploads"))


app.post("/upload/avatar", upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.post("/upload" , upload.single("image"), (req, res) => {
    res.json({
        url : `/uploads/${req.file.originalname}`
    })
})

app.post("/auth/register", registerValidation,handleValidationErrors, UserController.register);

app.post("/auth/login", loginValidation,handleValidationErrors, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);


app.post("/posts" ,checkAuth,postCreateValidation,handleValidationErrors, PostController.create);
app.patch("/posts/:id" ,postCreateValidation, checkAuth,handleValidationErrors, PostController.update);
app.get("/posts", PostController.getAll);
app.get("/posts/:id" ,  PostController.getOne);
app.delete("/posts/:id" , checkAuth,PostController.remove);

app.get("/tags" ,  PostController.getLastTags);
app.get("/posts/tags" ,  PostController.getLastTags);





app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log("error");
    }
    console.log("ITS OK");
});
