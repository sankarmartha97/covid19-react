import axios from 'axios';
import React, { Component, Fragment } from 'react';

// const DashboardCurrentStatus = () => {
export default class AdminStatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }


  //
  componentDidMount() {
    this.currentStatusData();
  }


  //
  currentStatusData = async () => {
    try {
      // this.setState({ loading: true });
      var dataRes = await axios.get(`${process.env.REACT_APP_URL}/admin/citizen_current`,{'headers':{ 'Content-type': 'application/json; charset=UTF-8',
      'authorization': localStorage.getItem('id_token') }});
      this.setState({data: dataRes.data,  loading: false })
        // .then((res) => res.json())
        // .then((data) =>
        //   this.setState({ data }, () => {
        //     this.setState({ loading: false });
        //   })
        // );
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };



  //render main component
  render() {
    const loading = this.state.loading;
    const data = this.state.data;

    return (
      <Fragment>
        {!loading && data.length ? (
          <CurrentStatusDataComponent data={data} />
        ) : (
          <div className='loader_section'>
            <div className='loader'></div>
          </div>
        )}
      </Fragment>
    );
  }
}


// citizensbetween18to44: "123"
// citizensmorethen45: "123"
// flws: "11"
// : "343"




//child component
const CurrentStatusDataComponent = (props) => {
  const data = props.data;
  // console.log(data);
  return (
    <>
      <div className='dash_update_title'>
        <p>State Current Status</p>
      </div>
        <div className='status_container'>
      {data.map((data) => (
          <div className='status_section'>
            <p className='status_title'>{data.name}</p>
            <h3 className='confirmed_number'>{data.populationasperelectoralroll }</h3>
          </div>
          
          ))} 
      </div>
    </>
  );
};