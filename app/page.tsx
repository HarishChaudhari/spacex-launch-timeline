"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react';

export default function Home() {
    
    useEffect(() => {
        // You now have access to `window`
        console.log('aaa');
        
        
        setInterval(function () {
            console.log('sec');
            var angle = parseFloat( jQuery('#page_circle_wrapper__RmoWD').attr('data-angle') );
            angle = angle - 0.03;
            console.log(angle);
            jQuery('#page_circle_wrapper__RmoWD').css('transform', 'rotate('+ angle +'deg)');
            jQuery('#page_circle_wrapper__RmoWD').attr('data-angle', angle);

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
                    <a href="#" className={styles.card}>
                        <h2>Add Event Node &rarr;</h2>
                        <p>Add event node in timeline</p>
                    </a>

                    <a href="#" className={styles.card}>
                        <h2>Set Lanuch Time &rarr;</h2>
                        <p>For T- and T+ will be calculation.</p>
                    </a>

                    <a href="#" className={styles.card}>
                        <h2>Timeline Zoom &rarr;</h2>
                        <p>Zoom in or Zoom Out the timeline.</p>
                    </a>

                    <a href="#" className={styles.card}>
                        <h2>Altitude Interval &rarr;</h2>
                        <p>Rate for Altitude calculation /sec.</p>
                    </a>
                </div>

                <div className={styles.timeline_wrapper}>
                    <div id={styles.circle_wrapper} data-angle="0">
                        <div id={styles.circle}></div>
                        <ul id="nodes" className={styles.nodes}>
                            <li data-current-x="0" data-current-y="0">Startup</li>
                            <li data-current-x="40" data-current-y="6">Liftoff</li>
                            <li data-current-x="77" data-current-y="22">Max Q</li>
                            <li data-current-x="125" data-current-y="57">MECO</li>                   
                            <li data-current-x="165" data-current-y="114">Stage 1 Detach</li>
                            <li data-current-x="172" data-current-y="198">Stage 2 Startup</li>
                            <li data-current-x="150" data-current-y="261">SECO</li>
                            <li data-current-x="180" data-current-y="412">Deploy</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}