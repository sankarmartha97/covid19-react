import React, { useState, useEffect } from 'react'
import $ from 'jquery'

// import Chart1 from './chart1'
// import CovidMap from './map.component'
import CovidMap from '../components/map'
import VerticalBar from '../components/bar_chart'
import LineChart from '../components/line_chart'
import StatePositiveTrend from '../components/state.positivity.rate.trend'
// import DailyCovid from './daily_covis_statis'
import axios from 'axios';
import dateFormat from 'dateformat'
import arraySort from 'array-sort';
// import  sortArray from 'sort-array';
 
import {
    Radio, DateRangePicker, Select
} from 'element-react'
import 'element-theme-default';
import { parseJSON } from 'date-fns/esm';

var date = new Date(localStorage.getItem('last'));
var milliseconds = date.getTime();
var daterangepicker2,daterangepicker3 ;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function indnumber(x) {
    // var x = 1234345565566;
    var x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

 
 

const New_dashboard = () => {
    const [vaccinationChartType, setvaccinationChartType] = useState('1');
    const [vaccinationChartTitle, setVaccinationChartTitle] = useState('HCW');
    const [vaccinationChartLabel1, setVaccinationChartLabel1] = useState('% HCW Dose 1 (Base: Registered HCW)');
    const [vaccinationChartLabel2, setVaccinationChartLabel2] = useState('% HCW Dose 2 (Base: HCW Dose 1)');
    const [covidDailyStatsChartDataFinal, setCovidDailyStatsChartDataFinal] = useState({});
    const [mapType, setMapType] = useState('Confirmed');
    const [mapViewType, setMapViewType] = useState('Daily');
    const [fetched, setFetched] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [oneDayChange, setOneDayChange] = useState([]);
    const [date, setDate] = useState('');
    const [daily, setDaily] = useState('');
    const [vaccination, setVaccination] = useState([]);
    const [cummulative, setCummulative] = useState([]);
    const [beds, setBeds] = useState([]);
    const [bedInfo, setBedInfo] = useState([]);
    const [positivityDate, setPositivityDate] = useState(null);
    const [statePositivityDate, setStatePositivityDate] = useState(null);
    const [statePositivityTrend, setStatePositivityTrend] = useState([]);
    const [vaccinationData, setVaccinationData] = useState({});
    const [vaccinationDataChart, setVaccinationDataChart] = useState({});
    const [positivityRateDateDisabled, setPositivityRateDateDisabled] = useState(false);
    const [dateLabel, setDateLabel] = useState('');
    // const [dateLabel, setDateLabel] = useState((dateFormat(new Date(localStorage.getItem('last')).setDate(new Date(localStorage.getItem('last')).getDate() - 6),"dd.mm.yyyy")) + ' to ' +dateFormat(localStorage.getItem('last'),"dd.mm.yyyy")   );
    const [value, setValue] = useState('positivityRate');
    const [options, setOptions] = useState([{
        value: 'tested',
        label: 'Tests Done'
    }, {
        value: 'confirmed',
        label: 'New Cases'
    }, {
        value: 'deceased',
        label: 'Deceased'
    }, {
        value: 'discharged',
        label: 'Discharged'
    }, {
        value: 'active',
        label: 'Active Cases'
    }, {
        value: 'positivityRate',
        label: 'Positivity Rate'
    }
    ]);
    const [secFilterValue, setSecFilterValue] = useState('7 days');
    const [secFilter, setsecFilter] = useState([ 
    {
        value: '7 days',
        label: 'Moving Average'
    }])



    const fetchStatePositivityTrendNoDates = async () => {
        // try {
            // var date = new Date();            
            // var currentDate = dateFormat(date.setDate(date.getDate()), "isoDate");
            // var previousDate = dateFormat(date.setDate(date.getDate() - 60), "isoDate");

            // var updatedate = localStorage.getItem('lastDataDate');
            // var previousDate = (dateFormat(new Date(updatedate).setDate(new Date(updatedate).getDate() - 60),"dd.mm.yyyy"));
            // var currentDate = dateFormat(localStorage.getItem('lastDataDate'),"dd.mm.yyyy")
            
            var updatedate = localStorage.getItem('lastDataDate');
            var previousDate = (dateFormat(new Date(updatedate).setDate(new Date(updatedate).getDate() - 60),"dd.mm.yyyy"));
            var currentDate = dateFormat(localStorage.getItem('lastDataDate'),"dd.mm.yyyy")
            
            var date_string = '('+previousDate + ' to ' + currentDate+')';
            setDateLabel(date_string);

            const postivityRateRes = await axios.get(`${process.env.REACT_APP_URL}/deshbord/arpvrate?start=${previousDate}&end=${currentDate}`)
            var dateLabels = [], confirmed = [], tested = [], positivityRate = [];
            // console.log("length ",postivityRateRes.data.data.length);
            for (var i = 0; i < postivityRateRes.data.data.length; i++) {
                dateLabels.push(postivityRateRes.data.data[i].date);
                confirmed.push(postivityRateRes.data.data[i].confirmed);
                tested.push(postivityRateRes.data.data[i].tested);
                positivityRate.push(((postivityRateRes.data.data[i].confirmed / postivityRateRes.data.data[i].tested) * 100).toFixed(2))
            }
            var statePositivityTrend = {
                labels: dateLabels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Positivity Rate',
                        borderColor: '#a0c636',
                        borderWidth: 2,
                        backgroundColor: '#a0c636',

                        // yAxisID: 'A',
                        fill: false,
                        data: positivityRate,
                    },
                    {
                        type: 'bar',
                        label: 'Positive Cases',
                        backgroundColor: '#b8080b',
                        data: confirmed,
                        yAxisID: 'B',

                        // borderColor: 'white',
                        // borderWidth: 2,
                    },
                    {
                        type: 'bar',
                        label: 'Total Tests',
                        backgroundColor: '#5182bf',
                        data: tested,
                        yAxisID: 'B',

                        // borderColor: 'white',
                        // borderWidth: 2,
                    },
                ],
            };
            setStatePositivityTrend(statePositivityTrend);
        //  } catch (err) {
        //     console.log(err);
        // }
    }
    const fetchdata = async () => {
        try {




            const [response, vaccinationResponse, cummulativeResponse, bed, bedInfoRes] = await Promise.all([
                axios.get(`${process.env.REACT_APP_URL}/deshbord/daily`),
                axios.get(`${process.env.REACT_APP_URL}/deshbord/vacci`),
                axios.get(`${process.env.REACT_APP_URL}/deshbord/cumulative`),
                axios.get(`${process.env.REACT_APP_URL}/deshbord/beds`),
                axios.get(`${process.env.REACT_APP_URL}/deshbord/v2/beds`),

            ]);
            // const res = await axios.get(`${process.env.REACT_APP_URL}/deshbord/daily`);
            // res.json()
            //     .then(res => setDaily(res))
            //     .catch(err => setErrors(true));
            setDaily(response.data[0]);
            setVaccination(vaccinationResponse.data.data[0]);
            setCummulative(cummulativeResponse.data.data[0]);
            setOneDayChange(cummulativeResponse.data.total[0])
            setBeds(bed.data.data[0])
            setBedInfo(bedInfoRes.data.data[0])

            fetchStatePositivityTrendNoDates();
            setFetched(true);

            // console.log(vaccinationResponse);
            // console.log(response);
            // console.log(cummulativeResponse);
        } catch (err) {
            console.log(err);
        }

    }

    const fetchStatePositivityTrend = async (inputDate) => {
        try {
            // console.log(inputDate);

            if (inputDate === null) {
                fetchStatePositivityTrendNoDates();
            }else{
            const date1 = dateFormat(inputDate[0], "isoDate");
            const date2 = dateFormat(inputDate[1], "isoDate");

            var date_string = '('+dateFormat(date1,"dd.mm.yyyy") + ' to ' + dateFormat(date2,"dd.mm.yyyy")+')';
            setDateLabel(date_string);

            const postivityRateRes =  await  axios.get(`${process.env.REACT_APP_URL}/deshbord/arpvrate?start=${date1}&end=${date2}`)
            // console.log(postivityRateRes.data.data);
            var dateLabels = [], confirmed = [] , tested = [], positivityRate = []; 
            for(var i=0;i<postivityRateRes.data.data.length;i++){
                dateLabels.push(postivityRateRes.data.data[i].date);
                confirmed.push(postivityRateRes.data.data[i].confirmed);
                tested.push(postivityRateRes.data.data[i].tested);
                positivityRate.push(((postivityRateRes.data.data[i].confirmed/postivityRateRes.data.data[i].tested)*100).toFixed(2))
            }
            var statePositivityTrend = {
                labels:  dateLabels,
                datasets: [
                        {
                            type: 'line',
                            label: 'Positivity Rate',
                            borderColor: '#a0c636',
                            backgroundColor: '#a0c636',
                            borderWidth: 2,
                            // yAxisID: 'A',
                            fill: false,
                            data: positivityRate,
                        },
                        {
                            type: 'bar',
                            label: 'Positive Cases',
                            backgroundColor: '#b8080b',
                            data: confirmed,
                            // borderColor: 'white',
                            // borderWidth: 2,
                        },
                        {
                            type: 'bar',
                            label: 'Total Tests',
                            backgroundColor: '#5182bf',
                            data: tested,
                            // borderColor: 'white',
                            // borderWidth: 2,
                        },
                    ],
                };
                setStatePositivityTrend(statePositivityTrend);
            }
            } catch (err) {
            console.log(err);
        }
    }
    // const onVaccinationChartTypeChange = async (value) => {
    //     try {
    //         // console.log(value);
    //         setvaccinationChartType(value);
    //         const typeId = value;
    //         var dataChart = {}
    //         if (typeId === '1') {
    //             setVaccinationChartTitle('HCW');
    //             setVaccinationChartLabel1('% HCW Dose 1 (Base: Registered HCW)');
    //             setVaccinationChartLabel2('% HCW Dose 2 (Base: HCW Dose 1)');
    //             dataChart = { districtLabels: vaccinationData.districtLabels_hcw_vcn1, data1: vaccinationData.hcw_vcn1, data2: vaccinationData.hcw_vcn2 }
    //             setVaccinationDataChart(dataChart);
    //         }

    //         else if (typeId === '2') {
    //             setVaccinationChartTitle('FLW')
    //             setVaccinationChartLabel1('% FLW Dose 1 (Base: Registered FLW)')
    //             setVaccinationChartLabel2('% HCW Dose 2 (Base: FLW Dose 1)')
    //             dataChart = { districtLabels: vaccinationData.districtLabels_flw_vcn1, data1: vaccinationData.flw_vcn1, data2: vaccinationData.flw_vcn2 }
    //             setVaccinationDataChart(dataChart);
    //         }

    //         else if (typeId === '3') {
    //             setVaccinationChartTitle('45 Years')
    //             setVaccinationChartLabel1('% Citizen > 45 Years Dose 1 (Base: Population as per Electoral Roll)')
    //             setVaccinationChartLabel2('% Citizen > 45 Years Dose 2 (Base: Citizen > 45 Years Dose 1)')
    //             dataChart = { districtLabels: vaccinationData.districtLabels_vcn1_45year, data1: vaccinationData.vcn1_45year, data2: vaccinationData.vcn2_45year }
    //             setVaccinationDataChart(dataChart);
    //         }

    //         else if (typeId === '4') {
    //             setVaccinationChartTitle('18-44 Years')
    //             setVaccinationChartLabel1('% Citizen 18-44 Years Dose 1 (Base: Population as per Electoral Roll)')
    //             setVaccinationChartLabel2('% Citizen 18-44 Years Dose 2 (Base: Citizen 18-44 Years Dose 1)')
    //             dataChart = { districtLabels: vaccinationData.districtLabels_vcn1_18to44, data1: vaccinationData.vcn1_45year, data2: vaccinationData.vcn2_45year }
    //             setVaccinationDataChart(dataChart);
    //         }

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const fetchVaccinationData = async () => {
        try {

            const vaccinationBaseRes = await axios.get(`${process.env.REACT_APP_URL}/deshbord/vaccinationNew`)
            const vaccinationBaseResData = vaccinationBaseRes.data.data;                                                            
           
            
            var totalArunachalFirstDose = 0, totalArunachalSecondDose = 0, totalArunachalpopulationasperelectoralroll = 0;
            for (let index = 0; index < vaccinationBaseResData.length; index++) {
                const element = vaccinationBaseResData[index];
                if(parseInt(element.populationasperelectoralroll) === 0){
                    element['fstdosePercent'] = element['snddosePercent'] = 0
                }
                else{
                    element['fstdosePercent'] = parseFloat((parseInt(element.fstdose)/parseInt(element.populationasperelectoralroll) * 100).toFixed(2));
                    element['snddosePercent'] = parseFloat((parseInt(element.snddose)/parseInt(element.populationasperelectoralroll) * 100).toFixed(2));   
                }
                totalArunachalFirstDose  += parseInt(element.fstdose);
                totalArunachalSecondDose  += parseInt(element.snddose);
                totalArunachalpopulationasperelectoralroll  += parseInt(element.populationasperelectoralroll);
            }
            vaccinationBaseResData.push({   "name":"Arunachal Pradesh", 
                                            "fstdosePercent":  parseFloat(((parseInt(totalArunachalFirstDose)/parseInt(totalArunachalpopulationasperelectoralroll))*100).toFixed(2)),
                                            "populationasperelectoralroll":  totalArunachalpopulationasperelectoralroll,
                                            "fstdose": totalArunachalFirstDose,
                                            "snddose": totalArunachalSecondDose,
                                            "snddosePercent": parseFloat(((parseInt(totalArunachalSecondDose)/parseInt(totalArunachalpopulationasperelectoralroll))*100).toFixed(2)),
                                         })
            // console.log(vaccinationBaseResData);

            var temp_1 = [...vaccinationBaseResData];
            var vaccinationDataSortedFirstDose = await arraySort(temp_1, 'fstdosePercent');
            
            const districtLabels = [], fstdosePercent = [], snddosePercent = [], data1Color= [], data2Color= []; 
            for (let index = 0; index < vaccinationDataSortedFirstDose.length; index++) {
                const element = vaccinationDataSortedFirstDose[index];
                districtLabels.push(element.name);
                fstdosePercent.push(element.fstdosePercent);
                snddosePercent.push(element.snddosePercent);
                if(element.name === 'Arunachal Pradesh'){
                    data1Color.push('#00b0f1');
                    data2Color.push('#94d052');
                }else{
                    data1Color.push('#c14e4f');
                    data2Color.push('#f2dbdc');    
                }
            }

            // setVaccinationData(data);
            var dataChart = {   districtLabels: districtLabels, data1: fstdosePercent, data2: snddosePercent,  
                                data1Color: data1Color, data2Color: data2Color }
            setVaccinationDataChart(dataChart);

        } catch (err) {
            console.log(err);
        }
    }

 
    const onPostivityRateChartTypeChange = async (value, inputDate, secFilterValue, call) => {
        try{
            // console.log(value, inputDate, secFilterValue);

        var districtLabels = [], confirmedLastDate = [], testedLastDate = [], positivityRateLastDate = [],
            deceasedLastDate = [], dischargedLastDate = [], activeLastDate = [], positivityRateTotalTempJson = [], districtLabelsPositivityRate = [],
            totalconfirmed = [], totaltested=[], totaldeceased = [], totaldischarged=[],totalactive =[], avaragedischarged=[],totalpositivityRate=[], avarageconfirmed = [],avaragetested = [],avarageactive=[], avaragedeceased=[], avaragepositivityRate=[] ;
        var date1, date2;

        
        var chartSelectionType = value;
        if (chartSelectionType === 'positivityRate') {  secFilterValue = '7 days'; await setSecFilterValue('7 days'); }
        // console.log(value, inputDate, secFilterValue);

        // Show/Hide Chart based on Date Selection if selected 'Tested'
        if ((inputDate === undefined || inputDate === null) && call !== 'first' ){ 
                $('#chart-overlay').show();
                setPositivityRateDateDisabled(false)
                setCovidDailyStatsChartDataFinal({
                    districtLabels: ["Shi Yomi", "Papumpare", "Namsai", "West Kameng", "Siang", "Longding", "East Kameng", "Lower Siang", "Kra Daadi", "Tirap", "Dibang Valley", "Kamle", "Lohit", "Leparada", "East Siang", "Itanagar Capital C", "Changlang", "Tawang", "Lower Subansiri", "Lower Dibang Valley", "Kurung Kumey", "Anjaw", "Pakke Kessang", "Upper Subansiri", "West Siang", "Upper Siang"],
                    data: confirmedLastDate, data2: [], positivityRate: [],
                    titleText: '',
                    label2: 'Tests', label1: 'Positive Cases', INDEX_OF_DATASET: 4, INDEX_OF_ANOTHER_DATASET: 4, displayPerc: true,
                });
                return ;
            }else{
                $('#chart-overlay').hide();
            }


        // if (inputDate === undefined || inputDate === null  ) {     //No date selected
        
        if (secFilterValue === '7 days' && (inputDate === undefined || inputDate === null) ){
         var updatedate = localStorage.getItem('lastDataDate');
            date1 = (dateFormat(new Date(updatedate).setDate(new Date(updatedate).getDate() - 6),"dd.mm.yyyy"));
            date2 = dateFormat(localStorage.getItem('lastDataDate'),"dd.mm.yyyy")
            // setPositivityRateDateDisabled(true)
        } else {
            date1 = dateFormat(inputDate[0], "dd.mm.yyyy");
            date2 = dateFormat(inputDate[1], "dd.mm.yyyy")
            // setPositivityRateDateDisabled(false)
            // console.log('total sec_filter_value');
        }

        const res = await axios.get(`${process.env.REACT_APP_URL}/deshbord/ardcrtpvrate?start=${date1}&end=${date2}`);
        // localStorage.setItem('lastDataDate', res.data.endDate);
        // console.log(value, inputDate, secFilterValue);

        const covidDailyStatsChartData = res.data.data;
        if (chartSelectionType === undefined) { chartSelectionType = 'positivityRate' }
        // console.log(chartSelectionType);
        
        for (var i = 0; i < covidDailyStatsChartData.length; i++) {
                if ((covidDailyStatsChartData[i].date.length) > 0) {
                     
                    positivityRateTotalTempJson.push(
                        { "district":           covidDailyStatsChartData[i].name
                        ,"positivityRate":      parseFloat(((covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].confirmed) / (covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].tested) * 100).toFixed(2))
                        , "confirmedLastDate":  covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].confirmed
                        , "testedLastDate":     covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].tested
                        , "deceasedLastDate":   covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].deceased
                        , "dischargedLastDate": covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].recovered
                        , "activeLastDate" :    covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].active
                        });

                } else {
                      positivityRateTotalTempJson.push({"district":covidDailyStatsChartData[i].name,"positivityRate": 0, "confirmedLastDate":0,
                                                     'testedLastDate':0, "deceasedLastDate":0, "dischargedLastDate": 0 , "activeLastDate": 0});
                }
            }

            var positivityRate_Sorted = await arraySort(positivityRateTotalTempJson, 'positivityRate');
            for (const i in positivityRate_Sorted) {
                districtLabelsPositivityRate.push(positivityRateTotalTempJson[i].district);
                positivityRateLastDate.push(positivityRateTotalTempJson[i]['positivityRate']);
                deceasedLastDate.push(positivityRateTotalTempJson[i]['deceasedLastDate']);
                confirmedLastDate.push(positivityRateTotalTempJson[i]['confirmedLastDate']);
                testedLastDate.push(positivityRateTotalTempJson[i]['testedLastDate']);
                dischargedLastDate.push(positivityRateTotalTempJson[i]['dischargedLastDate']);
                activeLastDate.push(positivityRateTotalTempJson[i]['activeLastDate']);
            }
            
            updatedate = localStorage.getItem('lastDataDate');
            var previousDate = (dateFormat(new Date(updatedate).setDate(new Date(updatedate).getDate() - 6),"dd.mm.yyyy"));
            var latestDate = dateFormat(localStorage.getItem('lastDataDate'),"dd.mm.yyyy")

            //  console.log('Secfilter ', secFilterValue)
       
             var postivityRateTotalJson = [], postivityRateAverageJson = [];
            if (value === undefined) { value = 'positivityRate' }
            for (var i = 0; i < covidDailyStatsChartData.length; i++) {
                if(covidDailyStatsChartData[i].date.length){
                   
                    postivityRateTotalJson.push({
                    "district":covidDailyStatsChartData[i].name
                    ,"totalpositivityRate": parseFloat(((covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].confirmed) / (covidDailyStatsChartData[i].date[covidDailyStatsChartData[i].date.length - 1].tested) * 100).toFixed(2))
                    , "totaltested": covidDailyStatsChartData[i].total[0].tested
                    , "totaldeceased":covidDailyStatsChartData[i].total[0].deceased
                    , "totaldischarged": covidDailyStatsChartData[i].total[0].recovered
                    , "totalactive": covidDailyStatsChartData[i].total[0].active
                    , "totalconfirmed" : covidDailyStatsChartData[i].total[0].confirmed
                  });

                  
                  postivityRateAverageJson.push({
                    "district":covidDailyStatsChartData[i].name
                    ,"avaragepositivityRate": parseFloat(parseFloat(((covidDailyStatsChartData[i].total[0].confirmed) / covidDailyStatsChartData[i].total[0].tested) * 100).toFixed(2))
                    , "avaragetested": covidDailyStatsChartData[i].average[0].tested
                    , "avaragedeceased":covidDailyStatsChartData[i].average[0].deceased
                    , "avaragedischarged": covidDailyStatsChartData[i].average[0].recovered
                    , "avarageactive": covidDailyStatsChartData[i].average[0].active
                    , "avarageconfirmed" : covidDailyStatsChartData[i].average[0].confirmed
                  });

                     
                } else {
                    postivityRateTotalJson.push({"district":covidDailyStatsChartData[i].name, "totalconfirmed": 0, "totaltested":0,
                        'totaldeceased':0, "totalactive":0, "totaldischarged": 0 , "totalpositivityRate": 0});
                    postivityRateAverageJson.push({"district":covidDailyStatsChartData[i].name, "avarageconfirmed": 0, "avaragetested":0,
                        'avaragedeceased':0, "avaragedischarged":0, "avarageactive": 0 , "avaragepositivityRate": 0});
                }
            }


            // console.log(postivityRateTotalJson);

            if(secFilterValue === 'Total'){ 
                var postivityRateTotalJsonSorted = await arraySort(postivityRateTotalJson, 'totalpositivityRate');
                // console.log(postivityRateTotalJsonSorted);
                districtLabels = [];
        
                for (const i in postivityRateTotalJsonSorted) {
                    districtLabels.push(postivityRateTotalJsonSorted[i].district);
                    totalconfirmed.push(postivityRateTotalJsonSorted[i]['totalconfirmed']);
                    totaltested.push(postivityRateTotalJsonSorted[i]['totaltested']);
                    totaldeceased.push(postivityRateTotalJsonSorted[i]['totaldeceased']);
                    totalactive.push(postivityRateTotalJsonSorted[i]['totalactive']);
                    totaldischarged.push(postivityRateTotalJsonSorted[i]['totaldischarged']);
                    totalpositivityRate.push(postivityRateTotalJsonSorted[i]['totalpositivityRate']);
                }
            }
            else{
                // console.log(postivityRateAverageJson);
                var postivityRateAverageJsonSorted = await arraySort(postivityRateAverageJson, 'avaragepositivityRate');
                districtLabels = [];
                // console.log(postivityRateAverageJsonSorted);
                for (const i in postivityRateAverageJsonSorted) {
                    districtLabels.push(postivityRateAverageJsonSorted[i].district);
                    avarageconfirmed.push(postivityRateAverageJsonSorted[i]['avarageconfirmed']);
                    avaragetested.push(postivityRateAverageJsonSorted[i]['avaragetested']);
                    avaragedeceased.push(postivityRateAverageJsonSorted[i]['avaragedeceased']);
                    avarageactive.push(postivityRateAverageJsonSorted[i]['avarageactive']);
                    avaragedischarged.push(postivityRateAverageJsonSorted[i]['avaragedischarged']);
                    avaragepositivityRate.push(postivityRateAverageJsonSorted[i]['avaragepositivityRate']);
                }
            }



            
        
            
            if(secFilterValue === 'Total'){
                console.log('Total Title')
                var date1Label = date1;
                var date2Label = date2;

                var latestDate = dateFormat(localStorage.getItem('lastDataDate'),"dd.mm.yyyy")
                if (chartSelectionType === 'tested') {
                    console.log(totaltested);
                    setCovidDailyStatsChartDataFinal({districtLabels: districtLabels, data: totaltested, label1: 'Total Tested', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 , displayPerc: false, 
                    titleText: 'Total Tests Done ' + '('+ date1Label +' to ' +date2Label+ ')'  });
                } else if (chartSelectionType === 'confirmed') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels,data: totalconfirmed, label1: 'New Cases', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false, 
                    titleText: 'Total New Cases '  + '('+ date1Label +' to ' +date2Label+ ')'   });
    
                } else if (chartSelectionType === 'deceased') {
                    setCovidDailyStatsChartDataFinal({districtLabels: districtLabels, data: totaldeceased, label1: 'Deceased', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false, 
                    titleText: 'Total Deceased ' + '('+ date1Label +' to ' +date2Label+ ')'  });
    
                } else if (chartSelectionType === 'discharged') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels,data: totaldischarged, label1: 'Discharged', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false,
                    titleText: 'Total Discharged '  + '('+ date1Label +' to ' +date2Label+ ')'  });
    
                }else if (chartSelectionType === 'active') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels,data: totalactive, label1: 'Active', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false, 
                    titleText: 'Total Active Cases '  + '('+ date1Label +' to ' +date2Label+ ')'  });
    
                }else {
                //    console.log(totalconfirmed)
                //    console.log(totaltested );
                    setCovidDailyStatsChartDataFinal({
                        districtLabels: districtLabels, data: totalconfirmed, data2: totaltested, positivityRate: totalpositivityRate,
                        label2: 'Tests', label1: 'Positive Cases', INDEX_OF_DATASET: 4, INDEX_OF_ANOTHER_DATASET: 4, displayPerc: true,
                        titleText: 'Total Positivity Rate '  + '('+ date1Label +' to ' +date2Label+ ')' ,
                    });
    
                }
            } else {
                // console.log('7 days avega title')
                // // console.log(districtLabels);
                // var date = new Date();
                // var updatedate = localStorage.getItem('lastDataDate');
                // var previousDate = (dateFormat(new Date(updatedate).setDate(new Date(updatedate).getDate() - 6),"dd.mm.yyyy"));
                // var latestDate = dateFormat(localStorage.getItem('lastDataDate'),"dd.mm.yyyy")

                // console.log(date1);
                // console.log(date2);
                date1Label = date1;
                date2Label = date2;


                if (chartSelectionType === 'tested') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels, data: avaragetested, label1: 'Tested', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 , displayPerc: false, 
                    titleText:   ['Tests Done Across Districts: Moving Average',   '('+ date1Label +' to ' +date2Label+ ')'] ,
                });
             
                } else if (chartSelectionType === 'confirmed') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels, data: avarageconfirmed, label1: 'New Cases', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false,
                    titleText:   ['New Cases Across Districts: Moving Average',   '('+ date1Label +' to ' +date2Label+ ')'] ,
                });
    
                } else if (chartSelectionType === 'deceased') {
                    setCovidDailyStatsChartDataFinal({districtLabels: districtLabels,  data: avaragedeceased, label1: 'Deceased', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false,
                    titleText:   ['Deceased Across Districts: Moving Average',   '('+ date1Label +' to ' +date2Label+ ')'] ,
                });
    
                } else if (chartSelectionType === 'discharged') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels, data: avaragedischarged, label1: 'Discharged', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false, 
                    titleText:   ['Discharged Across Districts: Moving Average',  '('+ date1Label +' to ' +date2Label+ ')'] ,
                });
    
                }else if (chartSelectionType === 'active') {
                    setCovidDailyStatsChartDataFinal({ districtLabels: districtLabels, data: avarageactive, label1: 'Active', INDEX_OF_DATASET: 0, INDEX_OF_ANOTHER_DATASET: 2 ,displayPerc: false,
                    titleText:   ['Active Cases Across Districts: Moving Average',   '('+ date1Label +' to ' +date2Label+ ')'] ,
                });
    
                }else {
                    setCovidDailyStatsChartDataFinal({
                        districtLabels: districtLabels,data: avarageconfirmed, data2: avaragetested, positivityRate: avaragepositivityRate,
                        label2: 'Tests', label1: 'Positive Cases', INDEX_OF_DATASET: 4, INDEX_OF_ANOTHER_DATASET: 4, displayPerc: true,
                        titleText:   ['Positivity Rate Trend Across Districts: Moving Average',   '('+ date1Label +' to ' +date2Label+ ')'] ,
                    });
    
                }
            }
        



        }catch (err) {
            console.log(err);
        }
    }
    
    const onClickCard = (mapType, mapViewType) => {
        // console.log(mapType);
        setMapType(mapType);
        setMapViewType(mapViewType);
    }




    useEffect( () => {
        if (fetched === false) {
            fetchdata();
            // onPostivityRateChartTypeChange();
            onPostivityRateChartTypeChange('positivityRate',null,'7 days','first');
            fetchVaccinationData();
        }

     
        $( ".bed-hover-1" ).hover(
            function() { $(".bed-hover-1" ).addClass( "bedHoverClass" );   },
            function() { $(".bed-hover-1" ).removeClass( "bedHoverClass" ); }
          );
          $( ".bed-hover-2" ).hover(
            function() { $(".bed-hover-2" ).addClass( "bedHoverClass" );   },
            function() { $(".bed-hover-2" ).removeClass( "bedHoverClass" ); }
          );
          $( ".bed-hover-3" ).hover(
            function() { $(".bed-hover-3" ).addClass( "bedHoverClass" );   },
            function() { $(".bed-hover-3" ).removeClass( "bedHoverClass" ); }
          );

            $('.statistics-wrapper .card-body').click(function(){
                $(".bedActiveClass").removeClass("bedActiveClass");
                $(".bedHoverClass").removeClass("bedHoverClass");
                $(this).addClass("bedHoverClass");
            }) 
            $(".bed-hover-1").click(function(){
                $(".bedHoverClass").removeClass("bedHoverClass");
                $(".bedActiveClass").removeClass("bedActiveClass");
                $(".bed-hover-1").addClass("bedActiveClass");
            }) 
            $(".bed-hover-2").click(function(){
                $(".bedHoverClass").removeClass("bedHoverClass");
                $(".bedActiveClass").removeClass("bedActiveClass");
                $(".bed-hover-2").addClass("bedActiveClass");
            })             
            $(".bed-hover-3").click(function(){
                $(".bedHoverClass").removeClass("bedHoverClass");
                $(".bedActiveClass").removeClass("bedActiveClass");
                $(".bed-hover-3").addClass("bedActiveClass");
            }) 
            
          
    }, [fetched])
    // console.log(fetched);
    // console.log(daily);
    // console.log(vaccination);
    // console.log(cummulative);




return (
<>
<div id= "">


<div class="">
  <div class="">
   
  {/*<div className='navbar-wrapper'>
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <div class="nav-link active nav-link-div" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                <i class="fas fa-digital-tachograph fa-2x"></i>
                <span> Dashboard</span>
            </div>
            <div class="nav-link nav-link-div" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
            <i class="far fa-user fa-2x"></i>
                <span> Profile</span>
            </div>
            <div class="nav-link nav-link-div" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
            <i class="fas fa-envelope-open-text fa-2x"></i>
                <span> Govt. Orders</span>
            </div>
            <div class="nav-link nav-link-div" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                <i class="fas fa-digital-tachograph fa-2x"></i>
                <span> Settings</span>
            </div>
        </div>
    </div>
*/}
  </div>
  <div class="" id='dashboard-container'>
    <div class="tab-content" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <div class="body-container">
      <div class="">
          <div class="row ">
              <div class="col-12 col-sm-12 col-lg-3 ">
                  <div class="statistics-wrapper daily-covid-bed-statistics-wrapper">
                      <div class="row heading-wrapper-daily-covid" >
                          <span>Daily Covid-19 Statistics</span>
                      </div>

                      <div class="row daily-covid-wrapper">
                     
                      <div class="col-md-6 col-4">
                              <div class="card daily-stats-card " 
                              onClick= { () => onClickCard('testsDone','daily')}
                                      >
                                  <div class="card-body">
                                      <div className="card-title heading-card-small">TESTS DONE</div>
                                      <p class="daily-covid-card-text">{parseInt(daily.dtest)+parseInt(daily.ctest) || 0}</p>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-4">
                              <div class="card daily-stats-card" 
                              onClick= { () => onClickCard('newCases','daily')}
                              >
                                  <div class="card-body">
                                      <div className="card-title  heading-card-small">NEW CASES</div>
                                      <p class="daily-covid-card-text">{daily.positive || 0}</p>
                                  </div>
                              </div>
                          </div>
                       
                         
                          <div class="col-md-6 col-4">
                              <div class="card daily-stats-card" 
                              onClick= { () => onClickCard('positivityRate','daily')}
                              >
                                  <div class="card-body">
                                      <div class="card-title  heading-card-small">POSITIVITY</div>
                                      <p class="daily-covid-card-text">{
                                          (parseInt(daily.dtest)+parseInt(daily.ctest)) ? 
                                                  ((parseInt(daily.positive)/(parseInt(daily.dtest)+parseInt(daily.ctest)))*100)?((parseInt(daily.positive)/(parseInt(daily.dtest)+parseInt(daily.ctest)))*100).toFixed(2) : 0
                                                  :
                                                  0
                                      }%</p>
                                      </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-4">
                              <div class="card daily-stats-card" 
                              onClick= { () => onClickCard('deceased','daily')}
                              >
                                  <div class="card-body">
                                      <div class="card-title  heading-card-small">DECEASED</div>
                                      <p class="daily-covid-card-text">{daily.deceased || 0}</p>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-4">
                              <div class="card daily-stats-card" 
                              onClick= { () => onClickCard('discharged','daily')} >
                                  <div class="card-body">
                                      <div class="card-title  heading-card-small">DISCHARGED</div>
                                      <p class="daily-covid-card-text">{daily.cured || 0}</p>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6 col-4">
                              <div class="card daily-stats-card" 
                              onClick= { () => onClickCard('active','daily')} 
                              >
                                  <div class="card-body">
                                      <div class="card-title  heading-card-small">ACTIVE CASES</div>
                                      <p class="daily-covid-card-text">{daily.active || 0}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-12  col-sm-12 col-lg-6">
               <CovidMap mapType={mapType} mapViewType = {mapViewType}/>
              </div>
              <div class="col-12 col-sm-12 col-lg-3 ">
              <div class="statistics-wrapper statistics-wrapper-cummulative">
              <div class="row heading-wrapper-cummulative"><span>Cumulative Covid-19 Statistics</span></div>
              <div class="row  cummulative-covid-wrapper">
                  <div class="col-md-6 col-3 cummulative-card-wrapper">
                      <div class="card" onClick={() => onClickCard('cumTested', 'cummulative')} >
                          <div class="card-body bed-stats-card-body">
                              <div class="card-title  heading-card-small">TOTAL TESTS DONE </div>
                              <p class="cummulative-card-text">{parseInt(cummulative.tested) + parseInt(oneDayChange.tested)}</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-6 col-3 cummulative-card-wrapper">
                      <div class="card" onClick={() => onClickCard('cumConfirmed', 'cummulative')}>
                          <div class="card-body bed-stats-card-body">
                              <div class="card-title  heading-card-small">CONFIRMED</div>
                              <p class="cummulative-card-text">{parseInt(cummulative.confirmed) + parseInt(oneDayChange.confirmed)}</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-6 col-3 cummulative-card-wrapper">
                      <div class="card" onClick={() => onClickCard('cumRecovered', 'cummulative')}>
                          <div class="card-body bed-stats-card-body">
                              <div class="card-title  heading-card-small">RECOVERED</div>
                              <p class="cummulative-card-text">{parseInt(cummulative.recovered) + parseInt(oneDayChange.recovered)}</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-6 col-3 cummulative-card-wrapper">
                      <div class="card" onClick={() => onClickCard('cumDeceased', 'cummulative')}>
                          <div class="card-body bed-stats-card-body">
                              <div class="card-title  heading-card-small">DECEASED</div>
                              <p class="cummulative-card-text">{parseInt(cummulative.deceased) + parseInt(oneDayChange.deceased)}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

                 </div>
          </div>
      </div>
      
    <div class="col section-4">
      <div class="row">
          <div class="col-12">
              <div class="bed-2-wrapper">
                  <div class="heading-wrapper-bed-2">
                      <span>BED AVAILABILITY</span>
                  </div>
                  <div class="row">
                      <div class="col-sm">
                          <div class="card">
                              <div class="card-body">
                                      <div class="card-title bed-2-card">
                                              <span>Dedicated Covid Hospitals</span>
                                      </div>
                                  <div class="row bed-2-count-all-info-wrapper">
                                      <div class="col-4 bed-2-count-info-wrapper-1 bed-hover-1" onClick= { () => onClickCard('icu_beds','beds')}>
                                          <div><span class='bed-2-count-label'> ICU Beds </span></div>
                                          <div class="bed-2-count-number"> {bedInfo.dchicubeds || 0} </div>
                                      </div>  
                                      <div class="col-4 bed-2-count-info-wrapper bed-hover-2" onClick= { () => onClickCard('o2_beds','beds')}> 
                                          <div><span class='bed-2-count-label'>   O<sub>2</sub> Beds </span></div>
                                          <div class="bed-2-count-number"> {bedInfo.dcho2beds || 0} </div>
                                      </div>  
                                      <div class="col-4 bed-2-count-info-wrapper bed-hover-3" onClick= { () => onClickCard('non_o2_beds','beds')}> 
                                          <div><span class='bed-2-count-label'>Non-O<sub>2</sub>  Beds</span></div>
                                          <div class="bed-2-count-number"> {bedInfo.dchnono2beds || 0}  </div>
                                      </div> 
                                  </div> 
                              </div>
                          </div>
                      </div>

                      <div class="col-sm">
                          <div class="card">
                              <div class="card-body">
                                  <div class="card-title bed-2-card">
                                      <span>Dedicated Covid Health Centres</span>
                                  </div>
                                  <div class="row bed-2-count-all-info-wrapper">
                                      <div class="col-4 bed-2-count-info-wrapper-1 bed-hover-1"   onClick= { () => onClickCard('icu_beds','beds')}>
                                              <div><span class='bed-2-count-label'> ICU Beds </span></div>
                                              <div class="bed-2-count-number"> {bedInfo.dchcicubeds || 0} </div>
                                      </div>  
                                      <div class="col-4 bed-2-count-info-wrapper  bed-hover-2" onClick= { () => onClickCard('o2_beds','beds')}> 
                                          <div><span class='bed-2-count-label'>   O<sub>2</sub> Beds </span></div>
                                          <div class="bed-2-count-number"> {bedInfo.dchco2beds || 0} </div>
                                      </div>  
                                      <div class="col-4 bed-2-count-info-wrapper  bed-hover-3" onClick= { () => onClickCard('non_o2_beds','beds')}> 
                                          <div><span class='bed-2-count-label'>Non-O<sub>2</sub>  Beds </span></div>
                                          <div class="bed-2-count-number"> {bedInfo.dchcnono2beds || 0} </div>
                                      </div> 
                              </div>

                              </div>
                          </div>
                      </div>

                      <div class="col-sm">
                          <div class="card">
                              <div class="card-body">
                                  <div class="card-title bed-2-card">
                                      <span>Covid Care Centres</span>
                                  </div>
                                  <div class="row bed-2-count-all-info-wrapper">
                                      <div class="col-6 bed-2-count-info-wrapper-1 bed-hover-2" onClick= { () => onClickCard('o2_beds','beds')}>
                                          <div><span class='bed-2-count-label'> O<sub>2</sub> Beds  </span></div>
                                          <div class="bed-2-count-number"> {bedInfo.ccco2beds || 0} </div>
                                      </div>  
                                      <div class="col-6 bed-2-count-info-wrapper  bed-hover-3" onClick= { () => onClickCard('non_o2_beds','beds')}> 
                                          <div><span class='bed-2-count-label'> Non-O<sub>2</sub>  Beds </span></div>
                                          <div class="bed-2-count-number"> {bedInfo.cccnono2beds || 0} </div>
                                      </div>  
                                  </div>
                             
                                  </div>
                          </div>
                      </div>

                      </div>
                  </div>
              </div>
          </div>
      </div>
                                 
      

 
      <div class="row section-postivity-charts">
          <div id="first-chart-order" class="col-12 col-lg-6 filter-section">
              <div class="covid-filter">
                  <Select value={value} clearable={false} size="small" 
                     onChange={(value) => { setValue(value); 
                                            onPostivityRateChartTypeChange(value, positivityDate, secFilterValue,'function') 
                                            if(value=== 'positivityRate'){
                                                setsecFilter([{value: '7 days',label: 'Moving Average'}])
                                            }else{
                                                setsecFilter([{value: 'Total',label: 'Total'}, {value: '7 days',label: 'Moving Average'}])
                                            }
                                        }}
                  >
                      {
                          options.map(el => {
                              return <Select.Option key={el.value} label={el.label} value={el.value} />
                          })
                      }
                  </Select>
                  <Select size="small"  value={secFilterValue} clearable={false}
                      onChange={async(secFilterValue) => { setSecFilterValue(secFilterValue);onPostivityRateChartTypeChange(value, positivityDate, secFilterValue, 'secFilter', 'function') }}>
                      {
                          secFilter.map(el => {
                              return <Select.Option key={el.value} label={el.label} value={el.value} />
                          })
                      }
                  </Select>
              </div>
              <div class="date-filter">
                  <DateRangePicker
                      value={positivityDate}
                      isDisabled = {positivityRateDateDisabled}
                      placeholder="Pick a range"
                      align="left"
                      ref={e=>   daterangepicker2 = e}
                      // ref={e => console.log(e)}
                      onChange={   async(date) =>  {
                          // console.log('DateRangePicker2 changed: ', )
                          // this.setState({value2: date})
                          setPositivityDate(date)
                          onPostivityRateChartTypeChange(value, date, secFilterValue, 'function');

                      }}

                      disabledDate={time => time.getTime() > milliseconds}
                      shortcuts={[{
                        text: 'Yesterday',
                        onClick: async() => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            await setPositivityDate([start, end]);
                            onPostivityRateChartTypeChange(value, [start, end], secFilterValue, 'function') 
                            //   this.setState({value2: [start, end]})
                            // console.log(start, end)
                              daterangepicker2.togglePickerVisible()
                        }
                    },{
                        text: 'Last Week',
                        onClick: () => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            setPositivityDate([start, end]);
                            onPostivityRateChartTypeChange(value, [start, end], secFilterValue, 'function') 
                            //   this.setState({value2: [start, end]})
                            // console.log(start, end)
                              daterangepicker2.togglePickerVisible()
                        }
                    },{
                          text: 'Last month',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                              setPositivityDate([start, end]);
                            onPostivityRateChartTypeChange(value, [start, end], secFilterValue, 'function') 
                            //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                                daterangepicker2.togglePickerVisible()
                          }
                      }, {
                          text: 'Last 3 months',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                              //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              setPositivityDate([start, end]);
                            onPostivityRateChartTypeChange(value, [start, end], secFilterValue, 'function') 

                                daterangepicker2.togglePickerVisible()
                          }
                      }, {
                          text: 'Last 6 months',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                              //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              setPositivityDate([start, end]);
                            onPostivityRateChartTypeChange(value, [start, end], secFilterValue,'function') 

                                daterangepicker2.togglePickerVisible()
                          }
                      }, {
                          text: 'Last year',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 364);
                              //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              setPositivityDate([start, end]);
                            onPostivityRateChartTypeChange(value, [start, end], secFilterValue,'function') 

                                daterangepicker2.togglePickerVisible()
                          }
                      }]}
                  />
              </div>
          </div>
      
      
          <div id="second-chart-order" class=" col-12  col-lg-6 filter-section">
          <h6></h6>
              <div class="date-filter">
                  <DateRangePicker
                      value={statePositivityDate}
                      placeholder="Pick a range"
                      align="right"
                      //   ref={e=>this.daterangepicker2 = e}
                      ref={e=>   daterangepicker3 = e}

                      // ref={e => console.log(e)}
                      onChange={date => {
                          fetchStatePositivityTrend(date)
                          // console.log('DateRangePicker2 changed: ', date)
                          // this.setState({value2: date})
                          setStatePositivityDate(date)
                      }}
                      disabledDate={time => time.getTime() > milliseconds }
                      shortcuts={[{
                        text: 'Yesterday',
                        onClick: () => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            setStatePositivityDate([start, end]);
                            fetchStatePositivityTrend([start, end])
                            //   this.setState({value2: [start, end]})
                            // console.log(start, end)
                              daterangepicker3.togglePickerVisible()
                        }
                    },{
                        text: 'Last Week',
                        onClick: () => {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            setStatePositivityDate([start, end]);
                            fetchStatePositivityTrend([start, end])
                            //   this.setState({value2: [start, end]})
                            // console.log(start, end)
                              daterangepicker3.togglePickerVisible()
                        }
                    },{
                          text: 'Last month',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                              setStatePositivityDate([start, end]);
                            fetchStatePositivityTrend([start, end])
                            //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              daterangepicker3.togglePickerVisible()
                          }
                      }, {
                          text: 'Last 3 months',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                              //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              setStatePositivityDate([start, end]);
                            fetchStatePositivityTrend([start, end])
                            daterangepicker3.togglePickerVisible()
                          }
                      }, {
                          text: 'Last 6 months',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                              //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              setStatePositivityDate([start, end]);
                            fetchStatePositivityTrend([start, end])
                            daterangepicker3.togglePickerVisible()
                          }
                      }, {
                          text: 'Last year',
                          onClick: () => {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 364);
                              //   this.setState({value2: [start, end]})
                              // console.log(start, end)
                              setStatePositivityDate([start, end]);
                            fetchStatePositivityTrend([start, end])
                            daterangepicker3.togglePickerVisible()
                          }
                      }]}
                  />
              </div>
          </div>



          <div  id="third-chart-order"  class="col-12  col-lg-6 char-section ">
            <div id="chart-overlay">
                    <span>Please Select Dates</span>
            </div>
            <LineChart  covidDailyStatsChartDataFinal={covidDailyStatsChartDataFinal}/>
          </div>


          
          
          <div  id="fourth-chart-order"  class="col-12 col-lg-6  char-section">
                <StatePositiveTrend statePositivityTrend={statePositivityTrend} dateLabel={dateLabel} />
          </div>
      </div>

      {/*
      <div class="row section-3">
            <div class="col-6 char-section ">
                    <div id="chart-overlay">
                            <span>Please Select Dates</span>
                    </div>
                    <LineChart  covidDailyStatsChartDataFinal={covidDailyStatsChartDataFinal}/>
            </div>
            <div class="col-6 char-section">
                <StatePositiveTrend statePositivityTrend={statePositivityTrend} dateLabel={dateLabel} />
            </div>
      </div>
      */}

      
      <div class="col section-4">
          <div class="row">
              <div class="col-12">
                  <div class="vaccination-wrapper">
                      <div class="heading-wrapper-vaccination">
                          <span>VACCINATION STATUS</span>
                      </div>
                      <div class="row">
                          <div class="col-sm-4 col-lg-4">
                              <div class="card">
                                  <div class="card-body vaccination-card-body ">
                                      <div class="card-title vaccination-card">
                                          <span>Total 1st Dose Administered</span>
                                      </div>
                                      <p class="vaccination-card-text">{ vaccination.vaccinated1 ? numberWithCommas(parseInt(vaccination.vaccinated1)) : 0}</p>
                                  </div>
                              </div>
                          </div>

                          <div class="col-sm-4 col-lg-4">
                              <div class="card">
                                  <div class="card-body vaccination-card-body">
                                      <div class="card-title vaccination-card">
                                          <span>Total 2nd Dose Administered</span>
                                      </div>
                                      <p class="vaccination-card-text">{vaccination.vaccinated2 ? numberWithCommas(parseInt(vaccination.vaccinated2)) : 0}</p>
                                  </div>
                              </div>
                          </div>

                          <div class="col-sm-4 col-lg-4">
                              <div class="card">
                                  <div class="card-body vaccination-card-body">
                                      <div class="card-title vaccination-card">
                                          <span>Total Doses</span>
                                      </div>
                                      <p class="vaccination-card-text">{vaccination.total ? numberWithCommas(parseInt(vaccination.total)) : 0}</p>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      </div>

      
          <div class="col section-5">
              <div class="row">
                  <div class="col-12">
                      <div class="vaccination-chart-wrapper">
                        {//   <div class="vaccination-chart-info-wrapper">
                        //       <h6 className='title-chart'></h6>
                        //       <Radio.Group value={vaccinationChartType}
                        //           onChange={ (value) => onVaccinationChartTypeChange(value) }
                        //           size={'small'}
                        //       >
                        //           <Radio.Button value="1">HCW</Radio.Button>
                        //           <Radio.Button value="2">FLW</Radio.Button>
                        //           <Radio.Button value="3">45+</Radio.Button>
                        //           <Radio.Button value="4">18-44</Radio.Button>
                        //       </Radio.Group>
                        //   </div>
                        }
                          <VerticalBar
                              vaccinationDataChart={vaccinationDataChart}
                          />
                      </div>
                  </div>
              </div>
          </div>
                     
  </div>
      </div>

      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...2</div>
      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">..3.</div>
      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...4</div>
    </div>
  </div>
</div>

                   

    

        
       
</div>
</>
    )

}

export default New_dashboard
