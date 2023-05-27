import { Container } from "react-bootstrap";
import BSInput from "../../component/BSInput";
import { useEffect, useState } from "react";
import BSButton from "../../component/BSButton";
import axios from "axios";
import { Del, Get, Post, Put } from "../../config/baseMethod";

export default function Form() {
    const [model, setModel] = useState({})


    // let show = () => {
    //     Post('/student').then
    // }

    let postdata = () => {
        Post('/student',
            {
                firstName: model.firstName,
                lastName: model.lastName,
                course: model.course,
                contact: model.contact,
            }).then((res) => {
                console.log(res);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let putdata = () => {
        Put('/student', '64720dfa999b82941c01425a',
            {
                firstName: model.firstName,
                lastName: model.lastName,
                course: model.course,
                contact: model.contact,
            }).then((res) => {
                console.log(res.data);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let deletedata = () => {
        Del('/student', '64720dde999b82941c014256').then((res) => {
            console.log(res.data);
            setModel({ ...res.data });
        })
            .catch((err) => {
                console.log(err);
            });
    };

    // const getHandler = () => {
    //     axios("http://localhost:5000/api/student").then(res => {
    //         console.log(res.data)
    //     }).catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     getHandler();
    // }, [])

    let getdata = () => {
        Get('/student').then((res) => {
            console.log(res.data.data);
            console.log(res)
            setModel({ ...res.data.data });
        })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getdata();
    }, [])


    return <>
        <Container>
            <h1>Form</h1>
            <div>

            </div>
            <BSInput label="First Name" onChange={(e) => setModel({ ...model, firstName: e.target.value })} />
            <BSInput label="Last Name" onChange={(e) => setModel({ ...model, lastName: e.target.value })} />
            <BSInput label="contact" onChange={(e) => setModel({ ...model, contact: e.target.value })} />
            <BSInput label="course" onChange={(e) => setModel({ ...model, course: e.target.value })} />

        </Container>

        <BSButton title="Submit" variant="outlined" size="small"
            onClick={postdata}
        />
        <BSButton title="Edit" variant="outlined" size="small"
            onClick={putdata}
        />
        <BSButton title="Delete" variant="outlined" size="small"
            onClick={deletedata}
        />
    </>
}