import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Divider } from "@material-ui/core/";
import "./Employee.css";

function Jobs(){

    const [jobs, setJobs] = useState([]);
    const history = useHistory();

   
    async function testing() {
      const jobsapi = await axios.get(url);
      setJobs(jobsapi.data);
      return jobsapi;
    }

    const url = '/jobs/delivery';
    useEffect( () => {
      testing();
    }, [url]);

    console.log(jobs);
    

    const useStyles = makeStyles({
      gridContainer:{
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop : "10px",
        paddingBottom : "10px",
        marginLeft : "20px",
        marginRight : "20px",
        marginTop : "20px",
        marginBottom : "20px"
      },
      root: {
        maxWidth: 350,
        width : 320
      },
      media: {
        height: 140,
      },
    });
    const classes = useStyles();

    function acceptJobEvent(orderId){
      const url = '/jobs/delivery/acceptJob/'+orderId;
      console.log(url);
      try{
        axios.post(url);
        history.go(0);
        testing();
      }
      catch(E){console.log(E)}

    }


    return(
        <div>
            {
              jobs.length ?
              <Grid container 
              direction = "row"
              justify = "center"
              allignItems = "center"
              spacing = {4} >
                {jobs.map( job => {
                if(job.status == 0 && job.order.type == 1)
                return(
                  <Grid className = {classes.gridContainer}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardContent>
                        {console.log("JOB TYPE", job.type)}
                          <Typography gutterBottom variant="h5" component="h2">
                            Job Reference# {job.id}
                          </Typography>
                          <h6 variant="body2" color="textSecondary" component="p">
                            Order # {job.order.id}
                            </h6>
                          <h6> Date: {job.order.date} </h6>
                          <h6> Customer: {job.order.customer.username} </h6>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => acceptJobEvent(job.id)}>
                          Accept Job
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  
              )})}
              </Grid>
              
              :<div></div>
       }

        </div>

    );

}

export default Jobs;