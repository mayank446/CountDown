import { useRecoilState } from "recoil"
import { hoursAtom, minutesAtom, secondsAtom, controlsState, timerState, timeAtom, formAtom } from "../store/atoms/atoms"
import { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";



function Timer() {
    const fullScreen = useFullScreenHandle();
    const handleFS= () => {
        fullScreen.enter
    }

    console.log("Timer Page Rendered!")
    const [hour, setHour] = useRecoilState(hoursAtom);
    const [minutes, setMinutes] = useRecoilState(minutesAtom);
    const [seconds, setSeconds] = useRecoilState(secondsAtom);

    const [controls, setControls] = useRecoilState(controlsState);
    const [timer, setTimer] = useRecoilState(timerState);

    const [timeup, setTimeup] = useRecoilState(timeAtom);
    const [formData, setFormData] = useRecoilState(formAtom)

    function pauseTimer() {
        setControls(true);
    }

    function timeUp() {
        setTimeup(true)
    }

    useEffect(() => {
        console.log("hi from useEffect!")
        if(!controls && timer)
        setTimeout(() => {
            if(seconds != 0)
                setSeconds(sec => sec-1)
            else{
                if(minutes != 0){
                    setSeconds(59)
                    setMinutes(min => min-1)
                }
                else {
                    if(hour!=0){
                        setMinutes(59)
                        setSeconds(59)
                        setHour(hr => hr-1)
                    }
                    else {
                        timeUp();
                    }
                }
            }
            
            setFormData({
                ...formData,
                ["Hour"]: hour,
                ["Minute"]: minutes,
                ["Second"]: seconds
            })
        },1000)

        // return clearInterval(x)
    }, [seconds, controls, timer])
    
    if(!timeup || controls){
        return (
            <FullScreen handle={fullScreen}>
            <div onDoubleClick={fullScreen.enter} className="bg-gray-800 fixed block top-0 left-0 h-screen w-screen">
                <div onClick={pauseTimer} className="bg-white flex w-96 h-96 justify-center items-center rounded-[50%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <p className="bg-white text-8xl font-semibold text-gray-800 Rubik Glitch Pop">{handleNum(minutes)} : {handleNum(seconds)}</p>
                </div>
            </div>
            </FullScreen>
        )
    }
    else {
        return (
            <div className="bg-white transition duration-700 ease-in fixed block top-0 left-0 h-screen w-screen">
                <div onClick={pauseTimer} className="bg-white flex w-96 h-96 justify-center items-center rounded-[50%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125  transition duration-700 ease-in animateb">
                    <p className="animate-wiggle bg-white text-8xl font-semibold text-gray-800 Rubik Glitch Pop">{handleNum(minutes)} : {handleNum(seconds)}</p>
                </div>
            </div>
        )
    }
}

function handleNum(x: any) {
    let n = x;
    if (n < 10) {
        n = "0" + n;
    }
    return n;
}
export default Timer;