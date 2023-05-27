import { Container } from "react-bootstrap";
import BSInput from "../../component/BSInput";
import { useEffect, useState } from "react";
import BSButton from "../../component/BSButton";
import axios from "axios";
import { Del, Get, Post, Put } from "../../config/baseMethod";

export default function CourserForm() {
    const [model, setModel] = useState({})


    // let show = () => {
    //     Post('/student').then
    // }

    let postdata = () => {
        Post('/course',
            {
                name: model.name,
                shortName: model.shortName,
                duration: model.duration,
                fees: model.fees,
            }).then((res) => {
                console.log(res);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let putdata = () => {
        Put('/course', '64722c25b31be2e88af58811',
        {
            name: model.name,
            shortName: model.shortName,
            duration: model.duration,
            fees: model.fees,
        }).then((res) => {
                console.log(res.data);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let deletedata = () => {
        Del('/course', '64722c25b31be2e88af58811').then((res) => {
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
        Get('/course').then((res) => {
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
            <BSInput label="Short Name" onChange={(e) => setModel({ ...model, shortName: e.target.value })} />
            <BSInput label="Duration" onChange={(e) => setModel({ ...model, duration: e.target.value })} />
            <BSInput label="fees" onChange={(e) => setModel({ ...model, fees: e.target.value })} />

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