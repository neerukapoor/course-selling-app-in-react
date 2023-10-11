import React, { useEffect } from "react";
import { Button, Card, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "token": "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=>{
            return res.json();
        }).then((data) => {
            console.log(data);
            setCourses(data.allCourses);
        })
    }, [])

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div style={{display:"flex", alignItems:"center", flexWrap: "wrap", justifyContent:"center", height:"87vh"}}>
        {/* <Card style={{ padding:"40px", width:"300px", height:"400px"}}> */}
            {courses.map(c => <Course _id={c._id} imageLink={c.imageLink} title={c.title} description={c.description} published={c.published}/>)}
            {/* {courses.map(course => <Course course={course}/>)} */}
        {/* </Card> */}
    </div>
}

function Course(course) {
    const navigate = useNavigate();
    return <div>
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20
        }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
        {console.log("skdhf " + course._id)}
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>
        </Card>
    </div>
}

export default ShowCourses;