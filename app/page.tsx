"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { time } from 'console';

var timerInterval: any;
var rotationInterval: any;

export default function Home() {
    const [timeValue, setTimeValue] = useState('0');
    const [timerClock, setTimerClock] = useState('T - 00:00:00');
    const [is_started, setIsStarted] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);

    function startLaunch(){
        if( is_started === true ) {
            setIsStarted(false);
            clearInterval(timerInterval);
            clearInterval(rotationInterval);
            console.log("a");
        } else {
            setIsStarted(true);
            setTimer(timeValue);
            startRotation();
        }
    }
    function setAngle(e) {
        setRotationAngle(e.target.value);
    }

    function updateTimer(e) {
        clearInterval(timerInterval);
        clearInterval(rotationInterval);
        
        return setTimeValue(e.target.value);
    }

    function setTimer ( input : any ) {
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
            
            setTimerClock("T - " + hours + ":" + minutes + ":" + seconds);

            if (--timer < 0) {
                // clear interval as we don't want to repeat the countdown
                clearInterval(timerInterval);
            }
        }, 1000);
    };
    
    function elementsOverlap(el1 : any, el2 : any) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();
        const min = -5; // offset

        // this is to find the exact overlap
        // return !(
        //     domRect1.top - min > domRect2.bottom ||
        //     domRect1.right - min < domRect2.left ||
        //     domRect1.bottom - min < domRect2.top ||
        //     domRect1.left - min > domRect2.right
        // );
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
            var angle = parseFloat( jQuery('#page_circle_wrapper__RmoWD').attr('data-angle') );
            angle = angle - rotationAngle;

            jQuery('#page_circle_wrapper__RmoWD').css('transform', 'rotate('+ angle +'deg)');
            jQuery('#page_circle_wrapper__RmoWD').attr('data-angle', angle);

            jQuery('#nodes li').each(function () {
                
                // var matrix = jQuery(this).css('transform').replace(/[^0-9\-.,]/g, '').split(',');
                // var x = matrix[12] || matrix[4];
                var elementTop = jQuery(this).offset().top;
                
                if (elementsOverlap(jQuery(this).find('div')[0], jQuery('#page_marker__Y9t1D')[0]) === true ) {
                    jQuery(this).addClass('page_done__0RB5C');
                }
                // check if element goes outside div remove done class
                if (elementOutside(jQuery(this).find('div')[0], jQuery('.page_timeline_wrapper__ybJhT')[0]) === true) {
                    jQuery(this).removeClass('page_done__0RB5C');
                }
                
            });


            /*
            jQuery('#nodes li').each(function () {
                // x is moving left so decreasing only
                var x = jQuery(this).data('current-x');
                var y = jQuery(this).data('current-y');

                // y has two sides, left and right of the center of circle
                // if node has crossed the center y needs to be incremented
                // if node has not crossed the center then y needs to be decremented
                // center is the current second of time


                if (x < 0) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                x = x - 1;

                jQuery(this).attr('data-current-x', x);
                jQuery(this).attr('data-current-y', y);

                jQuery(this).css({ 'transform': 'translate(' + x + 'px, ' + y + 'px)' });
            });
            */
        }, 100);
    }

    useEffect(() => {

        // You now have access to `window`

    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {/* <h1 className={styles.title}>
                <a href="https://nextjs.org">SpaceX Launch Timeline</a>
                </h1> */}

                {/* <p className={styles.description}>
                Get started by editing{' '}
                <code className={styles.code}>app/page.tsx</code>
                </p> */}

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
            </main>
        </div>
    )
}