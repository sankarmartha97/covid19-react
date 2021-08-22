import React,{Fragment,useState, useEffect} from 'react'
import $ from 'jquery'


export default function MiniNavComponent() {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [size, setSize] = useState('');
    const [defaultSize, setDefaultSize] = useState('');

    const getSize = () =>{
        var size = $( "a" ).css( "font-size" );
        size = parseInt(size, 10);
        setSize(size);
        setDefaultSize(size);
      }
       
    const  increaseFontSize = () =>{
        // console.log(size);
        if ((size + 2) <= 20) {
            $( "a" ).css( "font-size", "+=2" );
            setSize(size + 2)
          }
    }
    const resetSize = () =>{
        $( "a" ).css( "font-size", defaultSize );
        setSize(defaultSize);
    }

    const  decreaseFontSize = () =>{
        // console.log(size);
        if ((size - 2) >= 10) {
            $( "a" ).css( "font-size", "-=2" );
            setSize(size - 2)
          }
    }

    const getCurrentDate = () => {
        // get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        today = mm + "/" + dd + "/" + yyyy;
        setCurrentDate(today);

        // get current time
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        const time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        setCurrentTime(time)
    
      
    };
    useEffect(() =>{
        getCurrentDate();
        getSize();

    },[]);

    return (
        <Fragment>
            <div className="mini-navbar-wrapper">
                <div className="row inside-wrapper">
                    <div className="col-md-6 mini-nav-left">
                        <div className="date">{currentDate}</div>
                        <div className="time">{currentTime}</div>
                        <div className="skip-content">Skip to Content</div>
                        <div className="screen-reader-access">Screen Reader Access</div>
                    </div>
                    <div className="col-md-6 mini-nav-right">
                        <div className="color-options">
                            <div className="black-box"></div>
                            <div className="box"></div>
                        </div>
                        <div className="font-options">
                            <div className="font-box" onClick={()=> increaseFontSize()}>A+</div>
                            <div className="font-box" onClick={()=> resetSize()}>A</div>
                            <div className="font-box" onClick={()=> decreaseFontSize()}>A-</div>
                        </div>
                        <div className="site-map">
                        <i className="fas fa-sitemap"></i>
                        <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}



