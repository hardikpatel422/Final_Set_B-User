export const AddUser = (userdata) => (
    console.log("addUserAction", userdata),
    {
        type: "CREATE_USER",
        payload: userdata,
    }
);


export const DeleteUser = (deletedata) => (
    console.log("DeleteUserAction", deletedata),
    {
        type: "DELETE_USER",
        payload: deletedata,
    
    }
);

export const GetUser = (getdata) => (
    console.log("getContactAction", getdata),
    {
        type: "GET_USER",
        payload: getdata,
    
    }
);
