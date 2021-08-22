import React, { Component, Fragment } from 'react';
import { Button, Table, MessageBox, Message, Pagination, Loading } from 'element-react';
import 'element-theme-default';
import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';
i18n.use(locale);

export default class ApplicationUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      columns: [
        {
          label: 'Name',
          prop: 'name',
          width: 180,
          render: function (data) {
            return (
              <span>
                <i className='fas fa-user'></i>
                <span style={{ marginLeft: '10px' }}>{data.name}</span>
              </span>
            );
          },
        },
        {
          label: 'Mobile Number',
          prop: 'mobile_number',
          render: function (data) {
            return <span>{data.phone}</span>;
          },
        },
        {
          label: 'Email Address',
          prop: 'email_id',
          render: function (data) {
            return <span>{data.email}</span>;
          },
        },
        {
          label: 'Gate Name',
          prop: 'gate_name',

          render: function (data) {
            return <span>{data.check_gate}</span>;
          },
        },
        {
          label: 'Operations',
          render: function (data) {
            return (
              <span>
                <Button
                  className='btn_reject'
                  size='small'
                  onClick={btnRejected.bind(this, data.id, false)}
                >
                  Reject
                </Button>

                <Button
                  className='btn_delete'
                  type='danger'
                  size='small'
                  onClick={btnDelete.bind(this, data.id)}
                >
                  Delete
                </Button>
              </span>
            );
          },
        },
      ],

      //
      data: [],
      data_by_page: [],
      current_page: 1,
      page_size: 10,
      total: 1,
      loading: false,
    };// Eof State def


    //event defination
    const btnRejected = (dataid, status) => {
      MessageBox.confirm(
        'This will permanently reject the user. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          fetch(`${process.env.REACT_APP_URL}/users/${dataid}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ status, registraion: false }),
          })
            .then((res) => res.json())
            .then((data) =>
              this.setState({ data }, () => {
                this.setRecordsByPage();
                Message({
                  type: 'success',
                  message: 'User rejected!',
                });
              })
            );
        })
        .catch(() => {
          Message({
            type: 'info',
            message: 'Rejected canceled',
          });
        });
    };



    //
    const btnDelete = (dataid) => {
      MessageBox.confirm(
        'This will permanently delete the record. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          fetch(`${process.env.REACT_APP_URL}/users/delete/${dataid}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          })
            .then((res) => res.json())
            .then((data) =>
              this.setState({ data }, () => {
                this.setRecordsByPage();
                Message({
                  type: 'success',
                  message: 'User deleted!',
                });
              })
            );
        })
        .catch(() => {
          Message({
            type: 'info',
            message: 'Delete canceled',
          });
        });
    };


  }// Eof Constructor def


  //
  componentDidMount() {
    this.applicationUser();
  }


  //
  applicationUser = async ()=> {
    try {
      this.setState({loading:true})
      await fetch(`${process.env.REACT_APP_URL}/users/approved`)
      .then((res) => res.json())
      .then((data) => this.setState({ data },()=>{
        this.setRecordsByPage();
        setTimeout(() => {
          this.setState({loading:false})
        }, 10000);
      }));
      
    } catch (error) {
      console.log(error)
      this.setState({loading:true})
    }
  }


  //
  onSizeChange= (size) => {
    this.setState({loading:true})
    console.log('onChange:size=', size);
    this.setState({current_page:1});
    this.setState({page_size:size},()=>{
      this.setRecordsByPage();
      setTimeout(() => {
        this.setState({loading:false})
      }, 250);
    });
  }


  //
  onPageChange = (current) => {
    this.setState({loading:true})
    console.log('onChange:current=', current);
    this.setState({current_page: current}, () => {
      this.setRecordsByPage();
      setTimeout(() => {
        this.setState({loading:false})
      }, 250);
    });
  }


  //
  setRecordsByPage(){
    this.setState({total:this.state.data.length});
    var first_record_index =(this.state.current_page - 1)*this.state.page_size;
    var last_record_index = this.state.page_size*(this.state.current_page);
    this.setState({data_by_page: this.state.data.slice(first_record_index,last_record_index) });
  }


  // render main component
  render() {
    const length = this.state.data.length;
    const loading = this.state.loading;
    if(length === 0){
      return <UserNotFound />
    }
    return (
      <Fragment>
        {!loading ? (
          <>
            <Table
              style={{ width: '100%' }}
              columns={this.state.columns}
              data={this.state.data_by_page}
              height={400}
              highlightCurrentRow={true}
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
          <div className='loader_section'>
            <div className='loader'></div>
          </div>
        )}
      </Fragment>
    );
  }
}



// child component
const UserNotFound = () =>{
  return(
    <div className="container user_not_found">
      <i class="fas fa-users user_ico"></i>
      <p>User not found</p>
    </div>
  )
}