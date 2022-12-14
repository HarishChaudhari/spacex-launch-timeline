"use client"
import styles from './page.module.css'
import { useEffect, useState, MouseEvent } from 'react';
import { exit } from 'process';
import { time, timeStamp } from 'console';
var jQuery = require("jquery");
var timerInterval: any;
var rotationInterval: any;

var t_arr: any = [], n_arr: any = [];

// get from localStorage if existing otherwise set default values above from useState
if (localStorage.getItem('timestamps') !== null) {
    console.log(localStorage.getItem('timestamps'));
    //@ts-ignore
    let t_json = JSON.parse(localStorage.getItem('timestamps'));
    t_arr = [];
    for (var i in t_json) {
        t_arr.push(t_json[i]);
    }
} else {
    t_arr.push(0);
}
if (localStorage.getItem('nodenames') !== null) {
    //@ts-ignore
    let n_json = JSON.parse(localStorage.getItem('nodenames'));
    n_arr = [];
    for (var i in n_json) {
        n_arr.push(n_json[i]);
    }
} else {
    n_arr.push('Node 1');
}

export default function Home() {
    
    const [timestamps, setTimestamps] = useState(t_arr);
    const [nodeNames, setNodeNames] = useState(n_arr);
    
    
    const [missionTime, setMissionTime] = useState('8:37');
    const [timeValue, setTimeValue] = useState('0.1');
    const [timerClock, setTimerClock] = useState('T - 00:00:00');
    const [is_started, setIsStarted] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0.1);

    const convertTimeToFloat = (d: any) => {

        if (d !== 0 && d !== '0') {
            // Use the split() function to split the string into an array of minutes and seconds
            let parts = d.split(':');

            // Use the parseInt() function to convert the minutes and seconds to integers
            let minutes = parseInt(parts[0]);
            let seconds = parseInt(parts[1]);

            // Calculate the duration in minutes as a floating point number
            let duration = parseFloat((minutes + (seconds / 60)).toString()).toFixed(2);

            return parseFloat(duration);
        } else {
            return parseFloat(d);
        }
    }

    const [newTimestamps, setNewTimestamps] = useState(timestamps.map( (t: any) => { return convertTimeToFloat(t) } ) );
    const [newMissionTime, setNewMissionTime] = useState(convertTimeToFloat(missionTime));

    function addNode(e : any){
        let t = [...timestamps];
        t.push(0);
        setTimestamps(t);
    }
    function deleteNode(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let keyToDelete = e.currentTarget.getAttribute('data-key');
        let t = [...timestamps];
        //@ts-ignore
        delete t[keyToDelete];
        setTimestamps(t);
    }

    function saveNode(e : any){
        let t = [...timestamps];
        let keyToUpdate = e.currentTarget.getAttribute('data-key');
        t[keyToUpdate] = e.target.value;
        //@ts-ignore
        localStorage.setItem('timestamps', JSON.stringify(t));
        
        return setTimestamps(t);
    }

    function saveNodeText(e: any) {
        let n = [...nodeNames];
        let keyToUpdate = e.currentTarget.getAttribute('data-key');
        n[keyToUpdate] = e.target.value;
        //@ts-ignore
        localStorage.setItem('nodenames', JSON.stringify(n));

        return setNodeNames(n);
    }
    

    function addTimestamps(t: any) {
        // t.array.forEach((element: any) => {
        //     timestamps.push(element);
        // });
        // setTimestamps(timestamps);
    }

    function startLaunch() {
        // var T = 3.1;
        // var D = parseFloat(timestamps[timestamps.length - 1]);
        // var N = timestamps.length;
        // var svgAngleofRotation = (2 * Math.PI * T) / (D / N);
        // console.log(T,D,N, svgAngleofRotation);
        // setRotationAngle(svgAngleofRotation);

        if (is_started === true) {
            setIsStarted(false);
            clearInterval(timerInterval);
            clearInterval(rotationInterval);
        } else {
            setIsStarted(true);
            setTimer(timeValue, 'dec');

        }
    }
    function setAngle(e: any) {
        setRotationAngle(e.target.value);
    }

    function updateMissionTime(e: any) {
        return setMissionTime(e.target.value);
    }

    function updateTimer(e: any) {
        clearInterval(timerInterval);
        clearInterval(rotationInterval);

        return setTimeValue(e.target.value);
    }

    function setTimer(input: any, mode: string) {
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
            setTimerClock(prefix + hours + ":" + minutes + ":" + seconds);

            timer = (mode === 'dec') ? --timer : ++timer;

            if (timer < 0) {
                // clear interval as we don't want to repeat the countdown.
                clearInterval(timerInterval);

                // generated by chatgpt3
                // let timestamps = [0.1, 7, 25, 40, 60, 65, 70, 85, 92, 95, 99];
                // plotNodesOnCircle(11, 100, 576, timestamps, 1152, 1152);

                startRotation();
                setTimer(0, 'inc');
            }

        }, 1000, timestamps);
    };

    function elementsOverlap(el1: any, el2: any) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();
        const min = -5; // offset

        return !(domRect1.left - min > domRect2.right);
    }
    function elementOutside(el1: any, el2: any) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();
        const min = -5; // offset
        return (domRect1.top - min > domRect2.bottom + 200);
    }

    function startRotation() {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(function () {
            //rotate the circle
            // var angle = parseFloat(jQuery('#page_circle_wrapper__RmoWD').attr('data-angle') as string);
            // angle = angle - rotationAngle;

            // jQuery('#page_circle_wrapper__RmoWD').css('transform', 'rotate(' + angle + 'deg)');
            // jQuery('#page_circle_wrapper__RmoWD').attr('data-angle', angle);

            // jQuery('#nodes li').each(function () {

            //     if (elementsOverlap(jQuery(this).find('div')[0], $('#page_marker__Y9t1D')[0]) === true) {
            //         jQuery(this).addClass('page_done__0RB5C');
            //     }
            //     // check if element goes outside div remove done class
            //     if (elementOutside($(this).find('div')[0], jQuery('.page_timeline_wrapper__ybJhT')[0]) === true) {
            //         jQuery(this).removeClass('page_done__0RB5C');
            //     }
            // });

            /* ------ */
            // var angle = parseFloat(jQuery('#page_svg_wrapper__5lhot').attr('data-angle') as string);
            // angle = angle - rotationAngle;

            // jQuery('#page_svg_wrapper__5lhot').css('transform', 'rotate(' + angle + 'deg)');
            // jQuery('#page_svg_wrapper__5lhot').attr('data-angle', angle);

            // jQuery('#nodes li').each(function () {

            //     if (elementsOverlap(jQuery(this).find('div')[0], $('#page_marker__Y9t1D')[0]) === true) {
            //         jQuery(this).addClass('page_done__0RB5C');
            //     }
            //     // check if element goes outside div remove done class
            //     if (elementOutside($(this).find('div')[0], jQuery('.page_timeline_wrapper__ybJhT')[0]) === true) {
            //         jQuery(this).removeClass('page_done__0RB5C');
            //     }
            // });
            /* ------- */

            // new .343
            let c = 2 * Math.PI * 576;
            console.log(c);
            //c = (c / 2) / 1000000;
            console.log(c);
            var m = parseInt(missionTime.split(':')[0]);
            var s = parseInt(missionTime.split(':')[1]);
            // var minutes = m;
            let seconds = (m * 60) + s;
            console.log(seconds);
            console.log(seconds*1000);
            var b = (c / 1.5764) / (seconds * 1000) * (Math.PI/(timestamps.length-2));
            var ca = parseFloat( b.toString() ).toFixed(4); //1000000;
            console.log(ca);
            /**
             * circumference / 10000 => css -degree value
             */

            plotNodesOnCircle(newTimestamps.length, newMissionTime, 576, newTimestamps, 1200, 1200);

            newTimestamps.forEach(function (v: any, k: any) {
                newTimestamps[k] = v - 0.001;
                // timestamps[k] = v - rotationAngle;
                // newTimestamps[k] = v - parseFloat(ca);
            });
        }, 75);
    }

    function plotNodesOnCircle(n: any, d: any, r: any, timestamps: any, width: any, height: any) {
        console.log(n, d, r, timestamps, width, height);
        // Get a reference to the <svg> element.
        let svg = document.getElementById('page_mySvg__NvADY');
        //@ts-ignore
        svg.innerHTML = "";
        if (svg !== null) {
            // Calculate the coordinates of the center of the circle.
            let centerX = (width / 2);
            let centerY = (height / 2);

            // Create an SVG circle element with radius r at the center of the canvas.
            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', centerX.toString());
            circle.setAttribute('cy', centerY.toString());
            circle.setAttribute('r', r.toString());
            circle.setAttribute('stroke', '#ffffff');
            svg.appendChild(circle);
            

            // Create a small white line on top of the circle for marker
            let marker = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            marker.setAttribute('stroke', '#ffffff');
            marker.setAttribute('stroke-width', '1');
            marker.setAttribute('x1', (centerX).toString());
            marker.setAttribute('y1', ((centerY + r) + 3).toString());
            marker.setAttribute('x2', (centerX).toString());
            marker.setAttribute('y2', ((centerY + r) - 3).toString());
            svg.appendChild(marker);

            // For each node i in the range 1 to n, do the following:
            for (let i = 1; i <= n; i++) {
                // Get the timestamp of the node i from the array of timestamps.
                let t_i = timestamps[i - 1];

                // Generate a random color for the node.
                //let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                let color = '#ffffff';

                // Calculate the angle of the point on the circle that corresponds to the timestamp t_i.
                let angle_i = 2 * Math.PI * t_i / d + Math.PI / 2;

                // Calculate the coordinates of the point on the circle that corresponds to the angle angle_i.
                let x_i = r * Math.cos(angle_i);
                let y_i = r * Math.sin(angle_i);

                // Create an SVG circle element for the node at the coordinates (x_i, y_i) with the generated color.
                let node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                node.setAttribute('cx', (centerX + x_i).toString());
                node.setAttribute('cy', (centerY + y_i).toString());
                node.setAttribute('r', '5');
                node.setAttribute('stroke', color);
                node.setAttribute('stroke-width', '1');
                node.setAttribute('fill', '#000000');
                svg.appendChild(node);

                if ( (centerX + x_i) >= (centerX) && (centerY + y_i) <= (centerY + r) ) {
                    // Create a small white circle for the node name.
                    let nameCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    nameCircle.setAttribute('cx', (centerX + x_i).toString());
                    nameCircle.setAttribute('cy', (centerY + y_i).toString());
                    nameCircle.setAttribute('r', '2');
                    nameCircle.setAttribute('fill', '#ffffff');
                    
                    svg.appendChild(nameCircle);
                }

                // Create an SVG text element for the node name.
                let name = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                
                if ((n % 2 !== 0) && (i === n)) {
                    name.setAttribute('x', (centerX + x_i).toString());
                    name.setAttribute('y', (centerY + y_i - 15).toString());
                } else if (i % 2 === 0) {
                    name.setAttribute('x', (centerX + x_i).toString());
                    name.setAttribute('y', (centerY + y_i - 15).toString());
                } else {
                    name.setAttribute('x', (centerX + x_i).toString());
                    name.setAttribute('y', (centerY + y_i + 25).toString());
                }
                name.setAttribute('transform', `rotate(${(angle_i + Math.PI / 2) * 180 / Math.PI}, ${centerX + x_i}, ${centerY + y_i})`);
                name.setAttribute('fill', color);
                name.setAttribute('font-size', '10');
                name.setAttribute('text-anchor', 'middle');
                //name.innerHTML = `Node ${i}`;
                name.innerHTML = `${nodeNames[i-1]}`;
                svg.appendChild(name);

                // Create a small white line on top of the node name.
                let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                
                if ((n % 2 !== 0) && (i === n)) {
                    line.setAttribute('x1', (centerX + x_i).toString());
                    line.setAttribute('y1', (centerY + y_i - 5).toString());

                    line.setAttribute('x2', (centerX + x_i).toString());
                    line.setAttribute('y2', (centerY + y_i - 10).toString());
                } else if (i % 2 === 0) {
                    line.setAttribute('x1', (centerX + x_i).toString());
                    line.setAttribute('y1', (centerY + y_i - 5).toString());

                    line.setAttribute('x2', (centerX + x_i).toString());
                    line.setAttribute('y2', (centerY + y_i - 10).toString());
                } else {
                    line.setAttribute('x1', (centerX + x_i).toString());
                    line.setAttribute('y1', (centerY + y_i + 5).toString());

                    line.setAttribute('x2', (centerX + x_i).toString());
                    line.setAttribute('y2', (centerY + y_i + 10).toString());
                }
                line.setAttribute('transform', `rotate(${(angle_i + Math.PI / 2) * 180 / Math.PI}, ${centerX + x_i}, ${centerY + y_i})`);
                line.setAttribute('stroke', '#ffffff');
                line.setAttribute('stroke-width', '1');
                svg.appendChild(line);
            }
        }
    }

    const updateNewTimes = () => {

        let new_timestamps = [0];
        for (var i = 0; i < timestamps.length; i++) {
            new_timestamps[i] = convertTimeToFloat(timestamps[i]);
        }
        console.log(timestamps);
        console.log(new_timestamps);
        setNewTimestamps(new_timestamps);
    }
    const updateNewMissionTime = () => {
        setNewMissionTime(convertTimeToFloat(missionTime));
    }

    useEffect(() => {
        updateNewTimes();
    }, [timestamps, nodeNames])

    useEffect(() => {
        updateNewMissionTime();
    }, [missionTime])
    
    useEffect(() => {

        // You now have access to `window`
        // let timestamps = [0.1, 7, 25, 40, 60, 65, 70, 85, 92, 95, 99];
        let angle = 0;
        //console.log(nodeNames);

        plotNodesOnCircle(newTimestamps.length, newMissionTime, 576, newTimestamps, 1200, 1200);
        
    }, [newTimestamps, nodeNames, newMissionTime]);

    return (
        <>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <h2>Add Events (In Minutes) &rarr;</h2>
                    {/* onClick={saveNodes} */}
                    {/* <button className={styles.button}>
                        Save Events
                    </button> */}
                    
                    <div className={styles.node_list}>
                        {timestamps.map((x: any, i: any) =>
                            <p className={[styles.node, i].join(' ')} key={i}>
                                <input className={styles.input_text} value={x} onChange={saveNode} data-key={i} />
                                <input className={styles.input_text} value={nodeNames[i]} onChange={saveNodeText} data-key={i} />
                                <button className={[styles.button, styles.add].join(' ')}
                                    onClick={addNode}>+</button>
                                <button className={[styles.button, styles.delete].join(' ')}
                                    onClick={deleteNode}
                                    data-key={i}
                                    >-</button>
                            </p>
                        )}                        
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>Start/Stop</h2>
                    <p>
                        <button className={styles.button} onClick={startLaunch}>
                            {is_started === false ? "Start" : "Stop"}
                        </button>
                        <small>{is_started === false ? "Start" : "Stop"} Countdown</small>
                    </p>
                    <div className={styles.sep}></div>
                    <h2>Total Mission Time &rarr;</h2>
                    <p>
                        <input className={styles.input_text}
                            value={missionTime}
                            onChange={updateMissionTime}
                        />
                        <small>In Minutes</small>
                    </p>
                </div>

                <div className={styles.card}>
                    <h2>Time to Lanuch &rarr;</h2>
                    <p>
                        <input className={styles.input_text}
                            value={timeValue}
                            onChange={updateTimer}
                        />
                        <small>In Minutes</small>
                    </p>
                    <div className={styles.sep}></div>
                    <h2>Rotation Angle &rarr;</h2>
                    <p>
                        <input className={styles.input_text}
                            value={rotationAngle}
                            onChange={setAngle}
                        />
                        <small>In Degrees</small>
                    </p>
                </div>
            </div>
            <div className={styles.container}>
                <main className={styles.main}>
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
                    <div className={styles.canvas_wrapper}>
                        <div id={styles.svg_wrapper} data-angle="0">
                            <svg id={styles.mySvg} width="1200" height="1200"></svg>
                        </div>
                    </div>
                    <div>
                        <p className={styles.fun}>Made just for fun!</p>
                        <p className={styles.fun_desc}>I could have made it a lot better, but I think this is good enough to play with. :)
                            <br />Besides, I was just experimenting with <a href="https://nextjs.org/blog/next-13" target="_blank" rel="noreferrer">Next.js 13</a> and wanted a cool idea with smaller interactions.
                            <br />This is desktop only, did not have enough time to make it work on different screens.
                            If an algorithm is devised for plotting the nodes based on the actual mission time, then a whole lot of other features such as zoom in/out the timeline and few more interations can be added.
                        </p>
                    </div>
                </main>
            </div>
        </>
    )
}