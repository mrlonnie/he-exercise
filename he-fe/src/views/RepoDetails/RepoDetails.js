import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Container,
  ListItem,
  Typography,
} from '@material-ui/core';
import {
  Link as RouterLink,
  useParams
} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GeneralDetailsList from './GeneralDetailsList';
import API from '../../data/api';

const RepoDetails = () => {
  const [repoDetails, setRepoDetails] = useState({});
  const [activeAccordion, setActiveAccordion] = useState('brief');

  // Grab url params
  let { repo, owner } = useParams();

  useEffect(() => {
    try {
      async function getRepository() {
        const result = await axios.get(API.getRepository,
        {
          params: {
            repo: repo,
            owner: owner
          }
        })
        .catch(error => {
          console.log(error)
        });
        setRepoDetails(result.data);
      }
      getRepository()
   
    } catch (error) {
      console.log(error);
    }
  }, [repo, owner]);



  /**
   * handleSetAccordion 
   * @param panel Panel to make expanded
   */

  const handleSetAccordion = (panel) => (event, newExpanded) => {
    setActiveAccordion(newExpanded ? panel : false);
  };

  /**
   * generateRawDetails 
   */
  const generateRawDetails = () => {
    return(
      <div><pre>{JSON.stringify(repoDetails, null, 2) }</pre></div>
    )
  }


  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <RouterLink to="/">
          Search Form
        </RouterLink>
        <Typography color="textPrimary">Details</Typography>
      </Breadcrumbs>
      <Accordion
        square
        expanded={activeAccordion === 'brief'}
        onChange={handleSetAccordion('brief')}
      >
        <AccordionSummary>
          General Details
        </AccordionSummary>
        <AccordionDetails>
          <GeneralDetailsList repoDetails={repoDetails} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={activeAccordion === 'raw'}
        onChange={handleSetAccordion('raw')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="repo-raw-detail;s"
          id="repo-raw-details"
        >
          Raw Details
        </AccordionSummary>
        <AccordionDetails>
          {generateRawDetails()}
        </AccordionDetails>
      </Accordion>
    </Container>
    
  )
}

export default RepoDetails;