import React, { Component, Fragment } from 'react';
import {
  Button,
  Table,
  Select,
  Icon,
  DatePicker,
  i18n,
  Pagination,
} from 'element-react';
import 'element-theme-default';
import { format } from 'date-fns';
export default class DashboardUpdatedReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      value: '',
      districtValue: '',
      datevalue: null,
      //
      columns: [
        {
          label: 'Date',
          prop: 'date',
          width: '150px',
          sortable: true,
          render: function (data) {
            return (
              <span>
                <span>{data.date}</span>
              </span>
            );
          },
        },
        {
          label: 'District Name',
          prop: 'district',
          width: '150px',
          sortable: true,
          render: function (data) {
            return (
              <span>
                <span>{data.district}</span>
              </span>
            );
          },
        },
        {
          label: 'Confirmed',
          prop: 'confirmed',
          width: '150px',
          sortable: true,
          render: function (data) {
            return <span>{data.confirmed}</span>;
          },
        },
        {
          label: 'Recovered',
          prop: 'recovered',
          sortable: true,
          width: '150px',
          render: function (data) {
            return <span>{data.recovered}</span>;
          },
        },
        {
          label: 'Deceased',
          prop: 'deceased',
          sortable: true,
          width: '150px',
          render: function (data) {
            return <span>{data.deceased}</span>;
          },
        },
        {
          label: 'Quarantined',
          prop: 'quarantined',
          sortable: true,
          width: '150px',
          render: function (data) {
            return <span>{data.quarantined}</span>;
          },
        },
        {
          label: 'Isolated',
          prop: 'isolated',
          sortable: true,
          width: '150px',
          render: function (data) {
            return <span>{data.isolated}</span>;
          },
        },
        {
          label: 'Negative',
          prop: 'negative',
          width: '150px',
          sortable: true,
          render: function (data) {
            return <span>{data.negative}</span>;
          },
        },
        {
          label: 'Sample Collected',
          prop: 'samplecollected',
          width: '175px',
          sortable: true,
          render: function (data) {
            return <span>{data.samplecollected}</span>;
          },
        },
        {
          label: 'Citizen Screened',
          prop: 'citizenscreened',
          sortable: true,
          width: '170px',
          render: function (data) {
            return <span>{data.citizenscreened}</span>;
          },
        },
        {
          label: 'Suspected',
          prop: 'suspected',
          sortable: true,
          width: '150px',
          render: function (data) {
            return <span>{data.suspected}</span>;
          },
        },
        {
          label: 'Result Awaited',
          prop: 'resultawaited',
          width: '160px',
          sortable: true,
          render: function (data) {
            return <span>{data.resultawaited}</span>;
          },
        },
      ],

      data: [],
      districtdata: [],
      data_by_page: [],
      current_page: 1,
      page_size: 10,
      total: 1,
      loading: false,
    }; // Eof State def
  } // Eof Constructor def



  //
  componentDidMount() {
    this.districtlist();
    this.report('null', 'null');
  }


  //
  districtlist = async () => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/districtlist`)
        .then((res) => res.json())
        .then((districtdata) => this.setState({ districtdata }));
    } catch (error) {
      console.log(error);
    }
  };


  //
  report= async(district, date) => {
    try {
      this.setState({loading:true})
      await fetch(`${process.env.REACT_APP_URL}/status/report/${district}/${date}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({ data }, () => {
          this.setRecordsByPage();
          // setTimeout(() => {
            this.setState({loading:false})
          // }, 250);
        })
      );
    } catch (error) {
      console.log(error)
      this.setState({loading:true})
    }
  }

  

  //
  onDistrictChangeHandler (data) {
    var date = 'null',
      district = data;
    this.setState({ value: data });
    if (data === '') {
      district = 'null';
    }
    if (this.state.datevalue != null) {
      date = format(this.state.datevalue, 'yyyy-MM-dd');
    } else {
      date = this.state.datevalue;
    }
    console.log(district, date);
    this.report(district, date);
  }


  //
  onDatechangeHandler(data) {
    var date = 'null',
      district = this.state.value;
    if (district === '') {
      // district = this.setState.value;
      district = 'null';
    }
    if (data != null) {
      date = format(data, 'yyyy-MM-dd');
    }
    console.log(date, district);
    this.report(district, date);
  }


  //
  onSizeChange = (size) => {
    this.setState({ loading: true });
    console.log('onChange:size=', size);
    this.setState({ current_page: 1 });
    this.setState({ page_size: size }, () => {
      this.setRecordsByPage();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 250);
    });
  };

  //
  onPageChange = (current) => {
    this.setState({ loading: true });
    console.log('onChange:current=', current);
    this.setState({ current_page: current }, () => {
      this.setRecordsByPage();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 250);
    });
  };

  //
  setRecordsByPage() {
    this.setState({ total: this.state.data.length });
    var first_record_index =
      (this.state.current_page - 1) * this.state.page_size;
    var last_record_index = this.state.page_size * this.state.current_page;
    this.setState({
      data_by_page: this.state.data.slice(
        first_record_index,
        last_record_index
      ),
    });
  }

  // render main component

  render() {
    const { datevalue } = this.state;
    const { value } = this.state;
    const length = this.state.data.length;
    const loading = this.state.loading;
    if(length === 0){
      return <ReportNotFound />
    }
    return (
      <Fragment>
        <div className='report_filter_section'>
          <label htmlFor='filter_title' className='report_filter_title'>
            Filter -
          </label>

          {/* Select district */}
          <Select
            value={value}
            className='mr-3'
            placeholder='Select District'
            onChange={this.onDistrictChangeHandler.bind(this)}
            clearable={true}
          >
            {this.state.districtdata.map((el) => {
              return (
                <Select.Option
                  filterable={true}
                  key={el.id}
                  label={el.name}
                  value={el.name}
                />
              );
            })}
          </Select>

          {/* select date  */}
          <DatePicker
            value={datevalue}
            placeholder='Pick a day'
            onChange={(date) => {
              console.debug('DatePicker1 changed: ', date);
              this.setState({ datevalue: date });
              this.onDatechangeHandler(date);
            }}
          />
        </div>

        {!loading ? (
          <>
            <Table
              style={{ width: '100%' }}
              columns={this.state.columns}
              data={this.state.data_by_page}
              border={true}
              height={450}
              className='en-US'
              highlightCurrentRow={true}
              showSummary={true}
              sumText='Total price'
              summaryMethod={(columns, data) => {
                const dataList = [];
                for (var i = 0; i < columns.length; i++) {
                  let total = 0;
                  for (let j = 0; j < data.length; j++) {
                    let value = data[j][columns[i]['property']];

                    if (isNaN(value)) {
                      total = '';
                      break;
                    } else {
                      total += parseFloat(value);
                    }
                  }
                  dataList[i] = isNaN(total) ? total : total;
                  dataList[0] = 'Total';
                }
                return dataList;
              }}
            />

            <div className='pagination_section'>
              <Pagination
                layout='total, sizes, prev, pager, next, jumper'
                total={this.state.total}
                pageSizes={[10, 20, 30, 40, 50]}
                pageSize={this.state.page_size}
                currentPage={this.state.current_page}
                onSizeChange={this.onSizeChange}
                onCurrentChange={this.onPageChange}
                className='mb-3 mt-3'
              />
            </div>
          </>
        ) : (
          <div className='loader_section1'>
            <div className='loader'></div>
          </div>
        )}
      </Fragment>
    );
  }
}




// child component
const ReportNotFound = () =>{
  const onBackClickHandler = () =>{
    window.location.reload(true);
  }

  return(
    <div className="container user_not_found">
      <i class="fas fa-address-card user_ico"></i>
      <p>Report not found !</p>
      <Button type="primary" onClick={onBackClickHandler}><i class="fas fa-redo-alt"></i> &nbsp;Back</Button>
    </div>
  )
}
