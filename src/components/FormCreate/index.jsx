import React, { useEffect, useState } from "react";
import { Container, FormSelect } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import shortid from "shortid";
import { AddUser,GetUser } from "../../action/UserAction";


export const FormCreate = () => {
    //history and dispatch
    let history = useHistory();
    const dispatch = useDispatch();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [marital, setMarital] = useState('');


    //validation
    const [formvalue, setFormvalue]= useState({ fname:'',lname:'',gender:'',email:''});
    const [formerror, setFormerror] = useState({});
    const [issubmit, setSubmit]= useState(true);


    const [inputList, setinputList]= useState([{mid:shortid.generate(),name:''}]);

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        console.log(list);
        list[index][name]= value;
        setinputList(list);    
      }
      const handleaddclick=()=>{ 
        setinputList([...inputList, { mid:shortid.generate(),name:''}]);
      }

      const onInputChange = (e) => {
        const {name, value}= e.target;
        console.log('Input value: ', name,value);
     
        const re = /^[A-Za-z]+$/;
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        ;
        if(name!='email'){
            if (value === "" || re.test(value)) {            
                setFormvalue({...formvalue, [name]: value});
            }
            if(name=='marital_status'){
                setMarital(value);
            }
            
        }else{
        // if(emailPattern.test(value)){
            setFormvalue({...formvalue, [name]: value});            
        // }
    }
        
      }

      const handleremove= (e)=>{        
        const list=[...inputList];
        // var index = list.indexOf(e.target.value)
        list.splice(e.mid,1);
        setinputList(list);
      }

      // function handleremove(id) {
      //   console.log("remove id",id);
      //   const a=[...inputList];
      //   const newList = a.filter((item) => item.mid !== id);
      //   setinputList(newList);
      // }
 const validationform = (value)=>{
        const errors= {};
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if(!value.fname && value.fname>3){
          errors.fname="Please Enter First Name";
        }
        if(!value.lname && value.fname>3){
          errors.lname="Please Enter Last Name";
        }
        
        if(!value.email){
            errors.email="Please Enter Email";
        } else if(!emailPattern.test(value.email))
        {
            errors.email="Enter Valid Email";
        }
        
        return errors;
    }
      const submithandler = (e) => {
        e.preventDefault();
        setFormerror(validationform(formvalue));
               
         
        const data={
            id:shortid.generate(),
            FirstName:formvalue.fname,
            LastName:formvalue.lname,
            Email:formvalue.email,
            Gender:formvalue.gender,
            MartialStatus:marital,
            Member:inputList

        }
        console.log(data);

       
        dispatch(GetUser(""));
        dispatch(AddUser(data));
        console.log("formdata" + JSON.stringify(data));
        history.push("/");
      }

      useEffect( ()=>{
        if(formvalue.fname!=""&& formvalue.lname!="" && formvalue.email!="" && formvalue.gender!="" && marital!="" ){
          setSubmit(false);
        }
        
        if(Object.keys(formerror).length===0 )
        {          
            console.log(formvalue);
        }
      },[formerror, formvalue, issubmit]);


  return (
    <Container className="content">
     <div className="row">
     <div className="col-md-12 p-3 m-2 mx-auto shadow">
     <h5 className="fw-bold text-center" style={{ fontSize: 24, fontWeight: "bold" }}>Enter User Details</h5>
     <form >
        <div className="form-group m-5">  
            
                <div class="form-group col-md-12">
                <input
                    className="form-control my-2"
                    name='fname'
                    type="text"
                    placeholder="First Name"
                    value={formvalue.fname}                    
                    // onChange={(e) => setFname(e.target.value)}
                    
                    onChange={onInputChange}
                /><span className="text-danger">{ formerror.fname }</span>
                </div>

                <div class="form-group col-md-12 mt-3">
                    <input
                        className="form-control my-2"
                        name='lname'
                        type="text"
                        placeholder="Last Name"
                        value={formvalue.lname}
                        // onChange={(e) => setLname(e.target.value)}
                        onChange={onInputChange}
                    /><span className="text-danger">{ formerror.lname }</span>
                </div>
            
                <div class="form-group col-md-12 mt-3">
                <input
                    className="form-control my-2"
                    name="email"
                    type="text"
                    
                    placeholder="Email"
                    value={formvalue.email}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={onInputChange}
                /><span className="text-danger">{ formerror.email }</span>
                </div>

                <div class="form-group col-md-12 mt-3">
                <FormSelect aria-label="Default select my-2" onChange={onInputChange} name="gender">
                    <option>Open this select Gender</option>
                    <option value="male">Male</option>
                    <option value="Female">Female</option>
                </FormSelect><span className="text-danger">{ formerror.gender }</span>
                </div>

                <div class="form-group col-md-12 mt-3">
                <label class="form-check-label" for="radio2">Marital Status</label><span className="text-danger">{ formerror.martial }</span>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio1" name="marital_status" value="married" onChange={onInputChange} />Married
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio2" name="marital_status" value="Unmarried" onChange={onInputChange} />Unmarried
                </div>
                </div>
            
        </div>
        </form>
    </div>
       <div className="col-md-12 p-3 m-2 mx-auto shadow ">
         <h5 className="mt-3 mb-4 fw-bold text-center">Add a Family Member</h5>         
            { 
            inputList.map( (x,i)=>{
              return(
              <div className="row mb-3 ">
                 <div class="form-group col-md-9">
                 <label >Member Name: </label> {i+1}
                  <input type="text"  name="name" class="form-control"  placeholder="Enter Member Name" onChange={ e=>handleinputchange(e,i)} />
               </div>
               
               <div class="form-group col-md-3 mt-4">
               {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={()=> handleremove(x)}>Delete
                  </button>
               }
               <div >
               { inputList.length-1===i &&
               <button  className="btn btn-success mx-1" onClick={handleaddclick}>Add </button>
               }
               </div>
               </div>
               
            </div>
              );
             } )} 

               
       </div>
       <div className="form-group my-3">
              <button
                type="button"
                disabled={issubmit?'disabled':null}
                onClick={submithandler}
                className="btn btn-block btn-dark"
              >Add Details                
              </button>
            </div>
     </div>
    </Container>
  )
}