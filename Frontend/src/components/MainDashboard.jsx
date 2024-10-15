import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormCheck, FormControl, FormGroup, FormText, Table } from "react-bootstrap";
export default function UserDashboard(){
    const key=localStorage.getItem('key');
  
    const [todos,settodos]=useState([]);
    const [refresh,setrefresh]=useState(false);

  // Fetching Data from server //
    
    useEffect( ()=>{

       const fetchdata= async()=>{
        await  axios.get("http://localhost:3001/showtodos",{
            headers:{
                'token':key
            }
          }).then((res)=>{
                
                settodos(res.data.todos);
            })

       } 

        fetchdata()
     
       
    },[refresh])


const addTodo=useRef();

    // Adding Data to the Todos //

    const addTodos=  async ()=>{
            await axios.post("http://localhost:3001/addtodo",{
                
                    'task':addTodo.current.value,
                    'done':false
                },{
                headers:{
                    'token':key
                }
            }).then(()=>{
                setrefresh(true);
                settodos((prev)=>[...prev,addTodo.current.value]);
                addTodo.current.value=null
            })
        }
   
    const hitEnter =(e)=>{
        if(e.key ==='Enter'){
            addTodos()
        }
    }
    const deletetodo= async (id)=>{

       
   
            await axios.delete(`http://localhost:3001/deletetodo/${id}`,{
                headers:{
                    'token':key
                }
            }).then(()=>{
                settodos((oldTodos) => oldTodos.filter(todo => todo.id !== id));
                setrefresh(true);
             
            }
            )
    } 
    const toggle= async (id)=>{
        const todo = todos.filter(todo => todo.id === id);
        await axios.post(`http://localhost:3001/update/${id}`,{
            title:todo.title,
            done:!(todo.done)
        },{
            headers:{
                'token':key
            }
        }).then((res)=>{
           console.log(res.data.message);
           setrefresh(false);

        })
    }
  
   

    return(
        <>
        <Container className=" justify-content-center align-items-center mt-5 ">
        <Container className="justify-content-center">
         
            <Container className="align-items-center">
                <div  className="d-flex  flex-lg-div    gap-3 justify-content-between align-items-center ">
                    <div xs={12} md={8} lg={9}>
                    
                    <FormGroup className="d-flex flex-lg-row  flex-sm-column" >
                     
                    <FormControl type="text" ref={addTodo} className=" p-2 me-4 mb-2  "  onKeyDown={hitEnter}  placeholder="Add Todo"/>
                       
                    </FormGroup>
                    
                    </div>
                    <div className="d-grid ">
                    <Button  size="md" variant="outline-secondary" onClick={addTodos}>Add</Button>
                    </div>
                </div>
              <Container  className=" table-responsive mt-4">
              <Table  className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Sn.no</th>
                        <th>Todos</th>
                        <th>Date</th>
                        <th>Completed</th>
                        <th>Delete</th>
                       
                       
                        
                        
                    </tr>
                </thead>
                <tbody>
                    
              {(todos)?todos.map((todo,index)  =>( 
                
                    <tr key={todo._id}>
                       <td>
                        <FormCheck type="checkbox" onChange={()=>toggle(todo._id)} checked={todo.done}/>
                       </td>
                        <td >
                              {index+1}
                        </td>
                         <td>
                         <FormText>{todo.title}</FormText>
                         </td>
                         <td>
                         <FormText>{todo.time}</FormText>
                         </td>
                         <td>
                            <FormText>{todo.done?"Completed":"Pending"}</FormText>
                        
                         </td>
                         <td>
                            <Button className="rounded-circle btn-danger" onClick={()=>deletetodo(todo._id)}><span>X</span></Button>
                         </td>
                        
                     

                    </tr>
                        
                )):<Container>NO Data Found</Container>}  
                </tbody>
               
              </Table>
                  
               
              </Container>
                
          
            </Container>
        </Container>

        </Container>
       
     
     
        </>
      
    )

}