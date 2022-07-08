import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, Divider, IconButton, Link, Menu, MenuItem,
} from '@mui/material';
import { NavLink, Link as DOMLink } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimeAgo from 'react-timeago';
import ReplyIcon from '@mui/icons-material/Reply';
import settings from '../../settings';
import stringAvatar from '../../services/icons/avatarIcon';

const ITEM_HEIGHT = 48;

const Comment = ({
  comment, replyToHandle, handleChange, onDeleteHandle, userId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="header flex row start-center">
        <div className="header-left flex row start-center">
          <NavLink
            style={{
              fontWeight: 500,
            }}
            className="flex row start-center"
            to={`/profile/${comment.profileid}`}
          >
            {(comment.avatarlink
            && (
              <img
                className="avatar"
                src={`${settings.URI}/files/avatar/${comment.profileid}`}
                alt="avatar"
              />
            ))
          // eslint-disable-next-line react/jsx-props-no-spreading
          || <Avatar className="avatar" {...stringAvatar(comment.name)} />}

            {comment.name}
            {' '}
          </NavLink>

          {comment?.parentProfileId
            && (
              <div className="flex row start-center">
                <div
                  style={{
                    margin: '0 8px',
                  }}
                >
                  to
                </div>

                <Link
                  component={DOMLink}
                  to={`/profile/${comment.parentProfileId}`}
                  underline="always"
                  sx={{
                    textDecoration: 'underline !important',
                  }}
                >
                  {comment.parentName}
                </Link>
              </div>
            )}

          <div style={{ marginLeft: '10px' }}>
            {' '}
            <b>
              &middot;
            </b>
            {' '}

            <small>
              <TimeAgo date={comment.timesend} />

              {comment.changed && '(edited)'}
            </small>

          </div>
        </div>

        <div className="header-right flex row center">
          <Button
            startIcon={<ReplyIcon />}
            size="small"
            sx={{
              fontSize: 'small',
            }}
            onClick={() => replyToHandle(comment.profileid, comment.name)}
          >
            reply
          </Button>

          {userId === comment.profileid
          && (
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                fontSize="18px"
                className="comment-menu"
                onClick={handleClick}
                sx={{
                  height: '24px',
                  width: '24px',
                  padding: '5px',
                }}
                style={{
                  display: !open ? 'inherit' : 'flex !important',
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleChange(comment.commentid, comment.text);
                  }}
                  sx={{
                    width: '100%',
                    textTransform: 'capitalize',
                  }}
                >
                  Edit
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => onDeleteHandle(comment.commentid)}
                  sx={{
                    width: '100%',
                    textTransform: 'capitalize',
                  }}
                >
                  Remove
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>

      <div className="content">
        {comment.text}
      </div>
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({}),
  replyToHandle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onDeleteHandle: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

Comment.defaultProps = {
  comment: {},
};

export default Comment;
