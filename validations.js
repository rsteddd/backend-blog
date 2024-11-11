import {body} from "express-validator"


export const registerValidation = [
    body('email', 'Не пральний формат пошти').isEmail(),
    body('password', 'Пароль мінімум від 5 символів').isLength({min:5}),
    body('fullName', 'Вкажіть імя').isLength({min:3}),
    body('avatarUrl', 'Неправильно вказана силка на аву').optional().isString()
];
export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min:5})
];
export const postCreateValidation = [
    body('title', "уведіть заголовок статті").isLength({min: 3 }).isString(),
    body('text', "уведіть текст статті").isLength( {min: 3 }).isString(),
    body( 'tags', "не вірний формат тегів(вкажіть массив").optional().isString(),
    body('imageUrl',"не вірна силка на зображення").optional().isString()
]

