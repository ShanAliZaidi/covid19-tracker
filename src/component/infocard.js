import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  div1:{
    display:'inline-block',
    float:'left',
  },
  div2:{
    display:'inline-block',
    float:'right',
  },
  root: {
    flexGrow: 1,
  },
  h1: {
    textAlign:'center',
    verticalAlign: 'middle',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 10,
    maxWidth: 250,
  },
}));

export default function InfoCard() {
  
  const classes = useStyles();
  const [globalData, setGlobalData] = useState({});
  const [country,setCountry] = useState("Global");
  const [countries,setCountries] = useState([{}])

  useEffect(() => {
    async function getData() {
        const response = await fetch("https://corona.lmao.ninja/v2/all");
        let data = await response.json();
        setGlobalData(data);
    }
    getData();
    async function myfunc() {
      const resp = await  fetch("https://corona.lmao.ninja/v2/countries/");
      let newdata = await resp.json();
      setCountries(newdata);
    }
    myfunc()
}, [])

  const handleChange = (e) => {
      e.preventDefault();
      let myvalue = e.target.value;
      ApiCall(myvalue)
      setCountry(myvalue)

  }
  

  function ApiCall(mycountry) {
    async function getData() {
      const response = await fetch("https://corona.lmao.ninja/v2/countries/"+mycountry);
      let data = await response.json();
      delete data.countryInfo;      
      setGlobalData(data);
  }
      getData();
  }

  return (   

    <div className={classes.root}>
        <div className={classes.div1}><h1 className={classes.h1}>{country} Cases</h1></div>
        <div className={classes.div2}>      
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
            >
              {countries.map((e) =>{
                return (
                  <MenuItem value={e.country}>{e.country}</MenuItem>
                )
              })
}
            </Select>
        </FormControl>
        </div>
      <Grid container spacing={3}>  
        {Object.keys(globalData).map((key,ind)=>{
            return(
        <Grid item xs={12} sm={2} key={ind}>
            <Paper className={classes.paper}>
                <h3>{key}</h3>
                <h3>{globalData[key]}</h3>
            </Paper>
        </Grid>
        )})}
      </Grid>
    </div>
  );
}
