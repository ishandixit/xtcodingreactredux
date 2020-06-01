import React, { Component } from 'react'
import ReactTable from 'react-table';
import { fetchData,getData } from '../components/utility'
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import moment from "moment";
let AllData=[{status:"GRN Pending",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"PutAway Allocation Pending",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"PutAway In-Process",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Order Yet to Confirm by DBA",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Replenishment yet to Start",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Replenishment In-Process",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Picking Allocation Pending",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Picking in Process",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Packing in Process",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Invoice Pending",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Transport Pickup Pending",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},
{status:"Total",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""},

]
 class Dashbaord extends Component {
    constructor(props){
       super(props)
       this.state={
           data:AllData,
           grnData:{}
       }
    }
    componentDidMount(){
        this.getGrnList()
    }
    getGrnList=()=>{
        fetchData('/grn/all',{token:this.props.user.token,actionType:"pending_grn"})
        .then(res=>{
            if(res.outputCode==200)
            {this.setState({grnData:res.data},()=>this.formatData())}
        })
    }
    formatData=()=>{
    let resData=this.state.grnData;
    let pendingGrn={status:"GRN Pending",0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:"",total:""}
    var startDate = moment(new Date(), "YYYY.MM.DD");
    let total=0
    resData.map(item=>{
        total=total+item.count
        let endDate = moment(item._id.formattedDateString, "YYYY.MM.DD");
        let result =startDate.diff(endDate, 'days')
        if(result>9){
           if(pendingGrn["10"]=""){
              pendingGrn["10"]=result
           }
           else{
            pendingGrn["10"]=pendingGrn["10"]+result
           }
        }
        else
        {pendingGrn[result]=item.count}
          pendingGrn.total=total
    })
    let data=this.state.data
    data[0]=pendingGrn
    this.setState({data:data})
    }
    render() {
        let columns=[
            {
                Header: 'Status (Days)',
                accessor: "status",
                width:230,
              
            }, 
            {
                Header: '0',
                accessor: "0",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '1',
                accessor: "1",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '2',
                accessor: "2",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '3',
                accessor: "3",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '4',
                accessor: "4",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '5',
                accessor: "5",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '6',
                accessor: "6",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '7',
                accessor: "7",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '8',
                accessor: "8",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '9',
                accessor: "9",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: '>10',
                accessor: "10",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:70,
            },
            {
                Header: 'Total',
                accessor: "total",
                headerStyle: { textAlign: 'center' },
                style: { textAlign: 'center' },
                width:120,
            },

        ]
       let {data}=this.state
        return (
            <div className="row"> 
            <div className="col s12"> 
            <p style={{marginBottom:0}}>Live Orders Dashboard</p>
                <ReactTable 
                sortable={false}
                filterable={false}
                data={data}
                columns={columns}
                defaultPageSize={100}
                minRows={1}
                showPagination={false}
                className="col m12 card z-depth-0 -highlight"
                noDataText={<span>No found</span>}
            />
            </div>
               
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
export default withRouter(connect(mapStateToProps, null)(Dashbaord))