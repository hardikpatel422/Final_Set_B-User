import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {  } from "react";
import { useHistory } from "react-router-dom";
import { DeleteUser } from "../../action/UserAction";




export default function FormList() {
  let history = useHistory();
  const dispatch = useDispatch();

  const submithandler = () => {
    
      
    history.push("/ContactForm");
  }
//   const edithandler = (data) => {
      
//     dispatch(EditContact(data));
//     history.push("/ContactForm");
//   }
  
  const userSelector = useSelector((state) => state.users.users)

  return (
    <div className="container">
      <div className="row d-flex flex-column">

        <div className="col-md-12 mx-auto my-4 mx-auto shadow">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Martial Status</th>
                <th scope="col">Members</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userSelector.map(users => (
                <tr>
                  <td>{users.id}</td>
                  <td>{users.FirstName}</td>
                  <td>{users.LastName}</td>
                  <td>{users.Email}</td>
                  <td>{users.Gender}</td>
                  <td>{users.MartialStatus}</td>
                  {/* <td>{users.Member.map(function(name, index){
                    return <li key={ index }>{name}</li>;
                  })}</td> */}

                  <td>
                    {users.Member.map((item) => (
                      <li key={item.mid}>{item.name}</li>
                    ))}
                  </td>
                  <td>

                    <button
                      type="button"
                      onClick={() => dispatch(DeleteUser(users.id))}
                      // onClick={deleteda}
                      className="btn btn-sm btn-danger mx-3"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button type="button" onClick={submithandler} className="btn btn-outline-dark btn-sm ">Add Contact</button> */}
        </div>
      </div>
    </div>

  );



}