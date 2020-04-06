import React from 'react';
import moment from 'moment';
import './countdown.css';
class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const distance = then - now;
            const countdown = moment(distance);
            console.log(distance);
            // if (distance === 0) {
            //     clearInterval(this.interval);
            //     //document.getElementById("demo").innerHTML = "EXPIRED";
            // }
            // if(distance <= 0){
            //     const days=0,hours=0, minutes=0, seconds =0;
            //     this.setState({ days, hours, minutes, seconds });
            // }      //console.log(countdown.format(timeFormat));
            //console.log("madarchod");
            //var duration = moment.duration(countdown, 'milliseconds');
            //var days2= duration.asDays();
            //console.log(days2);
            // var cd = 24 * 60 * 60 * 1000,
            //     ch = 60 * 60 * 1000,
            //     cm = 60 * 1000,
            //     d = Math.floor(difference / cd),
            //     h = Math.floor((difference - d * cd) / ch),
            //     m = Math.round((difference - d * cd - h * ch) / 60000),
            //     s = Math.round((difference - d * cd - h * ch - m * cm) / 1000);
            //     //pad = function (n) { return n < 10 ? '0' + n : n; };
            // if (s === 60) {
            //     m++;
            //     s = 0;
            // }
            // if (m === 60) {
            //     h++;
            //     m = 0;
            // }
            // if (h === 24) {
            //     d++;
            //     h = 0;
            // }
            //console.log([d, pad(h), pad(m), pad(s)].join(':'));
            //const days = countdown.format('D');
            // const hours = countdown.format('HH');
            // const minutes = countdown.format('mm');
            // const seconds = countdown.format('ss');
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // // Output the result in an element with id="demo"
            // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            //     + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text 
            

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }


    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;

        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (seconds<=0) {
            //return null;
            return null;

        }

        return (
            <div>
                <div className="countdown-wrapper">
                    {days && (
                        <div className="countdown-item">
                            <SVGCircle radius={daysRadius} />
                            {days}
                            <span>days</span>
                        </div>
                    )}
                    {hours && (
                        <div className="countdown-item">
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {minutes && (
                        <div className="countdown-item">
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds && (
                        <div className="countdown-item">
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            strokeWidth="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

export default Countdown;