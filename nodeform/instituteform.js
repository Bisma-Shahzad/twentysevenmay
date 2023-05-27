import { Container } from "react-bootstrap";
import BSInput from "../../component/BSInput";
import { useEffect, useState } from "react";
import BSButton from "../../component/BSButton";
import axios from "axios";
import { Del, Get, Post, Put } from "../../config/baseMethod";

export default function InstituteForm() {
    const [model, setModel] = useState({})


    // let show = () => {
    //     Post('/student').then
    // }

    let postdata = () => {
        Post('/institute',
            {
                name: model.name,
                shortName: model.shortName,
                address: model.address,
                tel: model.tel,
            }).then((res) => {
                console.log(res);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let putdata = () => {
        Put('/institute', '6472250c3dec7f54601b2f5e',
            {
                name: model.name,
                shortName: model.shortName,
                address: model.address,
                tel: model.tel,
            }).then((res) => {
                console.log(res.data);
                setModel({ ...res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    let deletedata = () => {
        Del('/institute', '6472250c3dec7f54601b2f5e').then((res) => {
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
        Get('/institute').then((res) => {
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
            <BSInput label="address" onChange={(e) => setModel({ ...model, address: e.target.value })} />
            <BSInput label="tel" onChange={(e) => setModel({ ...model, tel: e.target.value })} />

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