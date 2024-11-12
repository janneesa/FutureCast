let userArray = [];
let nextId = 1;

const getAll = () => {
    return userArray;
};

const addOne = (name, email, password, phone_number, date_of_birth) => {
    if (!name | !email | !password | !phone_number | !date_of_birth) {
        return false;
    }
    const newUser = {
        id: nextId++,
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        date_of_birth: date_of_birth,
    };
    userArray.push(newUser);
    return newUser;
}

const findById = (id) => {
    const user = userArray.find((user) => user.id === Number(id));
    if (user) {
        return user;
    } else return false;
};

const updateOneById = (id, updatedData) => {
    const user = findById(id);
    if (user) {
        if (updatedData.name) {
            user.name = updatedData.name;
        }
        if (updatedData.email) {
            user.email = updatedData.email;
        }
        if (updatedData.password) {
            user.password = updatedData.password;
        }
        if (updatedData.phone_number) {
            user.phone_number = updatedData.phone_number;
        }
        if (updatedData.date_of_birth) {
            user.date_of_birth = updatedData.date_of_birth;
        }
        return user;
    }
    return false;
};

const deleteOneById = (id) => {
    const user = findById(id);
    if (user) {
        const initialLenght = userArray.length;
        userArray = userArray.filter((user) => user.id !== Number(id));
        return userArray.length < initialLenght;
    } else return false;
};

module.exports = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById,
};