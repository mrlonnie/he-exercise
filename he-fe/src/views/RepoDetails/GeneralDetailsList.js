import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import InfoIcon from '@material-ui/icons/Info';

const GeneralDetailsList = ({ repoDetails }) => {
  /**
   * ListItemLink
   * @param props 
   */
  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }
  return (
    <List>
      {/* Detail Row - Repo Name | Owner Avatar | Owner Name */}
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
      {/* Detail Row - Waters | Stars | Forks | Isses */}
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
      {/* Detail Row - Description */}
      {
          repoDetails.description &&
          <ListItem>
          Description: {repoDetails.description}
        </ListItem>
        }
        {/* Detail Row - Language */}
      {
          repoDetails.language &&
          <ListItem>
          Language: {repoDetails.language}
        </ListItem>
        }

        {/* Detail Row - URL | Clone URL | SSH URL */}
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
  )
}
GeneralDetailsList.propTypes = {
  repoDetails: PropTypes.shape({
    clone_url: PropTypes.string,
    description: PropTypes.string,
    forks_count: PropTypes.number,
    html_url: PropTypes.string,
    id: PropTypes.number,
    language: PropTypes.string,
    name: PropTypes.string,
    open_issues: PropTypes.number,
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string
    }),
    score: PropTypes.number,
    ssh_url: PropTypes.string,
    stargazers_count: PropTypes.number,
  }).isRequired,
}

export default GeneralDetailsList;