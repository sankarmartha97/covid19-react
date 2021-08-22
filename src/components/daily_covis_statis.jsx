import React, { Fragment, useState, useEffect } from 'react';

const DailyCovoid = () => {
  const [hasError, setErrors] = useState(false);
  const [report, setReport] = useState([]);

    async function fetchdata() {
        const res = await fetch(`${process.env.REACT_APP_URL}/deshbord/timeserie`);
        res.json()
        .then(res => setReport(res.data))
        .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <Fragment>
            {/* {report}
            <div class="row heading-wrapper">
                <h5>DAILY COVID STATISTICS</h5>
            </div> */}
            <div class="row">
            {report.map((v,i)=>(
                <div class="col-sm">
                    <div class="card daily-stats-card" >
                        <div class="card-body">
                            <h5 class="card-title heading-card">New Cases</h5>
                            <p class="card-text">3,233</p>
                        </div>
                    </div>
                </div>
             ))}
                {/* <div class="col-sm">
                    <div class="card daily-stats-card" >
                        <div class="card-body">
                            <h5 class="card-title  heading-card">Total Tests Done</h5>
                            <p class="card-text">2,33,200</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card daily-stats-card" >
                        <div class="card-body">
                            <h5 class="card-title  heading-card">Deaths</h5>
                            <p class="card-text">34</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card daily-stats-card" >
                        <div class="card-body">
                            <h5 class="card-title  heading-card">Discharged</h5>
                            <p class="card-text">3,324</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card daily-stats-card" >
                        <div class="card-body">
                            <h5 class="card-title  heading-card">Positivity Rate</h5>
                            <p class="card-text">5.33%</p>
                        </div>
                    </div>
                </div> */}
            </div>

        </Fragment>
    )
}

export default DailyCovoid