import React, { useEffect, useState, useRef } from "react";
import Axios from "axios"

const Home = () => {

    useEffect(() => {
        document.title = "Home Page";
    }, []);

    const [firstInput, setfirstInput] = useState("")
    const [secondInput, setSecondInput] = useState("")

    const [user, setUser] = useState('STUDENT NAME')
    const [pass, setPass] = useState('STUDENT CODE')

    const [placename, setPlaceName] = useState('NAME')
    const [placepass, setPlacePass] = useState('CODE')

    const setStu = () => {
        setUser('STUDENT NAME');
        setPass('STUDENT CODE');
        setPlaceName('NAME');
        setPlacePass('CODE');
    }

    const setTeach = () => {
        setUser('TEACHER USERNAME');
        setPass('PASSWORD');
        setPlaceName('USERNAME');
        setPlacePass('PASSWORD');
    }

    const userRef = useRef(null);
    const codeRef = useRef(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (user === "TEACHER USERNAME") {
            await Axios.get("http://localhost:5000/api/teachers")
                .then(response => {
                    const teachers = response.data.map(res => [res.username, res.password])
                    const teacher_object = teachers.find(teacher => teacher[0] === firstInput && teacher[1] === secondInput)
                    typeof teacher_object !== "undefined" ? alert("Teacher exists") : alert("Teacher does not exist")
                })
                .catch(err => console.log(err))
        }
    }

    return (

        <div id="flex-container" className="flex flex-col h-screen bg-cyan-600 font-proxima-nova" >
            <div id="header" className="mx-5 mt-2 flex justify-between">
                <h1 id="container-title" className="font-sans text-5xl  text-white font-bold">PET.GAME</h1>
                <div className="bg-white mt-1 w-10 h-10 flex items-center justify-center rounded-3xl">EN</div>
            </div>
            <h2 className="flex font-proxima-nova text-3xl h-1/4 justify-center items-center text-white font-bold">PREPARING FOR GREATNESS!</h2>
            <main className=" w-full h-full flex items-top justify-between">


                <div id="picture-placeholder" className=" w-1/4">

                </div>
                <div id="container-objects" className=" flex flex-col 
            gap-8 shadow-lg border-neutral-500 w-1/4 h-2/3 mt-10 bg-white rounded mr-10">


                    <div className="text-center mt-10" >
                        <h1 className="text-2xl font-extrabold">LOGIN</h1>

                        <span>as </span>
                        <div id="student-container" className="inline">
                            <button id="student-button" type="submit" onClick={setStu}>
                                <h2 className="font-semibold">student</h2>
                            </button>
                        </div>
                        <span> or </span>
                        <div id="teacher-container" className="inline">
                            <button id="teacher-button" type="submit" onClick={setTeach}>
                                <h2 className="font-semibold">teacher</h2>
                            </button>
                        </div>

                    </div>

                    <form id="input-containers" className="mx-5 mt-3" onSubmit={onSubmit}>
                        <p className="text-[.5rem] font-semibold">{user}</p>
                        <input ref={userRef} type="text" onChange={e => setfirstInput(e.target.value)} placeholder={placename} className="border-2 rounded text-center w-full" />

                        <p className="text-[.5rem] font-semibold mt-5">{pass}</p>
                        <input ref={codeRef} type="text" onChange={e => setSecondInput(e.target.value)} placeholder={placepass} className="border-2 rounded text-center w-full" />

                        <input type="submit" value="Log In" className="block mt-10 bg-neutral-700 text-white w-full h-10 font-semibold hover:bg-neutral-600 cursor-pointer" />
                    </form>
                </div>
            </main>
        </div>

    );
}


export default Home;