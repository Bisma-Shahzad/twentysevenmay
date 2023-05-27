import { Container } from "react-bootstrap";
import BSInput from "../../component/BSInput";
import { useEffect, useState } from "react";
import BSButton from "../../component/BSButton";
import axios from "axios";
import { Del, Get, Post, Put } from "../../config/baseMethod";

export default function TeacherForm() {
    const [model, setModel] = useState({})


    // let show = () => {
    //     Post('/student').then
    // }

    let postdata = () => {
        Post('/teacher',
            {
                name: model.name,
                contact: model.contact,
                course: model.course,
            }).then((res) => {
                console.log(res);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let putdata = () => {
        Put('/teacher', '64722ac4b31be2e88af587f8',
            {
                name: model.name,
                contact: model.contact,
                course: model.course,
            }).then((res) => {
                console.log(res.data);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let deletedata = () => {
        Del('/teacher', '64722ac4b31be2e88af587f8').then((res) => {
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
        Get('/teacher').then((res) => {
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
            <BSInput label="Name" onChange={(e) => setModel({ ...model, name: e.target.value })} />
            <BSInput label="Contact" onChange={(e) => setModel({ ...model, contact: e.target.value })} />
            <BSInput label="Course" onChange={(e) => setModel({ ...model, course: e.target.value })} />

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