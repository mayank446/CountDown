import { useRecoilState } from "recoil"
import { hoursAtom, minutesAtom, secondsAtom, controlsState, timerState, timeAtom, formAtom } from "../store/atoms/atoms"
import { useState, useEffect } from "react";

function Controls() {


    const [hour, setHour] = useRecoilState(hoursAtom);
    const [minutes, setMinutes] = useRecoilState(minutesAtom);
    const [seconds, setSeconds] = useRecoilState(secondsAtom);

    const [controls, setControls] = useRecoilState(controlsState);
    const [timer, setTimer] = useRecoilState(timerState);
    const [timeup, setTimeup] = useRecoilState(timeAtom)


    // function startTimer(){
    //     setControls(false);
    //     setTimer(true);
    // }
    function resetTimer() {
        setControls(true);
        setTimer(false);
    }
    function continueTimer() {
        setControls(false);
    }

    const [formData, setFormData] = useRecoilState(formAtom)

    
    const handleChange = (e: any) => {
        let {name, value} = e.target;
        if(name != "Hour"){
            value = Math.min(59, value)
            value = Math.max(0, value)
        }
        if(value == '')
            value = 0
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const updateTimer = (e: any) => {
        setSeconds(formData.Second)
        setMinutes(formData.Minute)
        setHour(formData.Hour)
        // startTimer
        setControls(false);
        setTimer(true);
    }

    useEffect(() =>{
        if(seconds || minutes || hour){
            setTimeup(false);
        }
    },[hour, minutes, seconds])

    

    if(controls && !timer)
        return (
            <div className="fixed block top-0 left-0 h-screen w-screen">
                <div className="flex flex-col bg-gray-800 w-3/5 h-3/5 min-h-96 justify-center items-center  rounded-[28px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-gray-200">
                    {/* <div> */}
                        <form onSubmit={updateTimer} className="flex flex-col h-28 w-56 rounded-lg justify-between">
                            <div className="flex h-12 w-56 rounded-lg justify-between">
                                <input name="Hour" className="bg-gray-200 w-16 h-12 rounded-lg p-4 text-center shadow-lg shadow-black" type="number" min="0" value={formData.Hour} onChange={handleChange}></input>
                                <input name="Minute" className="bg-gray-200 w-16 h-12 rounded-lg p-4 text-center shadow-lg shadow-black" type="number" min="0" max="59" value={formData.Minute} onChange={handleChange}></input>
                                <input name="Second" className="bg-gray-200 w-16 h-12 rounded-lg p-4 text-center shadow-lg shadow-black" type="number" min="0" max="59" value={formData.Second} onChange={handleChange}></input>
                            </div>
                            <button type="submit" className="btn bg-gray-200 h-12 w-56 rounded-xl mt-4 hover:bg-gray-500 text-center">START TIMER</button>
                        </form>
                        
                    {/* </div> */}
                    {/* <button className="btn bg-gray-200 h-12 w-56 rounded-xl m-4 hover:bg-gray-500 text-center" onClick={startTimer}>START TIMER</button> */}
                </div>
            </div>
        )
    else if(controls && timer)
        return (
            <div id="pause-controls-container" className=" hide fixed block top-0 left-0 h-screen w-screen">
                <div className="flex flex-col bg-gray-800 w-3/5 h-3/5 min-h-96 justify-center items-center rounded-[28px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-gray-200">
                    {/* <div className="flex h-12 w-56 rounded-lg justify-between"> */}
                        <button className="btn bg-gray-200 h-12 w-56 rounded-xl m-4 hover:bg-gray-500 text-center" onClick={resetTimer}>EDIT TIMER</button>
                        <button className="btn bg-gray-200 h-12 w-56 rounded-xl m-4 hover:bg-gray-500 text-center" onClick={continueTimer}>CONTINUE</button>
                    {/* </div> */}
                </div>
            </div>
        )
}



export default Controls;