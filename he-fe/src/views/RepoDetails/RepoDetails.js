import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Breadcrumbs,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  Link as RouterLink,
} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GitHubIcon from '@material-ui/icons/GitHub';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import InfoIcon from '@material-ui/icons/Info';

import {
  useParams
} from "react-router-dom";
import API from '../../data/api';

const RepoDetails = () => {
  const [repoDetails, setRepoDetails] = useState({});
  const [activeAccordion, setActiveAccordion] = useState('brief');
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
        }
        );
        setRepoDetails(result.data);
      }
      getRepository()
   
    } catch (error) {
      console.log(error);
    }
  }, [repo, owner]);

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const handleSetAccordion = (panel) => (event, newExpanded) => {
    setActiveAccordion(newExpanded ? panel : false);
  };

  const generateDetails = () => {
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
          Repo Details - Brief
        </AccordionSummary>
        <AccordionDetails>
            <List>
              <ListItemLink href={repoDetails.html_url}>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary={repoDetails.name} />
                <ListItemIcon>
                  <Avatar src={ repoDetails.owner && repoDetails.owner.avatar_url}/>
                </ListItemIcon>
                <ListItemText primary={repoDetails.owner &&repoDetails.owner.login} />
              </ListItemLink>
              <ListItem>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={repoDetails.watchers_count} />
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={repoDetails.stargazers_count} />
                <ListItemIcon>
                  <CallSplitIcon />
                </ListItemIcon>
                <ListItemText primary={repoDetails.forks_count} />
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={repoDetails.open_issues} />
              </ListItem>

              {
                 repoDetails.description &&
                 <ListItem>
                  Description: {repoDetails.description}
                </ListItem>
               }
              {
                 repoDetails.language &&
                 <ListItem>
                  Language: {repoDetails.language}
                </ListItem>
               }
               <ListItemLink href={repoDetails.html_url}>
                  Link: {repoDetails.html_url}
                </ListItemLink>
               <ListItemLink href={repoDetails.clone_url}>
                  Clone URL: {repoDetails.clone_url}
                </ListItemLink>
               <ListItemLink href={repoDetails.clone_url}>
                  SSH URL: {repoDetails.ssh_url}
                </ListItemLink>
            </List>

          
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
          {generateDetails()}
        </AccordionDetails>
      </Accordion>
    </Container>
    
  )
}

export default RepoDetails;