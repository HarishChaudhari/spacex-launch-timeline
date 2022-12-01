"use client"
import styles from './page.module.css'
import { useEffect, useState } from 'react';

var timerInterval: any;
var rotationInterval: any;

export default function Home() {
    const [timeValue, setTimeValue] = useState('0.5');
    const [timerClock, setTimerClock] = useState('T - 00:00:00');
    const [is_started, setIsStarted] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0.1);

    function startLaunch(){
        if( is_started === true ) {
            setIsStarted(false);
            clearInterval(timerInterval);
            clearInterval(rotationInterval);
        } else {
            setIsStarted(true);
            setTimer(timeValue, 'dec');
            
        }
    }
    function setAngle(e : any) {
        setRotationAngle(e.target.value);
    }

    function updateTimer(e : any) {
        clearInterval(timerInterval);
        clearInterval(rotationInterval);
        
        return setTimeValue(e.target.value);
    }

    function setTimer ( input : any, mode : string ) {
        clearInterval(timerInterval);
        let duration = input * 60;
        let timer = duration, hours, minutes, seconds;
        
        timerInterval = setInterval(function () {
            hours = Math.floor(timer / 3600);
            minutes = Math.floor(timer % 3600 / 60);
            seconds = Math.floor(timer % 3600 % 60);
            
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            let prefix = (mode === 'dec') ? "T - " : "T + ";
            setTimerClock( prefix + hours + ":" + minutes + ":" + seconds);
            
            timer = (mode === 'dec') ? --timer : ++timer;
            
            if (timer < 0) {
                // clear interval as we don't want to repeat the countdown.
                clearInterval(timerInterval);
                startRotation();
                setTimer(0, 'inc');
            }
            
        }, 1000);
    };
    
    function elementsOverlap(el1 : any, el2 : any) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();
        const min = -5; // offset

        return !(domRect1.left - min > domRect2.right);
    }
    function elementOutside(el1 : any, el2 : any) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();
        const min = -5; // offset
        return (domRect1.top - min > domRect2.bottom + 200);
    }
    
    function startRotation() {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(function () {
            //rotate the circle
            var angle = parseFloat( jQuery('#page_circle_wrapper__RmoWD').attr('data-angle') as string );
            angle = angle - rotationAngle;

            jQuery('#page_circle_wrapper__RmoWD').css('transform', 'rotate('+ angle +'deg)');
            jQuery('#page_circle_wrapper__RmoWD').attr('data-angle', angle);

            jQuery('#nodes li').each(function () {
                
                if (elementsOverlap(jQuery(this).find('div')[0], jQuery('#page_marker__Y9t1D')[0]) === true ) {
                    jQuery(this).addClass('page_done__0RB5C');
                }
                // check if element goes outside div remove done class
                if (elementOutside(jQuery(this).find('div')[0], jQuery('.page_timeline_wrapper__ybJhT')[0]) === true) {
                    jQuery(this).removeClass('page_done__0RB5C');
                } 
            });
        }, 100);
    }

    useEffect(() => {

        // You now have access to `window`

    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <a className={styles.card}>
                        <h2>Start/Stop</h2>
                        <p>
                            <button className={styles.button} onClick={startLaunch}>
                                {is_started === false ? "Start" : "Stop"}   
                            </button>
                        </p>
                    </a>

                    <a className={styles.card}>
                        <h2>Time to Lanuch &rarr;</h2>
                        <p>
                            <input className={styles.input_text}
                                value={timeValue}
                                onChange={updateTimer}
                            />
                            In Minutes.</p>
                    </a>

                    <a className={styles.card}>
                        <h2>Rotation Angle &rarr;</h2>
                        <p>
                            <input className={styles.input_text}
                                value={rotationAngle}
                                onChange={setAngle}
                            />
                            In degrees.
                        </p>
                    </a>

                    <a className={styles.card}>
                        <h2>Altitude Interval &rarr;</h2>
                        <p>Rate for Altitude calculation /sec.</p>
                    </a>
                </div>

                <div className={styles.timeline_wrapper}>
                    <div id={styles.marker}></div>
                    <div id={styles.circle_wrapper} data-angle="0">
                        <div id={styles.circle}></div>
                        <ul id="nodes" className={styles.nodes}>
                            <li data-current-x="0" data-current-y="0"><div className={styles.node_circle}></div><span>Startup</span></li>
                            <li data-current-x="40" data-current-y="6"><div className={styles.node_circle}></div><span>Liftoff</span></li>
                            <li data-current-x="77" data-current-y="22"><div className={styles.node_circle}></div><span>Max Q</span></li>
                            <li data-current-x="125" data-current-y="57"><div className={styles.node_circle}></div><span>MECO</span></li>                   
                            <li data-current-x="165" data-current-y="114"><div className={styles.node_circle}></div><span>S1 Detach</span></li>
                            <li data-current-x="172" data-current-y="198"><div className={styles.node_circle}></div><span>S2 Startup</span></li>
                            <li data-current-x="150" data-current-y="261"><div className={styles.node_circle}></div><span>SECO</span></li>
                            <li data-current-x="180" data-current-y="412"><div className={styles.node_circle}></div><span>Deploy</span></li>
                        </ul>
                    </div>

                    <div className={styles.timer_clock}>{timerClock}</div>
                </div>
                <div>
                    <p className={styles.fun}>Made just for fun!</p>
                    <p className={styles.fun_desc}>I could have made it a lot better, but I think this is good enough to play with. :) 
                        <br />Besides, I was just experimenting with <a href="https://nextjs.org/blog/next-13" target="_blank" rel="noreferrer">Next.js 13</a> and wanted a cool idea with smaller interactions.
                        <br/>This is desktop only, did not have enough time to make it work on different screens.
                        If an algorithm is devised for plotting the nodes based on the actual mission time, then a whole lot of other features such as zoom in/out the timeline, add more interations.
                    </p>
                </div>
            </main>
        </div>
    )
}