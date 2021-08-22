import React, {Fragment} from 'react';
import  {useState, useEffect} from 'react';
import ScrollBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// visitor list componet
const VisitorList = props => {
    return(
        <div className="visitor_list">
            <span className="visitors_name">{props.visitor.name}</span>
            <span className="visitors_location">{props.visitor.coming_from_place}</span>
            <span className="visitors_phone">{props.visitor.phone_number}</span>
            <span className="visitors_entry_gate">{props.visitor.gate_name}</span>    
        </div>
    )
}



const TotalVisitors = () => {
    const [hasError, setErrors] = useState(false);
    const [visitor, setVisitor] = useState([]);

    async function fetchdata(){
        const res = await fetch(`${process.env.REACT_APP_URL}/visitors/visitor`);
        res.json()
        .then(res => setVisitor(res))
        .catch(err => setErrors(err));
    }

    useEffect(()=>{
        fetchdata();
    },[])

    return(
        <Fragment>
            <div className="visitors_title">
                <p>Citizen Screened</p>
                <span className="visitor_count_no">{visitor.length}</span>
            </div>
            <div className="total_visitors_body" >
                <ScrollBar>
                    {visitor.map((v,i)=>(
                        <VisitorList key= {i} visitor={v}/>
                    ))}

                </ScrollBar>
            </div>
        </Fragment>
    )
}

export default TotalVisitors